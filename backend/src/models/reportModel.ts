import mongoose, { Document, Schema } from "mongoose";

export interface IReport extends Document {
  type: string;
  description: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  status: "pending" | "verified" | "solved" | "working";
  userId?: string;
  verifiedBy?: string;
  createdAt: Date; 
  updatedAt: Date;
}

const ReportSchema: Schema = new Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true },
  },
  status: {
    type: String,
    enum: ["pending", "verified", "solved", "working"],
    default: "pending",
  },
  userId: { type: String },
  verifiedBy: { type: String }},
  {
    timestamps: true,  
  }
);

// Create a 2dsphere index for geospatial queries
ReportSchema.index({ location: "2dsphere" });

export default mongoose.model<IReport>("Report", ReportSchema);
