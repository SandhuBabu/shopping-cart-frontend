import React from 'react'

export const ButtonSkeleton = () => {
  return (
    <div className="animate-pulse flex">
      <div className="space-y-3 w-[7em]">
        <div className="bg-slate-500 rounded w-full h-10"></div>
      </div>
    </div>
  )
}
