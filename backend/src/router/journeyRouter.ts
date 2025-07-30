import {Router} from 'express';
import { JourneyController } from '../controller/journeyController';
import { JourneyService } from '../service/journeyService';
import path from 'path';


const dataFilePath = path.join(__dirname, '..', 'data', 'journeys_data.xlsx');
const journeyService = new JourneyService(dataFilePath);
const journeyController = new JourneyController(journeyService);

export const journeyRouter = Router();

journeyRouter.get('/journeys', journeyController.getAllJourneys);