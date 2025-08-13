'use client'
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const NewsSearchbar = () => {
    return (
        <div>
            <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Search className="h-4 w-4" />
                Search
            </Button>
        </div>
    )
}

export default NewsSearchbar