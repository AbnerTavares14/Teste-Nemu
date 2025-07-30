import { Request, Response } from 'express';
import { JourneyService } from '../service/journeyService';

export class JourneyController {
  constructor(private journeyService: JourneyService) {
    this.getAllJourneys = this.getAllJourneys.bind(this);
  }

  public getAllJourneys(req: Request, res: Response): void {
    const journeys = this.journeyService.getJourneys();
    res.status(200).json(journeys);
  }
}