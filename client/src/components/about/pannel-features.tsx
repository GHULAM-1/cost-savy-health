// components/about/panel-features.tsx
import React from 'react'
import Card from '@/components/card'
import { Hospital, ShieldPlus, Building2 } from 'lucide-react'

// Map icon names to components
const iconMap = {
  Hospital,
  ShieldPlus,
  Building2,
}

type IconName = keyof typeof iconMap

export interface PanelFeatureType {
  title: string
  description: string
  iconName: IconName
}

interface PanelFeaturesProps {
  features: PanelFeatureType[]
}

export default function PanelFeatures({ features }: PanelFeaturesProps) {
  return (
    <div className="lg:py-16 py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((item, idx) => {
          const IconComponent = iconMap[item.iconName]
          return (
            <Card
              key={idx}
              title={item.title}
              description={item.description}
              icon={IconComponent}
              iconColor="bg-[#A34E78]"
            />
          )
        })}
      </div>
    </div>
  )
}
