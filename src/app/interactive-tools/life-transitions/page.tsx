"use client";

import { useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";

export default function LifeTransitionsPage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    supportPerson: "",
    supportRole: "",
    
    // Transition Details
    transitionType: [] as string[],
    transitionDescription: "",
    timeframe: "",
    isVoluntary: "",
    
    // Current Situation Assessment
    currentEmotions: [] as string[],
    stressLevel: 0,
    confidenceLevel: 0,
    supportLevel: 0,
    
    // Life Areas Impact
    livingArrangements: "",
    employmentImpact: "",
    relationshipsImpact: "",
    healthImpact: "",
    financialImpact: "",
    
    // Knowledge and Preparation
    currentKnowledge: [] as string[],
    informationNeeded: "",
    skillsNeeded: [] as string[],
    
    // Concerns and Challenges
    primaryConcerns: [] as string[],
    specificWorries: "",
    barriers: "",
    
    // Support and Resources
    currentSupport: [] as string[],
    additionalSupport: [] as string[],
    professionalServices: [] as string[],
    
    // Coping and Adaptation
    copingStrategies: [] as string[],
    adaptationNeeds: [] as string[],
    communicationNeeds: "",
    
    // Goals and Planning
    shortTermGoals: "",
    longTermGoals: "",
    actionPlan: "",
    reviewDate: "",
    
    // Additional Information
    medicalConsiderations: "",
    accessibilityNeeds: "",
    additionalNotes: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const transitionTypeOptions = [
    "Moving to independent living",
    "Starting or changing employment",
    "Retirement or career change",
    "Relationship changes (marriage, separation, bereavement)",
    "Health condition diagnosis or changes",
    "Moving to supported accommodation",
    "Family structure changes",
    "Educational or training programs",
    "Financial circumstances changes",
    "Community or social changes",
    "Technology or routine changes",
    "Legal or administrative changes"
  ];

  const emotionOptions = [
    "Hopeful", "Anxious", "Excited", "Overwhelmed", "Confident",
    "Uncertain", "Motivated", "Fearful", "Optimistic", "Stressed",
    "Curious", "Frustrated", "Calm", "Worried", "Determined"
  ];

  const knowledgeOptions = [
    "What changes will happen and when",
    "Who will be involved in supporting me",
    "What new skills I might need to learn",
    "How my daily routine will change",
    "What services and support are available",
    "How to access help when I need it",
    "What my rights and choices are",
    "How to communicate my needs",
    "What financial support is available",
    "How to maintain my independence"
  ];

  const skillsNeededOptions = [
    "Communication and self-advocacy",
    "Daily living and self-care skills",
    "Money management and budgeting",
    "Using technology and digital tools",
    "Travel and transportation",
    "Social and relationship skills",
    "Problem-solving and decision-making",
    "Time management and organization",
    "Health and safety awareness",
    "Work or educational skills"
  ];

  const concernOptions = [
    "Maintaining independence and choice",
    "Managing daily tasks and responsibilities",
    "Keeping important relationships",
    "Accessing appropriate support services",
    "Managing health and medical needs",
    "Financial security and management",
    "Safety and personal security",
    "Communication and being understood",
    "Maintaining familiar routines",
    "Coping with stress and change"
  ];

  const currentSupportOptions = [
    "Family members",
    "Friends and social network",
    "Support workers or carers",
    "Healthcare professionals",
    "Social services",
    "Advocacy services",
    "Community groups or clubs",
    "Religious or spiritual community",
    "Employer or colleagues",
    "Educational support"
  ];

  const additionalSupportOptions = [
    "Personal care assistance",
    "Domestic help and household tasks",
    "Transportation support",
    "Communication aids or interpreters",
    "Counseling or mental health support",
    "Peer support or mentoring",
    "Advocacy and rights support",
    "Financial advice and management",
    "Technology support and training",
    "Social activities and community connections"
  ];

  const professionalServicesOptions = [
    "Social worker or case manager",
    "Occupational therapist",
    "Speech and language therapist",
    "Psychologist or counselor",
    "Community nurse",
    "Benefits advisor",
    "Housing support worker",
    "Employment support specialist",
    "Learning disability nurse",
    "Mental health support worker"
  ];

  const copingStrategiesOptions = [
    "Talking to trusted people about concerns",
    "Maintaining familiar routines where possible",
    "Taking breaks and rest when needed",
    "Using relaxation or mindfulness techniques",
    "Engaging in enjoyable activities",
    "Staying physically active and healthy",
    "Writing or keeping a journal",
    "Using visual aids or reminders",
    "Planning and preparing in advance",
    "Asking for help when needed"
  ];

  const adaptationNeedsOptions = [
    "Clear, simple communication",
    "Extra time to process information",
    "Written information and instructions",
    "Visual aids and pictures",
    "Quiet, calm environments",
    "Consistent routines and structure",
    "Regular check-ins and support",
    "Accessible formats and materials",
    "Sensory considerations",
    "Flexible pacing and scheduling"
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
      pdf.setFillColor(22, 163, 74); // Green
      pdf.rect(margin, yPosition, contentWidth, 15, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.text('LIFE TRANSITIONS SUPPORT PLAN', margin + 5, yPosition + 10);
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
      if (formData.isVoluntary) addText(`Voluntary change: ${formData.isVoluntary}`);
      yPosition += 5;

      // Current Situation Assessment
      addText('Current Situation:', 14, true);
      addText(`Stress Level: ${getSliderLabel(formData.stressLevel)}`);
      addText(`Confidence Level: ${getSliderLabel(formData.confidenceLevel)}`);
      addText(`Support Level: ${getSliderLabel(formData.supportLevel)}`);
      if (formData.currentEmotions.length > 0) {
        addText('Current emotions:');
        formData.currentEmotions.forEach(emotion => addText(`• ${emotion}`));
      }
      yPosition += 5;

      // Life Areas Impact
      addText('Impact on Life Areas:', 14, true);
      if (formData.livingArrangements) addText(`Living arrangements: ${formData.livingArrangements}`);
      if (formData.employmentImpact) addText(`Employment: ${formData.employmentImpact}`);
      if (formData.relationshipsImpact) addText(`Relationships: ${formData.relationshipsImpact}`);
      if (formData.healthImpact) addText(`Health: ${formData.healthImpact}`);
      if (formData.financialImpact) addText(`Finances: ${formData.financialImpact}`);
      yPosition += 5;

      // Knowledge and Skills
      addText('Knowledge and Skills:', 14, true);
      if (formData.currentKnowledge.length > 0) {
        addText('Current knowledge:');
        formData.currentKnowledge.forEach(knowledge => addText(`• ${knowledge}`));
      }
      if (formData.informationNeeded) addText(`Information needed: ${formData.informationNeeded}`);
      if (formData.skillsNeeded.length > 0) {
        addText('Skills needed:');
        formData.skillsNeeded.forEach(skill => addText(`• ${skill}`));
      }
      yPosition += 5;

      // Concerns and Challenges
      addText('Concerns and Challenges:', 14, true);
      if (formData.primaryConcerns.length > 0) {
        addText('Primary concerns:');
        formData.primaryConcerns.forEach(concern => addText(`• ${concern}`));
      }
      if (formData.specificWorries) addText(`Specific worries: ${formData.specificWorries}`);
      if (formData.barriers) addText(`Potential barriers: ${formData.barriers}`);
      yPosition += 5;

      // Support and Resources
      addText('Support and Resources:', 14, true);
      if (formData.currentSupport.length > 0) {
        addText('Current support:');
        formData.currentSupport.forEach(support => addText(`• ${support}`));
      }
      if (formData.additionalSupport.length > 0) {
        addText('Additional support needed:');
        formData.additionalSupport.forEach(support => addText(`• ${support}`));
      }
      if (formData.professionalServices.length > 0) {
        addText('Professional services:');
        formData.professionalServices.forEach(service => addText(`• ${service}`));
      }
      yPosition += 5;

      // Coping and Adaptation
      addText('Coping and Adaptation:', 14, true);
      if (formData.copingStrategies.length > 0) {
        addText('Coping strategies:');
        formData.copingStrategies.forEach(strategy => addText(`• ${strategy}`));
      }
      if (formData.adaptationNeeds.length > 0) {
        addText('Adaptation needs:');
        formData.adaptationNeeds.forEach(need => addText(`• ${need}`));
      }
      if (formData.communicationNeeds) addText(`Communication needs: ${formData.communicationNeeds}`);
      yPosition += 5;

      // Goals and Planning
      addText('Goals and Planning:', 14, true);
      if (formData.shortTermGoals) addText(`Short-term goals: ${formData.shortTermGoals}`);
      if (formData.longTermGoals) addText(`Long-term goals: ${formData.longTermGoals}`);
      if (formData.actionPlan) addText(`Action plan: ${formData.actionPlan}`);
      if (formData.reviewDate) addText(`Review date: ${formData.reviewDate}`);
      yPosition += 5;

      // Additional Considerations
      addText('Additional Considerations:', 14, true);
      if (formData.medicalConsiderations) addText(`Medical considerations: ${formData.medicalConsiderations}`);
      if (formData.accessibilityNeeds) addText(`Accessibility needs: ${formData.accessibilityNeeds}`);
      if (formData.additionalNotes) addText(`Additional notes: ${formData.additionalNotes}`);

      // Footer
      yPosition += 15;
      pdf.setFontSize(10);
      pdf.setTextColor(128, 128, 128);
      addText('Created with Noa\'s Place Interactive Tools - www.noasplace.org.uk', 10);

      // Save the PDF
      const fileName = `${formData.name || 'Individual'}_Life_Transitions_Plan.pdf`;
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
      <section className="relative isolate min-h-[300px] overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="absolute inset-0 bg-emerald-800/20"></div>
        
        <div className="relative px-6 pt-16 pb-8 sm:pt-20 sm:pb-12">
          <div className="mx-auto max-w-4xl text-center">
            {/* Back button */}
            <div className="mb-6">
              <Link 
                href="/interactive-tools"
                className="inline-flex items-center gap-2 text-white hover:text-emerald-100 font-medium transition duration-200"
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
                <path d="M21 7L9 19l-5.5-5.5M21 7l-6-6M9 19l6 6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            
            <h1 className="text-4xl font-black text-white sm:text-5xl md:text-6xl mb-6 drop-shadow-lg">
              Life Transitions Support
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto drop-shadow-md">
              Comprehensive planning tool for adults with additional needs facing life changes
            </p>
          </div>
        </div>
      </section>

      {/* Guidance Section */}
      <section className="py-8 bg-emerald-50 border-b">
        <div className="mx-auto max-w-4xl px-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg className="size-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-800 mb-2">About This Tool</h3>
                <p className="text-emerald-700 text-sm leading-relaxed">
                  This comprehensive assessment is designed for adults with additional needs who are facing life transitions. 
                  It can be completed independently or with support from family, carers, or professionals. The completed 
                  assessment can be shared with support services, healthcare providers, or other professionals to help 
                  them understand your needs and provide appropriate support during times of change.
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="text"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Your age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support person (if applicable)</label>
                  <input
                    type="text"
                    value={formData.supportPerson}
                    onChange={(e) => setFormData({...formData, supportPerson: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Name of person helping you"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Their relationship to you</label>
                  <input
                    type="text"
                    value={formData.supportRole}
                    onChange={(e) => setFormData({...formData, supportRole: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Family member, support worker, friend, etc."
                  />
                </div>
              </div>
            </div>

            {/* Transition Details */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">About Your Transition</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What type of life change are you facing? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {transitionTypeOptions.map((type) => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg">
                        <input
                          type="checkbox"
                          checked={formData.transitionType.includes(type)}
                          onChange={() => handleCheckboxChange('transitionType', type)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your situation in more detail
                  </label>
                  <textarea
                    value={formData.transitionDescription}
                    onChange={(e) => setFormData({...formData, transitionDescription: e.target.value})}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Tell us more about what's changing in your life..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      When is this change happening?
                    </label>
                    <input
                      type="text"
                      value={formData.timeframe}
                      onChange={(e) => setFormData({...formData, timeframe: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="e.g., next month, in 6 months, already happening"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Is this change your choice?
                    </label>
                    <select
                      value={formData.isVoluntary}
                      onChange={(e) => setFormData({...formData, isVoluntary: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select an option</option>
                      <option value="Yes, completely my choice">Yes, completely my choice</option>
                      <option value="Mostly my choice">Mostly my choice</option>
                      <option value="Partly my choice">Partly my choice</option>
                      <option value="Not really my choice">Not really my choice</option>
                      <option value="Not my choice at all">Not my choice at all</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Situation Assessment */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">How You're Feeling Right Now</h2>
              
              <div className="space-y-8">
                {/* Emotion Sliders */}
                {[
                  { key: 'stressLevel', label: 'How stressed do you feel about this change?' },
                  { key: 'confidenceLevel', label: 'How confident do you feel about managing this change?' },
                  { key: 'supportLevel', label: 'How supported do you feel right now?' }
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
                      <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                        <p className="text-center font-medium text-emerald-700 text-sm sm:text-base">
                          Current: {getSliderLabel(formData[key as keyof typeof formData] as number)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Current Emotions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What emotions are you experiencing? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {emotionOptions.map((emotion) => (
                      <label key={emotion} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.currentEmotions.includes(emotion)}
                          onChange={() => handleCheckboxChange('currentEmotions', emotion)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{emotion}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Life Areas Impact */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Impact on Different Areas of Your Life</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How will this change affect where and how you live?
                  </label>
                  <textarea
                    value={formData.livingArrangements}
                    onChange={(e) => setFormData({...formData, livingArrangements: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Describe any changes to your living situation..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How will this change affect your work or daily activities?
                  </label>
                  <textarea
                    value={formData.employmentImpact}
                    onChange={(e) => setFormData({...formData, employmentImpact: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Describe any changes to your work or daily routine..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How will this change affect your relationships with family and friends?
                  </label>
                  <textarea
                    value={formData.relationshipsImpact}
                    onChange={(e) => setFormData({...formData, relationshipsImpact: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Describe any changes to your relationships..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How will this change affect your health and wellbeing?
                    </label>
                    <textarea
                      value={formData.healthImpact}
                      onChange={(e) => setFormData({...formData, healthImpact: e.target.value})}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Describe any health-related changes..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How will this change affect your finances?
                    </label>
                    <textarea
                      value={formData.financialImpact}
                      onChange={(e) => setFormData({...formData, financialImpact: e.target.value})}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Describe any financial changes..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Knowledge and Skills */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Knowledge and Skills</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What do you already know about this change? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {knowledgeOptions.map((knowledge) => (
                      <label key={knowledge} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg">
                        <input
                          type="checkbox"
                          checked={formData.currentKnowledge.includes(knowledge)}
                          onChange={() => handleCheckboxChange('currentKnowledge', knowledge)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="What questions do you have? What would you like to know more about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What skills might you need to learn or improve? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {skillsNeededOptions.map((skill) => (
                      <label key={skill} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg">
                        <input
                          type="checkbox"
                          checked={formData.skillsNeeded.includes(skill)}
                          onChange={() => handleCheckboxChange('skillsNeeded', skill)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{skill}</span>
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
                    What are you most concerned about? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {concernOptions.map((concern) => (
                      <label key={concern} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg">
                        <input
                          type="checkbox"
                          checked={formData.primaryConcerns.includes(concern)}
                          onChange={() => handleCheckboxChange('primaryConcerns', concern)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{concern}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Are there any specific worries you'd like to share?
                  </label>
                  <textarea
                    value={formData.specificWorries}
                    onChange={(e) => setFormData({...formData, specificWorries: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Describe any specific concerns or fears you have..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What barriers or obstacles might make this change difficult?
                  </label>
                  <textarea
                    value={formData.barriers}
                    onChange={(e) => setFormData({...formData, barriers: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Think about things that might make this change harder..."
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
                    Who currently supports you? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentSupportOptions.map((support) => (
                      <label key={support} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg">
                        <input
                          type="checkbox"
                          checked={formData.currentSupport.includes(support)}
                          onChange={() => handleCheckboxChange('currentSupport', support)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{support}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What additional support might you need? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {additionalSupportOptions.map((support) => (
                      <label key={support} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg">
                        <input
                          type="checkbox"
                          checked={formData.additionalSupport.includes(support)}
                          onChange={() => handleCheckboxChange('additionalSupport', support)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{support}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What professional services might be helpful? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {professionalServicesOptions.map((service) => (
                      <label key={service} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg">
                        <input
                          type="checkbox"
                          checked={formData.professionalServices.includes(service)}
                          onChange={() => handleCheckboxChange('professionalServices', service)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Coping and Adaptation */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Coping and Adaptation</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What helps you cope with stress and change? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {copingStrategiesOptions.map((strategy) => (
                      <label key={strategy} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg">
                        <input
                          type="checkbox"
                          checked={formData.copingStrategies.includes(strategy)}
                          onChange={() => handleCheckboxChange('copingStrategies', strategy)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{strategy}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What adaptations or adjustments help you? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {adaptationNeedsOptions.map((need) => (
                      <label key={need} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg">
                        <input
                          type="checkbox"
                          checked={formData.adaptationNeeds.includes(need)}
                          onChange={() => handleCheckboxChange('adaptationNeeds', need)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{need}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How do you prefer to communicate and receive information?
                  </label>
                  <textarea
                    value={formData.communicationNeeds}
                    onChange={(e) => setFormData({...formData, communicationNeeds: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Describe your communication preferences and needs..."
                  />
                </div>
              </div>
            </div>

            {/* Goals and Planning */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Goals and Planning</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What are your short-term goals? (next 1-3 months)
                  </label>
                  <textarea
                    value={formData.shortTermGoals}
                    onChange={(e) => setFormData({...formData, shortTermGoals: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="What do you hope to achieve in the longer term?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What steps will you take to prepare for this change?
                  </label>
                  <textarea
                    value={formData.actionPlan}
                    onChange={(e) => setFormData({...formData, actionPlan: e.target.value})}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="List the specific actions you plan to take..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    When would you like to review this plan?
                  </label>
                  <input
                    type="text"
                    value={formData.reviewDate}
                    onChange={(e) => setFormData({...formData, reviewDate: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., in 3 months, after the change happens"
                  />
                </div>
              </div>
            </div>

            {/* Additional Considerations */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Additional Considerations</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Are there any medical or health considerations?
                  </label>
                  <textarea
                    value={formData.medicalConsiderations}
                    onChange={(e) => setFormData({...formData, medicalConsiderations: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Describe any health-related factors that might affect this transition..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do you have any accessibility needs?
                  </label>
                  <textarea
                    value={formData.accessibilityNeeds}
                    onChange={(e) => setFormData({...formData, accessibilityNeeds: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Describe any accessibility requirements or accommodations you need..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Is there anything else you'd like to add?
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Any other thoughts, concerns, or information that might be helpful..."
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
                    Download My Life Transitions Plan PDF
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
          background: #059669;
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
          background: #059669;
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
