import { useState, useEffect } from 'react';
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

    return { journeys, loading, error };
}