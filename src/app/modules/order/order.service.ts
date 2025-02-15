import PlatformModel from "../adminRequirments/platform/platform.model";
import UserModel from "../user/user.model";
import OrderModel from "./order.model";

const readOrder = async () => {
    const result = await OrderModel.find({});
    return result;
}

const readOrderById = async (id: string) => {
    const result = await OrderModel.find({senderId : id});
    return result;
}

const checkOrderWithSecretCode = async (secret: string, userId: string) => {
    const result = await OrderModel.findOne({orderSecret : secret, travellerId : userId});
    if (!result) {
        throw new Error("Order Not Found");
    }
    result.isOrderDelivered = true;
    await result.save();
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User Not Found");
    }
    const platformPrice = await PlatformModel.findOne({});
    if (!platformPrice) {
        throw new Error("Platform Not Found");
    }
    user.TotalEarning = user.TotalEarning! + result.fullAmount;
    user.CobagPrtofit = user.CobagPrtofit! + (result.fullAmount * platformPrice.coBagCommission) / 100;
    await user.save();
    return result;
}

export const orderService = {
     readOrder, 
     readOrderById,
     checkOrderWithSecretCode,
};