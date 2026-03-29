import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import type { Prompt } from "../../data/prompts";
import { Cpu, Copy, RotateCcw, Save, FileCode2, Terminal, Variable } from "lucide-react";

interface PromptEditorProps {
  initialPrompt?: Prompt | null;
}

export function PromptEditor({ initialPrompt }: PromptEditorProps) {
  // Initialize state from initialPrompt prop directly
  const [promptText, setPromptText] = useState(initialPrompt?.template || "");
  const [variables, setVariables] = useState<Record<string, string>>(() => {
    if (!initialPrompt) return {};
    const initialVars: Record<string, string> = {};
    initialPrompt.variables.forEach((v) => {
      initialVars[v] = "";
    });
    return initialVars;
  });
  const [customizationRequest, setCustomizationRequest] = useState("");
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState<
    Array<{ id: string; title: string; text: string }>
  >([]);

  const extractVariables = (text: string): string[] => {
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = new Set<string>();
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.add(match[1].trim());
    }
    return Array.from(matches);
  };

  const currentVariables = extractVariables(promptText);

  const handleCustomizeWithAI = () => {
    if (!customizationRequest.trim()) return;

    setIsCustomizing(true);
    // Simulate AI customization (in production, this would call an AI API)
    setTimeout(() => {
      const enhanced = `${promptText}

[AI Enhancement based on: "${customizationRequest}"]
Additional context and improvements applied.`;
      setPromptText(enhanced);
      setIsCustomizing(false);
      setCustomizationRequest("");
    }, 1500);
  };

  const handleCopy = () => {
    let finalText = promptText;
    Object.entries(variables).forEach(([key, value]) => {
      if (value) {
        finalText = finalText.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value);
      }
    });
    navigator.clipboard.writeText(finalText);
  };

  const handleReset = () => {
    if (initialPrompt) {
      setPromptText(initialPrompt.template);
    } else {
      setPromptText("");
    }
    setVariables({});
    setCustomizationRequest("");
  };

  const handleSave = () => {
    const newPrompt = {
      id: Date.now().toString(),
      title: `prompt_${savedPrompts.length + 1}.txt`,
      text: promptText,
    };
    setSavedPrompts([...savedPrompts, newPrompt]);
  };

  const previewText = () => {
    let preview = promptText;
    Object.entries(variables).forEach(([key, value]) => {
      if (value) {
        preview = preview.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value);
      }
    });
    return preview;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="header-font text-4xl text-foreground tracking-wider mb-2">
          &gt; PROMPT_EDITOR
        </h1>
        <p className="text-muted-foreground text-sm">
          // Customize and enhance your prompts with AI assistance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Section */}
        <div className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground header-font text-xl">
                <FileCode2 className="h-5 w-5" />
                TEMPLATE.txt
              </CardTitle>
              <CardDescription className="text-xs">
                // Use {`{{variable_name}}`} for placeholders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="# Enter your prompt template here..."
                className="min-h-75 resize-none bg-black border-border focus:border-foreground text-foreground"
              />

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="h-3 w-3 mr-1" />
                  COPY
                </Button>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="h-3 w-3 mr-1" />
                  RESET
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSave}
                  className="bg-[#4ade80] text-black hover:bg-[#4ade80]/80"
                >
                  <Save className="h-3 w-3 mr-1" />
                  SAVE
                </Button>
              </div>

              {currentVariables.length > 0 && (
                <div className="p-3 bg-card border border-border">
                  <p className="text-xs font-medium mb-2 flex items-center gap-1 text-muted-foreground">
                    <Variable className="h-3 w-3" />
                    DETECTED VARIABLES:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {currentVariables.map((v) => (
                      <Badge key={v} variant="outline" className="text-xs">
                        ${v}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Customization */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground header-font text-xl">
                <Cpu className="h-5 w-5" />
                AI_ENHANCE
              </CardTitle>
              <CardDescription className="text-xs">
                // Tell the AI how to modify your prompt
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={customizationRequest}
                onChange={(e) => setCustomizationRequest(e.target.value)}
                placeholder="$ describe modifications..."
                className="min-h-25 bg-black border-border focus:border-foreground text-foreground"
              />
              <Button
                onClick={handleCustomizeWithAI}
                disabled={isCustomizing || !customizationRequest.trim()}
                className="w-full bg-[#4ade80] text-black hover:bg-[#4ade80]/80"
              >
                {isCustomizing ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                    PROCESSING...
                  </>
                ) : (
                  <>
                    <Cpu className="h-4 w-4 mr-2" />
                    EXECUTE AI_ENHANCE
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Variables & Preview Section */}
        <div className="space-y-4">
          {/* Variables */}
          {currentVariables.length > 0 && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground header-font text-xl">
                  <Variable className="h-5 w-5" />
                  SET_VARIABLES
                </CardTitle>
                <CardDescription className="text-xs">
                  // Assign values to template variables
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentVariables.map((variable) => (
                  <div key={variable} className="space-y-1">
                    <label className="text-xs text-muted-foreground">${variable}</label>
                    <Input
                      value={variables[variable] || ""}
                      onChange={(e) => setVariables({ ...variables, [variable]: e.target.value })}
                      placeholder={`value...`}
                      className="bg-black border-border focus:border-foreground"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Preview */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground header-font text-xl">
                <Terminal className="h-5 w-5" />
                OUTPUT_PREVIEW
              </CardTitle>
              <CardDescription className="text-xs">// Final rendered prompt</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black border border-border p-4 min-h-50 text-sm whitespace-pre-wrap text-foreground">
                {previewText() || "// Output will appear here..."}
              </div>
            </CardContent>
          </Card>

          {/* Saved Prompts */}
          {savedPrompts.length > 0 && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="header-font text-xl text-foreground">SAVED_FILES</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {savedPrompts.map((saved) => (
                  <button
                    key={saved.id}
                    className="w-full text-left p-2 bg-black border border-border hover:border-foreground/30 cursor-pointer transition-colors"
                    onClick={() => setPromptText(saved.text)}
                  >
                    <p className="text-sm text-foreground">&gt; {saved.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{saved.text}</p>
                  </button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
