export interface RawTouchPoint {
  sessionId: string;
  created_at: string; 
  utm_source: string;
  utm_campaign: string;
  utm_medium: string;
  utm_content: string;
};
  
export interface ProcessedJourney {
  sessionId: string;
  touchPoints: RawTouchPoint[];
  touchPointCount: number;
  channels: string[];
};

export interface EnrichedTouchPoint extends RawTouchPoint {
  channel: string; 
}