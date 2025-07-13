import { useRef, useState } from "react";
import TempCard from "./TempCard";

export default function Mobile() {



  const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);


  return (
    <div className="min-h-screen w-full bg-[#5C5C5C] p-[10px] text-white flex flex-col gap-2">
      {arr.map((item, index) => {
        return (
          <TempCard
            key={index}

            count={index}


          />
        );
      })}
    </div>
  );
}
