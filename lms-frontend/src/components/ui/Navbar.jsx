import React from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogIn, LogOut, User, Award, BookOpen } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { useGetUserHook, useLogoutHook } from "@/hooks/userhook";
import { toast } from "sonner";
import { motion } from "framer-motion";

const NavBar = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetUserHook();
  const { mutate: logout } = useLogoutHook();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => navigate("/login"),
    });
  };

  const handleEducator = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/request/educator`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Request sent to admin successfully!");
      } else {
        toast.error(res.data.message || "Failed to send request");
      }
    } catch (err) {
      console.error("Error sending request:", err);
      toast.error("Something went wrong. Try again!");
    }
  };

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`h-[75px] w-full px-6 lg:px-10 flex items-center justify-between
                 fixed top-0 z-50 transition-all duration-300
                 ${scrolled 
                   ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200' 
                   : 'bg-white/80 backdrop-blur-sm border-b border-gray-100'
                 }`}
    >
      {/* Logo Section */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-green-500/30">
          <BookOpen size={20} className="text-white" />
        </div>

        <h1 className="text-2xl font-bold tracking-wide
                     bg-gradient-to-r from-green-600 to-emerald-500
                     bg-clip-text text-transparent">
          EduCore
        </h1>
      </motion.div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <motion.div 
          whileHover={{ y: -2 }}
          onClick={() => navigate("/")}
          className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors font-medium"
        >
          Home
        </motion.div>
        <motion.div 
          whileHover={{ y: -2 }}
          className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors font-medium"
        >
          About
        </motion.div>

        {isLoading && (
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gray-500 text-sm"
          >
            Loading...
          </motion.div>
        )}

        {/* Not Logged In */}
        {!isLoading && !user && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                     bg-gradient-to-r from-green-600 to-emerald-600
                     text-white font-medium
                     hover:from-green-700 hover:to-emerald-700
                     transition-all duration-300
                     shadow-lg shadow-green-500/30 hover:shadow-xl"
          >
            <LogIn size={18} />
            Login
          </motion.button>
        )}

        {/* Logged In */}
        {!isLoading && user && (
          <>
            {/* Become Educator Button */}
            {user?.role === 'user' && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEducator}
                className="hidden sm:flex items-center gap-2
                         px-4 py-2 rounded-xl
                         bg-gradient-to-r from-amber-400 to-orange-400
                         text-black font-medium
                         hover:from-amber-500 hover:to-orange-500
                         transition-all duration-300
                         shadow-lg shadow-amber-500/30"
              >
                <Award size={18} />
                Become Educator
              </motion.button>
            )}

            {/* Profile Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 cursor-pointer
                          hover:bg-gray-100/80 px-3 py-2 rounded-xl 
                          transition-all duration-300"
                >
                  <Avatar className="h-10 w-10 ring-2 ring-green-500/20 ring-offset-2 hover:ring-green-500/40 transition-all">
                    <AvatarImage src={user?.profilePhoto || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                      {user?.fullName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-gray-800">
                      {user?.fullName}
                    </p>
                    {/* <p className="text-xs text-gray-500">
                      {user?.email}
                    </p> */}
                  </div>
                </motion.div>
              </PopoverTrigger>

              <PopoverContent className="w-56 p-3 rounded-xl shadow-xl border border-gray-200 bg-white/95 backdrop-blur-xl">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-1"
                >
                  {user.role === 'educator' && (
                    <motion.div
                      whileHover={{ x: 5 }}
                      onClick={() => navigate("/educator_profile")}
                      className="flex items-center gap-2 p-2 rounded-lg cursor-pointer
                               hover:bg-gray-100 transition-all"
                    >
                      <User size={16} />
                      Profile
                    </motion.div>
                  )}
                  {user.role === 'admin' && (
                    <motion.div
                      whileHover={{ x: 5 }}
                      onClick={() => navigate("/admin_profile")}
                      className="flex items-center gap-2 p-2 rounded-lg cursor-pointer
                               hover:bg-gray-100 transition-all"
                    >
                      <User size={16} />
                      Profile
                    </motion.div>
                  )}
                  {user.role === 'user' && (
                    <motion.div
                      whileHover={{ x: 5 }}
                      onClick={() => navigate("/user_profile")}
                      className="flex items-center gap-2 p-2 rounded-lg cursor-pointer
                               hover:bg-gray-100 transition-all"
                    >
                      <User size={16} />
                      Profile
                    </motion.div>
                  )}
                  <motion.div
                    whileHover={{ x: 5 }}
                    onClick={() => navigate("/your_courses")}
                    className="flex items-center gap-2 p-2 rounded-lg cursor-pointer
                             hover:bg-gray-100 transition-all"
                  >
                    <BookOpen size={16} />
                    Your Courses
                  </motion.div>

                  {user.role === 'educator' && (
                    <motion.div
                      whileHover={{ x: 5 }}
                      onClick={() => navigate("/created-courses")}
                      className="flex items-center gap-2 p-2 rounded-lg cursor-pointer
                               hover:bg-gray-100 transition-all"
                    >
                      <Award size={16} />
                      Created Courses
                    </motion.div>
                  )}

                  <div className="border-t border-gray-100 my-2" />

                  <motion.div
                    whileHover={{ x: 5 }}
                    onClick={handleLogout}
                    className="flex items-center gap-2 p-2 rounded-lg cursor-pointer
                             text-red-500 hover:bg-red-50 transition-all"
                  >
                    <LogOut size={16} />
                    Logout
                  </motion.div>
                </motion.div>
              </PopoverContent>
            </Popover>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default NavBar;