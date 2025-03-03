import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export const generatePDF = async (resumeData) => {
  // Create a temporary div to render the resume
  const tempDiv = document.createElement("div")
  tempDiv.style.position = "absolute"
  tempDiv.style.left = "-9999px"
  tempDiv.style.width = "794px" // A4 width in pixels at 96 DPI
  tempDiv.style.backgroundColor = "white"
  tempDiv.style.padding = "40px"
  document.body.appendChild(tempDiv)

  // Create resume HTML
  tempDiv.innerHTML = `
    <div style="font-family: Arial, sans-serif; color: #212529;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="font-size: 24px; font-weight: bold; color: #343a40; margin-bottom: 4px;">${resumeData.personalInfo.name || "Your Name"}</h1>
        ${resumeData.personalInfo.title ? `<p style="font-size: 18px; color: #495057; margin: 4px 0;">${resumeData.personalInfo.title}</p>` : ""}
        
        <div style="display: flex; justify-content: center; gap: 16px; margin-top: 8px; font-size: 14px; color: #6c757d;">
          ${resumeData.personalInfo.email ? `<span>${resumeData.personalInfo.email}</span>` : ""}
          ${resumeData.personalInfo.phone ? `<span>${resumeData.personalInfo.phone}</span>` : ""}
          ${resumeData.personalInfo.address ? `<span>${resumeData.personalInfo.address}</span>` : ""}
        </div>
      </div>

      ${
        resumeData.personalInfo.summary
          ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 18px; font-weight: 600; border-bottom: 1px solid #dee2e6; padding-bottom: 4px; margin-bottom: 8px; color: #343a40;">Professional Summary</h2>
          <p style="font-size: 14px; color: #495057;">${resumeData.personalInfo.summary}</p>
        </div>
      `
          : ""
      }

      ${
        resumeData.experience.some((exp) => exp.company || exp.position)
          ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 18px; font-weight: 600; border-bottom: 1px solid #dee2e6; padding-bottom: 4px; margin-bottom: 8px; color: #343a40;">Work Experience</h2>
          ${resumeData.experience
            .map((exp) =>
              exp.company || exp.position
                ? `
              <div style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div>
                    <h3 style="font-size: 16px; font-weight: 500; color: #343a40; margin: 0;">${exp.position || "Position"}</h3>
                    <p style="font-size: 14px; color: #495057; margin: 2px 0;">${exp.company || "Company"}</p>
                  </div>
                  ${
                    exp.startDate || exp.endDate
                      ? `
                    <p style="font-size: 14px; color: #6c757d; margin: 0;">
                      ${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : "Present"}
                    </p>
                  `
                      : ""
                  }
                </div>
                ${exp.description ? `<p style="font-size: 14px; margin-top: 4px; color: #495057;">${exp.description}</p>` : ""}
              </div>
            `
                : "",
            )
            .join("")}
        </div>
      `
          : ""
      }

      ${
        resumeData.education.some((edu) => edu.institution || edu.degree)
          ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 18px; font-weight: 600; border-bottom: 1px solid #dee2e6; padding-bottom: 4px; margin-bottom: 8px; color: #343a40;">Education</h2>
          ${resumeData.education
            .map((edu) =>
              edu.institution || edu.degree
                ? `
              <div style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div>
                    <h3 style="font-size: 16px; font-weight: 500; color: #343a40; margin: 0;">${edu.degree} ${edu.field ? `in ${edu.field}` : ""}</h3>
                    <p style="font-size: 14px; color: #495057; margin: 2px 0;">${edu.institution}</p>
                  </div>
                  ${
                    edu.startDate || edu.endDate
                      ? `
                    <p style="font-size: 14px; color: #6c757d; margin: 0;">
                      ${formatDate(edu.startDate)} - ${edu.endDate ? formatDate(edu.endDate) : "Present"}
                    </p>
                  `
                      : ""
                  }
                </div>
                ${edu.description ? `<p style="font-size: 14px; margin-top: 4px; color: #495057;">${edu.description}</p>` : ""}
              </div>
            `
                : "",
            )
            .join("")}
        </div>
      `
          : ""
      }

      ${
        resumeData.skills.some((skill) => skill)
          ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 18px; font-weight: 600; border-bottom: 1px solid #dee2e6; padding-bottom: 4px; margin-bottom: 8px; color: #343a40;">Skills</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${resumeData.skills
              .map((skill) =>
                skill
                  ? `
                <span style="background-color: #e9ecef; color: #495057; padding: 4px 8px; border-radius: 4px; font-size: 14px;">
                  ${skill}
                </span>
              `
                  : "",
              )
              .join("")}
          </div>
        </div>
      `
          : ""
      }

      ${
        resumeData.projects.some((project) => project.title)
          ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 18px; font-weight: 600; border-bottom: 1px solid #dee2e6; padding-bottom: 4px; margin-bottom: 8px; color: #343a40;">Projects</h2>
          ${resumeData.projects
            .map((project) =>
              project.title
                ? `
              <div style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <h3 style="font-size: 16px; font-weight: 500; color: #343a40; margin: 0;">${project.title}</h3>
                </div>
                ${project.description ? `<p style="font-size: 14px; margin-top: 4px; color: #495057;">${project.description}</p>` : ""}
                ${project.link ? `<p style="font-size: 14px; margin-top: 2px; color: #0d6efd;">${project.link}</p>` : ""}
              </div>
            `
                : "",
            )
            .join("")}
        </div>
      `
          : ""
      }

      ${
        resumeData.certifications.some((cert) => cert.name)
          ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 18px; font-weight: 600; border-bottom: 1px solid #dee2e6; padding-bottom: 4px; margin-bottom: 8px; color: #343a40;">Certifications</h2>
          ${resumeData.certifications
            .map((cert) =>
              cert.name
                ? `
              <div style="margin-bottom: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div>
                    <h3 style="font-size: 16px; font-weight: 500; color: #343a40; margin: 0;">${cert.name}</h3>
                    ${cert.issuer ? `<p style="font-size: 14px; color: #495057; margin: 2px 0;">${cert.issuer}</p>` : ""}
                  </div>
                  ${cert.date ? `<p style="font-size: 14px; color: #6c757d; margin: 0;">${formatDate(cert.date)}</p>` : ""}
                </div>
              </div>
            `
                : "",
            )
            .join("")}
        </div>
      `
          : ""
      }
    </div>
  `

  function formatDate(dateString) {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  try {
    // Convert the div to canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    })

    // Create PDF
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const imgWidth = 210 // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)

    // Download PDF
    pdf.save(`${resumeData.personalInfo.name || "resume"}.pdf`)
  } catch (error) {
    console.error("Error generating PDF:", error)
    alert("There was an error generating your PDF. Please try again.")
  } finally {
    // Clean up
    document.body.removeChild(tempDiv)
  }
}

