"use client";

import { useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";

export default function MyFeelingsPage() {
  const [formData, setFormData] = useState({
    childName: "",
    situations: {} as Record<string, string[]>,
    situationsText: {} as Record<string, string>,
    calmingStrategies: [] as string[],
    calmingStrategiesText: "",
    supportPeople: [] as string[],
    supportPeopleText: "",
    favouriteActivities: [] as string[],
    favouriteActivitiesText: "",
    warningSignsBody: [] as string[],
    warningSignsBodyText: "",
    warningSignsFeelings: [] as string[],
    warningSignsFeelingsText: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const emotionOptions = [
    { id: "happy", label: "Happy", icon: "😊", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "sad", label: "Sad", icon: "😢", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "angry", label: "Angry", icon: "😠", color: "bg-red-100 hover:bg-red-200" },
    { id: "scared", label: "Scared", icon: "😰", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "excited", label: "Excited", icon: "🤩", color: "bg-orange-100 hover:bg-orange-200" },
    { id: "worried", label: "Worried", icon: "😟", color: "bg-gray-100 hover:bg-gray-200" },
    { id: "calm", label: "Calm", icon: "😌", color: "bg-green-100 hover:bg-green-200" },
    { id: "confused", label: "Confused", icon: "😕", color: "bg-pink-100 hover:bg-pink-200" }
  ];

  const situations = [
    {
      id: "school-morning",
      title: "Going to School",
      description: "When I wake up and get ready for school",
      icon: "🏫",
      color: "from-blue-400 to-blue-600"
    },
    {
      id: "playground",
      title: "Playing Outside",
      description: "When I'm playing with friends at break time",
      icon: "🛝",
      color: "from-green-400 to-green-600"
    },
    {
      id: "new-people",
      title: "Meeting New People",
      description: "When I meet someone I don't know",
      icon: "👋",
      color: "from-purple-400 to-purple-600"
    },
    {
      id: "homework",
      title: "Doing Homework",
      description: "When I have to do my school work at home",
      icon: "📚",
      color: "from-orange-400 to-orange-600"
    },
    {
      id: "bedtime",
      title: "Going to Sleep",
      description: "When it's time to go to bed at night",
      icon: "🌙",
      color: "from-indigo-400 to-indigo-600"
    },
    {
      id: "doctor",
      title: "Going to the Doctor",
      description: "When I have to visit the doctor or dentist",
      icon: "🏥",
      color: "from-teal-400 to-teal-600"
    },
    {
      id: "arguments",
      title: "When People Argue",
      description: "When I hear grown-ups or other children arguing",
      icon: "😤",
      color: "from-red-400 to-red-600"
    },
    {
      id: "changes",
      title: "When Things Change",
      description: "When something different happens that I wasn't expecting",
      icon: "🔄",
      color: "from-yellow-400 to-yellow-600"
    }
  ];

  const calmingOptions = [
    { id: "deep-breathing", label: "Take Deep Breaths", icon: "🫁", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "count-to-ten", label: "Count to 10", icon: "🔢", color: "bg-green-100 hover:bg-green-200" },
    { id: "hug-toy", label: "Hug My Soft Toy", icon: "🧸", color: "bg-pink-100 hover:bg-pink-200" },
    { id: "quiet-space", label: "Go to Quiet Space", icon: "🏠", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "listen-music", label: "Listen to Music", icon: "🎵", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "drink-water", label: "Drink Some Water", icon: "💧", color: "bg-cyan-100 hover:bg-cyan-200" },
    { id: "sit-down", label: "Sit Down Quietly", icon: "🪑", color: "bg-gray-100 hover:bg-gray-200" },
    { id: "gentle-movement", label: "Gentle Movement", icon: "🤸", color: "bg-orange-100 hover:bg-orange-200" }
  ];

  const supportPeopleOptions = [
    { id: "mum", label: "Mum", icon: "👩", color: "bg-pink-100 hover:bg-pink-200" },
    { id: "dad", label: "Dad", icon: "👨", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "teacher", label: "Teacher", icon: "👩‍🏫", color: "bg-green-100 hover:bg-green-200" },
    { id: "grandparent", label: "Grandparent", icon: "👴", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "sibling", label: "Brother/Sister", icon: "👦", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "friend", label: "Friend", icon: "👫", color: "bg-orange-100 hover:bg-orange-200" },
    { id: "school-helper", label: "School Helper", icon: "🏫", color: "bg-teal-100 hover:bg-teal-200" },
    { id: "other-family", label: "Other Family", icon: "👪", color: "bg-indigo-100 hover:bg-indigo-200" }
  ];

  const favouriteActivitiesOptions = [
    { id: "drawing", label: "Drawing/Colouring", icon: "🎨", color: "bg-red-100 hover:bg-red-200" },
    { id: "reading", label: "Reading Books", icon: "📚", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "playing-games", label: "Playing Games", icon: "🎮", color: "bg-green-100 hover:bg-green-200" },
    { id: "building", label: "Building Things", icon: "🧩", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "outdoor-play", label: "Playing Outside", icon: "⚽", color: "bg-orange-100 hover:bg-orange-200" },
    { id: "watching-tv", label: "Watching TV/Videos", icon: "📺", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "singing", label: "Singing/Dancing", icon: "🎤", color: "bg-pink-100 hover:bg-pink-200" },
    { id: "puzzles", label: "Doing Puzzles", icon: "🧩", color: "bg-teal-100 hover:bg-teal-200" }
  ];

  const warningSignsBodyOptions = [
    { id: "fast-heart", label: "Heart Beats Fast", icon: "💓", color: "bg-red-100 hover:bg-red-200" },
    { id: "hot-face", label: "Face Gets Hot", icon: "🔥", color: "bg-orange-100 hover:bg-orange-200" },
    { id: "tight-tummy", label: "Tummy Feels Tight", icon: "🤱", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "shaky-hands", label: "Hands Feel Shaky", icon: "🤲", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "hard-breathing", label: "Hard to Breathe", icon: "😤", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "sweaty", label: "Feel Sweaty", icon: "💦", color: "bg-cyan-100 hover:bg-cyan-200" },
    { id: "tense-muscles", label: "Muscles Feel Tight", icon: "💪", color: "bg-green-100 hover:bg-green-200" },
    { id: "headache", label: "Head Hurts", icon: "🤕", color: "bg-gray-100 hover:bg-gray-200" }
  ];

  const warningSignsFeelingsOptions = [
    { id: "want-to-shout", label: "Want to Shout", icon: "😠", color: "bg-red-100 hover:bg-red-200" },
    { id: "want-to-cry", label: "Want to Cry", icon: "😢", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "feel-worried", label: "Feel Worried", icon: "😟", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "cant-think", label: "Can't Think Clearly", icon: "🤯", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "want-to-hide", label: "Want to Hide", icon: "🙈", color: "bg-gray-100 hover:bg-gray-200" },
    { id: "feel-grumpy", label: "Feel Grumpy", icon: "😤", color: "bg-orange-100 hover:bg-orange-200" },
    { id: "feel-scared", label: "Feel Scared", icon: "😰", color: "bg-pink-100 hover:bg-pink-200" },
    { id: "want-to-run", label: "Want to Run Away", icon: "🏃", color: "bg-green-100 hover:bg-green-200" }
  ];

  const handleEmotionSelect = (situationId: string, emotionId: string) => {
    const currentEmotions = formData.situations[situationId] || [];
    if (currentEmotions.includes(emotionId)) {
      // Remove emotion
      setFormData({
        ...formData,
        situations: {
          ...formData.situations,
          [situationId]: currentEmotions.filter(e => e !== emotionId)
        }
      });
    } else {
      // Add emotion
      setFormData({
        ...formData,
        situations: {
          ...formData.situations,
          [situationId]: [...currentEmotions, emotionId]
        }
      });
    }
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

  const handleTextInput = (field: keyof typeof formData, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSituationTextInput = (situationId: string, value: string) => {
    setFormData({
      ...formData,
      situationsText: {
        ...formData.situationsText,
        [situationId]: value
      }
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
      pdf.setFillColor(76, 175, 80); // Green
      pdf.rect(margin, yPosition, contentWidth, 15, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.text('MY FEELINGS IN DIFFERENT SITUATIONS', margin + 5, yPosition + 10);
      yPosition += 25;
      
      // Reset text color
      pdf.setTextColor(0, 0, 0);

      // Child's Name
      addText(`Child's Name: ${formData.childName || 'Not filled in'}`, 14, true);
      yPosition += 5;

      // Situations and feelings
      situations.forEach((situation) => {
        const situationEmotions = formData.situations[situation.id] || [];
        
        addText(`${situation.title}:`, 14, true);
        addText(situation.description, 11);
        
        if (situationEmotions.length > 0) {
          const selectedEmotions = emotionOptions
            .filter(e => situationEmotions.includes(e.id))
            .map(e => `• ${e.label}`)
            .join('\n');
          addText(selectedEmotions);
        } else {
          addText('• No feelings selected');
        }
        
        // Add additional feelings text if provided
        const additionalFeelings = formData.situationsText[situation.id];
        if (additionalFeelings) {
          addText(`Other feelings: ${additionalFeelings}`);
        }
        
        yPosition += 8;
      });

      // Things That Help Me Calm Down
      addText('Things That Help Me Calm Down:', 14, true);
      if (formData.calmingStrategies.length > 0) {
        const selectedCalming = calmingOptions
          .filter(c => formData.calmingStrategies.includes(c.id))
          .map(c => `• ${c.label}`)
          .join('\n');
        addText(selectedCalming);
      } else {
        addText('• No calming strategies selected');
      }
      if (formData.calmingStrategiesText) {
        addText(`Other things that help me calm down: ${formData.calmingStrategiesText}`);
      }
      yPosition += 8;

      // People I Can Talk To When Upset
      addText('People I Can Talk To When Upset:', 14, true);
      if (formData.supportPeople.length > 0) {
        const selectedPeople = supportPeopleOptions
          .filter(p => formData.supportPeople.includes(p.id))
          .map(p => `• ${p.label}`)
          .join('\n');
        addText(selectedPeople);
      } else {
        addText('• No support people selected');
      }
      if (formData.supportPeopleText) {
        addText(`Other people I can talk to when upset: ${formData.supportPeopleText}`);
      }
      yPosition += 8;

      // Favourite Activities That Help
      addText('Favourite Activities That Help:', 14, true);
      if (formData.favouriteActivities.length > 0) {
        const selectedActivities = favouriteActivitiesOptions
          .filter(a => formData.favouriteActivities.includes(a.id))
          .map(a => `• ${a.label}`)
          .join('\n');
        addText(selectedActivities);
      } else {
        addText('• No activities selected');
      }
      if (formData.favouriteActivitiesText) {
        addText(`Other favourite activities that help: ${formData.favouriteActivitiesText}`);
      }
      yPosition += 8;

      // Warning Signs I'm Getting Upset - Body
      addText('Warning Signs in My Body:', 14, true);
      if (formData.warningSignsBody.length > 0) {
        const selectedBodySigns = warningSignsBodyOptions
          .filter(w => formData.warningSignsBody.includes(w.id))
          .map(w => `• ${w.label}`)
          .join('\n');
        addText(selectedBodySigns);
      } else {
        addText('• No body warning signs selected');
      }
      if (formData.warningSignsBodyText) {
        addText(`Other warning signs in my body: ${formData.warningSignsBodyText}`);
      }
      yPosition += 8;

      // Warning Signs I'm Getting Upset - Feelings
      addText('Warning Signs in My Feelings:', 14, true);
      if (formData.warningSignsFeelings.length > 0) {
        const selectedFeelingSigns = warningSignsFeelingsOptions
          .filter(w => formData.warningSignsFeelings.includes(w.id))
          .map(w => `• ${w.label}`)
          .join('\n');
        addText(selectedFeelingSigns);
      } else {
        addText('• No feeling warning signs selected');
      }
      if (formData.warningSignsFeelingsText) {
        addText(`Other warning signs in my feelings: ${formData.warningSignsFeelingsText}`);
      }

      // Footer
      yPosition += 15;
      pdf.setFontSize(10);
      pdf.setTextColor(128, 128, 128);
      addText('Created with Noa\'s Place Interactive Tools - www.noasplace.org.uk', 10);

      // Save the PDF
      const fileName = `${formData.childName || 'Child'}_My_Feelings.pdf`;
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
      <section className="relative isolate min-h-[300px] overflow-hidden bg-gradient-to-r from-green-500 to-emerald-500">
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
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
            </div>
            
            <h1 className="text-4xl font-black text-white sm:text-5xl md:text-6xl mb-6 drop-shadow-lg">
              My Feelings
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto drop-shadow-md">
              Help children understand how they feel in different situations
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
                <h3 className="text-lg font-bold text-green-800 mb-2">For Parents and Carers</h3>
                <p className="text-green-700 text-sm leading-relaxed">
                  This tool helps children identify emotions in different situations. There are no right or wrong answers - 
                  children can feel multiple emotions about the same situation. Sit with your child and talk about each situation. 
                  Help them understand that all feelings are normal and it's good to talk about them.
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
        <div className="mx-auto max-w-6xl px-6">
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
                className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none"
              />
            </div>

            {/* Situations */}
            {situations.map((situation) => (
              <div key={situation.id} className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
                <div className="mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${situation.color} rounded-full mb-4`}>
                    <span className="text-3xl">{situation.icon}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-brand-800 mb-2">{situation.title}</h2>
                  <p className="text-gray-600 text-lg">{situation.description}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">How do you feel? (Click all that match):</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {emotionOptions.map((emotion) => {
                      const isSelected = (formData.situations[situation.id] || []).includes(emotion.id);
                      return (
                        <button
                          key={emotion.id}
                          onClick={() => handleEmotionSelect(situation.id, emotion.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                            isSelected
                              ? 'border-green-400 bg-green-50 scale-105'
                              : 'border-gray-200 hover:border-gray-300'
                          } ${emotion.color}`}
                        >
                          <div className="text-center">
                            <div className="text-3xl mb-2">{emotion.icon}</div>
                            <div className="font-semibold text-gray-700">{emotion.label}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Other feelings I have in this situation:
                  </label>
                  <textarea
                    value={formData.situationsText[situation.id] || ""}
                    onChange={(e) => handleSituationTextInput(situation.id, e.target.value)}
                    rows={3}
                    placeholder="Tell us about any other feelings you have in this situation..."
                    className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                  />
                </div>
              </div>
            ))}

            {/* Things That Help Me Calm Down */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">😌</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">Things That Help Me Calm Down</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on all the things that help you feel better when you're upset:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {calmingOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleMultiSelect('calmingStrategies', option.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.calmingStrategies.includes(option.id)
                        ? 'border-blue-400 bg-blue-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${option.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="font-semibold text-gray-700">{option.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other things that help me calm down:
                </label>
                <textarea
                  value={formData.calmingStrategiesText}
                  onChange={(e) => handleTextInput('calmingStrategiesText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other things that help you feel better when you're upset..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* People I Can Talk To When Upset */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🗣️</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">People I Can Talk To When Upset</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on all the people you can talk to when you feel upset:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {supportPeopleOptions.map((person) => (
                  <button
                    key={person.id}
                    onClick={() => handleMultiSelect('supportPeople', person.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.supportPeople.includes(person.id)
                        ? 'border-pink-400 bg-pink-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${person.color}`}
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
                  Other people I can talk to when upset:
                </label>
                <textarea
                  value={formData.supportPeopleText}
                  onChange={(e) => handleTextInput('supportPeopleText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other people you can talk to when you feel upset..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Favourite Activities That Help */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎉</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">Favourite Activities That Help</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on activities that make you feel happy and calm:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {favouriteActivitiesOptions.map((activity) => (
                  <button
                    key={activity.id}
                    onClick={() => handleMultiSelect('favouriteActivities', activity.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.favouriteActivities.includes(activity.id)
                        ? 'border-yellow-400 bg-yellow-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${activity.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{activity.icon}</div>
                      <div className="font-semibold text-gray-700">{activity.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other favourite activities that help:
                </label>
                <textarea
                  value={formData.favouriteActivitiesText}
                  onChange={(e) => handleTextInput('favouriteActivitiesText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other activities that make you feel happy and calm..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Warning Signs - Body */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">Warning Signs in My Body</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on what happens in your body when you start to get upset:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {warningSignsBodyOptions.map((sign) => (
                  <button
                    key={sign.id}
                    onClick={() => handleMultiSelect('warningSignsBody', sign.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.warningSignsBody.includes(sign.id)
                        ? 'border-red-400 bg-red-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${sign.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{sign.icon}</div>
                      <div className="font-semibold text-gray-700">{sign.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other warning signs in my body:
                </label>
                <textarea
                  value={formData.warningSignsBodyText}
                  onChange={(e) => handleTextInput('warningSignsBodyText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other things that happen in your body when you start to get upset..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Warning Signs - Feelings */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💭</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">Warning Signs in My Feelings</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on what you want to do when you start to get upset:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {warningSignsFeelingsOptions.map((sign) => (
                  <button
                    key={sign.id}
                    onClick={() => handleMultiSelect('warningSignsFeelings', sign.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.warningSignsFeelings.includes(sign.id)
                        ? 'border-purple-400 bg-purple-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${sign.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{sign.icon}</div>
                      <div className="font-semibold text-gray-700">{sign.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other warning signs in my feelings:
                </label>
                <textarea
                  value={formData.warningSignsFeelingsText}
                  onChange={(e) => handleTextInput('warningSignsFeelingsText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other things you want to do when you start to get upset..."
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
                    Download My Feelings PDF
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
