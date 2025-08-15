'use client'

import * as Popover from "@radix-ui/react-popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useSearchContext } from "@/contexts/search-context"

const NewsSearchbar = () => {

    const { search, loading, searchError, handleChange } = useSearchContext()
    console.log('search:', search)
    console.log('loading:', loading)
    console.log('searchError:', searchError)

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Button variant="ghost" size="sm" className="flex">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                </Button>
            </Popover.Trigger>
            <Popover.Content
                side="bottom"
                align="start"
                className="rounded-lg border bg-white p-4 shadow-md"
            >
                <Input placeholder="Search news..." className="w-64" value={search} onChange={handleChange} />
            </Popover.Content>
        </Popover.Root>
    )
}

export default NewsSearchbar