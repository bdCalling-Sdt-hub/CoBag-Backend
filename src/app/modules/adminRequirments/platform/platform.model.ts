import { model, Schema } from "mongoose";
import { TPlatform } from "./platform.interface";

const ConfigSchema: Schema = new Schema(
    {
      purchaseKilosAirplane: { type: Number, required: true },
      train: {
        small: { type: Number, required: true },
        medium: { type: Number, required: true },
        large: { type: Number, required: true },
      },
      minimumPricePerTransaction: { type: Number, required: true },
      coBagCommission: { type: Number, required: true },
    },
    {
      timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
  );

  const PlatformModel = model<TPlatform>('platform', ConfigSchema);

  export default PlatformModel;