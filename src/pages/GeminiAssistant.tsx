
import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';
import { generateContent, hasGeminiApiKey, setGeminiApiKey, listGeminiModels, GeminiResponse } from '@/lib/gemini';
import { Sparkles, Send, Bot, Key, Trash2, Copy, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GeminiAssistant = () => {
  const { toast: hookToast } = useToast();
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [showApiInput, setShowApiInput] = useState(!hasGeminiApiKey());
  const [models, setModels] = useState<string[]>(['gemini-pro']);
  const [selectedModel, setSelectedModel] = useState('gemini-pro');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const promptInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const availableModels = await listGeminiModels();
        setModels(availableModels);
      } catch (error) {
        console.error('Failed to fetch models', error);
      }
    };

    if (hasGeminiApiKey()) {
      fetchModels();
    }
  }, [showApiInput]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      hookToast({
        title: 'API Key Required',
        description: 'Please enter your Google Gemini API key',
        variant: 'destructive',
      });
      return;
    }

    const success = setGeminiApiKey(apiKey);
    if (success) {
      setShowApiInput(false);
      hookToast({
        title: 'API Key Saved',
        description: 'Your Google Gemini API key has been saved',
      });
      listGeminiModels().then(setModels);
    }
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast('Copied to clipboard', {
      position: 'bottom-right',
    });
  };

  const handleClearChat = () => {
    if (messages.length > 0) {
      setMessages([]);
      toast('Chat history cleared', {
        position: 'bottom-right',
      });
    }
  };

  const formatMessage = (content: string) => {
    // Basic markdown-like formatting
    const formattedText = content
      // Code blocks
      .replace(/```(.+?)```/gs, '<pre><code>$1</code></pre>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Lists
      .replace(/^- (.*)/gm, '• $1')
      // Line breaks
      .replace(/\n/g, '<br />');

    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  const handleSendPrompt = async () => {
    if (!prompt.trim()) return;

    if (!hasGeminiApiKey()) {
      setShowApiInput(true);
      hookToast({
        title: 'API Key Required',
        description: 'Please set your Google Gemini API key first',
        variant: 'destructive',
      });
      return;
    }

    const userMessage: Message = { role: 'user', content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt('');
    setLoading(true);

    try {
      // Create context from previous messages for conversation memory
      const historyContext = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response: GeminiResponse = await generateContent(prompt, selectedModel, historyContext);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.text,
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      
      // Focus back on input after response
      setTimeout(() => {
        promptInputRef.current?.focus();
      }, 100);
    } catch (error) {
      let errorMessage = 'Failed to generate response';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      hookToast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Bot className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold">Gemini Assistant</h1>
            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={handleClearChat}
                disabled={messages.length === 0}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear Chat</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setShowApiInput(!showApiInput)}
              >
                <Key className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">API Key</span>
              </Button>
            </div>
          </div>

          {showApiInput && (
            <GlassCard className="mb-6">
              <div className="flex flex-col space-y-4">
                <h2 className="text-lg font-semibold">Google Gemini API Key</h2>
                <p className="text-sm text-muted-foreground">
                  Enter your Google Gemini API key to use the assistant. You can get one from the{' '}
                  <a
                    href="https://ai.google.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google AI Studio
                  </a>
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key"
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={handleSaveApiKey}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </div>
            </GlassCard>
          )}

          <GlassCard className="mb-6 p-0 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <h2 className="font-medium">Model:</h2>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="bg-transparent border border-gray-300 rounded-md px-2 py-1 text-sm"
                >
                  {models.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      This assistant maintains conversation context for more coherent responses.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                  <Sparkles className="h-12 w-12 mb-4 text-primary/30" />
                  <h3 className="text-lg font-medium mb-2">Gemini Assistant</h3>
                  <p className="max-w-md">
                    Ask any question and get AI-powered answers using Google's Gemini model.
                    The assistant remembers your conversation for context-aware responses.
                  </p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`group relative max-w-[80%] rounded-xl p-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">
                        {message.role === 'assistant' 
                          ? formatMessage(message.content) 
                          : message.content}
                      </div>
                      {message.role === 'assistant' && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleCopyText(message.content)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-xl p-3 bg-muted">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendPrompt();
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  ref={promptInputRef}
                />
                <button
                  type="submit"
                  disabled={loading || !prompt.trim()}
                  className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none text-white p-2 rounded-lg"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </GlassCard>

          <GlassCard className="text-sm">
            <h3 className="font-medium mb-2">About Google Gemini</h3>
            <p className="text-muted-foreground">
              Google Gemini is a family of multimodal large language models developed by Google DeepMind.
              This integration allows you to interact with Gemini models directly within this application.
              Your API key is stored locally in your browser and never sent to our servers.
            </p>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GeminiAssistant;
