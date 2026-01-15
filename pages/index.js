import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Paintbrush,
  Code,
  BookOpen,
  Sparkles,
  Bot,
  Monitor,
} from "lucide-react";
import TemplateLibrary from "@/components/TemplateLibrary";
import CustomizePanel from "@/components/CustomizePanel";
import GuideSection from "@/components/GuideSection";
import CSSExpertChat from "@/components/CSSExpertChat";
import LiveThemeEditor from "@/components/LiveThemeEditor";

export default function Home() {
  const [activeTab, setActiveTab] = useState("templates");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent"></div>
        <div className="relative max-w-6xl mx-auto px-4 pt-10 md:pt-16 pb-8 md:pb-12">
          <div className="text-center space-y-3 md:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs md:text-sm font-medium animate-pulse">
              <Sparkles
                className="w-3 h-3 md:w-4 md:h-4 animate-spin"
                style={{ animationDuration: "3s" }}
              />
              Shopify CSS Made Easy
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight px-2">
              CSS Template Generator
            </h1>
            <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto px-4">
              Ready-to-use CSS snippets for your Shopify store. Preview,
              customize, and copy with one click.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-3 md:px-4 pb-10 md:pb-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-5 bg-slate-800/50 border border-slate-700/50 p-1 rounded-xl mb-6 md:mb-8">
            <TabsTrigger
              value="templates"
              className="data-[state=active]:bg-violet-600 data-[state=active]:text-white rounded-lg flex items-center gap-2"
            >
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">Templates</span>
            </TabsTrigger>
            <TabsTrigger
              value="customize"
              className="data-[state=active]:bg-violet-600 data-[state=active]:text-white rounded-lg flex items-center gap-2"
            >
              <Paintbrush className="w-4 h-4" />
              <span className="hidden sm:inline">Customize</span>
            </TabsTrigger>
            <TabsTrigger
              value="editor"
              className="data-[state=active]:bg-violet-600 data-[state=active]:text-white rounded-lg flex items-center gap-2"
            >
              <Monitor className="w-4 h-4" />
              <span className="hidden sm:inline">Live Editor</span>
            </TabsTrigger>
            <TabsTrigger
              value="assistant"
              className="data-[state=active]:bg-violet-600 data-[state=active]:text-white rounded-lg flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">AI Expert</span>
            </TabsTrigger>
            <TabsTrigger
              value="guide"
              className="data-[state=active]:bg-violet-600 data-[state=active]:text-white rounded-lg flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Guide</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="mt-0">
            <TemplateLibrary />
          </TabsContent>

          <TabsContent value="customize" className="mt-0">
            <CustomizePanel />
          </TabsContent>

          <TabsContent value="editor" className="mt-0">
            <LiveThemeEditor />
          </TabsContent>

          <TabsContent value="assistant" className="mt-0">
            <div className="max-w-2xl mx-auto">
              <CSSExpertChat />
            </div>
          </TabsContent>

          <TabsContent value="guide" className="mt-0">
            <GuideSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
