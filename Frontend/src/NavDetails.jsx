import React from "react";
import DetailsShow from "./DetailsShow.jsx";

function NavDetails({
  CSS,
  updateDetailsData,
  click,
  show,
  setClick,
  setShow,
}) {
  return (
    <div
      className={`w-[80%] md:h-[4vw] 2xl:h-[3vw] ${
        click ? "sticky" : "relative"
      } top-0 z-[100] flex justify-center items-center`}
    >
      <div
        className="w-full h-full flex justify-center items-center bg-slate-950 border-2 rounded-full mt-4 mb-2  relative z-10
               border-gray-300 hover:bg-slate-900 hover:border-orange-500 shadow-[0_2px_6px_rgba(0,0,0,0.5)] text-white text-xl select-none"
      >
        <h1 className="">Details</h1>
      </div>

      <span
        onClick={() => {
          setShow((prev) => !prev);
        }}
        className="absolute  top-0 mt-1 mb-2 flex justify-end items-center w-full h-full z-10"
      >
        <label className="relative inline-block md:w-6 md:h-6 2xl:w-7 2xl:h-7 cursor-pointer mx-5 ">
          <input
            type="checkbox"
            className="opacity-0 w-0 h-0 peer"
            checked={click}
            onChange={() => setClick((prev) => !prev)}
          />
          <span className="absolute inset-0 rounded-full border-2 border-slate-600 peer-checked:bg-lime-400 transition"></span>
        </label>
      </span>

      <DetailsShow
        CSS={CSS}
        updateDetailsData={updateDetailsData}
        show={show}
      />
    </div>
  );
}

export default NavDetails;
