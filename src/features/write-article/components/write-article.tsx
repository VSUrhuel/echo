"use client";

import WriteArticleHeader from "./write-artilce-header";
import WriteArticleForm from "./write-article-form";

export default function WriteArticle() {
    return (
        <div className="mx-auto p-8 max-w-7xl">
            <WriteArticleHeader isEdit={false}/>
            <WriteArticleForm articleFormData={
                {
                    title: '',
                    content: '',
                    excerpt: '',
                    slug: '',
                    category: '',
                    tags: [],
                    cover_image_url: '',
                }
            } />
        </div>
    );
}