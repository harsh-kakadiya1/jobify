import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import {  setSearchCompanyByText } from '@/redux/companySlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByTest } from '@/redux/jobSlice'

function CompanyJob() {

    
    useGetAllAdminJobs();
    // console.log(jobId);

    const navigate = useNavigate();
    const [input,setInput] = useState("");

    const dispatch = useDispatch();


    useEffect(()=>{
      dispatch(setSearchJobByTest(input));
    },[input]);
    
  return (
    <div className="min-h-[80vh] bg-[#f8fafc] py-8">
      <div className="p-8 rounded-xl max-w-5xl mx-auto shadow-lg bg-white">
        <div className="flex items-center gap-5 mb-6">
          <Button
            onClick={() => navigate('/admin/jobs/create')}
            className="rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow px-6 py-2"
          >
            Post New Job
          </Button>
          <h1 className="font-bold text-2xl">Jobs</h1>
        </div>
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit rounded-md border border-gray-300 px-3 py-2"
            placeholder="Filter by name, role"
            onChange = {(e)=>setInput(e.target.value)}
          />
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  )
}

export default CompanyJob