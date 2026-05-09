import React from "react";
import { ChevronDown, ChevronRight, Lock, PlayCircle } from "lucide-react";

const ModuleList = ({
  modules,
  selectedLecture,
  onSelectLecture,
  isPurchased,
  openModule,
  setOpenModule
}) => {

  const toggleModule = (index) => {
    setOpenModule(openModule === index ? null : index);
  };

  const isLectureCompleted = (lectureId) => {
    return false;
  };

  const isLectureLocked = (index) => {
    return false;
  };

  return (
    <div className="space-y-4">
      {modules.map((module, moduleIndex) => (
        <div
          key={module._id || moduleIndex}
          className="border border-green-200 rounded-xl overflow-hidden bg-white shadow-sm"
        >
          {/* Module Header */}
          <button
            onClick={() => toggleModule(moduleIndex)}
            className="w-full flex items-center justify-between px-5 py-4 bg-green-50 hover:bg-green-100 transition"
          >
            <div className="flex items-center gap-3 flex-1">
              {openModule === moduleIndex ? (
                <ChevronDown size={20} className="text-green-700" />
              ) : (
                <ChevronRight size={20} className="text-green-700" />
              )}
              <div className="text-left">
                <h4 className="font-semibold text-gray-800 text-base">
                  Module {moduleIndex + 1}: {module.title || `Module ${moduleIndex + 1}`}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {module.lectures?.length || 0} Lectures
                </p>
              </div>
            </div>
          </button>

          {/* Lectures */}
          {openModule === moduleIndex && (
            <div className="bg-white px-4 py-3 space-y-2">
              {module.lectures?.map((lecture, lectureIndex) => {
                const isSelected = selectedLecture?._id === lecture._id;
                const isLocked = !isPurchased || isLectureLocked(lectureIndex);
                const isCompleted = isLectureCompleted(lecture._id);

                return (
                  <button
                    key={lecture._id || lectureIndex}
                    onClick={() => !isLocked && onSelectLecture(lecture, moduleIndex)}
                    disabled={isLocked}
                    className={`
                      w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg
                      transition text-sm font-medium
                      ${isSelected
                        ? "bg-green-100 text-green-800"
                        : isLocked
                          ? "text-gray-400 cursor-not-allowed bg-gray-50"
                          : "hover:bg-green-50 text-gray-700"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {isLocked ? (
                        <Lock size={18} />
                      ) : isCompleted ? (
                        <div className="w-4 h-4 bg-green-600 rounded-full" />
                      ) : (
                        <PlayCircle size={18} className="text-green-600" />
                      )}

                      <span className="truncate text-[15px]">
                        {lectureIndex + 1}.{" "}
                        {lecture.lectureTitle || `Lecture ${lectureIndex + 1}`}
                      </span>
                    </div>

                    {lecture.duration && (
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {lecture.duration}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Quiz Section */}
              {module.quizzes?.length > 0 && (
                <div className="mt-3 pt-3 border-t border-green-100">
                  <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 rounded-lg text-sm text-orange-700 font-medium">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    {module.quizzes.length} Quiz
                    {module.quizzes.length > 1 ? "zes" : ""} Available
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ModuleList;