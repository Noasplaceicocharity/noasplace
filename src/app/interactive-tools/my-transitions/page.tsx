"use client";

import { useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";

export default function MyTransitionsPage() {
  const [formData, setFormData] = useState({
    childName: "",
    adultName: "",
    adultRole: "",
    transitionType: "",
    transitionDetails: "",
    transitionDate: "",
    
    // Current feelings about the change
    currentFeelings: [] as string[],
    currentFeelingsText: "",
    
    // What they know about the change
    whatIKnow: [] as string[],
    whatIKnowText: "",
    
    // What they're worried about
    worries: [] as string[],
    worriesText: "",
    
    // What they're excited about
    excited: [] as string[],
    excitedText: "",
    
    // What would help
    whatWouldHelp: [] as string[],
    whatWouldHelpText: "",
    
    // Who can help
    whoCanHelp: [] as string[],
    whoCanHelpText: "",
    
    // Questions they have
    questions: "",
    
    // Special things to remember
    specialThings: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const transitionTypeOptions = [
    { id: "new-school", label: "Starting a New School", icon: "🏫" },
    { id: "new-class", label: "Moving to a New Class", icon: "📚" },
    { id: "new-teacher", label: "Getting a New Teacher", icon: "👩‍🏫" },
    { id: "moving-house", label: "Moving to a New House", icon: "🏠" },
    { id: "new-baby", label: "Having a New Baby in Family", icon: "👶" },
    { id: "parents-separate", label: "Parents Living Apart", icon: "👨‍👩‍👧‍👦" },
    { id: "hospital-visit", label: "Going to Hospital", icon: "🏥" },
    { id: "new-routine", label: "New Daily Routine", icon: "⏰" },
    { id: "holiday", label: "Going on Holiday", icon: "✈️" },
    { id: "other", label: "Something Else", icon: "❓" }
  ];

  const feelingsOptions = [
    { id: "happy", label: "Happy", icon: "😊", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "excited", label: "Excited", icon: "🤩", color: "bg-orange-100 hover:bg-orange-200" },
    { id: "nervous", label: "Nervous", icon: "😰", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "scared", label: "Scared", icon: "😨", color: "bg-red-100 hover:bg-red-200" },
    { id: "sad", label: "Sad", icon: "😢", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "confused", label: "Confused", icon: "😕", color: "bg-gray-100 hover:bg-gray-200" },
    { id: "curious", label: "Curious", icon: "🤔", color: "bg-green-100 hover:bg-green-200" },
    { id: "calm", label: "Calm", icon: "😌", color: "bg-teal-100 hover:bg-teal-200" }
  ];

  const whatIKnowOptions = [
    { id: "when-happening", label: "When it's happening", icon: "📅" },
    { id: "where-going", label: "Where I'm going", icon: "📍" },
    { id: "who-with", label: "Who will be with me", icon: "👥" },
    { id: "what-expect", label: "What to expect", icon: "👀" },
    { id: "how-long", label: "How long it will take", icon: "⏱️" },
    { id: "what-bring", label: "What to bring", icon: "🎒" },
    { id: "who-help", label: "Who can help me", icon: "🤝" },
    { id: "nothing-yet", label: "I don't know much yet", icon: "❓" }
  ];

  const worriesOptions = [
    { id: "making-friends", label: "Making new friends", icon: "👫" },
    { id: "getting-lost", label: "Getting lost", icon: "🗺️" },
    { id: "being-different", label: "Being different", icon: "🌟" },
    { id: "missing-old", label: "Missing my old place/people", icon: "💭" },
    { id: "not-knowing", label: "Not knowing what to do", icon: "❓" },
    { id: "being-alone", label: "Being alone", icon: "😔" },
    { id: "new-rules", label: "Learning new rules", icon: "📋" },
    { id: "no-worries", label: "I'm not worried", icon: "😊" }
  ];

  const excitedOptions = [
    { id: "new-adventures", label: "New adventures", icon: "🌟" },
    { id: "meeting-people", label: "Meeting new people", icon: "👋" },
    { id: "learning-things", label: "Learning new things", icon: "📚" },
    { id: "new-places", label: "Seeing new places", icon: "🏞️" },
    { id: "growing-up", label: "Growing up", icon: "📏" },
    { id: "new-activities", label: "Trying new activities", icon: "🎨" },
    { id: "fresh-start", label: "Having a fresh start", icon: "🌱" },
    { id: "not-excited", label: "I'm not excited yet", icon: "😐" }
  ];

  const whatWouldHelpOptions = [
    { id: "visit-first", label: "Visiting the new place first", icon: "👀" },
    { id: "meet-people", label: "Meeting new people beforehand", icon: "🤝" },
    { id: "bring-comfort", label: "Bringing something special with me", icon: "🧸" },
    { id: "practice-routine", label: "Practicing the new routine", icon: "🔄" },
    { id: "talk-about", label: "Talking about it more", icon: "💬" },
    { id: "make-plan", label: "Making a plan together", icon: "📋" },
    { id: "take-photos", label: "Taking photos of the new place", icon: "📸" },
    { id: "gradual-change", label: "Changing things slowly", icon: "🐌" }
  ];

  const whoCanHelpOptions = [
    { id: "mum", label: "Mum", icon: "👩" },
    { id: "dad", label: "Dad", icon: "👨" },
    { id: "teacher", label: "Teacher", icon: "👩‍🏫" },
    { id: "grandparent", label: "Grandparent", icon: "👴" },
    { id: "sibling", label: "Brother/Sister", icon: "👦" },
    { id: "friend", label: "Friend", icon: "👫" },
    { id: "school-helper", label: "School Helper", icon: "🏫" },
    { id: "nurse", label: "Nurse", icon: "👩‍⚕️" }
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
      pdf.setFillColor(34, 197, 94); // Green
      pdf.rect(margin, yPosition, contentWidth, 15, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.text('MY TRANSITIONS PLAN', margin + 5, yPosition + 10);
      yPosition += 25;
      
      // Reset text color
      pdf.setTextColor(0, 0, 0);

      // Basic Information
      addText('About This Transition:', 14, true);
      addText(`Child's Name: ${formData.childName || 'Not filled in'}`);
      addText(`Adult Helper: ${formData.adultName || 'Not filled in'} (${formData.adultRole || 'Not specified'})`);
      addText(`What's Changing: ${formData.transitionDetails || 'Not filled in'}`);
      if (formData.transitionDate) addText(`When: ${formData.transitionDate}`);
      yPosition += 5;

      // Current Feelings
      addText('How I Feel About This Change:', 14, true);
      if (formData.currentFeelings.length > 0) {
        const selectedFeelings = feelingsOptions
          .filter(f => formData.currentFeelings.includes(f.id))
          .map(f => `• ${f.label}`)
          .join('\n');
        addText(selectedFeelings);
      } else {
        addText('• No feelings selected');
      }
      if (formData.currentFeelingsText) {
        addText(`Other feelings: ${formData.currentFeelingsText}`);
      }
      yPosition += 5;

      // What I Know
      addText('What I Know About This Change:', 14, true);
      if (formData.whatIKnow.length > 0) {
        const selectedKnow = whatIKnowOptions
          .filter(k => formData.whatIKnow.includes(k.id))
          .map(k => `• ${k.label}`)
          .join('\n');
        addText(selectedKnow);
      } else {
        addText('• Nothing selected');
      }
      if (formData.whatIKnowText) {
        addText(`Other things I know: ${formData.whatIKnowText}`);
      }
      yPosition += 5;

      // Worries
      addText('What I\'m Worried About:', 14, true);
      if (formData.worries.length > 0) {
        const selectedWorries = worriesOptions
          .filter(w => formData.worries.includes(w.id))
          .map(w => `• ${w.label}`)
          .join('\n');
        addText(selectedWorries);
      } else {
        addText('• No worries selected');
      }
      if (formData.worriesText) {
        addText(`Other worries: ${formData.worriesText}`);
      }
      yPosition += 5;

      // Excited About
      addText('What I\'m Excited About:', 14, true);
      if (formData.excited.length > 0) {
        const selectedExcited = excitedOptions
          .filter(e => formData.excited.includes(e.id))
          .map(e => `• ${e.label}`)
          .join('\n');
        addText(selectedExcited);
      } else {
        addText('• Nothing selected');
      }
      if (formData.excitedText) {
        addText(`Other things I'm excited about: ${formData.excitedText}`);
      }
      yPosition += 5;

      // What Would Help
      addText('What Would Help Me:', 14, true);
      if (formData.whatWouldHelp.length > 0) {
        const selectedHelp = whatWouldHelpOptions
          .filter(h => formData.whatWouldHelp.includes(h.id))
          .map(h => `• ${h.label}`)
          .join('\n');
        addText(selectedHelp);
      } else {
        addText('• Nothing selected');
      }
      if (formData.whatWouldHelpText) {
        addText(`Other things that would help: ${formData.whatWouldHelpText}`);
      }
      yPosition += 5;

      // Who Can Help
      addText('Who Can Help Me:', 14, true);
      if (formData.whoCanHelp.length > 0) {
        const selectedPeople = whoCanHelpOptions
          .filter(p => formData.whoCanHelp.includes(p.id))
          .map(p => `• ${p.label}`)
          .join('\n');
        addText(selectedPeople);
      } else {
        addText('• No one selected');
      }
      if (formData.whoCanHelpText) {
        addText(`Other people who can help: ${formData.whoCanHelpText}`);
      }
      yPosition += 5;

      // Questions
      if (formData.questions) {
        addText('My Questions:', 14, true);
        addText(formData.questions);
        yPosition += 5;
      }

      // Special Things
      if (formData.specialThings) {
        addText('Special Things to Remember:', 14, true);
        addText(formData.specialThings);
      }

      // Footer
      yPosition += 15;
      pdf.setFontSize(10);
      pdf.setTextColor(128, 128, 128);
      addText('Created with Noa\'s Place Interactive Tools - www.noasplace.org.uk', 10);

      // Save the PDF
      const fileName = `${formData.childName || 'Child'}_Transitions_Plan.pdf`;
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
      <section className="relative isolate min-h-[300px] overflow-hidden bg-gradient-to-r from-green-500 to-teal-500">
        <div className="absolute inset-0 bg-green-600/20"></div>
        
        <div className="relative px-6 pt-16 pb-8 sm:pt-20 sm:pb-12">
          <div className="mx-auto max-w-4xl text-center">
            {/* Back button */}
            <div className="mb-6">
              <Link 
                href="/interactive-tools"
                className="inline-flex items-center gap-2 text-white hover:text-green-100 font-medium transition duration-200"
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
                <path d="M21 7L9 19l-5.5-5.5"/>
                <path d="M21 7l-6-6"/>
                <path d="M9 19l6 6"/>
                <circle cx="12" cy="12" r="1"/>
              </svg>
            </div>
            
            <h1 className="text-4xl font-black text-white sm:text-5xl md:text-6xl mb-6 drop-shadow-lg">
              My Transitions
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto drop-shadow-md">
              Help children understand and prepare for new things happening in their life
            </p>
          </div>
        </div>
      </section>

      {/* Parent/Carer Guidance */}
      <section className="py-8 bg-green-50 border-b">
        <div className="mx-auto max-w-4xl px-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="size-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-green-800 mb-2">For Parents, Carers, Teachers & Nurses</h3>
                <p className="text-green-700 text-sm leading-relaxed">
                  This tool can be used each time something new is happening in a child's life. It helps you understand 
                  how they're feeling about the change and what support they need. Use it for school transitions, 
                  moving house, family changes, medical appointments, or any new situation. The completed form can be 
                  shared with other professionals to ensure consistent support.
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
            
            {/* Basic Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">About This Change</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Child's name</label>
                    <input
                      type="text"
                      value={formData.childName}
                      onChange={(e) => setFormData({...formData, childName: e.target.value})}
                      placeholder="What's your name?"
                      className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Adult helper's name</label>
                    <input
                      type="text"
                      value={formData.adultName}
                      onChange={(e) => setFormData({...formData, adultName: e.target.value})}
                      placeholder="Who is helping you?"
                      className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adult helper is my...</label>
                  <input
                    type="text"
                    value={formData.adultRole}
                    onChange={(e) => setFormData({...formData, adultRole: e.target.value})}
                    placeholder="Mum, Dad, Teacher, Nurse, etc."
                    className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">What kind of change is happening?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {transitionTypeOptions.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setFormData({...formData, transitionType: type.id})}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          formData.transitionType === type.id
                            ? 'border-green-400 bg-green-50 scale-105'
                            : 'border-gray-200 hover:border-gray-300'
                        } bg-white hover:bg-gray-50`}
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-2">{type.icon}</div>
                          <div className="font-semibold text-gray-700 text-sm">{type.label}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tell me more about what's happening</label>
                  <textarea
                    value={formData.transitionDetails}
                    onChange={(e) => setFormData({...formData, transitionDetails: e.target.value})}
                    placeholder="Describe what's changing..."
                    rows={3}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">When is this happening?</label>
                  <input
                    type="text"
                    value={formData.transitionDate}
                    onChange={(e) => setFormData({...formData, transitionDate: e.target.value})}
                    placeholder="Next week, in 2 months, etc."
                    className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Current Feelings */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💝</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">How do you feel about this change?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on all the feelings that match how you feel:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {feelingsOptions.map((feeling) => (
                  <button
                    key={feeling.id}
                    onClick={() => handleMultiSelect('currentFeelings', feeling.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.currentFeelings.includes(feeling.id)
                        ? 'border-green-400 bg-green-50 scale-105'
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
                  Other feelings you have about this change:
                </label>
                <textarea
                  value={formData.currentFeelingsText}
                  onChange={(e) => handleTextInput('currentFeelingsText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about any other feelings you have about this change..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* What I Know */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🧠</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">What do you know about this change?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on the things you already know:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {whatIKnowOptions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMultiSelect('whatIKnow', item.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.whatIKnow.includes(item.id)
                        ? 'border-blue-400 bg-blue-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } bg-blue-100 hover:bg-blue-200`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{item.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other things you know about this change:
                </label>
                <textarea
                  value={formData.whatIKnowText}
                  onChange={(e) => handleTextInput('whatIKnowText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other things you know about this change..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Worries */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">😟</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">What are you worried about?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on any worries you have (it's okay to have worries!):</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {worriesOptions.map((worry) => (
                  <button
                    key={worry.id}
                    onClick={() => handleMultiSelect('worries', worry.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.worries.includes(worry.id)
                        ? 'border-orange-400 bg-orange-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } bg-orange-100 hover:bg-orange-200`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{worry.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{worry.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other worries you have:
                </label>
                <textarea
                  value={formData.worriesText}
                  onChange={(e) => handleTextInput('worriesText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about any other worries you have..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Excited About */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌟</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">What are you excited about?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on things that make you feel excited or happy:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {excitedOptions.map((excited) => (
                  <button
                    key={excited.id}
                    onClick={() => handleMultiSelect('excited', excited.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.excited.includes(excited.id)
                        ? 'border-yellow-400 bg-yellow-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } bg-yellow-100 hover:bg-yellow-200`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{excited.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{excited.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other things you're excited about:
                </label>
                <textarea
                  value={formData.excitedText}
                  onChange={(e) => handleTextInput('excitedText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other things that make you excited or happy..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* What Would Help */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">What would help you feel better?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on things that would make this change easier:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {whatWouldHelpOptions.map((help) => (
                  <button
                    key={help.id}
                    onClick={() => handleMultiSelect('whatWouldHelp', help.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.whatWouldHelp.includes(help.id)
                        ? 'border-purple-400 bg-purple-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } bg-purple-100 hover:bg-purple-200`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{help.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{help.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other things that would help you feel better:
                </label>
                <textarea
                  value={formData.whatWouldHelpText}
                  onChange={(e) => handleTextInput('whatWouldHelpText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other things that would make this change easier..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Who Can Help */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">Who can help you?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on all the people who can help you with this change:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {whoCanHelpOptions.map((person) => (
                  <button
                    key={person.id}
                    onClick={() => handleMultiSelect('whoCanHelp', person.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.whoCanHelp.includes(person.id)
                        ? 'border-teal-400 bg-teal-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } bg-teal-100 hover:bg-teal-200`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{person.icon}</div>
                      <div className="font-semibold text-gray-700">{person.label}</div>
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
                  placeholder="Tell us about other people who can help you with this change..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Questions */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">❓</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">Do you have any questions?</h2>
              </div>
              <textarea
                value={formData.questions}
                onChange={(e) => setFormData({...formData, questions: e.target.value})}
                placeholder="What would you like to know more about?"
                rows={4}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none"
              />
            </div>

            {/* Special Things */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">Special things to remember</h2>
              </div>
              <p className="text-gray-600 mb-4">Is there anything special about you that would help people understand you better?</p>
              <textarea
                value={formData.specialThings}
                onChange={(e) => setFormData({...formData, specialThings: e.target.value})}
                placeholder="Things that are important to you, things you like, things that help you feel calm..."
                rows={4}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none"
              />
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
                    Download My Transitions Plan PDF
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
