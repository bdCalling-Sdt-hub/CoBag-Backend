import { Schema, model } from 'mongoose';
import { TGeneral } from './general.interface';

const GeneralSchema = new Schema<TGeneral>(
  {
    platformName: { type: String, required: true },
    contactEmail: { type: String, required: true },
    PlatformLogo: { type: String, default: "" },
    mainLanguage: {
      type: String,
      enum: ['French', 'English', 'Spanish'],
      required: true,
    },
    landingPageVideoLink: { type: String, required: true },
    iTravelVideoLink: { type: String, required: true },
    iSendVideoLink: { type: String, required: true },
    iShopVideoLink: { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const GeneralModel = model<TGeneral>('General', GeneralSchema);

export default GeneralModel;
