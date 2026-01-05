"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Upload, Tag, FolderOpen, Link, X, Plus, Loader2, Image as ImageIcon 
} from "lucide-react";
import { ArticleFormData } from "@/types/index";
import { useState } from "react";

interface SidebarProps {
  formData: ArticleFormData;
  isUploading: boolean;
  isGeneratingSlug: boolean;
  tagInput: string;
  setTagInput: (val: string) => void;
  // Actions
  handleInputChange: (field: keyof ArticleFormData, value: string) => void;
  generateSlug: () => void;
  handleAddTag: (e?: any) => void;
  handleRemoveTag: (tag: string) => void;
  handleImageUpload: (file: File) => Promise<string | undefined>;
}

export default function WriteArticleSidebarSetting({
  formData,
  isUploading,
  isGeneratingSlug,
  tagInput,
  setTagInput,
  handleInputChange,
  generateSlug,
  handleAddTag,
  handleRemoveTag,
  handleImageUpload,
  
}: SidebarProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      await handleImageUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-6 space-y-6">
        {/* Featured Image */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-900/30 overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 px-4 py-3">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Cover Image
            </h3>
          </div>
          <div className="p-4">
            {/* Show Preview if image exists */}
            {formData.cover_image_url ? (
              <div className="relative mb-4 aspect-video rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 group">
                <img 
                  src={formData.cover_image_url} 
                  alt="Cover" 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 dark:group-hover:bg-black/80 transition-all duration-200 flex items-center justify-center">
                  <button 
                    type="button"
                    onClick={() => handleInputChange('cover_image_url', '')}
                    className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"
                    title="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div 
                className={`relative mb-4 aspect-video rounded-lg border-2 ${dragOver ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'border-dashed border-gray-300 dark:border-gray-700'} transition-all duration-200`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  {isUploading ? (
                    <>
                      <Loader2 className="h-8 w-8 animate-spin text-gray-400 dark:text-gray-500 mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">Uploading...</p>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-10 w-10 text-gray-400 dark:text-gray-500 mb-3" />
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Drop image here or click to upload
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG up to 5MB
                      </p>
                      {dragOver && (
                        <div className="mt-2 text-xs text-blue-500 dark:text-blue-400">
                          Drop to upload
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <input
                type="file"
                id="cover-image-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                onClick={() => document.getElementById('cover-image-upload')?.click()}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    {formData.cover_image_url ? 'Change Image' : 'Upload Image'}
                  </>
                )}
              </Button>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Recommended: 1200×630px (16:9 aspect ratio)
              </p>
            </div>
          </div>
        </div>

        {/* Article Settings */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-900/30 overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 px-4 py-3">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200">Article Settings</h3>
          </div>
          <div className="p-4 space-y-5">
            
            {/* Slug */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="slug" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Link className="h-3.5 w-3.5" />
                  URL Slug
                </Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={generateSlug}
                  disabled={!formData.title?.trim() || isGeneratingSlug}
                  className="h-7 px-2 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {isGeneratingSlug ? (
                    <>
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Auto-generate"
                  )}
                </Button>
              </div>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder="article-url-slug"
                className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                The URL-friendly version of your title
              </p>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FolderOpen className="h-3.5 w-3.5" />
                Category
              </Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                placeholder="e.g., Technology, Tutorial, News"
                className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Tag className="h-3.5 w-3.5" />
                Tags
              </Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTag(e)}
                  placeholder="Add a tag and press Enter"
                  className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon" 
                  onClick={handleAddTag}
                  disabled={!tagInput.trim()}
                  className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag) => (
                    <div 
                      key={tag} 
                      className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-lg text-sm border border-blue-100 dark:border-blue-800/50 group"
                    >
                      <span className="font-medium">{tag}</span>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveTag(tag)}
                        className="opacity-70 hover:opacity-100 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-opacity"
                        title="Remove tag"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <p className="text-xs text-gray-500 dark:text-gray-400 pt-1">
                Add relevant tags to help readers find your article
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}