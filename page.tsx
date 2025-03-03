"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ResumeBuilder from "@/components/resume-builder"
import ResumePreview from "@/components/resume-preview"
import { Button } from "@/components/ui/button"
import { generatePDF } from "@/lib/pdf-generator"

export default function Dashboard() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
      title: "",
      summary: "",
    },
    education: [{ institution: "", degree: "", field: "", startDate: "", endDate: "", description: "" }],
    experience: [{ company: "", position: "", startDate: "", endDate: "", description: "" }],
    skills: [""],
    projects: [{ title: "", description: "", link: "" }],
    certifications: [{ name: "", issuer: "", date: "" }],
  })

  useEffect(() => {
    setIsClient(true)
    // Check if user is logged in
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleDownload = async () => {
    await generatePDF(resumeData)
  }

  if (!isClient) return null

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <header className="bg-[#212529] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">AI Resume Builder</h1>
          <Button variant="outline" className="text-white border-white hover:bg-[#343a40]" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <ResumeBuilder resumeData={resumeData} setResumeData={setResumeData} />
          </div>
          <div className="w-full lg:w-1/2 sticky top-8">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
              <h2 className="text-xl font-bold mb-4 text-[#343a40]">Live Preview</h2>
              <ResumePreview resumeData={resumeData} />
            </div>
            <Button className="w-full bg-[#495057] hover:bg-[#343a40] text-white py-3" onClick={handleDownload}>
              Download PDF
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

