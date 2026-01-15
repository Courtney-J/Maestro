import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Code, Eye } from 'lucide-react';
import { toast } from "sonner";
import CodePreview from './CodePreview';

const templates = [
    {
        id: 'announcement-bar',
        name: 'Announcement Bar',
        type: 'css',
        description: 'Gradient banner for shipping offers or seasonal promos.',
        css: `.announcement-bar {
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  color: #ffffff;
  padding: 10px 20px;
  text-align: center;
  font-size: 14px;
  letter-spacing: 0.03em;
}

.announcement-bar a {
  color: inherit;
  text-decoration: underline;
  font-weight: 500;
}`
    },
    {
        id: 'pill-buttons',
        name: 'Pill CTA Buttons',
        type: 'css',
        description: 'Rounded call-to-action buttons with subtle hover lift.',
        css: `.btn-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 28px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 10px 25px rgba(34, 197, 94, 0.35);
}

.btn-pill:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 35px rgba(34, 197, 94, 0.45);
}`
    },
    {
        id: 'product-grid',
        name: 'Product Grid',
        type: 'css',
        description: 'Responsive product grid with hover elevation.',
        css: `.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.product-card {
  background: #020617;
  border-radius: 16px;
  padding: 16px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.6);
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.85);
  border-color: rgba(129, 140, 248, 0.8);
}`
    }
];

export default function TemplateLibrary() {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = (template) => {
        const code = template.code || template.css;
        navigator.clipboard.writeText(code);
        setCopiedId(template.id);
        toast.success('Template copied to clipboard');
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {templates.map((template) => (
                    <Card
                        key={template.id}
                        className="bg-slate-800/60 border-slate-700/60 hover:border-violet-500/60 transition-colors"
                    >
                        <CardContent className="p-4 md:p-5 space-y-3">
                            <div className="flex items-center justify-between gap-2">
                                <div>
                                    <h3 className="text-white font-semibold text-sm md:text-base">
                                        {template.name}
                                    </h3>
                                    <p className="text-slate-400 text-xs md:text-sm">
                                        {template.description}
                                    </p>
                                </div>
                                <Badge variant="outline" className="border-violet-500 text-violet-300 text-[10px] uppercase">
                                    {template.type.toUpperCase()}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <Button
                                    variant="outline"
                                    className="border-slate-600 text-slate-200 hover:bg-slate-700 active:scale-95 transition-transform cursor-pointer text-xs md:text-sm"
                                    onClick={() => setSelectedTemplate(template)}
                                >
                                    <Eye className="w-4 h-4 mr-1.5" />
                                    Preview
                                </Button>
                                <Button
                                    className={`${copiedId === template.id ? 'bg-green-600 hover:bg-green-700' : 'bg-violet-600 hover:bg-violet-700'} active:scale-95 transition-transform cursor-pointer text-xs md:text-sm`}
                                    onClick={() => handleCopy(template)}
                                >
                                    <Copy className="w-4 h-4 mr-1.5" />
                                    {copiedId === template.id ? 'Copied' : 'Copy CSS'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {selectedTemplate && (
                <CodePreview
                    template={selectedTemplate}
                    onClose={() => setSelectedTemplate(null)}
                    onCopy={() => handleCopy(selectedTemplate)}
                    copied={copiedId === selectedTemplate.id}
                />
            )}
        </>
    );
}
