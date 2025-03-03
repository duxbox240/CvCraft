export default function ResumePreview({ resumeData }) {
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <div className="font-sans text-[#212529] p-4 border border-[#dee2e6] rounded-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-[#343a40]">{resumeData.personalInfo.name || "Your Name"}</h1>
        {resumeData.personalInfo.title && <p className="text-[#495057] text-lg">{resumeData.personalInfo.title}</p>}

        <div className="flex flex-wrap justify-center gap-x-4 mt-2 text-sm text-[#6c757d]">
          {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.address && <span>{resumeData.personalInfo.address}</span>}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b border-[#dee2e6] pb-1 mb-2 text-[#343a40]">
            Professional Summary
          </h2>
          <p className="text-sm text-[#495057]">{resumeData.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience.some((exp) => exp.company || exp.position) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b border-[#dee2e6] pb-1 mb-2 text-[#343a40]">Work Experience</h2>
          {resumeData.experience.map(
            (exp, index) =>
              (exp.company || exp.position) && (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-[#343a40]">{exp.position || "Position"}</h3>
                      <p className="text-sm text-[#495057]">{exp.company || "Company"}</p>
                    </div>
                    {(exp.startDate || exp.endDate) && (
                      <p className="text-sm text-[#6c757d]">
                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                      </p>
                    )}
                  </div>
                  {exp.description && <p className="text-sm mt-1 text-[#495057]">{exp.description}</p>}
                </div>
              ),
          )}
        </div>
      )}

      {/* Education */}
      {resumeData.education.some((edu) => edu.institution || edu.degree) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b border-[#dee2e6] pb-1 mb-2 text-[#343a40]">Education</h2>
          {resumeData.education.map(
            (edu, index) =>
              (edu.institution || edu.degree) && (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-[#343a40]">
                        {edu.degree} {edu.field ? `in ${edu.field}` : ""}
                      </h3>
                      <p className="text-sm text-[#495057]">{edu.institution}</p>
                    </div>
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-sm text-[#6c757d]">
                        {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                      </p>
                    )}
                  </div>
                  {edu.description && <p className="text-sm mt-1 text-[#495057]">{edu.description}</p>}
                </div>
              ),
          )}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.some((skill) => skill) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b border-[#dee2e6] pb-1 mb-2 text-[#343a40]">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map(
              (skill, index) =>
                skill && (
                  <span key={index} className="bg-[#e9ecef] text-[#495057] px-2 py-1 rounded-md text-sm">
                    {skill}
                  </span>
                ),
            )}
          </div>
        </div>
      )}

      {/* Projects */}
      {resumeData.projects.some((project) => project.title) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b border-[#dee2e6] pb-1 mb-2 text-[#343a40]">Projects</h2>
          {resumeData.projects.map(
            (project, index) =>
              project.title && (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-[#343a40]">{project.title}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  {project.description && <p className="text-sm mt-1 text-[#495057]">{project.description}</p>}
                </div>
              ),
          )}
        </div>
      )}

      {/* Certifications */}
      {resumeData.certifications.some((cert) => cert.name) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b border-[#dee2e6] pb-1 mb-2 text-[#343a40]">Certifications</h2>
          {resumeData.certifications.map(
            (cert, index) =>
              cert.name && (
                <div key={index} className="mb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-[#343a40]">{cert.name}</h3>
                      {cert.issuer && <p className="text-sm text-[#495057]">{cert.issuer}</p>}
                    </div>
                    {cert.date && <p className="text-sm text-[#6c757d]">{formatDate(cert.date)}</p>}
                  </div>
                </div>
              ),
          )}
        </div>
      )}
    </div>
  )
}

