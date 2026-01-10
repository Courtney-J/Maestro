import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
    CheckCircle2, 
    AlertTriangle, 
    Lightbulb, 
    FolderOpen, 
    Code, 
    RefreshCw,
    ExternalLink,
    ChevronRight,
    FileCode,
    Plus,
    BookOpen
} from 'lucide-react';

const steps = [
    {
        number: '01',
        title: 'Access Theme Editor',
        description: 'In your Shopify admin, go to Online Store → Themes → Actions → Edit Code',
        icon: FolderOpen,
        color: 'from-blue-500 to-cyan-500'
    },
    {
        number: '02',
        title: 'Create CSS File',
        description: 'In Assets folder, click "Add a new asset" → "Create a blank file" → Name it custom-theme.css',
        icon: FileCode,
        color: 'from-violet-500 to-purple-500'
    },
    {
        number: '03',
        title: 'Paste CSS at Top',
        description: 'Copy ALL generated CSS and paste at the VERY TOP (line 1) of your empty file, then Save',
        icon: Code,
        color: 'from-green-500 to-emerald-500'
    },
    {
        number: '04',
        title: 'Link CSS File',
        description: 'In Layout/theme.liquid, add the link tag ABOVE </head> tag, Save and refresh your store',
        icon: Plus,
        color: 'from-orange-500 to-amber-500'
    }
];

const troubleshootingTips = [
    {
        problem: 'Changes not showing',
        solutions: [
            'Clear browser cache (Ctrl+Shift+R)',
            'Try incognito/private browsing',
            'Wait 5-10 minutes for Shopify CDN',
            'Add ?v=2 to CSS file reference'
        ]
    },
    {
        problem: 'CSS breaking other styles',
        solutions: [
            'Make selectors more specific',
            'Use !important sparingly',
            'Check for syntax errors (missing brackets)',
            'Wrap in custom class prefix'
        ]
    },
    {
        problem: "Can't find CSS file",
        solutions: [
            'Look for theme.scss.liquid in Assets',
            'Check if theme has Custom CSS setting',
            'Try creating a new custom.css file',
            'Contact theme developer for guidance'
        ]
    }
];

const proTips = [
    'Always backup your theme before making changes',
    'Test on a duplicate theme first',
    'Use browser inspector to find exact CSS selectors',
    'Keep your custom CSS at the end of the file',
    'Comment your code for future reference',
    'Use CSS variables for easy theme-wide changes'
];

export default function GuideSection() {
    return (
        <div className="space-y-12">
            {/* How to Add CSS */}
            <section>
                <div className="text-center mb-8">
                    <Badge className="bg-violet-500/10 text-violet-300 border-violet-500/20 mb-4">
                        Step by Step
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        How to Add CSS to Shopify
                    </h2>
                    <p className="text-slate-400">
                        Follow these simple steps to customize your store
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <Card 
                                key={index}
                                className="bg-slate-800/50 border-slate-700/50 relative overflow-hidden group hover:border-violet-500/30 transition-colors"
                            >
                                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${step.color} opacity-10 rounded-bl-full`} />
                                <CardContent className="p-6 relative">
                                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} mb-4`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-violet-400 font-mono text-sm mb-2">
                                        Step {step.number}
                                    </div>
                                    <h3 className="text-white font-semibold mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm">
                                        {step.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>

            {/* Troubleshooting */}
            <section>
                <div className="text-center mb-8">
                    <Badge className="bg-amber-500/10 text-amber-300 border-amber-500/20 mb-4">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Troubleshooting
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Common Problems & Solutions
                    </h2>
                    <p className="text-slate-400">
                        Quick fixes for the most common issues
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {troubleshootingTips.map((item, index) => (
                        <Card 
                            key={index}
                            className="bg-slate-800/50 border-slate-700/50"
                        >
                            <CardContent className="p-6">
                                <h3 className="text-amber-400 font-semibold mb-4 flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" />
                                    {item.problem}
                                </h3>
                                <ul className="space-y-3">
                                    {item.solutions.map((solution, idx) => (
                                        <li 
                                            key={idx}
                                            className="flex items-start gap-2 text-slate-300 text-sm"
                                        >
                                            <ChevronRight className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                                            {solution}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Pro Tips */}
            <section>
                <div className="text-center mb-8">
                    <Badge className="bg-green-500/10 text-green-300 border-green-500/20 mb-4">
                        <Lightbulb className="w-3 h-3 mr-1" />
                        Pro Tips
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Best Practices
                    </h2>
                    <p className="text-slate-400">
                        Tips from experienced Shopify developers
                    </p>
                </div>

                <Card className="bg-slate-800/50 border-slate-700/50">
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {proTips.map((tip, index) => (
                                <div 
                                    key={index}
                                    className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-700/50"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span className="text-slate-300 text-sm">{tip}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Detailed Beginner Instructions */}
            <section>
                <div className="text-center mb-8">
                    <Badge className="bg-violet-500/10 text-violet-300 border-violet-500/20 mb-4">
                        <BookOpen className="w-3 h-3 mr-1" />
                        Complete Beginner's Guide
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Where & How to Paste Your CSS
                    </h2>
                    <p className="text-slate-400">
                        Step-by-step instructions for absolute beginners
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Step 1 */}
                    <Card className="bg-slate-800/50 border-violet-500/30">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                    1
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-semibold text-lg mb-3">
                                        Creating the CSS File (Fresh Start)
                                    </h3>
                                    <div className="space-y-3 text-slate-300">
                                        <div className="flex items-start gap-2">
                                            <ChevronRight className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                            <p>In your Shopify admin, click <strong className="text-white">"Assets"</strong> folder in the left sidebar</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <ChevronRight className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                            <p>Click <strong className="text-white">"Add a new asset"</strong> button at the top</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <ChevronRight className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                            <p>Select <strong className="text-white">"Create a blank file"</strong></p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <ChevronRight className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                            <p>Type the filename: <code className="bg-slate-900 px-2 py-1 rounded text-violet-300">custom-theme.css</code></p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <ChevronRight className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                            <p>Click <strong className="text-white">"Done"</strong> - You now have a completely empty file ready to use!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Step 2 */}
                    <Card className="bg-slate-800/50 border-violet-500/30">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                    2
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-semibold text-lg mb-3">
                                        Where to Paste: At the Very Top!
                                    </h3>
                                    <div className="space-y-4 text-slate-300">
                                        <div className="flex items-start gap-2">
                                            <ChevronRight className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                            <p><strong className="text-white">Copy ALL the CSS</strong> from the "Generated CSS" box above (it should start with <code className="bg-slate-900 px-1 rounded text-xs">/* Custom Shopify Theme Styles */</code>)</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <ChevronRight className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                            <p>Your <code className="bg-slate-900 px-1 rounded text-xs">custom-theme.css</code> file should be <strong className="text-white">completely empty</strong> (no code, no spaces)</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <ChevronRight className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                            <p>Click at <strong className="text-white">line 1</strong> (the very top) and paste your CSS there</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <ChevronRight className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                            <p>Click <strong className="text-white">"Save"</strong> in the top right corner</p>
                                        </div>
                                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                                            <p className="text-green-300 text-sm mb-2">✅ Correct - Your file should look like this:</p>
                                            <pre className="bg-slate-900 rounded p-3 text-xs text-slate-300 overflow-x-auto">
{`/* Custom Shopify Theme Styles */
/* Generated with CSS Template Generator */

:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  ...
}`}
                                            </pre>
                                        </div>
                                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                                            <p className="text-red-300 text-sm mb-2">❌ Wrong - Don't do this:</p>
                                            <ul className="text-xs text-slate-300 space-y-1 ml-4 list-disc">
                                                <li>Don't add blank lines at the top</li>
                                                <li>Don't paste at the bottom if there's already code</li>
                                                <li>Don't mix with existing CSS - use a fresh file!</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Step 3 */}
                    <Card className="bg-slate-800/50 border-violet-500/30">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                    3
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-semibold text-lg mb-3">
                                        Linking Your CSS File (Final Step!)
                                    </h3>
                                    <div className="space-y-4 text-slate-300">
                                        <div className="flex items-start gap-2">
                                            <ChevronRight className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                            <p>In the left sidebar, click <strong className="text-white">"Layout"</strong> folder</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <ChevronRight className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                            <p>Open the file called <code className="bg-slate-900 px-1 rounded text-xs">theme.liquid</code></p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <ChevronRight className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                            <p>Press <kbd className="bg-slate-900 px-2 py-1 rounded text-xs font-mono">Ctrl+F</kbd> (Windows) or <kbd className="bg-slate-900 px-2 py-1 rounded text-xs font-mono">Cmd+F</kbd> (Mac) to search</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <ChevronRight className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                            <p>Type <code className="bg-slate-900 px-1 rounded text-xs">&lt;/head&gt;</code> in the search box and press Enter</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <ChevronRight className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                            <p>You'll find the closing <code className="bg-slate-900 px-1 rounded text-xs">&lt;/head&gt;</code> tag (usually around line 200-300)</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <ChevronRight className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                            <p>Click at the <strong className="text-white">END of the line ABOVE</strong> the <code className="bg-slate-900 px-1 rounded text-xs">&lt;/head&gt;</code> tag</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <ChevronRight className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                            <p>Press <kbd className="bg-slate-900 px-2 py-1 rounded text-xs font-mono">Enter</kbd> to create a new line</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <ChevronRight className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                            <p>Paste this exact code:</p>
                                        </div>
                                        <div className="bg-slate-900 rounded-lg p-4">
                                            <pre className="text-xs text-violet-300">
{`  {{ 'custom-theme.css' | asset_url | stylesheet_tag }}`}
                                            </pre>
                                        </div>
                                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                                            <p className="text-amber-300 text-sm mb-2">⚠️ Visual example:</p>
                                            <pre className="bg-slate-900 rounded p-3 text-xs text-slate-300 overflow-x-auto">
{`  ... other head content ...
  {{ 'application.css' | asset_url | stylesheet_tag }}
  {{ 'custom-theme.css' | asset_url | stylesheet_tag }}   ← ADD THIS LINE
</head>                                                     ← BEFORE THIS`}
                                            </pre>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <ChevronRight className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                            <p>Click <strong className="text-white">"Save"</strong> at the top right</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <ChevronRight className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                                            <p>Open your store in a new tab and press <kbd className="bg-slate-900 px-2 py-1 rounded text-xs font-mono">Ctrl+Shift+R</kbd> to hard refresh</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Important Notes */}
                    <Card className="bg-amber-500/10 border-amber-500/30">
                        <CardContent className="p-6">
                            <h3 className="text-amber-300 font-semibold text-lg mb-4 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5" />
                                Important Rules for Beginners
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                    <h4 className="text-white font-medium">✅ DO:</h4>
                                    <ul className="text-slate-300 space-y-1 ml-4 list-disc">
                                        <li>Create a NEW CSS file (custom-theme.css)</li>
                                        <li>Paste at the very TOP (line 1)</li>
                                        <li>Make a backup before making changes</li>
                                        <li>Test on a duplicate theme first</li>
                                        <li>Clear cache if changes don't show</li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-white font-medium">❌ DON'T:</h4>
                                    <ul className="text-slate-300 space-y-1 ml-4 list-disc">
                                        <li>Don't edit existing CSS files</li>
                                        <li>Don't delete any existing code</li>
                                        <li>Don't paste in the middle of other code</li>
                                        <li>Don't skip the linking step</li>
                                        <li>Don't forget to save your changes</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Quick Reference */}
            <section>
                <Card className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 border-violet-500/20">
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    Still Need Help?
                                </h3>
                                <p className="text-slate-300">
                                    Watch video tutorials or check Shopify's official documentation for more guidance.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <a
                                    href="https://www.youtube.com/results?search_query=shopify+add+custom+css+tutorial"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors whitespace-nowrap"
                                >
                                    Video Tutorials
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                                <a
                                    href="https://help.shopify.com/en/manual/online-store/themes/theme-structure/extend/edit-theme-code"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-colors whitespace-nowrap"
                                >
                                    Shopify Docs
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}