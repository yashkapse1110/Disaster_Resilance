import { Request, Response } from "express";
import Alert from "../models/alertModel";

// Create a new alert
export const createAlert = async (req: Request, res: Response) => {
  try {
    const { title, description, type, location } = req.body;
    const createdBy = req.user?.id;

    const newAlert = await Alert.create({
      title,
      description,
      type,
      location,
      createdBy,
    });

    res.status(201).json(newAlert);
  } catch (err) {
    res.status(500).json({ message: "Failed to create alert", error: err });
  }
};

// Get all alerts
export const getAllAlerts = async (_: Request, res: Response) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch alerts", error: err });
  }
};

// Update alert
export const updateAlert = async (req: Request, res: Response) => {
  try {
    const updated = await Alert.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Alert not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update alert", error: err });
  }
};

// Delete alert
export const deleteAlert = async (req: Request, res: Response) => {
  try {
    const deleted = await Alert.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Alert not found" });
    res.json({ message: "Alert deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete alert", error: err });
  }
};
