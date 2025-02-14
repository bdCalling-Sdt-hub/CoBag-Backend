import mongoose, { Schema } from 'mongoose';
import { TReport } from './report.interface';


// Schema for Report
const reportSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['In progress', 'Resolved'],
      default: 'In progress',
    },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const ReportModel = mongoose.model<TReport>('Report', reportSchema);

export default ReportModel;
