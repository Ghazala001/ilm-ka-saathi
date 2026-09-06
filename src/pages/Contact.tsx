import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    const subject = encodeURIComponent(`Ilm Ka Saathi — Message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:contact@ilmkasafar.com?subject=${subject}&body=${body}`;
    toast({ title: "Opening your email app…" });
  };

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
              <p className="text-xs text-muted-foreground">Contact Us</p>
            </div>
          </Link>
          <Link to="/" className="text-sm text-primary inline-flex items-center gap-1 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>
      </header>

      <main className="container max-w-xl py-10 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Contact Us</h1>
          <p className="text-muted-foreground">
            Have a question, suggestion, or found a problem? Send us a message — we read every one.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-border/60 bg-card p-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Your Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ayesha Khan" maxLength={100} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" maxLength={200} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your message here…" rows={5} maxLength={2000} />
          </div>
          <Button type="submit" className="w-full">
            <Send className="h-4 w-4 mr-2" /> Send Message
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground inline-flex items-center justify-center gap-2 w-full">
          <Mail className="h-4 w-4" /> contact@ilmkasafar.com
        </p>
      </main>
    </div>
  );
};

export default Contact;
