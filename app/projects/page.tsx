import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProjectHighlights, ProjectLinks } from "@/components/project-links"
import { projects } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Projects – Komal Afzaal",
  description: "Android, iOS and Flutter apps built and shipped to production by Komal Afzaal.",
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors duration-200">
            Komal Afzaal
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors duration-200 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to portfolio
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <header className="max-w-3xl mb-14">
          <p className="text-sm font-semibold tracking-[0.2em] text-blue-400 uppercase">Portfolio</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold font-poppins">All Projects</h1>
          <p className="mt-5 text-lg text-gray-400 leading-relaxed">
            {projects.length} apps across Android, iOS and cross-platform, from AI-powered local discovery to wearable
            health tracking and logistics tools.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <article
              key={project.title}
              className="flex flex-col rounded-2xl border border-gray-800 bg-gray-900/60 overflow-hidden hover:border-blue-500/70 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/50 transition-all duration-300"
            >
              <Image src={project.image} alt={project.title} width={1080} height={1080} className="w-full h-auto" />
              <div className="flex flex-1 flex-col gap-4 p-6">
                <ProjectHighlights project={project} />
                <h2 className="text-xl font-bold font-poppins text-white leading-snug">{project.title}</h2>
                <p className="text-sm text-gray-300 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-blue-900/70 text-blue-100 font-medium">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="mt-auto pt-2">
                  <ProjectLinks project={project} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-poppins">Have an app idea?</h2>
          <p className="mt-3 text-gray-400">Let&apos;s turn it into a fast, reliable app your users love.</p>
          <Link
            href="/#contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 transition-colors duration-200 group"
          >
            Get in touch
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </main>
    </div>
  )
}
