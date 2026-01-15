import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from "@/components/ui/button";
import { Wand2, Copy, Check } from 'lucide-react';
import { toast } from "sonner";

let cssCompletionRegistered = false;
let htmlCompletionRegistered = false;

export default function MonacoEditor({ 
    value, 
    onChange, 
    language = 'css',
    height = '400px',
    onCopy,
    copied = false
}) {
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        
        if (language === 'css') {
            monaco.languages.css.cssDefaults.setOptions({
                validate: true,
                lint: {
                    compatibleVendorPrefixes: 'warning',
                    vendorPrefix: 'warning',
                    duplicateProperties: 'warning',
                    emptyRules: 'warning',
                    importStatement: 'warning',
                    zeroUnits: 'warning',
                    fontFaceProperties: 'warning',
                    hexColorLength: 'warning',
                    argumentsInColorFunction: 'warning',
                    unknownProperties: 'warning',
                    ieHack: 'warning',
                    unknownVendorSpecificProperties: 'warning',
                    propertyIgnoredDueToDisplay: 'warning',
                    important: 'warning',
                    float: 'warning',
                    idSelector: 'warning'
                }
            });

            if (!cssCompletionRegistered) {
                monaco.languages.registerCompletionItemProvider('css', {
                    provideCompletionItems: () => {
                        const suggestions = [
                            {
                                label: '.btn-primary',
                                kind: monaco.languages.CompletionItemKind.Snippet,
                                insertText: '.btn-primary {\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  color: #ffffff;\n  padding: 12px 24px;\n  border-radius: 999px;\n}\n',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                documentation: 'Rounded primary CTA button'
                            },
                            {
                                label: '.announcement-bar',
                                kind: monaco.languages.CompletionItemKind.Snippet,
                                insertText: '.announcement-bar {\n  background: linear-gradient(90deg, #6366f1, #8b5cf6);\n  color: #ffffff;\n  padding: 10px 20px;\n  text-align: center;\n}\n',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                documentation: 'Top-of-site promo bar'
                            },
                            {
                                label: '.product-card',
                                kind: monaco.languages.CompletionItemKind.Snippet,
                                insertText: '.product-card {\n  background: #020617;\n  border-radius: 16px;\n  padding: 16px;\n  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.6);\n}\n',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                documentation: 'Elevated product card container'
                            }
                        ];
                        return { suggestions };
                    }
                });
                cssCompletionRegistered = true;
            }
        }

        if (language === 'html') {
            monaco.languages.html.htmlDefaults.setOptions({
                validate: true,
                format: {
                    tabSize: 2,
                    insertSpaces: true,
                    wrapLineLength: 120,
                    unformatted: 'wbr',
                    contentUnformatted: 'pre,code,textarea',
                    indentInnerHtml: false,
                    preserveNewLines: true,
                    maxPreserveNewLines: null,
                    indentHandlebars: false,
                    endWithNewline: false,
                    extraLiners: 'head, body, /html',
                    wrapAttributes: 'auto'
                }
            });

            if (!htmlCompletionRegistered) {
                monaco.languages.registerCompletionItemProvider('html', {
                    provideCompletionItems: () => {
                        const suggestions = [
                            {
                                label: 'hero-section',
                                kind: monaco.languages.CompletionItemKind.Snippet,
                                insertText: '<section class="hero-section">\n  <div class="hero-content">\n    <h1 class="hero-title">Summer Collection 2024</h1>\n    <p class="hero-subtitle">Discover the latest trends in fashion</p>\n    <button class="hero-btn">Shop Now</button>\n  </div>\n</section>',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                documentation: 'Hero section layout'
                            },
                            {
                                label: 'product-card',
                                kind: monaco.languages.CompletionItemKind.Snippet,
                                insertText: '<div class="product-card">\n  <div class="product-image">\n    <img src="" alt="Product" />\n  </div>\n  <div class="product-info">\n    <h3 class="product-title">Product name</h3>\n    <p class="product-vendor">Vendor</p>\n    <div class="product-price">\n      <span class="price-current">$99</span>\n      <span class="price-compare">$129</span>\n    </div>\n    <button class="btn-primary">Add to Cart</button>\n  </div>\n</div>',
                                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                                documentation: 'Product card markup'
                            }
                        ];
                        return { suggestions };
                    }
                });
                htmlCompletionRegistered = true;
            }
        }
    };

    const formatCode = () => {
        if (editorRef.current) {
            editorRef.current.getAction('editor.action.formatDocument').run();
            toast.success('Code formatted!');
        }
    };

    return (
        <div className="relative">
            <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300 text-sm font-medium">
                    {language.toUpperCase()} Editor
                </span>
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-slate-400 hover:text-white cursor-pointer h-7 px-2"
                        onClick={formatCode}
                    >
                        <Wand2 className="w-3 h-3 mr-1" />
                        Format
                    </Button>
                    {onCopy && (
                        <Button
                            size="sm"
                            variant="ghost"
                            className={`${copied ? 'text-green-400' : 'text-slate-400'} hover:text-white cursor-pointer h-7 px-2`}
                            onClick={onCopy}
                        >
                            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </Button>
                    )}
                </div>
            </div>
            <div className="border border-slate-700 rounded-lg overflow-hidden">
                <Editor
                    height={height}
                    language={language}
                    value={value}
                    onChange={onChange}
                    theme="vs-dark"
                    onMount={handleEditorDidMount}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 13,
                        lineNumbers: 'on',
                        roundedSelection: true,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 2,
                        wordWrap: 'on',
                        folding: true,
                        lineDecorationsWidth: 10,
                        lineNumbersMinChars: 3,
                        glyphMargin: false,
                        scrollbar: {
                            vertical: 'auto',
                            horizontal: 'auto',
                            useShadows: false,
                            verticalScrollbarSize: 10,
                            horizontalScrollbarSize: 10
                        },
                        suggestOnTriggerCharacters: true,
                        acceptSuggestionOnEnter: 'on',
                        quickSuggestions: {
                            other: true,
                            comments: false,
                            strings: true
                        },
                        parameterHints: {
                            enabled: true
                        },
                        formatOnPaste: true,
                        formatOnType: true
                    }}
                />
            </div>
        </div>
    );
}
