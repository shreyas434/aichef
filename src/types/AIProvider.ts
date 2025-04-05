
export type AIModelProvider = 'openai' | 'anthropic' | 'google' | 'custom';

export interface AIProviderConfig {
  name: string;
  requiresApiKey: boolean;
  defaultModel: string;
  models?: string[];
  apiEndpoint?: string;
}

export interface GenerateRecipesParams {
  foodPrompt: string;
  additionalRequirements?: string;
  healthCondition?: string;
  modelProvider: AIModelProvider;
  model?: string;
  customEndpoint?: string;
}
