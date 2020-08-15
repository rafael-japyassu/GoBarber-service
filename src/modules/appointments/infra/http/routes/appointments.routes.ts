import { Router } from 'express';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const apointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticate);

appointmentsRouter.post('/', apointmentsController.create);

export default appointmentsRouter;
