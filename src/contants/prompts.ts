export interface Prompt {
  id: string;
  title: string;
  category: string;
  description: string;
  template: string;
  variables: string[];
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  status?: "clean" | "warning" | "critical" | "new" | "priority";
}

export const categories = [
  "Coding & Development",
  "Content Writing",
  "Business & Marketing",
  "Data Analysis",
  "Creative Writing",
  "Education & Learning",
  "Problem Solving",
  "Communication",
];

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
Analysis Goal: {{goal}}
Key Metrics: {{metrics}}

Data:
{{data}}

Provide:
1. Key findings
2. Trends and patterns
3. Anomalies
4. Actionable recommendations
5. Visualization suggestions`,
    variables: ["dataset_description", "goal", "metrics", "data"],
    tags: ["analytics", "insights", "reporting"],
    difficulty: "intermediate",
    status: "clean",
  },

  // Creative Writing
  {
    id: "story-generator",
    title: "Story Generator",
    category: "Creative Writing",
    description: "Generate creative stories with plot and characters",
    template: `Write a {{genre}} story with the following elements:

Setting: {{setting}}
Main Character: {{character}}
Conflict: {{conflict}}
Tone: {{tone}}
Length: {{length}} words

Include:
- Engaging opening
- Character development
- Rising action
- Climax
- Resolution`,
    variables: ["genre", "setting", "character", "conflict", "tone", "length"],
    tags: ["creative", "story", "fiction"],
    difficulty: "intermediate",
    status: "priority",
  },

  // Education & Learning
  {
    id: "lesson-plan",
    title: "Lesson Plan Creator",
    category: "Education & Learning",
    description: "Create structured educational lesson plans",
    template: `Create a lesson plan for:

Subject: {{subject}}
Grade Level: {{grade_level}}
Duration: {{duration}}
Learning Objectives: {{objectives}}
Prior Knowledge Required: {{prior_knowledge}}

Include:
1. Introduction/Hook ({{hook_time}} min)
2. Direct Instruction ({{instruction_time}} min)
3. Guided Practice ({{practice_time}} min)
4. Independent Work ({{work_time}} min)
5. Assessment methods
6. Differentiation strategies
7. Required materials`,
    variables: [
      "subject",
      "grade_level",
      "duration",
      "objectives",
      "prior_knowledge",
      "hook_time",
      "instruction_time",
      "practice_time",
      "work_time",
    ],
    tags: ["education", "teaching", "curriculum"],
    difficulty: "advanced",
    status: "clean",
  },
  {
    id: "study-guide",
    title: "Study Guide Generator",
    category: "Education & Learning",
    description: "Create comprehensive study materials",
    template: `Create a study guide for:

Topic: {{topic}}
Subject: {{subject}}
Exam Date: {{exam_date}}
Key Concepts: {{concepts}}

Include:
- Summary of main concepts
- Key definitions
- Practice questions ({{question_count}})
- Memory techniques
- Study schedule
- Additional resources`,
    variables: ["topic", "subject", "exam_date", "concepts", "question_count"],
    tags: ["study", "learning", "exam"],
    difficulty: "beginner",
    status: "new",
  },

  // Problem Solving
  {
    id: "decision-framework",
    title: "Decision Making Framework",
    category: "Problem Solving",
    description: "Structured approach to complex decisions",
    template: `Help me make a decision about: {{decision}}

Context: {{context}}
Options:
{{options}}

Timeline: {{timeline}}
Key Stakeholders: {{stakeholders}}
Constraints: {{constraints}}

Provide:
1. Pros and cons analysis
2. Risk assessment
3. Impact evaluation
4. Recommended decision with rationale
5. Implementation steps`,
    variables: ["decision", "context", "options", "timeline", "stakeholders", "constraints"],
    tags: ["decision", "strategy", "analysis"],
    difficulty: "advanced",
    status: "warning",
  },

  // Communication
  {
    id: "email-writer",
    title: "Professional Email Writer",
    category: "Communication",
    description: "Compose clear and professional emails",
    template: `Write a professional email:

Recipient: {{recipient}}
Purpose: {{purpose}}
Tone: {{tone}}
Key Points:
{{key_points}}

Context: {{context}}

Include:
- Appropriate greeting
- Clear subject line
- Concise body
- Professional closing`,
    variables: ["recipient", "purpose", "tone", "key_points", "context"],
    tags: ["email", "communication", "professional"],
    difficulty: "beginner",
    status: "clean",
  },
];
