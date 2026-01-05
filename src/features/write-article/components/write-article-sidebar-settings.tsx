"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Upload, Tag, FolderOpen, Link, X, Plus, Loader2 
} from "lucide-react";
import { ArticleFormData } from "@/types/index"; // Import your interface


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
  handleImageUpload
}: SidebarProps) {
    return (
        <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              
              {/* Featured Image */}
              <div className="rounded-xl border border-gray-200 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                  <h3 className="font-semibold text-gray-700 dark:text-white flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Featured Image
                  </h3>
                </div>
                <div className="p-4">
                  {/* Show Preview if image exists */}
                  {formData.cover_image_url ? (
                    <div className="relative mb-4 aspect-video rounded-lg overflow-hidden border">
                        <img src={formData.cover_image_url} alt="Cover" className="object-cover w-full h-full" />
                        <button 
                            type="button"
                            onClick={() => handleInputChange('cover_image_url', '')}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                        >
                            <X size={12} />
                        </button>
                    </div>
                  ) : null}

                  <div className="w-full">
                    <input
                      type="file"
                      id="cover-image-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => document.getElementById('cover-image-upload')?.click()}
                      disabled={isUploading}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Cover Image
                    </Button>
                  </div>
                  
                  {isUploading && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Uploading...
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended: 1200×630px
                  </p>
                </div>
              </div>

              {/* Article Settings */}
              <div className="rounded-xl border border-gray-200 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                  <h3 className="font-semibold text-gray-700 dark:text-white">Article Settings</h3>
                </div>
                <div className="p-4 space-y-4">
                  
                  {/* Slug */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center justify-between">
                      <span className="flex items-center gap-2"><Link className="h-3 w-3" /> URL Slug</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={generateSlug}
                        disabled={!formData.title.trim() || isGeneratingSlug}
                        className="h-6 px-2 text-xs"
                      >
                        {isGeneratingSlug ? <Loader2 className="h-3 w-3 animate-spin" /> : "Generate"}
                      </Button>
                    </Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                      placeholder="article-url-slug"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FolderOpen className="h-3 w-3" /> Category
                    </Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      placeholder="e.g., Technology"
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="tags" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Tag className="h-3 w-3" /> Tags
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="tags"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddTag(e)}
                        placeholder="Add a tag"
                      />
                      <Button type="button" variant="outline" size="icon" onClick={handleAddTag}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.tags.map((tag) => (
                          <div key={tag} className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                            <span>{tag}</span>
                            <button type="button" onClick={() => handleRemoveTag(tag)}>
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
        </div>
    )
}