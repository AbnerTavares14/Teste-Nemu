import React, { useState, useMemo } from 'react'
import { useJourneys } from '../hooks/useJourneys'
import { JourneysTable } from './JourneysTable'
import { Pagination } from './Pagination'
import { JourneyFilters } from './JourneyFilters'

export const JourneysDashboard: React.FC = () => {
  const { journeys, loading, error, availableFilters } = useJourneys()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [activeFilters, setActiveFilters] = useState({
    campaign: '',
    medium: '',
    content: '',
  })

  const handleFilterChange = (
    filterType: 'campaign' | 'medium' | 'content',
    value: string
  ) => {
    setActiveFilters((prev) => ({ ...prev, [filterType]: value }))
    setCurrentPage(1)
  }

  const filteredJourneys = useMemo(() => {
    return journeys.filter((journey) => {
      const campaignMatch =
        !activeFilters.campaign ||
        journey.touchPoints.some(
          (tp) => tp.utm_campaign === activeFilters.campaign
        )

      const mediumMatch =
        !activeFilters.medium ||
        journey.touchPoints.some((tp) => tp.utm_medium === activeFilters.medium)

      const contentMatch =
        !activeFilters.content ||
        journey.touchPoints.some(
          (tp) => tp.utm_content === activeFilters.content
        )

      return campaignMatch && mediumMatch && contentMatch
    })
  }, [journeys, activeFilters])

  const paginatedJourneys = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredJourneys.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredJourneys, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredJourneys.length / itemsPerPage)

  if (loading) return <p className="text-center mt-8">Carregando...</p>
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Jornadas de Usuário
          </h1>
        </div>

        <JourneyFilters
          filters={availableFilters}
          onFilterChange={handleFilterChange}
        />

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <JourneysTable journeys={paginatedJourneys} />
        </div>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <div>{filteredJourneys.length} jornadas encontradas</div>
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
