import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is Ilm Ka Saathi free to use?",
    a: "Yes, Ilm Ka Saathi is completely free. You can solve as many homework questions as you like without paying anything.",
  },
  {
    q: "Which subjects are supported?",
    a: "We support Math (ریاضی), Science (سائنس), English, Urdu (اردو), and General Knowledge. You can also ask questions about history, grammar, and other school subjects.",
  },
  {
    q: "Can I get answers in Urdu?",
    a: "Yes! Use the Urdu / English toggle on the homepage. The full step-by-step solution will be written in the language you choose.",
  },
  {
    q: "How do I upload a question?",
    a: "You have four options: take a photo with your camera, pick an image from your gallery, paste an image or text from your clipboard (Ctrl+V), or simply type your question into the text box.",
  },
  {
    q: "My photo is blurry — will it still work?",
    a: "For best results, take a clear, well-lit photo with the question in focus. If the image is hard to read, typing or pasting the question text usually works better.",
  },
  {
    q: "Is my photo stored on your servers?",
    a: "Your image is sent securely to our AI service only to read and solve the question. We do not keep a public gallery of uploaded images. See our Privacy Policy for details.",
  },
  {
    q: "Why did I get an error when solving?",
    a: "This usually happens due to a slow internet connection or a very large image. Try again with a smaller image (under 8MB) or retype the question as text.",
  },
  {
    q: "Can I use it on my phone?",
    a: "Yes, Ilm Ka Saathi works on any phone, tablet, or computer with a modern browser — no app download needed.",
  },
];

const Faq = () => {
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
              <p className="text-xs text-muted-foreground">FAQ</p>
            </div>
          </Link>
          <Link to="/" className="text-sm text-primary inline-flex items-center gap-1 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>
      </header>

      <main className="container max-w-3xl py-10 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">
            Common questions about using Ilm Ka Saathi — the free AI homework helper.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="text-sm text-muted-foreground">
          Still have a question? <Link to="/contact" className="text-primary hover:underline">Contact us</Link> anytime.
        </p>
      </main>
    </div>
  );
};

export default Faq;
