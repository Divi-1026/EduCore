import { useEffect, useState } from "react";
import axios from "axios";
import { 
  BookOpenIcon, 
  UserGroupIcon, 
  CurrencyRupeeIcon,
  ArrowTrendingUpIcon,
  AcademicCapIcon,
  ChartPieIcon,
  PresentationChartBarIcon,
  UsersIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area
} from 'recharts';

function EducatorAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [hoveredRow, setHoveredRow] = useState(null);
  const [timeRange, setTimeRange] = useState('week');

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/educator/getEducatorAnalytics`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setData(res?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Greenish Theme Colors
  const THEME = {
    primary: '#059669', // Emerald green
    secondary: '#10b981', // Light green
    accent: '#d1fae5', // Light mint
    success: '#059669',
    warning: '#f59e0b',
    danger: '#ef4444',
    gradient: 'from-emerald-600 to-green-600',
    lightBg: 'from-emerald-50 to-green-50',
    border: '#e4e4e7'
  };

  const COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const StatCard = ({ title, value, icon: Icon, subtitle, trend }) => (
    <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 bg-emerald-50 rounded-lg">
          <Icon className="w-5 h-5 text-emerald-600" />
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            trend > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-2xl font-semibold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );

  // Prepare detailed data for charts
  const preparePieData = () => {
    return data?.courses?.map(course => ({
      name: course.title,
      value: course.totalstudent,
      revenue: course.totalstudent * course.amount,
      students: course.totalstudent
    })) || [];
  };

  const prepareBarData = () => {
    return data?.courses?.map(course => ({
      name: course.title.length > 12 ? course.title.substring(0, 10) + '...' : course.title,
      students: course.totalstudent,
      revenue: course.totalstudent * course.amount,
      fullTitle: course.title
    })) || [];
  };

  // Platform vs Enrolled Data
  const userEnrollmentData = [
    { name: 'Platform Users', value: 1250 },
    { name: 'Your Students', value: data?.totalStudents || 0 }
  ];

  // Revenue Trend Data
  const revenueTrendData = [
    { month: 'Jan', revenue: Math.round((data?.totalRevenue || 0) * 0.6) },
    { month: 'Feb', revenue: Math.round((data?.totalRevenue || 0) * 0.7) },
    { month: 'Mar', revenue: Math.round((data?.totalRevenue || 0) * 0.8) },
    { month: 'Apr', revenue: Math.round((data?.totalRevenue || 0) * 0.85) },
    { month: 'May', revenue: Math.round((data?.totalRevenue || 0) * 0.9) },
    { month: 'Jun', revenue: data?.totalRevenue || 0 }
  ];

  const pieData = preparePieData();
  const barData = prepareBarData();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="text-sm font-medium text-gray-900 mb-1">{payload[0].name || label}</p>
          {payload.map((item, index) => (
            <p key={index} className="text-xs text-gray-600">
              {item.name}: <span className="font-medium" style={{ color: item.color }}>{item.value.toLocaleString()}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <AcademicCapIcon className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Educator Analytics</h1>
              <p className="text-sm text-gray-500">Complete performance overview of your courses</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {['overview', 'analytics', 'performance', 'details'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-colors relative ${
                activeTab === tab
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Stats Cards - Always Visible with more details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Courses"
            value={data?.totalCourses || 0}
            icon={BookOpenIcon}
            subtitle={`${data?.courses?.length || 0} active courses`}
            trend={12}
          />
          <StatCard
            title="Total Students"
            value={data?.totalStudents || 0}
            icon={UserGroupIcon}
            subtitle={`Across all your courses`}
            trend={8}
          />
          <StatCard
            title="Total Revenue"
            value={`₹${(data?.totalRevenue || 0).toLocaleString()}`}
            icon={CurrencyRupeeIcon}
            subtitle="Lifetime earnings"
            trend={15}
          />
        </div>

        {/* Overview Tab - Detailed Course List */}
        {activeTab === 'overview' && (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-medium text-gray-900">Your Courses - Detailed Overview</h2>
              <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">
                {data?.courses?.length || 0} courses
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enrolled Students</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data?.courses?.map((course, index) => {
                    const revenue = course.totalstudent * course.amount;
                    const percentage = data.totalStudents ? (course.totalstudent / data.totalStudents) * 100 : 0;
                    
                    return (
                      <tr 
                        key={index} 
                        className="hover:bg-gray-50 transition-colors"
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                              <BookOpenIcon className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-900 block">{course.title}</span>
                              <span className="text-xs text-gray-400">Course ID: #{index + 1}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900">{course.totalstudent}</span>
                          <span className="text-xs text-gray-400 ml-1">students</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">₹{course.amount?.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-emerald-600">₹{revenue.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-20 bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-emerald-500 h-1.5 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">{Math.round(percentage)}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab - All Charts */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pie Chart - Student Distribution */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Student Distribution Across Courses</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 text-xs text-gray-400 text-center">
                  Total Students: {data?.totalStudents || 0}
                </div>
              </div>

              {/* Bar Chart - Revenue Comparison */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Revenue by Course (₹)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="revenue" fill={THEME.primary} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Platform vs Enrolled & Revenue Trend */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Your Students vs Platform Users</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={userEnrollmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {userEnrollmentData.map((entry, index) => (
                        <Cell key={index} fill={index === 0 ? '#9ca3af' : THEME.primary} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Revenue Growth Trend (6 Months)</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={revenueTrendData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={THEME.primary} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={THEME.primary} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke={THEME.primary} 
                      fill="url(#revenueGradient)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Student Growth Line Chart */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Student Growth by Course</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={pieData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={THEME.primary} 
                    strokeWidth={2}
                    dot={{ fill: THEME.primary, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Quick Performance Stats */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Course Performance Summary</h3>
              <div className="space-y-4">
                {data?.courses?.map((course, index) => {
                  const revenue = course.totalstudent * course.amount;
                  return (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <span className="text-sm font-medium text-gray-900 block">{course.title}</span>
                        <span className="text-xs text-gray-400">{course.totalstudent} students</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-emerald-600 block">₹{revenue.toLocaleString()}</span>
                        <span className="text-xs text-gray-400">Revenue</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Details Tab - Extra Detailed View */}
        {activeTab === 'details' && (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-medium text-gray-900">Complete Course Analytics</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg/Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">% of Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data?.courses?.map((course, index) => {
                    const revenue = course.totalstudent * course.amount;
                    const percentage = data.totalStudents ? (course.totalstudent / data.totalStudents) * 100 : 0;
                    const revenuePercentage = data.totalRevenue ? (revenue / data.totalRevenue) * 100 : 0;
                    
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-900">{course.title}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900">{course.totalstudent}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">₹{course.amount?.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-emerald-600">₹{revenue.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">₹{Math.round(revenue/course.totalstudent).toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{Math.round(percentage)}% students</span>
                            <span className="text-xs text-emerald-500">({Math.round(revenuePercentage)}% revenue)</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {(!data?.courses || data.courses.length === 0) && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <BookOpenIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No courses available</p>
            <p className="text-sm text-gray-400 mt-1">Start creating courses to see detailed analytics</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EducatorAnalytics;