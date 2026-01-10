"use client"

import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react";
import { Article } from "@/types";

export default function useDashboardData() {
    const supabase = createClient();
    const [articles, setArticles] = useState<Article[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const { data, error } = await supabase.from('articles').select('*').order('created_at', { ascending: false })
                if (error) {
                    console.error('Error fetching articles:', error)
                } else {
                    setArticles(data)
                }
            } catch (error) {
                console.error('Error fetching articles:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchArticles()
    }, [])
    return { articles, isLoading }
}   