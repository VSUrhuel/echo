"use client"
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Editor } from "@tiptap/core";
import { useState, useCallback } from "react";
import WriteArticleSidebarSetting from "./write-article-sidebar-settings";
import { useWriteArticleAction } from "../hooks/useWriteArticleAction";

export default function WriteArticleForm() {
    // 1. Call your custom hook
    const {
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
        handlePublishArticle,
        handleDraftArticle
    } = useWriteArticleAction();

    const [editor, setEditor] = useState<Editor | null>(null);

    // 2. Sync Editor Content to Hook State
    const handleEditorReady = useCallback((editorInstance: Editor | null) => {
        setEditor(editorInstance);
        
        // Whenever the editor updates, sync it to formData.content
        if (editorInstance) {
            editorInstance.on('update', () => {
                const html = editorInstance.getHTML();
                handleInputChange('content', html);
            });
        }
    }, [handleInputChange]);

    // 3. Handle Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // The hook already has all the data in `formData` (including content via the sync above)
        await handlePublishArticle();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Article Title
                </Label>
                <Input 
                    id="title"
                    value={formData.title} 
                    onChange={(e) => handleInputChange('title', e.target.value)} 
                    placeholder="Enter your article title..." 
                    className="rounded-lg border-gray-300 text-3xl font-bold p-6 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="rounded-lg border p-4 col-span-3 min-h-[500px]">
                    {/* 5. Editor Component */}
                    <SimpleEditor onEditorReady={handleEditorReady} />
                </div>
                
                {/* 6. Sidebar with Props */}
                <WriteArticleSidebarSetting 
                    formData={formData}
                    isUploading={isUploading}
                    isGeneratingSlug={isGeneratingSlug}
                    tagInput={tagInput}
                    setTagInput={setTagInput}
                    handleInputChange={handleInputChange}
                    generateSlug={generateSlug}
                    handleAddTag={handleAddTag}
                    handleRemoveTag={handleRemoveTag}
                    handleImageUpload={handleImageUpload}
                />
            </div>

            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline">Preview Article</Button>
                <Button type="button" onClick={handleDraftArticle} variant="secondary">Save as Draft</Button>
                <Button type="submit">Publish Article</Button>
            </div>
        </form>
    )
}