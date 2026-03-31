import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { PromptLibrary } from "./components/sections/PromptLibrary";
import { PromptEditor } from "./components/sections/PromptEditor";
import { AIGenerator } from "./components/sections/AIGenerator";
import { AppSidebar } from "./components/sections/AppSidebar";
import { Header } from "./components/layout/Header";
import { type Prompt } from "@/constants/prompts";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

function AppContent({
  selectedPrompt,
  setSelectedPrompt,
}: {
  selectedPrompt: Prompt | null;
  setSelectedPrompt: (prompt: Prompt | null) => void;
}) {
  const handleSelectPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
  };

  const handleEditPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
  };

  return (
    <SidebarInset>
      <Header />

      {/* Content Area */}
      <Routes>
        <Route path="/" element={<AIGenerator />} />
        <Route
          path="/library"
          element={
            <PromptLibrary onSelectPrompt={handleSelectPrompt} onEditPrompt={handleEditPrompt} />
          }
        />
        <Route
          path="/library/:category"
          element={
            <PromptLibrary onSelectPrompt={handleSelectPrompt} onEditPrompt={handleEditPrompt} />
          }
        />
        <Route
          path="/editor"
          element={
            <PromptEditor key={selectedPrompt?.id || "new"} initialPrompt={selectedPrompt} />
          }
        />
        {/* <Route path="/generate" element={<AIGenerator />} /> */}
      </Routes>
    </SidebarInset>
  );
}

function App() {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  return (
    <BrowserRouter>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <AppContent selectedPrompt={selectedPrompt} setSelectedPrompt={setSelectedPrompt} />
        </div>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;
