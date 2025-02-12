export interface ZeroxArgs {
  cleanup?: boolean;
  concurrency?: number;
  correctOrientation?: boolean;
  credentials?: ModelCredentials;
  errorMode?: ErrorMode;
  extractPerPage?: string[];
  filePath: string;
  imageDensity?: number;
  imageHeight?: number;
  llmParams?: Partial<LLMParams>;
  maintainFormat?: boolean;
  maxRetries?: number;
  maxTesseractWorkers?: number;
  mode?: OperationMode;
  model?: ModelOptions | string;
  modelProvider?: ModelProvider | string;
  onPostProcess?: (params: {
    page: Page;
    progressSummary: Summary;
  }) => Promise<void>;
  onPreProcess?: (params: {
    imagePath: string;
    pageNumber: number;
  }) => Promise<void>;
  openaiAPIKey?: string;
  outputDir?: string;
  pagesToConvertAsImages?: number | number[];
  schema?: Record<string, unknown>;
  tempDir?: string;
  trimEdges?: boolean;
}

export interface ZeroxOutput {
  completionTime: number;
  fileName: string;
  inputTokens: number;
  outputTokens: number;
  pages: Page[];
  summary: Summary;
}

export interface AzureCredentials {
  apiKey: string;
  endpoint: string;
}

export interface BedrockCredentials {
  accessKeyId?: string;
  region: string;
  secretAccessKey?: string;
  sessionToken?: string;
}

export interface GoogleCredentials {
  apiKey: string;
}

export interface OpenAICredentials {
  apiKey: string;
}

export type ModelCredentials =
  | AzureCredentials
  | BedrockCredentials
  | GoogleCredentials
  | OpenAICredentials;

export enum ModelOptions {
  // Bedrock Claude 3 Models
  BEDROCK_CLAUDE_3_HAIKU_2024_10 = "anthropic.claude-3-5-haiku-20241022-v1:0",
  BEDROCK_CLAUDE_3_SONNET_2024_06 = "anthropic.claude-3-5-sonnet-20240620-v1:0",
  BEDROCK_CLAUDE_3_SONNET_2024_10 = "anthropic.claude-3-5-sonnet-20241022-v2:0",
  BEDROCK_CLAUDE_3_HAIKU_2024_03 = "anthropic.claude-3-haiku-20240307-v1:0",
  BEDROCK_CLAUDE_3_OPUS_2024_02 = "anthropic.claude-3-opus-20240229-v1:0",
  BEDROCK_CLAUDE_3_SONNET_2024_02 = "anthropic.claude-3-sonnet-20240229-v1:0",

  // OpenAI GPT-4 Models
  OPENAI_GPT_4O = "gpt-4o",
  OPENAI_GPT_4O_MINI = "gpt-4o-mini",

  // Google Gemini Models
  GOOGLE_GEMINI_1_5_FLASH = "gemini-1.5-flash",
  GOOGLE_GEMINI_1_5_FLASH_8B = "gemini-1.5-flash-8b",
  GOOGLE_GEMINI_1_5_PRO = "gemini-1.5-pro",
  GOOGLE_GEMINI_2_FLASH = "gemini-2.0-flash-001",
  GOOGLE_GEMINI_2_FLASH_LITE = "gemini-2.0-flash-lite-preview-02-05",
}

export enum ModelProvider {
  AZURE = "AZURE",
  BEDROCK = "BEDROCK",
  GOOGLE = "GOOGLE",
  OPENAI = "OPENAI",
}

export enum OperationMode {
  EXTRACTION = "EXTRACTION",
  OCR = "OCR",
}

export enum PageStatus {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface Page {
  content?: string;
  contentLength?: number;
  error?: string;
  extracted?: Record<string, unknown>;
  inputTokens?: number;
  outputTokens?: number;
  page: number;
  status: PageStatus;
}

export interface CompletionArgs {
  image: Buffer;
  maintainFormat: boolean;
  priorPage: string;
}

export interface CompletionResponse {
  content: string;
  inputTokens: number;
  outputTokens: number;
}

export interface CreateModelArgs {
  credentials: ModelCredentials;
  llmParams: Partial<LLMParams>;
  mode: OperationMode;
  model: ModelOptions | string;
  provider: ModelProvider | string;
}

export enum ErrorMode {
  THROW = "THROW",
  IGNORE = "IGNORE",
}

export interface ExtractionArgs {
  input: string | string[];
  options?: {
    correctOrientation?: boolean;
    scheduler?: Tesseract.Scheduler;
    trimEdges?: boolean;
  };
  schema: Record<string, unknown>;
}

export interface ExtractionResponse {
  extracted: Record<string, unknown>;
  inputTokens: number;
  outputTokens: number;
}

interface BaseLLMParams {
  frequencyPenalty?: number;
  presencePenalty?: number;
  temperature?: number;
  topP?: number;
}

export interface AzureLLMParams extends BaseLLMParams {
  maxTokens: number;
}

export interface BedrockLLMParams extends BaseLLMParams {
  maxTokens: number;
}

export interface GoogleLLMParams extends BaseLLMParams {
  maxOutputTokens: number;
}

export interface OpenAILLMParams extends BaseLLMParams {
  maxTokens: number;
}

// Union type of all provider params
export type LLMParams =
  | AzureLLMParams
  | BedrockLLMParams
  | GoogleLLMParams
  | OpenAILLMParams;

export interface MessageContentArgs {
  input: string | string[];
  options?: {
    correctOrientation?: boolean;
    scheduler?: Tesseract.Scheduler;
    trimEdges?: boolean;
  };
}

export interface ModelInterface {
  getCompletion(
    params: CompletionArgs | ExtractionArgs
  ): Promise<CompletionResponse | ExtractionResponse>;
}

export interface Summary {
  numPages: number;
  numSuccessfulPages: number;
  numFailedPages: number;
}
