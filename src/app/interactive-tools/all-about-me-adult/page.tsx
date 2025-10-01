"use client";

import { useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";

export default function AllAboutMeAdultPage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    pronouns: "",
    address: "",
    phone: "",
    email: "",
    emergencyContact: "",
    
    // Personal Identity
    personalValues: [] as string[],
    interests: [] as string[],
    strengths: [] as string[],
    culturalBackground: "",
    
    // Communication and Social
    communicationPreferences: [] as string[],
    communicationNeeds: "",
    socialPreferences: [] as string[],
    relationshipStyle: "",
    
    // Daily Living and Independence
    livingArrangement: "",
    dailyRoutines: "",
    independentSkills: [] as string[],
    supportNeeds: [] as string[],
    
    // Health and Medical
    medicalConditions: "",
    medications: "",
    allergies: "",
    healthcareProviders: "",
    mentalHealthSupport: "",
    
    // Work and Education
    employmentStatus: "",
    workPreferences: [] as string[],
    workAccommodations: [] as string[],
    educationGoals: "",
    
    // Challenges and Support
    commonChallenges: [] as string[],
    triggers: "",
    copingStrategies: [] as string[],
    warningSigns: [] as string[],
    supportStrategies: [] as string[],
    
    // Goals and Aspirations
    shortTermGoals: "",
    longTermGoals: "",
    skillsToLearn: [] as string[],
    
    // Important Information
    importantInfo: "",
    safetyConsiderations: "",
    additionalNotes: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const personalValueOptions = [
    "Independence and autonomy", "Family and relationships", "Personal growth", "Community involvement",
    "Honesty and integrity", "Creativity and self-expression", "Security and stability", "Adventure and new experiences",
    "Helping others", "Environmental responsibility", "Spiritual or religious beliefs", "Cultural heritage",
    "Professional achievement", "Financial security", "Health and wellbeing", "Social justice and equality"
  ];

  const interestOptions = [
    "Arts and crafts", "Music and concerts", "Reading and literature", "Sports and fitness",
    "Cooking and food", "Travel and exploration", "Technology and gadgets", "Gardening",
    "Photography", "Movies and TV", "Board games and puzzles", "Volunteering",
    "Learning new skills", "Social activities", "Nature and outdoors", "History and museums"
  ];

  const strengthOptions = [
    "Problem-solving", "Attention to detail", "Creative thinking", "Good memory",
    "Empathy and understanding", "Reliability", "Technical skills", "Communication skills",
    "Organization", "Patience", "Persistence", "Leadership abilities",
    "Artistic talents", "Mathematical skills", "Research abilities", "Practical skills"
  ];

  const communicationPreferenceOptions = [
    "Face-to-face conversation", "Written communication", "Email", "Text messages",
    "Phone calls", "Video calls", "Visual aids and diagrams", "Simple language",
    "Detailed explanations", "Time to process information", "Quiet environments", "One-on-one discussions",
    "Structured meetings", "Informal conversations", "Digital communication tools", "Sign language or interpreters"
  ];

  const socialPreferenceOptions = [
    "Small groups", "One-on-one interactions", "Large social gatherings", "Online communities",
    "Structured activities", "Spontaneous meetups", "Shared interest groups", "Quiet environments",
    "Active social roles", "Observing rather than participating", "Familiar people", "Meeting new people",
    "Regular social contact", "Occasional social contact", "Professional relationships", "Personal friendships"
  ];

  const independentSkillOptions = [
    "Personal care and hygiene", "Meal planning and cooking", "Shopping and budgeting", "Using public transport",
    "Managing appointments", "Household maintenance", "Using technology", "Managing medications",
    "Banking and finances", "Communication skills", "Problem-solving", "Time management",
    "Self-advocacy", "Emergency procedures", "Work-related skills", "Social skills"
  ];

  const supportNeedOptions = [
    "Personal care assistance", "Meal preparation", "Transportation support", "Medication management",
    "Appointment scheduling", "Financial management", "Communication support", "Technology assistance",
    "Household tasks", "Social support", "Advocacy support", "Crisis intervention",
    "Skills training", "Emotional support", "Healthcare coordination", "Employment support"
  ];

  const workPreferenceOptions = [
    "Structured environment", "Flexible schedule", "Working independently", "Team collaboration",
    "Clear instructions", "Variety in tasks", "Routine work", "Creative projects",
    "Customer interaction", "Behind-the-scenes work", "Physical activity", "Desk-based work",
    "Problem-solving tasks", "Detail-oriented work", "Leadership opportunities", "Supportive supervision"
  ];

  const workAccommodationOptions = [
    "Flexible working hours", "Quiet workspace", "Written instructions", "Regular check-ins",
    "Modified duties", "Assistive technology", "Job coaching", "Transportation assistance",
    "Frequent breaks", "Reduced workload", "Clear expectations", "Supportive supervision",
    "Ergonomic equipment", "Communication aids", "Training support", "Peer mentoring"
  ];

  const commonChallengeOptions = [
    "Communication difficulties", "Social situations", "Changes in routine", "Sensory sensitivities",
    "Time management", "Organization", "Memory issues", "Concentration problems",
    "Anxiety and stress", "Decision making", "Problem-solving", "Managing emotions",
    "Physical limitations", "Technology challenges", "Financial management", "Transportation issues"
  ];

  const copingStrategyOptions = [
    "Deep breathing exercises", "Physical exercise", "Meditation or mindfulness", "Listening to music",
    "Talking to trusted people", "Writing or journaling", "Creative activities", "Taking breaks",
    "Using fidget tools", "Organizing environment", "Following routines", "Seeking professional help",
    "Problem-solving techniques", "Positive self-talk", "Time management strategies", "Setting boundaries"
  ];

  const warningSignOptions = [
    "Increased anxiety or stress", "Changes in sleep patterns", "Loss of appetite", "Social withdrawal",
    "Difficulty concentrating", "Increased irritability", "Physical symptoms", "Neglecting self-care",
    "Avoiding responsibilities", "Mood changes", "Increased conflicts", "Loss of interest in activities",
    "Changes in behavior", "Expressing hopelessness", "Increased substance use", "Risky behaviors"
  ];

  const supportStrategyOptions = [
    "Regular check-ins", "Clear communication", "Flexible expectations", "Emotional support",
    "Practical assistance", "Professional counseling", "Peer support groups", "Family involvement",
    "Structured routines", "Goal setting and planning", "Skills training", "Crisis planning",
    "Advocacy support", "Environmental modifications", "Technology support", "Community resources"
  ];

  const skillsToLearnOptions = [
    "Communication skills", "Technology skills", "Financial management", "Time management",
    "Self-advocacy", "Problem-solving", "Social skills", "Work skills",
    "Independent living skills", "Health management", "Stress management", "Leadership skills",
    "Creative skills", "Learning strategies", "Relationship skills", "Community navigation"
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

      // Helper function to add lists
      const addList = (items: string[]) => {
        if (items.length > 0) {
          items.forEach(item => addText(`• ${item}`));
        } else {
          addText('• Not specified');
        }
      };

      // Title
      pdf.setFillColor(22, 163, 74); // Green
      pdf.rect(margin, yPosition, contentWidth, 15, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.text('ALL ABOUT ME PROFILE', margin + 5, yPosition + 10);
      yPosition += 25;
      
      // Reset text color
      pdf.setTextColor(0, 0, 0);

      // Personal Information
      addText('Personal Information:', 14, true);
      addText(`Name: ${formData.name || 'Not provided'}`);
      addText(`Age: ${formData.age || 'Not provided'}`);
      addText(`Pronouns: ${formData.pronouns || 'Not specified'}`);
      if (formData.address) addText(`Address: ${formData.address}`);
      if (formData.phone) addText(`Phone: ${formData.phone}`);
      if (formData.email) addText(`Email: ${formData.email}`);
      if (formData.emergencyContact) addText(`Emergency Contact: ${formData.emergencyContact}`);
      yPosition += 5;

      // Personal Identity
      addText('Personal Identity:', 14, true);
      addText('My values:');
      addList(formData.personalValues);
      addText('My interests:');
      addList(formData.interests);
      addText('My strengths:');
      addList(formData.strengths);
      if (formData.culturalBackground) addText(`Cultural background: ${formData.culturalBackground}`);
      yPosition += 5;

      // Communication and Social
      addText('Communication and Social Preferences:', 14, true);
      addText('Communication preferences:');
      addList(formData.communicationPreferences);
      if (formData.communicationNeeds) addText(`Communication needs: ${formData.communicationNeeds}`);
      addText('Social preferences:');
      addList(formData.socialPreferences);
      if (formData.relationshipStyle) addText(`Relationship style: ${formData.relationshipStyle}`);
      yPosition += 5;

      // Daily Living and Independence
      addText('Daily Living and Independence:', 14, true);
      if (formData.livingArrangement) addText(`Living arrangement: ${formData.livingArrangement}`);
      if (formData.dailyRoutines) addText(`Daily routines: ${formData.dailyRoutines}`);
      addText('Independent skills:');
      addList(formData.independentSkills);
      addText('Support needs:');
      addList(formData.supportNeeds);
      yPosition += 5;

      // Health and Medical
      if (formData.medicalConditions || formData.medications || formData.allergies || formData.healthcareProviders || formData.mentalHealthSupport) {
        addText('Health and Medical Information:', 14, true);
        if (formData.medicalConditions) addText(`Medical conditions: ${formData.medicalConditions}`);
        if (formData.medications) addText(`Medications: ${formData.medications}`);
        if (formData.allergies) addText(`Allergies: ${formData.allergies}`);
        if (formData.healthcareProviders) addText(`Healthcare providers: ${formData.healthcareProviders}`);
        if (formData.mentalHealthSupport) addText(`Mental health support: ${formData.mentalHealthSupport}`);
        yPosition += 5;
      }

      // Work and Education
      addText('Work and Education:', 14, true);
      if (formData.employmentStatus) addText(`Employment status: ${formData.employmentStatus}`);
      addText('Work preferences:');
      addList(formData.workPreferences);
      addText('Work accommodations:');
      addList(formData.workAccommodations);
      if (formData.educationGoals) addText(`Education goals: ${formData.educationGoals}`);
      yPosition += 5;

      // Challenges and Support
      addText('Challenges and Support:', 14, true);
      addText('Common challenges:');
      addList(formData.commonChallenges);
      if (formData.triggers) addText(`Triggers: ${formData.triggers}`);
      addText('Coping strategies:');
      addList(formData.copingStrategies);
      addText('Warning signs:');
      addList(formData.warningSigns);
      addText('Support strategies:');
      addList(formData.supportStrategies);
      yPosition += 5;

      // Goals and Aspirations
      addText('Goals and Aspirations:', 14, true);
      if (formData.shortTermGoals) addText(`Short-term goals: ${formData.shortTermGoals}`);
      if (formData.longTermGoals) addText(`Long-term goals: ${formData.longTermGoals}`);
      addText('Skills to learn:');
      addList(formData.skillsToLearn);
      yPosition += 5;

      // Important Information
      if (formData.importantInfo || formData.safetyConsiderations || formData.additionalNotes) {
        addText('Important Information:', 14, true);
        if (formData.importantInfo) addText(`Important information: ${formData.importantInfo}`);
        if (formData.safetyConsiderations) addText(`Safety considerations: ${formData.safetyConsiderations}`);
        if (formData.additionalNotes) addText(`Additional notes: ${formData.additionalNotes}`);
      }

      // Footer
      yPosition += 15;
      pdf.setFontSize(10);
      pdf.setTextColor(128, 128, 128);
      addText('Created with Noa\'s Place Interactive Tools - www.noasplace.org.uk', 10);

      // Save the PDF
      const fileName = `${formData.name || 'Individual'}_All_About_Me_Profile.pdf`;
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            
            <h1 className="text-4xl font-black text-white sm:text-5xl md:text-6xl mb-6 drop-shadow-lg">
              All About Me Profile
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto drop-shadow-md">
              Comprehensive personal profile for sharing with healthcare providers, support services, and new contacts
            </p>
          </div>
        </div>
      </section>

      {/* Guidance Section */}
      <section className="py-8 bg-emerald-50 border-b">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-4">
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
                  <h3 className="text-lg font-bold text-emerald-800 mb-2">About This Profile</h3>
                  <p className="text-emerald-700 text-sm leading-relaxed">
                    This comprehensive profile helps you share important information about yourself with healthcare providers, 
                    support services, employers, and new contacts in your life. You can complete this independently or with 
                    support from family, friends, or professionals. The finished profile serves as a valuable communication 
                    tool to help others understand your needs, preferences, and strengths.
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
                    <strong>Important:</strong> All information you enter in this form is completely private and secure. 
                    We do not store, save, or share any of your personal details on our website or servers. Everything 
                    you enter is only saved when you download your profile as a PDF file to your own device. Your privacy 
                    and confidentiality are our top priority.
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
            
            {/* Personal Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="text"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Your age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pronouns</label>
                  <input
                    type="text"
                    value={formData.pronouns}
                    onChange={(e) => handleInputChange('pronouns', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., she/her, he/him, they/them"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Your email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                  <input
                    type="text"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Name and phone number of emergency contact"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={2}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Your address"
                  />
                </div>
              </div>
            </div>

            {/* Personal Identity */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Personal Identity</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    My personal values (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {personalValueOptions.map((value) => (
                      <label key={value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.personalValues.includes(value)}
                          onChange={() => handleMultiSelect('personalValues', value)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{value}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    My interests and hobbies (select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {interestOptions.map((interest) => (
                      <label key={interest} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleMultiSelect('interests', interest)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    My strengths and abilities (select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {strengthOptions.map((strength) => (
                      <label key={strength} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.strengths.includes(strength)}
                          onChange={() => handleMultiSelect('strengths', strength)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{strength}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cultural background and heritage
                  </label>
                  <textarea
                    value={formData.culturalBackground}
                    onChange={(e) => handleInputChange('culturalBackground', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Share information about your cultural background, traditions, or heritage that are important to you..."
                  />
                </div>
              </div>
            </div>

            {/* Communication and Social */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Communication and Social Preferences</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How I prefer to communicate (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {communicationPreferenceOptions.map((preference) => (
                      <label key={preference} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.communicationPreferences.includes(preference)}
                          onChange={() => handleMultiSelect('communicationPreferences', preference)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{preference}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specific communication needs or considerations
                  </label>
                  <textarea
                    value={formData.communicationNeeds}
                    onChange={(e) => handleInputChange('communicationNeeds', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Describe any specific communication needs, assistive devices, or considerations..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    My social preferences (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {socialPreferenceOptions.map((preference) => (
                      <label key={preference} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.socialPreferences.includes(preference)}
                          onChange={() => handleMultiSelect('socialPreferences', preference)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{preference}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    My approach to relationships
                  </label>
                  <textarea
                    value={formData.relationshipStyle}
                    onChange={(e) => handleInputChange('relationshipStyle', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Describe how you build and maintain relationships, what you value in relationships..."
                  />
                </div>
              </div>
            </div>

            {/* Daily Living and Independence */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Daily Living and Independence</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current living arrangement
                  </label>
                  <input
                    type="text"
                    value={formData.livingArrangement}
                    onChange={(e) => handleInputChange('livingArrangement', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., Independent living, with family, supported accommodation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Daily routines and preferences
                  </label>
                  <textarea
                    value={formData.dailyRoutines}
                    onChange={(e) => handleInputChange('dailyRoutines', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Describe your typical daily routine, important routines, or preferences..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Skills I can do independently (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {independentSkillOptions.map((skill) => (
                      <label key={skill} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.independentSkills.includes(skill)}
                          onChange={() => handleMultiSelect('independentSkills', skill)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Areas where I need support (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {supportNeedOptions.map((need) => (
                      <label key={need} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.supportNeeds.includes(need)}
                          onChange={() => handleMultiSelect('supportNeeds', need)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{need}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Health and Medical */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Health and Medical Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical conditions or diagnoses
                  </label>
                  <textarea
                    value={formData.medicalConditions}
                    onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="List any medical conditions, disabilities, or diagnoses..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current medications
                  </label>
                  <textarea
                    value={formData.medications}
                    onChange={(e) => handleInputChange('medications', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="List medications, dosages, and timing..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Allergies and reactions
                  </label>
                  <input
                    type="text"
                    value={formData.allergies}
                    onChange={(e) => handleInputChange('allergies', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="List any allergies to foods, medications, or other substances..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Healthcare providers
                  </label>
                  <textarea
                    value={formData.healthcareProviders}
                    onChange={(e) => handleInputChange('healthcareProviders', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="List your doctors, specialists, and other healthcare providers..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mental health support
                  </label>
                  <textarea
                    value={formData.mentalHealthSupport}
                    onChange={(e) => handleInputChange('mentalHealthSupport', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Describe any mental health support, counseling, or therapy you receive..."
                  />
                </div>
              </div>
            </div>

            {/* Work and Education */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Work and Education</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current employment status
                  </label>
                  <input
                    type="text"
                    value={formData.employmentStatus}
                    onChange={(e) => handleInputChange('employmentStatus', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., Employed full-time, part-time, student, seeking employment"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    My work preferences (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {workPreferenceOptions.map((preference) => (
                      <label key={preference} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.workPreferences.includes(preference)}
                          onChange={() => handleMultiSelect('workPreferences', preference)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{preference}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Work accommodations that help me (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {workAccommodationOptions.map((accommodation) => (
                      <label key={accommodation} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.workAccommodations.includes(accommodation)}
                          onChange={() => handleMultiSelect('workAccommodations', accommodation)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{accommodation}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education and learning goals
                  </label>
                  <textarea
                    value={formData.educationGoals}
                    onChange={(e) => handleInputChange('educationGoals', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Describe any education or training goals you have..."
                  />
                </div>
              </div>
            </div>

            {/* Challenges and Support */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Challenges and Support</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Common challenges I face (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {commonChallengeOptions.map((challenge) => (
                      <label key={challenge} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.commonChallenges.includes(challenge)}
                          onChange={() => handleMultiSelect('commonChallenges', challenge)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{challenge}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specific triggers or situations that are difficult
                  </label>
                  <textarea
                    value={formData.triggers}
                    onChange={(e) => handleInputChange('triggers', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Describe specific situations, environments, or triggers that are challenging..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    My coping strategies (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {copingStrategyOptions.map((strategy) => (
                      <label key={strategy} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.copingStrategies.includes(strategy)}
                          onChange={() => handleMultiSelect('copingStrategies', strategy)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{strategy}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Warning signs that I'm struggling (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {warningSignOptions.map((sign) => (
                      <label key={sign} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.warningSigns.includes(sign)}
                          onChange={() => handleMultiSelect('warningSigns', sign)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{sign}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Support strategies that help me (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {supportStrategyOptions.map((strategy) => (
                      <label key={strategy} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.supportStrategies.includes(strategy)}
                          onChange={() => handleMultiSelect('supportStrategies', strategy)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{strategy}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Goals and Aspirations */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Goals and Aspirations</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short-term goals (next 6-12 months)
                  </label>
                  <textarea
                    value={formData.shortTermGoals}
                    onChange={(e) => handleInputChange('shortTermGoals', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="What do you want to achieve in the near future?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Long-term goals (1-5 years)
                  </label>
                  <textarea
                    value={formData.longTermGoals}
                    onChange={(e) => handleInputChange('longTermGoals', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="What are your longer-term aspirations and dreams?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Skills I want to learn or improve (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {skillsToLearnOptions.map((skill) => (
                      <label key={skill} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.skillsToLearn.includes(skill)}
                          onChange={() => handleMultiSelect('skillsToLearn', skill)}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-sm">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Important Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Important information others should know
                  </label>
                  <textarea
                    value={formData.importantInfo}
                    onChange={(e) => handleInputChange('importantInfo', e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Share any other important information that would help others understand and support you..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Safety considerations
                  </label>
                  <textarea
                    value={formData.safetyConsiderations}
                    onChange={(e) => handleInputChange('safetyConsiderations', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Describe any safety considerations, risks, or precautions..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional notes
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Any other thoughts or information you'd like to include..."
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
