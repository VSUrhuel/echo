import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { TaskItem, TaskList } from "@tiptap/extension-list"
import { TextAlign } from "@tiptap/extension-text-align"
import Image from "@tiptap/extension-image";
import Typography from "@tiptap/extension-typography";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import { Selection } from "@tiptap/extensions"
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss"
import "@/components/tiptap-node/code-block-node/code-block-node.scss"


export default function ReadOnlyEditor({content}: {content: string}) {
    
  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
    ],
    content: content || '',
  })


  return (
    <div>
        <EditorContent
                  editor={editor}
                  className="simple-editor-content"
                />
    </div>
  )
}