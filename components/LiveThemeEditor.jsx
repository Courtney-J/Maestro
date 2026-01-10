import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Eye, Download, Copy, Check, RefreshCw, Palette } from 'lucide-react';
import { toast } from "sonner";
import MonacoEditor from './MonacoEditor';

const htmlTemplates = {
    productCard: {
        name: 'Product Card',
        html: `<div class="product-card">
  <div class="product-image">
    <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" alt="Product">
    <span class="badge">New</span>
  </div>
  <div class="product-info">
    <h3 class="product-title">Premium Watch</h3>
    <p class="product-vendor">Luxury Brand</p>
    <div class="product-price">
      <span class="price-current">$299</span>
      <span class="price-compare">$399</span>
    </div>
    <button class="btn-primary">Add to Cart</button>
  </div>
</div>`,
        defaultCss: `.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.product-image {
  position: relative;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #667eea;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.product-info {
  padding: 20px;
}

.product-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 4px;
}

.product-vendor {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 12px;
}

.product-price {
  margin-bottom: 16px;
}

.price-current {
  font-size: 24px;
  font-weight: 700;
  color: #667eea;
  margin-right: 8px;
}

.price-compare {
  font-size: 16px;
  color: #9ca3af;
  text-decoration: line-through;
}

.btn-primary {
  width: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
}`
    },
    header: {
        name: 'Header',
        html: `<header class="site-header">
  <div class="header-container">
    <div class="header-logo">
      <h1>My Store</h1>
    </div>
    <nav class="header-nav">
      <a href="#" class="nav-link">Home</a>
      <a href="#" class="nav-link">Shop</a>
      <a href="#" class="nav-link">About</a>
      <a href="#" class="nav-link">Contact</a>
    </nav>
    <div class="header-actions">
      <button class="icon-btn">🔍</button>
      <button class="icon-btn">👤</button>
      <button class="icon-btn">🛒</button>
    </div>
  </div>
</header>`,
        defaultCss: `.site-header {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-logo h1 {
  font-size: 24px;
  font-weight: 700;
  color: #667eea;
  margin: 0;
}

.header-nav {
  display: flex;
  gap: 32px;
}

.nav-link {
  color: #1a1a2e;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #667eea;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.icon-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;
}

.icon-btn:hover {
  background: #f3f4f6;
}`
    },
    hero: {
        name: 'Hero Section',
        html: `<section class="hero-section">
  <div class="hero-content">
    <h1 class="hero-title">Summer Collection 2024</h1>
    <p class="hero-subtitle">Discover the latest trends in fashion</p>
    <button class="hero-btn">Shop Now</button>
  </div>
</section>`,
        defaultCss: `.hero-section {
  position: relative;
  height: 500px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200');
  background-size: cover;
  background-position: center;
  opacity: 0.2;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  padding: 40px 20px;
}

.hero-title {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
  line-height: 1.2;
  text-shadow: 0 2px 20px rgba(0,0,0,0.3);
}

.hero-subtitle {
  font-size: 20px;
  margin-bottom: 32px;
  opacity: 0.9;
}

.hero-btn {
  background: white;
  color: #667eea;
  border: none;
  padding: 16px 48px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(0,0,0,0.3);
}`
    },
    footer: {
        name: 'Footer',
        html: `<footer class="site-footer">
  <div class="footer-container">
    <div class="footer-column">
      <h3 class="footer-title">Shop</h3>
      <a href="#" class="footer-link">New Arrivals</a>
      <a href="#" class="footer-link">Best Sellers</a>
      <a href="#" class="footer-link">Sale</a>
    </div>
    <div class="footer-column">
      <h3 class="footer-title">Help</h3>
      <a href="#" class="footer-link">Contact Us</a>
      <a href="#" class="footer-link">Shipping</a>
      <a href="#" class="footer-link">Returns</a>
    </div>
    <div class="footer-column">
      <h3 class="footer-title">About</h3>
      <a href="#" class="footer-link">Our Story</a>
      <a href="#" class="footer-link">Careers</a>
      <a href="#" class="footer-link">Press</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2024 Your Store. All rights reserved.</p>
  </div>
</footer>`,
        defaultCss: `.site-footer {
  background: #1a1a2e;
  color: #e5e7eb;
  padding: 60px 0 30px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-title {
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
}

.footer-link {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #667eea;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 20px 0;
  border-top: 1px solid rgba(255,255,255,0.1);
  text-align: center;
  font-size: 14px;
  color: #6b7280;
}`
    }
};

export default function LiveThemeEditor() {
    const [selectedTemplate, setSelectedTemplate] = useState('productCard');
    const [html, setHtml] = useState(htmlTemplates.productCard.html);
    const [css, setCss] = useState(htmlTemplates.productCard.defaultCss);
    const [copiedHtml, setCopiedHtml] = useState(false);
    const [copiedCss, setCopiedCss] = useState(false);
    const [previewKey, setPreviewKey] = useState(0);

    useEffect(() => {
        const template = htmlTemplates[selectedTemplate];
        setHtml(template.html);
        setCss(template.defaultCss);
        setPreviewKey(prev => prev + 1);
    }, [selectedTemplate]);

    const handleHtmlChange = (value) => {
        setHtml(value);
        setPreviewKey(prev => prev + 1);
    };

    const handleCssChange = (value) => {
        setCss(value);
        setPreviewKey(prev => prev + 1);
    };

    const copyHtml = () => {
        navigator.clipboard.writeText(html);
        setCopiedHtml(true);
        toast.success('HTML copied!');
        setTimeout(() => setCopiedHtml(false), 2000);
    };

    const copyCss = () => {
        navigator.clipboard.writeText(css);
        setCopiedCss(true);
        toast.success('CSS copied!');
        setTimeout(() => setCopiedCss(false), 2000);
    };

    const downloadFiles = () => {
        const htmlBlob = new Blob([html], { type: 'text/html' });
        const cssBlob = new Blob([css], { type: 'text/css' });
        
        const htmlUrl = URL.createObjectURL(htmlBlob);
        const cssUrl = URL.createObjectURL(cssBlob);
        
        const aHtml = document.createElement('a');
        aHtml.href = htmlUrl;
        aHtml.download = `${selectedTemplate}.html`;
        aHtml.click();
        
        const aCss = document.createElement('a');
        aCss.href = cssUrl;
        aCss.download = `${selectedTemplate}.css`;
        aCss.click();
        
        URL.revokeObjectURL(htmlUrl);
        URL.revokeObjectURL(cssUrl);
        toast.success('Files downloaded!');
    };

    const resetTemplate = () => {
        const template = htmlTemplates[selectedTemplate];
        setHtml(template.html);
        setCss(template.defaultCss);
        setPreviewKey(prev => prev + 1);
        toast.success('Template reset!');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Editor Panel */}
            <div className="space-y-4">
                {/* Template Selector */}
                <Card className="bg-slate-800/50 border-slate-700/50">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                                <label className="text-slate-300 text-sm mb-2 block">Choose Template</label>
                                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(htmlTemplates).map(([key, template]) => (
                                            <SelectItem key={key} value={key}>
                                                {template.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-slate-600 text-slate-300 hover:bg-slate-700 cursor-pointer"
                                    onClick={resetTemplate}
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-slate-600 text-slate-300 hover:bg-slate-700 cursor-pointer"
                                    onClick={downloadFiles}
                                >
                                    <Download className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Code Editors */}
                <Card className="bg-slate-800/50 border-slate-700/50">
                    <CardContent className="p-0">
                        <Tabs defaultValue="html" className="w-full">
                            <div className="border-b border-slate-700 px-4">
                                <TabsList className="bg-transparent h-12">
                                    <TabsTrigger value="html" className="data-[state=active]:bg-slate-700">
                                        <Code className="w-4 h-4 mr-2" />
                                        HTML
                                    </TabsTrigger>
                                    <TabsTrigger value="css" className="data-[state=active]:bg-slate-700">
                                        <Palette className="w-4 h-4 mr-2" />
                                        CSS
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="html" className="p-4 mt-0">
                                <MonacoEditor
                                    value={html}
                                    onChange={handleHtmlChange}
                                    language="html"
                                    height="500px"
                                    onCopy={copyHtml}
                                    copied={copiedHtml}
                                />
                            </TabsContent>

                            <TabsContent value="css" className="p-4 mt-0">
                                <MonacoEditor
                                    value={css}
                                    onChange={handleCssChange}
                                    language="css"
                                    height="500px"
                                    onCopy={copyCss}
                                    copied={copiedCss}
                                />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            {/* Live Preview Panel */}
            <Card className="bg-slate-800/50 border-slate-700/50 lg:sticky lg:top-4 lg:h-fit">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Eye className="w-5 h-5 text-violet-400" />
                            <h3 className="text-white font-semibold">Live Preview</h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            Real-time
                        </div>
                    </div>

                    <div className="bg-white rounded-xl overflow-hidden min-h-[500px]">
                        <style>{css}</style>
                        <div 
                            key={previewKey}
                            dangerouslySetInnerHTML={{ __html: html }}
                            className="p-6"
                        />
                    </div>

                    <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
                        <p className="text-slate-300 text-xs">
                            💡 <strong>Tip:</strong> Edit the HTML or CSS above to see instant changes in the preview
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}