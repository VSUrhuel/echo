"use client"

import { Profile } from "@/types";
import { CalendarDays, User, Clock, BookOpen, Eye, Globe, Building } from "lucide-react";
import Image from "next/image";
import formatDate from "../utils/format-date";
import { useState } from "react";

interface ArticleViewHeaderProps {
  title: string;
  author: Profile;
  publishDate: string;
  coverImage: string;
  category?: string;
  readTime?: string;
  isDraft?: boolean;
  viewsCount?: number;
}

export default function ArticleViewHeader({
  title,
  author,
  publishDate,
  coverImage,
  category,
  readTime,
  isDraft,
  viewsCount
}: ArticleViewHeaderProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <header className="mb-10 lg:mb-14">
      {/* Draft Status & Category */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {isDraft && (
          <span className="inline-flex items-center px-4 py-2 bg-accent text-gray-900 dark:text-gray-900 font-medium text-sm rounded-full animate-pulse">
            <span className="w-2 h-2 bg-gray-900 rounded-full mr-2 animate-ping"></span>
            Draft
          </span>
        )}
        
        {category && (
          <span className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary dark:text-primary-foreground font-medium text-sm rounded-full hover:bg-primary/20 transition-colors cursor-pointer group">
            {category}
            <Globe className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>
        )}
      </div>

      {/* Main Title with Gradient */}
      <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight mb-8 relative">
        {title}
        {/* Decorative underline */}
        <span className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
      </h1>

      {/* Author and Meta Info Card */}
      <div className="bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 mb-8 border border-border shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Author Section */}
          <div className="flex items-center gap-4">
            {/* Author Avatar */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-800">
                {author.image_url ? (
                  <img
                    src={author.image_url}
                    alt={`${author.first_name} ${author.last_name}`}
                    className="w-full h-full object-cover"
                    sizes="56px"
                    onLoad={() => setImageLoaded(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Author Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-bold text-lg text-gray-900 dark:text-white truncate">
                  {author.first_name} {author.last_name}
                </h2>
                {author.designation && (
                  <span className="hidden sm:inline-flex items-center px-2 py-1 bg-primary/10 text-primary dark:text-primary-foreground text-xs font-medium rounded-full">
                    {author.designation}
                  </span>
                )}
              </div>
              
              {author.designation && (
                <p className="text-sm text-gray-600 dark:text-gray-400 sm:hidden mb-1">
                  {author.designation}
                </p>
              )}
              
              {/* Author Details */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-500">
                {author.consultation_hours && (
                  <div className="flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    <span>{author.consultation_hours}</span>
                  </div>
                )}
                {author.specialization && (
                  <>
                    <span className="text-gray-300 dark:text-gray-700">•</span>
                    <span className="text-primary font-medium">#{author.specialization}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {/* Publish Date */}
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <CalendarDays className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-gray-500 dark:text-gray-500">Published</div>
                <time 
                  dateTime={publishDate} 
                  className="font-medium text-gray-900 dark:text-white text-sm whitespace-nowrap"
                >
                  {publishDate ? formatDate(publishDate) : 'N/A'}
                </time>
              </div>
            </div>

            {/* Read Time */}
            {readTime && (
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-gray-500 dark:text-gray-500">Read Time</div>
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {readTime} min
                  </div>
                </div>
              </div>
            )}

            {/* Views Count */}
            {viewsCount !== undefined && (
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-accent/10 text-accent-foreground">
                  <Eye className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-gray-500 dark:text-gray-500">Views</div>
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {viewsCount}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cover Image with Enhanced Design */}
      {coverImage && (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 group">
          {/* Image Container */}
          <div className="relative w-full h-full">
            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse"></div>
            )}
            
            <img
              src={coverImage}
              alt={`Cover image for "${title}"`}
              className={`w-full h-full object-cover transition-all duration-500 ${
                imageLoaded 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
              } group-hover:scale-105`}
              width="1200"
              height="600"
              loading="eager"
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
            
            {/* Decorative Corner */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-accent to-accent-secondary rounded-lg transform rotate-12 opacity-20 group-hover:opacity-30 transition-opacity"></div>
          </div>
          
          {/* Image Info Badge */}
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-2 rounded-lg">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Article Cover
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}