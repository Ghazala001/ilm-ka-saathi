import { useRef, useState } from "react";
import { Upload, Loader2, BookOpen, Sparkles, ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Subject = "Math" | "Science" | "English";

const SUBJECTS: { id: Subject; label: string; urdu: string }[] = [
  { id: "Math", label: "Math", urdu: "ریاضی" },
  { id: "Science", label: "Science", urdu: "سائنس" },
  { id: "English", label: "English", urdu: "انگریزی" },
];

const Index = () => {
  const [subject, setSubject] = useState<Subject>("Math");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [solution, setSolution] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Image must be under 8MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setImageBase64(result);
      setSolution("");
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImagePreview(null);
    setImageBase64(null);
    setSolution("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const solve = async () => {
    if (!imageBase64) {
      toast.error("Please upload a homework photo first");
      return;
    }
    setLoading(true);
    setSolution("");
    try {
      const { data, error } = await supabase.functions.invoke("solve-homework", {
        body: { image: imageBase64, subject },
      });
      if (error) throw error;
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      setSolution(data?.solution ?? "");
    } catch (e) {
      console.error(e);
      toast.error("Could not solve the question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-10">
        <div className="container max-w-4xl flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-primary-glow grid place-items-center shadow-[var(--shadow-elegant)]">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Homework Helper</h1>
              <p className="text-xs text-muted-foreground">اردو میں جوابات</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> AI powered
          </div>
        </div>
      </header>

      <main className="container max-w-4xl py-8 space-y-6">
        <section className="text-center space-y-2 py-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Snap. Solve. <span className="text-primary">Learn.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Upload a photo of any homework question and get a clear, step-by-step solution in Urdu.
          </p>
        </section>

        <Card className="p-5 sm:p-6 shadow-[var(--shadow-card)] border-border/60">
          <label className="text-sm font-semibold mb-3 block">Choose subject</label>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {SUBJECTS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSubject(s.id)}
                className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all ${
                  subject === s.id
                    ? "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground border-transparent shadow-[var(--shadow-elegant)]"
                    : "bg-background hover:bg-accent border-border"
                }`}
              >
                <div>{s.label}</div>
                <div className={`text-xs mt-0.5 urdu ${subject === s.id ? "opacity-90" : "text-muted-foreground"}`}>
                  {s.urdu}
                </div>
              </button>
            ))}
          </div>

          <label className="text-sm font-semibold mb-3 block">Upload homework photo</label>
          {!imagePreview ? (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-border rounded-2xl p-10 text-center hover:border-primary hover:bg-accent/40 transition-colors group"
            >
              <div className="mx-auto h-14 w-14 rounded-2xl bg-accent grid place-items-center mb-3 group-hover:scale-105 transition-transform">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium">Click to upload an image</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 8MB</p>
            </button>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-border bg-muted">
              <img src={imagePreview} alt="Homework question preview" className="w-full max-h-80 object-contain" />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/90 backdrop-blur grid place-items-center hover:bg-background shadow"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />

          <Button
            onClick={solve}
            disabled={!imageBase64 || loading}
            className="w-full mt-5 h-12 text-base bg-gradient-to-r from-primary to-primary-glow hover:opacity-95 shadow-[var(--shadow-elegant)]"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Solving...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" /> Solve in Urdu
              </>
            )}
          </Button>
        </Card>

        <Card className="p-5 sm:p-7 shadow-[var(--shadow-card)] border-border/60 min-h-[280px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Solution</h3>
            <span className="text-xs text-muted-foreground urdu">حل</span>
          </div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
              <p className="text-sm">Reading your question and preparing the answer...</p>
            </div>
          ) : solution ? (
            <div className="urdu text-xl sm:text-2xl text-foreground whitespace-pre-wrap break-words">
              {solution}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground text-center">
              <ImageIcon className="h-10 w-10 mb-3 opacity-50" />
              <p className="text-sm">Your step-by-step solution will appear here in Urdu.</p>
            </div>
          )}
        </Card>

        <p className="text-center text-xs text-muted-foreground pb-6">
          Built for students • Powered by AI
        </p>
      </main>
    </div>
  );
};

export default Index;
