import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQurey } from "@/redux/jobSlice";

function CategoryCarousel() {
  const catagory = [
    "Frontend Devloper",
    "Backend Devloper",
    "Data Science",
    "Graphic Designer",
    "Full Stack Devloper",
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (qurey) => {
      dispatch(setSearchQurey(qurey));
      navigate("/browse");
    };

  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Browse by Category</h2>
      <Carousel className="w-full max-w-2xl mx-auto">
        <CarouselContent>
          {catagory.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 flex justify-center">
               <Button onClick={()=>searchJobHandler(cat)} className="bg-pink-500 hover:bg-pink-600 rounded-full px-6 py-2 text-white font-semibold shadow-md text-base">{cat}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-blue-500 text-white rounded-full shadow-md"/>
        <CarouselNext className="bg-blue-500 text-white rounded-full shadow-md" />
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
