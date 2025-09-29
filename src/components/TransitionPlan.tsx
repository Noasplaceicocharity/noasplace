"use client";

import { useState } from "react";
import jsPDF from "jspdf";

interface TransitionPlanData {
  name: string;
  age: string;
  school: string;
  transitionType: string;
  transitionDate: string;
  thingsImExcitedAbout: string[];
  thingsImWorriedAbout: string[];
  whoCanHelpMe: string[];
  myDailyRoutine: string[];
  strategiesToStayCalm: string[];
  questionsIHave: string[];
}

const initialData: TransitionPlanData = {
  name: "",
  age: "",
  school: "",
  transitionType: "",
  transitionDate: "",
  thingsImExcitedAbout: [""],
  thingsImWorriedAbout: [""],
  whoCanHelpMe: [""],
  myDailyRoutine: [""],
  strategiesToStayCalm: [""],
  questionsIHave: [""],
};

export default function TransitionPlan() {
  const [planData, setPlanData] = useState<TransitionPlanData>(initialData);
  const [isGenerating, setIsGenerating] = useState(false);

  const updateField = (field: keyof TransitionPlanData, value: string | string[]) => {
    setPlanData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addItemToArray = (field: keyof TransitionPlanData) => {
    if (Array.isArray(planData[field])) {
      updateField(field, [...(planData[field] as string[]), ""]);
    }
  };

  const updateArrayItem = (field: keyof TransitionPlanData, index: number, value: string) => {
    if (Array.isArray(planData[field])) {
      const newArray = [...(planData[field] as string[])];
      newArray[index] = value;
      updateField(field, newArray);
    }
  };

  const removeArrayItem = (field: keyof TransitionPlanData, index: number) => {
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
      pdf.text("My Transition Support Plan", pageWidth / 2, yPosition, { align: "center" });
      yPosition += 15;

      pdf.setFontSize(12);
      pdf.setFont(undefined, "normal");
      pdf.text("Transition Planning Resource", pageWidth / 2, yPosition, { align: "center" });
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
      if (planData.transitionType) {
        pdf.text(`Transition: ${planData.transitionType}`, margin, yPosition);
        yPosition += 8;
      }
      if (planData.transitionDate) {
        pdf.text(`Date: ${planData.transitionDate}`, margin, yPosition);
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
        "Things I'm Excited About", 
        planData.thingsImExcitedAbout,
        "Positive aspects of my transition that I'm looking forward to"
      );

      addSection(
        "Things I'm Worried About", 
        planData.thingsImWorriedAbout,
        "Concerns or anxieties I have about this transition"
      );

      addSection(
        "Who Can Help Me", 
        planData.whoCanHelpMe,
        "People I can turn to for support during this transition"
      );

      addSection(
        "My Daily Routine", 
        planData.myDailyRoutine,
        "Important parts of my routine that help me feel comfortable and secure"
      );

      addSection(
        "Strategies to Stay Calm", 
        planData.strategiesToStayCalm,
        "Things I can do when I feel anxious or overwhelmed during the transition"
      );

      addSection(
        "Questions I Have", 
        planData.questionsIHave,
        "Things I'd like to know more about regarding my transition"
      );

      // Tips for successful transition
      if (yPosition > 220) {
        pdf.addPage();
        yPosition = margin;
      }
      yPosition += 10;
      pdf.setFontSize(14);
      pdf.setFont(undefined, "bold");
      pdf.text("Tips for a Successful Transition", margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(11);
      pdf.setFont(undefined, "normal");
      const tips = [
        "• Take one day at a time - transitions don't happen overnight",
        "• It's normal to feel excited and worried at the same time",
        "• Ask questions - there are no silly questions about your transition",
        "• Keep using your coping strategies that work for you",
        "• Talk to your support people when you need help",
        "• Celebrate small victories along the way"
      ];

      tips.forEach(tip => {
        if (yPosition > 270) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(tip, margin, yPosition);
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
      pdf.text("Remember: Every transition is a chance to grow and discover new strengths.", pageWidth / 2, yPosition + 18, { align: "center" });

      // Save the PDF
      pdf.save(`${planData.name || "My"}_Transition_Support_Plan.pdf`);
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
    field: keyof TransitionPlanData,
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
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-brand-800 mb-4">Create Your Transition Support Plan</h2>
        <p className="text-ink/80 mb-4">
          Transitions can feel overwhelming, but having a plan helps! This tool helps you prepare for any change - 
          starting a new school, moving year groups, beginning college, starting a job, or any other transition. 
          Create your personalised "My Transition Support Plan" to reduce anxiety and feel more confident.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="bg-white/80 px-3 py-1 rounded-full text-brand-800 font-medium">✓ Completely Private</span>
          <span className="bg-white/80 px-3 py-1 rounded-full text-brand-800 font-medium">✓ Save as PDF</span>
          <span className="bg-white/80 px-3 py-1 rounded-full text-brand-800 font-medium">✓ Share with Support Team</span>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-100 mb-8">
        <h3 className="text-xl font-bold text-brand-800 mb-4">About My Transition</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
              Your School/Organisation
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
        
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <div>
            <label htmlFor="transitionType" className="block text-sm font-medium text-ink mb-2">
              Type of Transition
            </label>
            <input
              id="transitionType"
              type="text"
              value={planData.transitionType}
              onChange={(e) => updateField("transitionType", e.target.value)}
              placeholder="e.g., Starting secondary school, moving to Year 7, starting college"
              className="w-full px-4 py-3 border border-brand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="transitionDate" className="block text-sm font-medium text-ink mb-2">
              When is this happening?
            </label>
            <input
              id="transitionDate"
              type="text"
              value={planData.transitionDate}
              onChange={(e) => updateField("transitionDate", e.target.value)}
              placeholder="e.g., September 2024, Next month"
              className="w-full px-4 py-3 border border-brand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Transition Plan Sections */}
      <div className="space-y-8">
        {renderArrayInputs(
          "thingsImExcitedAbout",
          "Things I'm Excited About",
          "What are you looking forward to? New opportunities, meeting new people, learning new things, or any positive aspects of this change.",
          "Something exciting"
        )}

        {renderArrayInputs(
          "thingsImWorriedAbout",
          "Things I'm Worried About",
          "It's completely normal to have worries about transitions. What concerns do you have? Getting lost, making friends, harder work, or anything else?",
          "A worry"
        )}

        {renderArrayInputs(
          "whoCanHelpMe",
          "Who Can Help Me",
          "List people who can support you during this transition - family, friends, teachers, support workers, counsellors, or anyone else.",
          "Someone who helps"
        )}

        {renderArrayInputs(
          "myDailyRoutine",
          "My Daily Routine",
          "What parts of your routine are important to you? What helps you feel comfortable and organised throughout the day?",
          "Routine item"
        )}

        {renderArrayInputs(
          "strategiesToStayCalm",
          "Strategies to Stay Calm",
          "What helps you when you feel anxious or overwhelmed? Breathing exercises, fidget toys, quiet time, music, or other coping strategies?",
          "Calming strategy"
        )}

        {renderArrayInputs(
          "questionsIHave",
          "Questions I Have",
          "What would you like to know more about? No question is too small! Write down anything you're curious or unsure about.",
          "A question"
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
              Download My Transition Support Plan PDF
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
      <div className="mt-8 bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <svg className="size-6 text-orange-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <div>
            <h4 className="font-bold text-orange-900 mb-2">You've Got This!</h4>
            <p className="text-orange-800 text-sm leading-relaxed">
              Transitions can feel big and scary, but remember that you've successfully navigated changes before. 
              It's perfectly normal to feel excited and worried at the same time. Use this plan to help you prepare, 
              and don't forget that there are always people ready to support you along the way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
