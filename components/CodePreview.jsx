import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Copy, Check, Code, Eye } from 'lucide-react';
import LiveHTMLPreview from './LiveHTMLPreview';

export default function CodePreview({ template, onClose, onCopy, copied }) {
    const [activeTab, setActiveTab] = useState('preview');
    const code = template.code || template.css;
    const language = template.type === 'javascript' ? 'JavaScript' : 
                     template.type === 'html' ? 'HTML' : 'CSS';
    const fileExtension = template.type === 'javascript' ? '.js' : 
                          template.type === 'html' ? '.html' : '.css';
    
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-700">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white font-semibold text-lg">{template.name}</h3>
                            <Badge variant="outline" className="border-violet-500 text-violet-300 text-xs">
                                {language}
                            </Badge>
                        </div>
                        <p className="text-slate-400 text-sm">{template.description}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-white hover:bg-slate-800 active:scale-95 transition-transform cursor-pointer"
                        onClick={onClose}
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Content with Tabs */}
                <div className="p-4">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="w-full bg-slate-800/50 border border-slate-700/50 mb-4">
                            <TabsTrigger value="preview" className="flex-1 data-[state=active]:bg-violet-600">
                                <Eye className="w-4 h-4 mr-2" />
                                Live Preview
                            </TabsTrigger>
                            <TabsTrigger value="code" className="flex-1 data-[state=active]:bg-violet-600">
                                <Code className="w-4 h-4 mr-2" />
                                Source Code
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="preview" className="mt-0 max-h-[50vh] overflow-auto">
                            <LiveHTMLPreview 
                                html={template.type === 'html' ? code : ''}
                                css={template.type === 'css' ? code : ''}
                                javascript={template.type === 'javascript' ? code : ''}
                                type={template.type}
                            />
                        </TabsContent>

                        <TabsContent value="code" className="mt-0 max-h-[50vh] overflow-auto">
                            <pre className="bg-slate-950 rounded-xl p-4 overflow-x-auto">
                                <code className="text-sm text-slate-300 font-mono whitespace-pre">
                                    {code}
                                </code>
                            </pre>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-4 border-t border-slate-700 bg-slate-800/50">
                    <p className="text-slate-400 text-sm">
                        {template.type === 'javascript' 
                            ? 'Add this JavaScript to your theme.liquid or a custom .js file'
                            : template.type === 'html'
                            ? 'Add this HTML to your Shopify theme sections or pages'
                            : 'Paste this CSS in your Shopify theme\'s stylesheet'}
                    </p>
                    <Button
                        className={`${copied ? 'bg-green-600 hover:bg-green-700' : 'bg-violet-600 hover:bg-violet-700'} active:scale-95 transition-transform cursor-pointer`}
                        onClick={onCopy}
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4 mr-2" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4 mr-2" />
                                Copy {language}
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}