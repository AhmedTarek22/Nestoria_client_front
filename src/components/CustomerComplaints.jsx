import EmailIcon from "@mui/icons-material/Email";
import { Button } from "@mui/material";

function CustomerComplaints() {
  const handleReply = (email) => {
    window.location.href = `mailto:${email}?subject=Response to Your Complaint&body=Dear Customer,`;
  };
  const complaints = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      complaint: "There was an issue with my last order.",
    },
    {
      id: 2,
      name: "Mark Wilson",
      email: "mark.wilson@example.com",
      complaint: "The product I received was damaged.",
    },
    {
      id: 3,
      name: "Eva Green",
      email: "eva.green@example.com",
      complaint: "I haven't received my refund yet.",
    },
  ];
  return (
    <section id="customer-complaints" className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 w-full text-center ">
        Customer Complaints
      </h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        {complaints.map((complaint) => (
          <div
            key={complaint.id}
            className="flex justify-between items-center mb-4"
          >
            <div>
              <p className="text-gray-800 font-bold">{complaint.name}</p>
              <p className="text-gray-600">Complaint: {complaint.complaint}</p>
              <p className="text-gray-600">Email: {complaint.email}</p>
            </div>
            <Button
              startIcon={<EmailIcon />}
              onClick={() => handleReply(complaint.email)}
              sx={{
                background: "#3b82f6",
                padding: "10px 10px",
                color: "white",
                ":hover": { background: "#2563eb", transition: "all 0.3s" },
              }}
            >
              {/* te xt-white px-4 py-2 rounded-lg hover:bg-blue-600" */}
              Reply via Email
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CustomerComplaints;
