export type TPromoCode = {
    name: string;
    promoCode: string;
    discountPercentage: number;
    usageLimitPerUser: number;
    expirationDate: Date;
  }