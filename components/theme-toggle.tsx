"use client"
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    };

    return (
        <button onClick={toggleTheme} className="flex flex-row items-center justify-center gap-2 p-0 lg:p-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <span className="sr-only">Toggle theme {theme === 'dark' ? 'light' : 'light'} </span>
            {theme === 'dark' ? <>Light <Sun /></> : <>Dark <Moon /></>}
        </button>
    );
}