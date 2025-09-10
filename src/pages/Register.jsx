import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Registration() {
  const [formData, setFormData] = useState({
    Name: "",
    Enrollment: "",
    Branch: "",
    Sem: "",
    Domain: "",
    Email: "",
    Phone: "",
    "Past Work": "",
    taskLink: "",
    LinkedIn: "",
    Github: "",
  });

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const domains = [
    "Technical",
    "Graphics Designing",
    "PR and Marketing",
    "Management",
    "Content",
    "Videography",
  ];

  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"]; // Changed from years to semesters
  const branches = [
    "Computer Science",
    "Computer Science & Design",
    "Information Technology",
    "Electronics & Telecommunication",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Artificial intelligence & Data science",
    "Artificial intelligence & Machine learning",
    "Artificial intelligence",
    "Information Technology (AIR)",
    "Information Technology (IOT)",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Prepare data for API (matching your Google Sheets columns)
      const submissionData = {
        Name: formData.Name,
        Email: formData.Email,
        Phone: formData.Phone,
        Branch: formData.Branch,
        Sem: formData.Sem,
        Enrollment: formData.Enrollment,
        Domain: formData.Domain,
        LinkedIn: formData.LinkedIn,
        "Past Work": formData["Past Work"],
        Github: formData.Github,
        taskLink: formData.taskLink,
      };

      // Submit to your backend API
      const response = await fetch("http://localhost:3001/students/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration submitted successfully!");
        navigate("/");
      } else {
        setError(result.message || "Failed to submit registration");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadTaskPDF = () => {
    // Simulate PDF download
    const link = document.createElement("a");
    link.href = "/sample-tasks.pdf";
    link.download = "GDG_Recruitment_Tasks.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
              <img
                src={logo}
                alt="GDG Logo"
                className="w-14 h-14 object-contain"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            GDG Recruitment Registration
          </h1>
          <p className="text-gray-600">
            Join our community and be part of something amazing!
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="Name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  required
                  value={formData.Name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="Enrollment"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Enrollment Number *
                </label>
                <input
                  type="text"
                  id="Enrollment"
                  name="Enrollment"
                  required
                  value={formData.Enrollment}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your enrollment number"
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="Branch"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Branch *
                </label>
                <select
                  id="Branch"
                  name="Branch"
                  required
                  value={formData.Branch}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Branch</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="Sem"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Semester *
                </label>
                <select
                  id="Sem"
                  name="Sem"
                  required
                  value={formData.Sem}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Semester</option>
                  {semesters.map(
                    (
                      sem // Changed from years to semesters
                    ) => (
                      <option key={sem} value={sem}>
                        Semester {sem}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label
                  htmlFor="Domain"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Domain of Interest *
                </label>
                <select
                  id="Domain"
                  name="Domain"
                  required
                  value={formData.Domain}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Domain</option>
                  {domains.map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  required
                  value={formData.Email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label
                  htmlFor="Phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="Phone"
                  name="Phone"
                  required
                  value={formData.Phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Social Profiles - Optional */}
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="LinkedIn"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  LinkedIn Profile (Optional)
                </label>
                <input
                  type="url"
                  id="LinkedIn"
                  name="LinkedIn"
                  value={formData.LinkedIn}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Share your LinkedIn profile to help us know you better
                </p>
              </div>

              <div>
                <label
                  htmlFor="Github"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  GitHub Profile (Optional)
                </label>
                <input
                  type="url"
                  id="Github"
                  name="Github"
                  value={formData.Github}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/yourusername"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Share your GitHub to showcase your projects and contributions
                </p>
              </div>
            </div>

            {/* Past Work Google Drive Link */}
            <div>
              <label
                htmlFor="Past Work"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Submit your Past Work (Google Drive Link) *
              </label>
              <input
                type="url"
                id="Past Work"
                name="Past Work"
                required
                value={formData["Past Work"]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://drive.google.com/your-past-work-link"
              />
              <p className="text-xs text-gray-500 mt-1">
                Please upload your past work/projects to Google Drive and share
                the link here
              </p>
            </div>

            {/* Tasks PDF Download */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">
                Tasks Instructions
              </h3>
              <p className="text-blue-700 mb-3">
                Download the tasks PDF, complete them, upload to Google Drive,
                and submit the link below.
              </p>
              <button
                type="button"
                onClick={downloadTaskPDF}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center mb-4"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Tasks PDF
              </button>

              {/* Task Submission Google Drive Link */}
              <div>
                <label
                  htmlFor="taskLink"
                  className="block text-sm font-medium text-blue-800 mb-1"
                >
                  Submit your Completed Tasks (Google Drive Link) *
                </label>
                <input
                  type="url"
                  id="taskLink"
                  name="taskLink"
                  required
                  value={formData.taskLink}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://drive.google.com/your-completed-tasks-link"
                />
                <p className="text-xs text-blue-600 mt-1">
                  Upload your completed tasks to Google Drive and make sure the
                  link is accessible
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-between items-center pt-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                ← Back to Home
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
