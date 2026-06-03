import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaLock, FaTimes } from "react-icons/fa";

const APPS_SCRIPT_URL =
  // test
  // "https://script.google.com/macros/s/AKfycbzfRNGeVp0B4WvKGyb1w4QKUJUWL-VZ66H4OpcPJnEv6T8s5y6Z1jgkU8vyJMy8S7op9Q/exec";
  // suriya
  "https://script.google.com/macros/s/AKfycbz-yujT3J2u9TNSndl-FIG22eqGNNUlEgC0GCHzBHfP8w3p1CdDg6L9SZGCxBQYzS8XZQ/exec";

const DEFAULT_CONFIG = {
  heading: "Start Your IT Career in 90 Days!",
  btnText: "Get FREE Demo Class",
  formType: "da_demo",
};

function LeadForm({ isPopup = false, config = {}, onClose, page }) {
  const navigate = useNavigate();
  
  const { heading, btnText, formType, course } = { ...DEFAULT_CONFIG, ...config };

  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    course: course,
    form_type: formType,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s+/g, "")))
      e.phone = "Enter a valid 10-digit mobile number";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.course) e.course = "Please select a course";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setLoading(true);
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, form_type: formType }),
      });
      navigate("/thank-you");
    } catch (err) {
      console.error("Submission failed:", err);
      setErrors({
        submit: "Something went wrong. Please try again or call us directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  const formCard = (
    <div className="lead-form-card">
      {/* Close button — only rendered in popup mode */}
      {isPopup && (
        <button
          className="lead-form-close"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes />
        </button>
      )}

      <h3>
        <FaGraduationCap
          style={{
            marginRight: 8,
            color: "var(--clr-primary)",
            fontSize: "30px",
          }}
        />
        {heading}
      </h3>

      <div className="form-group">
        <label>Full Name *</label>
        <input
          className={`form-control${errors.name ? " form-control--error" : ""}`}
          name="name"
          value={form.name}
          onChange={handle}
          placeholder="Your full name"
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Mobile Number *</label>
        <input
          className={`form-control${errors.phone ? " form-control--error" : ""}`}
          name="phone"
          value={form.phone}
          onChange={handle}
          placeholder="9XXXXXXXXX"
          maxLength={10}
          inputMode="numeric"
        />
        {errors.phone && <span className="form-error">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label>Your Location *</label>
        <input
          className={`form-control${errors.location ? " form-control--error" : ""}`}
          name="location"
          value={form.location}
          onChange={handle}
          placeholder="City, State"
        />
        {errors.location && (
          <span className="form-error">{errors.location}</span>
        )}
      </div>

      <div className="form-group">
        <label>Select Course *</label>
        <select
          className={`form-control${errors.course ? " form-control--error" : ""}`}
          name="course"
          value={course}
          onChange={handle}
        >
          <option value="" hidden>
            -- Select Course --
          </option>
          { (page == "Home Page" || page == "Placements")?
          <>
            <option value="Java Full Stack">Java Fullstack</option>
            <option value="Python Full Stack">Python Fullstack</option>
            <option value="Data Analytics">Data Analytics</option>
            <option value="Data Science">Data Science</option>
          </>
          :
          <>
            <option value="Data Analytics">Data Analytics</option>
            <option value="Python Programming">Python Programming</option>
            <option value="Power BI">Power BI</option>
            <option value="SQL for Beginners">SQL for Beginners</option>
          </>
          }
        </select>
        {errors.course && <span className="form-error">{errors.course}</span>}
      </div>

      {errors.submit && (
        <div className="form-submit-error">{errors.submit}</div>
      )}

      <button
        className="btn btn-accent"
        style={{ width: "100%", justifyContent: "center", marginTop: 6 }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="form-spinner" /> Submitting...
          </>
        ) : (
          btnText
        )}
      </button>

      <p className="form-note">
        <FaLock size={11} style={{ marginRight: 4 }} />
        100% Free &amp; No Spam. We'll call you within 30 minutes!
      </p>
    </div>
  );

  if (!isPopup) return formCard;

  return (
    <div
      className="lead-form-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    > 
      {formCard}
    </div>
  );
}

export default LeadForm;
