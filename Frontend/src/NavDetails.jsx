import React from 'react'
import DetailsShow from './DetailsShow.jsx'

function NavDetails({CSS, updateDetailsData, click, show, setClick, setShow}) {
    return (
        <div
            className={`w-[80%] h-[4vw]  ${click ? "sticky" : "relative"} top-0 z-[100] flex justify-center items-center`}>
            <div
                className="w-full h-full flex justify-center items-center bg-slate-950 border-2 rounded-full mt-4 mb-2 
               border-gray-300 hover:bg-slate-900 hover:border-orange-500 shadow-[0_2px_6px_rgba(0,0,0,0.5)] text-white text-xl select-none"

                onClick={() => {
                    setShow((prev) => !prev)
                }}
            >
                <h1 className="">Details</h1>
            </div>


            <span className="absolute right-4 top-[1rem] justify-center items-center">
                <label className="relative inline-block w-6 h-6 cursor-pointer ">
                    <input
                        type="checkbox"
                        className="opacity-0 w-0 h-0 peer"
                        checked={click}
                        onChange={() => setClick((prev) => !prev)}
                    />
                    <span className="absolute inset-0 rounded-full border-2 border-slate-600 peer-checked:bg-lime-400 transition">

                    </span>
                </label>
            </span>
            <DetailsShow CSS={CSS} updateDetailsData={updateDetailsData} show={show}/>
        </div>
    )
}

export default NavDetails