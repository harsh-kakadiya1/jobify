import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'
import React from 'react'

function LatestJobCard({job}) {   
  const navigate = useNavigate(); 

  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className='p-6 cursor-pointer rounded-2xl shadow-lg bg-white border border-gray-100 transition-transform hover:scale-105 flex flex-col gap-4 min-h-[220px]'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-lg'>
            {job?.company?.name?.[0] || 'C'}
          </div>
        <div>
            <h1 className='font-semibold text-base text-blue-800'>{job?.company?.name}</h1>
            <p className='text-xs text-gray-400'>India</p>
          </div>
        </div>
        <div>
            <h1 className='font-bold text-xl my-1 text-gray-800'>{job?.title}</h1>
            <p className='text-sm text-gray-600'>{job?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-auto'>
            <Badge className='bg-blue-100 text-blue-700 font-bold rounded-full px-3' variant="ghost">{job?.position} positions</Badge>
            <Badge className='bg-pink-100 text-pink-600 font-bold rounded-full px-3' variant="ghost">{job?.jobType}</Badge>
            <Badge className='bg-yellow-100 text-yellow-600 rounded-full px-3' variant="ghost">{job?.salary} LPA</Badge>
        </div>
    </div>
  )
}

export default LatestJobCard