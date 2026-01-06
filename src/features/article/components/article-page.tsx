import { Button } from "@/components/ui/button";
import { useArticleData } from "../hooks/useArticleData";
import ArticelePageHeader from "./article-page-header";
import ArticleTable from "./article-table";

export default function ArticlePage() {
    const { articles, loading, page, totalPages, prevPage, nextPage, paginatedArticles } = useArticleData();
    return (
        <div>
            <ArticelePageHeader />
            <ArticleTable articles={paginatedArticles} loading={loading} />
            <div className="flex justify-between items-center mt-6">
                <Button variant="outline" onClick={prevPage} disabled={page === 1}>
                    Previous
                </Button>
                <span className="text-muted-foreground">
                    Page {page} of {totalPages}
                </span>
                <Button variant="outline" onClick={nextPage} disabled={page === totalPages}>
                    Next
                </Button>
            </div>
        </div>
    );
}