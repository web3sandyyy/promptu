import type { CategoryTitle } from "./categories";
import type { StatusType } from "./status";
import { CATEGORIES } from "./categories";

/**
 * Prompt interface definition
 */
export interface Prompt {
  id: string;
  title: string;
  category: CategoryTitle;
  description: string;
  template: string;
  variables: string[];
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  status?: StatusType;
}

/**
 * Re-export categories from centralized location
 * @deprecated Import from './categories' instead
 */
export const categories = CATEGORIES;

/**
 * Pre-built prompt templates
 * Organized by category for easy maintenance
 */
export const prebuiltPrompts: Prompt[] = [
  // Coding & Development
  {
    id: "code-review",
    title: "Code Review Assistant",
    category: "Coding & Development",
    description: "Get detailed code review with best practices and improvements",
    template: `Review the following code and provide:
1. Security vulnerabilities
2. Performance optimizations
3. Code quality improvements
4. Best practice recommendations

Code Language: {{language}}
Code:
{{code}}

Focus areas: {{focus_areas}}`,
    variables: ["language", "code", "focus_areas"],
    tags: ["code", "review", "quality"],
    difficulty: "intermediate",
    status: "clean",
  },
  {
    id: "debug-helper",
    title: "Debug Assistant",
    category: "Coding & Development",
    description: "Identify and fix bugs with detailed explanations",
    template: `I'm encountering an error in my code. Help me debug it:

Error Message: {{error_message}}
Code Context: {{code_context}}
Expected Behavior: {{expected_behavior}}
Actual Behavior: {{actual_behavior}}

Please provide:
1. Root cause analysis
2. Step-by-step fix
3. Prevention tips`,
    variables: ["error_message", "code_context", "expected_behavior", "actual_behavior"],
    tags: ["debug", "error", "fix"],
    difficulty: "beginner",
    status: "priority",
  },
  {
    id: "refactor-code",
    title: "Code Refactoring",
    category: "Coding & Development",
    description: "Refactor code for better maintainability and performance",
    template: `Refactor the following code following {{framework}} best practices:

Current Code:
{{current_code}}

Requirements:
- Improve readability
- Enhance performance
- Follow SOLID principles
- Add proper error handling
{{additional_requirements}}`,
    variables: ["framework", "current_code", "additional_requirements"],
    tags: ["refactor", "clean-code", "optimization"],
    difficulty: "advanced",
    status: "new",
  },

  // Content Writing
  {
    id: "blog-writer",
    title: "Blog Post Generator",
    category: "Content Writing",
    description: "Create engaging blog posts with SEO optimization",
    template: `Write a comprehensive blog post about:

Topic: {{topic}}
Target Audience: {{audience}}
Tone: {{tone}}
Word Count: {{word_count}}
Keywords to include: {{keywords}}

Structure:
- Compelling headline
- Engaging introduction
- {{sections}} main sections with subheadings
- Actionable conclusion
- SEO-optimized meta description`,
    variables: ["topic", "audience", "tone", "word_count", "keywords", "sections"],
    tags: ["blog", "seo", "content"],
    difficulty: "intermediate",
    status: "clean",
  },
  {
    id: "social-media",
    title: "Social Media Post Creator",
    category: "Content Writing",
    description: "Craft engaging social media content with hooks and CTAs",
    template: `Create {{count}} social media posts for {{platform}}:

Topic/Product: {{topic}}
Brand Voice: {{brand_voice}}
Goal: {{goal}}
Target Audience: {{audience}}

Include:
- Attention-grabbing hook
- Value proposition
- Call-to-action
- Relevant hashtags ({{hashtag_count}})
- Emojis where appropriate`,
    variables: ["count", "platform", "topic", "brand_voice", "goal", "audience", "hashtag_count"],
    tags: ["social", "marketing", "engagement"],
    difficulty: "beginner",
    status: "priority",
  },

  // Business & Marketing
  {
    id: "marketing-strategy",
    title: "Marketing Strategy Builder",
    category: "Business & Marketing",
    description: "Develop comprehensive marketing strategies",
    template: `Create a marketing strategy for:

Product/Service: {{product}}
Target Market: {{target_market}}
Budget: {{budget}}
Timeline: {{timeline}}
Goals: {{goals}}

Include:
1. Market analysis
2. Positioning strategy
3. Marketing channels
4. Content plan
5. KPIs and metrics
6. Risk mitigation`,
    variables: ["product", "target_market", "budget", "timeline", "goals"],
    tags: ["strategy", "marketing", "business"],
    difficulty: "advanced",
    status: "warning",
  },
  {
    id: "pitch-deck",
    title: "Pitch Deck Outline",
    category: "Business & Marketing",
    description: "Structure investor pitch presentations",
    template: `Create a pitch deck outline for:

Company: {{company_name}}
Industry: {{industry}}
Stage: {{stage}}
Funding Goal: {{funding_goal}}

Create slides covering:
1. Problem statement
2. Solution
3. Market opportunity
4. Business model
5. Traction
6. Competitive advantage
7. Team
8. Financial projections
9. Ask

Additional context: {{context}}`,
    variables: ["company_name", "industry", "stage", "funding_goal", "context"],
    tags: ["pitch", "startup", "investment"],
    difficulty: "advanced",
    status: "new",
  },

  // Data Analysis
  {
    id: "data-insight",
    title: "Data Analysis Assistant",
    category: "Data Analysis",
    description: "Extract insights from data and create reports",
    template: `Analyze the following data and provide insights:

Dataset Description: {{dataset_description}}
Analysis Goals: {{goals}}
Key Metrics: {{metrics}}

Provide:
1. Data summary and patterns
2. Key findings
3. Visualizations recommendations
4. Actionable insights
5. Potential concerns or limitations

Raw Data:
{{data}}`,
    variables: ["dataset_description", "goals", "metrics", "data"],
    tags: ["data", "analysis", "insights"],
    difficulty: "advanced",
    status: "clean",
  },

  // Additional prompts...
];
