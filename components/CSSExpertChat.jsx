import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, Sparkles, Copy, Check, Bot, User, Trash2 } from 'lucide-react';
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown';

export default function CSSExpertChat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversation, setConversation] = useState(null);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        initConversation();
    }, []);

    useEffect(() => {
        if (conversation?.id) {
            const unsubscribe = base44.agents.subscribeToConversation(conversation.id, (data) => {
                setMessages(data.messages || []);
            });
            return () => unsubscribe();
        }
    }, [conversation?.id]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const initConversation = async () => {
        try {
            const newConversation = await base44.agents.createConversation({
                agent_name: "css_expert",
                metadata: { name: "CSS Help Session" }
            });
            setConversation(newConversation);
        } catch (error) {
            console.error('Failed to create conversation:', error);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || !conversation || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setIsLoading(true);

        try {
            await base44.agents.addMessage(conversation, {
                role: 'user',
                content: userMessage
            });
        } catch (error) {
            toast.error('Failed to send message');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const copyCode = (code, index) => {
        navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        toast.success('Code copied!');
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const clearChat = async () => {
        await initConversation();
        setMessages([]);
        toast.success('Chat cleared');
    };

    const suggestedQuestions = [
        "How do I change button colors in Shopify?",
        "My CSS changes aren't showing, help!",
        "Suggest a modern color palette for my store",
        "How to make product cards look better?"
    ];

    return (
        <Card className="bg-slate-800/50 border-slate-700/50 h-[450px] md:h-[600px] flex flex-col">
            <CardContent className="p-0 flex flex-col h-full">
                {/* Header */}
                <div className="p-3 md:p-4 border-b border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="p-1.5 md:p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
                            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-sm md:text-base">CSS Expert</h3>
                            <p className="text-slate-400 text-xs hidden sm:block">Ask me anything about CSS & Shopify</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-white active:scale-95 transition-transform cursor-pointer"
                        onClick={clearChat}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                    {messages.length === 0 ? (
                        <div className="space-y-4">
                            <div className="text-center py-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 mb-4">
                                    <Bot className="w-8 h-8 text-violet-400" />
                                </div>
                                <h4 className="text-white font-medium mb-2">Hi! I'm your CSS Expert</h4>
                                <p className="text-slate-400 text-sm max-w-sm mx-auto">
                                    I can help you write CSS, fix styling issues, and make your Shopify store look amazing.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-slate-500 text-xs text-center">Try asking:</p>
                                <div className="grid grid-cols-1 gap-2">
                                    {suggestedQuestions.map((q, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setInput(q)}
                                            className="text-left px-3 py-2 rounded-lg bg-slate-700/50 text-slate-300 text-sm hover:bg-slate-700 active:scale-[0.98] transition-all cursor-pointer"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.role !== 'user' && (
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                            <Bot className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                                            msg.role === 'user'
                                                ? 'bg-violet-600 text-white'
                                                : 'bg-slate-700 text-slate-100'
                                        }`}
                                    >
                                        {msg.role === 'user' ? (
                                            <p className="text-sm">{msg.content}</p>
                                        ) : (
                                            <ReactMarkdown
                                                className="text-sm prose prose-invert prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                                                components={{
                                                    code: ({ inline, className, children }) => {
                                                        const code = String(children).replace(/\n$/, '');
                                                        if (!inline) {
                                                            return (
                                                                <div className="relative group my-2">
                                                                    <pre className="bg-slate-900 rounded-lg p-3 overflow-x-auto">
                                                                        <code className="text-xs text-slate-300">{code}</code>
                                                                    </pre>
                                                                    <Button
                                                                        size="icon"
                                                                        variant="ghost"
                                                                        className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 bg-slate-800 hover:bg-slate-700"
                                                                        onClick={() => copyCode(code, index)}
                                                                    >
                                                                        {copiedIndex === index ? (
                                                                            <Check className="h-3 w-3 text-green-400" />
                                                                        ) : (
                                                                            <Copy className="h-3 w-3 text-slate-400" />
                                                                        )}
                                                                    </Button>
                                                                </div>
                                                            );
                                                        }
                                                        return (
                                                            <code className="px-1 py-0.5 rounded bg-slate-800 text-violet-300 text-xs">
                                                                {children}
                                                            </code>
                                                        );
                                                    },
                                                    p: ({ children }) => <p className="my-1.5">{children}</p>,
                                                    ul: ({ children }) => <ul className="my-1.5 ml-4 list-disc">{children}</ul>,
                                                    ol: ({ children }) => <ol className="my-1.5 ml-4 list-decimal">{children}</ol>,
                                                    li: ({ children }) => <li className="my-0.5">{children}</li>,
                                                }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        )}
                                    </div>
                                    {msg.role === 'user' && (
                                        <div className="w-8 h-8 rounded-lg bg-slate-600 flex items-center justify-center flex-shrink-0">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="bg-slate-700 rounded-2xl px-4 py-3">
                                        <Loader2 className="w-4 h-4 animate-spin text-violet-400" />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </ScrollArea>

                {/* Input */}
                <div className="p-3 md:p-4 border-t border-slate-700">
                    <div className="flex gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask about CSS, colors, styling..."
                            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                            disabled={isLoading}
                        />
                        <Button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className="bg-violet-600 hover:bg-violet-700 active:scale-95 transition-transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}