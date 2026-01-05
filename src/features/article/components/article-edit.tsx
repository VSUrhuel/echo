import WriteArticleForm from "@/features/write-article/components/write-article-form";
import WriteArticleHeader from "@/features/write-article/components/write-artilce-header";
import { useArticleData } from "@/features/article/hooks/useArticleData";

export default function EditArticleData({articleId}: {articleId: string}) {
    const { selectedArticle } = useArticleData({articleId});
    if (!selectedArticle) {
       return <div>Loading...</div>
    }

    return (
        <div className="mx-auto p-8 max-w-7xl">
            <WriteArticleHeader isEdit={true}/>
            <WriteArticleForm articleFormData={selectedArticle} articleId={parseInt(articleId)} />
        </div>
    );
}