import React from "react";

const BannerIte = ({ slide }) => {
  const { image, id, prev, next } = slide;
  return (
    <div id={`slide${id}`} className="carousel-item relative w-full">
      <div className="carousel-image">
        <img
          src={image}
          alt="image1"
          className="w-full rounded-xl h-min-screen"
        />
      </div>
      <div className="absolute flex justify-end transform -translate-y-1/2 left-20  top-1/3">
        <h1 className="text-6xl text-white font-bold-700">
          {" "}
          Affordable <br /> Price for Car <br /> car Servicing
        </h1>
      </div>
      <div className="absolute flex justify-end transform -translate-y-1/2 left-20 w-2/5 top-1/2">
        <p className=" text-white text-xl">
          {" "}
          There are many variations of passages of available, but the majority
          have suffered alteration in some form{" "}
        </p>
      </div>
      <div className="absolute flex justify-start transform -translate-y-1/2 left-20 top-2/3">
        <button className="btn btn-danger bg-red-600 border-0 mr-5">
          Discover More
        </button>
        <button className="btn btn-outline btn-warning border-1">
          Latest Project
        </button>
      </div>
      <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
        <a href={`#slide${prev}`} className="btn btn-circle mr-5 ">
          ❮
        </a>
        <a
          href={`#slide${next}`}
          className="btn btn-circle bg-red-500 border-0"
        >
          ❯
        </a>
      </div>
    </div>
  );
};

export default BannerIte;
