import React, { useState } from "react";
import { useCreateCourseHook } from "@/hooks/course.hook";
import { createModuleApi } from "@/Api/course.api";
import { Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
const CreateCourse = () => {
    const navigate=useNavigate();
  const { mutate, isPending } = useCreateCourseHook();
  const [courseId, setCourseId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Course State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  // Modules State
  const [modules, setModules] = useState([
    {
      moduleTitle: "",
      lectures: [{ lectureTitle: "", video: null }],
    },
  ]);

  // ================= COURSE CREATE =================
  const handleCourseSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !amount || !thumbnail) {
      alert("Please fill all course fields");
       
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("amount", amount);
    formData.append("thumbnail", thumbnail);

    mutate(formData, {
      onSuccess: (data) => {
        setCourseId(data.newCourse._id);
      },
    });
  };

  // ================= ADD MODULE =================
  const addModule = () => {
    setModules([
      ...modules,
      { moduleTitle: "", lectures: [{ lectureTitle: "", video: null }] },
    ]);
  };

  // ================= REMOVE MODULE =================
  const removeModule = (moduleIndex) => {
    const updated = modules.filter((_, index) => index !== moduleIndex);
    setModules(updated);
  };

  // ================= ADD LECTURE =================
  const addLecture = (moduleIndex) => {
    const updated = [...modules];
    updated[moduleIndex].lectures.push({
      lectureTitle: "",
      video: null,
    });
    setModules(updated);
  };

  // ================= REMOVE LECTURE =================
  const removeLecture = (moduleIndex, lectureIndex) => {
    const updated = [...modules];
    updated[moduleIndex].lectures = updated[moduleIndex].lectures.filter(
      (_, index) => index !== lectureIndex
    );
    setModules(updated);
  };

  // ================= CREATE ALL MODULES =================
  const handleCreateModules = async () => {
    try {
      setIsUploading(true);

      // Validation
      for (let module of modules) {
        if (!module.moduleTitle) {
          alert("Every module must have title");
          setIsUploading(false);
          return;
        }

        for (let lecture of module.lectures) {
          if (!lecture.lectureTitle || !lecture.video) {
            alert("Every lecture needs title & video");
            setIsUploading(false);
            return;
          }
        }
      }

      const moduleForm = new FormData();

      // Send modules JSON
      const modulesData = modules.map((module) => ({
        moduleTitle: module.moduleTitle,
        lectures: module.lectures.map((lec) => ({
          lectureTitle: lec.lectureTitle,
        })),
      }));

      moduleForm.append("modules", JSON.stringify(modulesData));

      // Append ALL videos sequentially
      modules.forEach((module) => {
        module.lectures.forEach((lec) => {
          moduleForm.append("lecturesVideo", lec.video);
        });
      });

      await createModuleApi({
        courseId,
        formData: moduleForm,
      });

      alert("All Modules Created Successfully 🎉");
       navigate("/created-courses");
      // Reset after success
      setModules([
        {
          moduleTitle: "",
          lectures: [{ lectureTitle: "", video: null }],
        },
      ]);

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">

        {!courseId ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">
              Create Course
            </h2>

            <form onSubmit={handleCourseSubmit} className="space-y-4">
              <input
                className="w-full border p-2 rounded-lg"
                placeholder="Course Title"
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                className="w-full border p-2 rounded-lg"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="number"
                className="w-full border p-2 rounded-lg"
                placeholder="Price"
                onChange={(e) => setAmount(e.target.value)}
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files[0])}
              />

              <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create Course"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">
              Add Modules & Lectures
            </h2>

            {modules.map((module, moduleIndex) => (
              <div
                key={moduleIndex}
                className="border rounded-xl p-4 mb-6 bg-gray-50 relative"
              >
                {/* Remove Module */}
                {modules.length > 1 && (
                  <button
                    onClick={() => removeModule(moduleIndex)}
                    className="absolute top-3 right-3 text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                )}

                {/* Module Title */}
                <input
                  className="w-full border p-2 rounded-lg mb-4"
                  placeholder="Module Title"
                  value={module.moduleTitle}
                  onChange={(e) => {
                    const updated = [...modules];
                    updated[moduleIndex].moduleTitle = e.target.value;
                    setModules(updated);
                  }}
                />

                {/* Lectures */}
                {module.lectures.map((lecture, lectureIndex) => (
                  <div key={lectureIndex} className="mb-4 relative">
                    {module.lectures.length > 1 && (
                      <button
                        onClick={() =>
                          removeLecture(moduleIndex, lectureIndex)
                        }
                        className="absolute top-2 right-2 text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}

                    <input
                      className="w-full border p-2 rounded-lg mb-2"
                      placeholder="Lecture Title"
                      value={lecture.lectureTitle}
                      onChange={(e) => {
                        const updated = [...modules];
                        updated[moduleIndex].lectures[
                          lectureIndex
                        ].lectureTitle = e.target.value;
                        setModules(updated);
                      }}
                    />

                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        const updated = [...modules];
                        updated[moduleIndex].lectures[
                          lectureIndex
                        ].video = e.target.files[0];
                        setModules(updated);
                      }}
                    />
                  </div>
                ))}

                {/* + Add Lecture */}
                <button
                  onClick={() => addLecture(moduleIndex)}
                  className="flex items-center gap-2 text-blue-600 font-semibold"
                >
                  <Plus size={18} /> Add Lecture
                </button>
              </div>
            ))}

            {/* + Add Module */}
            <button
              onClick={addModule}
              className="flex items-center gap-2 text-green-600 font-semibold mb-6"
            >
              <Plus size={20} /> Add Module
            </button>

            {/* Final Create Button */}
            <button
              onClick={handleCreateModules}
              disabled={isUploading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold"
            >
              {isUploading ? "Uploading..." : "Create All Modules"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateCourse;