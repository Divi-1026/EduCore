import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Users,
  Star,
  Clock,
  ChevronRight,
  GraduationCap,
  PlayCircle,
  MessageCircle,
  ArrowRight,
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Bot,
  Sparkles,
  Zap,
  Upload,
  DollarSign,
  BarChart3,
  Presentation,
  Award,
  Video,
  LogIn,
  LogOut,
  User,
  Menu,
  X,
  Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGetUserHook, useLogoutHook } from "@/hooks/userhook";
import { toast } from "sonner";

const Home = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetUserHook();
  const { mutate: logout } = useLogoutHook();
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchPopularCourses = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/course/popular-courses`
        );
        setCourses(res.data.courses || []);
      } catch (error) {
        console.log("Error fetching popular courses", error);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchPopularCourses();
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

  const stats = [
    { id: 1, value: "50K+", label: "Students", icon: <Users size={20} /> },
    { id: 2, value: "200+", label: "Courses", icon: <BookOpen size={20} /> },
    { id: 3, value: "92%", label: "Success Rate", icon: <GraduationCap size={20} /> }
  ];

  const features = [
    {
      icon: <GraduationCap className="h-8 w-8 text-green-600" />,
      title: "Learn at Your Pace",
      description: "Access courses anytime, anywhere. Learn on your schedule with lifetime access to course materials."
    },
    {
      icon: <Presentation className="h-8 w-8 text-emerald-600" />,
      title: "Teach & Earn",
      description: "Share your expertise with students worldwide. Create and publish courses with our easy-to-use platform."
    },
    {
      icon: <Bot className="h-8 w-8 text-teal-600" />,
      title: "AI Chatbot Assistant",
      description: "Never get stuck! Ask questions during lectures with our intelligent AI assistant that provides instant, contextual answers."
    },
    {
      icon: <Video className="h-8 w-8 text-green-600" />,
      title: "HD Video Lectures",
      description: "Crystal-clear video quality with interactive features like bookmarks, notes, and playback speed control."
    },
    {
      icon: <Award className="h-8 w-8 text-emerald-600" />,
      title: "Earn Certificates",
      description: "Complete courses and earn certificates to showcase your achievements and advance your career."
    },
    {
      icon: <Clock className="h-8 w-8 text-teal-600" />,
      title: "Flexible Learning",
      description: "Download content for offline viewing and learn even when you're not connected to the internet."
    }
  ];

  const educatorBenefits = [
    {
      icon: <Upload className="h-8 w-8 text-green-600" />,
      title: "Easy Course Creation",
      description: "Upload videos, create quizzes, and structure your curriculum with our intuitive course builder"
    },
    {
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      title: "Earn Revenue",
      description: "Set your own pricing and earn up to 80% of course sales revenue"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      title: "Track Performance",
      description: "Get detailed analytics on student engagement and course performance"
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Reach Global Audience",
      description: "Share your knowledge with students from around the world"
    }
  ];

  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Become Educator", path: "/become-educator" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:bg-blue-600" },
    { icon: Twitter, href: "#", color: "hover:bg-sky-500" },
    { icon: Linkedin, href: "#", color: "hover:bg-blue-700" },
    { icon: Instagram, href: "#", color: "hover:bg-pink-600" },
  ];

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'About', path: '/about' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
     
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Learn Without Limits with{" "}
              <span className="text-green-600">AI-Powered Education</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of students learning from expert educators. Ask questions anytime with our AI chatbot integrated into every lecture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/courses")}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-green-500/30 flex items-center gap-2"
              >
                Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-green-300 text-green-700 px-8 py-3 rounded-lg font-medium hover:bg-white/50 transition-all duration-300 flex items-center gap-2"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </motion.button> */}
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              {stats.map((stat) => (
                <motion.div 
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: stat.id * 0.1 }}
                  className="text-center bg-white/50 backdrop-blur-sm px-6 py-3 rounded-xl"
                >
                  <div className="text-3xl font-bold text-green-600">{stat.value}</div>
                  <div className="flex items-center gap-1 justify-center mt-1 text-gray-700">
                    {stat.icon}
                    <span>{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with quality education to create the ultimate learning experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our most popular courses taught by industry experts
            </p>
          </motion.div>

          {loadingCourses ? (
            <div className="text-center py-10">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto"
              />
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No popular courses available.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course, index) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  onClick={() => navigate(`/courses/${course._id}`)}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.thumbnail || "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"}
                      alt={course.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-green-700 px-3 py-1 rounded-full text-xs font-semibold border border-green-200">
                      {course.category || "Development"}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      by {course.instructor?.fullName || "Expert Instructor"}
                    </p>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users size={14} />
                        <span>{course.totalstudent || 0} students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-gray-600">{course.rating || 4.8}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock size={14} />
                        <span>{course.duration || "40h"}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">
                        ₹ {course.amount}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-md"
                      >
                        Enroll Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => navigate("/courses")}
              className="text-green-600 hover:text-green-700 font-semibold text-lg inline-flex items-center gap-2"
            >
              View All Courses <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </section>

      {/* AI Feature Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">AI-Powered Learning</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Learn Faster with AI Chatbot Assistant
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Get instant answers to your questions while watching lectures. Our intelligent AI chatbot understands the context of your lesson and provides relevant, accurate responses in real-time.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: Zap, color: "green", title: "Instant Answers", desc: "Get responses within seconds, never pause your learning flow" },
                  { icon: MessageCircle, color: "emerald", title: "Context-Aware", desc: "The AI understands what you're watching and gives relevant answers" },
                  { icon: Bot, color: "teal", title: "24/7 Available", desc: "Learn at any time with your AI assistant always ready to help" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className={`flex-shrink-0 w-12 h-12 bg-${item.color}-100 rounded-lg flex items-center justify-center`}>
                      <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-green-200">
  <div className="bg-white p-6 text-gray-800">
    {/* Header */}
    <div className="flex items-center gap-2 mb-6">
      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
        <Bot className="h-5 w-5 text-green-600" />
      </div>
      <span className="font-semibold text-gray-800">AI Learning Assistant</span>
      <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Online</span>
    </div>
    
    {/* Chat Messages */}
    <div className="space-y-4 mb-4">
      {/* User Message */}
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-green-50 rounded-2xl rounded-tr-none px-4 py-3">
          <p className="text-sm text-gray-700">"Can you explain how React hooks work?"</p>
          <span className="text-[10px] text-gray-400 mt-1 block text-right">12:34 PM</span>
        </div>
      </div>
      
      {/* Bot Message */}
      <div className="flex justify-start">
        <div className="max-w-[80%] bg-white border border-green-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Bot size={12} className="text-green-600" />
            <span className="text-xs font-medium text-green-700">AI Assistant</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            React hooks are functions that let you use state and other React features in functional components. In this lecture, the instructor is demonstrating useState, which allows you to add state to your component. Would you like me to explain the example at timestamp 12:34?
          </p>
          <span className="text-[10px] text-gray-400 mt-1 block">12:35 PM</span>
        </div>
      </div>

      {/* User Message */}
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-green-50 rounded-2xl rounded-tr-none px-4 py-3">
          <p className="text-sm text-gray-700">"Yes, please break down that example"</p>
          <span className="text-[10px] text-gray-400 mt-1 block text-right">12:36 PM</span>
        </div>
      </div>

      {/* Typing Indicator */}
      <div className="flex justify-start">
        <div className="bg-white border border-green-200 rounded-2xl rounded-tl-none px-4 py-3">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
          </div>
        </div>
      </div>
    </div>

    {/* Input Area */}
    <div className="border-t border-green-100 pt-4">
      <div className="flex items-center gap-2 bg-green-50 rounded-full p-1">
        <input 
          type="text" 
          placeholder="Ask me anything about this lecture..."
          className="flex-1 bg-transparent px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-9 h-9 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-md"
        >
          <Send size={14} className="text-white" />
        </motion.button>
      </div>
      <p className="text-[10px] text-gray-400 mt-2 text-center">
        AI assistant helps you understand concepts in real-time
      </p>
    </div>
  </div>
</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Educators Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Become an Educator
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Share your expertise with millions of learners worldwide and build a thriving teaching business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {educatorBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Teaching?
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-green-50">
              Join our community of expert educators and start creating your first course today. It's free to get started!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-medium text-lg hover:bg-green-50 transition-all duration-300 shadow-lg"
            >
              Start Teaching Today
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-b from-green-900 to-green-950 text-gray-300">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400" />

        <div className="container mx-auto px-6 lg:px-10 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div 
                onClick={() => navigate("/")}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl group-hover:scale-105 transition-transform shadow-lg shadow-green-500/30">
                  <BookOpen size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  EduCore
                </h2>
              </div>
              
              <p className="text-sm leading-relaxed">
                Empowering learners worldwide with quality education. Join us to unlock your potential and shape your future.
              </p>
              
              <div className="flex gap-3 pt-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-lg bg-green-800 flex items-center justify-center
                             hover:text-white transition-all duration-300 hover:bg-${social.color.split('-')[1]}-600`}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => navigate(link.path)}
                  >
                    <ChevronRight size={14} className="text-green-400 group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm hover:text-white transition-colors">
                      {link.name}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact & Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-white font-semibold text-lg mb-4">Get in Touch</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-green-800 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                    <Mail size={14} className="group-hover:text-white" />
                  </div>
                  <span className="text-sm hover:text-white transition-colors">support@educore.com</span>
                </div>
                
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-green-800 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                    <Phone size={14} className="group-hover:text-white" />
                  </div>
                  <span className="text-sm hover:text-white transition-colors">+1 (555) 123-4567</span>
                </div>
                
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-green-800 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                    <MapPin size={14} className="group-hover:text-white" />
                  </div>
                  <span className="text-sm hover:text-white transition-colors">San Francisco, CA</span>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="text-white text-sm font-medium mb-3">Subscribe to Newsletter</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-green-800 rounded-l-lg border border-green-700
                             focus:outline-none focus:border-green-500 text-sm text-white
                             placeholder-green-400"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 bg-gradient-to-r from-green-600 to-emerald-600
                             rounded-r-lg hover:from-green-700 hover:to-emerald-700
                             transition-all duration-300"
                  >
                    <Send size={18} className="text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-green-800"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-green-400 flex items-center gap-1">
                © {currentYear} EduCore. All rights reserved.
              </p>
              <p className="text-sm text-green-400 flex items-center gap-1">
                Made with <Heart size={14} className="text-red-500 fill-red-500" /> for learners worldwide
              </p>
              <div className="flex gap-4 text-xs text-green-500">
                <span className="cursor-pointer hover:text-white transition-colors">Privacy</span>
                <span className="cursor-pointer hover:text-white transition-colors">Terms</span>
                <span className="cursor-pointer hover:text-white transition-colors">Sitemap</span>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

// Add Send icon since it was missing
const Send = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export default Home;