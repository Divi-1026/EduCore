import { BookOpen, Play, Clock } from "lucide-react";

const CourseHero = ({ title, description, modulesCount, totalLectures }) => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-gray-300 max-w-2xl">{description}</p>
        <div className="flex gap-6 mt-6 text-sm">
          <span className="flex items-center gap-2">
            <BookOpen size={16} /> {modulesCount} Modules
          </span>
          <span className="flex items-center gap-2">
            <Play size={16} /> {totalLectures} Lectures
          </span>
          <span className="flex items-center gap-2">
            <Clock size={16} /> Lifetime Access
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseHero;