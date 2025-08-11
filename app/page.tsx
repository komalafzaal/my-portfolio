"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Github, Linkedin, Mail,
  Phone,
  ExternalLink,
  Menu,
  X,
  Smartphone,
  Code,
  Database,
  Cloud,
  Zap,
  Palette,
  Calendar,
  Server,
  GitBranch,
  ArrowUp,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { initEmailJS, sendEmailJS } from "@/lib/emailjs-config"


export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [visibleElements, setVisibleElements] = useState(new Set())
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<{
    type: "idle" | "loading" | "success" | "error"
    message: string
  }>({ type: "idle", message: "" })
  const [errors, setErrors] = useState<{
    firstName?: string
    lastName?: string
    email?: string
    subject?: string
    message?: string
  }>({})

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleElements((prev) => new Set(prev).add(entry.target.id))
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    })

    // Observe all animated elements
    const animatedElements = document.querySelectorAll("[data-animate]")
    animatedElements.forEach((el) => observer.observe(el))

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }
 // Handle form submission
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!validateForm()) {
    setFormStatus({
      type: "error",
      message: "Please fix the errors above and try again.",
    })
    return
  }

  setFormStatus({ type: "loading", message: "Sending your message..." })

  try {
    const result = await sendEmailJS(formData)

    if (result.success) {
      setFormStatus({ type: "success", message: result.message })
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      })
      setErrors({})
    } else {
      setFormStatus({ type: "error", message: result.message })
    }
  } catch (error) {
    setFormStatus({
      type: "error",
      message: "An unexpected error occurred. Please try again.",
    })
  }

  // Clear status after 5 seconds
  setTimeout(() => {
    setFormStatus({ type: "idle", message: "" })
  }, 5000)
}

  const projects = [
    {
      title: "NKENNE: Learn African Language",
      description:
        "NKENNE is the first African language learning app with 150K+ users, offering 13 languages like Igbo, Yoruba & Swahili.",
      tech: ["Android SDK", "Firebase", "API Integration",  "Chatbot",  "Kotlin"],
      image: "/nkenne.png",
      link: "https://play.google.com/store/apps/details?id=com.triaxo.nkenne",
    },
    {
      title: "Sleepover Shield App | Secure & User-Friendly Flutter Solution",
      description: "Built a secure, user-friendly app that helps parents arrange safe, enjoyable sleepovers by sharing detailed profiles and connecting with like-minded families. Our mission is to create a trusted network where kids have fun and parents have peace of mind.",
      tech: ["Flutter","Firebase", "Socket.io", "API Integration", "In-App Subscription"],
      image: "/sleepover.png",
      link: "https://apps.apple.com/us/app/sleepover-shield/id6736615477",
    },
    {
      title: "Efficient NFC-Based Container Tracking Solution for Logistics      ",
      description:  "Built an Android (Kotlin) NFC-based container tracking app with real-time updates via Firebase Firestore and Cloud Functions, syncing data to Google Sheets. Features include container assignment/return, client selection, and IN/OUT status tracking.",
      tech: ["NFC" , "Firebase Cloud Firestore" ,"Firebase Realtime Database" , "Google Sheets"  ,"Android App Development"],
      image: "/nfcReader.png",
      link: "#",
    },
    {
      title: "Nature Rangers | Flutter App for Outdoor Learning ",
      description: "Nature Rangers – Cross-platform app enabling safe, engaging nature-based learning for kids. Features real-time chat (Socket.IO), secure sign-in (Firebase Auth), and event management for seamless parent-admin coordination.",
      tech: ["Flutter","Firebase", "Socket.io", "API Integration", "Firebase"],
      image: "/natureRangers.png",
      link: "#",
    },
  ]

  const experiences = [
    {
      title: "Senior Mobile App Developer",
      company: "Kodesinc",
      period: "November 2023 - Present",
      description:
        "Developing cross-platform mobile applications using Flutter, Android, and iOS technologies for diverse client projects.",
    },
    {
      title: "Python Developer",
      company: "Remote",
      period: "August 2023 - November 2023",
      description:
        "Backend development and automation specialist working on Python projects, web scraping, and IoT implementations.",
    },
    {
      title: "Video Editor",
      company: "YouTube Channel",
      period: "2022 - 2023",
      description:
        "Created mobile app promo videos and UI demos using Filmora and Adobe Premiere Pro, including thumbnails, captions, and post-production editing.",
    },
  ]

  const technicalSkills = [
    {
      category: "Programming Languages",
      icon: <Code className="h-6 w-6" />,
      skills: ["Kotlin", "Java", "Dart"],
      color: "bg-blue-900/30 border-blue-500/30 text-blue-300",
    },
    {
      category: "Mobile Development",
      icon: <Smartphone className="h-6 w-6" />,
      skills: ["Flutter", "Android Native", "Cross-Platform Development"],
      color: "bg-green-900/30 border-green-500/30 text-green-300",
    },
    {
      category: "Backend & Databases",
      icon: <Database className="h-6 w-6" />,
      skills: ["Node.js", "Firebase", "MongoDB", "MySQL", "PostgreSQL", "SQLite"],
      color: "bg-purple-900/30 border-purple-500/30 text-purple-300",
    },
    {
      category: "Cloud & DevOps",
      icon: <Cloud className="h-6 w-6" />,
      skills: ["AWS", "Microsoft Azure", "Google Cloud Platform"],
      color: "bg-orange-900/30 border-orange-500/30 text-orange-300",
    },
    {
      category: "APIs & Integrations",
      icon: <Server className="h-6 w-6" />,
      skills: ["REST APIs", "Google Maps API", "Firebase", "Twilio", "OpenAI APIs"],
      color: "bg-red-900/30 border-red-500/30 text-red-300",
    },
    {
      category: "Tools & Management",
      icon: <GitBranch className="h-6 w-6" />,
      skills: ["Git", "GitHub", "BitBucket", "Jira", "ClickUp", "Trello"],
      color: "bg-indigo-900/30 border-indigo-500/30 text-indigo-300",
    },
  ]

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-gray-800 z-50 shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold text-blue-400 hover:scale-105 transition-transform duration-200 cursor-pointer">
              Komal Afzaal
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "projects", "experience", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="hover:text-blue-400 transition-all duration-200 font-medium relative group text-gray-300"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden hover:scale-110 transition-transform duration-200 text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isMenuOpen ? "max-h-96 py-4 border-t border-gray-800" : "max-h-0"
            }`}
          >
            <div className="flex flex-col space-y-4">
              {["home", "about", "skills", "projects", "experience", "contact"].map((section, index) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-left hover:text-blue-400 transition-all duration-200 font-medium transform hover:translate-x-2 text-gray-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-300 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-blue-950 to-black"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 animate-fade-in-up" data-animate="hero-image" style={{ animationDelay: "0.2s" }}>
        <div className="w-48 h-48 mx-auto mb-8 border-4 border-blue-500 shadow-lg hover:scale-105 transition-transform duration-300 rounded-full overflow-hidden">
          <Image
            src="/komal_profile_image.png"
            alt="Profile"
            width={192}
            height={192}
            className="object-cover"
          />
        </div>
        </div>
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 font-poppins animate-fade-in-up"
            data-animate="hero-title"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="text-blue-400 hover:text-blue-300 transition-colors duration-300">Komal</span>{" "}
            <span className="text-white">Afzaal</span>
          </h1>
          <h2
            className="text-xl md:text-2xl text-gray-300 mb-8 font-medium animate-fade-in-up"
            data-animate="hero-subtitle"
            style={{ animationDelay: "0.6s" }}
          >
            Mobile App Developer (Android & iOS)
          </h2>
          <p
            className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            data-animate="hero-description"
            style={{ animationDelay: "0.8s" }}
          >
            Expert Flutter & Kotlin developer specializing in cross-platform mobile solutions with proven track record
            of timely, high-quality deliveries.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            data-animate="hero-buttons"
            style={{ animationDelay: "1s" }}
          >
            <Button
              onClick={() => scrollToSection("projects")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              View My Work
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-medium hover:scale-105 transition-all duration-300"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`text-3xl md:text-4xl font-bold text-center mb-16 text-blue-400 font-poppins transition-all duration-700 ${
              visibleElements.has("about-title") ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-10"
            }`}
            data-animate="about-title"
            id="about-title"
          >
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-700 delay-200 ${
                visibleElements.has("about-content") ? "animate-fade-in-left opacity-100" : "opacity-0 -translate-x-10"
              }`}
              data-animate="about-content"
              id="about-content"
            >
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                I'm a passionate mobile app developer specializing in Flutter and Android native development. With
                expertise in creating scalable, cost-effective apps for both Android and iOS platforms using modern
                technologies.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                My focus is on delivering high-performance, user-friendly applications with clean UI/UX design, seamless
                backend connectivity, and optimized performance. I also have experience in Python development and video
                editing for mobile app promotions.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Smartphone, text: "Mobile Development", color: "blue" },
                  { icon: Code, text: "Clean Architecture", color: "green" },
                  { icon: Palette, text: "UI/UX Design", color: "purple" },
                  { icon: Zap, text: "Performance Optimization", color: "orange" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 bg-${item.color}-900/30 border border-${item.color}-500/30 rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <item.icon className={`h-5 w-5 text-${item.color}-400`} />
                    <span className="font-medium text-gray-200">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-700 delay-400 ${
                visibleElements.has("about-card") ? "animate-fade-in-right opacity-100" : "opacity-0 translate-x-10"
              }`}
              data-animate="about-card"
              id="about-card"
            >
              <h3 className="text-2xl font-bold text-white mb-6 font-poppins">What I Offer</h3>
              <div className="space-y-4">
                {[
                  "Cross-platform Flutter development for Android & iOS",
                  "Native Android development with Kotlin & Java",
                  "REST API & Firebase integration",
                  "App deployment & post-launch support",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 hover:translate-x-2 transition-transform duration-300"
                    style={{ animationDelay: `${index * 100 + 600}ms` }}
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section id="skills" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`text-3xl md:text-4xl font-bold text-center mb-16 text-blue-400 font-poppins transition-all duration-700 ${
              visibleElements.has("skills-title") ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-10"
            }`}
            data-animate="skills-title"
            id="skills-title"
          >
            Technical Expertise
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalSkills.map((skillGroup, index) => (
              <Card
                key={index}
                className={`${skillGroup.color} border-2 hover:shadow-lg hover:scale-105 transition-all duration-500 cursor-pointer bg-gray-800/50 backdrop-blur-sm ${
                  visibleElements.has(`skill-${index}`) ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-10"
                }`}
                data-animate={`skill-${index}`}
                id={`skill-${index}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-700 rounded-lg shadow-sm hover:rotate-12 transition-transform duration-300">
                      {skillGroup.icon}
                    </div>
                    <CardTitle className="text-lg font-semibold text-white">{skillGroup.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="bg-gray-700/80 text-gray-200 font-medium hover:scale-110 transition-transform duration-200 cursor-pointer"
                        style={{ animationDelay: `${skillIndex * 50}ms` }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Showcase Section
      <section id="showcase" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`text-3xl md:text-4xl font-bold text-center mb-16 text-blue-400 font-poppins transition-all duration-700 ${
              visibleElements.has("showcase-title") ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-10"
            }`}
            data-animate="showcase-title"
            id="showcase-title"
          >
            App Demos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 hover:scale-105 ${
                  visibleElements.has(`mockup-${index}`) ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-10"
                }`}
                data-animate={`mockup-${index}`}
                id={`mockup-${index}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative w-64 h-[500px] bg-gray-800 rounded-[3rem] p-2 shadow-2xl border-4 border-gray-600 hover:shadow-3xl transition-all duration-300">
                  <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-10"></div>
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <video className="w-full h-full object-cover rounded-[2rem]" autoPlay muted loop playsInline>
                        <source src={`/demo-video-${index}.mp4`} type="video/mp4" />
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                          <Smartphone className="h-16 w-16 mb-4 animate-bounce" />
                          <p className="text-sm">Demo Video</p>
                          <p className="text-xs">
                            {index === 1 ? "FitTracker Pro" : index === 2 ? "EcoShop" : "MindfulMoments"}
                          </p>
                        </div>
                      </video>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200">
                    {index === 1 ? "FitTracker Pro" : index === 2 ? "EcoShop" : "MindfulMoments"}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {index === 1 ? "Fitness & Health" : index === 2 ? "E-commerce" : "Wellness & Meditation"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`text-center mt-16 transition-all duration-700 delay-600 ${
              visibleElements.has("showcase-cta") ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-10"
            }`}
            data-animate="showcase-cta"
            id="showcase-cta"
          >
            <p className="text-lg text-gray-300 mb-6">
              See these apps in action and explore the user experiences I've crafted
            </p>
            <Button
              onClick={() => scrollToSection("projects")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              View Project Details
            </Button>
          </div>
        </div>
      </section> */}

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`text-3xl md:text-4xl font-bold text-center mb-16 text-blue-400 font-poppins transition-all duration-700 ${
              visibleElements.has("projects-title") ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-10"
            }`}
            data-animate="projects-title"
            id="projects-title"
          >
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className={`bg-gray-800 border border-gray-600 hover:border-blue-500 hover:shadow-xl hover:scale-105 transition-all duration-500 cursor-pointer ${
                  visibleElements.has(`project-${index}`)
                    ? "animate-fade-in-up opacity-100"
                    : "opacity-0 translate-y-10"
                }`}
                data-animate={`project-${index}`}
                id={`project-${index}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader>
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="rounded-lg mb-4 w-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <CardTitle className="text-blue-400 font-poppins hover:text-blue-300 transition-colors duration-200">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 leading-relaxed">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="bg-blue-900 text-blue-100 font-medium hover:scale-110 transition-transform duration-200"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Link
                    href={project.link}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium group"
                  >
                    View Project{" "}
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`text-3xl md:text-4xl font-bold text-center mb-16 text-blue-400 font-poppins transition-all duration-700 ${
              visibleElements.has("experience-title") ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-10"
            }`}
            data-animate="experience-title"
            id="experience-title"
          >
            Experience
          </h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-blue-500"></div>
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex items-center mb-12">
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-8" : "md:pl-8 md:ml-auto"
                  } transition-all duration-700 ${
                    visibleElements.has(`experience-${index}`)
                      ? "animate-fade-in-up opacity-100"
                      : "opacity-0 translate-y-10"
                  }`}
                  data-animate={`experience-${index}`}
                  id={`experience-${index}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <Card className="bg-gray-800 border border-gray-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-blue-400 font-poppins hover:text-blue-300 transition-colors duration-200">
                        {exp.title}
                      </CardTitle>
                      <CardDescription className="text-gray-300 font-medium">
                        {exp.company} • {exp.period}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Contact Section */}
      <section id="contact" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`text-3xl md:text-4xl font-bold text-center mb-16 text-blue-400 font-poppins transition-all duration-700 ${
              visibleElements.has("contact-title") ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-10"
            }`}
            data-animate="contact-title"
            id="contact-title"
          >
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div
              className={`transition-all duration-700 delay-200 ${
                visibleElements.has("contact-info") ? "animate-fade-in-left opacity-100" : "opacity-0 -translate-x-10"
              }`}
              data-animate="contact-info"
              id="contact-info"
            >
              <h3 className="text-2xl font-bold mb-6 text-white font-poppins">Let's Work Together</h3>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                I'm always interested in new opportunities and exciting projects. Whether you have a question or just
                want to say hi, feel free to reach out!
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Mail, text: "komalafzaal24@gmail.com", href: "mailto:komalafzaal24@gmail.com" },
                  { icon: Phone, text: "+92 320 4304291", href: "tel:+923204304291" },
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 border border-gray-700"
                    style={{ animationDelay: `${index * 100 + 400}ms` }}
                  >
                    <item.icon className="h-5 w-5 text-blue-400" />
                    <span className="text-gray-300 font-medium">{item.text}</span>
                  </Link>
                ))}
              </div>

              <div className="flex space-x-4">
                {[
                  { icon: Github, href: "https://github.com/komalafzaal" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/komalafzaal/" },
                  { icon: Mail, href: "mailto:komalafzaal24@gmail.com" },
                ].map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 hover:text-white hover:scale-110 transition-all duration-300 shadow-lg border border-gray-700"
                    style={{ animationDelay: `${index * 100 + 600}ms` }}
                  >
                    <social.icon className="h-6 w-6" />
                  </Link>
                ))}
              </div>
            </div>

            <Card
              className={`bg-gray-800 border border-gray-600 shadow-lg hover:shadow-xl transition-all duration-700 delay-400 ${
                visibleElements.has("contact-form") ? "animate-fade-in-right opacity-100" : "opacity-0 translate-x-10"
              }`}
              data-animate="contact-form"
              id="contact-form"
            >
              <CardHeader>
                <CardTitle className="text-blue-400 font-poppins">Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 hover:border-blue-400 transition-colors duration-200 ${
                          errors.firstName ? "border-red-500 focus:border-red-500" : ""
                        }`}
                      />
                      {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Input
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 hover:border-blue-400 transition-colors duration-200 ${
                          errors.lastName ? "border-red-500 focus:border-red-500" : ""
                        }`}
                      />
                      {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 hover:border-blue-400 transition-colors duration-200 ${
                        errors.email ? "border-red-500 focus:border-red-500" : ""
                      }`}
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Input
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 hover:border-blue-400 transition-colors duration-200 ${
                        errors.subject ? "border-red-500 focus:border-red-500" : ""
                      }`}
                    />
                    {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 hover:border-blue-400 transition-colors duration-200 resize-none ${
                        errors.message ? "border-red-500 focus:border-red-500" : ""
                      }`}
                    />
                    {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                  </div>

                  {/* Status Message */}
                  {formStatus.type !== "idle" && (
                    <div
                      className={`flex items-center space-x-2 p-3 rounded-lg animate-fade-in ${
                        formStatus.type === "success"
                          ? "bg-green-900/30 border border-green-500/30 text-green-300"
                          : formStatus.type === "error"
                            ? "bg-red-900/30 border border-red-500/30 text-red-300"
                            : "bg-blue-900/30 border border-blue-500/30 text-blue-300"
                      }`}
                    >
                      {formStatus.type === "success" && <CheckCircle className="h-5 w-5" />}
                      {formStatus.type === "error" && <AlertCircle className="h-5 w-5" />}
                      {formStatus.type === "loading" && <Send className="h-5 w-5 animate-spin" />}
                      <span className="text-sm">{formStatus.message}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={formStatus.type === "loading"}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {formStatus.type === "loading" ? (
                      <>
                        <Send className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-8 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 hover:text-gray-300 transition-colors duration-200">
            © {new Date().getFullYear()} Komal Afzaal. All rights reserved.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.6s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
