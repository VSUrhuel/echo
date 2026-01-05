"use client";

import ViewArticleData from "@/features/article/components/article-view";
import { useParams } from "next/navigation";

export default function ViewArticle() {
    const params = useParams<{ id: string }>();
    const id = params.id;
    
    return (
        <div>
            <ViewArticleData articleId={id} />
        </div>
    );
}