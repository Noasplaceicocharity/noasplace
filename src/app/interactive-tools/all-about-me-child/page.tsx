"use client";

import { useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";

export default function AllAboutMeChildPage() {
  const [formData, setFormData] = useState({
    childName: "",
    age: "",
    helperName: "",
    helperRole: "",
    
    // Basic Information
    favouriteThings: [] as string[],
    dislikes: [] as string[],
    hobbies: [] as string[],
    
    // How I Learn Best
    learningStyle: [] as string[],
    helpfulThings: [] as string[],
    
    // Things I Find Hard
    struggles: [] as string[],
    triggers: [] as string[],
    
    // How I Cope
    copingStrategies: [] as string[],
    calmingActivities: [] as string[],
    
    // Communication
    communicationStyle: [] as string[],
    communicationNeeds: "",
    
    // People Who Help Me
    supportPeople: [] as string[],
    
    // At School/Home
    schoolNeeds: [] as string[],
    homeRoutines: "",
    
    // Health and Safety
    medicalInfo: "",
    allergies: "",
    safetyNeeds: "",
    
    // Special Notes
    importantInfo: "",
    goals: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const favouriteOptions = [
    { id: "animals", label: "Animals", icon: "🐕", color: "bg-green-100" },
    { id: "books", label: "Books", icon: "📚", color: "bg-blue-100" },
    { id: "music", label: "Music", icon: "🎵", color: "bg-purple-100" },
    { id: "art", label: "Drawing/Art", icon: "🎨", color: "bg-pink-100" },
    { id: "sports", label: "Sports", icon: "⚽", color: "bg-orange-100" },
    { id: "games", label: "Games", icon: "🎮", color: "bg-red-100" },
    { id: "nature", label: "Nature", icon: "🌳", color: "bg-green-100" },
    { id: "technology", label: "Computers/Tablets", icon: "💻", color: "bg-gray-100" }
  ];

  const dislikeOptions = [
    { id: "loud-noises", label: "Loud Noises", icon: "🔊", color: "bg-red-100" },
    { id: "crowds", label: "Busy Places", icon: "👥", color: "bg-yellow-100" },
    { id: "changes", label: "Sudden Changes", icon: "🔄", color: "bg-orange-100" },
    { id: "bright-lights", label: "Bright Lights", icon: "💡", color: "bg-yellow-100" },
    { id: "certain-foods", label: "Certain Foods", icon: "🍽️", color: "bg-red-100" },
    { id: "waiting", label: "Waiting", icon: "⏰", color: "bg-blue-100" },
    { id: "interruptions", label: "Being Interrupted", icon: "✋", color: "bg-purple-100" },
    { id: "mess", label: "Messy Things", icon: "🧹", color: "bg-gray-100" }
  ];

  const learningOptions = [
    { id: "visual", label: "Pictures and Diagrams", icon: "👁️", color: "bg-blue-100" },
    { id: "hands-on", label: "Doing Things", icon: "✋", color: "bg-green-100" },
    { id: "quiet", label: "Quiet Places", icon: "🤫", color: "bg-purple-100" },
    { id: "routine", label: "Same Routine", icon: "📅", color: "bg-orange-100" },
    { id: "breaks", label: "Regular Breaks", icon: "⏸️", color: "bg-yellow-100" },
    { id: "one-on-one", label: "One-to-One Help", icon: "👥", color: "bg-pink-100" },
    { id: "movement", label: "Moving Around", icon: "🏃", color: "bg-red-100" },
    { id: "repetition", label: "Doing Things Again", icon: "🔄", color: "bg-gray-100" }
  ];

  const helpfulOptions = [
    { id: "clear-instructions", label: "Clear Instructions", icon: "📋", color: "bg-blue-100" },
    { id: "extra-time", label: "Extra Time", icon: "⏰", color: "bg-green-100" },
    { id: "reminders", label: "Gentle Reminders", icon: "🔔", color: "bg-yellow-100" },
    { id: "encouragement", label: "Encouragement", icon: "👏", color: "bg-pink-100" },
    { id: "choices", label: "Having Choices", icon: "🤔", color: "bg-purple-100" },
    { id: "warning", label: "Warning Before Changes", icon: "⚠️", color: "bg-orange-100" },
    { id: "fidget-toys", label: "Fidget Toys", icon: "🧸", color: "bg-red-100" },
    { id: "quiet-space", label: "Quiet Space", icon: "🏠", color: "bg-gray-100" }
  ];

  const strugglesOptions = [
    { id: "concentrating", label: "Concentrating", icon: "🧠", color: "bg-red-100" },
    { id: "sitting-still", label: "Sitting Still", icon: "💺", color: "bg-orange-100" },
    { id: "reading", label: "Reading", icon: "📖", color: "bg-blue-100" },
    { id: "writing", label: "Writing", icon: "✏️", color: "bg-green-100" },
    { id: "maths", label: "Maths", icon: "🔢", color: "bg-purple-100" },
    { id: "social-situations", label: "Playing with Others", icon: "👫", color: "bg-pink-100" },
    { id: "following-instructions", label: "Following Instructions", icon: "📋", color: "bg-yellow-100" },
    { id: "changes", label: "When Things Change", icon: "🔄", color: "bg-gray-100" }
  ];

  const copingOptions = [
    { id: "deep-breathing", label: "Deep Breathing", icon: "🫁", color: "bg-blue-100" },
    { id: "counting", label: "Counting to 10", icon: "🔢", color: "bg-green-100" },
    { id: "fidget-toy", label: "Using Fidget Toy", icon: "🧸", color: "bg-purple-100" },
    { id: "quiet-time", label: "Quiet Time", icon: "🤫", color: "bg-yellow-100" },
    { id: "talking", label: "Talking to Someone", icon: "💬", color: "bg-pink-100" },
    { id: "movement", label: "Moving Around", icon: "🏃", color: "bg-orange-100" },
    { id: "music", label: "Listening to Music", icon: "🎵", color: "bg-red-100" },
    { id: "drawing", label: "Drawing", icon: "🎨", color: "bg-gray-100" }
  ];

  const communicationOptions = [
    { id: "talking", label: "Talking", icon: "💬", color: "bg-blue-100" },
    { id: "pictures", label: "Pictures", icon: "🖼️", color: "bg-green-100" },
    { id: "writing", label: "Writing", icon: "✏️", color: "bg-purple-100" },
    { id: "gestures", label: "Hand Gestures", icon: "👋", color: "bg-yellow-100" },
    { id: "technology", label: "Tablet/Computer", icon: "💻", color: "bg-pink-100" },
    { id: "sign-language", label: "Sign Language", icon: "🤟", color: "bg-orange-100" },
    { id: "symbols", label: "Symbols", icon: "🔣", color: "bg-red-100" },
    { id: "quiet-voice", label: "Quiet Voice", icon: "🤫", color: "bg-gray-100" }
  ];

  const supportPeopleOptions = [
    { id: "mum-dad", label: "Mum/Dad", icon: "👨‍👩‍👧‍👦", color: "bg-pink-100" },
    { id: "teacher", label: "Teacher", icon: "👩‍🏫", color: "bg-blue-100" },
    { id: "teaching-assistant", label: "Teaching Assistant", icon: "👨‍🏫", color: "bg-green-100" },
    { id: "grandparents", label: "Grandparents", icon: "👴👵", color: "bg-purple-100" },
    { id: "siblings", label: "Brothers/Sisters", icon: "👫", color: "bg-yellow-100" },
    { id: "friends", label: "Friends", icon: "👭", color: "bg-orange-100" },
    { id: "support-worker", label: "Support Worker", icon: "👩‍⚕️", color: "bg-red-100" },
    { id: "counsellor", label: "School Counsellor", icon: "🧑‍💼", color: "bg-gray-100" }
  ];

  const schoolNeedsOptions = [
    { id: "visual-timetable", label: "Picture Timetable", icon: "📅", color: "bg-blue-100" },
    { id: "quiet-workspace", label: "Quiet Work Space", icon: "🏠", color: "bg-green-100" },
    { id: "movement-breaks", label: "Movement Breaks", icon: "🏃", color: "bg-orange-100" },
    { id: "clear-instructions", label: "Clear Instructions", icon: "📋", color: "bg-purple-100" },
    { id: "extra-time", label: "Extra Time", icon: "⏰", color: "bg-yellow-100" },
    { id: "buddy-system", label: "Buddy to Help", icon: "👫", color: "bg-pink-100" },
    { id: "sensory-tools", label: "Sensory Tools", icon: "🧸", color: "bg-red-100" },
    { id: "regular-check-ins", label: "Regular Check-ins", icon: "✅", color: "bg-gray-100" }
  ];

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

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
        const lineHeight = fontSize * 0.5;
        
        lines.forEach((line: string) => {
          if (yPosition > 280) {
            pdf.addPage();
            yPosition = margin;
          }
          pdf.text(line, margin, yPosition);
          yPosition += lineHeight;
        });
        
        yPosition += 5; // Extra spacing after text block
      };

      // Helper function to add selections
      const addSelections = (options: any[], selectedIds: string[], optionsArray: any[]) => {
        if (selectedIds.length > 0) {
          const selectedItems = optionsArray
            .filter(option => selectedIds.includes(option.id))
            .map(option => `• ${option.label}`)
            .join('\n');
          addText(selectedItems);
        } else {
          addText('• Not filled in');
        }
      };

      // Title
      pdf.setFillColor(59, 130, 246); // Blue
      pdf.rect(margin, yPosition, contentWidth, 15, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.text('ALL ABOUT ME PROFILE', margin + 5, yPosition + 10);
      yPosition += 25;
      
      // Reset text color
      pdf.setTextColor(0, 0, 0);

      // Basic Information
      addText('Basic Information:', 14, true);
      addText(`Name: ${formData.childName || 'Not filled in'}`);
      addText(`Age: ${formData.age || 'Not filled in'}`);
      addText(`Helper: ${formData.helperName || 'Not filled in'} (${formData.helperRole || 'Not specified'})`);
      yPosition += 5;

      // Favourite Things
      addText('Things I Love:', 14, true);
      addSelections(favouriteOptions, formData.favouriteThings, favouriteOptions);
      yPosition += 5;

      // Dislikes
      addText('Things I Don\'t Like:', 14, true);
      addSelections(dislikeOptions, formData.dislikes, dislikeOptions);
      yPosition += 5;

      // How I Learn Best
      addText('How I Learn Best:', 14, true);
      addSelections(learningOptions, formData.learningStyle, learningOptions);
      yPosition += 5;

      // Helpful Things
      addText('Things That Help Me:', 14, true);
      addSelections(helpfulOptions, formData.helpfulThings, helpfulOptions);
      yPosition += 5;

      // Things I Find Hard
      addText('Things I Find Hard:', 14, true);
      addSelections(strugglesOptions, formData.struggles, strugglesOptions);
      yPosition += 5;

      // How I Cope
      addText('How I Cope When Upset:', 14, true);
      addSelections(copingOptions, formData.copingStrategies, copingOptions);
      yPosition += 5;

      // Communication
      addText('How I Communicate:', 14, true);
      addSelections(communicationOptions, formData.communicationStyle, communicationOptions);
      if (formData.communicationNeeds) {
        addText(`Special communication needs: ${formData.communicationNeeds}`);
      }
      yPosition += 5;

      // Support People
      addText('People Who Help Me:', 14, true);
      addSelections(supportPeopleOptions, formData.supportPeople, supportPeopleOptions);
      yPosition += 5;

      // School Needs
      addText('What I Need at School:', 14, true);
      addSelections(schoolNeedsOptions, formData.schoolNeeds, schoolNeedsOptions);
      yPosition += 5;

      // Home Routines
      if (formData.homeRoutines) {
        addText('My Home Routines:', 14, true);
        addText(formData.homeRoutines);
        yPosition += 5;
      }

      // Health and Safety
      if (formData.medicalInfo || formData.allergies || formData.safetyNeeds) {
        addText('Health and Safety Information:', 14, true);
        if (formData.medicalInfo) addText(`Medical information: ${formData.medicalInfo}`);
        if (formData.allergies) addText(`Allergies: ${formData.allergies}`);
        if (formData.safetyNeeds) addText(`Safety needs: ${formData.safetyNeeds}`);
        yPosition += 5;
      }

      // Important Information
      if (formData.importantInfo) {
        addText('Important Things to Know:', 14, true);
        addText(formData.importantInfo);
        yPosition += 5;
      }

      // Goals
      if (formData.goals) {
        addText('My Goals:', 14, true);
        addText(formData.goals);
        yPosition += 5;
      }

      // Footer
      yPosition += 15;
      pdf.setFontSize(10);
      pdf.setTextColor(128, 128, 128);
      addText('Created with Noa\'s Place Interactive Tools - www.noasplace.org.uk', 10);

      // Save the PDF
      const fileName = `${formData.childName || 'Child'}_All_About_Me_Profile.pdf`;
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
      <section className="relative isolate min-h-[300px] overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="absolute inset-0 bg-blue-800/20"></div>
        
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
                <path d="M12 2v5"/>
                <path d="M17 7l-5 5"/>
                <path d="M7 7l5 5"/>
              </svg>
            </div>
            
            <h1 className="text-4xl font-black text-white sm:text-5xl md:text-6xl mb-6 drop-shadow-lg">
              All About Me
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto drop-shadow-md">
              Create a special profile to share with teachers, nurses, and new people about who you are
            </p>
          </div>
        </div>
      </section>

      {/* Guidance Section */}
      <section className="py-8 bg-blue-50 border-b">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-4">
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
                  <h3 className="text-lg font-bold text-blue-800 mb-2">For Parents, Carers, and Helpers</h3>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    This tool helps create a comprehensive profile about your child that can be shared with teachers, 
                    healthcare providers, support workers, and anyone new in their life. Fill it out together with your 
                    child, letting them choose what feels right. The finished profile will help others understand and 
                    support your child better.
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy Disclaimer */}
            <div className="bg-green-50 rounded-2xl p-6 shadow-sm border border-green-200">
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
                    you type is only saved when you download your profile as a PDF file to your own device. Your privacy 
                    and your child's privacy are our top priority.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-8">
            
            {/* Basic Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👋</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">About Me</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-ink mb-3">My Name</label>
                  <input
                    type="text"
                    value={formData.childName}
                    onChange={(e) => handleInputChange('childName', e.target.value)}
                    placeholder="What should people call you?"
                    className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold text-ink mb-3">My Age</label>
                  <input
                    type="text"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="How old are you?"
                    className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold text-ink mb-3">Person Helping Me</label>
                  <input
                    type="text"
                    value={formData.helperName}
                    onChange={(e) => handleInputChange('helperName', e.target.value)}
                    placeholder="Who is helping you fill this out?"
                    className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold text-ink mb-3">They Are My</label>
                  <input
                    type="text"
                    value={formData.helperRole}
                    onChange={(e) => handleInputChange('helperRole', e.target.value)}
                    placeholder="Mum, Dad, Teacher, etc."
                    className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                  />
                </div>
              </div>
            </div>

            {/* Favourite Things */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">❤️</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">Things I Love</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on all the things you really like:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {favouriteOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleMultiSelect('favouriteThings', option.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.favouriteThings.includes(option.id)
                        ? 'border-green-400 bg-green-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${option.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{option.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dislikes */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">😟</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">Things I Don't Like</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on things that make you feel uncomfortable or upset:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {dislikeOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleMultiSelect('dislikes', option.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.dislikes.includes(option.id)
                        ? 'border-red-400 bg-red-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${option.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{option.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* How I Learn Best */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🧠</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">How I Learn Best</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on the ways you like to learn new things:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {learningOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleMultiSelect('learningStyle', option.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.learningStyle.includes(option.id)
                        ? 'border-purple-400 bg-purple-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${option.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{option.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Things That Help Me */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌟</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">Things That Help Me</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on things that make learning and life easier for you:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {helpfulOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleMultiSelect('helpfulThings', option.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.helpfulThings.includes(option.id)
                        ? 'border-yellow-400 bg-yellow-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${option.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{option.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Things I Find Hard */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">😓</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">Things I Find Hard</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on things that are tricky or difficult for you:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {strugglesOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleMultiSelect('struggles', option.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.struggles.includes(option.id)
                        ? 'border-orange-400 bg-orange-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${option.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{option.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* How I Cope */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🧘</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">How I Cope When Upset</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on things that help you feel better when you're upset or stressed:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {copingOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleMultiSelect('copingStrategies', option.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.copingStrategies.includes(option.id)
                        ? 'border-teal-400 bg-teal-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${option.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{option.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Communication */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">How I Communicate</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on the ways you like to talk and share your thoughts:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {communicationOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleMultiSelect('communicationStyle', option.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.communicationStyle.includes(option.id)
                        ? 'border-pink-400 bg-pink-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${option.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{option.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Special things about how I communicate:
                </label>
                <textarea
                  value={formData.communicationNeeds}
                  onChange={(e) => handleInputChange('communicationNeeds', e.target.value)}
                  rows={3}
                  placeholder="Is there anything special people should know about how you communicate?"
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Support People */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">People Who Help Me</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on the people who help and support you:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {supportPeopleOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleMultiSelect('supportPeople', option.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.supportPeople.includes(option.id)
                        ? 'border-indigo-400 bg-indigo-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${option.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{option.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* School Needs */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏫</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">What I Need at School</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on things that help you at school:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {schoolNeedsOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleMultiSelect('schoolNeeds', option.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.schoolNeeds.includes(option.id)
                        ? 'border-emerald-400 bg-emerald-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${option.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{option.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">More About Me</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-ink mb-3">
                    My routines at home:
                  </label>
                  <textarea
                    value={formData.homeRoutines}
                    onChange={(e) => handleInputChange('homeRoutines', e.target.value)}
                    rows={3}
                    placeholder="Tell us about your daily routines at home..."
                    className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-ink mb-3">
                    Health information:
                  </label>
                  <textarea
                    value={formData.medicalInfo}
                    onChange={(e) => handleInputChange('medicalInfo', e.target.value)}
                    rows={3}
                    placeholder="Any medical conditions or medications people should know about..."
                    className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-ink mb-3">
                    Allergies:
                  </label>
                  <input
                    type="text"
                    value={formData.allergies}
                    onChange={(e) => handleInputChange('allergies', e.target.value)}
                    placeholder="Any allergies to food, medicines, or other things..."
                    className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-ink mb-3">
                    Safety needs:
                  </label>
                  <textarea
                    value={formData.safetyNeeds}
                    onChange={(e) => handleInputChange('safetyNeeds', e.target.value)}
                    rows={3}
                    placeholder="Any special safety considerations..."
                    className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-ink mb-3">
                    Important things to know about me:
                  </label>
                  <textarea
                    value={formData.importantInfo}
                    onChange={(e) => handleInputChange('importantInfo', e.target.value)}
                    rows={4}
                    placeholder="Anything else important that people should know about you..."
                    className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-ink mb-3">
                    My goals and dreams:
                  </label>
                  <textarea
                    value={formData.goals}
                    onChange={(e) => handleInputChange('goals', e.target.value)}
                    rows={3}
                    placeholder="What would you like to achieve or work towards..."
                    className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                  />
                </div>
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
                    Creating My Profile...
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
                    Download My All About Me Profile
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
