export type TRoute = {
    _id?: string;
    userId: string; // Reference to the user
    transportMode: 'plane' | 'train';
    transportType: 'direct' | 'withCorrespondence';
    ticket?: string; // URL or file reference
    flightNumber?: string;
    departureCity: string;
    arrivalCity: string;
    departureDate: string;
    arrivalDate: string;
    departureTime: string;
    arrivalTime: string;
    handLuggage?: number;
    checkedBaggage?: number;
    courierOptions?: {
      maxPurchaseAmount?: number;
      message?: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
  };
  