import { useState } from "react";

const UserContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-container max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Contact Us</h1>
      </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
        
            <div>
              <label className="block text-text-muted text-sm mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Name"
              />
            </div>

            <div>
              <label className="block text-text-muted text-sm mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label className="block text-text-muted text-sm mb-2">Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="input-field "
              >
                <option className="text-black" value="">Select a topic</option>
                <option className="text-black" value="general">General Inquiry</option>
                <option className="text-black" value="feedback">Feedback</option>
                <option className="text-black" value="support">Technical Support</option>
                <option className="text-black" value="billing">Billing</option>
                <option className="text-black" value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-text-muted text-sm mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="input-field resize-none"
                placeholder="Tell us how we can help you..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {submitStatus === "success" && (
              <div className="p-4 bg-green-400/20 text-green-400 rounded-lg text-center">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 bg-red-400/20 text-red-400 rounded-lg text-center">
                Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>
    </div>
  );
};

export default UserContact;

