"use client"

import { FileText } from "lucide-react";

export default function WriteArticleHeader({isEdit}: {isEdit: boolean}) {
    return (
       <div className="sticky w-full top-0 z-40 flex h-16 items-center gap-4 border-b mb-3 border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 shadow-sm">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                    <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h1 className="text-lg font-semibold text-foreground">{isEdit ? 'Edit Article' : 'Write Article'}</h1>
                    <p className="text-xs text-muted-foreground">{isEdit ? 'Edit and publish your article' : 'Create and publish a new article'}</p>
                </div>
            </div>
    );
}
