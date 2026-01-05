"use client"
import React from "react";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import MenuBar from "./menu-bar";
import Highlight from '@tiptap/extension-highlight'

interface RichTextEditorProps {
    content: string;
    onChange: (e: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
    extensions: [StarterKit.configure({
        bulletList: {
            HTMLAttributes: {
                class: 'list-disc ml-4'
            }
        },
        orderedList: {
            HTMLAttributes: {
                class: 'list-decimal ml-4'
            }
        }
    }), TextAlign.configure({
    types: ['heading', 'paragraph'], 
    
}), Highlight,],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'min-h-[500px] border border-slate-200 rounded-md bg-slate-50 py-2 px-3 m-2',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  )
}