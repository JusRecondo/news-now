import { useEffect, useRef, useState } from "react";

export function useSearch() {
    const [search, updateSearch] = useState('')
    const [searchError, setSearchError] = useState<null | string>(null)

    useEffect(() => {
        if (search.trim() === '') {
            setSearchError('Please, enter a search term.')
            return
        }
        setSearchError(null)
    }, [search]);

    return { search, updateSearch, searchError }
}