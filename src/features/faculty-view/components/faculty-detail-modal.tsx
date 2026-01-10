"use client"

import type React from "react"

import { X } from "lucide-react"
import type { Profile } from "@/features/faculty-view/types/profiles"

interface FacultyDetailModalProps {
  member: Profile
  imageUrl: string
  isOpen: boolean
  onClose: () => void
}

export function FacultyDetailModal({ member, imageUrl, isOpen, onClose }: FacultyDetailModalProps) {
  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={handleBackdropClick}>
      <div className="relative h-auto max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-2xl border border-gray-200">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 rounded-full bg-white p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors border border-gray-300"
        >
          <X className="h-5 w-5" />
        </button>

        {/* CONTENT */}
        <div className="flex h-full flex-col md:flex-row">
          {/* LEFT: FULL IMAGE */}
          <div className="h-80 w-full md:h-auto md:w-5/12 overflow-hidden bg-gray-100">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={`${member.first_name} ${member.last_name}`}
              className="h-full w-full object-cover"
            />
          </div>

          {/* RIGHT: INFORMATION */}
          <div className="flex-1 overflow-y-auto p-8">
            {/* NAME AND TITLE */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {member.first_name} {member.last_name}
              </h2>

              {member.designation && (
                <div className="mt-4 inline-block rounded-full border border-gray-300 px-6 py-2">
                  <p className="text-sm font-semibold text-gray-700">{member.designation}</p>
                </div>
              )}

              {member.specialization && (
                <div className="mt-3 inline-block ml-2 rounded-lg border border-gray-300 px-4 py-2">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{member.specialization}</p>
                </div>
              )}
            </div>

            {/* DIVIDER */}
            <div className="mb-6 h-px bg-gray-200"></div>

            {/* EMAIL */}
            {member.email && (
              <>
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</h3>
                  <a
                    href={`mailto:${member.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-700 hover:text-gray-900 break-all text-sm border-l-2 border-gray-300 pl-4"
                  >
                    {member.email}
                  </a>
                </div>

                {/* DIVIDER */}
                <div className="mb-6 h-px bg-gray-200"></div>
              </>
            )}

            {/* BIO */}
            {member.bio && (
              <>
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Biography</h3>
                  <p className="text-gray-600 leading-relaxed text-sm border-l-2 border-gray-300 pl-4">{member.bio}</p>
                </div>

                {/* DIVIDER */}
                <div className="mb-6 h-px bg-gray-200"></div>
              </>
            )}

            {/* EDUCATION */}
            {member.education && (
              <>
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Education</h3>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <p className="text-gray-700 leading-relaxed text-sm">{member.education}</p>
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="mb-6 h-px bg-gray-200"></div>
              </>
            )}

            {/* CONSULTATION HOURS */}
            {member.consultation_hours && (
              <>
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Consultation Hours</h3>
                  <div className="rounded-lg border border-gray-200 p-4">
                    <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
                      {member.consultation_hours}
                    </p>
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="mb-6 h-px bg-gray-200"></div>
              </>
            )}

            {/* STATUS */}
            {member.status && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Status</h3>
                <span className="inline-block rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700">
                  {member.status}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
