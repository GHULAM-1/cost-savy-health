// components/about/transparency.tsx
import React from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import Image from 'next/image'

export interface TransparencyValue {
  type: 'do' | 'dont'
  text: string
}

export interface TransparencyProps {
  introTitle: string
  introText: string
  values: TransparencyValue[]
  roleImageUrl?: string
  imageCaption?: string
}

const ValueItem: React.FC<TransparencyValue> = ({ type, text }) => (
  <div className="flex items-start w-full md:w-[45%] gap-3 mb-1">
    {type === 'do' ? (
      <CheckCircle size={16} className="text-emerald-500 mt-[6px] flex-shrink-0" />
    ) : (
      <XCircle size={16} className="text-red-500 mt-[6px] flex-shrink-0" />
    )}
    <p className="text-[15px] sm:text-[14px]">{text}</p>
  </div>
)

export default function Transparency({ introTitle, introText, values, roleImageUrl, imageCaption }: TransparencyProps) {
  return (
    <>
      <div className="flex flex-col items-center py-[64px] md:py-[40px] px-4 sm:px-6">
        <div className="flex gap-[24px] mb-[24px] flex-col max-w-[700px] text-center">
          <p className="text-4xl font-tiempos md:text-5xl tracking-tight font-bold text-left md:text-center">
            {introTitle}
          </p>
          <p className="text-lg sm:text-xl text-left md:text-center">
            {introText}
          </p>
        </div>

        <div className="w-full max-w-[650px]">
          <div className="flex flex-row gap-12 flex-wrap gap-y-4 justify-start">
            {values.map((item, idx) => (
              <ValueItem key={idx} type={item.type} text={item.text} />
            ))}
          </div>
        </div>
      </div>

      {roleImageUrl && (
        <div className="bg-gradient-to-t from-[#a9e5e3] to-white pb-36 px-4 sm:px-6">
          <Image
            src={roleImageUrl}
            alt={imageCaption || introTitle}
            className="mx-auto w-full sm:w-[80%] md:w-[60%]"
            width={700}
            height={400}
            priority
          />
          {imageCaption && (
            <figcaption className="mt-8  md:text-center md:px-56 lg:px-80 sm:px-6 text-[15px] text-center">
              {imageCaption}
            </figcaption>
          )}
        </div>
      )}
    </>
  )
}
