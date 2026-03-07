import React from "react";
import { ShieldCheck, BarChart3, MessageSquare, Users } from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <div className="page-container space-y-8">

      {/* Header */}
      <div>
        <h1 className="mb-2 text-text-primary">About Feedback360</h1>
        <p className="text-text-muted max-w-3xl">
          Feedback360 is a modern customer feedback management system designed
          to help businesses collect, analyze, and improve product experiences
          through structured reviews and insights.
        </p>
      </div>

      {/* Mission Section */}
      <div className="card">
        <h2 className="mb-3 text-text-primary">Our Mission</h2>
        <p className="text-text-muted leading-relaxed">
          Our mission is to bridge the gap between customers and businesses by
          creating a transparent, structured, and actionable feedback system.
          We empower organizations to make data-driven decisions and continuously
          enhance their products and services.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="card flex items-start gap-4">
          <BarChart3 className="text-accent-1" size={28} />
          <div>
            <h2 className="mb-2 text-text-primary">Insightful Analytics</h2>
            <p className="text-text-muted text-sm">
              Visual rating breakdowns, average scores, and performance trends
              help teams understand product sentiment instantly.
            </p>
          </div>
        </div>

        <div className="card flex items-start gap-4">
          <MessageSquare className="text-yellow-400" size={28} />
          <div>
            <h2 className="mb-2 text-text-primary">Structured Reviews</h2>
            <p className="text-text-muted text-sm">
              Collect star ratings and detailed feedback in an organized way,
              ensuring every customer voice is heard.
            </p>
          </div>
        </div>

        <div className="card flex items-start gap-4">
          <Users className="text-green-400" size={28} />
          <div>
            <h2 className="mb-2 text-text-primary">Customer-Centric Design</h2>
            <p className="text-text-muted text-sm">
              Designed with usability in mind, making it easy for users to
              submit reviews and for teams to manage them efficiently.
            </p>
          </div>
        </div>

        <div className="card flex items-start gap-4">
          <ShieldCheck className="text-accent-2" size={28} />
          <div>
            <h2 className="mb-2 text-text-primary">Secure & Reliable</h2>
            <p className="text-text-muted text-sm">
              Built with scalable architecture and modern security practices
              to ensure safe and reliable data management.
            </p>
          </div>
        </div>

      </div>

      {/* Footer Note */}
      <div className="card text-center">
        <p className="text-text-muted text-sm">
          © {new Date().getFullYear()} Feedback360. All rights reserved.
        </p>
      </div>

    </div>
  );
};

export default AboutPage;