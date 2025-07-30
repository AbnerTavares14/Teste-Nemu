import React from 'react'
import { ProcessedJourney } from '../hooks/useJourneys'
import { ChannelPill } from './ChannelPill'

export const JourneysTable: React.FC<{ journeys: ProcessedJourney[] }> = ({
  journeys,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="border-b border-gray-200">
          <tr>
            <th className="py-3 px-6 text-left text-xs font-bold uppercase text-gray-500 tracking-wider">
              Jornada
            </th>
            <th className="w-40 py-3 px-6 text-left text-xs font-bold uppercase text-gray-500 tracking-wider">
              Touchpoints
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {journeys.map((journey) => (
            <tr key={journey.sessionId} className="hover:bg-gray-50">
              <td className="py-4 px-6 align-top">
                {' '}
                <div className="flex flex-wrap items-center gap-2">
                  {' '}
                  {journey.channels.map((channel, index) => (
                    <React.Fragment key={index}>
                      <ChannelPill channel={channel} />
                      {index < journey.channels.length - 1 && (
                        <span className="text-gray-400 font-light">&gt;</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </td>
              <td className="py-4 px-6 text-gray-700 align-top">
                {' '}
                {journey.touchPointCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
