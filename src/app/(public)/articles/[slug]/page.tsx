"use client";

import ViewArticleData from "@/features/article/components/article-view";
import { useParams } from "next/navigation";

export default function ViewPublicArticle() {
    
    const params = useParams<{ slug: string }>();
    const slug = params.slug;
    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            <ViewArticleData slug={slug} />
        </div>
    );
}