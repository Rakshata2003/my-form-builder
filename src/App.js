import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AppraisalForm() {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    teamwork: "",
    communication: "",
    punctuality: "",
    productivity: "",
    learningDevelopment: "",
    initiative: "",
    adaptability: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Transforming formData into the structure your backend expects
    const categories = [
      { label: "Teamwork", value: formData.teamwork },
      { label: "Communication", value: formData.communication },
      { label: "Punctuality", value: formData.punctuality },
      { label: "Productivity", value: formData.productivity },
      { label: "Learning & Development", value: formData.learningDevelopment },
      { label: "Initiative", value: formData.initiative },
      { label: "Adaptability", value: formData.adaptability },
    ];

    const reviewData = {
      name: formData.name,
      employeeId: formData.employeeId,
      categories: categories,
    };

    try {
      const response = await fetch("https://your-backend.onrender.com/submit-review" {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("❌ Failed to submit review.");
      }
    } catch (err) {
      alert("⚠️ Submission error.");
      console.error(err);
    }
  };

  return (
    <div className="container py-5" style={{ background: "#f7f9fc" }}>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card p-4 shadow rounded-4 bg-white">
            <h2 className="text-center text-primary mb-4">Employee Appraisal Form</h2>

            {submitted ? (
              <div className="alert alert-success text-center fs-5">
                ✅ Review submitted successfully!
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <InputField label="Employee Name" name="name" value={formData.name} handleChange={handleChange} />
                <InputField label="Employee ID" name="employeeId" value={formData.employeeId} handleChange={handleChange} />

                <SelectField
                  label="Teamwork"
                  name="teamwork"
                  value={formData.teamwork}
                  handleChange={handleChange}
                  options={["Excellent", "Good", "Needs Improvement"]}
                />

                <SelectField
                  label="Communication"
                  name="communication"
                  value={formData.communication}
                  handleChange={handleChange}
                  options={["Clear & Concise", "Average", "Unclear"]}
                />

                <SelectField
                  label="Punctuality"
                  name="punctuality"
                  value={formData.punctuality}
                  handleChange={handleChange}
                  options={["Always on time", "Usually on time", "Frequently late"]}
                />

                <SelectField
                  label="Productivity"
                  name="productivity"
                  value={formData.productivity}
                  handleChange={handleChange}
                  options={["Highly productive", "Moderately productive", "Low productivity"]}
                />

                <SelectField
                  label="Learning & Development"
                  name="learningDevelopment"
                  value={formData.learningDevelopment}
                  handleChange={handleChange}
                  options={["Actively learns", "Occasionally updates skills", "Rarely seeks development"]}
                />

                <SelectField
                  label="Initiative"
                  name="initiative"
                  value={formData.initiative}
                  handleChange={handleChange}
                  options={["Frequently takes initiative", "Sometimes takes initiative", "Needs encouragement"]}
                />

                <SelectField
                  label="Adaptability"
                  name="adaptability"
                  value={formData.adaptability}
                  handleChange={handleChange}
                  options={["Adapts quickly", "Moderately adaptable", "Struggles with change"]}
                />

                <button type="submit" className="btn btn-primary w-100 mt-4 rounded-pill fs-5">
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Display the output of the form data */}
      {submitted && (
        <div className="mt-4">
          <h3 className="text-center">Submitted Form</h3>
          <div className="list-group">
            <div className="list-group-item"><strong>Employee Name:</strong> {formData.name}</div>
            <div className="list-group-item"><strong>Employee ID:</strong> {formData.employeeId}</div>
            {formData.teamwork && <div className="list-group-item"><strong>Teamwork:</strong> {formData.teamwork}</div>}
            {formData.communication && <div className="list-group-item"><strong>Communication:</strong> {formData.communication}</div>}
            {formData.punctuality && <div className="list-group-item"><strong>Punctuality:</strong> {formData.punctuality}</div>}
            {formData.productivity && <div className="list-group-item"><strong>Productivity:</strong> {formData.productivity}</div>}
            {formData.learningDevelopment && <div className="list-group-item"><strong>Learning & Development:</strong> {formData.learningDevelopment}</div>}
            {formData.initiative && <div className="list-group-item"><strong>Initiative:</strong> {formData.initiative}</div>}
            {formData.adaptability && <div className="list-group-item"><strong>Adaptability:</strong> {formData.adaptability}</div>}
          </div>
        </div>
      )}
    </div>
  );
}

function InputField({ label, name, value, handleChange }) {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">{label}</label>
      <input
        type="text"
        className="form-control rounded-3"
        name={name}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
}

function SelectField({ label, name, value, handleChange, options }) {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">{label}</label>
      <select
        className="form-select rounded-3"
        name={name}
        value={value}
        onChange={handleChange}
        required
      >
        <option value="">Select an option</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
