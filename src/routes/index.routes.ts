import {Router} from 'express'
const router = Router();
import { indexWelcome } from '../controllers/index.controller';

router.route('/') 
    .get(indexWelcome);

export default router