import React, { useState, useEffect } from "react";
import { useGetCourseHook } from "@/hooks/course.hook";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Search, 
  X, 
  Sparkles, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Check
} from "lucide-react";
import axios from "axios";

const CoursePage = () => {
  const { data, isLoading, refetch } = useGetCourseHook();
  const [search, setSearch] = useState("");
  const [aiCourses, setAiCourses] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSearchActive, setAiSearchActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    level: "",
    price: "",
    duration: "",
    rating: ""
  });
  const navigate = useNavigate();

  const categories = [
    "Full Stack", 
    "MERN", 
    "React", 
    "NodeJS", 
    "Python", 
    "Java", 
    "DevOps",
    "UI/UX",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Cloud Computing",
    "Cybersecurity",
    "Mobile Development",
    "Game Development",
    "Blockchain",
    "AWS",
    "Docker",
    "Kubernetes",
    "TensorFlow"
  ];

  const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"];
  const priceRanges = ["Free", "Paid", "Under ₹500", "₹500 - ₹2000", "Above ₹2000"];
  const durations = ["0-10 hours", "10-20 hours", "20-40 hours", "40+ hours"];
  const ratings = ["4.5 & above", "4.0 & above", "3.5 & above", "3.0 & above"];

  useEffect(() => {
    refetch();
  }, [refetch]);

  const filteredCourses = data?.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase()) &&
    (selectedCategory ? course.category?.includes(selectedCategory) : true) &&
    (filters.level ? course.level === filters.level : true) &&
    (filters.price ? applyPriceFilter(course.amount, filters.price) : true) &&
    (filters.duration ? applyDurationFilter(course.duration, filters.duration) : true) &&
    (filters.rating ? (course.rating || 4.5) >= parseFloat(filters.rating) : true)
  ) || [];

  const applyPriceFilter = (amount, filter) => {
    const price = amount || 0;
    switch(filter) {
      case "Free": return price === 0;
      case "Paid": return price > 0;
      case "Under ₹500": return price < 500;
      case "₹500 - ₹2000": return price >= 500 && price <= 2000;
      case "Above ₹2000": return price > 2000;
      default: return true;
    }
  };

  const applyDurationFilter = (duration, filter) => {
    const dur = duration ? parseInt(duration) || 40 : 40;
    switch(filter) {
      case "0-10 hours": return dur <= 10;
      case "10-20 hours": return dur > 10 && dur <= 20;
      case "20-40 hours": return dur > 20 && dur <= 40;
      case "40+ hours": return dur > 40;
      default: return true;
    }
  };

  const handleAiSearch = async () => {
    if (!search.trim()) return;
    setAiSearchActive(true);
    setAiLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/course/getCourse`, {
        params: { search },
        withCredentials: true,
      });
      setAiCourses(res.data.courses || []);
    } catch (err) {
      console.error("AI search error:", err);
      setAiCourses([]);
    } finally {
      setAiLoading(false);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setAiSearchActive(false);
    setSelectedCategory("");
    setFilters({
      level: "",
      price: "",
      duration: "",
      rating: ""
    });
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setSearch(cat);
    setAiSearchActive(false);
  };

  const clearFilters = () => {
    setFilters({
      level: "",
      price: "",
      duration: "",
      rating: ""
    });
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(v => v !== "").length;
  };

  if (isLoading) {
    return (
      <div className="max-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-12">
        <div className="p-6 lg:p-8 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse border-green-100 shadow-lg overflow-hidden">
                <Skeleton className="h-48 w-full bg-green-200" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2 bg-green-200" />
                  <Skeleton className="h-4 w-full bg-green-100" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-24 bg-green-200" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-12">
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Explore <span className="text-green-600">Courses</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the perfect course for your journey. Learn from industry experts and advance your career.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
              <Input
                placeholder="Search courses..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setAiSearchActive(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleAiSearch()}
                className="pl-9 pr-20 h-12 border-green-200 focus:border-green-500 focus:ring-green-500 rounded-xl bg-white/80 backdrop-blur-sm"
              />
              <AnimatePresence>
                {search && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearSearch}
                      className="h-8 w-8 p-0 rounded-full hover:bg-green-100"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleAiSearch} 
                className="h-12 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg shadow-green-500/30 flex items-center gap-2"
              >
                <Sparkles size={18} />
                <span className="hidden sm:inline">AI Search</span>
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={`h-12 px-4 rounded-xl border-2 transition-all duration-300 relative
                  ${showFilters 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-green-200 hover:bg-green-50 text-gray-600'
                  }`}
              >
                <Filter size={18} className={showFilters ? 'text-green-600' : 'text-gray-600'} />
                <span className="hidden sm:inline ml-2">Filters</span>
                {getActiveFilterCount() > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center">
                    {getActiveFilterCount()}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Categories */}
          {!search && !aiSearchActive && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((cat, index) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${selectedCategory === cat 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md shadow-green-500/30' 
                      : 'bg-white border border-green-200 text-gray-600 hover:bg-green-50 hover:border-green-300'
                    }`}
                >
                  {cat}
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6 mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      <SlidersHorizontal size={18} className="text-green-600" />
                      Filter Courses
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-sm text-green-600 hover:text-green-700"
                    >
                      Clear all
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Level Filter */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Level</h4>
                      <div className="space-y-2">
                        {levels.map((level) => (
                          <button
                            key={level}
                            onClick={() => setFilters({...filters, level: filters.level === level ? "" : level})}
                            className="flex items-center gap-2 w-full text-left text-sm text-gray-600 hover:text-green-600"
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center
                              ${filters.level === level 
                                ? 'border-green-600 bg-green-600' 
                                : 'border-gray-300'
                              }`}
                            >
                              {filters.level === level && <Check size={12} className="text-white" />}
                            </div>
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Filter */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Price</h4>
                      <div className="space-y-2">
                        {priceRanges.map((price) => (
                          <button
                            key={price}
                            onClick={() => setFilters({...filters, price: filters.price === price ? "" : price})}
                            className="flex items-center gap-2 w-full text-left text-sm text-gray-600 hover:text-green-600"
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center
                              ${filters.price === price 
                                ? 'border-green-600 bg-green-600' 
                                : 'border-gray-300'
                              }`}
                            >
                              {filters.price === price && <Check size={12} className="text-white" />}
                            </div>
                            {price}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Duration Filter */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Duration</h4>
                      <div className="space-y-2">
                        {durations.map((duration) => (
                          <button
                            key={duration}
                            onClick={() => setFilters({...filters, duration: filters.duration === duration ? "" : duration})}
                            className="flex items-center gap-2 w-full text-left text-sm text-gray-600 hover:text-green-600"
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center
                              ${filters.duration === duration 
                                ? 'border-green-600 bg-green-600' 
                                : 'border-gray-300'
                              }`}
                            >
                              {filters.duration === duration && <Check size={12} className="text-white" />}
                            </div>
                            {duration}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Rating</h4>
                      <div className="space-y-2">
                        {ratings.map((rating) => (
                          <button
                            key={rating}
                            onClick={() => setFilters({...filters, rating: filters.rating === rating ? "" : rating})}
                            className="flex items-center gap-2 w-full text-left text-sm text-gray-600 hover:text-green-600"
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center
                              ${filters.rating === rating 
                                ? 'border-green-600 bg-green-600' 
                                : 'border-gray-300'
                              }`}
                            >
                              {filters.rating === rating && <Check size={12} className="text-white" />}
                            </div>
                            <div className="flex items-center gap-1">
                              {rating}
                              <Star size={12} className="fill-yellow-400 text-yellow-400" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Apply Filters Button (Mobile) */}
                  <div className="mt-6 md:hidden">
                    <Button 
                      onClick={() => setShowFilters(false)}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count and Active Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 flex items-center justify-between flex-wrap gap-4"
        >
          <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm border border-green-100">
            {aiSearchActive 
              ? <span className="flex items-center gap-2"><Sparkles size={14} className="text-green-600" /> {aiCourses.length} AI-powered results</span>
              : <span className="flex items-center gap-2"><BookOpen size={14} className="text-green-600" /> {filteredCourses.length} courses available</span>
            }
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            {selectedCategory && (
              <Badge 
                variant="outline" 
                className="bg-green-50 text-green-700 border-green-200 cursor-pointer flex items-center gap-1"
                onClick={() => setSelectedCategory("")}
              >
                {selectedCategory}
                <X size={12} className="ml-1" />
              </Badge>
            )}
            
            {filters.level && (
              <Badge 
                variant="outline" 
                className="bg-green-50 text-green-700 border-green-200 cursor-pointer flex items-center gap-1"
                onClick={() => setFilters({...filters, level: ""})}
              >
                {filters.level}
                <X size={12} className="ml-1" />
              </Badge>
            )}
            
            {filters.price && (
              <Badge 
                variant="outline" 
                className="bg-green-50 text-green-700 border-green-200 cursor-pointer flex items-center gap-1"
                onClick={() => setFilters({...filters, price: ""})}
              >
                {filters.price}
                <X size={12} className="ml-1" />
              </Badge>
            )}
            
            {filters.duration && (
              <Badge 
                variant="outline" 
                className="bg-green-50 text-green-700 border-green-200 cursor-pointer flex items-center gap-1"
                onClick={() => setFilters({...filters, duration: ""})}
              >
                {filters.duration}
                <X size={12} className="ml-1" />
              </Badge>
            )}
            
            {filters.rating && (
              <Badge 
                variant="outline" 
                className="bg-green-50 text-green-700 border-green-200 cursor-pointer flex items-center gap-1"
                onClick={() => setFilters({...filters, rating: ""})}
              >
                {filters.rating}
                <X size={12} className="ml-1" />
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* AI Results */}
          {aiSearchActive ? (
            <AnimatePresence mode="wait">
              {aiLoading ? (
                [1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="border-green-100 shadow-lg overflow-hidden">
                      <Skeleton className="h-48 w-full bg-green-200" />
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4 mb-2 bg-green-200" />
                        <Skeleton className="h-4 w-full bg-green-100" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-8 w-24 bg-green-200" />
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : aiCourses.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full text-center py-16"
                >
                  <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-lg border border-green-100">
                    <Search size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
                    <p className="text-gray-500 mb-6">We couldn't find any courses matching "{search}"</p>
                    <Button 
                      onClick={clearSearch}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6"
                    >
                      Browse all courses
                    </Button>
                  </div>
                </motion.div>
              ) : (
                aiCourses.map((course, index) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => navigate(`/courses/${course._id}`)}
                    className="cursor-pointer"
                  >
                    <Card className="hover:shadow-xl transition-all duration-300 border-2 border-green-100 relative overflow-hidden group">
                      {/* AI Badge */}
                      <motion.div 
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        className="absolute top-4 left-4 z-10"
                      >
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-lg flex items-center gap-1">
                          <Sparkles size={12} />
                          AI Recommended
                        </Badge>
                      </motion.div>

                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={course.thumbnail || "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      <CardHeader>
                        <CardTitle className="text-lg line-clamp-1 group-hover:text-green-600 transition-colors">
                          {course.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 text-gray-500">
                          {course.description || "Learn from industry experts and master your skills with this comprehensive course."}
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-3">
                          {/* Course Stats */}
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Users size={12} className="text-green-500" />
                              <span>{course.totalstudent || "1.2k"} students</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star size={12} className="fill-yellow-400 text-yellow-400" />
                              <span>{course.rating || "4.8"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={12} className="text-green-500" />
                              <span>{course.duration || "40h"}</span>
                            </div>
                          </div>

                          {/* Price and CTA */}
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-2xl font-bold text-gray-900">₹{course.amount || "0"}</span>
                              {course.originalPrice && (
                                <span className="ml-2 text-sm text-gray-400 line-through">₹{course.originalPrice}</span>
                              )}
                            </div>
                            <Button 
                              size="sm"
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg shadow-md"
                            >
                              Enroll Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          ) : (
            /* Regular Courses */
            <>
              {filteredCourses.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-16"
                >
                  <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-lg border border-green-100">
                    <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses found</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your search or browse categories</p>
                    <Button 
                      onClick={clearSearch}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6"
                    >
                      View all courses
                    </Button>
                  </div>
                </motion.div>
              ) : (
                filteredCourses.map((course, index) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => navigate(`/courses/${course._id}`)}
                    className="cursor-pointer"
                  >
                    <Card className="hover:shadow-xl transition-all duration-300 border border-green-100 overflow-hidden group">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={course.thumbnail || "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        {/* Category Badge */}
                        {course.category && (
                          <Badge className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-green-700 border-green-200">
                            {course.category}
                          </Badge>
                        )}
                      </div>

                      <CardHeader>
                        <CardTitle className="text-lg line-clamp-1 group-hover:text-green-600 transition-colors">
                          {course.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 text-gray-500">
                          {course.description || "Learn from industry experts and master your skills with this comprehensive course."}
                        </CardDescription>
                        <p className="text-sm text-gray-500 mt-1">
                          by {course.instructor?.fullName || "Expert Instructor"}
                        </p>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-3">
                          {/* Course Stats */}
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Users size={12} className="text-green-500" />
                              <span>{course.totalstudent || "1.2k"} students</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star size={12} className="fill-yellow-400 text-yellow-400" />
                              <span>{course.rating || "4.8"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={12} className="text-green-500" />
                              <span>{course.duration || "40h"}</span>
                            </div>
                          </div>

                          {/* Price and CTA */}
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-gray-900">₹{course.amount || "0"}</span>
                            <Button 
                              size="sm"
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg shadow-md"
                            >
                              View Course
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </>
          )}
        </div>

        {/* Load More Button (if needed) */}
        {!aiSearchActive && filteredCourses.length > 6 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button 
              variant="outline"
              className="px-8 py-6 border-2 border-green-200 text-green-600 hover:bg-green-50 rounded-xl"
            >
              Load More Courses
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CoursePage;