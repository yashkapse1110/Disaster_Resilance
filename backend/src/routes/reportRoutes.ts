import { Router } from "express";
import {
  createReport,
  verifyReport,
  getAllReports,
  getReportById,
  getAllReportLocations,
  changeReportStatus,
  deleteReport,
  updateReport,
} from "../controllers/reportController";
import { uploadImage } from "../controllers/authController";
import authenticateToken from "../middlewares/authenticateToken";

const router = Router();

router.post("/reports", uploadImage, createReport);
router.put("/reports/verify/:id", authenticateToken, verifyReport);
router.get("/reports", getAllReports);
router.get("/reports/:id", getReportById);
router.get("/reportsLocation", getAllReportLocations);
router.put("/reports/:id/status", changeReportStatus);
router.delete("/reports/:id", authenticateToken, deleteReport);
router.put("/reports/:id", authenticateToken, updateReport);



export default router;
