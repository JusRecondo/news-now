'use client'
import { useSearch } from '@/hooks/useSearch';
import { debounce } from '@/lib/utils';
import { searchNews } from '@/services/news';
import React, { createContext, useContext, useState, ReactNode, useRef, useEffect, useCallback } from 'react';

type SearchContextType = {
    results: any[]
    loading: boolean
    error: string | null
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    search: string
    updateSearch: (search: string) => void
    searchError: string | null
    hasMoreResults: boolean
    loadMoreResults: () => void
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const { search, updateSearch, searchError } = useSearch()

    const [results, setResults] = useState<any[]>([])
    const [hasMoreResults, setHasMoreResults] = useState(true)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, sethError] = useState<null | string>(null)

    const debouncedGetNews = useCallback(debounce(async search => {
        const data = await searchNews({ query: search, pageNum: page })
        setResults(data.articles || [])
        setHasMoreResults(data.totalResults > results.length + data.articles.length)
        setLoading(false)
    }, 300), [])

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = e.target.value
        updateSearch(newSearch)
        debouncedGetNews(newSearch)
        setLoading(true)
        sethError(null)
    }

    const loadMoreResults = async () => {
        const nextPage = page + 1
        setPage(nextPage)
        const data = await searchNews({ query: search, pageNum: page })
        setResults((prev) => [...prev, ...data.articles])
    }

    return (
        <SearchContext.Provider value={{ results, loading, error, handleChange, search, updateSearch, searchError, hasMoreResults, loadMoreResults }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider')
    }
    return context
};