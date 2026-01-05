"use client";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Editor } from "@tiptap/core";
import { useState } from "react";

export default function AdminWrite() {
    const [title, setTitle] = useState('');
    const [editor, setEditor] = useState<Editor | null>(null);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(editor)
    };
    return (
        <div className="mx-auto p-8 max-w-7xl">
            <h1 className="text-2xl font-bold mb-4">Write Article</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Article Title" className="rounded-lg border text-3xl font-bold p-4" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="rounded-lg border p-4 col-span-3">
                        <SimpleEditor onEditorReady={setEditor} />
                    </div>
                    <div className="col-span-1">
                        <div className="rounded-lg border p-4">
                            <div className="flex flex-col gap-4">
                                <ImageUploadButton />
                                <Input placeholder="Article Slug" />
                                <Input placeholder="Article Category" />
                                <Input placeholder="Article Tags" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button type="submit">Publish Article</Button>
                    <Button type="button" variant="outline">Preview Article</Button>
                </div>
            </form>
        </div>
    );
}