import { Search } from "lucide-react";
import { useState } from "react";

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto mb-10">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for anime..."
        className="w-full bg-base-200 border border-base-300 rounded-full py-4 pl-14 pr-6 focus:outline-none focus:border-primary transition-colors"
      />
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 opacity-40" size={24} />
      <button 
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-primary-content px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition-colors"
      >
        Search
      </button>
    </form>
  );
}
