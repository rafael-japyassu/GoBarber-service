import { Router } from 'express';
import SessionsControllers from '../controllers/SessionsController';

const sessionRouter = Router();
const sessionsController = new SessionsControllers();

sessionRouter.post('/', sessionsController.create);

export default sessionRouter;
