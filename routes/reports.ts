import express from 'express'
import mongoose from 'mongoose';
import { auth } from '../middleware/auth';
import { Report } from '../models/reports';
import { ReportService } from '../services/reports.service';
const router = express.Router();

router.post('/', auth, async (req: any, res) => {
  const reports = await Report.aggregate([
    { '$match': { "user_id": new mongoose.Types.ObjectId(req.user._id) } },
    { '$sort': { date: -1 } },
    {
      '$group': {
        _id: '$check_id',
        history: {
          $push: {
            status: "$status", date: "$date", response_time: "$response_time", check_id: "$check_id", user_id: "$user_id", code: "$code", error_message: "$error_message",
          }
        }
      }
    }
  ]);

  const generatedReport = new ReportService().generateUserReport(reports);
  res.send(generatedReport);
});

export = router