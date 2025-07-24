import React, { useEffect } from 'react';
import { useRouter } from '../contexts/RouterContext';
import { categories } from '../data/mockData';
import { Gamepad2, Music, ShoppingBag, Heart, Laptop, Shirt, Plane, Car, Gift } from 'lucide-react';
import axiosInstance from "../axios/axiosInstance.tsx";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { fetchCategories } from '../app/features/catagory/catagorySlice.ts';

const categoryIcons = {
  GAMING: Gamepad2,
  STREAMING: Music,
  retail: ShoppingBag,
  FOOD: Heart,
  tech: Laptop,
  fashion: Shirt,
  TRAVEL: Plane,
  music: Music,
};

export function CategoriesSection() {
  const { navigate } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data: categories, loading, error } = useSelector((state: RootState) => state.category);

  // const [categories, setCategories] = React.useState<any[]>([]);

  useEffect(()=>{
    dispatch(fetchCategories());
  },[dispatch])

  //fecth categories from API


  const handleCategoryClick = (categoryId: string, categoryName: string) => {
    navigate('category', { category: categoryId, categoryName });
  };

  const CategoryCard = ({ category, index }: { category: any; index: number }) => {
    const Icon = categoryIcons[category.slug as keyof typeof categoryIcons] || Gift;
  
    return (
      <div 
        key={category.id}
        className="group cursor-pointer animate-fade-in-up h-full"
        style={{ animationDelay: `${index * 0.1}s` }}
        onClick={() => handleCategoryClick(category.id, category.name)}
      >
        <div className="relative bg-gradient-to-br from-primary/10 to-purple-600/10 hover:from-primary/20 hover:to-purple-600/20 rounded-2xl p-8 shadow-custom hover:shadow-custom-lg transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 border border-border/50 h-full flex flex-col justify-between">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-br from-primary/0 to-purple-600/0 group-hover:from-primary/20 group-hover:to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          
          <div className="relative text-center">
            {/* Category Icon */}
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            
            {/* Category Name */}
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
              {category.name}
            </h3>
            
            {/* Category Description */}
            <p className="text-muted-foreground text-sm mb-4">
              {category.category_description}
            </p>
            
            {/* Card Count */}
            <div className="text-sm font-medium text-primary">
              {category.count} Cards Available
            </div>
          </div>
        </div>
      </div>
    );
  };

  console.log(categories,"category")

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse through our extensive collection of gift cards organized by categories
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories?.map((category, index) => (
            <div key={category?.id} className="h-full">
              <CategoryCard category={category} index={index} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => navigate('explore')}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-custom hover:shadow-custom-lg"
          >
            Explore All Categories
          </button>
        </div>
      </div>
    </section>
  );
}