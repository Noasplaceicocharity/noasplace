"use client";

import { useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";

export default function SensoryOverloadTeenPage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    pronouns: "",
    school: "",
    supportPerson: "",
    
    // Sensory triggers
    soundTriggers: [] as string[],
    lightTriggers: [] as string[],
    touchTriggers: [] as string[],
    smellTriggers: [] as string[],
    tasteTriggers: [] as string[],
    movementTriggers: [] as string[],
    
    // Calming strategies
    soundCalming: [] as string[],
    lightCalming: [] as string[],
    touchCalming: [] as string[],
    smellCalming: [] as string[],
    tasteCalming: [] as string[],
    movementCalming: [] as string[],
    
    // Warning signs and strategies
    warningSigns: [] as string[],
    copingStrategies: [] as string[],
    safeSpaces: [] as string[],
    emergencyStrategies: [] as string[],
    
    // Additional information
    additionalTriggers: "",
    additionalCalming: "",
    importantInfo: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // Sound trigger options for teens
  const soundTriggerOptions = [
    "Loud music or concerts", "Crowd noise and chatter", "Alarms and sirens", "Construction noise",
    "Multiple conversations at once", "High-pitched sounds", "Sudden loud sounds", "Electronic beeping",
    "Traffic noise", "School bells", "Fire alarms", "Vacuum cleaners"
  ];

  // Sound calming options for teens
  const soundCalmingOptions = [
    "Instrumental music", "Nature sounds", "White noise", "Calm podcasts or audiobooks",
    "Complete silence", "Ambient music", "Classical music", "Rain sounds",
    "Ocean waves", "Soft instrumental", "Meditation music", "Quiet background music"
  ];

  // Light trigger options for teens
  const lightTriggerOptions = [
    "Fluorescent lights", "Bright computer/phone screens", "Flashing lights", "Strobe lights",
    "Bright sunlight", "Patterned or flickering lights", "Harsh overhead lighting", "LED lights",
    "Car headlights at night", "TV or monitor glare", "Disco or party lights", "Emergency vehicle lights"
  ];

  // Light calming options for teens
  const lightCalmingOptions = [
    "Natural daylight", "Dim or soft lighting", "Warm coloured lights", "Candles or soft flames",
    "Darkness or low light", "Blue light filters", "Lamp light", "Sunset/sunrise light",
    "Coloured LED strips", "Fairy lights", "Salt lamps", "Natural candlelight"
  ];

  // Touch trigger options for teens
  const touchTriggerOptions = [
    "Rough or scratchy textures", "Tight or restrictive clothing", "Clothing tags or labels", "Unexpected touch",
    "Wet or sticky substances", "Certain fabrics (wool, polyester)", "Hair touching face", "Tight shoes",
    "Jewelry or accessories", "Certain textures on hands", "Wind or air movement", "Temperature extremes"
  ];

  // Touch calming options for teens
  const touchCalmingOptions = [
    "Soft textures and fabrics", "Weighted blankets or lap pads", "Gentle massage or pressure", "Fidget toys or stress balls",
    "Warm baths or showers", "Soft blankets or pillows", "Hugging or deep pressure", "Smooth stones or crystals",
    "Soft brushes or combs", "Cool surfaces", "Familiar textures", "Gentle self-massage"
  ];

  // Smell trigger options for teens
  const smellTriggerOptions = [
    "Strong perfumes or colognes", "Cleaning products", "Certain food smells", "Smoke or burning smells",
    "Chemical or synthetic smells", "Strong cooking odors", "Air fresheners", "Gasoline or fuel",
    "Paint or solvents", "Certain flowers or plants", "Body odor", "Medication smells"
  ];

  // Smell calming options for teens
  const smellCalmingOptions = [
    "Lavender", "Vanilla", "Fresh air or outdoors", "Citrus scents",
    "Mint or eucalyptus", "Baking smells", "Essential oils", "Fresh laundry",
    "Natural scents", "Familiar perfumes", "Ocean or sea air", "Wood or nature scents"
  ];

  // Taste trigger options for teens
  const tasteTriggerOptions = [
    "Spicy foods", "Bitter tastes", "Sour foods", "Mushy or soft textures",
    "Mixed textures in food", "Very hot or cold foods", "Certain strong flavors", "Medication tastes",
    "Artificial flavors", "Certain vegetables", "Overly sweet foods", "Unfamiliar foods"
  ];

  // Taste calming options for teens
  const tasteCalmingOptions = [
    "Sweet tastes", "Warm drinks (tea, hot chocolate)", "Cold drinks", "Chewing gum or mints",
    "Familiar comfort foods", "Smooth textures", "Mild flavors", "Favourite snacks",
    "Water or hydrating drinks", "Soft foods", "Familiar recipes", "Comforting textures"
  ];

  // Movement trigger options for teens
  const movementTriggerOptions = [
    "Crowded spaces", "Unexpected touch or bumping", "Fast or sudden movements", "Spinning or rotating",
    "Elevators or lifts", "Car rides or transport", "Being in large groups", "Unpredictable movements",
    "Being rushed or hurried", "Certain types of exercise", "Dancing or rhythmic movement", "Being in small spaces"
  ];

  // Movement calming options for teens
  const movementCalmingOptions = [
    "Deep breathing exercises", "Gentle stretching or yoga", "Slow walking", "Rocking or swaying",
    "Sitting still and quiet", "Gentle self-massage", "Pacing or walking in circles", "Swimming or floating",
    "Meditation or mindfulness", "Gentle exercise", "Dancing to calm music", "Being in nature"
  ];

  // Warning signs options
  const warningSignsOptions = [
    "Feeling overwhelmed or anxious", "Irritability or mood changes", "Difficulty concentrating", "Physical tension or headaches",
    "Avoiding certain situations", "Feeling the need to escape", "Increased sensitivity to stimuli", "Fatigue or exhaustion",
    "Restlessness or fidgeting", "Changes in breathing", "Muscle tension", "Feeling disconnected"
  ];

  // Coping strategies options
  const copingStrategiesOptions = [
    "Taking breaks when needed", "Using headphones or earplugs", "Finding quiet spaces", "Deep breathing exercises",
    "Using fidget toys or stress balls", "Listening to calming music", "Going for a walk", "Talking to someone trusted",
    "Using relaxation techniques", "Creating a sensory toolkit", "Planning ahead for difficult situations", "Practicing mindfulness"
  ];

  // Safe spaces options
  const safeSpacesOptions = [
    "My bedroom", "A quiet library", "Outdoors in nature", "A trusted friend's house",
    "A quiet corner at school", "The bathroom for privacy", "A car or vehicle", "A park or outdoor space",
    "A quiet café", "A sensory room if available", "My home", "Anywhere with trusted people"
  ];

  // Emergency strategies options
  const emergencyStrategiesOptions = [
    "Remove myself from the situation", "Use deep breathing techniques", "Find a quiet space immediately", "Contact a trusted person",
    "Use sensory tools (headphones, fidgets)", "Practice grounding techniques", "Ask for help from nearby people", "Use calming music or sounds",
    "Take prescribed medication if applicable", "Use a stress ball or fidget", "Focus on a single object", "Count or use other distraction techniques"
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

      // Title
      pdf.setFillColor(99, 102, 241); // Indigo
      pdf.rect(margin, yPosition, contentWidth, 15, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.text('MY SENSORY PROFILE', margin + 5, yPosition + 10);
      yPosition += 25;
      
      // Reset text color
      pdf.setTextColor(0, 0, 0);

      // Basic Information
      addText('Personal Information:', 14, true);
      addText(`Name: ${formData.name || 'Not provided'}`);
      addText(`Age: ${formData.age || 'Not provided'}`);
      addText(`Pronouns: ${formData.pronouns || 'Not specified'}`);
      addText(`School/College: ${formData.school || 'Not provided'}`);
      addText(`Support Person: ${formData.supportPerson || 'Not provided'}`);
      yPosition += 5;

      // Sound Triggers
      addText('SOUND TRIGGERS - What sounds make me feel overwhelmed:', 14, true);
      if (formData.soundTriggers.length > 0) {
        formData.soundTriggers.forEach(trigger => addText(`• ${trigger}`));
      } else {
        addText('• No sound triggers selected');
      }
      yPosition += 5;

      // Sound Calming
      addText('SOUND CALMING STRATEGIES - What sounds help me feel calm:', 14, true);
      if (formData.soundCalming.length > 0) {
        formData.soundCalming.forEach(calming => addText(`• ${calming}`));
      } else {
        addText('• No calming sounds selected');
      }
      yPosition += 5;

      // Light Triggers
      addText('LIGHT TRIGGERS - What lights make me feel overwhelmed:', 14, true);
      if (formData.lightTriggers.length > 0) {
        formData.lightTriggers.forEach(trigger => addText(`• ${trigger}`));
      } else {
        addText('• No light triggers selected');
      }
      yPosition += 5;

      // Light Calming
      addText('LIGHT CALMING STRATEGIES - What lights help me feel calm:', 14, true);
      if (formData.lightCalming.length > 0) {
        formData.lightCalming.forEach(calming => addText(`• ${calming}`));
      } else {
        addText('• No calming lights selected');
      }
      yPosition += 5;

      // Touch Triggers
      addText('TOUCH TRIGGERS - What touches make me feel overwhelmed:', 14, true);
      if (formData.touchTriggers.length > 0) {
        formData.touchTriggers.forEach(trigger => addText(`• ${trigger}`));
      } else {
        addText('• No touch triggers selected');
      }
      yPosition += 5;

      // Touch Calming
      addText('TOUCH CALMING STRATEGIES - What touches help me feel calm:', 14, true);
      if (formData.touchCalming.length > 0) {
        formData.touchCalming.forEach(calming => addText(`• ${calming}`));
      } else {
        addText('• No calming touches selected');
      }
      yPosition += 5;

      // Smell Triggers
      addText('SMELL TRIGGERS - What smells make me feel overwhelmed:', 14, true);
      if (formData.smellTriggers.length > 0) {
        formData.smellTriggers.forEach(trigger => addText(`• ${trigger}`));
      } else {
        addText('• No smell triggers selected');
      }
      yPosition += 5;

      // Smell Calming
      addText('SMELL CALMING STRATEGIES - What smells help me feel calm:', 14, true);
      if (formData.smellCalming.length > 0) {
        formData.smellCalming.forEach(calming => addText(`• ${calming}`));
      } else {
        addText('• No calming smells selected');
      }
      yPosition += 5;

      // Taste Triggers
      addText('TASTE TRIGGERS - What tastes make me feel overwhelmed:', 14, true);
      if (formData.tasteTriggers.length > 0) {
        formData.tasteTriggers.forEach(trigger => addText(`• ${trigger}`));
      } else {
        addText('• No taste triggers selected');
      }
      yPosition += 5;

      // Taste Calming
      addText('TASTE CALMING STRATEGIES - What tastes help me feel calm:', 14, true);
      if (formData.tasteCalming.length > 0) {
        formData.tasteCalming.forEach(calming => addText(`• ${calming}`));
      } else {
        addText('• No calming tastes selected');
      }
      yPosition += 5;

      // Movement Triggers
      addText('MOVEMENT TRIGGERS - What movements make me feel overwhelmed:', 14, true);
      if (formData.movementTriggers.length > 0) {
        formData.movementTriggers.forEach(trigger => addText(`• ${trigger}`));
      } else {
        addText('• No movement triggers selected');
      }
      yPosition += 5;

      // Movement Calming
      addText('MOVEMENT CALMING STRATEGIES - What movements help me feel calm:', 14, true);
      if (formData.movementCalming.length > 0) {
        formData.movementCalming.forEach(calming => addText(`• ${calming}`));
      } else {
        addText('• No calming movements selected');
      }
      yPosition += 5;

      // Warning Signs
      addText('WARNING SIGNS - Signs that indicate sensory overload:', 14, true);
      if (formData.warningSigns.length > 0) {
        formData.warningSigns.forEach(sign => addText(`• ${sign}`));
      } else {
        addText('• No warning signs selected');
      }
      yPosition += 5;

      // Coping Strategies
      addText('COPING STRATEGIES - Strategies that help manage sensory overload:', 14, true);
      if (formData.copingStrategies.length > 0) {
        formData.copingStrategies.forEach(strategy => addText(`• ${strategy}`));
      } else {
        addText('• No coping strategies selected');
      }
      yPosition += 5;

      // Safe Spaces
      addText('SAFE SPACES - Places where I feel safe and comfortable:', 14, true);
      if (formData.safeSpaces.length > 0) {
        formData.safeSpaces.forEach(space => addText(`• ${space}`));
      } else {
        addText('• No safe spaces selected');
      }
      yPosition += 5;

      // Emergency Strategies
      addText('EMERGENCY STRATEGIES - Strategies for severe sensory overload:', 14, true);
      if (formData.emergencyStrategies.length > 0) {
        formData.emergencyStrategies.forEach(strategy => addText(`• ${strategy}`));
      } else {
        addText('• No emergency strategies selected');
      }
      yPosition += 5;

      // Additional Information
      if (formData.additionalTriggers) {
        addText('ADDITIONAL SENSORY TRIGGERS:', 14, true);
        addText(formData.additionalTriggers);
        yPosition += 5;
      }

      if (formData.additionalCalming) {
        addText('ADDITIONAL CALMING STRATEGIES:', 14, true);
        addText(formData.additionalCalming);
        yPosition += 5;
      }

      if (formData.importantInfo) {
        addText('IMPORTANT INFORMATION FOR OTHERS:', 14, true);
        addText(formData.importantInfo);
        yPosition += 5;
      }

      // Footer
      yPosition += 15;
      pdf.setFontSize(10);
      pdf.setTextColor(128, 128, 128);
      addText('Created with Noa\'s Place Interactive Tools - www.noasplace.org.uk', 10);

      // Save the PDF
      const fileName = `${formData.name || 'Teen'}_Sensory_Profile.pdf`;
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
      <section className="relative isolate min-h-[300px] overflow-hidden bg-gradient-to-r from-purple-500 to-indigo-600">
        <div className="absolute inset-0 bg-purple-600/20"></div>
        
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
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                <path d="M20.2 7.8L16 12l4.2 4.2M3.8 7.8L8 12l-4.2 4.2"/>
              </svg>
            </div>
            
            <h1 className="text-4xl font-black text-white sm:text-5xl md:text-6xl mb-6 drop-shadow-lg">
              My Sensory Profile
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto drop-shadow-md">
              Understand your sensory needs and develop strategies for managing sensory overload
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
                <h3 className="text-lg font-bold text-purple-800 mb-2">About This Sensory Profile</h3>
                <p className="text-purple-700 text-sm leading-relaxed">
                  This comprehensive sensory profile helps you identify what sensory experiences might be overwhelming 
                  and what helps you feel calm and comfortable. Understanding your sensory needs can help you advocate 
                  for yourself, prevent sensory overload, and create better environments for learning and socialising. 
                  You can share your completed profile with teachers, employers, friends, and family to help them 
                  understand your needs.
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
                  you enter is only saved when you download your profile as a PDF file to your own device. Your privacy 
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

            {/* Sound Triggers */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Sound Triggers</h2>
              <p className="text-gray-600 mb-6">Select sounds that make you feel uncomfortable or overwhelmed:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {soundTriggerOptions.map((trigger) => (
                  <label key={trigger} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={formData.soundTriggers.includes(trigger)}
                      onChange={() => handleMultiSelect('soundTriggers', trigger)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm">{trigger}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sound Calming */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Sound Calming Strategies</h2>
              <p className="text-gray-600 mb-6">Select sounds that help you feel calm and comfortable:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {soundCalmingOptions.map((calming) => (
                  <label key={calming} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={formData.soundCalming.includes(calming)}
                      onChange={() => handleMultiSelect('soundCalming', calming)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm">{calming}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Light Triggers */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Light Triggers</h2>
              <p className="text-gray-600 mb-6">Select lights that make you feel uncomfortable or overwhelmed:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {lightTriggerOptions.map((trigger) => (
                  <label key={trigger} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={formData.lightTriggers.includes(trigger)}
                      onChange={() => handleMultiSelect('lightTriggers', trigger)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm">{trigger}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Light Calming */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Light Calming Strategies</h2>
              <p className="text-gray-600 mb-6">Select lights that help you feel calm and comfortable:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {lightCalmingOptions.map((calming) => (
                  <label key={calming} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={formData.lightCalming.includes(calming)}
                      onChange={() => handleMultiSelect('lightCalming', calming)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm">{calming}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Touch Triggers */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Touch Triggers</h2>
              <p className="text-gray-600 mb-6">Select touches that make you feel uncomfortable or overwhelmed:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {touchTriggerOptions.map((trigger) => (
                  <label key={trigger} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={formData.touchTriggers.includes(trigger)}
                      onChange={() => handleMultiSelect('touchTriggers', trigger)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm">{trigger}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Touch Calming */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Touch Calming Strategies</h2>
              <p className="text-gray-600 mb-6">Select touches that help you feel calm and comfortable:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {touchCalmingOptions.map((calming) => (
                  <label key={calming} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={formData.touchCalming.includes(calming)}
                      onChange={() => handleMultiSelect('touchCalming', calming)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm">{calming}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Smell Triggers */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Smell Triggers</h2>
              <p className="text-gray-600 mb-6">Select smells that make you feel uncomfortable or overwhelmed:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {smellTriggerOptions.map((trigger) => (
                  <label key={trigger} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={formData.smellTriggers.includes(trigger)}
                      onChange={() => handleMultiSelect('smellTriggers', trigger)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm">{trigger}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Smell Calming */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Smell Calming Strategies</h2>
              <p className="text-gray-600 mb-6">Select smells that help you feel calm and comfortable:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {smellCalmingOptions.map((calming) => (
                  <label key={calming} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={formData.smellCalming.includes(calming)}
                      onChange={() => handleMultiSelect('smellCalming', calming)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm">{calming}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Taste Triggers */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Taste Triggers</h2>
              <p className="text-gray-600 mb-6">Select tastes that make you feel uncomfortable or overwhelmed:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {tasteTriggerOptions.map((trigger) => (
                  <label key={trigger} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={formData.tasteTriggers.includes(trigger)}
                      onChange={() => handleMultiSelect('tasteTriggers', trigger)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm">{trigger}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Taste Calming */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Taste Calming Strategies</h2>
              <p className="text-gray-600 mb-6">Select tastes that help you feel calm and comfortable:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {tasteCalmingOptions.map((calming) => (
                  <label key={calming} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={formData.tasteCalming.includes(calming)}
                      onChange={() => handleMultiSelect('tasteCalming', calming)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm">{calming}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Movement Triggers */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Movement Triggers</h2>
              <p className="text-gray-600 mb-6">Select movements that make you feel uncomfortable or overwhelmed:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {movementTriggerOptions.map((trigger) => (
                  <label key={trigger} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={formData.movementTriggers.includes(trigger)}
                      onChange={() => handleMultiSelect('movementTriggers', trigger)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm">{trigger}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Movement Calming */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Movement Calming Strategies</h2>
              <p className="text-gray-600 mb-6">Select movements that help you feel calm and comfortable:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {movementCalmingOptions.map((calming) => (
                  <label key={calming} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={formData.movementCalming.includes(calming)}
                      onChange={() => handleMultiSelect('movementCalming', calming)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm">{calming}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Warning Signs */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Warning Signs</h2>
              <p className="text-gray-600 mb-6">Select signs that indicate you might be experiencing sensory overload:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {warningSignsOptions.map((sign) => (
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

            {/* Coping Strategies */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Coping Strategies</h2>
              <p className="text-gray-600 mb-6">Select strategies that help you manage sensory overload:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {copingStrategiesOptions.map((strategy) => (
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

            {/* Safe Spaces */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Safe Spaces</h2>
              <p className="text-gray-600 mb-6">Select places where you feel safe and comfortable:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {safeSpacesOptions.map((space) => (
                  <label key={space} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={formData.safeSpaces.includes(space)}
                      onChange={() => handleMultiSelect('safeSpaces', space)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm">{space}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Emergency Strategies */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Emergency Strategies</h2>
              <p className="text-gray-600 mb-6">Select strategies to use when you're experiencing severe sensory overload:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {emergencyStrategiesOptions.map((strategy) => (
                  <label key={strategy} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={formData.emergencyStrategies.includes(strategy)}
                      onChange={() => handleMultiSelect('emergencyStrategies', strategy)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm">{strategy}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <h2 className="text-2xl font-bold text-brand-800 mb-6">Additional Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other sensory triggers not listed above
                  </label>
                  <textarea
                    value={formData.additionalTriggers}
                    onChange={(e) => handleInputChange('additionalTriggers', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe any other sensory experiences that make you feel overwhelmed..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other calming strategies not listed above
                  </label>
                  <textarea
                    value={formData.additionalCalming}
                    onChange={(e) => handleInputChange('additionalCalming', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe any other strategies that help you feel calm and comfortable..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Important information for others to know
                  </label>
                  <textarea
                    value={formData.importantInfo}
                    onChange={(e) => handleInputChange('importantInfo', e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Any other important information about your sensory needs that others should know..."
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
                    Download My Sensory Profile PDF
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
