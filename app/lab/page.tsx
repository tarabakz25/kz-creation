"use client";

import { useState } from "react";
import Menu from "@/components/layouts/Menu";
import { worksData } from "@/lib/contents/works";
import Image from "next/image";

type Work = (typeof worksData)[0];

export default function LabPage() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  return (
    <main className="h-screen flex justify-between px-[5vw] py-[10vh] overflow-hidden relative">
      {/* Left Section */}
      <div className="flex flex-col items-start w-1/3 h-full text-white gap-8 z-20">
        <h1 className="text-3xl font-futura tracking-wider">My Works.</h1>
        <Menu />
      </div>

      {/* Right Section: Scrollable List */}
      <div className="w-2/3 h-full overflow-y-auto flex flex-col items-end gap-8 pb-20 pr-2">
        {worksData.map((work, index) => (
          <button
            key={index}
            onClick={() => setSelectedWork(work)}
            className="group flex flex-col items-end text-right transition-all duration-300 hover:opacity-100 opacity-70"
          >
            <h2
              className={`text-2xl tracking-wider font-futura leading-none mb-2 ${
                selectedWork?.name === work.name ? "text-white/30" : "text-white"
              }`}
            >
              {work.name}
            </h2>
            <div className="flex gap-2">
              {work.tags.map((tag) => (
                <span key={tag} className="text-xs text-white/50 px-2 py-0.5">
                  #{tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Popup */}
      {selectedWork && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-transparent"
          onClick={() => setSelectedWork(null)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Escape" && setSelectedWork(null)}
        >
          <div
            className="p-6 md:p-10 rounded-2xl max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row gap-8"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedWork(null)}
              aria-label="Close"
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image */}
            {selectedWork.image && (
              <div className="w-full md:w-1/2 aspect-video rounded-lg overflow-hidden border border-white/5 bg-white/5 flex-shrink-0 relative">
                <Image
                  src={selectedWork.image}
                  alt={selectedWork.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div
              className={`flex flex-col justify-between w-full ${selectedWork.image ? "md:w-1/2" : ""} text-white`}
            >
              <div>
                <h3 className="text-3xl font-bold mb-4">{selectedWork.name}</h3>
                <div className="flex flex-wrap gap-1 mb-6">
                  {selectedWork.tags.map((tag) => (
                    <span key={tag} className="text-sm text-white/70 px-2 py-1">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {selectedWork.url ? (
                <a
                  href={selectedWork.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-futura tracking-wider text-white px-6 py-3 hover:text-white/60 transition-colors mt-4 md:mt-0"
                >
                  <span>Visit Website</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              ) : (
                <div className="text-white/40 font-futura tracking-wider text-sm mt-4 md:mt-0">
                  No public URL available
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
