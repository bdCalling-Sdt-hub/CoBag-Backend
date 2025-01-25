import mongoose from "mongoose";
import PlatformModel from "../adminRequirments/platform/platform.model";
import UserModel from "../user/user.model";
import { TRoute } from "./sellKG.interface"
import SellKgModel from "./sellKG.model"


const createSellFromDB = async (payload: TRoute) => {
  
    // Validate, convert to numbers, and provide default values if undefined
    const handLuggage = Number(payload.handLuggage ?? 0); // Convert to number, default to 0 if undefined
    const checkedBaggage = Number(payload.checkedBaggage ?? 0); // Convert to number, default to 0 if undefined
    if (isNaN(handLuggage) || isNaN(checkedBaggage)) {
      throw new Error("Invalid input: handLuggage and checkedBaggage must be numbers or numeric strings.");
    }
    // Calculate totalSpace
    payload.totalSpace = handLuggage + checkedBaggage;
    // Create the record in the database
    const result = await SellKgModel.create(payload);
    if (!result) {
      throw new Error("Something Went Wrong");
    }
    const { userId } = result;
    const user = await UserModel.findById(userId.toString())
    console.log("Here Is console User ", user)
    result.user = user;
    console.log("user", user);
    console.log(result)
    await result.save()
    return  {
      result
    };
  
};




const getAllSellKgFromDB = async () => {

    const result = await SellKgModel.find({});
    if (!result || result.length === 0) {
      throw new Error("No Sell KG service Avilable ");
    }
    return result;
  
}

const updateSellKgFromDB = async (payload: Partial<TRoute>, id: string) => {

    const result = await SellKgModel.findByIdAndUpdate(
      id, { payload }, { new: true }
    );
    if (!result) {
      throw new Error('Sell KG record not found or could not be updated.');
    }
    return result;
  
}

const deleteSellFromDB = async (id: string) => {
 
    const result = await SellKgModel.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Sell KG Post Deleted");
    }
    return result
  
}


const searchRouteFromDB = async (payload: Partial<TRoute>) => {
  console.log('Payload:', payload); // Log the payload for debugging

  const {
    transportMode,
    departureCity,
    arrivalCity,
    departureDate,
    arrivalDate,
    totalSpace,
  } = payload;
  
  // Build the transportMode condition
  let transportCondition;
  if (transportMode === 'all') {
    transportCondition = { $in: ['train', 'plane'] }; // Match both train and plane
  } else {
    transportCondition = transportMode; // Match the specific mode
  }
  
  // Build the search query
  const query: any = {
    transportMode: transportCondition,
    departureCity: departureCity
      ? { $regex: new RegExp(`^${departureCity}$`, 'i') } // Case-insensitive match
      : undefined,
    arrivalCity: arrivalCity
      ? { $regex: new RegExp(`^${arrivalCity}$`, 'i') } // Case-insensitive match
      : undefined,
    departureDate: departureDate ? { $gte: departureDate } : undefined,
    arrivalDate: arrivalDate ? { $gte: arrivalDate } : undefined,
    totalSpace: totalSpace ? { $gte: totalSpace } : undefined,
  };

  // Remove undefined fields from the query
  Object.keys(query).forEach((key) => query[key] === undefined && delete query[key]);

  // Execute the query
  const results = await SellKgModel.find(query);

  // Log all userIds and populate user information
  for (const result of results) {
    const user = await UserModel.findById({ _id: result.userId });
    result.user = user;
    console.log('One By One:', result.user);
  }

  return results;
};


const getOneSellKgFromDB = async (id: string) => {

    const result = await SellKgModel.findById(id);
    if (!result) {  
      throw new Error('Sell KG record not found.');
    }  
    return result;
}


const getAvailableForCourier = async (payload: TRoute) => {

    // Build conditions for the query
    const conditions: any[] = [];

    // Ensure both departureCity and arrivalCity are provided
    if (payload.departureCity && payload.arrivalCity) {
      conditions.push(
        { departureCity: payload.departureCity },
        { arrivalCity: payload.arrivalCity }
      )

      // If both departureCity and arrivalCity exist, consider additional optional fields
      if (payload.departureDate) {
        conditions.push({ departureDate: payload.departureDate });
      }
      if (payload.arrivalDate) {
        conditions.push({ arrivalDate: payload.arrivalDate });
      }
      if (payload.maxpurchAmountAdvance) {
        conditions.push({ maxpurchAmountAdvance: { $gte: payload.maxpurchAmountAdvance } });
      }
    } else {
      console.log('departureCity and arrivalCity are required for further filtering.');
      return []; // Return an empty array if the mandatory fields are not met
    }

    // Use $and to enforce strict matching for departureCity and arrivalCity
    const result = await SellKgModel.find({ $and: conditions });
    return result;
  
};




export const sellKgService = {
  createSellFromDB,
  getAllSellKgFromDB,
  updateSellKgFromDB,
  getAvailableForCourier,
  deleteSellFromDB,
  searchRouteFromDB,
  getOneSellKgFromDB

}