
import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';
import { generateContent, hasGeminiApiKey, setGeminiApiKey, listGeminiModels, GeminiResponse } from '@/lib/gemini';
import { Sparkles, Send, Bot, ArrowDown, Key } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GeminiAssistant = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [showApiInput, setShowApiInput] = useState(!hasGeminiApiKey());
  const [models, setModels] = useState<string[]>(['gemini-pro']);
  const [selectedModel, setSelectedModel] = useState('gemini-pro');
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: 'API Key Required',
        description: 'Please enter your Google Gemini API key',
        variant: 'destructive',
      });
      return;
    }

    const success = setGeminiApiKey(apiKey);
    if (success) {
      setShowApiInput(false);
      toast({
        title: 'API Key Saved',
        description: 'Your Google Gemini API key has been saved',
      });
      listGeminiModels().then(setModels);
    }
  };

  const handleSendPrompt = async () => {
    if (!prompt.trim()) return;

    if (!hasGeminiApiKey()) {
      setShowApiInput(true);
      toast({
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
      const response: GeminiResponse = await generateContent(prompt, selectedModel);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.text,
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      let errorMessage = 'Failed to generate response';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
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
            {!showApiInput && (
              <button
                onClick={() => setShowApiInput(true)}
                className="ml-auto flex items-center text-sm bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded-full"
              >
                <Key className="w-3 h-3 mr-1" /> API Key
              </button>
            )}
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
              <h2 className="font-medium">Select Model</h2>
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
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                  <Sparkles className="h-12 w-12 mb-4 text-primary/30" />
                  <h3 className="text-lg font-medium mb-2">Gemini Assistant</h3>
                  <p className="max-w-md">
                    Ask any question and get AI-powered answers using Google's Gemini model.
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
                      className={`max-w-[80%] rounded-xl p-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
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
