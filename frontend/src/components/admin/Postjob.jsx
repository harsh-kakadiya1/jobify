import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const companyArray = [];

function Postjob() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const companies = useSelector((store) => store.company.companies);
  const navigate = useNavigate();

  //   console.log(companies);

  const [loading,setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value)=>{
    const selectedCompany = companies.find((company)=>company.name.toLowerCase() === value);
    setInput({ ...input, companyId: selectedCompany._id });
  }

  const submitHandler = async (e) =>{
    e.preventDefault();
    try {
        setLoading(true);

        const res = await axios.post(`${JOB_API_END_POINT}/post`,input,
            {
                headers:{
                "Content-Type": "application/json",
            },
            withCredentials:true
        }
        );

        if(res.data.success){
            toast.success(res.data.message);
            navigate('/admin/jobs');
        }

    } catch (error) {
        toast.error(error.response.data.message);
    }finally{
        setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh] flex items-center justify-center bg-[#f8fafc]">
        <form onSubmit={submitHandler} className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
          <div className="flex items-center gap-5 mb-6">
            <Button
              onClick={() => navigate('/admin/jobs')}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold rounded-md"
              type="button"
            >
              Back
            </Button>
            <h1 className="font-bold text-2xl">Post New Job</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-1 block">Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="rounded-md border border-gray-300 px-3 py-2 w-full"
              />
            </div>
            <div>
              <Label className="mb-1 block">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="rounded-md border border-gray-300 px-3 py-2 w-full"
              />
            </div>
            <div>
              <Label className="mb-1 block">Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="rounded-md border border-gray-300 px-3 py-2 w-full"
              />
            </div>
            <div>
              <Label className="mb-1 block">Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="rounded-md border border-gray-300 px-3 py-2 w-full"
              />
            </div>
            <div>
              <Label className="mb-1 block">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="rounded-md border border-gray-300 px-3 py-2 w-full"
              />
            </div>
            <div>
              <Label className="mb-1 block">Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="rounded-md border border-gray-300 px-3 py-2 w-full"
              />
            </div>
            <div>
              <Label className="mb-1 block">Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="rounded-md border border-gray-300 px-3 py-2 w-full"
              />
            </div>
            <div>
              <Label className="mb-1 block">Number of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="rounded-md border border-gray-300 px-3 py-2 w-full"
              />
            </div>
            <div className="col-span-2">
              {companies?.length > 0 && (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full rounded-md border border-gray-300 px-3 py-2">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem value={company?.name.toLowerCase()} key={company._id}>{company.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-2 rounded-md bg-blue-500 text-white font-semibold py-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 shadow">
              Post New Job
            </Button>
          )}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register company first, before posting a job.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Postjob;
