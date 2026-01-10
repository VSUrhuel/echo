"use client"

import { Profile } from "@/types";
import { CalendarDays, User } from "lucide-react";
import Image from "next/image";
import formatDate from "../utils/format-date";

interface ArticleViewHeaderProps {
  title: string;
  author: Profile;
  publishDate: string;
  coverImage: string;
  category?: string;
  readTime?: string;
  isDraft?: boolean;
}

export default function ArticleViewHeader({
  title,
  author,
  publishDate,
  coverImage,
  category,
  readTime,
  isDraft
}: ArticleViewHeaderProps) {
  

  return (
    <header className="mb-8 lg:mb-12">
      
      {isDraft && (
        <div className="mb-4">
          <span className={`flex items-center px-3 py-1 text-sm font-medium text-primary-600 dark:text-primary-400 ${isDraft ? 'bg-red-50 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/30'} rounded-full`}>
            {isDraft ? 'Draft' : 'Published'}
          </span>
        </div>
      )}
      
      {/* Category Badge */}
      {category && (
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 rounded-full">
            {category}
          </span>
        </div>
      )}


      {/* Main Title */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight mb-6">
        {title}
      </h1>

      {/* Meta Information */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600 dark:text-gray-400 mb-8">
        {/* Author Info */}
        <div className="flex items-center gap-3">
          {author.image_url ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-800">
              <img
                src={author.image_url}
                alt={`${author.first_name} ${author.last_name}`}
                className="object-cover"
                sizes="40px"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-500" />
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              {author.first_name} {author.last_name}
              {author.designation && (
                <span className="block text-sm font-normal text-gray-600 dark:text-gray-400">
                  {author.designation}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Separator */}
        <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-700" />

        {/* Date and Read Time */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            <time dateTime={publishDate}>{formatDate(publishDate)}</time>
          </div>
          {readTime && (
            <>
              <div className="w-1 h-1 rounded-full bg-gray-400" />
              <span>{readTime} read</span>
            </>
          )}
        </div>
      </div>

      {/* Cover Image */}
      {coverImage && (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
        <img
          src={coverImage}
          alt={`Cover image for "${title}"`}
          className="object-cover"
          width="1200"
          height="600"
        />
        {/* Optional: Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </div>
      )}
    </header>
  );
}