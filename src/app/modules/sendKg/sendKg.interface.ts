import { ObjectId } from "mongoose";

export interface TSendKg {
    userId: ObjectId; // Reference to the user
    transportMode: 'plane' | 'train' | 'all';
    departureCity: string;
    arrivalCity: string;
    desiredDate: {
      startDate: string; // e.g., "mm/dd/yyyy"
      endDate: string; // e.g., "mm/dd/yyyy"
    };
    flexibleDates: boolean;
    packageWeight: number; // in kg
  }
  