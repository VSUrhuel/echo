"use client"

import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react";
import { Article } from "@/types";

export default function useDashboardData() {
    const supabase = createClient();
    const [articles, setArticles] = useState<Article[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [rateLastMonthArticles, setRateLastMonthArticles] = useState<string>('')
    const [rateLastMonthViews, setRateLastMonthViews] = useState<string>('')

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

    const calculateRateLastMonthArticles = () => {
        const now = new Date()
        const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const sameDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

        const articlesThisMonth = articles.filter(article => new Date(article.created_at) >= startOfThisMonth)
        const articlesLastMonth = articles.filter(article => {
            const date = new Date(article.created_at)
            return date >= startOfLastMonth && date <= sameDayLastMonth
        })

        const currentCount = articlesThisMonth.length
        const prevCount = articlesLastMonth.length
        const diff = currentCount - prevCount
        
        let percentage = 0
        if (prevCount > 0) {
            percentage = Math.round((diff / prevCount) * 100)
        } else if (currentCount > 0) {
            percentage = 100
        }

        const sign = diff >= 0 ? '+' : '-'
        const absDiff = Math.abs(diff)
        const context = `${sign}${absDiff} ${diff >= 0 ? 'increase' : 'decrease'} from last month`
        
        setRateLastMonthArticles(`${sign}${percentage}% (${context})`)
    }

    const calculateRateLastMonthViews = () => {
        const now = new Date()
        const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const sameDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

        const articlesThisMonth = articles.filter(article => new Date(article.created_at) >= startOfThisMonth)
        const articlesLastMonth = articles.filter(article => {
            const date = new Date(article.created_at)
            return date >= startOfLastMonth && date <= sameDayLastMonth
        })

        const currentViews = articlesThisMonth.reduce((total, article) => total + (article.views_count || 0), 0)
        const prevViews = articlesLastMonth.reduce((total, article) => total + (article.views_count || 0), 0)
        const diff = currentViews - prevViews

        let percentage = 0
        if (prevViews > 0) {
            percentage = Math.round((diff / prevViews) * 100)
        } else if (currentViews > 0) {
            percentage = 100
        }

        const sign = diff >= 0 ? '+' : '-'
        const absDiff = Math.abs(diff)
        const context = `${sign}${absDiff} ${diff >= 0 ? 'increase' : 'decrease'} from last month`

        setRateLastMonthViews(`${sign}${percentage}% (${context})`)
    }

    useEffect(() => {
        calculateRateLastMonthArticles()
        calculateRateLastMonthViews()
    }, [articles])

    return { articles, isLoading, rateLastMonthArticles, rateLastMonthViews }
}   