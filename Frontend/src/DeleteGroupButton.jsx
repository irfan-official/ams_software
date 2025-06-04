import React from 'react'

function DeleteGroupButton({del, deleteGroup, clearDel, setDelete}) {
    return (
        <div className='w-full h-screen bg-[rgba(192,192,192,0.734)] flex items-center justify-center fixed  z-50 bottom-0'>
            <div className="rounded-md bg-slate-600 flex flex-col items-center justify-between py-5 px-5 shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                <h3 className='text-white font-semibold text-xl text-start'>Delete this {del.groupTypes} group</h3>
                <h4 className='py-5 text-white'><strong className='text-yellow-500'>Title:</strong> {del.groupName}</h4>
                <div className='flex w-full justify-center gap-10 px-2'>
                    <button onClick={clearDel} className='px-5 py-3 w-28 rounded-md text-center bg-gray-500 text-white [0_2px_6px_rgba(0,0,0,0.9)]'>Back</button>
                    <button
                        onClick={() => { 
                            setDelete((prev) => ({...prev, clickStatus: false,}))
                            deleteGroup(del.groupID) }}

                        className='px-5 py-3 w-28 rounded-md text-center bg-red-500 text-white [0_2px_6px_rgba(0,0,0,0.9)]'>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteGroupButton