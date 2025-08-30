import React, { useState, useMemo } from 'react';
import { Search, Calendar, Tag, Users, Trophy, BookOpen, Bell, ChevronRight, Clock } from 'lucide-react';

const newsData = [
    {
        id: 1,
        title: "JEE Main 2024 Results Declared - Record Breaking Success Rate",
        excerpt: "Our students achieve unprecedented success with 95% qualifying rate in JEE Main 2024. Detailed analysis and toppers' interviews inside.",
        category: "Results",
        date: "2024-01-15",
        image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800",
        featured: true,
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "New Batch for NEET 2025 Starting February 1st",
        excerpt: "Comprehensive 18-month program with expert faculty, weekly tests, and personalized mentoring for NEET aspirants.",
        category: "Announcements",
        date: "2024-01-12",
        image: "https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=800",
        featured: false,
        readTime: "3 min read"
    },
    {
        id: 3,
        title: "Important Changes in JEE Advanced 2024 Pattern",
        excerpt: "Latest updates from IIT regarding exam pattern modifications and new syllabus changes that every aspirant must know.",
        category: "Exam Updates",
        date: "2024-01-10",
        image: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800",
        featured: false,
        readTime: "4 min read"
    },
    {
        id: 4,
        title: "Annual Sports Day and Cultural Fest 2024",
        excerpt: "Join us for a day of fun, sports, and cultural activities. Students showcase their talents beyond academics.",
        category: "Events",
        date: "2024-01-08",
        image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
        featured: false,
        readTime: "2 min read"
    },
    {
        id: 5,
        title: "Scholarship Program for Meritorious Students",
        excerpt: "Up to 100% fee waiver for deserving students based on entrance test performance and family income criteria.",
        category: "Announcements",
        date: "2024-01-05",
        image: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=800",
        featured: false,
        readTime: "3 min read"
    },
    {
        id: 6,
        title: "CBSE Board Exam Strategy Workshop",
        excerpt: "Expert tips and proven strategies for scoring maximum marks in CBSE Class 12 board examinations.",
        category: "Events",
        date: "2024-01-03",
        image: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=800",
        featured: false,
        readTime: "4 min read"
    }
];

const categories = ["All", "Announcements", "Exam Updates", "Results", "Events"];

function News() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredNews = useMemo(() => {
        return newsData.filter(item => {
            const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchTerm]);

    const featuredNews = newsData.find(item => item.featured);
    const regularNews = filteredNews.filter(item => !item.featured);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  py-20">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            News & Updates
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Stay updated with the latest announcements, exam updates, and success stories from our coaching institute
                        </p>
                    </div>
                </div>
            </header>

            {/* Quick Stats
            <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Trophy className="h-8 w-8 text-yellow-300" />
                            </div>
                            <div className="text-2xl font-bold">95%</div>
                            <div className="text-blue-100">Success Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Users className="h-8 w-8 text-green-300" />
                            </div>
                            <div className="text-2xl font-bold">5000+</div>
                            <div className="text-blue-100">Students</div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <BookOpen className="h-8 w-8 text-purple-300" />
                            </div>
                            <div className="text-2xl font-bold">50+</div>
                            <div className="text-blue-100">Expert Faculty</div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <Bell className="h-8 w-8 text-orange-300" />
                            </div>
                            <div className="text-2xl font-bold">15</div>
                            <div className="text-blue-100">Years Experience</div>
                        </div>
                    </div>
                </div>
            </section> */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filters */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full sm:w-96">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search news and updates..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Featured News */}
                {featuredNews && selectedCategory === "All" && !searchTerm && (
                    <section className="mb-12">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="md:flex">
                                <div className="md:w-1/2">
                                    <img
                                        src={featuredNews.image}
                                        alt={featuredNews.title}
                                        className="w-full h-64 md:h-full object-cover"
                                    />
                                </div>
                                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            Featured
                                        </span>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                                            {featuredNews.category}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                                        {featuredNews.title}
                                    </h2>
                                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                        {featuredNews.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {formatDate(featuredNews.date)}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {featuredNews.readTime}
                                            </div>
                                        </div>
                                        <button className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors">
                                            Read More
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* News Grid */}
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {regularNews.map((item) => (
                            <article
                                key={item.id}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="relative">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.category === 'Results' ? 'bg-green-100 text-green-800' :
                                            item.category === 'Announcements' ? 'bg-blue-100 text-blue-800' :
                                                item.category === 'Exam Updates' ? 'bg-orange-100 text-orange-800' :
                                                    'bg-purple-100 text-purple-800'
                                            }`}>
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                                        {item.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {formatDate(item.date)}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {item.readTime}
                                            </div>
                                        </div>
                                        <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredNews.length === 0 && (
                        <div className="text-center py-12">
                            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Search className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                            <p className="text-gray-600">
                                Try adjusting your search terms or selected category.
                            </p>
                        </div>
                    )}
                </section>

                {/* Load More Button */}
                {regularNews.length > 0 && (
                    <div className="text-center mt-12">
                        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                            Load More Articles
                        </button>
                    </div>
                )}
            </div>

            {/* Newsletter Signup
            <section className="bg-gray-900 text-white py-16 mt-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                    <p className="text-gray-300 mb-8 text-lg">
                        Subscribe to our newsletter and never miss important updates about exams, results, and announcements.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section> */}
        </div>
    );
}

export default News;



















































// import React, { useState, useMemo } from 'react';
// import { Search, Calendar, Tag, Users, Trophy, BookOpen, Bell, ChevronRight, Clock } from 'lucide-react';

// interface NewsItem {
//     id: number;
//     title: string;
//     excerpt: string;
//     category: string;
//     date: string;
//     image: string;
//     featured: boolean;
//     readTime: string;
// }

// const newsData: NewsItem[] = [
//     {
//         id: 1,
//         title: "JEE Main 2024 Results Declared - Record Breaking Success Rate",
//         excerpt: "Our students achieve unprecedented success with 95% qualifying rate in JEE Main 2024. Detailed analysis and toppers' interviews inside.",
//         category: "Results",
//         date: "2024-01-15",
//         image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800",
//         featured: true,
//         readTime: "5 min read"
//     },
//     {
//         id: 2,
//         title: "New Batch for NEET 2025 Starting February 1st",
//         excerpt: "Comprehensive 18-month program with expert faculty, weekly tests, and personalized mentoring for NEET aspirants.",
//         category: "Announcements",
//         date: "2024-01-12",
//         image: "https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=800",
//         featured: false,
//         readTime: "3 min read"
//     },
//     {
//         id: 3,
//         title: "Important Changes in JEE Advanced 2024 Pattern",
//         excerpt: "Latest updates from IIT regarding exam pattern modifications and new syllabus changes that every aspirant must know.",
//         category: "Exam Updates",
//         date: "2024-01-10",
//         image: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800",
//         featured: false,
//         readTime: "4 min read"
//     },
//     {
//         id: 4,
//         title: "Annual Sports Day and Cultural Fest 2024",
//         excerpt: "Join us for a day of fun, sports, and cultural activities. Students showcase their talents beyond academics.",
//         category: "Events",
//         date: "2024-01-08",
//         image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
//         featured: false,
//         readTime: "2 min read"
//     },
//     {
//         id: 5,
//         title: "Scholarship Program for Meritorious Students",
//         excerpt: "Up to 100% fee waiver for deserving students based on entrance test performance and family income criteria.",
//         category: "Announcements",
//         date: "2024-01-05",
//         image: "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=800",
//         featured: false,
//         readTime: "3 min read"
//     },
//     {
//         id: 6,
//         title: "CBSE Board Exam Strategy Workshop",
//         excerpt: "Expert tips and proven strategies for scoring maximum marks in CBSE Class 12 board examinations.",
//         category: "Events",
//         date: "2024-01-03",
//         image: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=800",
//         featured: false,
//         readTime: "4 min read"
//     }
// ];

// const categories = ["All", "Announcements", "Exam Updates", "Results", "Events"];

// function News() {
//     const [selectedCategory, setSelectedCategory] = useState("All");
//     const [searchTerm, setSearchTerm] = useState("");

//     const filteredNews = useMemo(() => {
//         return newsData.filter(item => {
//             const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
//             const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
//             return matchesCategory && matchesSearch;
//         });
//     }, [selectedCategory, searchTerm]);

//     const featuredNews = newsData.find(item => item.featured);
//     const regularNews = filteredNews.filter(item => !item.featured);

//     const formatDate = (dateString: string) => {
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     };

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Header */}
//             <header className="bg-white shadow-sm border-b">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//                     <div className="text-center">
//                         <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
//                             News & Updates
//                         </h1>
//                         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                             Stay updated with the latest announcements, exam updates, and success stories from our coaching institute
//                         </p>
//                     </div>
//                 </div>
//             </header>

//             {/* Quick Stats */}
//             <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                         <div className="text-center">
//                             <div className="flex items-center justify-center mb-2">
//                                 <Trophy className="h-8 w-8 text-yellow-300" />
//                             </div>
//                             <div className="text-2xl font-bold">95%</div>
//                             <div className="text-blue-100">Success Rate</div>
//                         </div>
//                         <div className="text-center">
//                             <div className="flex items-center justify-center mb-2">
//                                 <Users className="h-8 w-8 text-green-300" />
//                             </div>
//                             <div className="text-2xl font-bold">5000+</div>
//                             <div className="text-blue-100">Students</div>
//                         </div>
//                         <div className="text-center">
//                             <div className="flex items-center justify-center mb-2">
//                                 <BookOpen className="h-8 w-8 text-purple-300" />
//                             </div>
//                             <div className="text-2xl font-bold">50+</div>
//                             <div className="text-blue-100">Expert Faculty</div>
//                         </div>
//                         <div className="text-center">
//                             <div className="flex items-center justify-center mb-2">
//                                 <Bell className="h-8 w-8 text-orange-300" />
//                             </div>
//                             <div className="text-2xl font-bold">15</div>
//                             <div className="text-blue-100">Years Experience</div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 {/* Search and Filters */}
//                 <div className="mb-8">
//                     <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
//                         {/* Search */}
//                         <div className="relative w-full sm:w-96">
//                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                             <input
//                                 type="text"
//                                 placeholder="Search news and updates..."
//                                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />
//                         </div>

//                         {/* Category Filters */}
//                         <div className="flex flex-wrap gap-2">
//                             {categories.map((category) => (
//                                 <button
//                                     key={category}
//                                     onClick={() => setSelectedCategory(category)}
//                                     className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
//                                             ? 'bg-blue-600 text-white shadow-md'
//                                             : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
//                                         }`}
//                                 >
//                                     {category}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Featured News */}
//                 {featuredNews && selectedCategory === "All" && !searchTerm && (
//                     <section className="mb-12">
//                         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//                             <div className="md:flex">
//                                 <div className="md:w-1/2">
//                                     <img
//                                         src={featuredNews.image}
//                                         alt={featuredNews.title}
//                                         className="w-full h-64 md:h-full object-cover"
//                                     />
//                                 </div>
//                                 <div className="md:w-1/2 p-8 flex flex-col justify-center">
//                                     <div className="flex items-center gap-4 mb-4">
//                                         <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
//                                             Featured
//                                         </span>
//                                         <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
//                                             {featuredNews.category}
//                                         </span>
//                                     </div>
//                                     <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
//                                         {featuredNews.title}
//                                     </h2>
//                                     <p className="text-gray-600 mb-6 text-lg leading-relaxed">
//                                         {featuredNews.excerpt}
//                                     </p>
//                                     <div className="flex items-center justify-between">
//                                         <div className="flex items-center gap-4 text-sm text-gray-500">
//                                             <div className="flex items-center gap-1">
//                                                 <Calendar className="h-4 w-4" />
//                                                 {formatDate(featuredNews.date)}
//                                             </div>
//                                             <div className="flex items-center gap-1">
//                                                 <Clock className="h-4 w-4" />
//                                                 {featuredNews.readTime}
//                                             </div>
//                                         </div>
//                                         <button className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors">
//                                             Read More
//                                             <ChevronRight className="h-4 w-4" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                 )}

//                 {/* News Grid */}
//                 <section>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {regularNews.map((item) => (
//                             <article
//                                 key={item.id}
//                                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
//                             >
//                                 <div className="relative">
//                                     <img
//                                         src={item.image}
//                                         alt={item.title}
//                                         className="w-full h-48 object-cover"
//                                     />
//                                     <div className="absolute top-4 left-4">
//                                         <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.category === 'Results' ? 'bg-green-100 text-green-800' :
//                                                 item.category === 'Announcements' ? 'bg-blue-100 text-blue-800' :
//                                                     item.category === 'Exam Updates' ? 'bg-orange-100 text-orange-800' :
//                                                         'bg-purple-100 text-purple-800'
//                                             }`}>
//                                             {item.category}
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <div className="p-6">
//                                     <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
//                                         {item.title}
//                                     </h3>
//                                     <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
//                                         {item.excerpt}
//                                     </p>
//                                     <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                                         <div className="flex items-center gap-4 text-sm text-gray-500">
//                                             <div className="flex items-center gap-1">
//                                                 <Calendar className="h-4 w-4" />
//                                                 {formatDate(item.date)}
//                                             </div>
//                                             <div className="flex items-center gap-1">
//                                                 <Clock className="h-4 w-4" />
//                                                 {item.readTime}
//                                             </div>
//                                         </div>
//                                         <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
//                                             Read More
//                                         </button>
//                                     </div>
//                                 </div>
//                             </article>
//                         ))}
//                     </div>

//                     {/* No Results */}
//                     {filteredNews.length === 0 && (
//                         <div className="text-center py-12">
//                             <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                                 <Search className="h-8 w-8 text-gray-400" />
//                             </div>
//                             <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
//                             <p className="text-gray-600">
//                                 Try adjusting your search terms or selected category.
//                             </p>
//                         </div>
//                     )}
//                 </section>

//                 {/* Load More Button */}
//                 {regularNews.length > 0 && (
//                     <div className="text-center mt-12">
//                         <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
//                             Load More Articles
//                         </button>
//                     </div>
//                 )}
//             </div>

//             {/* Newsletter Signup */}
//             <section className="bg-gray-900 text-white py-16 mt-16">
//                 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//                     <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
//                     <p className="text-gray-300 mb-8 text-lg">
//                         Subscribe to our newsletter and never miss important updates about exams, results, and announcements.
//                     </p>
//                     <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
//                         <input
//                             type="email"
//                             placeholder="Enter your email address"
//                             className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                         />
//                         <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors">
//                             Subscribe
//                         </button>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }

// export default News;