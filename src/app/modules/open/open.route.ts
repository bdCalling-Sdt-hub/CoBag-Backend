import express from 'express';
import { openController } from './open.controller';


const router = express.Router();

router.get(
    '/',
    openController.open,
)



export const openRoutes = router;
