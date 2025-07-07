import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQurey } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [qurey, setQurey] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const searchJobHandler = () => {
    dispatch(setSearchQurey(qurey));
    navigate("/browse");
  };

  return (
    <div className="text-center bg-gradient-to-b from-blue-50 via-pink-50 to-yellow-50 py-12 rounded-b-3xl shadow-md">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm shadow">Discover Your Next Opportunity</span>
        <h1 className="text-5xl font-extrabold mt-4">
          Find <span className="text-pink-500">Jobs</span> <span className="text-yellow-400">That</span> <span className="text-blue-500">Inspire You</span>
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto mt-2">
          Explore thousands of jobs from top companies. Search, filter, and apply to your dream role in seconds.
        </p>
        <div className="flex w-full max-w-xl shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto bg-white mt-4">
          <input
            onChange={(e) => setQurey(e.target.value)}
            type="text"
            placeholder="Search for jobs, companies, skills..."
            className="outline-none border-none w-full bg-transparent px-2 py-3 text-lg rounded-full"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-full bg-blue-500 hover:bg-blue-600 px-6 py-3 text-white font-semibold shadow"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
