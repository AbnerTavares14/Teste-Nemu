import React from 'react'

interface ChannelPillProps {
  channel: string
}

const getChannelColor = (channel: string): string => {
  const lowerChannel = channel.toLowerCase()

  if (lowerChannel.includes('google')) return 'bg-red-100 text-red-800'
  if (lowerChannel.includes('facebook')) return 'bg-blue-100 text-blue-800'
  if (lowerChannel.includes('instagram')) return 'bg-pink-100 text-pink-800'
  if (lowerChannel.includes('organic')) return 'bg-green-100 text-green-800'
  if (lowerChannel.includes('whatsapp')) return 'bg-teal-200 text-teal-800'
  if (lowerChannel.includes('link na bio')) return 'bg-purple-100 text-purple-800'
  if (lowerChannel.includes('email')) return 'bg-yellow-100 text-yellow-800'
  if (lowerChannel.includes('live')) return 'bg-orange-100 text-orange-800'

  return 'bg-gray-100 text-gray-800'
}

export const ChannelPill: React.FC<ChannelPillProps> = ({ channel }) => {
  const colorClasses = getChannelColor(channel)

  return (
    <span
      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${colorClasses}`}
    >
      {channel}
    </span>
  )
}
