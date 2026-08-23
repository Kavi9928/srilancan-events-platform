"use client"

import Image from "next/image"
import { Heart, Share2, Calendar, User } from "lucide-react"
import { useState } from "react"

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Ultimate Guide to Finding the Best Events in Sri Lanka",
    excerpt: "Discover the most exciting events happening across the island. From cultural festivals to music concerts, live performances to sports tournaments, explore what's trending and book your tickets early.",
    category: "Events Guide",
    date: "Mar 15, 2024",
    author: "Sarah Chen",
    image: "https://picsum.photos/seed/blog-featured/800/600",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "5 Must-Attend Music Festivals This Year",
    excerpt: "Explore the most anticipated music festivals happening this year. From indie rock to classical performances, find your next unforgettable musical experience and book early for the best rates.",
    category: "Music",
    date: "Mar 10, 2024",
    author: "James Wilson",
    image: "https://picsum.photos/seed/blog-music/800/600",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Cinema Trends: What's Hot in 2024",
    excerpt: "Dive into the latest trends shaping the film industry. From groundbreaking cinematography to innovative storytelling, discover what filmmakers and audiences are excited about.",
    category: "Movies",
    date: "Mar 8, 2024",
    author: "Emma Davis",
    image: "https://picsum.photos/seed/blog-cinema/800/600",
    readTime: "7 min read",
  },
  {
    id: 4,
    title: "Cultural Events: Celebrating Sri Lankan Heritage",
    excerpt: "Experience the richness of Sri Lankan culture through traditional festivals and celebrations. Learn about the stories, significance, and best places to witness these magnificent events.",
    category: "Culture",
    date: "Mar 5, 2024",
    author: "Priya Sharma",
    image: "https://picsum.photos/seed/blog-culture/800/600",
    readTime: "9 min read",
  },
  {
    id: 5,
    title: "Behind the Scenes: Event Planning Tips",
    excerpt: "Get insider tips from professional event planners. Learn how to organize unforgettable events, manage budgets, and create memorable experiences for your guests.",
    category: "Tips",
    date: "Mar 1, 2024",
    author: "Michael Brown",
    image: "https://picsum.photos/seed/blog-planning/800/600",
    readTime: "5 min read",
  },
]

export function BlogSection() {
  const [liked, setLiked] = useState(false)
  const [featuredId, setFeaturedId] = useState(1)

  const featured = BLOG_POSTS.find((post) => post.id === featuredId)
  const others = BLOG_POSTS.filter((post) => post.id !== featuredId)

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      {/* Section Header */}
      <div className="mb-16">
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
          Latest from Our
          <span className="block bg-gradient-to-r from-red-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
            Blog & Insights
          </span>
        </h2>
        <p className="text-lg text-white/70 max-w-2xl">
          Stay updated with the latest trends, tips, and stories from the event world
        </p>
      </div>

      {/* Main Blog Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Blog Post - Large Card */}
        {featured && (
          <div className="lg:col-span-2 group transition-all duration-500">
            <div className="relative rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-red-500/90 backdrop-blur-md text-white text-sm font-semibold">
                  {featured.category}
                </div>

                {/* Like & Share */}
                <div className="absolute top-6 right-6 flex items-center gap-2">
                  <button
                    onClick={() => setLiked(!liked)}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-red-500/30 text-white transition-all duration-300 hover:scale-110 border border-white/20 hover:border-red-500/50"
                  >
                    <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                  </button>
                  <button className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 border border-white/20 hover:border-white/50">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-4">
                <h3 className="text-3xl font-bold text-white leading-tight group-hover:text-red-400 transition-colors">
                  {featured.title}
                </h3>

                <p className="text-white/70 leading-relaxed text-lg">
                  {featured.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Calendar className="w-4 h-4 text-red-400" />
                    {featured.date}
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <User className="w-4 h-4 text-orange-400" />
                    {featured.author}
                  </div>
                  <div className="text-sm text-red-400 font-medium">
                    {featured.readTime}
                  </div>
                </div>

                {/* Read More Button */}
                <button className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold hover:shadow-lg hover:shadow-red-500/50 hover:scale-105 transition-all duration-300">
                  Read Full Article
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar - Smaller Blog Cards */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white px-2">More Stories</h3>

          {others.map((post, index) => (
            <div
              key={post.id}
              className="group cursor-pointer transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setFeaturedId(post.id)}
            >
              <div className="relative rounded-2xl overflow-hidden bg-black/40 backdrop-blur-lg border border-white/10 hover:border-red-500/50 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-red-500/20">
                {/* Glow on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                <div className="flex gap-4 p-4">
                  {/* Thumbnail */}
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-semibold text-red-400 mb-2 uppercase tracking-wider">
                        {post.category}
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="mt-16 text-center">
        <button className="group relative px-8 py-4 rounded-full font-semibold text-lg text-white overflow-hidden transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/40 via-orange-500/40 to-rose-600/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
          <div className="absolute inset-0 border border-white/20 rounded-full group-hover:border-red-500/50 transition-colors" />
          <span className="relative">View All Articles</span>
        </button>
      </div>
    </section>
  )
}
