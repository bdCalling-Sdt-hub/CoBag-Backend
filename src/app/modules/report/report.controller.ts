import catchAsync from "../../utils/catchAsync";
import { TReport } from "./report.interface";
import { reportService } from "./report.service";

const createReport = catchAsync(async(req, res, next ) => {
    const payload = req.body;
    const {userId} = req.user;
    const result = await reportService.createReportIntoDB(userId ,payload);
    if (!result) {
        throw new Error("Report Not Created");
    }
    res.status(201).json({
        success: true,
        statusCode: 201,
        message: 'Report Created Successfully',
        data: result
    })
})

const getAllReport = catchAsync(async(req, res, next ) => {
    const result = await reportService.getAllReportFromDB();
    if (!result) {
        throw new Error("No Data Avilable");
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'get all Reported data Successfully',
        data: result
    })
})

const getOneReport = catchAsync(async(req, res, next ) => {
    const {id} = req.params;
    const result = await reportService.getSingleReportById(id);
    if (!result) {
        throw new Error("No Data Avilable");
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'get one Reported data Successfully',
        data: result
    })
})

const updateReport = catchAsync(async(req, res, next ) => {
    const {id} = req.params;
    const payload = req.body;
    const result = await reportService.updateReport(id, payload);
    if (!result) {
        throw new Error("No Data Avilable");
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Report Update Successfully',
        data: result
    })
})
const deleteReport = catchAsync(async(req, res, next ) => {
    const {id} = req.params;
    const result = await reportService.deleteReport(id);
    if (!result) {
        throw new Error("No Data Avilable");
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Report Deleted Successfully',
        data: result
    })
})
export const reportController = {
    createReport,
    getAllReport,
    getOneReport,
    updateReport,
    deleteReport
}