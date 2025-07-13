import React, { useState, useRef } from "react";

function TempCard({ count }) {
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);

  const handleCopy = () => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    // Try modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(textarea.value)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        })
        .catch(() => fallbackCopy());
    } else {
      // Fallback for insecure context or unsupported browsers
      fallbackCopy();
    }

    function fallbackCopy() {
      textarea.select();

      try {
        const successful = document.execCommand("copy");
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } else {
          alert("Copy failed — please copy manually.");
        }
      } catch (err) {
        alert("Copy not supported in this browser.");
      }

      // ✅ Remove text selection after copying
      window.getSelection()?.removeAllRanges();
    }
  };

  return (
    <div className="">
      <div className="__top_div_start__ w-full h-14 flex items-center gap-1 justify-between">
        <div className="__top-div__ w-[92%] h-full bg-[#1B1B1B] flex gap-1 justify-evenly items-center rounded-[11px] border px-2 py-2">
          <span className="_number__">{count + 1}</span>
          <div className="__input_parrent_div__ w-[82%] h-10 flex relative ">
            <textarea
              ref={textareaRef}
              className="__url__ w-full h-full px-2 py-[7px] overflow-y-auto text-start bg-black border relative z-40 border-[#474747] rounded-[8px] outline-0 resize-y"
            ></textarea>
            <span
              className="__copy_button__ h-[97%] bg-black rounded-sm absolute z-50 top-[0.9px] bottom-[0.9px] right-1 flex items-center justify-center p-1 cursor-pointer"
              onClick={handleCopy}
            >
              <img className="w-[20px]" src="./assets/copy.png" alt="copy" />
            </span>
            {copied && (
              <div className="absolute right-10 bottom-1 text-xs text-green-400 bg-black px-2 py-1 rounded z-50">
                Copied!
              </div>
            )}
          </div>
          <img className="w-[25px]" src="./assets/REDlike.png" alt="" />
        </div>
        <button
          className="px-1 h-full bg-black hover:bg-gray-800 border rounded-lg"
          onClick={() => setIsLeftOpen(!isLeftOpen)}
        >
          <img className="w-[25px]" src="./assets/down.png" alt="" />
        </button>
      </div>

      {/* Animated Dropdown Panel */}
      <div
        className={`mt-2 transform transition-all duration-500 ease-in-out origin-top overflow-hidden ${
          isLeftOpen
            ? "opacity-100 scale-y-100 max-h-full"
            : "opacity-0 scale-y-0 max-h-0"
        }`}
      >
        <div className="border border-white rounded-xl p-4 w-[100%] bg-[#1B1B1B] flex flex-col gap-4">
          <div className="w-full flex gap-2 items-center">
            <input
              className="bg-black h-10 w-[75%] px-2 py-1 outline-0 border rounded-[8px] border-[#474747]"
              type="text"
            />
            <div className="w-[30%] flex items-center justify-evenly gap-2">
              <img className="w-[24px]" src="./assets/blueEdit.png" alt="" />
              <img className="w-[24px]" src="./assets/analytics.png" alt="" />
              <img className="w-[24px]" src="./assets/redbin.png" alt="" />
            </div>
          </div>
          <textarea
            className="bg-black h-16 w-full px-2 py-1 outline-0 border rounded-[8px] border-[#474747]"
            type="text"
          />
          <textarea
            className="bg-black h-24 w-full px-2 py-1 outline-0 select-none border rounded-[8px] border-[#474747]"
            type="text"
          />
        </div>
      </div>
    </div>
  );
}

export default TempCard;
