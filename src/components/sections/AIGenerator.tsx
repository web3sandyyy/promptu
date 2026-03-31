import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Cpu, Copy, RefreshCw, Settings, Terminal, Play, History } from "lucide-react";

export function AIGenerator() {
  const [goal, setGoal] = useState("");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState("professional");
  const [complexity, setComplexity] = useState("intermediate");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<Array<{ id: string; goal: string; prompt: string }>>([]);

  const tones = ["professional", "casual", "technical", "creative", "formal", "friendly"];
  const complexityLevels = ["beginner", "intermediate", "advanced", "expert"];

  const handleGenerate = () => {
    if (!goal.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation (in production, this would call an AI API)
    setTimeout(() => {
      const generated = `# OPTIMIZED_PROMPT: ${goal}

## CONTEXT
${context || "General purpose application"}

## INSTRUCTIONS
Please analyze the following request and provide a comprehensive response that:

1. Addresses the core objective: ${goal}
2. Maintains a ${tone} tone throughout
3. Considers ${complexity}-level understanding
4. Provides actionable insights and recommendations

## REQUIREMENTS
- Be specific and detailed
- Include examples where relevant
- Structure the response clearly
- Consider edge cases and limitations

## ADDITIONAL_PARAMS
{{any_specific_requirements}}

Please provide your response following this structure:
1. Summary of understanding
2. Main analysis/solution
3. Key recommendations
4. Next steps

---
GENERATED: ${new Date().toISOString()}
OPTIMIZATION_LEVEL: ${complexity.toUpperCase()}
STATUS: READY`;

      setGeneratedPrompt(generated);
      setHistory([{ id: Date.now().toString(), goal, prompt: generated }, ...history.slice(0, 4)]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
  };

  const handleRegenerate = () => {
    if (goal.trim()) {
      handleGenerate();
    }
  };

  return (
    <div className="space-y-6 p-4 bg-texture">
      {/* Header */}
      <div>
        <h1 className="header-font text-4xl text-white tracking-wider mb-2">&gt; AI_GENERATOR</h1>
        <p className="text-muted-foreground text-sm">
          // Generate optimized prompts from scratch using AI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary header-font text-xl">
                <Cpu className="h-5 w-5" />
                INPUT_PARAMS
              </CardTitle>
              <CardDescription className="text-xs">// Define generation parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">
                  $GOAL <span className="text-destructive">*required</span>
                </label>
                <Input
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="$ describe your objective..."
                  className="bg-black border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">$CONTEXT</label>
                <Textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="$ additional context..."
                  className="min-h-30 bg-black border-border focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground flex items-center gap-1">
                    <Settings className="h-3 w-3" />
                    $TONE
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="h-9 w-full border border-border bg-black px-3 text-sm focus:border-primary focus:outline-none"
                  >
                    {tones.map((t) => (
                      <option key={t} value={t}>
                        {t.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground flex items-center gap-1">
                    <Settings className="h-3 w-3" />
                    $COMPLEXITY
                  </label>
                  <select
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value)}
                    className="h-9 w-full border border-border bg-black px-3 text-sm focus:border-primary focus:outline-none"
                  >
                    {complexityLevels.map((c) => (
                      <option key={c} value={c}>
                        {c.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !goal.trim()}
                className="w-full bg-white text-black hover:bg-neutral-200"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                    GENERATING...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    EXECUTE GENERATE
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Quick Templates */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="header-font text-lg text-primary">QUICK_TEMPLATES</CardTitle>
              <CardDescription className="text-xs">// Click to auto-fill goal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "Create a prompt for debugging code",
                "Generate content writing instructions",
                "Build a data analysis framework",
                "Design a creative brainstorming prompt",
              ].map((template) => (
                <button
                  key={template}
                  onClick={() => setGoal(template)}
                  className="w-full text-left p-2 text-sm bg-black border border-border hover:border-primary/50 hover:text-primary transition-colors"
                >
                  &gt; {template}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-primary header-font text-xl">
                  <Terminal className="h-5 w-5" />
                  OUTPUT
                </CardTitle>
                {generatedPrompt && (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={handleRegenerate}>
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
              <CardDescription className="text-xs">
                // AI-generated optimized prompt
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedPrompt ? (
                <div className="space-y-4">
                  <div className="bg-black border border-border p-4 min-h-100 text-sm whitespace-pre-wrap overflow-auto max-h-150 text-foreground">
                    {generatedPrompt}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="success">OPTIMIZED</Badge>
                    <Badge variant="outline">{tone.toUpperCase()}</Badge>
                    <Badge variant="outline">{complexity.toUpperCase()}</Badge>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-100 text-center border border-dashed border-border bg-black">
                  <Terminal className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">&gt; AWAITING INPUT_</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    // Fill parameters and execute generate
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* History */}
          {history.length > 0 && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 header-font text-lg text-foreground">
                  <History className="h-4 w-4" />
                  HISTORY
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {history.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setGeneratedPrompt(item.prompt)}
                    className="w-full text-left p-3 bg-black border border-border hover:border-primary/50 transition-colors"
                  >
                    <p className="text-sm text-primary line-clamp-1">&gt; {item.goal}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{item.prompt}</p>
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
