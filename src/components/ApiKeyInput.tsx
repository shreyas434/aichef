
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Key, Settings } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ApiKeyConfig } from '@/hooks/useApiKey';
import { AIModelProvider } from '@/types/AIProvider';
import { getProviderOptions, getModelsForProvider } from '@/services/aiProviderService';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKeyConfig: Partial<ApiKeyConfig>) => void;
  hasApiKey: boolean;
  apiKeyConfig: ApiKeyConfig;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySubmit, hasApiKey, apiKeyConfig }) => {
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState<AIModelProvider>(apiKeyConfig.provider || 'openai');
  const [model, setModel] = useState(apiKeyConfig.model || '');
  const [customEndpoint, setCustomEndpoint] = useState(apiKeyConfig.customEndpoint || '');
  const [isVisible, setIsVisible] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const providers = getProviderOptions();
  const models = getModelsForProvider(provider);

  useEffect(() => {
    // Reset model when provider changes to avoid invalid model selection
    if (provider !== 'custom' && models.length > 0) {
      const defaultModel = models[0].value;
      setModel(defaultModel);
    }
  }, [provider]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const config: Partial<ApiKeyConfig> = {
      provider,
      apiKey: apiKey.trim(),
      model: model || undefined
    };
    
    if (provider === 'custom' && customEndpoint) {
      config.customEndpoint = customEndpoint;
    }
    
    if (config.apiKey) {
      onApiKeySubmit(config);
      setApiKey('');
    }
  };

  if (hasApiKey) {
    return (
      <div className="flex items-center justify-center p-4 glass-card rounded-lg mb-6 animate-float">
        <Key className="w-5 h-5 text-cyber-green mr-2" />
        <span className="text-cyber-green">{`${apiKeyConfig.provider.charAt(0).toUpperCase() + apiKeyConfig.provider.slice(1)} API Connected`}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onApiKeySubmit({ apiKey: '' })}
          className="ml-2 text-cyber-pink hover:text-cyber-pink hover:bg-muted"
        >
          Reset
        </Button>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-lg p-6 mb-8 animate-float">
      <h2 className="text-xl font-semibold mb-4 text-center neon-text">Connect Your AI API Key</h2>
      <p className="text-muted-foreground mb-4 text-center">
        To generate recipes, you'll need to provide an API key. Your key is stored locally and never sent to our servers.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="provider">AI Provider</Label>
          <Select 
            value={provider} 
            onValueChange={(value) => setProvider(value as AIModelProvider)}
          >
            <SelectTrigger className="bg-muted/50 border-neon-purple focus:border-neon-blue transition-all">
              <SelectValue placeholder="Select AI provider" />
            </SelectTrigger>
            <SelectContent>
              {providers.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="relative">
          <Label htmlFor="apiKey">API Key</Label>
          <Input
            id="apiKey"
            type={isVisible ? "text" : "password"}
            placeholder={`Enter your ${provider} API key`}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="bg-muted/50 border-neon-purple focus:border-neon-blue transition-all"
          />
          <button 
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {isVisible ? "Hide" : "Show"}
          </button>
        </div>
        
        <div className="flex justify-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-neon-blue flex items-center"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <Settings className="w-4 h-4 mr-1" />
            {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
          </Button>
        </div>
        
        {showAdvanced && (
          <>
            {provider !== 'custom' && models.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Select 
                  value={model} 
                  onValueChange={setModel}
                >
                  <SelectTrigger className="bg-muted/50 border-neon-purple focus:border-neon-blue transition-all">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {provider === 'custom' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="customEndpoint">Custom API Endpoint</Label>
                  <Input
                    id="customEndpoint"
                    type="text"
                    placeholder="Enter custom API endpoint URL"
                    value={customEndpoint}
                    onChange={(e) => setCustomEndpoint(e.target.value)}
                    className="bg-muted/50 border-neon-purple focus:border-neon-blue transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customModel">Custom Model Name (Optional)</Label>
                  <Input
                    id="customModel"
                    type="text"
                    placeholder="Enter custom model identifier"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="bg-muted/50 border-neon-purple focus:border-neon-blue transition-all"
                  />
                </div>
              </>
            )}
          </>
        )}
        
        <Button 
          type="submit" 
          className="w-full bg-neon-gradient hover:opacity-90 transition-opacity"
          disabled={!apiKey.trim() || (provider === 'custom' && !customEndpoint)}
        >
          <Key className="mr-2 h-4 w-4" />
          Connect API Key
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          Need an API key? Visit the selected provider's website to get one.
        </p>
      </form>
    </div>
  );
};

export default ApiKeyInput;
