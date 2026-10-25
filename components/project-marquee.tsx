"use client"

import Image from "next/image"
import { SELECT_PROJECT_EVENT } from "@/components/project-slider"
import type { Project } from "@/lib/projects"

const itemClass =
  "flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 hover:border-blue-500/60 hover:bg-white/[0.08] transition-colors duration-200"

function Item({ project, index, copy }: { project: Project; index: number; copy: boolean }) {
  // The second copy only exists to make the loop seamless; keep it out of the tab order and screen readers.
  const a11y = copy ? { tabIndex: -1, "aria-hidden": true } : {}

  return (
    <button
      type="button"
      {...a11y}
      className={itemClass}
      onClick={() => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
        window.dispatchEvent(new CustomEvent(SELECT_PROJECT_EVENT, { detail: index }))
      }}
    >
      <Image src={project.icon} alt="" width={40} height={40} className="h-10 w-10 rounded-xl" />
      <span className="text-left">
        <span className="block text-sm font-semibold text-white whitespace-nowrap">{project.shortName}</span>
        <span className="block text-xs text-gray-400 whitespace-nowrap">{project.tagline}</span>
      </span>
    </button>
  )
}

export function ProjectMarquee({ projects }: { projects: Project[] }) {
  return (
    <div>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Apps I&apos;ve built &amp; shipped</p>
      <div className="project-marquee-mask overflow-hidden">
        <div className="project-marquee flex w-max">
          {[false, true].map((copy) =>
            projects.map((project, index) => (
              <div key={`${copy}-${project.title}`} className="pr-4">
                <Item project={project} index={index} copy={copy} />
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  )
}
