import { useArticleData } from "../hooks/useArticleData";
import ArticelePageHeader from "./article-page-header";
import ArticleTable from "./article-table";

export default function ArticlePage() {
    const { articles, loading } = useArticleData();
    return (
        <div>
            <ArticelePageHeader />
            <ArticleTable articles={articles} loading={loading} />
        </div>
    );
}