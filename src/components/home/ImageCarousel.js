import React from "react";
import { Carousel } from "flowbite-react";

const ImageCarousel = () => {
  return (
    <div className="pt-[60px] w-full h-[300px]">
      <Carousel>
        <img
          alt="..."
          src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
        />
        <img
          alt="..."
          src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
        />
        <img
          alt="..."
          src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
        />
        <img
          alt="..."
          src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
        />
        <img
          alt="..."
          src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
        />
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
