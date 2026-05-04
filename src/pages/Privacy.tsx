import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-10">
        <div className="container max-w-4xl flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-primary-glow grid place-items-center shadow-[var(--shadow-elegant)]">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Homework Helper</h1>
              <p className="text-xs text-muted-foreground">Privacy Policy</p>
            </div>
          </Link>
          <Link to="/" className="text-sm text-primary inline-flex items-center gap-1 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>
      </header>

      <main className="container max-w-3xl py-10 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: May 4, 2026</p>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. Introduction</h2>
          <p className="text-foreground/80 leading-relaxed">
            Homework Helper ("we", "our", "us") is an AI-powered learning tool that helps students get
            step-by-step solutions to their homework questions. This Privacy Policy explains how we
            handle the information you provide when you use our service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">2. Information We Process</h2>
          <ul className="list-disc pl-6 space-y-2 text-foreground/80">
            <li><strong>Question content:</strong> Text you type and images you upload, paste, or capture.</li>
            <li><strong>Subject & language preference:</strong> The subject and answer language you choose.</li>
            <li><strong>Technical data:</strong> Basic logs needed to operate the service (errors, timestamps).</li>
          </ul>
          <p className="text-foreground/80 leading-relaxed">
            We do <strong>not</strong> require you to create an account, and we do not collect your name,
            email, phone number, or location.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3. How We Use Your Data</h2>
          <p className="text-foreground/80 leading-relaxed">
            Your question and image are sent to a trusted AI model provider solely to generate a
            solution and return it to you. We do not use your content to train AI models, and we do
            not sell your data to third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. Data Retention</h2>
          <p className="text-foreground/80 leading-relaxed">
            Questions and images are processed in real time and are not stored permanently on our
            servers. Temporary processing logs are kept only as long as needed for reliability and
            abuse prevention.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. Children's Privacy</h2>
          <p className="text-foreground/80 leading-relaxed">
            Our service is intended for students. We do not knowingly collect personal information
            from children. If you are a parent or guardian and have concerns, please contact us.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. Security</h2>
          <p className="text-foreground/80 leading-relaxed">
            We use modern encryption (HTTPS) for all data in transit. While we take reasonable steps
            to protect your information, no internet service can guarantee absolute security.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">7. Changes to this Policy</h2>
          <p className="text-foreground/80 leading-relaxed">
            We may update this policy from time to time. The "Last updated" date at the top of this
            page indicates when changes were made.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">8. Contact</h2>
          <p className="text-foreground/80 leading-relaxed">
            For any questions about this policy, please use the contact form on our{" "}
            <Link to="/#contact" className="text-primary hover:underline">homepage</Link>.
          </p>
        </section>

        <div className="pt-6">
          <Link to="/" className="text-primary hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
