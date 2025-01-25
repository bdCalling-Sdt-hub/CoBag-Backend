import { z } from 'zod';

export const CreateGeneralValidationSchema = z.object({
  body: z.object({
    platformName: z.string().min(1, 'Platform name is required'),
    contactEmail: z.string().email('Invalid email address'),
    PlatformLogo: z.string().optional(),
    mainLanguage: z.enum(['French', 'English', 'Spanish'], { required_error: 'Main language is required' }),
    landingPageVideoLink: z.string().url('Invalid URL format'),
    iTravelVideoLink: z.string().url('Invalid URL format'),
    iSendVideoLink: z.string().url('Invalid URL format'),
    iShopVideoLink: z.string().url('Invalid URL format'),
  }),
});

export const UpdateGeneralValidationSchema = z.object({
  body: z.object({
    platformName: z.string().optional(),
    contactEmail: z.string().optional(),
    mainLanguage: z.string().optional(),
    landingPageVideoLink: z.string().optional(),
    iTravelVideoLink: z.string().optional(),
    iSendVideoLink: z.string().optional(),
    iShopVideoLink: z.string().optional(),
  }),
});

export const generalValidation = {
  CreateGeneralValidationSchema,
  UpdateGeneralValidationSchema,
};
