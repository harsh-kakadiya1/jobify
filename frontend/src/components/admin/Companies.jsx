import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { setCompanies, setSearchCompanyByText } from '@/redux/companySlice'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function Companies() {

    useGetAllCompanies();
    const navigate = useNavigate();
    const [input,setInput] = useState("");

    const dispatch = useDispatch();


    useEffect(()=>{
      dispatch(setSearchCompanyByText(input));
    },[input]);
    
  return (
    <div>
        <Navbar/>
        <div className="min-h-[90vh] bg-[#f8fafc] py-8">
          <div className="p-8 rounded-xl max-w-5xl mx-auto shadow-lg bg-white">
            <div className="flex items-center justify-between my-5">
              <Input
                className="w-fit rounded-md border border-gray-300 px-3 py-2"
                placeholder="Filter by name"
                onChange = {(e)=>setInput(e.target.value)}
              />
              <Button className="rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow px-6 py-2" onClick={()=>navigate('/admin/companies/create')}>
                New Company
              </Button>
            </div>
            <CompaniesTable/>
          </div>
        </div>
    </div>
  )
}

export default Companies