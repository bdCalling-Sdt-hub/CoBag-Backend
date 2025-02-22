export type TRoute = {
  _id?: string;
  userId: string; // Reference to the user
  transportMode: 'plane' | 'train' | "all";
  size: 'small' | 'medium' | 'large';
  transportType: 'direct' | 'withCorrespondence';
  ticket: string; // URL or file reference
  flightNumber?: string;
  departureCity: string;
  isOrderComfirmed : boolean;
  arrivalCity: string;
  departureDate: string;
  arrivalDate: string;
  departureTime: string;
  arrivalTime: string;
  availableToBeCourier: boolean;
  maxpurchAmountAdvance : number; 
  handLuggage?: number;
  checkedBaggage?: number;
  user: any;
  courierOptions?: {
    maxPurchaseAmount?: number;
    message?: string;
  };
  isTwentyPercent ?: boolean, 
  isEightyPercent ?: boolean,
  price?: number; 
  totalSpace?: number;
  createdAt?: Date;
  updatedAt?: Date;
};