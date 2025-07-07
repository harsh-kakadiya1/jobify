import React from 'react'
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux';

// const randomJob = [1,2,3,4,5,6,7,8];

function LatestJobs() {


    const {allJobs} = useSelector(store => store.job);

  return (
    <div className='max-w-5xl mx-auto my-20'>
        <h1 className='text-4xl font-extrabold text-center mb-8'>
          <span className='text-pink-500'>Latest</span> <span className='text-blue-500'>& Top</span> Job Openings
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 my-5'>
        {
            allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job)=><LatestJobCard  key={job._id} job={job}/>)
        }
        </div>
    </div>
  )
}

export default LatestJobs