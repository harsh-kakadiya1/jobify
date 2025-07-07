import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { toast } from "sonner";

function CompanayCreate() {

    const navigate = useNavigate();
    const [companyName,setCompanyName] = useState();
    const dispatch = useDispatch();

    const registerNewCompany = async () =>{
        try {

            const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });

            // console.log(res);
            
            
            if(res?.data.success){
              console.log(res.data.company);
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res.data?.company?._id
                navigate(`/admin/companies/${companyId}`);
            }

        } catch (error) {
            console.log(error);
        }
    } 

  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh] flex items-center justify-center bg-[#f8fafc]">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
          <div>
            <h1 className="font-bold text-2xl mb-2">Your Company Name</h1>
            <p className="text-gray-500 mb-4">
              Please enter your company name to get started.
            </p>
          </div>
          <Label className="mb-1 block">Company Name</Label>
          <Input
            type="text"
            className="rounded-md border border-gray-300 px-3 py-2 w-full mb-4"
            placeholder="Jobhunt, Microsoft ..."
            onChange = {(e)=>setCompanyName(e.target.value)}
          />
          <div className="flex items-center gap-2 mt-6">
            <Button onClick={()=>navigate('/admin/companies')} variant="outline" className="rounded-md">Cancel</Button>
            <Button onClick={registerNewCompany} className="rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow">Continue</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanayCreate;
