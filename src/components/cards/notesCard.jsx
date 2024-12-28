import React from "react";

const CourseCard = ({ title, description, handleNoteUpdate }) => {


  return (
    <div className=" h-[200px] flex flex-col  px-5 pt-5 rounded-3xl bg-primary bg-opacity-20 space-y-6">


      <h2 className="text-2xl font-bold mt-4 text-primary">{title}</h2>
      <p>{description}</p>
      <button className="w-fit font-bold bg-gradient-to-r to-primary from-secondary text-white py-2 px-4 
      rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary" onClick={handleNoteUpdate}> Update Notes </button>
    </div>
  );
};

export default CourseCard;
