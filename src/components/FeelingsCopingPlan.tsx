"use client";

import { useState } from "react";
import jsPDF from "jspdf";

interface CopingPlanData {
  name: string;
  age: string;
  school: string;
  whatMakesMeAnxious: string[];
  thingsThatHelpMeCalmDown: string[];
  peopleICanTalkTo: string[];
  favouriteActivitiesThatHelp: string[];
  warningSignsImUpset: string[];
  emergencyContacts: string[];
}

const initialData: CopingPlanData = {
  name: "",
  age: "",
  school: "",
  whatMakesMeAnxious: [""],
  thingsThatHelpMeCalmDown: [""],
  peopleICanTalkTo: [""],
  favouriteActivitiesThatHelp: [""],
  warningSignsImUpset: [""],
  emergencyContacts: [""],
};

export default function FeelingsCopingPlan() {
  const [planData, setPlanData] = useState<CopingPlanData>(initialData);
  const [isGenerating, setIsGenerating] = useState(false);

  const updateField = (field: keyof CopingPlanData, value: string | string[]) => {
    setPlanData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addItemToArray = (field: keyof CopingPlanData) => {
    if (Array.isArray(planData[field])) {
      updateField(field, [...(planData[field] as string[]), ""]);
    }
  };

  const updateArrayItem = (field: keyof CopingPlanData, index: number, value: string) => {
    if (Array.isArray(planData[field])) {
      const newArray = [...(planData[field] as string[])];
      newArray[index] = value;
      updateField(field, newArray);
    }
  };

  const removeArrayItem = (field: keyof CopingPlanData, index: number) => {
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
      pdf.text("My Calm Down Plan", pageWidth / 2, yPosition, { align: "center" });
      yPosition += 15;

      pdf.setFontSize(12);
      pdf.setFont(undefined, "normal");
      pdf.text("Feelings & Coping Resource", pageWidth / 2, yPosition, { align: "center" });
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
        "What Makes Me Anxious", 
        planData.whatMakesMeAnxious,
        "Things, situations, or thoughts that make me feel worried or stressed"
      );

      addSection(
        "Things That Help Me Calm Down", 
        planData.thingsThatHelpMeCalmDown,
        "Strategies and techniques that help me feel more relaxed and peaceful"
      );

      addSection(
        "People I Can Talk To When Upset", 
        planData.peopleICanTalkTo,
        "Trusted people who listen and support me when I'm having difficult feelings"
      );

      addSection(
        "Favourite Activities That Help", 
        planData.favouriteActivitiesThatHelp,
        "Things I enjoy doing that make me feel better and help me cope"
      );

      addSection(
        "Warning Signs I'm Getting Upset", 
        planData.warningSignsImUpset,
        "How I can tell when I'm starting to feel overwhelmed or anxious"
      );

      addSection(
        "Emergency Contacts", 
        planData.emergencyContacts,
        "Important people to contact if I need immediate help or support"
      );

      // Instructions for use
      if (yPosition > 220) {
        pdf.addPage();
        yPosition = margin;
      }
      yPosition += 10;
      pdf.setFontSize(14);
      pdf.setFont(undefined, "bold");
      pdf.text("How to Use This Plan", margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(11);
      pdf.setFont(undefined, "normal");
      const instructions = [
        "• Keep this plan somewhere you can easily find it",
        "• Share it with trusted adults at home and school",
        "• Use your coping strategies when you notice warning signs",
        "• Remember: it's okay to ask for help when you need it",
        "• Update this plan as you discover new things that help"
      ];

      instructions.forEach(instruction => {
        if (yPosition > 270) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(instruction, margin, yPosition);
        yPosition += 8;
      });

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
      pdf.text("Remember: Your feelings are valid, and support is always available.", pageWidth / 2, yPosition + 18, { align: "center" });

      // Save the PDF
      pdf.save(`${planData.name || "My"}_Calm_Down_Plan.pdf`);
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
    field: keyof CopingPlanData,
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
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-brand-800 mb-4">Create Your Feelings & Coping Plan</h2>
        <p className="text-ink/80 mb-4">
          This tool helps you understand your emotions and create personalised strategies for managing difficult feelings. 
          Fill in each section with things that are specific to you. When finished, download your "My Calm Down Plan" 
          to share with family and school staff.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="bg-white/80 px-3 py-1 rounded-full text-brand-800 font-medium">✓ Completely Private</span>
          <span className="bg-white/80 px-3 py-1 rounded-full text-brand-800 font-medium">✓ Save as PDF</span>
          <span className="bg-white/80 px-3 py-1 rounded-full text-brand-800 font-medium">✓ Share with Support Team</span>
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

      {/* Coping Plan Sections */}
      <div className="space-y-8">
        {renderArrayInputs(
          "whatMakesMeAnxious",
          "What Makes Me Anxious",
          "Think about situations, people, places, or thoughts that make you feel worried, stressed, or uncomfortable.",
          "Anxiety trigger"
        )}

        {renderArrayInputs(
          "thingsThatHelpMeCalmDown",
          "Things That Help Me Calm Down",
          "List strategies, techniques, or actions that help you feel more relaxed and peaceful when you're upset.",
          "Calming strategy"
        )}

        {renderArrayInputs(
          "peopleICanTalkTo",
          "People I Can Talk To When Upset",
          "Include family members, friends, teachers, counsellors, or other trusted adults who listen and support you.",
          "Trusted person"
        )}

        {renderArrayInputs(
          "favouriteActivitiesThatHelp",
          "Favourite Activities That Help",
          "Things you enjoy doing that make you feel better - hobbies, sports, creative activities, or relaxing pastimes.",
          "Helpful activity"
        )}

        {renderArrayInputs(
          "warningSignsImUpset",
          "Warning Signs I'm Getting Upset",
          "How can you tell when you're starting to feel overwhelmed? Physical feelings, thoughts, or behaviours that are early warning signs.",
          "Warning sign"
        )}

        {renderArrayInputs(
          "emergencyContacts",
          "Emergency Contacts",
          "Important people to contact if you need immediate help or are in crisis. Include phone numbers if comfortable.",
          "Emergency contact"
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
              Download My Calm Down Plan PDF
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
      <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <svg className="size-6 text-green-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12l2 2 4-4"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
          <div>
            <h4 className="font-bold text-green-900 mb-2">Remember</h4>
            <p className="text-green-800 text-sm leading-relaxed">
              Your feelings are completely normal and valid. Everyone experiences difficult emotions sometimes. 
              This plan is here to help you, and the adults in your life want to support you. Don't hesitate 
              to reach out for help when you need it - that's what the trusted people in your life are there for.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
