import PlatformModel from "../adminRequirments/platform/platform.model";
import { TRoute } from "./sellKG.interface"
import SellKgModel from "./sellKG.model"


const createSellFromDB = async (payload: TRoute) => {
  try {
    // Validate, convert to numbers, and provide default values if undefined
    const handLuggage = Number(payload.handLuggage ?? 0); // Convert to number, default to 0 if undefined
    const checkedBaggage = Number(payload.checkedBaggage ?? 0); // Convert to number, default to 0 if undefined
    if (isNaN(handLuggage) || isNaN(checkedBaggage)) {
      throw new Error("Invalid input: handLuggage and checkedBaggage must be numbers or numeric strings.");
    }
    // Calculate totalSpace
    payload.totalSpace = handLuggage + checkedBaggage;
    // Get the admin-set price (assuming only one document exists in the PlatformModel collection)
    const adminSetPrice = await PlatformModel.findOne({});
    console.log(adminSetPrice);
    if (!adminSetPrice) {
      throw new Error("Admin settings not found.");
    }
    if (payload.transportMode === "plane") {
      const totalPrice = adminSetPrice.purchaseKilosAirplane * payload.totalSpace;
      payload.price = totalPrice;
    } else if (payload.transportMode === "train") {
      if (payload.size === "small") {
        const totalPrice = adminSetPrice.train.small;
        payload.price = totalPrice;
      } else if (payload.size === "medium") {
        const totalPrice = adminSetPrice.train.medium;
        payload.price = totalPrice;
      } else if (payload.size === "large") {
        const totalPrice = adminSetPrice.train.large;
        payload.price = totalPrice;
      }
    }
    // Create the record in the database
    const result = await SellKgModel.create(payload);
    if (!result) {
      throw new Error("Something Went Wrong");
    }
    return result;
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
};




const getAllSellKgFromDB = async () => {
  try {
    const result = await SellKgModel.find({});
    if (!result || result.length === 0) {
      throw new Error("No Sell KG service Avilable ");
    }
    return result;
  } catch (error) {
    return error
  }
}

const updateSellKgFromDB = async (payload: Partial<TRoute>, id: string) => {
  try {
    const result = await SellKgModel.findByIdAndUpdate(
      id, { payload }, { new: true }
    );
    if (!result) {
      throw new Error('Sell KG record not found or could not be updated.');
    }
    return result;
  } catch (error) {
    return error
  }
}

const deleteSellFromDB = async (id: string) => {
  try {
    const result = await SellKgModel.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Sell KG Post Deleted");
    }
    return result
  } catch (error) {
    return error
  }
}


const searchRouteFromDB = async (payload: Partial<TRoute>) => {
  try {
    console.log('Payload:', payload); // Log the payload for debugging

    // Build an $or array for fields provided in the payload
    const conditions: any[] = [];

    if (payload.transportMode) {
      conditions.push({ transportMode: payload.transportMode });
    }
    if (payload.departureCity && payload.arrivalCity) {
      conditions.push({
        departureCity: payload.departureCity,
        arrivalCity: payload.arrivalCity
      })
    }
    if (payload.departureDate) {
      conditions.push({ departureDate: payload.departureDate });
    }
    if (payload.handLuggage !== undefined) {
      conditions.push({ 'availableWeight.handLuggage': { $gte: payload.handLuggage } });
    }
    if (payload.checkedBaggage !== undefined) {
      conditions.push({ 'availableWeight.checkedBaggage': { $gte: payload.checkedBaggage } });
    }

    // If no conditions are provided, return an empty array
    if (conditions.length === 0) {
      console.log('No search criteria provided.');
      return [];
    }

    // Query the database using $or
    const result = await SellKgModel.find({ $or: conditions });

    console.log('Search Results:', result); // Log the search results
    return result; // Return the search results
  } catch (error) {
    console.error('Error searching routes:', error);
    throw new Error('An error occurred while searching for routes.');
  }
};

const getAvailableForCourier = async (payload: TRoute) => {
  try {
    // Build conditions for the query
    const conditions: any[] = [];

    // Ensure both departureCity and arrivalCity are provided
    if (payload.departureCity && payload.arrivalCity) {
      conditions.push(
        { departureCity: payload.departureCity },
        { arrivalCity: payload.arrivalCity }
      )

      // If both departureCity and arrivalCity exist, consider additional optional fields
      if (payload.departureTime) {
        conditions.push({ departureTime: payload.departureTime });
      }
      if (payload.arrivalTime) {
        conditions.push({ arrivalTime: payload.arrivalTime });
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
  } catch (error) {
    return error;
  }
};


export default searchRouteFromDB;

export const sellKgService = {
  createSellFromDB,
  getAllSellKgFromDB,
  updateSellKgFromDB,
  getAvailableForCourier,
  deleteSellFromDB,
  searchRouteFromDB

}