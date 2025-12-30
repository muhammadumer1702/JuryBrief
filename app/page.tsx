"use client";

import React, { useState } from "react";

const GARMENT_OPTIONS = [
  "Avant-garde",
  "Cocktail",
  "Evening wear",
  "Bridal",
  "Ready-to-wear",
  "Experimental",
  "Couture",
];

type FormState = {
  projectTitle: string;
  designDiscipline: string;
  theme: string;
  inspiration: string;
  keywords: string;
  targetAudience: string;
  garmentCategory: string[];
  colorPalette: string;
  materialPreference: string;
  specialInstructions: string;
};

export default function Home() {
  const [form, setForm] = useState<FormState>({
    projectTitle: "",
    designDiscipline: "Fashion Design",
    theme: "",
    inspiration: "",
    keywords: "",
    targetAudience: "",
    garmentCategory: [],
    colorPalette: "",
    materialPreference: "",
    specialInstructions: "",
  });
  const [result, setResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // For text/textarea/select fields
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (name === "garmentCategory" && type === "checkbox") {
      setForm((prev) => {
        const selected = new Set(prev.garmentCategory);
        if ((e.target as HTMLInputElement).checked) {
          selected.add(value);
        } else {
          selected.delete(value);
        }
        return { ...prev, garmentCategory: Array.from(selected) };
      });
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
  
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
    
      const data = await res.json();
      console.log("FRONTEND RECEIVED:", data);
      setResult(data.output);
    } catch (error) {
      console.error("Error generating explanation:", error);
    } finally {
      setIsGenerating(false);
    }
  };
  

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#131316",
        fontFamily: "serif",
        color: "#eee",
      }}
    >
      <div
        style={{
          background: "#1a1a1f",
          padding: "2.5rem 2rem 2rem 2rem",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.24)",
          maxWidth: 490,
          width: "100%",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            margin: 0,
            fontSize: 38,
            color: "#fafaff",
            letterSpacing: 1,
          }}
        >
          JuryBrief
        </h1>
        <p
          style={{
            textAlign: "center",
            margin: "0 0 1.5rem 0",
            color: "#d9dde7",
            fontSize: 18,
          }}
        >
          Turn your design concepts into clear, jury-ready explanations.
        </p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <label>
            Project Title
            <input
              type="text"
              name="projectTitle"
              value={form.projectTitle}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                marginTop: 4,
                marginBottom: 8,
                padding: 8,
                background: "#212127",
                color: "#fafaff",
                border: "1px solid #4d4e55",
                borderRadius: 4,
              }}
            />
          </label>

          <label>
            Design Discipline
            <select
              name="designDiscipline"
              value={form.designDiscipline}
              onChange={handleChange}
              style={{
                width: "100%",
                marginTop: 4,
                marginBottom: 8,
                padding: 8,
                background: "#212127",
                color: "#fafaff",
                border: "1px solid #4d4e55",
                borderRadius: 4,
              }}
            >
              <option>Fashion Design</option>
              <option>Textile Design</option>
              <option>Apparel Design</option>
            </select>
          </label>

          <label>
            Theme / Core Concept
            <textarea
              name="theme"
              value={form.theme}
              onChange={handleChange}
              rows={2}
              required
              style={{
                width: "100%",
                marginTop: 4,
                marginBottom: 8,
                padding: 8,
                background: "#212127",
                color: "#fafaff",
                border: "1px solid #4d4e55",
                borderRadius: 4,
              }}
            />
          </label>

          <label>
            Inspiration Source
            <textarea
              name="inspiration"
              value={form.inspiration}
              onChange={handleChange}
              rows={2}
              required
              style={{
                width: "100%",
                marginTop: 4,
                marginBottom: 8,
                padding: 8,
                background: "#212127",
                color: "#fafaff",
                border: "1px solid #4d4e55",
                borderRadius: 4,
              }}
            />
          </label>

          <label>
            Keywords / Mood Words
            <input
              type="text"
              name="keywords"
              value={form.keywords}
              onChange={handleChange}
              required
              placeholder="e.g. minimal, vibrant, futuristic"
              style={{
                width: "100%",
                marginTop: 4,
                marginBottom: 8,
                padding: 8,
                background: "#212127",
                color: "#fafaff",
                border: "1px solid #4d4e55",
                borderRadius: 4,
              }}
            />
          </label>

          <label>
            Target Audience
            <input
              type="text"
              name="targetAudience"
              value={form.targetAudience}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                marginTop: 4,
                marginBottom: 8,
                padding: 8,
                background: "#212127",
                color: "#fafaff",
                border: "1px solid #4d4e55",
                borderRadius: 4,
              }}
            />
          </label>

          <fieldset
            style={{
              border: "none",
              padding: 0,
              margin: 0,
              marginBottom: 8,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <legend style={{ marginBottom: 4, fontWeight: 500 }}>
              Garment Category (Select all that apply)
            </legend>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {GARMENT_OPTIONS.map((cat) => (
                <label key={cat} style={{ display: "flex", alignItems: "center", gap: 4, background: "#212127", borderRadius: 3, border: '1px solid #4d4e55', padding: "2px 7px" }}>
                  <input
                    type="checkbox"
                    name="garmentCategory"
                    value={cat}
                    checked={form.garmentCategory.includes(cat)}
                    onChange={handleChange}
                    style={{ accentColor: "#2662d2", marginRight: 4, width: 15, height: 15 }}
                  />
                  <span style={{ color: "#e7e7ec", fontSize: 15 }}>{cat}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label>
            Color Palette (optional)
            <input
              type="text"
              name="colorPalette"
              value={form.colorPalette}
              onChange={handleChange}
              placeholder="e.g. navy, white, gold"
              style={{
                width: "100%",
                marginTop: 4,
                marginBottom: 8,
                padding: 8,
                background: "#212127",
                color: "#fafaff",
                border: "1px solid #4d4e55",
                borderRadius: 4,
              }}
            />
          </label>

          <label>
            Fabric / Material Preference (optional)
            <input
              type="text"
              name="materialPreference"
              value={form.materialPreference}
              onChange={handleChange}
              placeholder="e.g. silk, denim, upcycled materials"
              style={{
                width: "100%",
                marginTop: 4,
                marginBottom: 8,
                padding: 8,
                background: "#212127",
                color: "#fafaff",
                border: "1px solid #4d4e55",
                borderRadius: 4,
              }}
            />
          </label>

          <label>
            Special Instructions (optional)
            <textarea
              name="specialInstructions"
              value={form.specialInstructions}
              onChange={handleChange}
              rows={2}
              style={{
                width: "100%",
                marginTop: 4,
                marginBottom: 8,
                padding: 8,
                background: "#212127",
                color: "#fafaff",
                border: "1px solid #4d4e55",
                borderRadius: 4,
              }}
            />
          </label>

          <button
            type="submit"
            style={{
              marginTop: 10,
              padding: "12px 0",
              background: "#2662d2",
              color: "#fafaff",
              border: "1.5px solid #517de0",
              borderRadius: 5,
              fontSize: 17,
              fontWeight: 600,
              letterSpacing: 0.05,
              cursor: "pointer",
              transition: "background 0.12s",
            }}
          >
            Generate Jury Explanation
          </button>
        </form>
        {(result || isGenerating) && (
          <div style={{ marginTop: "40px", whiteSpace: "pre-wrap" }}>
            <h2 style={{ marginBottom: "12px", color: "#fafaff" }}>Jury Explanation</h2>
            {isGenerating ? (
              <p style={{ color: "#9ca3af", fontStyle: "italic" }}>Updating jury explanation…</p>
            ) : (
              <div style={{ opacity: 1 }}>
                <p style={{ color: "#e7e7ec", lineHeight: "1.6" }}>{result}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
