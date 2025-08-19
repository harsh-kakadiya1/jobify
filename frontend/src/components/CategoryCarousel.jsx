import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQurey } from "@/redux/jobSlice";
import { Code, Database, Palette, Users, Layers } from "lucide-react";

const icons = [
  <Code key="frontend" />, // Frontend
  <Layers key="backend" />, // Backend
  <Database key="data" />, // Data Science
  <Palette key="design" />, // Graphic Designer
  <Users key="fullstack" />, // Full Stack
];

function CategoryCarousel() {
  const catagory = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack Developer",
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (qurey) => {
    dispatch(setSearchQurey(qurey));
    navigate("/browse");
  };

  return (
    <section className="w-full max-w-3xl mx-auto my-12">
      <h2 className="text-2xl font-bold mb-6 text-primary text-center">Browse by Category</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {catagory.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 flex justify-center">
              <Button
                onClick={() => searchJobHandler(cat)}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent/80 hover:bg-accent text-white shadow-lg text-base font-semibold transition-all duration-200"
              >
                {icons[index]}
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-primary text-white" />
        <CarouselNext className="bg-primary text-white" />
      </Carousel>
    </section>
  );
}

export default CategoryCarousel;
