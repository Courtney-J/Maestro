import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Download, Code2 } from 'lucide-react';
import { toast } from "sonner";
import MonacoEditor from './MonacoEditor';

export default function AdvancedCSSEditor({ settings, generateCSS }) {
    const [copied, setCopied] = useState(false);
    const [cssCode, setCssCode] = useState(generateCSS());

    // Update CSS when settings change
    React.useEffect(() => {
        setCssCode(generateCSS());
    }, [settings, generateCSS]);

    const copyCSS = () => {
        navigator.clipboard.writeText(cssCode);
        setCopied(true);
        toast.success('CSS copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadCSS = () => {
        const blob = new Blob([cssCode], { type: 'text/css' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'custom-theme.css';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('CSS file downloaded!');
    };

    return (
        <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-4 md:p-6 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                        <Code2 className="w-5 h-5 text-violet-400" />
                        <h3 className="text-white font-semibold text-lg">Advanced CSS Editor</h3>
                        <Badge variant="outline" className="border-violet-500 text-violet-300 text-xs">
                            Pro Mode
                        </Badge>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 active:scale-95 transition-transform cursor-pointer"
                            onClick={downloadCSS}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                        </Button>
                        <Button
                            className={`${copied ? 'bg-green-600 hover:bg-green-700' : 'bg-violet-600 hover:bg-violet-700'} active:scale-95 transition-transform cursor-pointer`}
                            onClick={copyCSS}
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4 mr-2" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy CSS
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                <MonacoEditor
                    value={cssCode}
                    onChange={setCssCode}
                    language="css"
                    height="600px"
                />

                <div className="bg-slate-700/50 rounded-lg p-3 md:p-4 text-sm">
                    <p className="text-slate-300 font-medium mb-2">💡 Advanced Features:</p>
                    <ul className="text-slate-400 text-xs md:text-sm space-y-1 list-disc list-inside">
                        <li><strong>Syntax Highlighting:</strong> Color-coded CSS for better readability</li>
                        <li><strong>Auto-completion:</strong> Smart suggestions as you type</li>
                        <li><strong>Error Detection:</strong> Real-time validation and warnings</li>
                        <li><strong>Code Formatting:</strong> Click "Format" to beautify your code</li>
                        <li><strong>Live Editing:</strong> Make changes and see them reflected instantly</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}