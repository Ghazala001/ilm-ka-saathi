import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { image, subject } = await req.json();
    if (!image || !subject) {
      return new Response(JSON.stringify({ error: "image and subject are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `You are an expert homework tutor for students. The user will upload a photo of a homework question in the subject: ${subject}.

Your task:
1. Carefully read and extract the question from the image (OCR).
2. Solve the question step by step.
3. Respond ENTIRELY IN URDU (اردو). Do not use English except for mathematical symbols, numbers, formulas, or unavoidable technical terms.
4. Format your answer clearly using markdown:
   - **سوال:** (the extracted question)
   - **حل:** (step-by-step solution with numbered steps)
   - **جواب:** (final answer)
5. Use simple, clear Urdu that a school student can understand.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              { type: "text", text: `براہ کرم اس ${subject} کے سوال کو حل کریں۔` },
              { type: "image_url", image_url: { url: image } },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "بہت زیادہ درخواستیں۔ براہ کرم تھوڑی دیر بعد کوشش کریں۔" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "کریڈٹس ختم ہو گئے ہیں۔ براہ کرم ورک اسپیس میں کریڈٹس شامل کریں۔" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const solution = data.choices?.[0]?.message?.content ?? "";

    return new Response(JSON.stringify({ solution }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("solve-homework error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
