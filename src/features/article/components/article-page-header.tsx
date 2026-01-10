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
                    className="hover:text-primary/80 hover:bg-primary/5 rounded-lg transition-colors flex items-center justify-center gap-2 border border-border hover:border-primary/30"
                >
                    <Link href="/admin-write">
                        <div className="flex items-center gap-2">
                            <div className="rounded-md group-hover:bg-white/30 transition-colors">
                                <Plus className="h-4 w-4" />
                            </div>
                            <span>New Article</span>
                            <Sparkles className="h-3.5 w-3.5 ml-1 opacity-100 hover:opacity-100 transition-opacity" />
                        </div>
                    </Link>
                </Button>
            </div>
        </header>
    );
}