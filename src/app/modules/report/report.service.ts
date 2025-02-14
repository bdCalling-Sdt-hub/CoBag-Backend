import UserModel from "../user/user.model";
import { TReport } from "./report.interface";
import ReportModel from "./report.model";

const createReportIntoDB = async ( userId : string,payload: TReport) => {
    const result = await ReportModel.create(payload);
    const user = await UserModel.findById(userId); 
    // console.log(user) 
    console.log(user)
    if (!result) {
        throw new Error("No Report Created");
    }
    return {result, user};
}

const getAllReportFromDB = async () => {
    const result = await ReportModel.find({});
    if (!result) {
        throw new Error("");
    }
    return result;
}

const deleteReport = async (id: string) => {
    const result = await ReportModel.findByIdAndDelete(id);
    if (!result) {
        throw new Error("");
    }
    return result;
}

const updateReport = async (id: string, payload: Partial<TReport>) => {
    const result = await ReportModel.findByIdAndUpdate(id, payload, { new: true });
    if (!result) {
        throw new Error("");
    }
    return result;
}

const getSingleReportById = async (id: string) => {
    const result = await ReportModel.findById(id);
    if (!result) {
        throw new Error("No Data Found");
    }

    return result;
}

export const reportService = {
    createReportIntoDB,
    getAllReportFromDB,
    getSingleReportById,
    deleteReport,
    updateReport
}