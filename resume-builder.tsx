"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Trash2 } from "lucide-react"

export default function ResumeBuilder({ resumeData, setResumeData }) {
  const [activeTab, setActiveTab] = useState("personal")

  const updatePersonalInfo = (field, value) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    })
  }

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        { institution: "", degree: "", field: "", startDate: "", endDate: "", description: "" },
      ],
    })
  }

  const updateEducation = (index, field, value) => {
    const updatedEducation = [...resumeData.education]
    updatedEducation[index] = { ...updatedEducation[index], [field]: value }
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    })
  }

  const removeEducation = (index) => {
    if (resumeData.education.length > 1) {
      const updatedEducation = resumeData.education.filter((_, i) => i !== index)
      setResumeData({
        ...resumeData,
        education: updatedEducation,
      })
    }
  }

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        { company: "", position: "", startDate: "", endDate: "", description: "" },
      ],
    })
  }

  const updateExperience = (index, field, value) => {
    const updatedExperience = [...resumeData.experience]
    updatedExperience[index] = { ...updatedExperience[index], [field]: value }
    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    })
  }

  const removeExperience = (index) => {
    if (resumeData.experience.length > 1) {
      const updatedExperience = resumeData.experience.filter((_, i) => i !== index)
      setResumeData({
        ...resumeData,
        experience: updatedExperience,
      })
    }
  }

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, ""],
    })
  }

  const updateSkill = (index, value) => {
    const updatedSkills = [...resumeData.skills]
    updatedSkills[index] = value
    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    })
  }

  const removeSkill = (index) => {
    if (resumeData.skills.length > 1) {
      const updatedSkills = resumeData.skills.filter((_, i) => i !== index)
      setResumeData({
        ...resumeData,
        skills: updatedSkills,
      })
    }
  }

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, { title: "", description: "", link: "" }],
    })
  }

  const updateProject = (index, field, value) => {
    const updatedProjects = [...resumeData.projects]
    updatedProjects[index] = { ...updatedProjects[index], [field]: value }
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    })
  }

  const removeProject = (index) => {
    if (resumeData.projects.length > 1) {
      const updatedProjects = resumeData.projects.filter((_, i) => i !== index)
      setResumeData({
        ...resumeData,
        projects: updatedProjects,
      })
    }
  }

  const addCertification = () => {
    setResumeData({
      ...resumeData,
      certifications: [...resumeData.certifications, { name: "", issuer: "", date: "" }],
    })
  }

  const updateCertification = (index, field, value) => {
    const updatedCertifications = [...resumeData.certifications]
    updatedCertifications[index] = { ...updatedCertifications[index], [field]: value }
    setResumeData({
      ...resumeData,
      certifications: updatedCertifications,
    })
  }

  const removeCertification = (index) => {
    if (resumeData.certifications.length > 1) {
      const updatedCertifications = resumeData.certifications.filter((_, i) => i !== index)
      setResumeData({
        ...resumeData,
        certifications: updatedCertifications,
      })
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#343a40]">Resume Builder</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 bg-[#e9ecef] mb-6">
          <TabsTrigger value="personal" className="text-xs md:text-sm">
            Personal
          </TabsTrigger>
          <TabsTrigger value="education" className="text-xs md:text-sm">
            Education
          </TabsTrigger>
          <TabsTrigger value="experience" className="text-xs md:text-sm">
            Experience
          </TabsTrigger>
          <TabsTrigger value="skills" className="text-xs md:text-sm">
            Skills
          </TabsTrigger>
          <TabsTrigger value="projects" className="text-xs md:text-sm">
            Projects
          </TabsTrigger>
          <TabsTrigger value="certifications" className="text-xs md:text-sm">
            Certifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#495057]">Full Name</label>
            <Input
              value={resumeData.personalInfo.name}
              onChange={(e) => updatePersonalInfo("name", e.target.value)}
              placeholder="John Doe"
              className="border-[#ced4da]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#495057]">Professional Title</label>
            <Input
              value={resumeData.personalInfo.title}
              onChange={(e) => updatePersonalInfo("title", e.target.value)}
              placeholder="Software Engineer"
              className="border-[#ced4da]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#495057]">Email</label>
            <Input
              value={resumeData.personalInfo.email}
              onChange={(e) => updatePersonalInfo("email", e.target.value)}
              placeholder="john.doe@example.com"
              className="border-[#ced4da]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#495057]">Phone</label>
            <Input
              value={resumeData.personalInfo.phone}
              onChange={(e) => updatePersonalInfo("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="border-[#ced4da]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#495057]">Address</label>
            <Input
              value={resumeData.personalInfo.address}
              onChange={(e) => updatePersonalInfo("address", e.target.value)}
              placeholder="New York, NY"
              className="border-[#ced4da]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#495057]">Professional Summary</label>
            <Textarea
              value={resumeData.personalInfo.summary}
              onChange={(e) => updatePersonalInfo("summary", e.target.value)}
              placeholder="Experienced software engineer with a passion for developing innovative solutions..."
              className="border-[#ced4da] min-h-[100px]"
            />
          </div>
        </TabsContent>

        <TabsContent value="education">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-6 p-4 border border-[#dee2e6] rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-[#343a40]">Education #{index + 1}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(index)}
                  disabled={resumeData.education.length <= 1}
                  className="text-[#6c757d] hover:text-red-500"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#495057]">Institution</label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    placeholder="University of Example"
                    className="border-[#ced4da]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#495057]">Degree</label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    placeholder="Bachelor of Science"
                    className="border-[#ced4da]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#495057]">Field of Study</label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(index, "field", e.target.value)}
                    placeholder="Computer Science"
                    className="border-[#ced4da]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#495057]">Start Date</label>
                    <Input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                      className="border-[#ced4da]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#495057]">End Date</label>
                    <Input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                      className="border-[#ced4da]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#495057]">Description</label>
                  <Textarea
                    value={edu.description}
                    onChange={(e) => updateEducation(index, "description", e.target.value)}
                    placeholder="Relevant coursework, achievements, etc."
                    className="border-[#ced4da]"
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full border-dashed border-[#adb5bd] text-[#6c757d] hover:bg-[#e9ecef]"
            onClick={addEducation}
          >
            <PlusCircle size={16} className="mr-2" /> Add Education
          </Button>
        </TabsContent>

        <TabsContent value="experience">
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-6 p-4 border border-[#dee2e6] rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-[#343a40]">Experience #{index + 1}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(index)}
                  disabled={resumeData.experience.length <= 1}
                  className="text-[#6c757d] hover:text-red-500"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#495057]">Company</label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                    placeholder="Example Corp"
                    className="border-[#ced4da]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#495057]">Position</label>
                  <Input
                    value={exp.position}
                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                    placeholder="Senior Developer"
                    className="border-[#ced4da]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#495057]">Start Date</label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                      className="border-[#ced4da]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#495057]">End Date</label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                      className="border-[#ced4da]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#495057]">Description</label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    placeholder="Responsibilities, achievements, technologies used, etc."
                    className="border-[#ced4da]"
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full border-dashed border-[#adb5bd] text-[#6c757d] hover:bg-[#e9ecef]"
            onClick={addExperience}
          >
            <PlusCircle size={16} className="mr-2" /> Add Experience
          </Button>
        </TabsContent>

        <TabsContent value="skills">
          <div className="mb-4">
            <h3 className="font-medium text-[#343a40] mb-2">Skills</h3>
            <p className="text-sm text-[#6c757d] mb-4">Add your technical and soft skills</p>

            {resumeData.skills.map((skill, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  placeholder="e.g., JavaScript, Project Management, etc."
                  className="border-[#ced4da]"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkill(index)}
                  disabled={resumeData.skills.length <= 1}
                  className="ml-2 text-[#6c757d] hover:text-red-500"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full mt-4 border-dashed border-[#adb5bd] text-[#6c757d] hover:bg-[#e9ecef]"
              onClick={addSkill}
            >
              <PlusCircle size={16} className="mr-2" /> Add Skill
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="projects">
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-6 p-4 border border-[#dee2e6] rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-[#343a40]">Project #{index + 1}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(index)}
                  disabled={resumeData.projects.length <= 1}
                  className="text-[#6c757d] hover:text-red-500"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#495057]">Project Title</label>
                  <Input
                    value={project.title}
                    onChange={(e) => updateProject(index, "title", e.target.value)}
                    placeholder="E-commerce Website"
                    className="border-[#ced4da]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#495057]">Description</label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(index, "description", e.target.value)}
                    placeholder="Developed a full-stack e-commerce platform with React and Node.js..."
                    className="border-[#ced4da]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#495057]">Project Link</label>
                  <Input
                    value={project.link}
                    onChange={(e) => updateProject(index, "link", e.target.value)}
                    placeholder="https://github.com/yourusername/project"
                    className="border-[#ced4da]"
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full border-dashed border-[#adb5bd] text-[#6c757d] hover:bg-[#e9ecef]"
            onClick={addProject}
          >
            <PlusCircle size={16} className="mr-2" /> Add Project
          </Button>
        </TabsContent>

        <TabsContent value="certifications">
          {resumeData.certifications.map((cert, index) => (
            <div key={index} className="mb-6 p-4 border border-[#dee2e6] rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-[#343a40]">Certification #{index + 1}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCertification(index)}
                  disabled={resumeData.certifications.length <= 1}
                  className="text-[#6c757d] hover:text-red-500"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#495057]">Certification Name</label>
                  <Input
                    value={cert.name}
                    onChange={(e) => updateCertification(index, "name", e.target.value)}
                    placeholder="AWS Certified Solutions Architect"
                    className="border-[#ced4da]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#495057]">Issuing Organization</label>
                  <Input
                    value={cert.issuer}
                    onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                    placeholder="Amazon Web Services"
                    className="border-[#ced4da]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#495057]">Date</label>
                  <Input
                    type="month"
                    value={cert.date}
                    onChange={(e) => updateCertification(index, "date", e.target.value)}
                    className="border-[#ced4da]"
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full border-dashed border-[#adb5bd] text-[#6c757d] hover:bg-[#e9ecef]"
            onClick={addCertification}
          >
            <PlusCircle size={16} className="mr-2" /> Add Certification
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}

