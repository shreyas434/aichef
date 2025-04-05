
import { AIModelProvider, AIProviderConfig } from "@/types/AIProvider";

// Configuration for supported AI providers
export const aiProviders: Record<AIModelProvider, AIProviderConfig> = {
  openai: {
    name: "OpenAI",
    requiresApiKey: true,
    defaultModel: "gpt-4o",
    models: ["gpt-4o", "gpt-4o-mini", "gpt-3.5-turbo"],
  },
  anthropic: {
    name: "Anthropic",
    requiresApiKey: true,
    defaultModel: "claude-3-opus",
    models: ["claude-3-opus", "claude-3-sonnet", "claude-3-haiku"],
  },
  google: {
    name: "Google AI",
    requiresApiKey: true,
    defaultModel: "gemini-1.5-pro",
    models: ["gemini-1.5-pro", "gemini-1.5-flash"],
  },
  custom: {
    name: "Custom API",
    requiresApiKey: true,
    defaultModel: "custom",
  },
};

// Get the available AI provider options for UI display
export const getProviderOptions = () => {
  return Object.entries(aiProviders).map(([key, config]) => ({
    value: key as AIModelProvider,
    label: config.name,
  }));
};

// Get models for a specific provider
export const getModelsForProvider = (provider: AIModelProvider) => {
  const config = aiProviders[provider];
  return config.models?.map(model => ({
    value: model,
    label: model,
  })) || [];
};
