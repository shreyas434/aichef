
import { useState, useEffect } from 'react';
import { AIModelProvider } from '@/types/AIProvider';

export interface ApiKeyConfig {
  provider: AIModelProvider;
  apiKey: string;
  model?: string;
  customEndpoint?: string;
}

export const useApiKey = () => {
  const [apiKeyConfig, setApiKeyConfig] = useState<ApiKeyConfig>({
    provider: 'openai',
    apiKey: '',
    model: undefined,
    customEndpoint: undefined
  });
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  useEffect(() => {
    // Load API key config from localStorage on initial load
    const storedConfig = localStorage.getItem('ai_api_config');
    if (storedConfig) {
      try {
        const config = JSON.parse(storedConfig) as ApiKeyConfig;
        setApiKeyConfig(config);
        setHasApiKey(!!config.apiKey);
      } catch (e) {
        console.error('Error parsing stored API config:', e);
      }
    }
  }, []);

  const updateApiKey = (newConfig: Partial<ApiKeyConfig>) => {
    const updatedConfig = { ...apiKeyConfig, ...newConfig };
    
    if (updatedConfig.apiKey) {
      localStorage.setItem('ai_api_config', JSON.stringify(updatedConfig));
      setApiKeyConfig(updatedConfig);
      setHasApiKey(true);
    } else {
      localStorage.removeItem('ai_api_config');
      setApiKeyConfig({
        provider: 'openai',
        apiKey: '',
        model: undefined,
        customEndpoint: undefined
      });
      setHasApiKey(false);
    }
  };

  return { apiKeyConfig, hasApiKey, updateApiKey };
};
