import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { prebuiltPrompts, type Prompt } from "@/constants/prompts";
import { STATUS_CONFIG, getStatusConfig, type StatusType } from "@/constants/status";
import { getCategoryBySlug } from "@/constants";
import { Search, Copy, FileCode2, Play, Terminal } from "lucide-react";

interface PromptLibraryProps {
  onSelectPrompt: (prompt: Prompt) => void;
  onEditPrompt: (prompt: Prompt) => void;
}

export function PromptLibrary({ onSelectPrompt, onEditPrompt }: PromptLibraryProps) {
  const { category: categoryParam } = useParams<{ category?: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Convert URL param back to category title
  const selectedCategory = categoryParam ? getCategoryBySlug(categoryParam) : null;

  const filteredPrompts = prebuiltPrompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = !selectedCategory || prompt.category === selectedCategory.title;

    return matchesSearch && matchesCategory;
  });

  const handleCopy = (prompt: Prompt) => {
    navigator.clipboard.writeText(prompt.template);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="header-font text-4xl text-foreground tracking-wider mb-2">
          &gt; PROMPT_LIBRARY
        </h1>
        <p className="text-muted-foreground text-sm">
          // Pre-built prompts optimized for various scenarios
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="grep -i 'search prompts...'"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border focus:border-foreground"
          />
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex flex-wrap gap-4 text-sm p-3 bg-card border border-border">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">TOTAL: {filteredPrompts.length}</span>
        </div>
        <span className="text-muted-foreground">|</span>
        {(Object.keys(STATUS_CONFIG) as StatusType[]).map((statusKey) => {
          const config = STATUS_CONFIG[statusKey];
          const count = prebuiltPrompts.filter((p) => p.status === statusKey).length;
          if (count === 0) return null;
          return (
            <div key={statusKey} className="flex items-center gap-2">
              <Badge variant={config.variant}>{config.label}</Badge>
              <span className="text-muted-foreground">{count}</span>
            </div>
          );
        })}
      </div>

      {/* Prompt Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredPrompts.map((prompt) => (
          <Card
            key={prompt.id}
            className="bg-card border border-border hover:border-foreground/30 transition-all cursor-pointer group"
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2 mb-1">
                <CardTitle className="text-sm font-medium text-foreground group-hover:text-foreground">
                  {prompt.title}
                </CardTitle>
                {prompt.status && getStatusConfig(prompt.status) && (
                  <Badge
                    variant={getStatusConfig(prompt.status)!.variant}
                    className="shrink-0 text-xs"
                  >
                    {getStatusConfig(prompt.status)!.label}
                  </Badge>
                )}
              </div>
              <CardDescription className="text-xs text-muted-foreground">
                &gt; {prompt.category}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground line-clamp-2">{prompt.description}</p>
              <div className="flex flex-wrap gap-1">
                {prompt.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => onSelectPrompt(prompt)}
                  className="flex-1 bg-white text-black hover:bg-neutral-200"
                >
                  <Play className="h-3 w-3 mr-1" />
                  RUN
                </Button>
                <Button size="sm" variant="outline" onClick={() => onEditPrompt(prompt)}>
                  <FileCode2 className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleCopy(prompt)}>
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              {copiedId === prompt.id && (
                <p className="text-xs text-foreground text-center">[COPIED TO CLIPBOARD]</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrompts.length === 0 && (
        <div className="text-center py-12 border border-border bg-card">
          <Terminal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">&gt; ERROR: No prompts found matching criteria</p>
          <p className="text-xs text-muted-foreground mt-2">// Try adjusting your search filters</p>
        </div>
      )}
    </div>
  );
}
