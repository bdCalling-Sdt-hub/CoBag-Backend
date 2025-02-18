import PlatformModel from "../adminRequirments/platform/platform.model";
import SellKgModel from "../sellKG/sellKG.model";
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

// const checkOrderWithSecretCode = async (secret: string, userId: string) => {
//     const result = await OrderModel.findOne({orderSecret : secret, travellerId : userId});
//     if (!result) {
//         throw new Error("Order Not Found");
//     }
//     result.isOrderDelivered = true;
//     await result.save();
//     const user = await UserModel.findById(userId);
//     if (!user) {
//         throw new Error("User Not Found");
//     }
//     const platformPrice = await PlatformModel.findOne({});
//     if (!platformPrice) {
//         throw new Error("Platform Not Found");
//     }
//     user.TotalEarning = user.TotalEarning! + result.fullAmount;
//     user.CobagPrtofit = user.CobagPrtofit! + (result.fullAmount * platformPrice.coBagCommission) / 100;
//     const senderCount = await OrderModel.find({senderId : userId}).countDocuments();
//     const travellerCount = await OrderModel.find({travellerId : userId}).countDocuments();
//     const senderOrders = await OrderModel.find({ senderId: userId });
//     const totalAmount = senderOrders.reduce((sum, order) => sum + order.fullAmount, 0);
//     user.senderCount = senderCount;
//     user.travellerCount = travellerCount;
//     user.moneySpent = totalAmount;
//     const sellPost = await SellKgModel.findById(result.sellKgId);
//     if (!sellPost) {
//         throw new Error("Sell Post Not Found");
//     }
//     if (sellPost.availableToBeCourier === true) {
//         user.courierCount = user.courierCount! + 1;
//     } 
//     await user.save();
//     return result;
// }


const calculateSuccessRate = (successCount: number, failedCount: number): number => {
    const totalOrders = successCount + failedCount;
    if (totalOrders === 0) return 0; // Avoid division by zero
    return parseFloat(((successCount / totalOrders) * 100).toFixed(2)); // Format to 2 decimal places
};

const checkOrderWithSecretCode = async (secret: string, userId: string) => {
    // Find the order
    const result = await OrderModel.findOne({ orderSecret: secret, travellerId: userId });
    if (!result) {
        throw new Error("Order Not Found");
    }

    // Mark order as delivered
    result.isOrderDelivered = true;
    await result.save();

    // Fetch user, platform price, and related data in parallel
    const [user, platformPrice, senderOrders, sellPost] = await Promise.all([
        UserModel.findById(userId),
        PlatformModel.findOne({}),
        OrderModel.find({ senderId: userId }), // Fetch sender orders only once
        SellKgModel.findById(result.sellKgId),
    ]);

    if (!user) throw new Error("User Not Found");
    if (!platformPrice) throw new Error("Platform Not Found");
    if (!sellPost) throw new Error("Sell Post Not Found");

    // Update user's earnings and profits
    user.TotalEarning = (user.TotalEarning ?? 0) + result.fullAmount;
    user.CobagPrtofit = (user.CobagPrtofit ?? 0) + (result.fullAmount * platformPrice.coBagCommission) / 100;

    // Calculate sender count, traveller count, and total amount spent
    const [senderCount, travellerCount] = await Promise.all([
        OrderModel.countDocuments({ senderId: userId }),
        OrderModel.countDocuments({ travellerId: userId }),
    ]);
    
    const totalAmountSpent = senderOrders.reduce((sum, order) => sum + order.fullAmount, 0);

    user.senderCount = senderCount;
    user.senderSuccessRate = calculateSuccessRate(senderCount, user.senderFailCount ?? 0);
    user.travellerCount = travellerCount;
    user.senderSuccessRate = calculateSuccessRate(travellerCount, user.travellerFailedCount ?? 0);
    user.moneySpent = totalAmountSpent;

    // Update courier count if applicable
    if (sellPost.availableToBeCourier) {
        user.courierCount = (user.courierCount ?? 0) + 1;
    }

    // Save updated user data
    await user.save();

    return result;
};


const usersenderAndTravelerOrders = async (userId : string , queryPerams : string) => {
    let senderData;
    let travellerData;
    if (queryPerams === "sender") {
         senderData = await OrderModel.find({senderId : userId})
         return senderData
    } else if (queryPerams === "traveller") {
         travellerData = await OrderModel.find({travellerId : userId})
         return travellerData
    } else {
        throw new Error("Invalid query parameter Or UserId");
    }
}


const allRunningOrder = async (page : number) => {
    const limit = 10;
    const skip = (page - 1) * limit;
    const result = await OrderModel.find({isOrderDelivered : false})
    .limit(limit)
    .skip(skip);
    return result;
}

export const orderService = {
     readOrder, 
     readOrderById,
     checkOrderWithSecretCode,
     usersenderAndTravelerOrders,
     allRunningOrder
};