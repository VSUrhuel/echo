"use client";

import EditArticleData from "@/features/article/components/article-edit";
import { useParams } from "next/navigation";

export default function EditArticle() {
    const params = useParams<{ id: string }>();
    const id = params.id;
    
    return (
        <div>
            <EditArticleData articleId={id} />
        </div>
    );
}