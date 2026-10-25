import { ExternalLink } from "lucide-react"
import type { Project } from "@/lib/projects"

const linkClass =
  "inline-flex items-center gap-2 rounded-full border border-blue-500/60 px-4 py-2 text-sm font-medium text-blue-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors duration-200"

export function ProjectLinks({ project }: { project: Project }) {
  if (!project.link && !project.androidLink) return null

  return (
    <div className="flex flex-wrap gap-3">
      {project.link && (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {project.link.includes("apps.apple.com") ? "App Store" : "View Project"}
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
      {project.androidLink && (
        <a href={project.androidLink} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Google Play
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </div>
  )
}

export function ProjectHighlights({ project }: { project: Project }) {
  if (!project.highlights?.length) return null

  return (
    <div className="flex flex-wrap gap-2">
      {project.highlights.map((highlight) => (
        <span
          key={highlight}
          className="inline-flex items-center rounded-full bg-green-900/40 border border-green-500/40 px-3 py-1 text-xs font-semibold text-green-300"
        >
          {highlight}
        </span>
      ))}
    </div>
  )
}
