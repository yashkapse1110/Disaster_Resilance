import { Request, Response } from "express";
import Report from "../models/reportModel";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const createReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  const allowedTypes = [
    "fire",
    "police",
    "flood",
    "accident",
    "landslide",
    "other",
  ];
  try {
    const { type, description, location } = req.body;

    if (!type || typeof type !== "string") {
      res.status(400).json({
        message: `Invalid type. It must be one of: ${allowedTypes.join(", ")}.`,
      });
      return;
    }

    if (
      !description ||
      typeof description !== "string" ||
      description.length < 10
    ) {
      res.status(400).json({
        message:
          "Description must be a string and at least 10 characters long.",
      });
      return;
    }

    const parsedLocation = JSON.parse(location);
    if (!parsedLocation) {
      res.status(400).json({ message: "Location must be a string." });
      return;
    }

    const imageUrl = `uploads/${req.file?.filename}`;

    const report = new Report({
      type,
      description,
      location: {
        coordinates: parsedLocation as number[], // ✅ use number[] instead of tuple
      },
      imageUrl,
    });

    await report.save();
    res.status(201).json({ message: "Report created successfully", report });
  } catch (error) {
    res.status(400).json({ message: "Error creating report", error });
  }
};

export const verifyReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      res.status(404).json({ message: "Report not found" });
      return;
    }
    if (req.user?.role !== "admin") {
      res.status(403).json({ message: "Admin access required" });
      return;
    }

    report.status = "verified";
    report.verifiedBy = req.user.id;
    await report.save();
    res.json({ message: "Report verified", report });
  } catch (error) {
    res.status(400).json({ message: "Error verifying report", error });
  }
};

export const getAllReports = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(400).json({ message: "Error fetching reports", error });
  }
};

export const getReportById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      res.status(404).json({ message: "Report not found" });
      return;
    }
    res.json(report);
  } catch (error) {
    res.status(400).json({ message: "Error fetching report", error });
  }
};

dayjs.extend(relativeTime);

export const getAllReportLocations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const reports = await Report.find(
      {},
      { location: 1, type: 1, _id: 1, createdAt: 1 }
    );
    const formattedReports = reports.map((report) => ({
      id: report._id,
      title: `${
        report.type.charAt(0).toUpperCase() + report.type.slice(1)
      } reported`,
      type: report.type,
      lat: report.location.coordinates[0],
      lng: report.location.coordinates[1],
      time: dayjs(report.createdAt).fromNow(),
    }));
    res.json(formattedReports);
  } catch (error) {
    res.status(400).json({ message: "Error fetching report locations", error });
  }
};

export const changeReportStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { status } = req.body;
    const report = await Report.findById(req.params.id);
    if (!report) {
      res.status(404).json({ message: "Report not found" });
      return;
    }
    report.status = status;
    await report.save();
    res.json({ message: "Report status updated", report });
  } catch (error) {
    res.status(400).json({ message: "Error updating report status", error });
  }
};

export const deleteReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deleted = await Report.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ message: "Report not found" });
      return;
    }
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting report", error });
  }
};

export const updateReport = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { type, description, status, location } = req.body;
  try {
    const report = await Report.findById(id);
    if (!report) {
      res.status(404).json({ message: "Report not found" });
      return;
    }

    if (type) report.type = type;
    if (description) report.description = description;
    if (status) report.status = status;
    if (location && Array.isArray(location)) {
      report.location.coordinates = location as number[];
    }

    await report.save();
    res.status(200).json({ message: "Report updated successfully", report });
  } catch (error) {
    res.status(500).json({ message: "Error updating report", error });
  }
};
