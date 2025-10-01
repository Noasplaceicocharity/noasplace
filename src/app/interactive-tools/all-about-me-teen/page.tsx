"use client";

import { useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";

export default function AllAboutMeTeenPage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    pronouns: "",
    school: "",
    supportPerson: "",
    
    // Personal Identity
    interests: [] as string[],
    strengths: [] as string[],
    values: [] as string[],
    
    // Learning and Education
    learningStyle: [] as string[],
    academicStrengths: [] as string[],
    academicChallenges: [] as string[],
    accommodations: [] as string[],
    
    // Social and Relationships
    socialPreferences: [] as string[],
    communicationStyle: [] as string[],
    relationshipNeeds: "",
    
    // Mental Health and Wellbeing
    stressors: [] as string[],
    copingStrategies: [] as string[],
    warningSigns: [] as string[],
    supportStrategies: [] as string[],
    
    // Daily Life and Independence
    dailyLivingSkills: [] as string[],
    independenceGoals: [] as string[],
    supportNeeds: [] as string[],
    
    // Future Planning
    careerInterests: [] as string[],
    postSchoolGoals: "",
    skillsToLearn: [] as string[],
    
    // Health and Medical
    medicalConditions: "",
    medications: "",
    allergies: "",
    emergencyContacts: "",
    
    // Additional Information
    importantInfo: "",
    personalGoals: "",
    additionalNotes: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const interestOptions = [
    "Music and concerts", "Art and creativity", "Sports and fitness", "Gaming and technology",
    "Reading and writing", "Science and research", "Social media", "Fashion and style",
    "Cooking and food", "Travel and cultures", "Environmental issues", "Social justice",
    "Photography", "Drama and theatre", "Dance", "Volunteering"
  ];

  const strengthOptions = [
    "Creative thinking", "Problem solving", "Attention to detail", "Good memory",
    "Empathy and understanding", "Leadership skills", "Technical abilities", "Artistic talents",
    "Mathematical skills", "Communication skills", "Organization", "Persistence",
    "Helping others", "Independent thinking", "Research skills", "Practical skills"
  ];

  const valueOptions = [
    "Honesty and truth", "Fairness and justice", "Kindness and compassion", "Independence",
    "Family and relationships", "Learning and growth", "Creativity and expression", "Achievement",
    "Security and stability", "Adventure and excitement", "Helping others", "Environmental care",
    "Diversity and inclusion", "Personal freedom", "Tradition", "Innovation"
  ];

  const learningStyleOptions = [
    "Visual learning (diagrams, charts)", "Hands-on activities", "Reading and writing",
    "Listening and discussion", "Working alone", "Group work", "Structured environment",
    "Flexible schedule", "Technology-based learning", "Real-world applications",
    "Step-by-step instructions", "Creative projects", "Regular breaks", "Movement while learning"
  ];

  const accommodationOptions = [
    "Extended time on tests", "Quiet testing environment", "Written instructions",
    "Use of technology", "Regular check-ins", "Modified assignments", "Alternative assessments",
    "Preferential seating", "Note-taking assistance", "Audio recordings", "Visual aids",
    "Frequent breaks", "Reduced workload", "Flexible deadlines", "One-on-one support"
  ];

  const socialPreferenceOptions = [
    "Small groups", "One-on-one interactions", "Online communication", "Structured activities",
    "Shared interests", "Quiet environments", "Familiar people", "New experiences",
    "Leadership roles", "Supporting roles", "Creative collaboration", "Competitive activities",
    "Casual hangouts", "Organized events", "Text-based communication", "Face-to-face meetings"
  ];

  const communicationStyleOptions = [
    "Direct and straightforward", "Gentle and supportive", "Detailed explanations",
    "Brief and to the point", "Visual communication", "Written communication",
    "Verbal discussion", "Non-verbal cues", "Time to process", "Immediate feedback",
    "Structured conversations", "Informal chat", "Digital communication", "In-person talks"
  ];

  const stressorOptions = [
    "Academic pressure", "Social situations", "Changes in routine", "Loud environments",
    "Conflict with others", "Time pressure", "Uncertainty", "Perfectionism",
    "Family issues", "Health concerns", "Financial worries", "Future planning",
    "Technology problems", "Transportation issues", "Sleep problems", "Sensory overload"
  ];

  const copingStrategyOptions = [
    "Deep breathing", "Physical exercise", "Listening to music", "Talking to someone",
    "Writing or journaling", "Art or creative activities", "Meditation or mindfulness",
    "Taking breaks", "Getting fresh air", "Using fidget tools", "Organizing tasks",
    "Seeking help", "Problem-solving", "Positive self-talk", "Time management", "Setting boundaries"
  ];

  const warningSignOptions = [
    "Increased irritability", "Withdrawal from others", "Changes in sleep", "Loss of appetite",
    "Difficulty concentrating", "Increased anxiety", "Physical symptoms", "Mood swings",
    "Avoiding responsibilities", "Negative self-talk", "Increased conflicts", "Loss of interest",
    "Fatigue", "Restlessness", "Perfectionist behaviors", "Risky behaviors"
  ];

  const supportStrategyOptions = [
    "Regular check-ins", "Flexible expectations", "Clear communication", "Emotional support",
    "Practical assistance", "Professional counseling", "Peer support", "Family involvement",
    "Structured routines", "Goal setting", "Skill building", "Crisis planning",
    "Advocacy support", "Educational accommodations", "Workplace adjustments", "Community resources"
  ];

  const dailyLivingOptions = [
    "Personal hygiene", "Meal planning and cooking", "Money management", "Transportation",
    "Time management", "Organization skills", "Household tasks", "Self-advocacy",
    "Healthcare management", "Technology use", "Social skills", "Problem-solving",
    "Emergency procedures", "Communication skills", "Work skills", "Leisure activities"
  ];

  const independenceGoalOptions = [
    "Living independently", "Managing finances", "Driving or using transport", "Cooking meals",
    "Managing healthcare", "Maintaining relationships", "Pursuing education", "Finding employment",
    "Developing hobbies", "Self-advocacy", "Community involvement", "Personal safety",
    "Technology skills", "Life planning", "Stress management", "Decision making"
  ];

  const careerInterestOptions = [
    "Healthcare", "Education", "Technology", "Arts and media", "Business", "Science",
    "Social services", "Trades and crafts", "Sports and fitness", "Hospitality",
    "Environmental work", "Government", "Non-profit work", "Entrepreneurship",
    "Research", "Creative industries", "Engineering", "Agriculture"
  ];

  const skillsToLearnOptions = [
    "Communication skills", "Leadership abilities", "Technical skills", "Creative skills",
    "Problem-solving", "Time management", "Financial literacy", "Digital literacy",
    "Research skills", "Critical thinking", "Teamwork", "Self-advocacy",
    "Stress management", "Conflict resolution", "Planning and organization", "Networking"
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
      pdf.setFillColor(147, 51, 234); // Purple
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
      addText(`School: ${formData.school || 'Not provided'}`);
      addText(`Support Person: ${formData.supportPerson || 'Not provided'}`);
      yPosition += 5;

      // Personal Identity
      addText('Personal Identity:', 14, true);
      addText('My interests:');
      addList(formData.interests);
      addText('My strengths:');
      addList(formData.strengths);
      addText('My values:');
      addList(formData.values);
      yPosition += 5;

      // Learning and Education
      addText('Learning and Education:', 14, true);
      addText('How I learn best:');
      addList(formData.learningStyle);
      addText('Academic strengths:');
      addList(formData.academicStrengths);
      addText('Academic challenges:');
      addList(formData.academicChallenges);
      addText('Helpful accommodations:');
      addList(formData.accommodations);
      yPosition += 5;

      // Social and Relationships
      addText('Social and Relationships:', 14, true);
      addText('Social preferences:');
      addList(formData.socialPreferences);
      addText('Communication style:');
      addList(formData.communicationStyle);
      if (formData.relationshipNeeds) {
        addText(`Relationship needs: ${formData.relationshipNeeds}`);
      }
      yPosition += 5;

      // Mental Health and Wellbeing
      addText('Mental Health and Wellbeing:', 14, true);
      addText('Common stressors:');
      addList(formData.stressors);
      addText('Coping strategies:');
      addList(formData.copingStrategies);
      addText('Warning signs to watch for:');
      addList(formData.warningSigns);
      addText('Helpful support strategies:');
      addList(formData.supportStrategies);
      yPosition += 5;

      // Daily Life and Independence
      addText('Daily Life and Independence:', 14, true);
      addText('Daily living skills:');
      addList(formData.dailyLivingSkills);
      addText('Independence goals:');
      addList(formData.independenceGoals);
      addText('Support needs:');
      addList(formData.supportNeeds);
      yPosition += 5;

      // Future Planning
      addText('Future Planning:', 14, true);
      addText('Career interests:');
      addList(formData.careerInterests);
      if (formData.postSchoolGoals) {
        addText(`Post-school goals: ${formData.postSchoolGoals}`);
      }
      addText('Skills I want to learn:');
      addList(formData.skillsToLearn);
      yPosition += 5;

      // Health and Medical
      if (formData.medicalConditions || formData.medications || formData.allergies || formData.emergencyContacts) {
        addText('Health and Medical Information:', 14, true);
        if (formData.medicalConditions) addText(`Medical conditions: ${formData.medicalConditions}`);
        if (formData.medications) addText(`Medications: ${formData.medications}`);
        if (formData.allergies) addText(`Allergies: ${formData.allergies}`);
        if (formData.emergencyContacts) addText(`Emergency contacts: ${formData.emergencyContacts}`);
        yPosition += 5;
      }

      // Additional Information
      if (formData.importantInfo || formData.personalGoals || formData.additionalNotes) {
        addText('Additional Information:', 14, true);
        if (formData.importantInfo) addText(`Important information: ${formData.importantInfo}`);
        if (formData.personalGoals) addText(`Personal goals: ${formData.personalGoals}`);
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                <path d="M8 3.13a4 4 0 0 0 0 7.75"/>
              </svg>
            </div>
            
            <h1 className="text-4xl font-black text-white sm:text-5xl md:text-6xl mb-6 drop-shadow-lg">
              All About Me Profile
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto drop-shadow-md">
              Create a comprehensive profile to share with teachers, employers, and support services
            </p>
          </div>
        </div>
      </section>

      {/* Guidance Section */}
      <section className="py-8 bg-purple-50 border-b">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-4">
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
                  <h3 className="text-lg font-bold text-purple-800 mb-2">About This Profile</h3>
                  <p className="text-purple-700 text-sm leading-relaxed">
                    This comprehensive profile helps you share important information about yourself with teachers, 
                    employers, healthcare providers, and support services. Take your time filling it out - you can 
                    complete it independently or with support from family, friends, or professionals. The finished 
                    profile will help others understand your needs, strengths, and preferences.
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="text"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Your age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pronouns</label>
                  <input
                    type="text"
                    value={formData.pronouns}
                    onChange={(e) => handleInputChange('pronouns', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., she/her, he/him, they/them"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">School/College</label>
                  <input
                    type="text"
                    value={formData.school}
                    onChange={(e) => handleInputChange('school', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Name of your school or college"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Person (if applicable)</label>
                  <input
                    type="text"
                    value={formData.supportPerson}
                    onChange={(e) => handleInputChange('supportPerson', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Name and role of someone who helps support you"
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
                    My interests and hobbies (select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {interestOptions.map((interest) => (
                      <label key={interest} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleMultiSelect('interests', interest)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    My strengths and talents (select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {strengthOptions.map((strength) => (
                      <label key={strength} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.strengths.includes(strength)}
                          onChange={() => handleMultiSelect('strengths', strength)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm">{strength}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What's important to me (values) (select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {valueOptions.map((value) => (
                      <label key={value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.values.includes(value)}
                          onChange={() => handleMultiSelect('values', value)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm">{value}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Learning and Education */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Learning and Education</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How I learn best (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {learningStyleOptions.map((style) => (
                      <label key={style} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.learningStyle.includes(style)}
                          onChange={() => handleMultiSelect('learningStyle', style)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm">{style}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    My academic strengths (select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {strengthOptions.map((strength) => (
                      <label key={strength} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.academicStrengths.includes(strength)}
                          onChange={() => handleMultiSelect('academicStrengths', strength)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm">{strength}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Academic areas I find challenging
                  </label>
                  <textarea
                    value={formData.academicChallenges.join(', ')}
                    onChange={(e) => setFormData({...formData, academicChallenges: e.target.value.split(', ').filter(item => item.trim())})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="List subjects or skills you find difficult (separate with commas)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Accommodations that help me (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {accommodationOptions.map((accommodation) => (
                      <label key={accommodation} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.accommodations.includes(accommodation)}
                          onChange={() => handleMultiSelect('accommodations', accommodation)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm">{accommodation}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Social and Relationships */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Social and Relationships</h2>
              
              <div className="space-y-6">
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
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm">{preference}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How I prefer to communicate (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {communicationStyleOptions.map((style) => (
                      <label key={style} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.communicationStyle.includes(style)}
                          onChange={() => handleMultiSelect('communicationStyle', style)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm">{style}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What I need in relationships and friendships
                  </label>
                  <textarea
                    value={formData.relationshipNeeds}
                    onChange={(e) => handleInputChange('relationshipNeeds', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe what helps you build and maintain good relationships..."
                  />
                </div>
              </div>
            </div>

            {/* Mental Health and Wellbeing */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Mental Health and Wellbeing</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Things that commonly stress me (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {stressorOptions.map((stressor) => (
                      <label key={stressor} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.stressors.includes(stressor)}
                          onChange={() => handleMultiSelect('stressors', stressor)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm">{stressor}</span>
                      </label>
                    ))}
                  </div>
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
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
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
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
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
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm">{strategy}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Life and Independence */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Daily Life and Independence</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Daily living skills I'm working on (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {dailyLivingOptions.map((skill) => (
                      <label key={skill} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.dailyLivingSkills.includes(skill)}
                          onChange={() => handleMultiSelect('dailyLivingSkills', skill)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    My independence goals (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {independenceGoalOptions.map((goal) => (
                      <label key={goal} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.independenceGoals.includes(goal)}
                          onChange={() => handleMultiSelect('independenceGoals', goal)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm">{goal}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Areas where I need ongoing support
                  </label>
                  <textarea
                    value={formData.supportNeeds.join(', ')}
                    onChange={(e) => setFormData({...formData, supportNeeds: e.target.value.split(', ').filter(item => item.trim())})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="List areas where you need help or support (separate with commas)"
                  />
                </div>
              </div>
            </div>

            {/* Future Planning */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Future Planning</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Career areas that interest me (select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {careerInterestOptions.map((career) => (
                      <label key={career} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.careerInterests.includes(career)}
                          onChange={() => handleMultiSelect('careerInterests', career)}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm">{career}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    My goals after school/college
                  </label>
                  <textarea
                    value={formData.postSchoolGoals}
                    onChange={(e) => handleInputChange('postSchoolGoals', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe your plans and aspirations for after you finish school or college..."
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
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm">{skill}</span>
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    rows={2}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="List any medications you take regularly..."
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="List any allergies to foods, medications, or other substances..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency contacts
                  </label>
                  <textarea
                    value={formData.emergencyContacts}
                    onChange={(e) => handleInputChange('emergencyContacts', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="List emergency contacts with names, relationships, and phone numbers..."
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Additional Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Important information others should know
                  </label>
                  <textarea
                    value={formData.importantInfo}
                    onChange={(e) => handleInputChange('importantInfo', e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Share any other important information about yourself that would help others understand and support you..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    My personal goals
                  </label>
                  <textarea
                    value={formData.personalGoals}
                    onChange={(e) => handleInputChange('personalGoals', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="What are your personal goals and aspirations..."
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
