"use client"
import { useState, useEffect } from "react"
import { Plus, X, ChevronUp, ChevronDown, GripVertical, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Section {
  id: string
  name: string
  content: string
  removable: boolean
}

export default function ArticleBuilder() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [personName, setPersonName] = useState("")
  const [sections, setSections] = useState<Section[]>([
    { id: "intro", name: "Introduction", content: "", removable: false },
    { id: "references", name: "References", content: "", removable: false },
  ])

  const availableSections = ["Background", "Causes","Impact", "Historical Context", "Cultural Significance", "Aftermath", "Further Reading", "Geographical Significance", "Physical Features", "Demographics", "Formulae", "Research & Development", "Idea", "Socio-Economic Impact", "External Links"]

  const [showPreview, setShowPreview] = useState(false)
  const [savedMessage, setSavedMessage] = useState("")

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    loadDraft()
  }, [])

  const addSection = (sectionName: string) => {
    const newSection: Section = {
      id: `${sectionName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      name: sectionName,
      content: "",
      removable: true,
    }

    setSections((prev) => {
      const newSections = [...prev]
      // Insert before the References section (last item)
      newSections.splice(-1, 0, newSection)
      return newSections
    })
  }

  const removeSection = (id: string) => {
    setSections((prev) => prev.filter((section) => section.id !== id))
  }

  const moveSection = (index: number, direction: "up" | "down") => {
    setSections((prev) => {
      const newSections = [...prev]
      const targetIndex = direction === "up" ? index - 1 : index + 1

      // Don't move if it would go past Introduction (0) or References (last)
      if (targetIndex <= 0 || targetIndex >= newSections.length - 1)
        return prev

        // Swap sections
      ;[newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]]
      return newSections
    })
  }

  const updateSectionContent = (id: string, content: string) => {
    setSections((prev) => prev.map((section) => (section.id === id ? { ...section, content } : section)))
  }

  const saveDraft = () => {
    const draftData = {
      personName,
      sections,
      timestamp: new Date().toISOString(),
    }

    localStorage.setItem("WikiStudio-draft", JSON.stringify(draftData))
    setSavedMessage("Draft saved successfully!")
    setTimeout(() => setSavedMessage(""), 3000)
  }

  const loadDraft = () => {
    const savedDraft = localStorage.getItem("WikiStudio-draft")
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft)
        setPersonName(draftData.personName || "")
        setSections(
          draftData.sections || [
            { id: "intro", name: "Introduction", content: "", removable: false },
            { id: "references", name: "References", content: "", removable: false },
          ],
        )
      } catch (error) {
        console.error("Error loading draft:", error)
      }
    }
  }

  const formatWikipediaContent = () => {
    if (!personName.trim()) return "Please enter a person's name to preview the article."

    let content = `# ${personName}\n\n`

    sections.forEach((section) => {
      if (section.content.trim()) {
        content += `## ${section.name}\n\n${section.content.trim()}\n\n`
      }
    })

    return content
  }

  const getAvailableOptions = () => {
    const existingSectionNames = sections.map((s) => s.name)
    return availableSections.filter((name) => !existingSectionNames.includes(name))
  }

  return (
            <div className="relative min-h-screen bg-black overflow-hidden">
              {/* Back Button */}
        <div className="absolute top-4 left-4 z-50">
          <Link
            href="/writings"
            className="flex items-center gap-2 px-3 py-2 bg-white/20 text-white rounded-md hover:bg-white/30 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>
        </div>


      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Base space gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-black" />

        {/* White Grid Background with Warp Effect */}
        
        <div className="absolute inset-0 opacity-10">
          <svg
            width="100%"
            height="100%"
            className="absolute inset-0"
            style={{
              transform: `perspective(1000px) rotateX(60deg) rotateY(0deg)`,
              transformOrigin: "center center",
            }}
          >
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
              </pattern>
              <filter id="warp">
                <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" className="warp-displacement" />
              </filter>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#grid)"
              filter="url(#warp)"
              className="grid-warp"
              style={{
                transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
              }}
            />
          </svg>
        </div>

        {/* Additional Grid Layers for Depth */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={`grid-line-h-${i}`}
              className="absolute w-full h-px bg-white"
              style={{
                top: `${i * 5}%`,
                transform: `perspective(800px) rotateX(45deg) translateZ(${i * 10}px)`,
              }}
            />
          ))}
          {[...Array(20)].map((_, i) => (
            <div
              key={`grid-line-v-${i}`}
              className="absolute h-full w-px bg-white"
              style={{
                left: `${i * 5}%`,
                transform: `perspective(800px) rotateX(45deg) translateZ(${i * 10}px)`,
              }}
            />
          ))}
        </div>

        {/* Nebula clouds */}
        <div className="absolute inset-0">
          <div
            className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-r from-purple-600/10 via-blue-600/5 to-transparent rounded-full blur-2xl sm:blur-3xl animate-pulse"
            style={{ animationDuration: "8s" }}
          />
          <div
            className="absolute bottom-16 sm:bottom-32 right-10 sm:right-20 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-l from-indigo-600/10 via-purple-600/5 to-transparent rounded-full blur-2xl sm:blur-3xl animate-pulse"
            style={{ animationDuration: "12s", animationDelay: "4s" }}
          />
        </div>

        {/* Moving blue sprint lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={`sprint-line-${i}`}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-80"
              style={{
                top: `${Math.random() * 100}%`,
                width: "200px",
                animation: `sprintLine 2s ease-out infinite`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Central radial gradient for depth */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/70" />
      </div>

      {/* Main Content */}
      
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1
              className="text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-400 leading-none tracking-tighter mb-4 py-4"
              style={{
                textShadow: "0 0 20px rgba(255,255,255,0.1)",
                transform: "perspective(800px) rotateX(5deg)",
                filter: "drop-shadow(0 5px 15px rgba(0,0,0,0.5))",
              }}
            >
              Write About An Organization
            </h1>
            <p
              className="text-sm sm:text-lg text-gray-300 leading-relaxed"
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                transform: "perspective(600px) rotateX(2deg)",
              }}
            >
              Write an account about a Historical, Geographical, Educational and Other Types of Article with our structured editor
            </p>
          </div>

          {/* Wikipedia-style Article Builder */}

          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Wikipedia-style Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-bold text-sm">W</span>
                </div>
                <span className="text-gray-700 font-medium">Wikipedia Article Builder : <b>Account</b></span>
              </div>
            </div>

            

            {/* Article Content */}
            <div className="p-6 sm:p-8">
              {/* Person Name Field */}
              <div className="mb-8">
                <label htmlFor="personName" className="block text-sm font-medium text-gray-700 mb-2">
                  Account of Idea
                </label>
                <input
                  type="text"
                  id="personName"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  className="w-full px-4 py-3 text-lg text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter the person's full name"
                />
              </div>

              {/* Add Section Dropdown */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Article Sections</h3>
                  <div className="relative">
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          addSection(e.target.value)
                          e.target.value = ""
                        }
                      }}
                      className="appearance-none bg-blue-600 text-white px-4 py-2 pr-8 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Add Section
                      </option>
                      {getAvailableOptions().map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <Plus className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
                  </div>
                </div>

                {/* Sections List */}
                <div className="space-y-4">
                  {sections.map((section, index) => (
                    <div
                      key={section.id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
                    >
                      {/* Section Header */}
                      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <GripVertical className="w-4 h-4 text-gray-400" />
                          <h4 className="font-semibold text-gray-800">{section.name}</h4>
                          {!section.removable && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Required</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Move buttons - only for removable sections that aren't at edges */}
                          {section.removable && index > 1 && (
                            <button
                              onClick={() => moveSection(index, "up")}
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                              title="Move up"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                          )}
                          {section.removable && index < sections.length - 2 && (
                            <button
                              onClick={() => moveSection(index, "down")}
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                              title="Move down"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          )}
                          {/* Remove button - only for removable sections */}
                          {section.removable && (
                            <button
                              onClick={() => removeSection(section.id)}
                              className="p-1 text-red-400 hover:text-red-600 transition-colors"
                              title="Remove section"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Section Content */}
                      <div className="p-4">
                        <textarea
                          value={section.content}
                          onChange={(e) => updateSectionContent(section.id, e.target.value)}
                          placeholder={`Write the ${section.name.toLowerCase()} content here...`}
                          className="w-full h-32 px-3 py-2 border text-black border-gray-200 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                  Generate Article
                </button>
                <button
                  onClick={saveDraft}
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
                >
                  Save Draft
                </button>
                <button
                  onClick={() => setShowPreview(true)}
                  className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
                >
                  Preview
                </button>
              </div>

              {/* Save Message */}
              {savedMessage && (
                <div className="mt-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-md text-center">
                  {savedMessage}
                </div>
              )}

              {/* Preview Modal */}
              {showPreview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  {/* Backdrop */}
                  <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setShowPreview(false)}
                  />

                  {/* Modal */}
                  <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-bold text-sm">W</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Wikipedia Article Preview</h3>
                      </div>
                      <button
                        onClick={() => setShowPreview(false)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Modal Content - Scrollable */}
                    <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                      <div className="p-8">
                        {/* Wikipedia Article Styling */}
                        <div className="wikipedia-article">
                          {personName.trim() ? (
                            <>
                              {/* Article Title */}
                              <h1 className="text-3xl font-serif border-b-2 border-gray-300 pb-2 mb-6">{personName}</h1>

                              {/* Article Content */}
                              {sections.map(
                                (section) =>
                                  section.content.trim() && (
                                    <div key={section.id} className="mb-8">
                                      <h2 className="text-xl font-serif border-b border-gray-200 pb-1 mb-4">
                                        {section.name}
                                      </h2>
                                      <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                                        {section.content}
                                      </div>
                                    </div>
                                  ),
                              )}

                              {/* Wikipedia Footer */}
                              <div className="mt-12 pt-6 border-t border-gray-200">
                                <div className="text-sm black space-y-2">
                                  <p>This article is a draft created with WikiStudio.</p>
                                  <p>Last modified: {new Date().toLocaleDateString()}</p>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="text-center py-12">
                              <p className="black text-lg">
                                Please enter an organization's name and add content to preview the article.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setShowPreview(false)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          Close
                        </button>
                        <button
                          onClick={() => {
                            saveDraft()
                            setShowPreview(false)
                          }}
                          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Save & Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}
