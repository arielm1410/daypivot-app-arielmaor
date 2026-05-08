import { useMemo, useState } from "react";
import {
  Briefcase,
  Heart,
  GraduationCap,
  Activity,
  ShoppingBag,
  Users,
  Clock,
  TrendingUp,
  CalendarDays,
  Wind,
  Search
} from "lucide-react";
import { categories } from "../../data/questionBank.js";

const icons = {
  career: Briefcase,
  relationships: Heart,
  studies: GraduationCap,
  health: Activity,
  money: ShoppingBag,
  social: Users,
  time: Clock,
  growth: TrendingUp,
  daily: CalendarDays,
  stress: Wind,
  custom: Search
};

export default function CategoryGrid({ selectedCategoryId, onSelect, showSearch = true }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();

    if (!value) return categories;

    return categories.filter((category) => {
      return (
        category.title.toLowerCase().includes(value) ||
        category.description.toLowerCase().includes(value) ||
        category.id.toLowerCase().includes(value)
      );
    });
  }, [searchTerm]);

  return (
    <section>
      {showSearch && (
        <input
          className="category-search"
          type="text"
          placeholder="Search category, for example: stress, money, studies..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      )}

      <div className="category-grid">
        {filteredCategories.map((category) => {
          const Icon = icons[category.id] || CalendarDays;
          const active = selectedCategoryId === category.id;

          return (
            <button
              key={category.id}
              type="button"
              className={`category-card ${active ? "active" : ""}`}
              onClick={() => onSelect(category.id)}
            >
              <span className="category-icon">
                <Icon size={18} />
              </span>
              <h3 className="category-title">{category.title}</h3>
              <p className="category-copy">{category.description}</p>
            </button>
          );
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="card empty-state">
          <h3 className="card-title">No category found</h3>
          <p className="card-copy">Try searching another topic like work, stress, study or money.</p>
        </div>
      )}
    </section>
  );
}
