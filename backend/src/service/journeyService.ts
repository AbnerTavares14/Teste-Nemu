import * as XLSX from 'xlsx';
import { ProcessedJourney, EnrichedTouchPoint } from '../types';
 
export class JourneyService {
  private processedJourneys: ProcessedJourney[] = [];

  constructor(filePath: string) {
    this.loadAndProcessJourneys(filePath);
  }

  public getJourneys(): ProcessedJourney[] {
    return this.processedJourneys;
  }

      private capitalize(s: string): string {
        if (!s) return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    private getChannelFromUtms(source?: string, medium?: string, campaign?: string): string {
        const src = source?.toLowerCase() || '';
        const med = medium?.toLowerCase() || '';
        const camp = campaign?.toLowerCase() || '';

        if (med === 'organic' || src === 'organic' || src.includes('organic')) {
            if (src && src.includes('_organic')) {
                return `${this.capitalize(src.split("_")[0])} Organic`; 
            }
            return 'Organic'; 
        }

        if (med === 'whatsapp') {
            return 'WhatsApp';
        }

        if (med.includes('email') || src.includes('email')) {
            return 'Email';
        }

        if (src.includes('live')) {
          return 'Live';
        }

        if (med === 'social' || src.includes('reels') || src.includes('insta')) {
          return 'Instagram';
        }

        if (src === 'sitebotãobio' || med.includes('linkbio') || src.includes('bio') || med.includes('bio')) {
            return 'Link na Bio';
        }

        if (src.includes('stories') || med.includes('stories') || camp.includes('stories') || med.includes('story')) {
            return 'Instagram Stories';
        }

        if ((src.includes('facebookads') || med.includes('facebookads') || camp.includes('facebookads'))) {
            return 'Facebook Ads';
        }

        if (src.includes('facebook')) {
          return 'Facebook';
        }

        if (src) return this.capitalize(src);
        if (med) return this.capitalize(med);

        return 'Other';
    }



  private loadAndProcessJourneys(filePath: string): void {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rawData: any[] = XLSX.utils.sheet_to_json(worksheet);

    const enrichedData: EnrichedTouchPoint[] = rawData.map(touchPoint => {
        const channel = this.getChannelFromUtms(
            touchPoint.utm_source, 
            touchPoint.utm_medium, 
            touchPoint.utm_campaign 
        );
        return {
        ...touchPoint,
        channel: channel,
        };
    });

    const journeysBySession = new Map<string, EnrichedTouchPoint[]>();
    for (const touchPoint of enrichedData) {
      if (!journeysBySession.has(touchPoint.sessionId)) {
        journeysBySession.set(touchPoint.sessionId, []);
      }
      journeysBySession.get(touchPoint.sessionId)!.push(touchPoint);
    }

    const finalProcessedJourneys: ProcessedJourney[] = [];

    journeysBySession.forEach((touchPoints, sessionId) => {
      const sortedTouchPoints = touchPoints.sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

      const finalTouchPoints = this.applyDeduplicationRule(sortedTouchPoints);
      
      finalProcessedJourneys.push({
        sessionId,
        touchPoints: finalTouchPoints,
        touchPointCount: finalTouchPoints.length,
        channels: finalTouchPoints.map(tp => tp.channel),
      });
    });

    this.processedJourneys = finalProcessedJourneys;
  }

  private applyDeduplicationRule(touchPoints: EnrichedTouchPoint[]): EnrichedTouchPoint[] {
    if (touchPoints.length <= 2) {
      return touchPoints;
    }

    const firstTouchPoint = touchPoints[0];
    const lastTouchPoint = touchPoints[touchPoints.length - 1];
    const middleTouchPoints = touchPoints.slice(1, -1);

    const seenChannelsInMiddle = new Set<string>();
    const uniqueMiddleTouchPoints: EnrichedTouchPoint[] = [];

    if (middleTouchPoints.some(tp => tp.channel === firstTouchPoint.channel)) {
      seenChannelsInMiddle.add(firstTouchPoint.channel);
    }

    for (const touchPoint of middleTouchPoints) {
      if (!seenChannelsInMiddle.has(touchPoint.channel)) {
        uniqueMiddleTouchPoints.push(touchPoint);
        seenChannelsInMiddle.add(touchPoint.channel);
      }
    }

    return [firstTouchPoint, ...uniqueMiddleTouchPoints, lastTouchPoint];
  }
}