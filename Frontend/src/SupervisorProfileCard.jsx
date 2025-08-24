import React, {useEffect} from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

function SupervisorProfileCard({name, department, email, gender, image}) {

    return (
        <div className="w-[25vmax] min-h-[16vmax] bg-slate-900/70 backdrop-blur-xl rounded-lg text-white p-2 px-3 shadow-[0_4px_10px_rgba(0,0,0,0.5)] border">
            {/* Level 1 */}
            <div className="__level_1__ w-full flex items-center gap-4">
                <div className="__image__ w-[65px] h-[65px] rounded-full border-2 border-gray-400 overflow-hidden ">
                    <img className='h-full w-full object-cover object-center' src={image} alt="" />
                </div>
                <h2 className="__name__">{name}</h2>
            </div>

            <hr className="bg-white mt-2" />

            {/* Level 2 with hover overlay */}
            <div className="__level_2__ mt-1 relative group">
                {/* Overlay */}
                <div className="absolute inset-0 bg-amber-50/5 backdrop-blur-xs hidden group-hover:flex items-center justify-center rounded-md transition">
                    <button className="font-semibold text-white bg-slate-800 hover:bg-slate-900 px-5 hover:cursor-pointer py-2 rounded-lg shadow-md">
                        View Profile
                    </button>
                </div>

                {/* Content */}
                <p>
                    <span className="font-semibold">Email: </span>
                    <span>{email}</span>
                </p>
                <p>
                    <span className="font-semibold">Department: </span>
                    <span>{department}</span>
                </p>
                <p>
                    <span className="font-semibold">Gender: </span>
                    <span>{gender}</span>
                </p>
            </div>

            <hr className="bg-white mt-2" />

            {/* Level 4 */}
            <div className="__level_4__ mt-2 flex gap-6 justify-center items-center">
                <button className="cursor-pointer px-2 py-[2px] bg-slate-500 hover:bg-lime-500 text-white flex items-center justify-center gap-2 rounded-md">
                    <CiEdit />
                    <p>Edit</p>
                </button>
                <button className="cursor-pointer px-2 py-[2px] bg-slate-500 hover:bg-red-600 text-white flex items-center justify-center gap-2 rounded-md">
                    <RiDeleteBinLine />
                    <p>Delete</p>
                </button>
            </div>
        </div>
    )
}

export default SupervisorProfileCard
