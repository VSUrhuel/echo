import { Button } from "@/components/ui/button";
import { useArticleData } from "../hooks/useArticleData";
import ArticelePageHeader from "./article-page-header";
import ArticleTable from "./article-table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";

export default function ArticlePage() {
    const { articles, loading, page, totalPages, prevPage, nextPage, paginatedArticles, setPage } = useArticleData();
    return (
        <div >
            <ArticelePageHeader />
            <ArticleTable articles={paginatedArticles} loading={loading} />
            <div className="mx-6 mb-6">
            <DataTablePagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(page) => setPage(page)}
                isLoading={loading}
            />
            </div>
        </div>
    );
}