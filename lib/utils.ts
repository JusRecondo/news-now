import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseCategoryName(category: string) {
  if (category === "world or politics or technology or business or sports") {
    return "All News";
  }
  return category.charAt(0).toUpperCase() + category.slice(1);
}
