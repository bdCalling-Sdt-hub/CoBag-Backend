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
    contactEmail: z.string().email('Invalid email address').optional(),
    mainLanguage: z.enum(['French', 'English', 'Spanish']).optional(),
    landingPageVideoLink: z.string().url('Invalid URL format').optional(),
    iTravelVideoLink: z.string().url('Invalid URL format').optional(),
    iSendVideoLink: z.string().url('Invalid URL format').optional(),
    iShopVideoLink: z.string().url('Invalid URL format').optional(),
  }),
});

export const generalValidation = {
  CreateGeneralValidationSchema,
  UpdateGeneralValidationSchema,
};
