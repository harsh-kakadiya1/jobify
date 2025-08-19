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
    <section className="w-full bg-gradient-to-br from-white via-blue-50 to-pink-50 rounded-2xl shadow-md py-12 px-4 flex flex-col items-center justify-center gap-8 mt-8 mb-12 text-center">
      <span className="mx-auto px-6 py-2 rounded-full bg-primary/10 text-primary font-semibold text-base shadow mb-2">Discover Your Next Opportunity</span>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-primary drop-shadow-sm">
        Find <span className="text-accent">Jobs</span> That <br />
        <span className="text-secondary">Inspire You</span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Explore thousands of jobs from top companies. Search, filter, and apply to your dream role in seconds.
      </p>
      <div className="flex w-full max-w-xl shadow-lg border border-border pl-3 rounded-full items-center gap-2 bg-white mx-auto">
        <input
          onChange={(e) => setQurey(e.target.value)}
          type="text"
          placeholder="Search for jobs, companies, skills..."
          className="outline-none border-none w-full bg-transparent px-2 py-3 rounded-full text-base"
        />
        <Button
          onClick={searchJobHandler}
          className="rounded-full bg-primary hover:bg-primary/90 px-6 py-3 text-lg"
        >
          <Search className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
}

export default HeroSection;
