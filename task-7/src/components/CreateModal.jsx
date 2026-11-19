import { useState } from "react";
import { CloseIcon, SpinnerIcon, PlusIcon } from "./Icons";

const INITIAL_FORM_STATE = {
  name: "",
  category: "Defense & Security",
  status: "Active",
  priority: "Medium",
  assignedTo: "",
  budget: "120000",
  systemHealth: 95,
  location: "Sector 04 — Orbital Spire Alpha",
  securityClearance: "Class 3 - Confidential",
  description: "",
  specifications: "Throughput: 500 Gbps | Lattice: Quantum 256-bit | Node Latency: 1.1ms",
  maintenanceNotes: "Routine calibration scheduled for Q4 cycle.",
};

export function CreateModal({ isOpen, onClose, onCreate, isSubmitting }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [formError, setFormError] = useState("");

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formError) setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError("Asset name is required.");
      return;
    }
    if (!formData.description.trim()) {
      setFormError("Asset description is required.");
      return;
    }

    const ok = await onCreate({
      ...formData,
      budget: Number(formData.budget) || 50000,
      systemHealth: Number(formData.systemHealth) || 100,
    });
    if (ok !== false) {
      setFormData(INITIAL_FORM_STATE);
      setFormError("");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <PlusIcon className="modal-icon" />
            <h3 className="modal-title">Register New Operational Asset</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            disabled={isSubmitting}
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-body">
          {formError && <div className="form-alert-error">{formError}</div>}

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Asset Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Quantum Entropy Stabilizer"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-control form-select"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                <option value="Defense & Security">Defense &amp; Security</option>
                <option value="Power & Energy">Power &amp; Energy</option>
                <option value="Data Communications">Data Communications</option>
                <option value="Cyber Defense">Cyber Defense</option>
                <option value="AI & Robotics">AI &amp; Robotics</option>
                <option value="Infrastructure">Infrastructure</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Initial Status</label>
              <select
                className="form-control form-select"
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="In Maintenance">In Maintenance</option>
                <option value="Deploying">Deploying</option>
                <option value="Standby">Standby</option>
                <option value="Decommissioned">Decommissioned</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                className="form-control form-select"
                value={formData.priority}
                onChange={(e) => handleChange("priority", e.target.value)}
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Security Clearance</label>
              <select
                className="form-control form-select"
                value={formData.securityClearance}
                onChange={(e) => handleChange("securityClearance", e.target.value)}
              >
                <option value="Class 5 - Restricted">Class 5 - Restricted</option>
                <option value="Class 4 - Top Secret">Class 4 - Top Secret</option>
                <option value="Class 3 - Confidential">Class 3 - Confidential</option>
                <option value="Class 2 - Internal">Class 2 - Internal</option>
                <option value="Class 1 - Public">Class 1 - Public</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Assigned Operative</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Dr. Alex Mercer"
                value={formData.assignedTo}
                onChange={(e) => handleChange("assignedTo", e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Budget ($ USD)</label>
              <input
                type="number"
                className="form-control"
                value={formData.budget}
                onChange={(e) => handleChange("budget", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Initial Health (0-100%)</label>
              <input
                type="number"
                min="0"
                max="100"
                className="form-control"
                value={formData.systemHealth}
                onChange={(e) => handleChange("systemHealth", e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Location / Deployment Zone</label>
            <input
              type="text"
              className="form-control"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Operational Description *</label>
            <textarea
              className="form-control"
              rows={2}
              placeholder="State the primary operational purpose..."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Technical Specifications</label>
            <textarea
              className="form-control"
              rows={2}
              placeholder="e.g. Throughput, hardware revision, encryption..."
              value={formData.specifications}
              onChange={(e) => handleChange("specifications", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Maintenance Notes</label>
            <textarea
              className="form-control"
              rows={2}
              placeholder="Maintenance cycles, warnings, inspection protocols..."
              value={formData.maintenanceNotes}
              onChange={(e) => handleChange("maintenanceNotes", e.target.value)}
            />
          </div>

          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <SpinnerIcon className="btn-icon spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <PlusIcon className="btn-icon" />
                  <span>Register Asset</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
