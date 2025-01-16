export type TPromoCode = {
    name: string;
    promoCode: string;
    discountPercentage: number;
    usageLimitPerUser: number;
    isActive : boolean,
    expirationDate: Date;
  }