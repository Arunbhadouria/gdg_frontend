import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function AdminDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get("http://localhost:3001/students/get");
      if (res.data.success) {
        setRegistrations(
          res.data.data.map((s) => ({
            ...s,
            enrollmentNo: s.Enrollment,
            email: s.Email,
            domain: s.Domain,
            name: s.Name,
            phone: s.Phone,
            branch: s.Branch,
            sem: s.Sem,
            linkedin: s.LinkedIn,
            pastWork: s["Past Work"],
            github: s.Github,
            taskLink: s.taskLink,
          }))
        );
      }
    } catch (error) {
      console.error("Failed to fetch registrations:", error);
    }
  };

  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuthenticated");
    if (authStatus !== "true") {
      navigate("/admin/login");
    } else {
      setIsAuthenticated(true);
      fetchRegistrations();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    navigate("/admin/login");
  };

  const viewDetails = (registration) => {
    setSelectedRegistration(registration);
  };

  const closeModal = () => {
    setSelectedRegistration(null);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Student Registrations", 14, 20);

    // Only include the relevant fields in the PDF
    const tableColumn = [
      "Name",
      "Enrollment",
      "Email",
      "Phone",
      "Branch",
      "Sem",
      "Domain",
      "LinkedIn",
      "Past Work",
      "Github",
      "taskLink",
    ];

    const tableRows = registrations.map((reg) => [
      reg.name || reg.Name || "",
      reg.enrollmentNo || reg.Enrollment || "",
      reg.email || reg.Email || "",
      reg.phone || reg.Phone || "",
      reg.branch || reg.Branch || "",
      reg.sem || reg.Sem || "",
      reg.domain || reg.Domain || "",
      reg.linkedin || reg.LinkedIn || "",
      reg.pastWork || reg["Past Work"] || "",
      reg.github || reg.Github || "",
      reg.taskLink || "",
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("registrations.pdf");
  };

  // Count students per domain dynamically
  const domainCounts = registrations.reduce((acc, reg) => {
    const domain = reg.domain || reg.Domain;
    if (domain) {
      acc[domain] = (acc[domain] || 0) + 1;
    }
    return acc;
  }, {});

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Registrations
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {registrations.length}
          </p>
        </div>

        {Object.entries(domainCounts).map(([domain, count]) => (
          <div key={domain} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700">{domain}</h3>
            <p className="text-3xl font-bold text-green-600">{count}</p>
          </div>
        ))}
      </div>

      {/* Registrations Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Registration Applications
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Name",
                  "Enrollment No.",
                  "Email",
                  "Branch",
                  "Sem",
                  "Domain",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {registrations.map((reg) => (
                <tr
                  key={reg.enrollmentNo || reg.Enrollment}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {reg.name || reg.Name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reg.enrollmentNo || reg.Enrollment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reg.email || reg.Email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reg.branch || reg.Branch}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reg.sem || reg.Sem}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {reg.domain || reg.Domain}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => viewDetails(reg)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Registration Details</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {/* Display only the relevant fields without duplicates */}
              {[
                {
                  label: "Name",
                  value: selectedRegistration.name || selectedRegistration.Name,
                },
                {
                  label: "Enrollment Number",
                  value:
                    selectedRegistration.enrollmentNo ||
                    selectedRegistration.Enrollment,
                },
                {
                  label: "Email",
                  value:
                    selectedRegistration.email || selectedRegistration.Email,
                },
                {
                  label: "Phone",
                  value:
                    selectedRegistration.phone || selectedRegistration.Phone,
                },
                {
                  label: "Branch",
                  value:
                    selectedRegistration.branch || selectedRegistration.Branch,
                },
                {
                  label: "Semester",
                  value: selectedRegistration.sem || selectedRegistration.Sem,
                },
                {
                  label: "Domain",
                  value:
                    selectedRegistration.domain || selectedRegistration.Domain,
                },
                {
                  label: "LinkedIn",
                  value:
                    selectedRegistration.linkedin ||
                    selectedRegistration.LinkedIn,
                  isLink: true,
                },
                {
                  label: "Past Work",
                  value:
                    selectedRegistration.pastWork ||
                    selectedRegistration["Past Work"],
                  isLink: true,
                },
                {
                  label: "GitHub",
                  value:
                    selectedRegistration.github || selectedRegistration.Github,
                  isLink: true,
                },
                {
                  label: "Task Link",
                  value: selectedRegistration.taskLink,
                  isLink: true,
                },
              ].map(({ label, value, isLink }) => (
                <div key={label} className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                      {label}
                    </label>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-900 break-words">
                      {isLink && value?.startsWith("http") ? (
                        <a
                          href={value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {value}
                        </a>
                      ) : (
                        value || "Not provided"
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
