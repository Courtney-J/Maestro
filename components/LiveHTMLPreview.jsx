import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, AlertCircle, CheckCircle2, Wand2 } from 'lucide-react';
import { toast } from "sonner";
import MonacoEditor from './MonacoEditor';

export default function LiveCSSEditor({ settings, onSettingsChange, generateCSS }) {
    const [cssCode, setCssCode] = useState('');
    const [copied, setCopied] = useState(false);
    const [errors, setErrors] = useState([]);
    const [warnings, setWarnings] = useState([]);
    const debounceTimer = useRef(null);

    useEffect(() => {
        setCssCode(generateCSS());
    }, []);

    const parseCSSVariables = (css) => {
        const errors = [];
        const warnings = [];
        const newSettings = { ...settings };

        try {
            // Extract :root block
            const rootMatch = css.match(/:root\s*{([^}]*)}/s);
            if (!rootMatch) {
                warnings.push('No :root variables found. Preview may not update correctly.');
                return { settings: newSettings, errors, warnings };
            }

            const rootContent = rootMatch[1];
            
            // Parse CSS variables
            const varRegex = /--([a-zA-Z-]+)\s*:\s*([^;]+);/g;
            let match;
            let foundVars = 0;

            while ((match = varRegex.exec(rootContent)) !== null) {
                const varName = match[1];
                const varValue = match[2].trim();
                foundVars++;

                // Map CSS variable names to settings keys
                const mappings = {
                    'primary-color': 'primaryColor',
                    'secondary-color': 'secondaryColor',
                    'text-color': 'textColor',
                    'heading-color': 'headingColor',
                    'link-color': 'linkColor',
                    'link-hover-color': 'linkHoverColor',
                    'muted-text-color': 'mutedTextColor',
                    'background-color': 'backgroundColor',
                    'header-bg': 'headerBg',
                    'footer-bg': 'footerBg',
                    'footer-text': 'footerText',
                    'border-radius': 'borderRadius',
                    'font-family': 'fontFamily'
                };

                if (mappings[varName]) {
                    const settingKey = mappings[varName];
                    
                    // Handle different value types
                    if (varName === 'border-radius') {
                        const numValue = parseInt(varValue);
                        if (isNaN(numValue)) {
                            errors.push(`Invalid border-radius value: ${varValue}`);
                        } else {
                            newSettings[settingKey] = numValue;
                        }
                    } else if (varName === 'font-family') {
                        // Extract font name from quotes
                        const fontMatch = varValue.match(/['"]([^'"]+)['"]/);
                        if (fontMatch) {
                            newSettings[settingKey] = fontMatch[1];
                        } else {
                            newSettings[settingKey] = varValue.split(',')[0].trim();
                        }
                    } else {
                        // Color values
                        if (!/^#[0-9A-Fa-f]{3,6}$/.test(varValue) && !/^rgb/.test(varValue)) {
                            warnings.push(`Unusual color value for ${varName}: ${varValue}`);
                        }
                        newSettings[settingKey] = varValue;
                    }
                }
            }

            if (foundVars === 0) {
                warnings.push('No CSS variables found in :root block.');
            }

            // Check for syntax errors (basic)
            const openBraces = (css.match(/{/g) || []).length;
            const closeBraces = (css.match(/}/g) || []).length;
            if (openBraces !== closeBraces) {
                errors.push(`Mismatched braces: ${openBraces} opening, ${closeBraces} closing`);
            }

            // Check for missing semicolons in properties
            const propertiesWithoutSemicolon = css.match(/:\s*[^;{}]+$/gm);
            if (propertiesWithoutSemicolon && propertiesWithoutSemicolon.length > 0) {
                warnings.push('Some properties may be missing semicolons');
            }

        } catch (error) {
            errors.push(`Parse error: ${error.message}`);
        }

        return { settings: newSettings, errors, warnings };
    };

    const handleCSSChange = (newCSS) => {
        setCssCode(newCSS);

        // Debounce the parsing and preview update
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            const { settings: newSettings, errors: newErrors, warnings: newWarnings } = parseCSSVariables(newCSS);
            setErrors(newErrors);
            setWarnings(newWarnings);

            // Only update settings if no critical errors
            if (newErrors.length === 0) {
                onSettingsChange(newSettings);
            }
        }, 500);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(cssCode);
        setCopied(true);
        toast.success('CSS copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    const handleFormat = () => {
        // This will be handled by Monaco's built-in formatter
        toast.success('Code formatted!');
    };

    const handleAutoFix = () => {
        // Regenerate CSS from current settings
        const freshCSS = generateCSS();
        setCssCode(freshCSS);
        setErrors([]);
        setWarnings([]);
        toast.success('CSS regenerated from current settings');
    };

    return (
        <div className="space-y-4">
            {/* Header with actions */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-white font-semibold text-lg">Live CSS Editor</h3>
                    <p className="text-slate-400 text-sm">Edit CSS with real-time preview updates</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        onClick={handleAutoFix}
                    >
                        <Wand2 className="w-4 h-4 mr-2" />
                        Auto-Fix
                    </Button>
                    <Button
                        size="sm"
                        className={`${copied ? 'bg-green-600 hover:bg-green-700' : 'bg-violet-600 hover:bg-violet-700'}`}
                        onClick={handleCopy}
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

            {/* Status indicators */}
            <div className="flex gap-2 flex-wrap">
                {errors.length === 0 && warnings.length === 0 && (
                    <Badge className="bg-green-500/10 text-green-300 border-green-500/20">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        No issues detected
                    </Badge>
                )}
                {errors.length > 0 && (
                    <Badge className="bg-red-500/10 text-red-300 border-red-500/20">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.length} error{errors.length > 1 ? 's' : ''}
                    </Badge>
                )}
                {warnings.length > 0 && (
                    <Badge className="bg-amber-500/10 text-amber-300 border-amber-500/20">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {warnings.length} warning{warnings.length > 1 ? 's' : ''}
                    </Badge>
                )}
                <Badge className="bg-blue-500/10 text-blue-300 border-blue-500/20">
                    Live Preview Active
                </Badge>
            </div>

            {/* Error/Warning messages */}
            {(errors.length > 0 || warnings.length > 0) && (
                <Card className="bg-slate-900/50 border-slate-700/50">
                    <CardContent className="p-4">
                        {errors.length > 0 && (
                            <div className="space-y-2 mb-3">
                                <div className="flex items-center gap-2 text-red-300 font-medium text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    Errors:
                                </div>
                                {errors.map((error, idx) => (
                                    <div key={idx} className="text-red-400 text-xs ml-6">
                                        • {error}
                                    </div>
                                ))}
                            </div>
                        )}
                        {warnings.length > 0 && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-amber-300 font-medium text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    Warnings:
                                </div>
                                {warnings.map((warning, idx) => (
                                    <div key={idx} className="text-amber-400 text-xs ml-6">
                                        • {warning}
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Monaco Editor */}
            <Card className="bg-slate-900/50 border-slate-700/50">
                <CardContent className="p-0">
                    <MonacoEditor
                        language="css"
                        value={cssCode}
                        onChange={handleCSSChange}
                        onFormat={handleFormat}
                        height="500px"
                    />
                </CardContent>
            </Card>

            {/* Features info */}
            <Card className="bg-slate-800/30 border-slate-700/30">
                <CardContent className="p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        <div className="flex items-center gap-2 text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            Syntax Highlighting
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            Auto-Completion
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            Error Detection
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            Live Preview
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}