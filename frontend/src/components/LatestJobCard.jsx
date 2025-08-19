import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'
import React from 'react'

function LatestJobCard({job}) {   
  const navigate = useNavigate(); 

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 cursor-pointer rounded-2xl shadow-xl bg-white border border-border transition-transform hover:-translate-y-2 hover:shadow-2xl flex flex-col gap-3 min-h-[220px]"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary/20 to-accent/20 flex items-center justify-center text-2xl font-bold text-primary">
          {job?.company?.name?.[0] || 'C'}
        </div>
        <div>
          <h1 className="font-bold text-lg text-primary">{job?.company?.name}</h1>
          <p className="text-xs text-muted-foreground">{job?.location || 'India'}</p>
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-xl mb-1 text-accent">{job?.title}</h2>
        <p className="text-sm text-muted-foreground line-clamp-2">{job?.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-auto">
        <Badge className="bg-primary/10 text-primary font-bold" variant="ghost">{job?.position} positions</Badge>
        <Badge className="bg-accent/10 text-accent font-bold" variant="ghost">{job?.jobType}</Badge>
        <Badge className="bg-secondary/20 text-secondary font-bold" variant="ghost">{job?.salary} LPA</Badge>
      </div>
    </div>
  )
}

export default LatestJobCard