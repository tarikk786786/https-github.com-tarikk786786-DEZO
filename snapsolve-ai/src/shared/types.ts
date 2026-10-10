import { z } from "zod";

export type ThemeMode = "light" | "dark" | "system";
export type AnswerMode =
  | "quick"
  | "learn"
  | "practice"
  | "tutor"
  | "revision"
  | "research"
  | "coding"
  | "assessment-review";

export type ExplanationDepth = "short" | "balanced" | "detailed";
export type ExpertiseLevel = "beginner" | "intermediate" | "advanced";
export type CaptureMethod =
  | "manual"
  | "selection"
  | "region"
  | "visible-page"
  | "image"
  | "pdf"
  | "clipboard"
  | "context-menu";

export type QuestionType =
  | "mcq-single"
  | "mcq-multi"
  | "true-false"
  | "fill-blank"
  | "short-answer"
  | "long-answer"
  | "math"
  | "code"
  | "science"
  | "language"
  | "reasoning"
  | "diagram"
  | "mixed"
  | "unknown";

export type ProviderId =
  | "demo"
  | "openai"
  | "gemini"
  | "anthropic"
  | "openrouter"
  | "groq"
  | "mistral"
  | "deepseek"
  | "together"
  | "fireworks"
  | "cerebras"
  | "cohere"
  | "huggingface"
  | "ollama"
  | "lmstudio"
  | "custom";

export type RoutingMode =
  | "automatic"
  | "cheapest"
  | "fastest"
  | "quality"
  | "manual"
  | "free-only";

export type TaskCategory =
  | "general"
  | "mcq"
  | "math"
  | "science"
  | "coding"
  | "reasoning"
  | "ocr-cleanup"
  | "vision"
  | "document"
  | "translation"
  | "research"
  | "structured";

export interface McqOption {
  label: string;
  text: string;
}

export interface ParsedQuestion {
  id: string;
  rawText: string;
  questionText: string;
  options: McqOption[];
  type: QuestionType;
  numbering?: string;
  confidence: number;
  warnings: string[];
}

export interface SolveRequest {
  question: ParsedQuestion;
  mode: AnswerMode;
  imageDataUrl?: string;
  followUp?: string;
  conversationId?: string;
  forceProvider?: ProviderId;
  forceModel?: string;
}

export interface SolveResponse {
  answer: string;
  selectedOptions?: string[];
  explanation: string;
  steps?: string[];
  alternatives?: string[];
  incorrectOptions?: Record<string, string>;
  confidence?: number;
  sources?: string[];
  provider: ProviderId;
  model: string;
  isDemo: boolean;
  warnings: string[];
  latencyMs: number;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
    estimatedCostUsd?: number;
  };
}

export interface VerificationResult {
  primary: SolveResponse;
  secondary: SolveResponse;
  agreement: "agree" | "partial" | "disagree" | "unknown";
  assessment: string;
  differences: string[];
}

export interface HistoryItem {
  id: string;
  createdAt: number;
  updatedAt: number;
  source: CaptureMethod;
  question: ParsedQuestion;
  response?: SolveResponse;
  verification?: VerificationResult;
  notes?: string;
  tags: string[];
  favorite: boolean;
}

export interface ModelCapabilities {
  text: boolean;
  vision: boolean;
  tools: boolean;
  structured: boolean;
  coding: boolean;
  reasoning: boolean;
  math: boolean;
  longContext: boolean;
  contextLength?: number;
}

export interface CatalogModel {
  id: string;
  name: string;
  provider: ProviderId;
  description?: string;
  pricing?: {
    prompt?: number | null;
    completion?: number | null;
    currency?: string;
    isFree?: boolean;
    pricingNote?: string;
  };
  capabilities: ModelCapabilities;
  modality?: string[];
  updatedAt: number;
}

export interface ProviderConfig {
  id: ProviderId;
  label?: string;
  enabled: boolean;
  apiKey?: string;
  baseUrl?: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
  supportsCatalog?: boolean;
  lastLatencyMs?: number;
  lastError?: string;
  lastTestedAt?: number;
  connectionStatus?: "unknown" | "ok" | "error";
}

export interface Settings {
  theme: ThemeMode;
  accent: "violet" | "cyan" | "mint";
  fontSize: "sm" | "md" | "lg";
  density: "compact" | "comfortable";
  animations: boolean;
  floatingToolbar: boolean;
  floatingToolbarExcludedHosts: string[];
  answerMode: AnswerMode;
  explanationDepth: ExplanationDepth;
  expertiseLevel: ExpertiseLevel;
  preferredLanguage: string;
  answerFirst: boolean;
  showFormulas: boolean;
  showAlternatives: boolean;
  explainIncorrectOptions: boolean;
  confirmBatchSolve: boolean;
  ocrLanguage: string;
  autoDetectBoundaries: boolean;
  captureDelayMs: number;
  batchLimit: number;
  defaultProvider: ProviderId;
  providers: ProviderConfig[];
  systemInstructions: string;
  requestTimeoutMs: number;
  retryCount: number;
  historyRetentionDays: number;
  historyEnabled: boolean;
  discloseExternalTransfer: boolean;
  onboardingComplete: boolean;
  demoMode: boolean;
  routingMode: RoutingMode;
  allowPaidModels: boolean;
  freeOnlyMode: boolean;
  fallbackProvider?: ProviderId;
  verifyAnswers: boolean;
  verifyProvider?: ProviderId;
  taskModels: Partial<Record<TaskCategory, { provider: ProviderId; model: string }>>;
  catalogCacheMinutes: number;
  dailyRequestBudget?: number;
  requestsToday: number;
  requestsDayKey: string;
  exportIncludeBranding: boolean;
  requireConsentBeforeExternal: boolean;
  consentedExternalTransfer: boolean;
}

export const SolveResponseSchema = z.object({
  answer: z.string(),
  selectedOptions: z.array(z.string()).optional(),
  explanation: z.string(),
  steps: z.array(z.string()).optional(),
  alternatives: z.array(z.string()).optional(),
  incorrectOptions: z.record(z.string()).optional(),
  confidence: z.number().min(0).max(1).optional(),
  sources: z.array(z.string()).optional(),
  warnings: z.array(z.string()).optional(),
});

export type ExtensionMessage =
  | { type: "OPEN_SIDE_PANEL" }
  | { type: "START_REGION_CAPTURE"; tabId?: number }
  | { type: "REGION_CAPTURED"; dataUrl: string }
  | { type: "CAPTURE_CANCELLED" }
  | { type: "GET_SELECTED_TEXT" }
  | { type: "SELECTED_TEXT"; text: string }
  | { type: "ANALYZE_VISIBLE_PAGE" }
  | { type: "VISIBLE_PAGE_TEXT"; text: string; limited?: boolean; reason?: string }
  | { type: "SOLVE_QUESTION"; payload: SolveRequest }
  | { type: "SOLVE_RESULT"; payload: SolveResponse }
  | { type: "SOLVE_ERROR"; error: string }
  | { type: "SET_PENDING_QUESTION"; text: string; source: CaptureMethod; imageDataUrl?: string }
  | { type: "GET_PENDING_QUESTION" }
  | { type: "PENDING_QUESTION"; text?: string; source?: CaptureMethod; imageDataUrl?: string }
  | { type: "PING" }
  | { type: "PONG" }
  | { type: "CAPTURE_TAB_SCREENSHOT" };
