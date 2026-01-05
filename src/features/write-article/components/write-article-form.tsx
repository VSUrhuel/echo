"use client"
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Editor } from "@tiptap/core";
import { useState, useCallback } from "react";
import WriteArticleSidebarSetting from "./write-article-sidebar-settings";
import { useWriteArticleAction } from "../hooks/useWriteArticleAction";
import { Save, Send } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSavingDraft, setIsSavingDraft] = useState(false);

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
    const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
        if (e) e.preventDefault();
        // Confirm dialog

        setIsSubmitting(true);
        try {
            await handlePublishArticle();
        } finally {
            setIsSubmitting(false);
        }
    };

    // 4. Handle Save Draft
    const handleSaveDraft = async () => {
        setIsSavingDraft(true);
        try {
            await handleDraftArticle();
        } finally {
            setIsSavingDraft(false);
        }
    };

    return (
        <div className="mx-auto p-6 max-w-7xl">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Article Title
                    </Label>
                    <Input 
                        id="title"
                        value={formData.title} 
                        onChange={(e) => handleInputChange('title', e.target.value)} 
                        placeholder="Enter your article title..." 
                        className="rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white text-3xl font-bold p-6 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden min-h-[500px]">
                            <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 px-6 py-3">
                                <h2 className="font-semibold text-gray-700 dark:text-gray-200">Content</h2>
                            </div>
                            <div className="p-6">
                                <SimpleEditor onEditorReady={handleEditorReady} />
                            </div>
                        </div>
                    </div>
                    
                    {/* Sidebar */}
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

                {/* Action Buttons - Now inside the form */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex gap-3">
                        <Button 
                            type="button" 
                            variant="outline"
                            onClick={handleSaveDraft}
                            disabled={isSavingDraft}
                            className="gap-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                            {isSavingDraft ? (
                                <>
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    Save Draft
                                </>
                            )}
                        </Button>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button 
                                    type="button" 
                                    disabled={isSubmitting}
                                    className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            Publishing...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4" />
                                            Publish Article
                                        </>
                                    )}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Do you want to publish this article?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This article will be published publicly. Please check the details and click continue to publish.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => setIsSubmitting(false)}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </form>
        </div>
    );
}