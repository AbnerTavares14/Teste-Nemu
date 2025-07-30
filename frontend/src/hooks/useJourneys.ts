import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export interface TouchPoint {
	utm_source: string;
	utm_medium: string;
	utm_campaign: string;
	utm_content: string;
	createdAt: string;
	channel: string;
}

export interface ProcessedJourney {
	sessionId: string;
	touchPoints: TouchPoint[];
	touchPointCount: number;
	channels: string[];
}

const API_URL = 'http://localhost:3333/journeys'; 

export function useJourneys() {
  const [journeys, setJourneys] = useState<ProcessedJourney[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setJourneys(response.data);
      })
      .catch(err => {
        setError('Falha ao buscar dados da API.');
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // NOVO: Lógica para extrair filtros únicos
  const availableFilters = useMemo(() => {
    if (journeys.length === 0) {
      return { campaigns: [], mediums: [], contents: [] };
    }

    const campaigns = new Set<string>();
    const mediums = new Set<string>();
    const contents = new Set<string>();

    journeys.forEach(journey => {
      journey.touchPoints.forEach(tp => {
        if (tp.utm_campaign) campaigns.add(tp.utm_campaign);
        if (tp.utm_medium) mediums.add(tp.utm_medium);
        if (tp.utm_content) contents.add(tp.utm_content);
      });
    });

    return {
      campaigns: Array.from(campaigns).sort(),
      mediums: Array.from(mediums).sort(),
      contents: Array.from(contents).sort(),
    };
  }, [journeys]);

  return { journeys, loading, error, availableFilters };
}