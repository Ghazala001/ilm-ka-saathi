import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Camera, Languages, ListChecks } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-10">
        <div className="container max-w-4xl flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-primary-glow grid place-items-center shadow-[var(--shadow-elegant)]">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Ilm Ka Saathi</h1>
              <p className="text-xs text-muted-foreground">About Us</p>
            </div>
          </Link>
          <Link to="/" className="text-sm text-primary inline-flex items-center gap-1 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>
      </header>

      <main className="container max-w-3xl py-10 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">About Ilm Ka Saathi</h1>
          <p className="text-muted-foreground leading-relaxed">
            Ilm Ka Saathi is a free AI homework helper built for students. Upload a photo of any
            homework question — or simply type or paste it — and get a clear step-by-step solution
            in Urdu or English.
          </p>
        </div>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-2">
            <Camera className="h-6 w-6 text-primary" />
            <h2 className="font-semibold">Photo, Text or Paste</h2>
            <p className="text-sm text-muted-foreground">
              Snap a photo, choose from your gallery, paste from clipboard, or type your question.
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-2">
            <ListChecks className="h-6 w-6 text-primary" />
            <h2 className="font-semibold">Step-by-Step Answers</h2>
            <p className="text-sm text-muted-foreground">
              Every solution is explained step by step so students actually learn, not just copy.
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-2">
            <Languages className="h-6 w-6 text-primary" />
            <h2 className="font-semibold">Urdu &amp; English</h2>
            <p className="text-sm text-muted-foreground">
              Choose your language — get the full solution in Urdu (اردو) or English.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Subjects We Cover</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Mathematics (ریاضی)</li>
            <li>Science (سائنس)</li>
            <li>English</li>
            <li>Urdu (اردو)</li>
            <li>General Knowledge (جنرل نالج)</li>
            <li>History, Grammar and other school subjects</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our mission is to make quality learning help available to every student, in the language
            they understand best. Ilm Ka Saathi is free to use and always will be.
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;
