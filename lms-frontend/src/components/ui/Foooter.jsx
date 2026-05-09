import React from "react";

import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  BookOpen,
  ChevronRight,
  Send
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Become Educator", path: "/become-educator" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" },
  ];

  const categories = [
    "Web Development",
    "Data Science",
    "Mobile Development",
    "UI/UX Design",
    "Digital Marketing",
    "Business",
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:bg-blue-600" },
    { icon: Twitter, href: "#", color: "hover:bg-sky-500" },
    { icon: Linkedin, href: "#", color: "hover:bg-blue-700" },
    { icon: Instagram, href: "#", color: "hover:bg-pink-600" },
  ];

  return ( <>
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />

      {/* Main Footer */}
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
            
            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center
                           hover:text-white transition-all duration-300 ${social.color}`}
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
                  <ChevronRight size={14} className="text-green-500 group-hover:translate-x-1 transition-transform" />
                  <span className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold text-lg mb-4">Popular Categories</h3>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 cursor-pointer group"
                  onClick={() => navigate(`/courses?category=${category.toLowerCase().replace(' ', '-')}`)}
                >
                  <div className="w-1 h-1 rounded-full bg-green-500 group-hover:scale-150 transition-transform" />
                  <span className="text-sm hover:text-white transition-colors">
                    {category}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold text-lg mb-4">Get in Touch</h3>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                  <Mail size={14} className="group-hover:text-white" />
                </div>
                <span className="text-sm hover:text-white transition-colors">support@educore.com</span>
              </div>
              
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                  <Phone size={14} className="group-hover:text-white" />
                </div>
                <span className="text-sm hover:text-white transition-colors">+1 (555) 123-4567</span>
              </div>
              
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                  <MapPin size={14} className="group-hover:text-white" />
                </div>
                <span className="text-sm hover:text-white transition-colors">San Francisco, CA</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-4">
              <h4 className="text-white text-sm font-medium mb-3">Subscribe to Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 rounded-l-lg border border-gray-700
                           focus:outline-none focus:border-green-500 text-sm text-white
                           placeholder-gray-500"
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
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 flex items-center gap-1">
              © {currentYear} EduCore. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 flex items-center gap-1">
              Made with <Heart size={14} className="text-red-500 fill-red-500" /> for learners worldwide
            </p>
            <div className="flex gap-4 text-xs text-gray-500">
              <span className="cursor-pointer hover:text-white transition-colors">Privacy</span>
              <span className="cursor-pointer hover:text-white transition-colors">Terms</span>
              <span className="cursor-pointer hover:text-white transition-colors">Sitemap</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
     </>
  );
};

export default Footer;