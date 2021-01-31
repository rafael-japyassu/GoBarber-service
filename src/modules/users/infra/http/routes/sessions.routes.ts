import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import SessionsControllers from '../controllers/SessionsController';

const sessionRouter = Router();
const sessionsController = new SessionsControllers();

sessionRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create);

export default sessionRouter;
