'use client'

import { useRef } from 'react'

export default function ResumeButton() {
  const handleDownload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTimeout(() => {
        const link = document.createElement('a')
        link.href = '/MohitAdoni_Resume_main.pdf'
        link.download = 'MohitAdoni_Resume.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }, 1500) // Delay to let the installation animation play partially before browser popup
    }
  }

  return (
    <div className="resume-btn-container">
      <label className="resume-label">
        <input type="checkbox" className="input" onChange={handleDownload} />
        <span className="title font-display font-bold">Resume</span>
        <span className="title font-display font-bold">Downloaded</span>
        <div className="circle">
          <svg
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <div className="square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#23ae23"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full p-0.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      </label>
    </div>
  )
}
