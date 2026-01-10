import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from "@/components/ui/button";
import { Wand2, Copy, Check } from 'lucide-react';
import { toast } from "sonner";

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
        
        // Configure CSS language features
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
        }

        // Configure HTML language features
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