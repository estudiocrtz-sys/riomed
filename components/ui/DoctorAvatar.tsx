'use client'

import Image from 'next/image'
import type { Doctor } from '@/data/doctors'

type DoctorAvatarSize = 'sm' | 'md' | 'lg'

const sizeClasses: Record<DoctorAvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-12 w-12 text-base',
  lg: 'h-14 w-14 text-lg',
}

function doctorInitials(name: string) {
  return name.replace(/^Dr[a]?\. /, '').split(' ').map((part) => part[0]).slice(0, 2).join('')
}

export function DoctorAvatar({ doctor, size = 'md' }: { doctor: Doctor; size?: DoctorAvatarSize }) {
  return (
    <div className={`${sizeClasses[size]} flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-[#2CC295]/70 to-[#03624C] flex items-center justify-center font-bold text-white`}>
      {doctor.photo ? (
        <Image
          src={doctor.photo}
          alt={`Foto de ${doctor.name}`}
          width={56}
          height={56}
          className="h-full w-full object-cover"
        />
      ) : (
        doctorInitials(doctor.name)
      )}
    </div>
  )
}
