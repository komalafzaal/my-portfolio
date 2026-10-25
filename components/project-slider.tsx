"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProjectHighlights, ProjectLinks } from "@/components/project-links"
import type { Project } from "@/lib/projects"

// How long each slide stays before advancing. The progress bar's CSS animation drives
// autoplay (onAnimationEnd), so pausing the animation pauses the slider too.
const SLIDE_MS = 4500

// Other components (e.g. the hero app strip) can jump to a slide by dispatching this event with the slide index.
export const SELECT_PROJECT_EVENT = "project-slider:select"

export function ProjectSlider({ projects }: { projects: Project[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 32 })
  const [selected, setSelected] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [hidden, setHidden] = useState(false)
  const paused = hovered || focused || hidden

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    const onPick = (e: Event) => emblaApi.scrollTo((e as CustomEvent<number>).detail)
    onSelect()
    emblaApi.on("select", onSelect)
    window.addEventListener(SELECT_PROJECT_EVENT, onPick)
    return () => {
      emblaApi.off("select", onSelect)
      window.removeEventListener(SELECT_PROJECT_EVENT, onPick)
    }
  }, [emblaApi])

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden)
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false)
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") scrollPrev()
        if (e.key === "ArrowRight") scrollNext()
      }}
      className="relative rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-950 to-black overflow-hidden"
    >
      {/* Progress bar */}
      <div className="h-1 w-full bg-gray-800">
        <div
          key={selected}
          className="project-progress h-full bg-blue-500"
          style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
          onAnimationEnd={scrollNext}
        />
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {projects.map((project, index) => {
            const active = index === selected
            return (
              <div
                key={project.title}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${projects.length}`}
                aria-hidden={!active}
                className="min-w-0 shrink-0 grow-0 basis-full"
              >
                <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-center p-6 sm:p-10 lg:p-14">
                  <div
                    className={`overflow-hidden rounded-2xl border border-gray-800 shadow-2xl transition-all duration-700 ${
                      active ? "opacity-100 scale-100" : "opacity-40 scale-95"
                    }`}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={1080}
                      height={1080}
                      priority={index === 0}
                      className="w-full h-auto"
                    />
                  </div>

                  <div
                    className={`space-y-5 transition-all duration-700 ${
                      active ? "opacity-100 translate-y-0 delay-150" : "opacity-0 translate-y-6"
                    }`}
                  >
                    <p className="text-sm font-semibold tracking-[0.2em] text-blue-400">
                      {pad(index + 1)} <span className="text-gray-600">/ {pad(projects.length)}</span>
                    </p>
                    <ProjectHighlights project={project} />
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-poppins leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed lg:text-lg">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-blue-900/70 text-blue-100 font-medium">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="pt-2">
                      <ProjectLinks project={project} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 px-6 sm:px-10 lg:px-14 pb-6 sm:pb-10">
        <div className="flex items-center gap-2">
          {projects.map((project, index) => (
            <button
              key={project.title}
              onClick={() => scrollTo(index)}
              aria-label={`Go to ${project.title}`}
              aria-current={index === selected}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === selected ? "w-8 bg-blue-500" : "w-2.5 bg-gray-600 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={scrollPrev}
            aria-label="Previous project"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 text-gray-300 hover:border-blue-500 hover:text-white hover:bg-blue-600 transition-colors duration-200"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next project"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 text-gray-300 hover:border-blue-500 hover:text-white hover:bg-blue-600 transition-colors duration-200"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
