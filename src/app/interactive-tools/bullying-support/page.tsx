"use client";

import { useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";

export default function BullingSupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    school: "",
    
    // Situation Assessment
    bullyingTypes: [] as string[],
    frequency: 0,
    duration: 0,
    location: [] as string[],
    impact: 0,
    
    // Incident Details
    whatHappened: "",
    whoInvolved: "",
    witnesses: "",
    
    // Current Support
    toldSomeone: [] as string[],
    supportReceived: "",
    previousActions: [] as string[],
    
    // Impact Assessment
    academicImpact: 0,
    socialImpact: 0,
    emotionalImpact: 0,
    physicalImpact: 0,
    
    // Safety and Action
    safePlaces: [] as string[],
    copingStrategies: [] as string[],
    nextSteps: [] as string[],
    goals: "",
    
    // Additional Notes
    additionalInfo: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const bullyingTypeOptions = [
    "Physical bullying (hitting, pushing, damaging property)",
    "Verbal bullying (name-calling, threats, insults)",
    "Social/relational bullying (exclusion, spreading rumours)",
    "Cyberbullying (online harassment, social media abuse)",
    "Sexual harassment or bullying",
    "Discrimination (race, religion, disability, sexuality)",
    "Academic bullying (sabotaging work, mocking abilities)",
    "Other forms of bullying"
  ];

  const locationOptions = [
    "Classroom",
    "Corridors/hallways",
    "Playground/outdoor areas",
    "Canteen/dining area",
    "Toilets/changing rooms",
    "School transport",
    "Online/social media",
    "Outside school premises",
    "School events/trips"
  ];

  const toldSomeoneOptions = [
    "Parents/guardians",
    "Teacher",
    "Head teacher/deputy head",
    "School counsellor",
    "Friends",
    "Siblings",
    "Other family members",
    "Haven't told anyone yet"
  ];

  const previousActionsOptions = [
    "Reported to school",
    "Confronted the bully",
    "Avoided certain areas",
    "Changed routes/times",
    "Blocked on social media",
    "Tried to ignore it",
    "Asked friends for help",
    "Documented incidents"
  ];

  const safePlacesOptions = [
    "Library",
    "Teacher's classroom",
    "School counsellor's office",
    "Main office",
    "Supervised areas",
    "With trusted friends",
    "Home",
    "Community centres",
    "Other safe spaces"
  ];

  const copingStrategiesOptions = [
    "Talk to trusted adults",
    "Exercise/physical activity",
    "Creative activities (art, music, writing)",
    "Mindfulness/breathing exercises",
    "Spend time with supportive friends",
    "Engage in hobbies",
    "Listen to music",
    "Online support groups",
    "Professional counselling"
  ];

  const nextStepsOptions = [
    "Report to a teacher",
    "Tell parents/guardians",
    "Document incidents",
    "Seek counselling support",
    "Talk to friends about it",
    "Join support groups",
    "Learn assertiveness skills",
    "Develop safety plans",
    "Consider changing classes/groups"
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

  const getSliderLabel = (value: number, type: string) => {
    if (type === 'frequency') {
      const labels = ['Never', 'Rarely', 'Sometimes', 'Often', 'Daily'];
      return labels[value];
    }
    if (type === 'duration') {
      const labels = ['Just started', '1-2 weeks', '1-2 months', '3-6 months', '6+ months'];
      return labels[value];
    }
    if (type === 'impact') {
      const labels = ['No impact', 'Slight impact', 'Moderate impact', 'High impact', 'Severe impact'];
      return labels[value];
    }
    return '';
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
      pdf.setFillColor(126, 52, 130); // Purple
      pdf.rect(margin, yPosition, contentWidth, 15, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.text('BULLYING SUPPORT ASSESSMENT', margin + 5, yPosition + 10);
      yPosition += 25;
      
      // Reset text color
      pdf.setTextColor(0, 0, 0);

      // Personal Information
      addText('Personal Information:', 14, true);
      addText(`Name: ${formData.name || 'Not provided'}`);
      addText(`Age: ${formData.age || 'Not provided'}`);
      addText(`School: ${formData.school || 'Not provided'}`);
      yPosition += 5;

      // Situation Assessment
      addText('Situation Assessment:', 14, true);
      addText(`Frequency: ${getSliderLabel(formData.frequency, 'frequency')}`);
      addText(`Duration: ${getSliderLabel(formData.duration, 'duration')}`);
      addText(`Overall Impact: ${getSliderLabel(formData.impact, 'impact')}`);
      
      if (formData.bullyingTypes.length > 0) {
        addText('Types of bullying experienced:');
        formData.bullyingTypes.forEach(type => addText(`• ${type}`));
      }
      
      if (formData.location.length > 0) {
        addText('Locations where bullying occurs:');
        formData.location.forEach(loc => addText(`• ${loc}`));
      }
      yPosition += 5;

      // Incident Details
      if (formData.whatHappened || formData.whoInvolved || formData.witnesses) {
        addText('Incident Details:', 14, true);
        if (formData.whatHappened) addText(`What happened: ${formData.whatHappened}`);
        if (formData.whoInvolved) addText(`Who was involved: ${formData.whoInvolved}`);
        if (formData.witnesses) addText(`Witnesses: ${formData.witnesses}`);
        yPosition += 5;
      }

      // Current Support
      addText('Current Support:', 14, true);
      if (formData.toldSomeone.length > 0) {
        addText('People told about the bullying:');
        formData.toldSomeone.forEach(person => addText(`• ${person}`));
      }
      if (formData.supportReceived) addText(`Support received: ${formData.supportReceived}`);
      if (formData.previousActions.length > 0) {
        addText('Previous actions taken:');
        formData.previousActions.forEach(action => addText(`• ${action}`));
      }
      yPosition += 5;

      // Impact Assessment
      addText('Impact Assessment:', 14, true);
      addText(`Academic impact: ${getSliderLabel(formData.academicImpact, 'impact')}`);
      addText(`Social impact: ${getSliderLabel(formData.socialImpact, 'impact')}`);
      addText(`Emotional impact: ${getSliderLabel(formData.emotionalImpact, 'impact')}`);
      addText(`Physical impact: ${getSliderLabel(formData.physicalImpact, 'impact')}`);
      yPosition += 5;

      // Safety and Action Plans
      addText('Safety and Action Plans:', 14, true);
      if (formData.safePlaces.length > 0) {
        addText('Safe places identified:');
        formData.safePlaces.forEach(place => addText(`• ${place}`));
      }
      if (formData.copingStrategies.length > 0) {
        addText('Coping strategies:');
        formData.copingStrategies.forEach(strategy => addText(`• ${strategy}`));
      }
      if (formData.nextSteps.length > 0) {
        addText('Next steps planned:');
        formData.nextSteps.forEach(step => addText(`• ${step}`));
      }
      if (formData.goals) addText(`Goals: ${formData.goals}`);
      yPosition += 5;

      // Additional Information
      if (formData.additionalInfo) {
        addText('Additional Information:', 14, true);
        addText(formData.additionalInfo);
      }

      // Footer
      yPosition += 15;
      pdf.setFontSize(10);
      pdf.setTextColor(128, 128, 128);
      addText('Created with Noa\'s Place Interactive Tools - www.noasplace.org.uk', 10);

      // Save the PDF
      const fileName = `${formData.name || 'Student'}_Bullying_Support_Assessment.pdf`;
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
      <section className="relative isolate min-h-[300px] overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-purple-800/20"></div>
        
        <div className="relative px-6 pt-16 pb-8 sm:pt-20 sm:pb-12">
          <div className="mx-auto max-w-4xl text-center">
            {/* Back button */}
            <div className="mb-6">
              <Link 
                href="/interactive-tools"
                className="inline-flex items-center gap-2 text-white hover:text-purple-100 font-medium transition duration-200"
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
                <path d="M9 9h.01"/>
                <path d="M15 9h.01"/>
                <path d="M8 13a4 4 0 1 0 8 0"/>
              </svg>
            </div>
            
            <h1 className="text-4xl font-black text-white sm:text-5xl md:text-6xl mb-6 drop-shadow-lg">
              Bullying Support Tool
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto drop-shadow-md">
              Assess your situation, understand your options, and create an action plan
            </p>
          </div>
        </div>
      </section>

      {/* Guidance Section */}
      <section className="py-8 bg-purple-50 border-b">
        <div className="mx-auto max-w-4xl px-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="size-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-purple-800 mb-2">How to Use This Tool</h3>
                <p className="text-purple-700 text-sm leading-relaxed">
                  This assessment helps you understand your bullying situation and plan next steps. Be honest in your responses - 
                  this information can help you, your family, and school support staff understand what you're experiencing. 
                  You can save and share this assessment with trusted adults who want to help you.
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name (optional)</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="text"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your age"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">School</label>
                  <input
                    type="text"
                    value={formData.school}
                    onChange={(e) => setFormData({...formData, school: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your school name"
                  />
                </div>
              </div>
            </div>

            {/* Situation Assessment */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Situation Assessment</h2>
              
              {/* Frequency Slider */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  How often does the bullying happen?
                </label>
                <div className="px-2 sm:px-4">
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={formData.frequency}
                    onChange={(e) => handleSliderChange('frequency', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider mobile-slider"
                  />
                  <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-3 px-1">
                    <span className="text-center flex-1">Never</span>
                    <span className="text-center flex-1">Rarely</span>
                    <span className="text-center flex-1">Sometimes</span>
                    <span className="text-center flex-1">Often</span>
                    <span className="text-center flex-1">Daily</span>
                  </div>
                  <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                    <p className="text-center font-medium text-purple-700 text-sm sm:text-base">
                      Current: {getSliderLabel(formData.frequency, 'frequency')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Duration Slider */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  How long has this been going on?
                </label>
                <div className="px-2 sm:px-4">
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={formData.duration}
                    onChange={(e) => handleSliderChange('duration', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider mobile-slider"
                  />
                  <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-3 px-1">
                    <span className="text-center flex-1">Just started</span>
                    <span className="text-center flex-1">1-2 weeks</span>
                    <span className="text-center flex-1">1-2 months</span>
                    <span className="text-center flex-1">3-6 months</span>
                    <span className="text-center flex-1">6+ months</span>
                  </div>
                  <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                    <p className="text-center font-medium text-purple-700 text-sm sm:text-base">
                      Current: {getSliderLabel(formData.duration, 'duration')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Overall Impact Slider */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  How much is this affecting your daily life?
                </label>
                <div className="px-2 sm:px-4">
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={formData.impact}
                    onChange={(e) => handleSliderChange('impact', parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider mobile-slider"
                  />
                  <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-3 px-1">
                    <span className="text-center flex-1">No impact</span>
                    <span className="text-center flex-1">Slight</span>
                    <span className="text-center flex-1">Moderate</span>
                    <span className="text-center flex-1">High</span>
                    <span className="text-center flex-1">Severe</span>
                  </div>
                  <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                    <p className="text-center font-medium text-purple-700 text-sm sm:text-base">
                      Current: {getSliderLabel(formData.impact, 'impact')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Types of Bullying */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What types of bullying are you experiencing? (Select all that apply)
                </label>
                <div className="space-y-3">
                  {bullyingTypeOptions.map((type) => (
                    <label key={type} className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={formData.bullyingTypes.includes(type)}
                        onChange={() => handleCheckboxChange('bullyingTypes', type)}
                        className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Where does the bullying usually happen? (Select all that apply)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {locationOptions.map((location) => (
                    <label key={location} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={formData.location.includes(location)}
                        onChange={() => handleCheckboxChange('location', location)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm">{location}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Incident Details */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Incident Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe what happened (most recent or significant incident)
                  </label>
                  <textarea
                    value={formData.whatHappened}
                    onChange={(e) => setFormData({...formData, whatHappened: e.target.value})}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe the incident in as much detail as you're comfortable sharing..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Who was involved? (names, descriptions, or general information)
                  </label>
                  <textarea
                    value={formData.whoInvolved}
                    onChange={(e) => setFormData({...formData, whoInvolved: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Names or descriptions of people involved..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Were there any witnesses?
                  </label>
                  <textarea
                    value={formData.witnesses}
                    onChange={(e) => setFormData({...formData, witnesses: e.target.value})}
                    rows={2}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Names or descriptions of witnesses..."
                  />
                </div>
              </div>
            </div>

            {/* Current Support */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Current Support</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Who have you told about the bullying? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {toldSomeoneOptions.map((person) => (
                      <label key={person} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.toldSomeone.includes(person)}
                          onChange={() => handleCheckboxChange('toldSomeone', person)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm">{person}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What support have you received so far?
                  </label>
                  <textarea
                    value={formData.supportReceived}
                    onChange={(e) => setFormData({...formData, supportReceived: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe any help or support you've received..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What actions have you already taken? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {previousActionsOptions.map((action) => (
                      <label key={action} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.previousActions.includes(action)}
                          onChange={() => handleCheckboxChange('previousActions', action)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm">{action}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Assessment */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Impact Assessment</h2>
              <p className="text-gray-600 mb-6">Rate how much the bullying is affecting different areas of your life:</p>
              
              <div className="space-y-8">
                {[
                  { key: 'academicImpact', label: 'Academic performance (grades, concentration, school attendance)' },
                  { key: 'socialImpact', label: 'Social relationships (friendships, family relationships)' },
                  { key: 'emotionalImpact', label: 'Emotional wellbeing (mood, anxiety, self-esteem)' },
                  { key: 'physicalImpact', label: 'Physical health (sleep, appetite, physical symptoms)' }
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>
                    <div className="px-3">
                      <input
                        type="range"
                        min="0"
                        max="4"
                        value={formData[key as keyof typeof formData] as number}
                        onChange={(e) => handleSliderChange(key as keyof typeof formData, parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>No impact</span>
                        <span>Slight</span>
                        <span>Moderate</span>
                        <span>High</span>
                        <span>Severe</span>
                      </div>
                      <p className="text-center mt-2 font-medium text-purple-600">
                        Current: {getSliderLabel(formData[key as keyof typeof formData] as number, 'impact')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety and Action Planning */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Safety and Action Planning</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Where do you feel safe at school/in your community? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {safePlacesOptions.map((place) => (
                      <label key={place} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.safePlaces.includes(place)}
                          onChange={() => handleCheckboxChange('safePlaces', place)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm">{place}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What coping strategies help you feel better? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {copingStrategiesOptions.map((strategy) => (
                      <label key={strategy} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.copingStrategies.includes(strategy)}
                          onChange={() => handleCheckboxChange('copingStrategies', strategy)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm">{strategy}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What are your next steps? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {nextStepsOptions.map((step) => (
                      <label key={step} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.nextSteps.includes(step)}
                          onChange={() => handleCheckboxChange('nextSteps', step)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm">{step}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What are your goals for resolving this situation?
                  </label>
                  <textarea
                    value={formData.goals}
                    onChange={(e) => setFormData({...formData, goals: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="What would you like to see happen? What would make you feel safer and happier?"
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
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Any other information that might be helpful..."
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
                    Download My Assessment PDF
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
          background: #9333ea;
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
          background: #9333ea;
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
