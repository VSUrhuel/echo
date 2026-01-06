import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ArticelePageHeader() {
    return (
        <div>
            <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-border bg-background px-6">
                <h1 className="text-lg font-semibold text-foreground">Articles</h1>
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="/admin-write">
                        <Plus className="mr-2 h-4 w-4" />
                        New Article
                    </Link>
                </Button>
            </header>
        </div>
    );
}