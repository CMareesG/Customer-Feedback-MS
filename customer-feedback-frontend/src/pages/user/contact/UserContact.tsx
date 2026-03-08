import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react";

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

    // Simulate API call
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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Contact Us</h1>
        <p className="text-text-muted">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="text-accent-1" size={24} />
              <h2 className="text-xl font-semibold text-text-primary">Get in Touch</h2>
            </div>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent-1/20 rounded-lg flex items-center justify-center">
                  <Phone className="text-accent-1" size={20} />
                </div>
                <div>
                  <h3 className="text-text-primary font-medium">Phone</h3>
                  <p className="text-text-muted text-sm">Mon-Fri from 8am to 5pm</p>
                  <p className="text-accent-2 mt-1">+1 (555) 123-4567</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent-2/20 rounded-lg flex items-center justify-center">
                  <Mail className="text-accent-2" size={20} />
                </div>
                <div>
                  <h3 className="text-text-primary font-medium">Email</h3>
                  <p className="text-text-muted text-sm">We'll respond within 24 hours</p>
                  <p className="text-accent-2 mt-1">support@feedback360.com</p>
                </div>
              </div>

              {/* Office */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center">
                  <MapPin className="text-green-400" size={20} />
                </div>
                <div>
                  <h3 className="text-text-primary font-medium">Office</h3>
                  <p className="text-text-muted text-sm">Come visit us at our office</p>
                  <p className="text-accent-2 mt-1">123 Feedback Street, San Francisco, CA 94105</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                  <Clock className="text-yellow-400" size={20} />
                </div>
                <div>
                  <h3 className="text-text-primary font-medium">Business Hours</h3>
                  <p className="text-text-muted text-sm">We're here to help</p>
                  <p className="text-accent-2 mt-1">Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p className="text-accent-2">Saturday - Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Card */}
          <div className="card">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Answers</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="text-text-primary font-medium mb-1">How do I submit feedback?</h4>
                <p className="text-text-muted text-sm">Navigate to any product category and select a product to leave your feedback.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="text-text-primary font-medium mb-1">How long does response take?</h4>
                <p className="text-text-muted text-sm">Our team typically responds within 24-48 business hours.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="text-text-primary font-medium mb-1">Can I delete my feedback?</h4>
                <p className="text-text-muted text-sm">Yes, you can manage your feedback from your dashboard.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-text-muted text-sm mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="John Doe"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-text-muted text-sm mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="john@example.com"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label className="block text-text-muted text-sm mb-2">Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select a topic</option>
                <option value="general">General Inquiry</option>
                <option value="feedback">Feedback</option>
                <option value="support">Technical Support</option>
                <option value="billing">Billing</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Message Field */}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Send size={18} />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {/* Success Message */}
            {submitStatus === "success" && (
              <div className="p-4 bg-green-400/20 text-green-400 rounded-lg text-center">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            {/* Error Message */}
            {submitStatus === "error" && (
              <div className="p-4 bg-red-400/20 text-red-400 rounded-lg text-center">
                Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserContact;

