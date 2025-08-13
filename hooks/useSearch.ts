import { useEffect, useRef, useState } from "react";

export function useSearch() {
    const [search, updateSearch] = useState('')
    const [searchError, setSearchError] = useState<null | string>(null)
    const isFirstInput = useRef(true);

    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = search === ''
            return
        }

        if (search === '') {
            setSearchError('Please, enter a search term')
            return
        }
        setSearchError(null)
    }, [search]);

    return { search, updateSearch, searchError }
}