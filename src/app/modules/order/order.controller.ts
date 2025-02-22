import catchAsync from "../../utils/catchAsync";
import { orderService } from "./order.service";


const readOrders = catchAsync(async (req, res, next) => {
    const result = await orderService.readOrders();
    if (!result) {
        throw new Error("No Data Avilable");
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'get all Order Successfully',
        data: result
    })
})

const readOrderById = catchAsync(async (req, res, next) => {
    const {userId} = req.user;
    const result = await orderService.readOrderById(userId);
    if (!result) {
        throw new Error("No Data Avilable");
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'get one Order By Id Successfully',
        data: result
    })
})

const checkOrderWithSecretCode = catchAsync(async (req, res, next) => {
    const {userId} = req.user;
    const secret = req.body;
    const result = await orderService.checkOrderWithSecretCode(userId, secret);
    if (!result) {
        throw new Error("No Data Avilable");
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'get one Order By Id Successfully',
        data: result    
    })

})

const usersenderAndTravelerOrders = catchAsync(async (req, res, next) => {
    const {userId} = req.user;
    const {queryPerams} = req.params;
    const result = await orderService.usersenderAndTravelerOrders(userId, queryPerams);
    if (!result) {
        throw new Error("No Data Avilable");
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'get one Order By Id Successfully',
        data: result    
    })
})


const allRunningOrder = catchAsync(async (req, res, next) => {
    const {page} = req.params;
    const pages = parseInt(page);
    const result = await orderService.allRunningOrder(pages);
    if (!result) {
        throw new Error("No Data Avilable");
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'get one Order By Id Successfully',
        data: result    
    })
})

const singleOrder = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const result = await orderService.singleOrder(id);
    if (!result) {
        throw new Error("No Data Avilable");
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'get one Order By Id Successfully',
        data: result
    })
})

export const orderController = {
    readOrders,
    readOrderById,
    checkOrderWithSecretCode,
    usersenderAndTravelerOrders,
    allRunningOrder,
    singleOrder
}