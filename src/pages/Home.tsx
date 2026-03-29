import { Terminal, Zap, BookOpen, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6">
      <div className="max-w-4xl w-full space-y-8 text-center">
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-card border-2 border-[#4ade80]">
              <Terminal className="h-10 w-10 text-[#4ade80]" />
            </div>
            <h1 className="header-font text-6xl text-foreground tracking-wider">
              PROMPTU
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your terminal-inspired prompt management system. Organize, edit, and generate
            AI prompts with style.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
          <Card className="p-6 bg-card border-border hover:border-[#4ade80] transition-colors">
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 bg-background border border-border">
                <BookOpen className="h-8 w-8 text-[#4ade80]" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Prompt Library</h3>
              <p className="text-sm text-muted-foreground">
                Browse and organize your prompt collection by category
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-[#4ade80] transition-colors">
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 bg-background border border-border">
                <Zap className="h-8 w-8 text-[#4ade80]" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Smart Editor</h3>
              <p className="text-sm text-muted-foreground">
                Edit and customize prompts with real-time preview
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-[#4ade80] transition-colors">
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 bg-background border border-border">
                <Sparkles className="h-8 w-8 text-[#4ade80]" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">AI Generator</h3>
              <p className="text-sm text-muted-foreground">
                Generate custom prompts using AI assistance
              </p>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="flex items-center justify-center gap-4 pt-8">
          <Link to="/library">
            <Button className="bg-[#4ade80] text-black hover:bg-[#4ade80]/90">
              Browse Library
            </Button>
          </Link>
          <Link to="/generate">
            <Button variant="outline" className="border-border hover:border-[#4ade80]">
              Generate Prompt
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="pt-8 border-t border-border">
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[#4ade80]" />
              <span className="text-muted-foreground">15 PROMPTS</span>
            </div>
            <span className="text-muted-foreground">|</span>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[#4ade80]" />
              <span className="text-muted-foreground">8 CATEGORIES</span>
            </div>
            <span className="text-muted-foreground">|</span>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[#4ade80]" />
              <span className="text-muted-foreground">SYSTEM READY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
