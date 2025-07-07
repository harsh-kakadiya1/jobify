import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import useGetCompanyById from "@/hooks/useGetCompanyById";
// import store from "@/redux/store";

function CompanySetup() {
  const params = useParams();
  const { singleCompany } = useSelector((store) => store.company);

  useGetCompanyById(params.id);


  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  // console.log(singleCompany);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: singleCompany?.file || null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh] flex items-center justify-center bg-[#f8fafc]">
        <form onSubmit={submitHandler} className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
          <div className="flex items-center gap-5 mb-6">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold rounded-md"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-2xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-1 block">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
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
              <Label className="mb-1 block">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
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
            <div className="col-span-2">
              <Label className="mb-1 block">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="rounded-md border border-gray-300 px-3 py-2 w-full"
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-2 rounded-md bg-blue-500 text-white font-semibold py-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 shadow">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default CompanySetup;
