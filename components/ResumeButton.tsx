'use client'

import { useState } from 'react'

export default function ResumeButton() {
  const [checked, setChecked] = useState(false)

  const handleClick = () => {
    if (checked) return
    setChecked(true)

    // Trigger file download
    const link = document.createElement('a')
    link.href = '/MohitAdoni_Resume_main.pdf'
    link.download = 'MohitAdoni_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Reset after animation completes (~4s)
    setTimeout(() => setChecked(false), 4200)
  }

  return (
    <>
      <style>{`
        .resume-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .resume-label {
          background-color: transparent;
          border: 2px solid rgb(91, 91, 240);
          display: flex;
          align-items: center;
          border-radius: 50px;
          width: 160px;
          cursor: pointer;
          transition: all 0.4s ease;
          padding: 5px;
          position: relative;
          user-select: none;
        }

        .resume-label::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: #fff;
          width: 8px;
          height: 8px;
          transition: all 0.4s ease;
          border-radius: 100%;
          margin: auto;
          opacity: 0;
          visibility: hidden;
        }

        .resume-label .resume-title {
          font-size: 15px;
          font-weight: 800;
          color: #fff;
          transition: all 0.4s ease;
          position: absolute;
          left: 0;
          right: 18px;
          top: 50%;
          transform: translateY(-50%);
          text-align: center;
          letter-spacing: 0.08em;
          font-family: inherit;
          padding-left: 55px;
        }

        .resume-label .resume-title:last-child {
          opacity: 0;
          visibility: hidden;
          padding-left: 0;
        }

        .resume-label .resume-circle {
          height: 45px;
          width: 45px;
          border-radius: 50%;
          background-color: rgb(91, 91, 240);
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.4s ease;
          position: relative;
          box-shadow: 0 0 0 0 rgb(255,255,255);
          overflow: hidden;
          flex-shrink: 0;
        }

        .resume-label .resume-circle .resume-icon {
          color: #fff;
          width: 22px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }

        .resume-label .resume-circle .resume-square {
          aspect-ratio: 1;
          width: 15px;
          border-radius: 2px;
          background-color: #fff;
          opacity: 0;
          visibility: hidden;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }

        .resume-label .resume-circle::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          background-color: #3333a8;
          width: 100%;
          height: 0;
          transition: all 0.4s ease;
        }

        .resume-label.active {
          width: 57px;
          animation: resume-installed 0.4s ease 3.5s forwards;
        }

        .resume-label.active::before {
          animation: resume-rotate 3s ease-in-out 0.4s forwards;
        }

        .resume-label.active .resume-circle {
          animation:
            resume-pulse 1s forwards,
            resume-circle-delete 0.2s ease 3.5s forwards;
          rotate: 180deg;
        }

        .resume-label.active .resume-circle::before {
          animation: resume-installing 3s ease-in-out forwards;
        }

        .resume-label.active .resume-circle .resume-icon {
          opacity: 0;
          visibility: hidden;
        }

        .resume-label.active .resume-circle .resume-square {
          opacity: 1;
          visibility: visible;
        }

        .resume-label.active .resume-title {
          opacity: 0;
          visibility: hidden;
        }

        .resume-label.active .resume-title:last-child {
          animation: resume-show-message 0.4s ease 3.5s forwards;
        }

        @keyframes resume-pulse {
          0% { scale: 0.95; box-shadow: 0 0 0 0 rgba(255,255,255,0.7); }
          70% { scale: 1; box-shadow: 0 0 0 16px rgba(255,255,255,0); }
          100% { scale: 0.95; box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        }
        @keyframes resume-installing {
          from { height: 0; }
          to { height: 100%; }
        }
        @keyframes resume-rotate {
          0% { transform: rotate(-90deg) translate(27px) rotate(0); opacity: 1; visibility: visible; }
          99% { transform: rotate(270deg) translate(27px) rotate(270deg); opacity: 1; visibility: visible; }
          100% { opacity: 0; visibility: hidden; }
        }
        @keyframes resume-installed {
          100% { width: 150px; border-color: rgb(35, 174, 35); }
        }
        @keyframes resume-circle-delete {
          100% { opacity: 0; visibility: hidden; }
        }
        @keyframes resume-show-message {
          100% { opacity: 1; visibility: visible; padding-left: 0; left: 0; right: 0; text-align: center; }
        }
      `}</style>

      <div className="resume-container">
        <div
          className={`resume-label ${checked ? 'active' : ''}`}
          onClick={handleClick}
          role="button"
          aria-label="Download Resume"
        >
          <div className="resume-circle">
            {/* Download arrow SVG icon */}
            <svg
              className="resume-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <div className="resume-square" />
          </div>

          <span className="resume-title">Resume</span>
          <span className="resume-title">Done ✓</span>
        </div>
      </div>
    </>
  )
}
