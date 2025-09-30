"use client";

import { useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";

export default function TransitionPlanningPage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    supportPerson: "",
    supportRole: "",
    
    // Transition Details
    transitionType: [] as string[],
    transitionDescription: "",
    timeframe: "",
    
    // Current Situation Assessment
    currentEmotions: [] as string[],
    anxietyLevel: 0,
    excitementLevel: 0,
    confidenceLevel: 0,
    
    // Knowledge and Preparation
    currentKnowledge: [] as string[],
    informationNeeded: "",
    preparationSteps: [] as string[],
    
    // Concerns and Challenges
    primaryConcerns: [] as string[],
    specificWorries: "",
    potentialChallenges: "",
    
    // Support and Resources
    supportNetwork: [] as string[],
    copingStrategies: [] as string[],
    resourcesNeeded: [] as string[],
    
    // Goals and Action Plan
    shortTermGoals: "",
    longTermGoals: "",
    actionSteps: "",
    successMeasures: "",
    
    // Additional Information
    additionalNotes: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const transitionTypeOptions = [
    "Starting secondary school",
    "Changing schools",
    "Moving to sixth form/college",
    "Starting university",
    "Beginning work experience/apprenticeship",
    "Moving house/relocating",
    "Family changes (divorce, new family member)",
    "Health-related transitions",
    "Social group changes",
    "Academic pathway changes",
    "Independence/living arrangements",
    "Other significant life change"
  ];

  const emotionOptions = [
    "Excited", "Nervous", "Anxious", "Confident", "Overwhelmed",
    "Curious", "Scared", "Optimistic", "Uncertain", "Motivated",
    "Stressed", "Hopeful", "Frustrated", "Calm", "Confused"
  ];

  const knowledgeOptions = [
    "Timeline and key dates",
    "Location and environment",
    "People I'll be working with",
    "Expectations and requirements",
    "Daily routine and schedule",
    "Support systems available",
    "Rules and procedures",
    "Academic/work requirements",
    "Social aspects and culture",
    "Transportation arrangements"
  ];

  const preparationOptions = [
    "Visit the new environment",
    "Meet key people beforehand",
    "Research and gather information",
    "Practice new routines",
    "Develop necessary skills",
    "Organize practical arrangements",
    "Create support networks",
    "Set up communication systems",
    "Plan coping strategies",
    "Prepare documentation/materials"
  ];

  const concernOptions = [
    "Academic performance and expectations",
    "Making new friends and social connections",
    "Fitting in and being accepted",
    "Managing increased independence",
    "Handling new responsibilities",
    "Coping with change and uncertainty",
    "Maintaining existing relationships",
    "Financial concerns",
    "Time management and organization",
    "Health and wellbeing support"
  ];

  const supportNetworkOptions = [
    "Family members",
    "Close friends",
    "Teachers/tutors",
    "School counselors",
    "Mentors",
    "Peer support groups",
    "Professional services",
    "Online communities",
    "Religious/community groups",
    "Healthcare providers"
  ];

  const copingStrategiesOptions = [
    "Talking to trusted people",
    "Regular exercise and physical activity",
    "Mindfulness and relaxation techniques",
    "Creative outlets (art, music, writing)",
    "Maintaining routines and structure",
    "Setting realistic goals and expectations",
    "Problem-solving and planning",
    "Seeking professional help when needed",
    "Staying connected with support network",
    "Self-care and stress management"
  ];

  const resourceOptions = [
    "Academic support and tutoring",
    "Counseling and mental health services",
    "Peer mentoring programs",
    "Study skills and time management training",
    "Social skills development",
    "Career guidance and planning",
    "Financial advice and support",
    "Health and wellness resources",
    "Technology and accessibility support",
    "Family support services"
  ];

  const handleCheckboxChange = (field: keyof typeof formData, value: string) => {
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

  const handleSliderChange = (field: keyof typeof formData, value: number) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const getSliderLabel = (value: number) => {
    const labels = ['Very Low', 'Low', 'Moderate', 'High', 'Very High'];
    return labels[value];
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

      // Title
      pdf.setFillColor(139, 69, 19); // Brown
      pdf.rect(margin, yPosition, contentWidth, 15, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.text('TRANSITION PLANNING ASSESSMENT', margin + 5, yPosition + 10);
      yPosition += 25;
      
      // Reset text color
      pdf.setTextColor(0, 0, 0);

      // Personal Information
      addText('Personal Information:', 14, true);
      addText(`Name: ${formData.name || 'Not provided'}`);
      addText(`Age: ${formData.age || 'Not provided'}`);
      addText(`Support Person: ${formData.supportPerson || 'Not provided'} (${formData.supportRole || 'Not specified'})`);
      yPosition += 5;

      // Transition Details
      addText('Transition Details:', 14, true);
      if (formData.transitionType.length > 0) {
        addText('Type of transition:');
        formData.transitionType.forEach(type => addText(`• ${type}`));
      }
      if (formData.transitionDescription) addText(`Description: ${formData.transitionDescription}`);
      if (formData.timeframe) addText(`Timeframe: ${formData.timeframe}`);
      yPosition += 5;

      // Current Situation Assessment
      addText('Current Emotional State:', 14, true);
      addText(`Anxiety Level: ${getSliderLabel(formData.anxietyLevel)}`);
      addText(`Excitement Level: ${getSliderLabel(formData.excitementLevel)}`);
      addText(`Confidence Level: ${getSliderLabel(formData.confidenceLevel)}`);
      if (formData.currentEmotions.length > 0) {
        addText('Current emotions:');
        formData.currentEmotions.forEach(emotion => addText(`• ${emotion}`));
      }
      yPosition += 5;

      // Knowledge and Preparation
      addText('Knowledge and Preparation:', 14, true);
      if (formData.currentKnowledge.length > 0) {
        addText('What I currently know:');
        formData.currentKnowledge.forEach(knowledge => addText(`• ${knowledge}`));
      }
      if (formData.informationNeeded) addText(`Information needed: ${formData.informationNeeded}`);
      if (formData.preparationSteps.length > 0) {
        addText('Preparation steps identified:');
        formData.preparationSteps.forEach(step => addText(`• ${step}`));
      }
      yPosition += 5;

      // Concerns and Challenges
      addText('Concerns and Challenges:', 14, true);
      if (formData.primaryConcerns.length > 0) {
        addText('Primary concerns:');
        formData.primaryConcerns.forEach(concern => addText(`• ${concern}`));
      }
      if (formData.specificWorries) addText(`Specific worries: ${formData.specificWorries}`);
      if (formData.potentialChallenges) addText(`Potential challenges: ${formData.potentialChallenges}`);
      yPosition += 5;

      // Support and Resources
      addText('Support and Resources:', 14, true);
      if (formData.supportNetwork.length > 0) {
        addText('Support network:');
        formData.supportNetwork.forEach(support => addText(`• ${support}`));
      }
      if (formData.copingStrategies.length > 0) {
        addText('Coping strategies:');
        formData.copingStrategies.forEach(strategy => addText(`• ${strategy}`));
      }
      if (formData.resourcesNeeded.length > 0) {
        addText('Resources needed:');
        formData.resourcesNeeded.forEach(resource => addText(`• ${resource}`));
      }
      yPosition += 5;

      // Goals and Action Plan
      addText('Goals and Action Plan:', 14, true);
      if (formData.shortTermGoals) addText(`Short-term goals: ${formData.shortTermGoals}`);
      if (formData.longTermGoals) addText(`Long-term goals: ${formData.longTermGoals}`);
      if (formData.actionSteps) addText(`Action steps: ${formData.actionSteps}`);
      if (formData.successMeasures) addText(`Success measures: ${formData.successMeasures}`);
      yPosition += 5;

      // Additional Information
      if (formData.additionalNotes) {
        addText('Additional Notes:', 14, true);
        addText(formData.additionalNotes);
      }

      // Footer
      yPosition += 15;
      pdf.setFontSize(10);
      pdf.setTextColor(128, 128, 128);
      addText('Created with Noa\'s Place Interactive Tools - www.noasplace.org.uk', 10);

      // Save the PDF
      const fileName = `${formData.name || 'Student'}_Transition_Planning.pdf`;
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
      <section className="relative isolate min-h-[300px] overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-600">
        <div className="absolute inset-0 bg-indigo-800/20"></div>
        
        <div className="relative px-6 pt-16 pb-8 sm:pt-20 sm:pb-12">
          <div className="mx-auto max-w-4xl text-center">
            {/* Back button */}
            <div className="mb-6">
              <Link 
                href="/interactive-tools"
                className="inline-flex items-center gap-2 text-white hover:text-indigo-100 font-medium transition duration-200"
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
                <path d="M12 12h.01"/>
              </svg>
            </div>
            
            <h1 className="text-4xl font-black text-white sm:text-5xl md:text-6xl mb-6 drop-shadow-lg">
              Transition Planning
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto drop-shadow-md">
              Plan and prepare for life changes with structured assessment and goal setting
            </p>
          </div>
        </div>
      </section>

      {/* Guidance Section */}
      <section className="py-8 bg-indigo-50 border-b">
        <div className="mx-auto max-w-4xl px-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-indigo-100">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg className="size-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-indigo-800 mb-2">How to Use This Tool</h3>
                <p className="text-indigo-700 text-sm leading-relaxed">
                  This comprehensive assessment helps you plan for upcoming life transitions. Take your time to reflect 
                  on each section. You can use this tool multiple times for different transitions or to track your 
                  progress. Share the completed assessment with trusted adults, counselors, or support services to 
                  help them understand your needs and provide appropriate support.
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
                  <strong>Important:</strong> All information you enter in this form is completely private and secure. 
                  We do not store, save, or share any of your personal details on our website or servers. Everything 
                  you type is only saved when you download your plan as a PDF file to your own device. Your privacy 
                  and confidentiality are our top priority.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-8">
            
            {/* Personal Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="text"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Your age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support person</label>
                  <input
                    type="text"
                    value={formData.supportPerson}
                    onChange={(e) => setFormData({...formData, supportPerson: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Name of person helping you"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Their role</label>
                  <input
                    type="text"
                    value={formData.supportRole}
                    onChange={(e) => setFormData({...formData, supportRole: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Parent, teacher, counselor, etc."
                  />
                </div>
              </div>
            </div>

            {/* Transition Details */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Transition Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What type of transition are you facing? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {transitionTypeOptions.map((type) => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.transitionType.includes(type)}
                          onChange={() => handleCheckboxChange('transitionType', type)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your transition in more detail
                  </label>
                  <textarea
                    value={formData.transitionDescription}
                    onChange={(e) => setFormData({...formData, transitionDescription: e.target.value})}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Provide specific details about what's changing in your life..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    When is this transition happening?
                  </label>
                  <input
                    type="text"
                    value={formData.timeframe}
                    onChange={(e) => setFormData({...formData, timeframe: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., September 2024, in 3 months, next year"
                  />
                </div>
              </div>
            </div>

            {/* Current Situation Assessment */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Current Emotional State</h2>
              
              <div className="space-y-8">
                {/* Emotion Sliders */}
                {[
                  { key: 'anxietyLevel', label: 'How anxious do you feel about this transition?' },
                  { key: 'excitementLevel', label: 'How excited are you about this change?' },
                  { key: 'confidenceLevel', label: 'How confident do you feel about managing this transition?' }
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-4">{label}</label>
                    <div className="px-2 sm:px-4">
                      <input
                        type="range"
                        min="0"
                        max="4"
                        value={formData[key as keyof typeof formData] as number}
                        onChange={(e) => handleSliderChange(key as keyof typeof formData, parseInt(e.target.value))}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider mobile-slider"
                      />
                      <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-3 px-1">
                        <span className="text-center flex-1">Very Low</span>
                        <span className="text-center flex-1">Low</span>
                        <span className="text-center flex-1">Moderate</span>
                        <span className="text-center flex-1">High</span>
                        <span className="text-center flex-1">Very High</span>
                      </div>
                      <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                        <p className="text-center font-medium text-indigo-700 text-sm sm:text-base">
                          Current: {getSliderLabel(formData[key as keyof typeof formData] as number)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Current Emotions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What emotions are you currently experiencing? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {emotionOptions.map((emotion) => (
                      <label key={emotion} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.currentEmotions.includes(emotion)}
                          onChange={() => handleCheckboxChange('currentEmotions', emotion)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="text-sm">{emotion}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Knowledge and Preparation */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Knowledge and Preparation</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What do you currently know about this transition? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {knowledgeOptions.map((knowledge) => (
                      <label key={knowledge} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.currentKnowledge.includes(knowledge)}
                          onChange={() => handleCheckboxChange('currentKnowledge', knowledge)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="text-sm">{knowledge}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What information do you still need?
                  </label>
                  <textarea
                    value={formData.informationNeeded}
                    onChange={(e) => setFormData({...formData, informationNeeded: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="List any questions or information gaps you have..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What preparation steps would be helpful? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {preparationOptions.map((step) => (
                      <label key={step} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.preparationSteps.includes(step)}
                          onChange={() => handleCheckboxChange('preparationSteps', step)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="text-sm">{step}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Concerns and Challenges */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Concerns and Challenges</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What are your primary concerns? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {concernOptions.map((concern) => (
                      <label key={concern} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.primaryConcerns.includes(concern)}
                          onChange={() => handleCheckboxChange('primaryConcerns', concern)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="text-sm">{concern}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe any specific worries you have
                  </label>
                  <textarea
                    value={formData.specificWorries}
                    onChange={(e) => setFormData({...formData, specificWorries: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Share any specific concerns or fears about this transition..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What challenges do you anticipate?
                  </label>
                  <textarea
                    value={formData.potentialChallenges}
                    onChange={(e) => setFormData({...formData, potentialChallenges: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Think about potential obstacles or difficulties you might face..."
                  />
                </div>
              </div>
            </div>

            {/* Support and Resources */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Support and Resources</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Who is in your support network? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {supportNetworkOptions.map((support) => (
                      <label key={support} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.supportNetwork.includes(support)}
                          onChange={() => handleCheckboxChange('supportNetwork', support)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="text-sm">{support}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What coping strategies work for you? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {copingStrategiesOptions.map((strategy) => (
                      <label key={strategy} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.copingStrategies.includes(strategy)}
                          onChange={() => handleCheckboxChange('copingStrategies', strategy)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="text-sm">{strategy}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What resources might you need? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {resourceOptions.map((resource) => (
                      <label key={resource} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.resourcesNeeded.includes(resource)}
                          onChange={() => handleCheckboxChange('resourcesNeeded', resource)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="text-sm">{resource}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Goals and Action Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Goals and Action Plan</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What are your short-term goals for this transition? (next 1-3 months)
                  </label>
                  <textarea
                    value={formData.shortTermGoals}
                    onChange={(e) => setFormData({...formData, shortTermGoals: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="What do you want to achieve in the near future?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What are your long-term goals? (6 months to 1 year)
                  </label>
                  <textarea
                    value={formData.longTermGoals}
                    onChange={(e) => setFormData({...formData, longTermGoals: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="What do you hope to achieve in the longer term?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What specific action steps will you take?
                  </label>
                  <textarea
                    value={formData.actionSteps}
                    onChange={(e) => setFormData({...formData, actionSteps: e.target.value})}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="List concrete steps you can take to prepare for and manage this transition..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How will you measure success?
                  </label>
                  <textarea
                    value={formData.successMeasures}
                    onChange={(e) => setFormData({...formData, successMeasures: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="How will you know that you're successfully managing this transition?"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Additional Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is there anything else you'd like to add?
                </label>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Any other thoughts, concerns, or information that might be helpful..."
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
                    Download My Transition Plan PDF
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </section>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: #4f46e5;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          transition: all 0.2s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        .slider::-moz-range-thumb {
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: #4f46e5;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          transition: all 0.2s ease;
        }

        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        @media (max-width: 640px) {
          .mobile-slider::-webkit-slider-thumb {
            height: 32px;
            width: 32px;
            border: 4px solid #ffffff;
          }
          
          .mobile-slider::-moz-range-thumb {
            height: 32px;
            width: 32px;
            border: 4px solid #ffffff;
          }
        }

        .slider::-webkit-slider-track {
          background: #e5e7eb;
          border-radius: 6px;
        }

        .slider::-moz-range-track {
          background: #e5e7eb;
          border-radius: 6px;
        }
      `}</style>
    </main>
  );
}
