import { TRoute } from "./sellKG.interface"
import SellKgModel from "./sellKG.model"


const createSellFromDB = async (payload : TRoute) => {
    try {
        const result = await SellKgModel.create(payload);
        if (!result) {
            throw new Error("Something Went Wrong");
        }
        return result
    } catch (error) {
        return error
    }
}

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

const updateSellKgFromDB = async (payload : Partial<TRoute>, id : string) =>{
    try {
        const result = await SellKgModel.findByIdAndUpdate(
            id, { payload },{ new: true}
          );
          if (!result) {
            throw new Error('Sell KG record not found or could not be updated.');
          }
          return result;
    } catch (error) {
        return error
    }
}

const deleteSellFromDB = async(id : string) => {
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
      if (payload.departureCity) {
        conditions.push({ departureCity: payload.departureCity });
      }
      if (payload.arrivalCity) {
        conditions.push({ arrivalCity: payload.arrivalCity });
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
  
  

export default searchRouteFromDB;

export const sellKgService = {
    createSellFromDB,
    getAllSellKgFromDB,
    updateSellKgFromDB,
    deleteSellFromDB,
    searchRouteFromDB

}