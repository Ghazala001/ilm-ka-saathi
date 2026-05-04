import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { image, text, subject, language } = await req.json();
    if ((!image && !text) || !subject) {
      return new Response(JSON.stringify({ error: "image or text, and subject are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const lang = language === "English" ? "English" : "Urdu";

    const systemPrompt = lang === "Urdu"
      ? `You are an expert tutor and knowledgeable assistant for students. The user will provide a question (as a photo, typed text, or both). The selected subject/topic is: ${subject}.

Your task:
1. If an image is provided, carefully read and extract the question (OCR). If text is also provided, treat it as the question or as additional context.
2. Answer ANY question the student asks — this includes homework problems in Math, Science, English, Urdu, as well as general knowledge, current affairs, Islamic knowledge, history, geography, biographies, definitions, vocabulary, grammar, essays, translations, or any other student query. Never refuse a reasonable student question by saying it's outside the subject — use the selected subject only as context, not as a restriction.
3. Solve / answer step by step where applicable. For factual questions, give a clear, accurate, well-structured answer.
4. Respond ENTIRELY IN URDU (اردو). Do not use English except for mathematical symbols, numbers, formulas, proper nouns, or unavoidable technical terms.
5. Format your answer clearly using markdown:
   - **سوال:** (the question)
   - **جواب / حل:** (step-by-step solution or detailed answer)
   - **خلاصہ:** (final answer / short summary)
6. Use simple, clear Urdu that a school student can understand.`
      : `You are an expert tutor and knowledgeable assistant for students. The user will provide a question (as a photo, typed text, or both). The selected subject/topic is: ${subject}.

Your task:
1. If an image is provided, carefully read and extract the question (OCR). If text is also provided, treat it as the question or as additional context.
2. Answer ANY question the student asks — homework in Math, Science, English, Urdu, as well as general knowledge, current affairs, Islamic knowledge, history, geography, biographies, definitions, grammar, essays, translations, or any other student query. Never refuse a reasonable student question by saying it's outside the subject — use the selected subject only as context, not as a restriction.
3. Solve / answer step by step where applicable. For factual questions, give a clear, accurate, well-structured answer.
4. Respond ENTIRELY IN ENGLISH using simple, clear language a school student can understand.
5. Format your answer clearly using markdown:
   - **Question:** (the question)
   - **Solution / Answer:** (step-by-step solution or detailed answer)
   - **Summary:** (final answer / short summary)`;

    const userContent: any[] = [];
    const promptText = lang === "Urdu"
      ? (text ? `براہ کرم اس ${subject} کے سوال کو حل کریں:\n\n${text}` : `براہ کرم اس ${subject} کے سوال کو حل کریں۔`)
      : (text ? `Please solve this ${subject} question:\n\n${text}` : `Please solve this ${subject} question.`);
    userContent.push({ type: "text", text: promptText });
    if (image) {
      userContent.push({ type: "image_url", image_url: { url: image } });
    }

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
          { role: "user", content: userContent },
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
