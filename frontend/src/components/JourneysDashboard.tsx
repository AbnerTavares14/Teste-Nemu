import React, { useState, useMemo } from 'react'
import { useJourneys } from '../hooks/useJourneys'
import { JourneysTable } from './JourneysTable'
import { Pagination } from './Pagination'

export const JourneysDashboard: React.FC = () => {
  const { journeys, loading, error } = useJourneys()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const paginatedJourneys = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return journeys.slice(startIndex, endIndex)
  }, [journeys, currentPage, itemsPerPage])

  const totalPages = Math.ceil(journeys.length / itemsPerPage)

  if (loading) return <p className="text-center mt-8">Carregando jornadas...</p>
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Jornadas de Usuário
          </h1>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Canais
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <JourneysTable journeys={paginatedJourneys} />
        </div>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <div>{journeys.length} jornadas encontradas</div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}
