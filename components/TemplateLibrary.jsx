import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Monitor, Tablet, Smartphone, Upload, RotateCcw } from 'lucide-react';
import { toast } from "sonner";

export default function PreviewControls({ 
    viewport, 
    onViewportChange, 
    customContent,
    onContentChange 
}) {
    const handleImageUpload = (e, key) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                onContentChange({ ...customContent, [key]: event.target.result });
                toast.success('Image uploaded!');
            };
            reader.readAsDataURL(file);
        }
    };

    const resetContent = () => {
        onContentChange({});
        toast.success('Content reset to defaults');
    };

    return (
        <div className="space-y-4">
            {/* Viewport Switcher */}
            <div className="flex flex-col gap-3">
                <Label className="text-slate-300 text-sm">Device Preview</Label>
                <div className="flex gap-2">
                    <Button
                        variant={viewport === 'desktop' ? 'default' : 'outline'}
                        size="sm"
                        className={viewport === 'desktop' ? 'bg-violet-600' : 'border-slate-600 text-slate-300 hover:bg-slate-700'}
                        onClick={() => onViewportChange('desktop')}
                    >
                        <Monitor className="w-4 h-4 mr-2" />
                        Desktop
                    </Button>
                    <Button
                        variant={viewport === 'tablet' ? 'default' : 'outline'}
                        size="sm"
                        className={viewport === 'tablet' ? 'bg-violet-600' : 'border-slate-600 text-slate-300 hover:bg-slate-700'}
                        onClick={() => onViewportChange('tablet')}
                    >
                        <Tablet className="w-4 h-4 mr-2" />
                        Tablet
                    </Button>
                    <Button
                        variant={viewport === 'mobile' ? 'default' : 'outline'}
                        size="sm"
                        className={viewport === 'mobile' ? 'bg-violet-600' : 'border-slate-600 text-slate-300 hover:bg-slate-700'}
                        onClick={() => onViewportChange('mobile')}
                    >
                        <Smartphone className="w-4 h-4 mr-2" />
                        Mobile
                    </Button>
                </div>
            </div>

            {/* Custom Content Controls */}
            <div className="pt-3 border-t border-slate-700">
                <div className="flex items-center justify-between mb-3">
                    <Label className="text-slate-300 text-sm">Customize Preview</Label>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-white h-7"
                        onClick={resetContent}
                    >
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Reset
                    </Button>
                </div>

                <div className="space-y-3">
                    {/* Store Name */}
                    <div>
                        <Label className="text-slate-400 text-xs mb-1.5 block">Store Name</Label>
                        <Input
                            type="text"
                            placeholder="My Store"
                            value={customContent.storeName || ''}
                            onChange={(e) => onContentChange({ ...customContent, storeName: e.target.value })}
                            className="bg-slate-700 border-slate-600 text-white text-sm h-9"
                        />
                    </div>

                    {/* Hero Title */}
                    <div>
                        <Label className="text-slate-400 text-xs mb-1.5 block">Hero Title</Label>
                        <Input
                            type="text"
                            placeholder="Welcome to Our Store"
                            value={customContent.heroTitle || ''}
                            onChange={(e) => onContentChange({ ...customContent, heroTitle: e.target.value })}
                            className="bg-slate-700 border-slate-600 text-white text-sm h-9"
                        />
                    </div>

                    {/* Product Image Upload */}
                    <div>
                        <Label className="text-slate-400 text-xs mb-1.5 block">Product Image</Label>
                        <label className="flex items-center gap-2 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors">
                            <Upload className="w-3 h-3 text-slate-400" />
                            <span className="text-slate-300 text-xs">
                                {customContent.productImage ? 'Change Image' : 'Upload Image'}
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageUpload(e, 'productImage')}
                            />
                        </label>
                    </div>

                    {/* Hero Background Image */}
                    <div>
                        <Label className="text-slate-400 text-xs mb-1.5 block">Hero Background</Label>
                        <label className="flex items-center gap-2 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors">
                            <Upload className="w-3 h-3 text-slate-400" />
                            <span className="text-slate-300 text-xs">
                                {customContent.heroBackground ? 'Change Background' : 'Upload Background'}
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageUpload(e, 'heroBackground')}
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}