import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, RefreshCw, Download, ExternalLink, Code2, Sliders } from 'lucide-react';
import { toast } from "sonner";
import LivePreview from './LivePreview';
import AdvancedCSSEditor from './AdvancedCSSEditor';
import PreviewControls from './PreviewControls';
import LiveCSSEditor from './LiveCSSEditor';

const colorfulThemes = {
    default: {
        name: 'Dark Blue',
        primaryColor: '#ffc600',
        secondaryColor: '#0088ff',
        textColor: '#e1efff',
        headingColor: '#ffffff',
        linkColor: '#0088ff',
        linkHoverColor: '#ffc600',
        mutedTextColor: '#8a9ab0',
        backgroundColor: '#193549',
        headerBg: '#15232d',
        footerBg: '#0d1a23',
        footerText: '#e1efff'
    },
    vibrantPurple: {
        name: 'Vibrant Purple',
        primaryColor: '#a855f7',
        secondaryColor: '#ec4899',
        textColor: '#1f2937',
        headingColor: '#111827',
        linkColor: '#a855f7',
        linkHoverColor: '#ec4899',
        mutedTextColor: '#6b7280',
        backgroundColor: '#faf5ff',
        headerBg: '#ffffff',
        footerBg: '#7c3aed',
        footerText: '#faf5ff'
    },
    oceanBreeze: {
        name: 'Ocean Breeze',
        primaryColor: '#06b6d4',
        secondaryColor: '#3b82f6',
        textColor: '#0f172a',
        headingColor: '#020617',
        linkColor: '#0ea5e9',
        linkHoverColor: '#06b6d4',
        mutedTextColor: '#64748b',
        backgroundColor: '#f0fdff',
        headerBg: '#ffffff',
        footerBg: '#0c4a6e',
        footerText: '#e0f2fe'
    },
    sunsetGlow: {
        name: 'Sunset Glow',
        primaryColor: '#f97316',
        secondaryColor: '#ef4444',
        textColor: '#292524',
        headingColor: '#1c1917',
        linkColor: '#ea580c',
        linkHoverColor: '#f97316',
        mutedTextColor: '#78716c',
        backgroundColor: '#fff7ed',
        headerBg: '#ffffff',
        footerBg: '#9a3412',
        footerText: '#fff7ed'
    },
    forestFresh: {
        name: 'Forest Fresh',
        primaryColor: '#10b981',
        secondaryColor: '#22c55e',
        textColor: '#1c1917',
        headingColor: '#0c0a09',
        linkColor: '#059669',
        linkHoverColor: '#10b981',
        mutedTextColor: '#57534e',
        backgroundColor: '#f0fdf4',
        headerBg: '#ffffff',
        footerBg: '#065f46',
        footerText: '#ecfdf5'
    },
    cherryPop: {
        name: 'Cherry Pop',
        primaryColor: '#ff006e',
        secondaryColor: '#fb5607',
        textColor: '#1a1423',
        headingColor: '#000000',
        linkColor: '#ff006e',
        linkHoverColor: '#fb5607',
        mutedTextColor: '#6c757d',
        backgroundColor: '#fff0f6',
        headerBg: '#ffffff',
        footerBg: '#c9184a',
        footerText: '#fff0f6'
    },
    royalGold: {
        name: 'Royal Gold',
        primaryColor: '#eab308',
        secondaryColor: '#f59e0b',
        textColor: '#292524',
        headingColor: '#1c1917',
        linkColor: '#ca8a04',
        linkHoverColor: '#eab308',
        mutedTextColor: '#78716c',
        backgroundColor: '#fffbeb',
        headerBg: '#ffffff',
        footerBg: '#713f12',
        footerText: '#fef3c7'
    },
    mintCream: {
        name: 'Mint Cream',
        primaryColor: '#14b8a6',
        secondaryColor: '#2dd4bf',
        textColor: '#134e4a',
        headingColor: '#042f2e',
        linkColor: '#0f766e',
        linkHoverColor: '#14b8a6',
        mutedTextColor: '#5f7c78',
        backgroundColor: '#f0fdfa',
        headerBg: '#ffffff',
        footerBg: '#0f766e',
        footerText: '#ccfbf1'
    },
    electricBlue: {
        name: 'Electric Blue',
        primaryColor: '#00d9ff',
        secondaryColor: '#0099ff',
        textColor: '#0a1929',
        headingColor: '#000000',
        linkColor: '#00b8d4',
        linkHoverColor: '#00d9ff',
        mutedTextColor: '#546e7a',
        backgroundColor: '#e3f2fd',
        headerBg: '#ffffff',
        footerBg: '#01579b',
        footerText: '#e1f5fe'
    },
    hotPink: {
        name: 'Hot Pink',
        primaryColor: '#ff1493',
        secondaryColor: '#ff69b4',
        textColor: '#1a0a14',
        headingColor: '#000000',
        linkColor: '#c2185b',
        linkHoverColor: '#ff1493',
        mutedTextColor: '#6d4c5c',
        backgroundColor: '#fce4ec',
        headerBg: '#ffffff',
        footerBg: '#880e4f',
        footerText: '#fce4ec'
    },
    neonNights: {
        name: 'Neon Nights',
        primaryColor: '#00ff88',
        secondaryColor: '#00ddff',
        textColor: '#e0e0e0',
        headingColor: '#ffffff',
        linkColor: '#00ff88',
        linkHoverColor: '#00ddff',
        mutedTextColor: '#9e9e9e',
        backgroundColor: '#0a0e27',
        headerBg: '#1a1f3a',
        footerBg: '#000000',
        footerText: '#e0e0e0'
    },
    coralReef: {
        name: 'Coral Reef',
        primaryColor: '#ff6f61',
        secondaryColor: '#26c6da',
        textColor: '#263238',
        headingColor: '#000a12',
        linkColor: '#ff5722',
        linkHoverColor: '#ff6f61',
        mutedTextColor: '#607d8b',
        backgroundColor: '#fff3e0',
        headerBg: '#ffffff',
        footerBg: '#006064',
        footerText: '#e0f7fa'
    },
    lavenderDream: {
        name: 'Lavender Dream',
        primaryColor: '#b39ddb',
        secondaryColor: '#ce93d8',
        textColor: '#4a148c',
        headingColor: '#311b92',
        linkColor: '#9575cd',
        linkHoverColor: '#b39ddb',
        mutedTextColor: '#7e57c2',
        backgroundColor: '#f3e5f5',
        headerBg: '#ffffff',
        footerBg: '#6a1b9a',
        footerText: '#f3e5f5'
    },
    citrusBurst: {
        name: 'Citrus Burst',
        primaryColor: '#ffd600',
        secondaryColor: '#ff6f00',
        textColor: '#3e2723',
        headingColor: '#1b0000',
        linkColor: '#f57f17',
        linkHoverColor: '#ffd600',
        mutedTextColor: '#6d4c41',
        backgroundColor: '#fffde7',
        headerBg: '#ffffff',
        footerBg: '#e65100',
        footerText: '#fff8e1'
    },
    midnightPurple: {
        name: 'Midnight Purple',
        primaryColor: '#9c27b0',
        secondaryColor: '#7b1fa2',
        textColor: '#f3e5f5',
        headingColor: '#ffffff',
        linkColor: '#ba68c8',
        linkHoverColor: '#ce93d8',
        mutedTextColor: '#ce93d8',
        backgroundColor: '#1a0033',
        headerBg: '#4a148c',
        footerBg: '#000000',
        footerText: '#f3e5f5'
    },
    roseGold: {
        name: 'Rose Gold',
        primaryColor: '#e91e63',
        secondaryColor: '#ff9800',
        textColor: '#3e2723',
        headingColor: '#1b0000',
        linkColor: '#d81b60',
        linkHoverColor: '#e91e63',
        mutedTextColor: '#795548',
        backgroundColor: '#fff8f0',
        headerBg: '#ffffff',
        footerBg: '#bf360c',
        footerText: '#fff3e0'
    },
    emeraldForest: {
        name: 'Emerald Forest',
        primaryColor: '#00c853',
        secondaryColor: '#00e676',
        textColor: '#1b5e20',
        headingColor: '#0d3d13',
        linkColor: '#00a152',
        linkHoverColor: '#00c853',
        mutedTextColor: '#558b2f',
        backgroundColor: '#f1f8e9',
        headerBg: '#ffffff',
        footerBg: '#1b5e20',
        footerText: '#e8f5e9'
    },
    crimsonFire: {
        name: 'Crimson Fire',
        primaryColor: '#d32f2f',
        secondaryColor: '#ff5722',
        textColor: '#1a1a1a',
        headingColor: '#000000',
        linkColor: '#c62828',
        linkHoverColor: '#d32f2f',
        mutedTextColor: '#616161',
        backgroundColor: '#ffebee',
        headerBg: '#ffffff',
        footerBg: '#b71c1c',
        footerText: '#ffcdd2'
    },
    arcticBlue: {
        name: 'Arctic Blue',
        primaryColor: '#29b6f6',
        secondaryColor: '#4dd0e1',
        textColor: '#01579b',
        headingColor: '#0d47a1',
        linkColor: '#0288d1',
        linkHoverColor: '#29b6f6',
        mutedTextColor: '#455a64',
        backgroundColor: '#e1f5fe',
        headerBg: '#ffffff',
        footerBg: '#01579b',
        footerText: '#b3e5fc'
    },
    sandyBeach: {
        name: 'Sandy Beach',
        primaryColor: '#ff9800',
        secondaryColor: '#ffc107',
        textColor: '#3e2723',
        headingColor: '#1b0000',
        linkColor: '#f57c00',
        linkHoverColor: '#ff9800',
        mutedTextColor: '#6d4c41',
        backgroundColor: '#fff3e0',
        headerBg: '#ffffff',
        footerBg: '#e65100',
        footerText: '#ffe0b2'
    },
    bubblegumPink: {
        name: 'Bubblegum Pink',
        primaryColor: '#ff69b4',
        secondaryColor: '#ffb6c1',
        textColor: '#4a1942',
        headingColor: '#2d0a26',
        linkColor: '#ff1493',
        linkHoverColor: '#ff69b4',
        mutedTextColor: '#8b4789',
        backgroundColor: '#fff0f5',
        headerBg: '#ffffff',
        footerBg: '#c71585',
        footerText: '#ffe4e1'
    },
    tropicalSunset: {
        name: 'Tropical Sunset',
        primaryColor: '#ff6347',
        secondaryColor: '#ffb347',
        textColor: '#2b1810',
        headingColor: '#1a0000',
        linkColor: '#ff4500',
        linkHoverColor: '#ff6347',
        mutedTextColor: '#704214',
        backgroundColor: '#fff5ee',
        headerBg: '#ffffff',
        footerBg: '#d2691e',
        footerText: '#ffdab9'
    },
    turquoiseDream: {
        name: 'Turquoise Dream',
        primaryColor: '#40e0d0',
        secondaryColor: '#00ced1',
        textColor: '#0a3d3d',
        headingColor: '#002626',
        linkColor: '#20b2aa',
        linkHoverColor: '#48d1cc',
        mutedTextColor: '#5f8a8b',
        backgroundColor: '#e0ffff',
        headerBg: '#ffffff',
        footerBg: '#008b8b',
        footerText: '#afeeee'
    },
    galaxyPurple: {
        name: 'Galaxy Purple',
        primaryColor: '#9370db',
        secondaryColor: '#8a2be2',
        textColor: '#1e1433',
        headingColor: '#0f0721',
        linkColor: '#6a5acd',
        linkHoverColor: '#9370db',
        mutedTextColor: '#67567c',
        backgroundColor: '#f5f0ff',
        headerBg: '#ffffff',
        footerBg: '#4b0082',
        footerText: '#e6e6fa'
    },
    limeLight: {
        name: 'Lime Light',
        primaryColor: '#32cd32',
        secondaryColor: '#adff2f',
        textColor: '#1a3300',
        headingColor: '#0d1a00',
        linkColor: '#228b22',
        linkHoverColor: '#32cd32',
        mutedTextColor: '#556b2f',
        backgroundColor: '#f0fff0',
        headerBg: '#ffffff',
        footerBg: '#006400',
        footerText: '#98fb98'
    },
    peachy: {
        name: 'Peachy',
        primaryColor: '#ffb347',
        secondaryColor: '#ffc09f',
        textColor: '#4a2c1f',
        headingColor: '#2b1810',
        linkColor: '#ff8c42',
        linkHoverColor: '#ffb347',
        mutedTextColor: '#8b6f47',
        backgroundColor: '#fff5ee',
        headerBg: '#ffffff',
        footerBg: '#cd853f',
        footerText: '#ffdead'
    },
    skyBlue: {
        name: 'Sky Blue',
        primaryColor: '#87ceeb',
        secondaryColor: '#00bfff',
        textColor: '#0f3854',
        headingColor: '#001f3f',
        linkColor: '#4682b4',
        linkHoverColor: '#5f9ea0',
        mutedTextColor: '#708090',
        backgroundColor: '#f0f8ff',
        headerBg: '#ffffff',
        footerBg: '#1e90ff',
        footerText: '#b0e0e6'
    },
    berryBlast: {
        name: 'Berry Blast',
        primaryColor: '#dc143c',
        secondaryColor: '#ff1493',
        textColor: '#330011',
        headingColor: '#1a0008',
        linkColor: '#c71585',
        linkHoverColor: '#dc143c',
        mutedTextColor: '#8b2252',
        backgroundColor: '#fff0f5',
        headerBg: '#ffffff',
        footerBg: '#8b0000',
        footerText: '#ffe4e1'
    },
    goldRush: {
        name: 'Gold Rush',
        primaryColor: '#ffd700',
        secondaryColor: '#ffec8b',
        textColor: '#3d2b00',
        headingColor: '#1f1500',
        linkColor: '#daa520',
        linkHoverColor: '#ffd700',
        mutedTextColor: '#8b7500',
        backgroundColor: '#fffacd',
        headerBg: '#ffffff',
        footerBg: '#b8860b',
        footerText: '#fff8dc'
    },
    aquaMarine: {
        name: 'Aqua Marine',
        primaryColor: '#7fffd4',
        secondaryColor: '#66cdaa',
        textColor: '#0d3d33',
        headingColor: '#002620',
        linkColor: '#2e8b57',
        linkHoverColor: '#3cb371',
        mutedTextColor: '#5f8575',
        backgroundColor: '#f0ffff',
        headerBg: '#ffffff',
        footerBg: '#008080',
        footerText: '#afeeee'
    }
    };

const defaultSettings = {
    ...colorfulThemes.default,
    borderRadius: 8,
    fontFamily: 'Inter',
    buttonPadding: 14,
    shadowIntensity: 40
};

const loadSettings = () => {
    try {
        const saved = localStorage.getItem('css-generator-settings');
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
        return defaultSettings;
    }
};

export default function CustomizePanel() {
    const [copied, setCopied] = useState(false);
    const [settings, setSettings] = useState(loadSettings);
    const [viewport, setViewport] = useState('desktop');
    const [customContent, setCustomContent] = useState({});

    const updateSettings = (newSettings) => {
        setSettings(newSettings);
        localStorage.setItem('css-generator-settings', JSON.stringify(newSettings));
    };

    const fonts = [
        { value: 'Inter', label: 'Inter' },
        { value: 'Orbitron', label: 'Orbitron (Sci-Fi)' },
        { value: 'Audiowide', label: 'Audiowide (Alien)' },
        { value: 'Exo 2', label: 'Exo 2 (Futuristic)' },
        { value: 'Rajdhani', label: 'Rajdhani (Tech)' },
        { value: 'Michroma', label: 'Michroma (Space)' },
        { value: 'Black Ops One', label: 'Black Ops One' },
        { value: 'Teko', label: 'Teko (Industrial)' },
        { value: 'Share Tech Mono', label: 'Share Tech Mono' },
        { value: 'VT323', label: 'VT323 (Retro Terminal)' },
        { value: 'Press Start 2P', label: 'Press Start 2P (Pixel)' },
        { value: 'Poppins', label: 'Poppins' },
        { value: 'Montserrat', label: 'Montserrat' },
        { value: 'Roboto', label: 'Roboto' },
    ];

    const generateCSS = () => {
        return `/* Custom Shopify Theme Styles */
/* Generated with CSS Template Generator */

:root {
  --primary-color: ${settings.primaryColor};
  --secondary-color: ${settings.secondaryColor};
  --text-color: ${settings.textColor};
  --heading-color: ${settings.headingColor};
  --link-color: ${settings.linkColor};
  --link-hover-color: ${settings.linkHoverColor};
  --muted-text-color: ${settings.mutedTextColor};
  --background-color: ${settings.backgroundColor};
  --header-bg: ${settings.headerBg};
  --footer-bg: ${settings.footerBg};
  --footer-text: ${settings.footerText};
  --border-radius: ${settings.borderRadius}px;
  --font-family: '${settings.fontFamily}', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Base Styles */
body {
  font-family: var(--font-family);
  color: var(--text-color);
  background-color: var(--background-color);
}

/* ===================== */
/* HEADER STYLES */
/* ===================== */
.header, .site-header, .shopify-section-header {
  background-color: var(--header-bg);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.header__nav a, .site-nav__link, .header-menu__link {
  color: var(--link-color);
  font-weight: 500;
  transition: color 0.2s ease;
}

.header__nav a:hover, .site-nav__link:hover, .header-menu__link:hover {
  color: var(--link-hover-color);
}

.header__logo, .site-header__logo {
  color: var(--heading-color);
}

/* Announcement Bar */
.announcement-bar {
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  color: white;
  text-align: center;
  padding: 10px 20px;
  font-size: 0.875rem;
}

.announcement-bar a {
  color: white;
  text-decoration: underline;
}

/* ===================== */
/* BUTTON STYLES */
/* ===================== */
.btn, 
.shopify-payment-button button,
button[type="submit"],
.product-form__submit {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  border: none;
  border-radius: var(--border-radius);
  padding: ${settings.buttonPadding}px ${settings.buttonPadding * 2}px;
  font-family: var(--font-family);
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px ${settings.shadowIntensity / 2}px rgba(102, 126, 234, ${settings.shadowIntensity / 100});
}

.btn:hover,
.shopify-payment-button button:hover,
button[type="submit"]:hover,
.product-form__submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px ${settings.shadowIntensity}px rgba(102, 126, 234, ${settings.shadowIntensity / 100 + 0.2});
}

.btn--secondary {
  background: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  box-shadow: none;
}

.btn--secondary:hover {
  background: var(--primary-color);
  color: white;
}

/* ===================== */
/* TYPOGRAPHY */
/* ===================== */
h1, h2, h3, h4, h5, h6 {
  color: var(--heading-color);
  font-family: var(--font-family);
  font-weight: 700;
  line-height: 1.3;
}

a {
  color: var(--link-color);
  transition: color 0.2s ease;
}

a:hover {
  color: var(--link-hover-color);
}

.text-muted,
.product-card__vendor,
.price__compare,
small,
.caption {
  color: var(--muted-text-color);
}

/* ===================== */
/* PRODUCT CARDS & GRID */
/* ===================== */
.product-card,
.card,
.product-item {
  background: var(--background-color);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.product-card:hover,
.card:hover,
.product-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.product-card__image-wrapper {
  overflow: hidden;
}

.product-card__image,
.product-item__image {
  transition: transform 0.5s ease;
}

.product-card:hover .product-card__image,
.product-item:hover .product-item__image {
  transform: scale(1.08);
}

.product-card__title,
.product-item__title {
  color: var(--heading-color);
  font-weight: 600;
}

.product-card__price,
.price {
  color: var(--primary-color);
  font-weight: 700;
}

.price__compare,
.product-card__price--compare {
  color: var(--muted-text-color);
  text-decoration: line-through;
}

/* ===================== */
/* FORM INPUTS */
/* ===================== */
input[type="text"],
input[type="email"],
input[type="password"],
input[type="tel"],
input[type="number"],
input[type="search"],
textarea,
select,
.field__input {
  border-radius: var(--border-radius);
  border: 1px solid #e5e7eb;
  padding: 12px 16px;
  font-family: var(--font-family);
  background-color: var(--background-color);
  color: var(--text-color);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus,
textarea:focus,
select:focus,
.field__input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px ${settings.primaryColor}20;
  outline: none;
}

input::placeholder,
textarea::placeholder {
  color: var(--muted-text-color);
}

/* Form Labels */
label, .form__label {
  color: var(--heading-color);
  font-weight: 500;
}

/* ===================== */
/* FOOTER STYLES */
/* ===================== */
.footer, .site-footer, .shopify-section-footer {
  background-color: var(--footer-bg);
  color: var(--footer-text);
  padding: 60px 0 30px;
}

.footer__heading, .footer-block__heading {
  color: var(--footer-text);
  font-weight: 600;
  margin-bottom: 1rem;
}

.footer a, .site-footer a {
  color: var(--footer-text);
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.footer a:hover, .site-footer a:hover {
  opacity: 1;
  color: var(--footer-text);
}

.footer__bottom, .footer__copyright {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 40px;
  padding-top: 20px;
  opacity: 0.6;
  font-size: 0.875rem;
}

/* ===================== */
/* NEWSLETTER FORM */
/* ===================== */
.newsletter-form {
  background: rgba(0, 0, 0, 0.05);
  padding: 2rem;
  border-radius: var(--border-radius);
}

.newsletter-form input[type="email"] {
  flex: 1;
}

/* ===================== */
/* CART & CHECKOUT */
/* ===================== */
.cart-icon__bubble {
  background-color: var(--primary-color);
  color: white;
}

.cart-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

/* ===================== */
/* MISC COMPONENTS */
/* ===================== */
.badge, .tag {
  background: ${settings.primaryColor}15;
  color: var(--primary-color);
  border-radius: calc(var(--border-radius) / 2);
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 600;
}

.sale-badge {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
}`;
    };

    const copyCSS = () => {
        navigator.clipboard.writeText(generateCSS());
        setCopied(true);
        toast.success('Custom CSS copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadCSS = () => {
        const css = generateCSS();
        const blob = new Blob([css], { type: 'text/css' });
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

    const resetSettings = () => {
        updateSettings(defaultSettings);
        toast.success('Settings reset to defaults');
    };

    const applyTheme = (themeKey) => {
        const theme = colorfulThemes[themeKey];
        updateSettings({
            ...settings,
            ...theme,
        });
        toast.success(`${theme.name} theme applied!`);
    };

    return (
        <Tabs defaultValue="visual" className="w-full">
            <div className="flex justify-center mb-6">
                <TabsList className="bg-slate-800/50 border border-slate-700/50">
                    <TabsTrigger value="visual" className="data-[state=active]:bg-violet-600">
                        <Sliders className="w-4 h-4 mr-2" />
                        Visual Editor
                    </TabsTrigger>
                    <TabsTrigger value="code" className="data-[state=active]:bg-violet-600">
                        <Code2 className="w-4 h-4 mr-2" />
                        Code Editor
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="visual" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Settings Panel */}
                    <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-4 md:p-6 space-y-4 md:space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-white font-semibold text-lg">Customize Your Theme</h3>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-400 hover:text-white active:scale-95 transition-transform cursor-pointer"
                            onClick={resetSettings}
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Reset
                        </Button>
                    </div>

                    {/* Colorful Theme Presets */}
                    <div className="space-y-2">
                        <Label className="text-slate-300">Colorful Themes ({Object.keys(colorfulThemes).length} themes)</Label>
                        <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-2">
                            {Object.entries(colorfulThemes).map(([key, theme]) => (
                                <button
                                    key={key}
                                    onClick={() => applyTheme(key)}
                                    className="p-3 rounded-lg border-2 border-slate-700 hover:border-violet-500 transition-all group cursor-pointer hover:scale-105"
                                    style={{
                                        background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`
                                    }}
                                >
                                    <div className="text-white text-xs font-semibold drop-shadow-lg">
                                        {theme.name}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Colors */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                        <div className="space-y-2">
                            <Label className="text-slate-300">Primary Color</Label>
                            <div className="flex gap-2">
                                <Input
                                    type="color"
                                    value={settings.primaryColor}
                                    onChange={(e) => updateSettings({...settings, primaryColor: e.target.value})}
                                    className="w-12 h-10 p-1 bg-slate-700 border-slate-600 rounded-lg cursor-pointer"
                                />
                                <Input
                                    type="text"
                                    value={settings.primaryColor}
                                    onChange={(e) => updateSettings({...settings, primaryColor: e.target.value})}
                                    className="bg-slate-700 border-slate-600 text-white"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-300">Secondary Color</Label>
                            <div className="flex gap-2">
                                <Input
                                    type="color"
                                    value={settings.secondaryColor}
                                    onChange={(e) => updateSettings({...settings, secondaryColor: e.target.value})}
                                    className="w-12 h-10 p-1 bg-slate-700 border-slate-600 rounded-lg cursor-pointer"
                                />
                                <Input
                                    type="text"
                                    value={settings.secondaryColor}
                                    onChange={(e) => updateSettings({...settings, secondaryColor: e.target.value})}
                                    className="bg-slate-700 border-slate-600 text-white"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-300">Text Color</Label>
                            <div className="flex gap-2">
                                <Input
                                    type="color"
                                    value={settings.textColor}
                                    onChange={(e) => updateSettings({...settings, textColor: e.target.value})}
                                    className="w-12 h-10 p-1 bg-slate-700 border-slate-600 rounded-lg cursor-pointer"
                                />
                                <Input
                                    type="text"
                                    value={settings.textColor}
                                    onChange={(e) => updateSettings({...settings, textColor: e.target.value})}
                                    className="bg-slate-700 border-slate-600 text-white"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-300">Background Color</Label>
                            <div className="flex gap-2">
                                <Input
                                    type="color"
                                    value={settings.backgroundColor}
                                    onChange={(e) => updateSettings({...settings, backgroundColor: e.target.value})}
                                    className="w-12 h-10 p-1 bg-slate-700 border-slate-600 rounded-lg cursor-pointer"
                                />
                                <Input
                                    type="text"
                                    value={settings.backgroundColor}
                                    onChange={(e) => updateSettings({...settings, backgroundColor: e.target.value})}
                                    className="bg-slate-700 border-slate-600 text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Additional Text Colors */}
                    <div className="pt-4 border-t border-slate-700">
                        <Label className="text-slate-300 mb-3 md:mb-4 block text-sm md:text-base font-medium">Typography Colors</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-400 text-sm">Heading Color</Label>
                                <div className="flex gap-2">
                                    <Input
                                        type="color"
                                        value={settings.headingColor}
                                        onChange={(e) => updateSettings({...settings, headingColor: e.target.value})}
                                        className="w-12 h-10 p-1 bg-slate-700 border-slate-600 rounded-lg cursor-pointer"
                                    />
                                    <Input
                                        type="text"
                                        value={settings.headingColor}
                                        onChange={(e) => updateSettings({...settings, headingColor: e.target.value})}
                                        className="bg-slate-700 border-slate-600 text-white"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-400 text-sm">Link Color</Label>
                                <div className="flex gap-2">
                                    <Input
                                        type="color"
                                        value={settings.linkColor}
                                        onChange={(e) => updateSettings({...settings, linkColor: e.target.value})}
                                        className="w-12 h-10 p-1 bg-slate-700 border-slate-600 rounded-lg cursor-pointer"
                                    />
                                    <Input
                                        type="text"
                                        value={settings.linkColor}
                                        onChange={(e) => updateSettings({...settings, linkColor: e.target.value})}
                                        className="bg-slate-700 border-slate-600 text-white"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-400 text-sm">Link Hover Color</Label>
                                <div className="flex gap-2">
                                    <Input
                                        type="color"
                                        value={settings.linkHoverColor}
                                        onChange={(e) => updateSettings({...settings, linkHoverColor: e.target.value})}
                                        className="w-12 h-10 p-1 bg-slate-700 border-slate-600 rounded-lg cursor-pointer"
                                    />
                                    <Input
                                        type="text"
                                        value={settings.linkHoverColor}
                                        onChange={(e) => updateSettings({...settings, linkHoverColor: e.target.value})}
                                        className="bg-slate-700 border-slate-600 text-white"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-400 text-sm">Muted Text Color</Label>
                                <div className="flex gap-2">
                                    <Input
                                        type="color"
                                        value={settings.mutedTextColor}
                                        onChange={(e) => updateSettings({...settings, mutedTextColor: e.target.value})}
                                        className="w-12 h-10 p-1 bg-slate-700 border-slate-600 rounded-lg cursor-pointer"
                                    />
                                    <Input
                                        type="text"
                                        value={settings.mutedTextColor}
                                        onChange={(e) => updateSettings({...settings, mutedTextColor: e.target.value})}
                                        className="bg-slate-700 border-slate-600 text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Header & Footer Colors */}
                    <div className="pt-4 border-t border-slate-700">
                        <Label className="text-slate-300 mb-3 md:mb-4 block text-sm md:text-base font-medium">Header & Footer</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-400 text-sm">Header Background</Label>
                                <div className="flex gap-2">
                                    <Input
                                        type="color"
                                        value={settings.headerBg}
                                        onChange={(e) => updateSettings({...settings, headerBg: e.target.value})}
                                        className="w-12 h-10 p-1 bg-slate-700 border-slate-600 rounded-lg cursor-pointer"
                                    />
                                    <Input
                                        type="text"
                                        value={settings.headerBg}
                                        onChange={(e) => updateSettings({...settings, headerBg: e.target.value})}
                                        className="bg-slate-700 border-slate-600 text-white"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-400 text-sm">Footer Background</Label>
                                <div className="flex gap-2">
                                    <Input
                                        type="color"
                                        value={settings.footerBg}
                                        onChange={(e) => updateSettings({...settings, footerBg: e.target.value})}
                                        className="w-12 h-10 p-1 bg-slate-700 border-slate-600 rounded-lg cursor-pointer"
                                    />
                                    <Input
                                        type="text"
                                        value={settings.footerBg}
                                        onChange={(e) => updateSettings({...settings, footerBg: e.target.value})}
                                        className="bg-slate-700 border-slate-600 text-white"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label className="text-slate-400 text-sm">Footer Text Color</Label>
                                <div className="flex gap-2">
                                    <Input
                                        type="color"
                                        value={settings.footerText}
                                        onChange={(e) => updateSettings({...settings, footerText: e.target.value})}
                                        className="w-12 h-10 p-1 bg-slate-700 border-slate-600 rounded-lg cursor-pointer"
                                    />
                                    <Input
                                        type="text"
                                        value={settings.footerText}
                                        onChange={(e) => updateSettings({...settings, footerText: e.target.value})}
                                        className="bg-slate-700 border-slate-600 text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Font */}
                    <div className="space-y-2">
                        <Label className="text-slate-300">Font Family</Label>
                        <Select 
                            value={settings.fontFamily}
                            onValueChange={(value) => updateSettings({...settings, fontFamily: value})}
                        >
                            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {fonts.map(font => (
                                    <SelectItem key={font.value} value={font.value}>
                                        {font.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Sliders */}
                    <div className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Label className="text-slate-300">Border Radius</Label>
                                <span className="text-slate-400 text-sm">{settings.borderRadius}px</span>
                            </div>
                            <Slider
                                value={[settings.borderRadius]}
                                onValueChange={([value]) => updateSettings({...settings, borderRadius: value})}
                                max={24}
                                step={1}
                                className="py-2"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Label className="text-slate-300">Button Padding</Label>
                                <span className="text-slate-400 text-sm">{settings.buttonPadding}px</span>
                            </div>
                            <Slider
                                value={[settings.buttonPadding]}
                                onValueChange={([value]) => updateSettings({...settings, buttonPadding: value})}
                                min={8}
                                max={24}
                                step={1}
                                className="py-2"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <Label className="text-slate-300">Shadow Intensity</Label>
                                <span className="text-slate-400 text-sm">{settings.shadowIntensity}%</span>
                            </div>
                            <Slider
                                value={[settings.shadowIntensity]}
                                onValueChange={([value]) => updateSettings({...settings, shadowIntensity: value})}
                                max={100}
                                step={5}
                                className="py-2"
                            />
                        </div>
                    </div>

                </CardContent>
            </Card>

            {/* Live Preview Card */}
            <Card className="bg-slate-800/50 border-slate-700/50 lg:row-span-2">
                <CardContent className="p-4 md:p-6 space-y-4">
                    <h3 className="text-white font-semibold text-lg">Live Preview</h3>
                    
                    <PreviewControls 
                        viewport={viewport}
                        onViewportChange={setViewport}
                        customContent={customContent}
                        onContentChange={setCustomContent}
                    />
                    
                    <LivePreview 
                        settings={settings} 
                        viewport={viewport}
                        customContent={customContent}
                    />

                    {/* Color Swatches */}
                    <div className="pt-4 border-t border-slate-700">
                        <Label className="text-slate-400 text-sm mb-3 block">Color Palette</Label>
                        <div className="flex gap-2 flex-wrap">
                            {[
                                { color: settings.primaryColor, label: 'Primary' },
                                { color: settings.secondaryColor, label: 'Secondary' },
                                { color: settings.headingColor, label: 'Heading' },
                                { color: settings.textColor, label: 'Text' },
                                { color: settings.headerBg, label: 'Header' },
                                { color: settings.footerBg, label: 'Footer' },
                                { color: settings.backgroundColor, label: 'BG' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-1">
                                    <div 
                                        className="w-10 h-10 rounded-lg border border-slate-600 shadow-sm"
                                        style={{ backgroundColor: item.color }}
                                        title={item.label}
                                    />
                                    <span className="text-slate-500 text-xs">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Generated CSS Preview */}
            <Card className="bg-slate-800/50 border-slate-700/50 lg:col-span-2">
                <CardContent className="p-4 md:p-6 space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <h3 className="text-white font-semibold text-lg">Generated CSS</h3>
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

                    {/* Shopify Instructions */}
                    <div className="bg-slate-700/50 rounded-lg p-3 md:p-4 text-sm">
                        <p className="text-slate-300 font-medium mb-2">How to add to Shopify:</p>
                        <ol className="text-slate-400 text-xs md:text-sm space-y-1 list-decimal list-inside">
                            <li>Go to <strong>Online Store → Themes → Edit code</strong></li>
                            <li>Find <strong>Assets</strong> folder → Add new asset → Create blank file</li>
                            <li>Name it <code className="bg-slate-800 px-1 rounded">custom-theme.css</code></li>
                            <li>Paste your CSS and save</li>
                            <li>In <strong>Layout/theme.liquid</strong>, add before <code className="bg-slate-800 px-1 rounded">&lt;/head&gt;</code>:</li>
                        </ol>
                        <pre className="bg-slate-900 rounded p-2 mt-2 text-xs text-violet-300 overflow-x-auto">
                    {`{{ 'custom-theme.css' | asset_url | stylesheet_tag }}`}
                        </pre>
                        <a 
                            href="https://help.shopify.com/en/manual/online-store/themes/theme-structure/extend/edit-theme-code" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 text-xs mt-2"
                        >
                            <ExternalLink className="w-3 h-3" />
                            Shopify documentation
                        </a>
                    </div>

                    <div className="bg-slate-950 rounded-xl p-3 md:p-4 overflow-auto max-h-[300px] md:max-h-[500px]">
                        <pre className="text-xs md:text-sm text-slate-300 font-mono whitespace-pre">
                            {generateCSS()}
                        </pre>
                    </div>
                </CardContent>
            </Card>
        </div>
            </TabsContent>

            <TabsContent value="code" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <LiveCSSEditor 
                        settings={settings} 
                        onSettingsChange={updateSettings}
                        generateCSS={generateCSS}
                    />

                    {/* Live Preview Card */}
                    <Card className="bg-slate-800/50 border-slate-700/50 lg:sticky lg:top-4 h-fit">
                        <CardContent className="p-4 md:p-6 space-y-4">
                            <h3 className="text-white font-semibold text-lg">Live Preview</h3>

                            <PreviewControls 
                                viewport={viewport}
                                onViewportChange={setViewport}
                                customContent={customContent}
                                onContentChange={setCustomContent}
                            />

                            <LivePreview 
                                settings={settings}
                                viewport={viewport}
                                customContent={customContent}
                            />

                            {/* Color Swatches */}
                            <div className="pt-4 border-t border-slate-700">
                                <Label className="text-slate-400 text-sm mb-3 block">Color Palette</Label>
                                <div className="flex gap-2 flex-wrap">
                                    {[
                                        { color: settings.primaryColor, label: 'Primary' },
                                        { color: settings.secondaryColor, label: 'Secondary' },
                                        { color: settings.headingColor, label: 'Heading' },
                                        { color: settings.textColor, label: 'Text' },
                                        { color: settings.headerBg, label: 'Header' },
                                        { color: settings.footerBg, label: 'Footer' },
                                        { color: settings.backgroundColor, label: 'BG' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex flex-col items-center gap-1">
                                            <div 
                                                className="w-10 h-10 rounded-lg border border-slate-600 shadow-sm"
                                                style={{ backgroundColor: item.color }}
                                                title={item.label}
                                            />
                                            <span className="text-slate-500 text-xs">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>
    );
}