import React from "react";
import { useNavigate } from "react-router-dom";

function DeleteReportButton({
  reportID,
  week,
  date,
  deleteReport,
  setDelClick,
}) {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-[rgba(192,192,192,0.734)] flex items-center justify-center fixed  z-50 bottom-0">
      <div className="rounded-md bg-slate-600 flex flex-col items-center justify-between py-5 px-5 shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
        <h3 className="text-white font-semibold text-xl text-start">
          Delete Report
        </h3>
        <div className="w-full flex gap-10 items-center justify-center">
          <h4 className="py-5 text-white">
            <strong className="text-yellow-500">week:</strong> {week}
          </h4>
          <h4 className="py-5 text-white">
            <strong className="text-yellow-500">Date:</strong> {date}
          </h4>
        </div>
        <div className="flex w-full justify-center gap-10 px-2">
          <button
            onClick={() => {
              setDelClick({
                clickStatus: false,
                reportID: "",
                week: "",
                date: "",
              });
            }}
            className="px-5 py-3 w-28 rounded-md text-center bg-gray-500 hover:bg-gray-800 text-white [0_2px_6px_rgba(0,0,0,0.9)] cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={() => {
              deleteReport(reportID);
            }}
            className="px-5 py-3 w-28 rounded-md text-center bg-red-500 hover:bg-red-700 text-white [0_2px_6px_rgba(0,0,0,0.9)] cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteReportButton;
