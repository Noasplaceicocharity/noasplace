"use client";

import { useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";

export default function SensoryOverloadPage() {
  const [formData, setFormData] = useState({
    childName: "",
    adultName: "",
    adultRole: "",
    
    // Sensory triggers
    soundTriggers: [] as string[],
    soundTriggersText: "",
    lightTriggers: [] as string[],
    lightTriggersText: "",
    touchTriggers: [] as string[],
    touchTriggersText: "",
    smellTriggers: [] as string[],
    smellTriggersText: "",
    tasteTriggers: [] as string[],
    tasteTriggersText: "",
    movementTriggers: [] as string[],
    movementTriggersText: "",
    
    // Calming strategies
    soundCalming: [] as string[],
    soundCalmingText: "",
    lightCalming: [] as string[],
    lightCalmingText: "",
    touchCalming: [] as string[],
    touchCalmingText: "",
    smellCalming: [] as string[],
    smellCalmingText: "",
    tasteCalming: [] as string[],
    tasteCalmingText: "",
    movementCalming: [] as string[],
    movementCalmingText: "",
    
    // Warning signs
    warningSigns: [] as string[],
    warningSignsText: "",
    
    // What helps when overwhelmed
    whenOverwhelmed: [] as string[],
    whenOverwhelmedText: "",
    
    // Safe spaces
    safeSpaces: [] as string[],
    safeSpacesText: "",
    
    // Emergency strategies
    emergencyStrategies: [] as string[],
    emergencyStrategiesText: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // Sound trigger options
  const soundTriggerOptions = [
    { id: "loud-noises", label: "Loud Noises", icon: "🔊", color: "bg-red-100 hover:bg-red-200" },
    { id: "sudden-sounds", label: "Sudden Sounds", icon: "💥", color: "bg-orange-100 hover:bg-orange-200" },
    { id: "multiple-sounds", label: "Lots of Sounds at Once", icon: "🎵", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "high-pitched", label: "High Pitched Sounds", icon: "🎼", color: "bg-pink-100 hover:bg-pink-200" },
    { id: "crowd-noise", label: "Crowd Noise", icon: "👥", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "machines", label: "Machine Sounds", icon: "🔧", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "music", label: "Certain Music", icon: "🎶", color: "bg-green-100 hover:bg-green-200" },
    { id: "no-triggers", label: "No Sound Triggers", icon: "😊", color: "bg-gray-100 hover:bg-gray-200" }
  ];

  // Sound calming options
  const soundCalmingOptions = [
    { id: "quiet-music", label: "Quiet Music", icon: "🎵", color: "bg-green-100 hover:bg-green-200" },
    { id: "nature-sounds", label: "Nature Sounds", icon: "🌊", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "white-noise", label: "White Noise", icon: "📻", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "soft-voices", label: "Soft Voices", icon: "👂", color: "bg-pink-100 hover:bg-pink-200" },
    { id: "silence", label: "Complete Silence", icon: "🤫", color: "bg-gray-100 hover:bg-gray-200" },
    { id: "humming", label: "Humming", icon: "🎤", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "rain-sounds", label: "Rain Sounds", icon: "🌧️", color: "bg-teal-100 hover:bg-teal-200" },
    { id: "no-calming", label: "No Sound Calming", icon: "😊", color: "bg-gray-100 hover:bg-gray-200" }
  ];

  // Light trigger options
  const lightTriggerOptions = [
    { id: "bright-lights", label: "Bright Lights", icon: "💡", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "flashing", label: "Flashing Lights", icon: "⚡", color: "bg-orange-100 hover:bg-orange-200" },
    { id: "flickering", label: "Flickering Lights", icon: "🕯️", color: "bg-red-100 hover:bg-red-200" },
    { id: "fluorescent", label: "Fluorescent Lights", icon: "🏢", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "sunlight", label: "Bright Sunlight", icon: "☀️", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "screens", label: "Computer/TV Screens", icon: "📺", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "patterns", label: "Patterned Lights", icon: "🌈", color: "bg-pink-100 hover:bg-pink-200" },
    { id: "no-triggers", label: "No Light Triggers", icon: "😊", color: "bg-gray-100 hover:bg-gray-200" }
  ];

  // Light calming options
  const lightCalmingOptions = [
    { id: "dim-lights", label: "Dim Lights", icon: "🕯️", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "natural-light", label: "Natural Light", icon: "☀️", color: "bg-orange-100 hover:bg-orange-200" },
    { id: "soft-lighting", label: "Soft Lighting", icon: "💡", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "candles", label: "Candles", icon: "🕯️", color: "bg-pink-100 hover:bg-pink-200" },
    { id: "darkness", label: "Darkness", icon: "🌙", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "colored-lights", label: "Colored Lights", icon: "🌈", color: "bg-green-100 hover:bg-green-200" },
    { id: "no-calming", label: "No Light Calming", icon: "😊", color: "bg-gray-100 hover:bg-gray-200" }
  ];

  // Touch trigger options
  const touchTriggerOptions = [
    { id: "rough-textures", label: "Rough Textures", icon: "🧽", color: "bg-orange-100 hover:bg-orange-200" },
    { id: "itchy-clothes", label: "Itchy Clothes", icon: "👕", color: "bg-red-100 hover:bg-red-200" },
    { id: "tight-clothes", label: "Tight Clothes", icon: "👖", color: "bg-pink-100 hover:bg-pink-200" },
    { id: "tags", label: "Clothing Tags", icon: "🏷️", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "wet-feelings", label: "Wet Feelings", icon: "💧", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "sticky", label: "Sticky Things", icon: "🍯", color: "bg-amber-100 hover:bg-amber-200" },
    { id: "hugs", label: "Unexpected Hugs", icon: "🤗", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "no-triggers", label: "No Touch Triggers", icon: "😊", color: "bg-gray-100 hover:bg-gray-200" }
  ];

  // Touch calming options
  const touchCalmingOptions = [
    { id: "soft-textures", label: "Soft Textures", icon: "🧸", color: "bg-pink-100 hover:bg-pink-200" },
    { id: "weighted-blanket", label: "Weighted Blanket", icon: "🛏️", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "hugs", label: "Gentle Hugs", icon: "🤗", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "massage", label: "Gentle Massage", icon: "✋", color: "bg-orange-100 hover:bg-orange-200" },
    { id: "fidget-toys", label: "Fidget Toys", icon: "🧩", color: "bg-green-100 hover:bg-green-200" },
    { id: "warm-bath", label: "Warm Bath", icon: "🛁", color: "bg-teal-100 hover:bg-teal-200" },
    { id: "no-calming", label: "No Touch Calming", icon: "😊", color: "bg-gray-100 hover:bg-gray-200" }
  ];

  // Smell trigger options
  const smellTriggerOptions = [
    { id: "strong-perfume", label: "Strong Perfume", icon: "🌸", color: "bg-pink-100 hover:bg-pink-200" },
    { id: "cleaning-products", label: "Cleaning Products", icon: "🧽", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "food-smells", label: "Certain Food Smells", icon: "🍽️", color: "bg-orange-100 hover:bg-orange-200" },
    { id: "smoke", label: "Smoke", icon: "💨", color: "bg-gray-100 hover:bg-gray-200" },
    { id: "chemicals", label: "Chemical Smells", icon: "🧪", color: "bg-red-100 hover:bg-red-200" },
    { id: "flowers", label: "Flower Smells", icon: "🌺", color: "bg-green-100 hover:bg-green-200" },
    { id: "cooking", label: "Cooking Smells", icon: "👨‍🍳", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "no-triggers", label: "No Smell Triggers", icon: "😊", color: "bg-gray-100 hover:bg-gray-200" }
  ];

  // Smell calming options
  const smellCalmingOptions = [
    { id: "lavender", label: "Lavender", icon: "🌿", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "vanilla", label: "Vanilla", icon: "🍦", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "fresh-air", label: "Fresh Air", icon: "🌬️", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "baking", label: "Baking Smells", icon: "🍞", color: "bg-orange-100 hover:bg-orange-200" },
    { id: "citrus", label: "Citrus Smells", icon: "🍋", color: "bg-green-100 hover:bg-green-200" },
    { id: "mint", label: "Mint", icon: "🌱", color: "bg-teal-100 hover:bg-teal-200" },
    { id: "no-calming", label: "No Smell Calming", icon: "😊", color: "bg-gray-100 hover:bg-gray-200" }
  ];

  // Taste trigger options
  const tasteTriggerOptions = [
    { id: "spicy-foods", label: "Spicy Foods", icon: "🌶️", color: "bg-red-100 hover:bg-red-200" },
    { id: "bitter-tastes", label: "Bitter Tastes", icon: "☕", color: "bg-brown-100 hover:bg-brown-200" },
    { id: "sour-tastes", label: "Sour Tastes", icon: "🍋", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "mushy-textures", label: "Mushy Textures", icon: "🥣", color: "bg-orange-100 hover:bg-orange-200" },
    { id: "crunchy-textures", label: "Crunchy Textures", icon: "🍎", color: "bg-green-100 hover:bg-green-200" },
    { id: "mixed-textures", label: "Mixed Textures", icon: "🍛", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "hot-temperatures", label: "Hot Foods", icon: "🔥", color: "bg-red-100 hover:bg-red-200" },
    { id: "no-triggers", label: "No Taste Triggers", icon: "😊", color: "bg-gray-100 hover:bg-gray-200" }
  ];

  // Taste calming options
  const tasteCalmingOptions = [
    { id: "sweet-tastes", label: "Sweet Tastes", icon: "🍯", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "warm-drinks", label: "Warm Drinks", icon: "☕", color: "bg-brown-100 hover:bg-brown-200" },
    { id: "cold-drinks", label: "Cold Drinks", icon: "🧊", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "chewing", label: "Chewing Gum", icon: "🍬", color: "bg-pink-100 hover:bg-pink-200" },
    { id: "smooth-textures", label: "Smooth Textures", icon: "🍦", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "familiar-foods", label: "Familiar Foods", icon: "🍽️", color: "bg-green-100 hover:bg-green-200" },
    { id: "no-calming", label: "No Taste Calming", icon: "😊", color: "bg-gray-100 hover:bg-gray-200" }
  ];

  // Movement trigger options
  const movementTriggerOptions = [
    { id: "crowded-spaces", label: "Crowded Spaces", icon: "👥", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "unexpected-touch", label: "Unexpected Touch", icon: "✋", color: "bg-red-100 hover:bg-red-200" },
    { id: "fast-movements", label: "Fast Movements", icon: "🏃", color: "bg-orange-100 hover:bg-orange-200" },
    { id: "spinning", label: "Spinning", icon: "🌪️", color: "bg-yellow-100 hover:bg-yellow-200" },
    { id: "swinging", label: "Swinging", icon: "🎠", color: "bg-pink-100 hover:bg-pink-200" },
    { id: "elevators", label: "Elevators", icon: "🛗", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "car-rides", label: "Car Rides", icon: "🚗", color: "bg-green-100 hover:bg-green-200" },
    { id: "no-triggers", label: "No Movement Triggers", icon: "😊", color: "bg-gray-100 hover:bg-gray-200" }
  ];

  // Movement calming options
  const movementCalmingOptions = [
    { id: "rocking", label: "Gentle Rocking", icon: "🪑", color: "bg-blue-100 hover:bg-blue-200" },
    { id: "deep-breathing", label: "Deep Breathing", icon: "🫁", color: "bg-green-100 hover:bg-green-200" },
    { id: "stretching", label: "Gentle Stretching", icon: "🤸", color: "bg-purple-100 hover:bg-purple-200" },
    { id: "walking", label: "Slow Walking", icon: "🚶", color: "bg-orange-100 hover:bg-orange-200" },
    { id: "sitting-still", label: "Sitting Still", icon: "🧘", color: "bg-pink-100 hover:bg-pink-200" },
    { id: "swaying", label: "Gentle Swaying", icon: "🌊", color: "bg-teal-100 hover:bg-teal-200" },
    { id: "no-calming", label: "No Movement Calming", icon: "😊", color: "bg-gray-100 hover:bg-gray-200" }
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
      pdf.setFillColor(147, 51, 234); // Purple
      pdf.rect(margin, yPosition, contentWidth, 15, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.setFont(undefined, 'bold');
      pdf.text('MY SENSORY WORLD PLAN', margin + 5, yPosition + 10);
      yPosition += 25;
      
      // Reset text color
      pdf.setTextColor(0, 0, 0);

      // Basic Information
      addText('About This Sensory Plan:', 14, true);
      addText(`Child's Name: ${formData.childName || 'Not filled in'}`);
      addText(`Adult Helper: ${formData.adultName || 'Not filled in'} (${formData.adultRole || 'Not specified'})`);
      yPosition += 5;

      // Sound Triggers
      addText('SOUND TRIGGERS - What sounds make me feel overwhelmed:', 14, true);
      if (formData.soundTriggers.length > 0) {
        const selectedSounds = soundTriggerOptions
          .filter(s => formData.soundTriggers.includes(s.id))
          .map(s => `• ${s.label}`)
          .join('\n');
        addText(selectedSounds);
      } else {
        addText('• No sound triggers selected');
      }
      if (formData.soundTriggersText) {
        addText(`Other sound triggers: ${formData.soundTriggersText}`);
      }
      yPosition += 5;

      // Light Triggers
      addText('LIGHT TRIGGERS - What lights make me feel overwhelmed:', 14, true);
      if (formData.lightTriggers.length > 0) {
        const selectedLights = lightTriggerOptions
          .filter(l => formData.lightTriggers.includes(l.id))
          .map(l => `• ${l.label}`)
          .join('\n');
        addText(selectedLights);
      } else {
        addText('• No light triggers selected');
      }
      if (formData.lightTriggersText) {
        addText(`Other light triggers: ${formData.lightTriggersText}`);
      }
      yPosition += 5;

      // Touch Triggers
      addText('TOUCH TRIGGERS - What touches make me feel overwhelmed:', 14, true);
      if (formData.touchTriggers.length > 0) {
        const selectedTouches = touchTriggerOptions
          .filter(t => formData.touchTriggers.includes(t.id))
          .map(t => `• ${t.label}`)
          .join('\n');
        addText(selectedTouches);
      } else {
        addText('• No touch triggers selected');
      }
      if (formData.touchTriggersText) {
        addText(`Other touch triggers: ${formData.touchTriggersText}`);
      }
      yPosition += 5;

      // Smell Triggers
      addText('SMELL TRIGGERS - What smells make me feel overwhelmed:', 14, true);
      if (formData.smellTriggers.length > 0) {
        const selectedSmells = smellTriggerOptions
          .filter(s => formData.smellTriggers.includes(s.id))
          .map(s => `• ${s.label}`)
          .join('\n');
        addText(selectedSmells);
      } else {
        addText('• No smell triggers selected');
      }
      if (formData.smellTriggersText) {
        addText(`Other smell triggers: ${formData.smellTriggersText}`);
      }
      yPosition += 5;

      // Taste Triggers
      addText('TASTE TRIGGERS - What tastes make me feel overwhelmed:', 14, true);
      if (formData.tasteTriggers.length > 0) {
        const selectedTastes = tasteTriggerOptions
          .filter(t => formData.tasteTriggers.includes(t.id))
          .map(t => `• ${t.label}`)
          .join('\n');
        addText(selectedTastes);
      } else {
        addText('• No taste triggers selected');
      }
      if (formData.tasteTriggersText) {
        addText(`Other taste triggers: ${formData.tasteTriggersText}`);
      }
      yPosition += 5;

      // Movement Triggers
      addText('MOVEMENT TRIGGERS - What movements make me feel overwhelmed:', 14, true);
      if (formData.movementTriggers.length > 0) {
        const selectedMovements = movementTriggerOptions
          .filter(m => formData.movementTriggers.includes(m.id))
          .map(m => `• ${m.label}`)
          .join('\n');
        addText(selectedMovements);
      } else {
        addText('• No movement triggers selected');
      }
      if (formData.movementTriggersText) {
        addText(`Other movement triggers: ${formData.movementTriggersText}`);
      }
      yPosition += 10;

      // Calming Strategies Section
      addText('CALMING STRATEGIES - What helps me feel better:', 16, true);
      yPosition += 5;

      // Sound Calming
      addText('SOUND CALMING - What sounds help me feel calm:', 14, true);
      if (formData.soundCalming.length > 0) {
        const selectedCalmingSounds = soundCalmingOptions
          .filter(s => formData.soundCalming.includes(s.id))
          .map(s => `• ${s.label}`)
          .join('\n');
        addText(selectedCalmingSounds);
      } else {
        addText('• No calming sounds selected');
      }
      if (formData.soundCalmingText) {
        addText(`Other calming sounds: ${formData.soundCalmingText}`);
      }
      yPosition += 5;

      // Light Calming
      addText('LIGHT CALMING - What lights help me feel calm:', 14, true);
      if (formData.lightCalming.length > 0) {
        const selectedCalmingLights = lightCalmingOptions
          .filter(l => formData.lightCalming.includes(l.id))
          .map(l => `• ${l.label}`)
          .join('\n');
        addText(selectedCalmingLights);
      } else {
        addText('• No calming lights selected');
      }
      if (formData.lightCalmingText) {
        addText(`Other calming lights: ${formData.lightCalmingText}`);
      }
      yPosition += 5;

      // Touch Calming
      addText('TOUCH CALMING - What touches help me feel calm:', 14, true);
      if (formData.touchCalming.length > 0) {
        const selectedCalmingTouches = touchCalmingOptions
          .filter(t => formData.touchCalming.includes(t.id))
          .map(t => `• ${t.label}`)
          .join('\n');
        addText(selectedCalmingTouches);
      } else {
        addText('• No calming touches selected');
      }
      if (formData.touchCalmingText) {
        addText(`Other calming touches: ${formData.touchCalmingText}`);
      }
      yPosition += 5;

      // Smell Calming
      addText('SMELL CALMING - What smells help me feel calm:', 14, true);
      if (formData.smellCalming.length > 0) {
        const selectedCalmingSmells = smellCalmingOptions
          .filter(s => formData.smellCalming.includes(s.id))
          .map(s => `• ${s.label}`)
          .join('\n');
        addText(selectedCalmingSmells);
      } else {
        addText('• No calming smells selected');
      }
      if (formData.smellCalmingText) {
        addText(`Other calming smells: ${formData.smellCalmingText}`);
      }
      yPosition += 5;

      // Taste Calming
      addText('TASTE CALMING - What tastes help me feel calm:', 14, true);
      if (formData.tasteCalming.length > 0) {
        const selectedCalmingTastes = tasteCalmingOptions
          .filter(t => formData.tasteCalming.includes(t.id))
          .map(t => `• ${t.label}`)
          .join('\n');
        addText(selectedCalmingTastes);
      } else {
        addText('• No calming tastes selected');
      }
      if (formData.tasteCalmingText) {
        addText(`Other calming tastes: ${formData.tasteCalmingText}`);
      }
      yPosition += 5;

      // Movement Calming
      addText('MOVEMENT CALMING - What movements help me feel calm:', 14, true);
      if (formData.movementCalming.length > 0) {
        const selectedCalmingMovements = movementCalmingOptions
          .filter(m => formData.movementCalming.includes(m.id))
          .map(m => `• ${m.label}`)
          .join('\n');
        addText(selectedCalmingMovements);
      } else {
        addText('• No calming movements selected');
      }
      if (formData.movementCalmingText) {
        addText(`Other calming movements: ${formData.movementCalmingText}`);
      }

      // Footer
      yPosition += 15;
      pdf.setFontSize(10);
      pdf.setTextColor(128, 128, 128);
      addText('Created with Noa\'s Place Interactive Tools - www.noasplace.org.uk', 10);

      // Save the PDF
      const fileName = `${formData.childName || 'Child'}_Sensory_Plan.pdf`;
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
      <section className="relative isolate min-h-[300px] overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500">
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
              My Sensory World
            </h1>
            <p className="text-lg text-white/90 max-w-3xl mx-auto drop-shadow-md">
              Help children understand their sensory needs and what helps them feel comfortable
            </p>
          </div>
        </div>
      </section>

      {/* Parent/Carer Guidance */}
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
                <h3 className="text-lg font-bold text-purple-800 mb-2">For Parents, Carers, Teachers & Nurses</h3>
                <p className="text-purple-700 text-sm leading-relaxed">
                  This tool helps children identify what sensory experiences might be overwhelming for them and what helps them feel calm and comfortable. 
                  Understanding a child's sensory needs can help prevent meltdowns and create better environments for learning and socialising. 
                  The completed form can be shared with schools, healthcare providers, and other professionals to ensure consistent support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Disclaimer */}
      <section className="py-8 bg-purple-50 border-b">
        <div className="mx-auto max-w-4xl px-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="size-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 2l-2 2m-2 2l-2 2"/>
                    <path d="M15 2l2 2m2 2l2 2"/>
                    <circle cx="12" cy="13" r="8"/>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-purple-800 mb-2">🔒 Your Privacy is Protected</h3>
                <p className="text-purple-700 text-sm leading-relaxed">
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
                <h2 className="text-2xl font-bold text-brand-800">About This Sensory Plan</h2>
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
                      className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Adult helper's name</label>
                    <input
                      type="text"
                      value={formData.adultName}
                      onChange={(e) => setFormData({...formData, adultName: e.target.value})}
                      placeholder="Who is helping you?"
                      className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none"
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
                    className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Sound Triggers */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔊</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">What sounds make you feel overwhelmed?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on sounds that make you feel uncomfortable or overwhelmed:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {soundTriggerOptions.map((trigger) => (
                  <button
                    key={trigger.id}
                    onClick={() => handleMultiSelect('soundTriggers', trigger.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.soundTriggers.includes(trigger.id)
                        ? 'border-red-400 bg-red-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${trigger.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{trigger.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{trigger.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other sounds that make you feel overwhelmed:
                </label>
                <textarea
                  value={formData.soundTriggersText}
                  onChange={(e) => handleTextInput('soundTriggersText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other sounds that make you feel uncomfortable..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Light Triggers */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💡</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">What lights make you feel overwhelmed?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on lights that make you feel uncomfortable or overwhelmed:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {lightTriggerOptions.map((trigger) => (
                  <button
                    key={trigger.id}
                    onClick={() => handleMultiSelect('lightTriggers', trigger.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.lightTriggers.includes(trigger.id)
                        ? 'border-yellow-400 bg-yellow-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${trigger.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{trigger.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{trigger.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other lights that make you feel overwhelmed:
                </label>
                <textarea
                  value={formData.lightTriggersText}
                  onChange={(e) => handleTextInput('lightTriggersText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other lights that make you feel uncomfortable..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Touch Triggers */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤲</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">What touches make you feel overwhelmed?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on touches that make you feel uncomfortable or overwhelmed:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {touchTriggerOptions.map((trigger) => (
                  <button
                    key={trigger.id}
                    onClick={() => handleMultiSelect('touchTriggers', trigger.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.touchTriggers.includes(trigger.id)
                        ? 'border-orange-400 bg-orange-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${trigger.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{trigger.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{trigger.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other touches that make you feel overwhelmed:
                </label>
                <textarea
                  value={formData.touchTriggersText}
                  onChange={(e) => handleTextInput('touchTriggersText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other touches that make you feel uncomfortable..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Smell Triggers */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👃</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">What smells make you feel overwhelmed?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on smells that make you feel uncomfortable or overwhelmed:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {smellTriggerOptions.map((trigger) => (
                  <button
                    key={trigger.id}
                    onClick={() => handleMultiSelect('smellTriggers', trigger.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.smellTriggers.includes(trigger.id)
                        ? 'border-pink-400 bg-pink-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${trigger.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{trigger.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{trigger.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other smells that make you feel overwhelmed:
                </label>
                <textarea
                  value={formData.smellTriggersText}
                  onChange={(e) => handleTextInput('smellTriggersText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other smells that make you feel uncomfortable..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Taste Triggers */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👅</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">What tastes make you feel overwhelmed?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on tastes that make you feel uncomfortable or overwhelmed:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {tasteTriggerOptions.map((trigger) => (
                  <button
                    key={trigger.id}
                    onClick={() => handleMultiSelect('tasteTriggers', trigger.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.tasteTriggers.includes(trigger.id)
                        ? 'border-green-400 bg-green-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${trigger.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{trigger.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{trigger.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other tastes that make you feel overwhelmed:
                </label>
                <textarea
                  value={formData.tasteTriggersText}
                  onChange={(e) => handleTextInput('tasteTriggersText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other tastes that make you feel uncomfortable..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Movement Triggers */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏃</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">What movements make you feel overwhelmed?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on movements that make you feel uncomfortable or overwhelmed:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {movementTriggerOptions.map((trigger) => (
                  <button
                    key={trigger.id}
                    onClick={() => handleMultiSelect('movementTriggers', trigger.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.movementTriggers.includes(trigger.id)
                        ? 'border-blue-400 bg-blue-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${trigger.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{trigger.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{trigger.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other movements that make you feel overwhelmed:
                </label>
                <textarea
                  value={formData.movementTriggersText}
                  onChange={(e) => handleTextInput('movementTriggersText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other movements that make you feel uncomfortable..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Calming Strategies Section */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-green-200">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-green-800 mb-4">🌟 What Helps You Feel Calm? 🌟</h2>
                <p className="text-green-700 text-lg">Now let's find out what makes you feel better when you're overwhelmed!</p>
              </div>
            </div>

            {/* Sound Calming */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎵</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">What sounds help you feel calm?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on sounds that help you feel better and more relaxed:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {soundCalmingOptions.map((calming) => (
                  <button
                    key={calming.id}
                    onClick={() => handleMultiSelect('soundCalming', calming.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.soundCalming.includes(calming.id)
                        ? 'border-green-400 bg-green-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${calming.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{calming.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{calming.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other sounds that help you feel calm:
                </label>
                <textarea
                  value={formData.soundCalmingText}
                  onChange={(e) => handleTextInput('soundCalmingText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other sounds that help you feel calm and comfortable..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Light Calming */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🕯️</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">What lights help you feel calm?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on lights that help you feel better and more relaxed:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {lightCalmingOptions.map((calming) => (
                  <button
                    key={calming.id}
                    onClick={() => handleMultiSelect('lightCalming', calming.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.lightCalming.includes(calming.id)
                        ? 'border-yellow-400 bg-yellow-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${calming.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{calming.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{calming.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other lights that help you feel calm:
                </label>
                <textarea
                  value={formData.lightCalmingText}
                  onChange={(e) => handleTextInput('lightCalmingText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other lights that help you feel calm and comfortable..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Touch Calming */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🧸</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">What touches help you feel calm?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on touches that help you feel better and more relaxed:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {touchCalmingOptions.map((calming) => (
                  <button
                    key={calming.id}
                    onClick={() => handleMultiSelect('touchCalming', calming.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.touchCalming.includes(calming.id)
                        ? 'border-orange-400 bg-orange-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${calming.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{calming.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{calming.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other touches that help you feel calm:
                </label>
                <textarea
                  value={formData.touchCalmingText}
                  onChange={(e) => handleTextInput('touchCalmingText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other touches that help you feel calm and comfortable..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Smell Calming */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌸</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">What smells help you feel calm?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on smells that help you feel better and more relaxed:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {smellCalmingOptions.map((calming) => (
                  <button
                    key={calming.id}
                    onClick={() => handleMultiSelect('smellCalming', calming.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.smellCalming.includes(calming.id)
                        ? 'border-pink-400 bg-pink-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${calming.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{calming.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{calming.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other smells that help you feel calm:
                </label>
                <textarea
                  value={formData.smellCalmingText}
                  onChange={(e) => handleTextInput('smellCalmingText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other smells that help you feel calm and comfortable..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Taste Calming */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🍯</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">What tastes help you feel calm?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on tastes that help you feel better and more relaxed:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {tasteCalmingOptions.map((calming) => (
                  <button
                    key={calming.id}
                    onClick={() => handleMultiSelect('tasteCalming', calming.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.tasteCalming.includes(calming.id)
                        ? 'border-green-400 bg-green-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${calming.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{calming.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{calming.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other tastes that help you feel calm:
                </label>
                <textarea
                  value={formData.tasteCalmingText}
                  onChange={(e) => handleTextInput('tasteCalmingText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other tastes that help you feel calm and comfortable..."
                  className="w-full px-4 py-3 rounded-xl border-0 bg-brand-50/50 text-ink placeholder:text-ink/50 focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            {/* Movement Calming */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-100/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🧘</span>
                </div>
                <h2 className="text-2xl font-bold text-brand-800">What movements help you feel calm?</h2>
              </div>
              <p className="text-gray-600 mb-6">Click on movements that help you feel better and more relaxed:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {movementCalmingOptions.map((calming) => (
                  <button
                    key={calming.id}
                    onClick={() => handleMultiSelect('movementCalming', calming.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.movementCalming.includes(calming.id)
                        ? 'border-blue-400 bg-blue-50 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${calming.color}`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{calming.icon}</div>
                      <div className="font-semibold text-gray-700 text-sm">{calming.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-lg font-semibold text-ink mb-3">
                  Other movements that help you feel calm:
                </label>
                <textarea
                  value={formData.movementCalmingText}
                  onChange={(e) => handleTextInput('movementCalmingText', e.target.value)}
                  rows={3}
                  placeholder="Tell us about other movements that help you feel calm and comfortable..."
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
                    Download My Sensory Plan PDF
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
