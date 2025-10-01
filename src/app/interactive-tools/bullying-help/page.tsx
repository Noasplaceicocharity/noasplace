"use client";

import { useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";

export default function BullyingHelpPage() {
  const [formData, setFormData] = useState({
    childName: "",
    feelings: [] as string[],
    feelingsText: "",
    whatHappened: "",
    whereItHappened: "",
    whoCanHelp: [] as string[],
    whoCanHelpText: "",
    safeSpaces: [] as string[],
    safeSpacesText: "",
    copingStrategies: [] as string[],
    copingStrategiesText: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const feelingsOptions = [
    { id: "sad", label: "Sad", icon: "😢", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "scared", label: "Scared", icon: "😰", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "angry", label: "Angry", icon: "😠", color: "bg-red-100 hover:bg-red-200" },
    { id: "confused", label: "Confused", icon: "😕", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "lonely", label: "Lonely", icon: "😔", color: "bg-gray-100 hover:bg-gray-200" },
    { id: "worried", label: "Worried", icon: "😟", color: "bg-orange-100 hover:bg-orange-200" }
  ];

  const helpersOptions = [
    { id: "mum", label: "Mum", icon: "👩", color: "bg-pink-100 hover:bg-pink-200" },
    { id: "dad", label: "Dad", icon: "👨", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "teacher", label: "Teacher", icon: "👩‍🏫", color: "bg-green-100 hover:bg-green-200" },
    { id: "friend", label: "Friend", icon: "👦", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "grandparent", label: "Grandparent", icon: "👴", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "other-family", label: "Other Family", icon: "👪", color: "bg-indigo-100 hover:bg-indigo-200" }
  ];

  const safeSpacesOptions = [
    { id: "home", label: "Home", icon: "🏠", color: "bg-green-100 hover:bg-green-200" },
    { id: "classroom", label: "Classroom", icon: "🏫", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "library", label: "Library", icon: "📚", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "playground", label: "Playground", icon: "🛝", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "office", label: "School Office", icon: "🏢", color: "bg-red-100 hover:bg-red-200" },
    { id: "other-safe", label: "Other Safe Place", icon: "⭐", color: "bg-pink-100 hover:bg-pink-200" }
  ];

  const copingOptions = [
    { id: "talk", label: "Talk to Someone", icon: "💬", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "breathe", label: "Take Deep Breaths", icon: "🫁", color: "bg-green-100 hover:bg-green-200" },
    { id: "draw", label: "Draw Pictures", icon: "🎨", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "play", label: "Play Games", icon: "🎮", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "hug", label: "Get a Hug", icon: "🤗", color: "bg-pink-100 hover:bg-pink-200" },
    { id: "music", label: "Listen to Music", icon: "🎵", color: "bg-indigo-100 hover:bg-indigo-200" }
  ];

  const handleMultiSelect = (field: keyof typeof formData, value: string) => {
    const currentValues = formData[field] as string[];
    if (currentValues.includes(value)) {
      setFormData({
        ...formData,
        [field]: currentValues.filter(item => item !== value)
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...currentValues, value]
      });
    }
  };

  const handleTextInput = (field: keyof typeof formData, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      let yPosition = margin;

      // Helper function to add text with word wrapping
      const addText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
        pdf.setFontSize(fontSize);
        if (isBold) {
          pdf.setFont(undefined, 'bold');
        } else {
          pdf.setFont(undefined, 'normal');
        }
        
        const lines = pdf.splitTextToSize(text, contentWidth);
        const lineHeight = fontSize * 0.4;
        
        lines.forEach((line: string) => {
          if (yPosition > 270) {
            pdf.addPage();
            yPosition = margin;
          }
          pdf.text(line, margin, yPosition);
          yPosition += lineHeight;
        });
        
        yPosition += 3; // Extra spacing after text block
      };

      // Title
      pdf.setFillColor(100, 149, 237); // Cornflower blue
      pdf.rect(margin, yPosition, contentWidth, 15, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.text('WHEN SOMEONE IS UNKIND - HELP PLAN', margin + 5, yPosition + 10);
      yPosition += 25;
      
      // Reset text color
      pdf.setTextColor(0, 0, 0);

      // Child's Name
      addText(`Child's Name: ${formData.childName || 'Not filled in'}`, 14, true);
      yPosition += 5;

      // Feelings
      addText('How I Feel:', 14, true);
      if (formData.feelings.length > 0) {
        const selectedFeelings = feelingsOptions
          .filter(f => formData.feelings.includes(f.id))
          .map(f => `• ${f.label}`)
          .join('\n');
        addText(selectedFeelings);
      } else {
        addText('• Not filled in');
      }
      if (formData.feelingsText) {
        addText(`Other feelings: ${formData.feelingsText}`);
      }
      yPosition += 5;

      // What Happened
      addText('What Happened:', 14, true);
      addText(formData.whatHappened || 'Not filled in');
      yPosition += 5;

      // Where It Happened
      addText('Where It Happened:', 14, true);
      addText(formData.whereItHappened || 'Not filled in');
      yPosition += 5;

      // Who Can Help
      addText('Who Can Help Me:', 14, true);
      if (formData.whoCanHelp.length > 0) {
        const selectedHelpers = helpersOptions
          .filter(h => formData.whoCanHelp.includes(h.id))
          .map(h => `• ${h.label}`)
          .join('\n');
        addText(selectedHelpers);
      } else {
        addText('• Not filled in');
      }
      if (formData.whoCanHelpText) {
        addText(`Other people who can help: ${formData.whoCanHelpText}`);
      }
      yPosition += 5;

      // Safe Spaces
      addText('Where I Feel Safe:', 14, true);
      if (formData.safeSpaces.length > 0) {
        const selectedSpaces = safeSpacesOptions
          .filter(s => formData.safeSpaces.includes(s.id))
          .map(s => `• ${s.label}`)
          .join('\n');
        addText(selectedSpaces);
      } else {
        addText('• Not filled in');
      }
      if (formData.safeSpacesText) {
        addText(`Other places where I feel safe: ${formData.safeSpacesText}`);
      }
      yPosition += 5;

      // Coping Strategies
      addText('What Makes Me Feel Better:', 14, true);
      if (formData.copingStrategies.length > 0) {
        const selectedCoping = copingOptions
          .filter(c => formData.copingStrategies.includes(c.id))
          .map(c => `• ${c.label}`)
          .join('\n');
        addText(selectedCoping);
      } else {
        addText('• Not filled in');
      }
      if (formData.copingStrategiesText) {
        addText(`Other things that make me feel better: ${formData.copingStrategiesText}`);
      }

      // Footer
      yPosition += 15;
      pdf.setFontSize(10);
      pdf.setTextColor(128, 128, 128);
      addText('Created with Noa\'s Place Interactive Tools - www.noasplace.org.uk', 10);

      // Save the PDF
      const fileName = `${formData.childName || 'Child'}_When_Someone_Is_Unkind_Plan.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="bg-background text-ink min-h-screen">
      {/* Hero Section */}
      <section className="relative isolate min-h-[300px] overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500">
        <div className="absolute inset-0 bg-blue-600/20"></div>
        
        <div className="relative px-6 pt-16 pb-8 sm:pt-20 sm:pb-12">
          <div className="mx-auto max-w-4xl text-center">
            {/* Back button */}
            <div className="mb-6">
              <Link 
                href="/interactive-tools"
                className="inline-flex items-center gap-2 text-white hover:text-blue-100 font-medium transition duration-200"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5"/>
                  <path d="M12 19l-7-7 7-7"/>
                </svg>
                Back to Interactive Tools
              </Link>
            </div>
            
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30">
              <svg className="size-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            
            <h1 className="text-4xl font-black text-white sm:text-5xl md:text-6xl mb-6 drop-shadow-lg">
              When Someone Is Unkind
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto drop-shadow-md">
              A simple tool to help children talk about unkind behaviour with their parents and carers
            </p>
          </div>
        </div>
      </section>

      {/* Parent/Carer Guidance */}
      <section className="py-8 bg-blue-50 border-b">
        <div className="mx-auto max-w-4xl px-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="size-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-800 mb-2">For Parents and Carers</h3>
                <p className="text-blue-700 text-sm leading-relaxed">
                  This tool uses simple words and pictures to help your child talk about their experiences with unkind behaviour. 
                  Sit with them as they fill it out, and help them by reading the questions and explaining the pictures. 
                  This isn't a test - it's a way to start important conversations and plan how to help your child feel safe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Disclaimer */}
      <section className="py-8 bg-green-50 border-b">
        <div className="mx-auto max-w-4xl px-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="size-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 2l-2 2m-2 2l-2 2"/>
                    <path d="M15 2l2 2m2 2l2 2"/>
                    <circle cx="12" cy="13" r="8"/>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-green-800 mb-2">🔒 Your Privacy is Protected</h3>
                <p className="text-green-700 text-sm leading-relaxed">
                  <strong>Important:</strong> All information you enter in this form stays completely private and secure. 
                  We do not store, save, or share any of your personal details on our website or servers. Everything 
                  you type is only saved when you download your plan as a PDF file to your own device. Your privacy 
                  and your child's privacy are our top priority.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-12">
            
            {/* Child's Name */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👋</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">What's your name?</h2>
              </div>
              <input
                type="text"
                value={formData.childName}
                onChange={(e) => setFormData({...formData, childName: e.target.value})}
                placeholder="My name is..."
                className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
              />
            </div>

            {/* Feelings */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💝</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">How do you feel?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on all the feelings that match how you feel:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {feelingsOptions.map((feeling) => (
                  <button
                    key={feeling.id}
                    onClick={() => handleMultiSelect('feelings', feeling.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.feelings.includes(feeling.id)
                        ? 'border-blue-400 bg-blue-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${feeling.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{feeling.icon}</div>
                      <div className="font-semibold text-gray-700">{feeling.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other feelings you have:
                </label>
                <textarea
                  value={formData.feelingsText}
                  onChange={(e) => handleTextInput('feelingsText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about any other feelings you have..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* What Happened */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">What happened?</h2>
              </div>
              <p className="text-gray-600 mb-4">Tell us what happened (your grown-up can help you write):</p>
              <textarea
                value={formData.whatHappened}
                onChange={(e) => setFormData({...formData, whatHappened: e.target.value})}
                placeholder="Someone said... or Someone did..."
                rows={4}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none resize-none"
              />
            </div>

            {/* Where It Happened */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📍</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">Where did it happen?</h2>
              </div>
              <input
                type="text"
                value={formData.whereItHappened}
                onChange={(e) => setFormData({...formData, whereItHappened: e.target.value})}
                placeholder="At school, on the playground, in the classroom..."
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none"
              />
            </div>

            {/* Who Can Help */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">Who can help you?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on all the people who can help you:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {helpersOptions.map((helper) => (
                  <button
                    key={helper.id}
                    onClick={() => handleMultiSelect('whoCanHelp', helper.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.whoCanHelp.includes(helper.id)
                        ? 'border-purple-400 bg-purple-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${helper.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{helper.icon}</div>
                      <div className="font-semibold text-gray-700">{helper.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other people who can help you:
                </label>
                <textarea
                  value={formData.whoCanHelpText}
                  onChange={(e) => handleTextInput('whoCanHelpText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other people who can help you..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Safe Spaces */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">Where do you feel safe?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on all the places where you feel safe:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {safeSpacesOptions.map((space) => (
                  <button
                    key={space.id}
                    onClick={() => handleMultiSelect('safeSpaces', space.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.safeSpaces.includes(space.id)
                        ? 'border-green-400 bg-green-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${space.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{space.icon}</div>
                      <div className="font-semibold text-gray-700">{space.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other places where you feel safe:
                </label>
                <textarea
                  value={formData.safeSpacesText}
                  onChange={(e) => handleTextInput('safeSpacesText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other places where you feel safe..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Coping Strategies */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">What makes you feel better?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on things that help you feel better when you're upset:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {copingOptions.map((coping) => (
                  <button
                    key={coping.id}
                    onClick={() => handleMultiSelect('copingStrategies', coping.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.copingStrategies.includes(coping.id)
                        ? 'border-yellow-400 bg-yellow-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${coping.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{coping.icon}</div>
                      <div className="font-semibold text-gray-700">{coping.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other things that make you feel better:
                </label>
                <textarea
                  value={formData.copingStrategiesText}
                  onChange={(e) => handleTextInput('copingStrategiesText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other things that help you feel better when you're upset..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                    Download My When Someone Is Unkind Plan PDF
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
