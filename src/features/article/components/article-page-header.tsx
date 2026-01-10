import { Button } from "@/components/ui/button";
import { Plus, FileText, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ArticlePageHeader() {
    return (
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                    <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h1 className="text-lg font-semibold text-foreground">Articles Management</h1>
                    <p className="text-xs text-muted-foreground">Create, manage, and publish content</p>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <Button
                    asChild
                    className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 shadow-md hover:shadow-lg transition-all group"
                >
                    <Link href="/admin-write">
                        <div className="flex items-center gap-2">
                            <div className="p-1 rounded-md bg-white/20 group-hover:bg-white/30 transition-colors">
                                <Plus className="h-4 w-4" />
                            </div>
                            <span>New Article</span>
                            <Sparkles className="h-3.5 w-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </Link>
                </Button>
            </div>
        </header>
    );
}