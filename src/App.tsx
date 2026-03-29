import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { PromptLibrary } from "./components/sections/PromptLibrary";
import { PromptEditor } from "./components/sections/PromptEditor";
import { AIGenerator } from "./components/sections/AIGenerator";
import { type Prompt, categories } from "./data/prompts";
import {
  Terminal,
  FolderCode,
  FileCode2,
  Cpu,
  Database,
  Code2,
  FileText,
  Briefcase,
  BarChart3,
  Palette,
  GraduationCap,
  Lightbulb,
  MessageSquare,
  Home as HomeIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

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

function AppSidebar({ 
  selectedCategory, 
  onCategoryChange 
}: { 
  selectedCategory: string; 
  onCategoryChange: (category: string) => void;
}) {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex items-center justify-center w-10 h-10 bg-card border border-border">
            <Terminal className="h-6 w-6 text-foreground" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h1 className="header-font text-2xl text-foreground tracking-wider">
              PROMPTU
            </h1>
            <p className="text-xs text-muted-foreground">v1.0.0</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-muted-foreground uppercase tracking-wider">
            &gt; Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/"}>
                  <Link to="/">
                    <HomeIcon className="h-4 w-4" />
                    <span>HOME</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/library"}>
                  <Link to="/library">
                    <FolderCode className="h-4 w-4" />
                    <span>LIBRARY</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/editor"}>
                  <Link to="/editor">
                    <FileCode2 className="h-4 w-4" />
                    <span>EDITOR</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/generate"}>
                  <Link to="/generate">
                    <Cpu className="h-4 w-4" />
                    <span>AI GENERATE</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-muted-foreground uppercase tracking-wider">
            &gt; Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onCategoryChange("All")}
                  isActive={selectedCategory === "All"}
                >
                  <Database className="h-4 w-4" />
                  <span>ALL_PROMPTS</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {categories.map((category) => (
                <SidebarMenuItem key={category}>
                  <SidebarMenuButton
                    onClick={() => onCategoryChange(category)}
                    isActive={selectedCategory === category}
                  >
                    {categoryIcons[category] || <FileCode2 className="h-4 w-4" />}
                    <span className="truncate">
                      {category.replace(/ & /g, "_").replace(/ /g, "_").toUpperCase()}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[#4ade80]" />
              <span className="text-muted-foreground group-data-[collapsible=icon]:hidden">
                ONLINE
              </span>
            </div>
            <span className="text-muted-foreground group-data-[collapsible=icon]:hidden">
              {new Date().toLocaleTimeString("en-US", { hour12: false })}
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function AppContent({ 
  selectedPrompt, 
  setSelectedPrompt,
  selectedCategory,
  setSelectedCategory 
}: {
  selectedPrompt: Prompt | null;
  setSelectedPrompt: (prompt: Prompt | null) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}) {
  const location = useLocation();

  const handleSelectPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
  };

  const handleEditPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
  };

  const getPageTitle = () => {
    const path = location.pathname.substring(1) || "home";
    return path.toUpperCase();
  };

  return (
    <SidebarInset>
      {/* Header Bar */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-card/50">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">&gt;</span>
            <span className="text-foreground">PROMPTU</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground uppercase">{getPageTitle()}</span>
            {selectedCategory !== "All" && location.pathname === "/library" && (
              <>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">{selectedCategory}</span>
              </>
            )}
            <span className="cursor-blink text-foreground"></span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4 text-xs text-muted-foreground px-4">
          <span>PROMPTS: 15</span>
          <span>|</span>
          <span>MEM: 42%</span>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/library"
            element={
              <PromptLibrary
                onSelectPrompt={handleSelectPrompt}
                onEditPrompt={handleEditPrompt}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            }
          />
          <Route
            path="/editor"
            element={
              <PromptEditor
                key={selectedPrompt?.id || "new"}
                initialPrompt={selectedPrompt}
              />
            }
          />
          <Route path="/generate" element={<AIGenerator />} />
        </Routes>
      </div>
    </SidebarInset>
  );
}

function App() {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  return (
    <BrowserRouter>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar 
            selectedCategory={selectedCategory} 
            onCategoryChange={setSelectedCategory}
          />
          <AppContent 
            selectedPrompt={selectedPrompt}
            setSelectedPrompt={setSelectedPrompt}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;
