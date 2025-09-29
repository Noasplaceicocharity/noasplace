"use client";

import { useState } from "react";
import jsPDF from "jspdf";

interface SafetyPlanData {
  name: string;
  age: string;
  school: string;
  safeSpacesAtSchool: string[];
  trustedAdults: string[];
  whatToSayIfBullied: string[];
  onlineStepsIfBullied: string[];
  emergencyContacts: string[];
  personalStrengths: string[];
  copingStrategies: string[];
}

const initialData: SafetyPlanData = {
  name: "",
  age: "",
  school: "",
  safeSpacesAtSchool: [""],
  trustedAdults: [""],
  whatToSayIfBullied: [""],
  onlineStepsIfBullied: [""],
  emergencyContacts: [""],
  personalStrengths: [""],
  copingStrategies: [""],
};

export default function SafetyPlanBuilder() {
  const [planData, setPlanData] = useState<SafetyPlanData>(initialData);
  const [isGenerating, setIsGenerating] = useState(false);

  const updateField = (field: keyof SafetyPlanData, value: string | string[]) => {
    setPlanData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addItemToArray = (field: keyof SafetyPlanData) => {
    if (Array.isArray(planData[field])) {
      updateField(field, [...(planData[field] as string[]), ""]);
    }
  };

  const updateArrayItem = (field: keyof SafetyPlanData, index: number, value: string) => {
    if (Array.isArray(planData[field])) {
      const newArray = [...(planData[field] as string[])];
      newArray[index] = value;
      updateField(field, newArray);
    }
  };

  const removeArrayItem = (field: keyof SafetyPlanData, index: number) => {
    if (Array.isArray(planData[field])) {
      const newArray = (planData[field] as string[]).filter((_, i) => i !== index);
      updateField(field, newArray.length > 0 ? newArray : [""]);
    }
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      let yPosition = margin;

      // Header
      pdf.setFontSize(24);
      pdf.setFont(undefined, "bold");
      pdf.text("My Personal Safety Plan", pageWidth / 2, yPosition, { align: "center" });
      yPosition += 15;

      pdf.setFontSize(12);
      pdf.setFont(undefined, "normal");
      pdf.text("Anti-Bullying Resource", pageWidth / 2, yPosition, { align: "center" });
      yPosition += 20;

      // Personal Information
      pdf.setFontSize(16);
      pdf.setFont(undefined, "bold");
      pdf.text("Personal Information", margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(12);
      pdf.setFont(undefined, "normal");
      if (planData.name) {
        pdf.text(`Name: ${planData.name}`, margin, yPosition);
        yPosition += 8;
      }
      if (planData.age) {
        pdf.text(`Age: ${planData.age}`, margin, yPosition);
        yPosition += 8;
      }
      if (planData.school) {
        pdf.text(`School: ${planData.school}`, margin, yPosition);
        yPosition += 8;
      }
      yPosition += 10;

      // Helper function to add sections
      const addSection = (title: string, items: string[], description?: string) => {
        // Check if we need a new page
        if (yPosition > 250) {
          pdf.addPage();
          yPosition = margin;
        }

        pdf.setFontSize(16);
        pdf.setFont(undefined, "bold");
        pdf.text(title, margin, yPosition);
        yPosition += 10;

        if (description) {
          pdf.setFontSize(10);
          pdf.setFont(undefined, "italic");
          const lines = pdf.splitTextToSize(description, contentWidth);
          pdf.text(lines, margin, yPosition);
          yPosition += lines.length * 5 + 5;
        }

        pdf.setFontSize(12);
        pdf.setFont(undefined, "normal");
        
        const validItems = items.filter(item => item.trim() !== "");
        if (validItems.length > 0) {
          validItems.forEach((item, index) => {
            if (yPosition > 270) {
              pdf.addPage();
              yPosition = margin;
            }
            pdf.text(`${index + 1}. ${item}`, margin + 5, yPosition);
            yPosition += 8;
          });
        } else {
          pdf.text("(To be filled in)", margin + 5, yPosition);
          yPosition += 8;
        }
        yPosition += 10;
      };

      // Add all sections
      addSection(
        "Safe Spaces at School", 
        planData.safeSpacesAtSchool,
        "Places where I feel safe and can go if I'm being bullied"
      );

      addSection(
        "Trusted Adults", 
        planData.trustedAdults,
        "People I can talk to if I'm experiencing bullying"
      );

      addSection(
        "What to Say if Bullied", 
        planData.whatToSayIfBullied,
        "Phrases and responses I can use when facing bullying"
      );

      addSection(
        "Online Steps if Bullied", 
        planData.onlineStepsIfBullied,
        "Actions I can take if I experience cyberbullying"
      );

      addSection(
        "Emergency Contacts", 
        planData.emergencyContacts,
        "Important people to contact in serious situations"
      );

      addSection(
        "My Personal Strengths", 
        planData.personalStrengths,
        "Things I'm good at and positive qualities about myself"
      );

      addSection(
        "Coping Strategies", 
        planData.copingStrategies,
        "Things I can do to feel better and manage difficult emotions"
      );

      // Footer
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = margin;
      }
      yPosition += 20;
      pdf.setFontSize(10);
      pdf.setFont(undefined, "italic");
      pdf.text("Created with Noa's Place Interactive Tools", pageWidth / 2, yPosition, { align: "center" });
      pdf.text("www.noasplace.org.uk", pageWidth / 2, yPosition + 8, { align: "center" });
      pdf.text("Remember: You are never alone, and help is always available.", pageWidth / 2, yPosition + 18, { align: "center" });

      // Save the PDF
      pdf.save(`${planData.name || "My"}_Safety_Plan.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating your PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const clearForm = () => {
    setPlanData(initialData);
  };

  const renderArrayInputs = (
    field: keyof SafetyPlanData,
    title: string,
    description: string,
    placeholder: string
  ) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-100">
      <h3 className="text-xl font-bold text-brand-800 mb-2">{title}</h3>
      <p className="text-ink/70 text-sm mb-4">{description}</p>
      
      {(planData[field] as string[]).map((item, index) => (
        <div key={index} className="flex gap-3 mb-3">
          <div className="flex-1">
            <input
              type="text"
              value={item}
              onChange={(e) => updateArrayItem(field, index, e.target.value)}
              placeholder={`${placeholder} ${index + 1}`}
              className="w-full px-4 py-3 border border-brand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>
          {(planData[field] as string[]).length > 1 && (
            <button
              type="button"
              onClick={() => removeArrayItem(field, index)}
              className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-xl transition duration-200"
              aria-label="Remove item"
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6"/>
              </svg>
            </button>
          )}
        </div>
      ))}
      
      <button
        type="button"
        onClick={() => addItemToArray(field)}
        className="flex items-center gap-2 px-4 py-2 text-brand-800 hover:bg-brand-50 rounded-xl transition duration-200"
      >
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        Add Another
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Introduction */}
      <div className="bg-gradient-to-r from-brand-50 to-brand-100/50 rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-brand-800 mb-4">Create Your Anti-Bullying Safety Plan</h2>
        <p className="text-ink/80 mb-4">
          This interactive tool helps you create a personalised safety plan for dealing with bullying. 
          Fill in each section with information that's relevant to you. When you're finished, you can 
          download your plan as a PDF to keep with you.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="bg-white/80 px-3 py-1 rounded-full text-brand-800 font-medium">✓ Completely Private</span>
          <span className="bg-white/80 px-3 py-1 rounded-full text-brand-800 font-medium">✓ Save as PDF</span>
          <span className="bg-white/80 px-3 py-1 rounded-full text-brand-800 font-medium">✓ Free to Use</span>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-100 mb-8">
        <h3 className="text-xl font-bold text-brand-800 mb-4">Personal Information</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={planData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-brand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-ink mb-2">
              Your Age
            </label>
            <input
              id="age"
              type="text"
              value={planData.age}
              onChange={(e) => updateField("age", e.target.value)}
              placeholder="Enter your age"
              className="w-full px-4 py-3 border border-brand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="school" className="block text-sm font-medium text-ink mb-2">
              Your School
            </label>
            <input
              id="school"
              type="text"
              value={planData.school}
              onChange={(e) => updateField("school", e.target.value)}
              placeholder="Enter your school name"
              className="w-full px-4 py-3 border border-brand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Safety Plan Sections */}
      <div className="space-y-8">
        {renderArrayInputs(
          "safeSpacesAtSchool",
          "Safe Places at School",
          "Think about places at school where you feel safe and comfortable. These might be classrooms, the library, counsellor's office, or anywhere with trusted adults.",
          "Safe place"
        )}

        {renderArrayInputs(
          "trustedAdults",
          "Trusted Adults",
          "List adults you can talk to if you're experiencing bullying. This might include teachers, family members, counsellors, or other support people.",
          "Trusted adult"
        )}

        {renderArrayInputs(
          "whatToSayIfBullied",
          "What to Say if Bullied",
          "Practice responses you can use when facing bullying. These should be calm, confident phrases that help you stay safe.",
          "Response"
        )}

        {renderArrayInputs(
          "onlineStepsIfBullied",
          "Online Steps if Bullied",
          "List actions you can take if you experience cyberbullying. This might include blocking, reporting, saving evidence, or telling an adult.",
          "Online action"
        )}

        {renderArrayInputs(
          "emergencyContacts",
          "Emergency Contacts",
          "Important people to contact in serious situations. Include phone numbers if you feel comfortable doing so.",
          "Emergency contact"
        )}

        {renderArrayInputs(
          "personalStrengths",
          "My Personal Strengths",
          "Write down things you're good at and positive qualities about yourself. Remember these when you're feeling down.",
          "Personal strength"
        )}

        {renderArrayInputs(
          "copingStrategies",
          "Coping Strategies",
          "List healthy ways you can manage stress and difficult emotions. This might include exercise, art, music, talking to friends, or relaxation techniques.",
          "Coping strategy"
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="inline-flex items-center justify-center px-8 py-4 bg-[#FFB800] hover:bg-[#ffc533] text-ink font-bold rounded-xl shadow-lg hover:scale-105 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-ink" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating PDF...
            </>
          ) : (
            <>
              <svg className="mr-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              Download My Safety Plan PDF
            </>
          )}
        </button>

        <button
          onClick={clearForm}
          className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-ink font-bold rounded-xl border-2 border-brand-200 hover:border-brand-300 transition duration-200"
        >
          <svg className="mr-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"/>
          </svg>
          Clear Form
        </button>
      </div>

      {/* Important Notice */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <svg className="size-6 text-blue-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
          <div>
            <h4 className="font-bold text-blue-900 mb-2">Important Information</h4>
            <p className="text-blue-800 text-sm leading-relaxed">
              If you're experiencing bullying, remember that it's not your fault and you deserve support. 
              Always tell a trusted adult about what's happening. In emergencies, don't hesitate to contact 
              emergency services or a crisis helpline. This safety plan is a tool to help you, but it's not 
              a replacement for professional support when needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
