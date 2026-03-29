import { useState } from "react";
import "./App.css";
import { PromptLibrary } from "./components/sections/PromptLibrary";
import { PromptEditor } from "./components/sections/PromptEditor";
import { AIGenerator } from "./components/sections/AIGenerator";
import { type Prompt, categories } from "./data/prompts";
import {
  Terminal,
  FolderCode,
  FileCode2,
  Cpu,
  ChevronRight,
  Database,
  Code2,
  FileText,
  Briefcase,
  BarChart3,
  Palette,
  GraduationCap,
  Lightbulb,
  MessageSquare,
} from "lucide-react";

// Map categories to terminal-like icons
const categoryIcons: Record<string, React.ReactNode> = {
  "Coding & Development": <Code2 className="h-4 w-4" />,
  "Content Writing": <FileText className="h-4 w-4" />,
  "Business & Marketing": <Briefcase className="h-4 w-4" />,
  "Data Analysis": <BarChart3 className="h-4 w-4" />,
  "Creative Writing": <Palette className="h-4 w-4" />,
  "Education & Learning": <GraduationCap className="h-4 w-4" />,
  "Problem Solving": <Lightbulb className="h-4 w-4" />,
  Communication: <MessageSquare className="h-4 w-4" />,
};

function App() {
  const [activeSection, setActiveSection] = useState<
    "library" | "editor" | "generate"
  >("library");
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const handleSelectPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setActiveSection("editor");
  };

  const handleEditPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setActiveSection("editor");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-card border border-border">
              <Terminal className="h-6 w-6 text-foreground" />
            </div>
            <div>
              <h1 className="header-font text-2xl text-foreground tracking-wider">
                PROMPTU
              </h1>
              <p className="text-xs text-muted-foreground">v1.0.0</p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="p-2 border-b border-sidebar-border">
          <p className="px-3 py-2 text-xs text-muted-foreground uppercase tracking-wider">
            &gt; Navigation
          </p>
          <button
            onClick={() => setActiveSection("library")}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
              activeSection === "library"
                ? "bg-card text-[#4ade80] border-l-2 border-[#4ade80]"
                : "text-foreground hover:bg-card hover:text-foreground"
            }`}
          >
            <FolderCode className="h-4 w-4" />
            <span>LIBRARY</span>
            {activeSection === "library" && (
              <ChevronRight className="h-4 w-4 ml-auto" />
            )}
          </button>
          <button
            onClick={() => setActiveSection("editor")}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
              activeSection === "editor"
                ? "bg-card text-[#4ade80] border-l-2 border-[#4ade80]"
                : "text-foreground hover:bg-card hover:text-foreground"
            }`}
          >
            <FileCode2 className="h-4 w-4" />
            <span>EDITOR</span>
            {activeSection === "editor" && (
              <ChevronRight className="h-4 w-4 ml-auto" />
            )}
          </button>
          <button
            onClick={() => setActiveSection("generate")}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
              activeSection === "generate"
                ? "bg-card text-[#4ade80] border-l-2 border-[#4ade80]"
                : "text-foreground hover:bg-card hover:text-foreground"
            }`}
          >
            <Cpu className="h-4 w-4" />
            <span>AI GENERATE</span>
            {activeSection === "generate" && (
              <ChevronRight className="h-4 w-4 ml-auto" />
            )}
          </button>
        </nav>

        {/* Categories */}
        <div className="flex-1 overflow-auto p-2">
          <p className="px-3 py-2 text-xs text-muted-foreground uppercase tracking-wider">
            &gt; Categories
          </p>
          <button
            onClick={() => setSelectedCategory("All")}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
              selectedCategory === "All"
                ? "bg-card text-foreground"
                : "text-muted-foreground hover:bg-card hover:text-foreground"
            }`}
          >
            <Database className="h-4 w-4" />
            <span>ALL_PROMPTS</span>
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setActiveSection("library");
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                selectedCategory === category
                  ? "bg-card text-foreground"
                  : "text-muted-foreground hover:bg-card hover:text-foreground"
              }`}
            >
              {categoryIcons[category] || <FileCode2 className="h-4 w-4" />}
              <span className="truncate">
                {category.replace(/ & /g, "_").replace(/ /g, "_").toUpperCase()}
              </span>
            </button>
          ))}
        </div>

        {/* Status Bar */}
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[#4ade80]" />
              <span className="text-muted-foreground">ONLINE</span>
            </div>
            <span className="text-muted-foreground">
              {new Date().toLocaleTimeString("en-US", { hour12: false })}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header Bar */}
        <header className="border-b border-border bg-card/50 sticky top-0 z-10">
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">&gt;</span>
              <span className="text-foreground">PROMPTU</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground uppercase">{activeSection}</span>
              {selectedCategory !== "All" && activeSection === "library" && (
                <>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-muted-foreground">
                    {selectedCategory}
                  </span>
                </>
              )}
              <span className="cursor-blink text-foreground"></span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>PROMPTS: 15</span>
              <span>|</span>
              <span>MEM: 42%</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {activeSection === "library" && (
            <PromptLibrary
              onSelectPrompt={handleSelectPrompt}
              onEditPrompt={handleEditPrompt}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          )}

          {activeSection === "editor" && (
            <PromptEditor
              key={selectedPrompt?.id || "new"}
              initialPrompt={selectedPrompt}
            />
          )}

          {activeSection === "generate" && <AIGenerator />}
        </div>
      </main>
    </div>
  );
}

export default App;
