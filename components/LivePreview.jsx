import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Search, User, Menu, Star, Minus, Plus, ChevronRight, Calendar, Clock, MessageCircle } from 'lucide-react';

export default function LivePreview({ settings, viewport = 'desktop', customContent = {} }) {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState('M');
    const [selectedColor, setSelectedColor] = useState('Black');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('home');

    // Viewport dimensions
    const viewportStyles = {
        desktop: { maxWidth: '100%', margin: '0 auto' },
        tablet: { maxWidth: '768px', margin: '0 auto' },
        mobile: { maxWidth: '375px', margin: '0 auto' }
    };

    const defaultProductImage = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop';
    const defaultHeroBackground = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop';
    
    const products = [
        { name: 'Classic Tee', price: '$49.00', oldPrice: '$65.00', img: customContent.productImage || defaultProductImage },
        { name: 'Denim Jacket', price: '$129.00', oldPrice: null, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop' },
        { name: 'Sneakers', price: '$89.00', oldPrice: '$110.00', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop' },
    ];

    const collectionProducts = [
        { name: 'Classic Tee', price: '$49.00', oldPrice: '$65.00', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop' },
        { name: 'Denim Jacket', price: '$129.00', oldPrice: null, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop' },
        { name: 'Sneakers', price: '$89.00', oldPrice: '$110.00', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop' },
        { name: 'Watch', price: '$199.00', oldPrice: null, img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200&h=200&fit=crop' },
        { name: 'Backpack', price: '$79.00', oldPrice: '$99.00', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop' },
        { name: 'Sunglasses', price: '$59.00', oldPrice: null, img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop' },
    ];

    const sizes = ['XS', 'S', 'M', 'L', 'XL'];
    const colors = ['Black', 'White', 'Navy', 'Gray'];

    const renderHeader = () => (
        <>
            {/* Announcement Bar */}
            <div 
                className="px-4 py-2 text-center text-xs font-medium"
                style={{ 
                    background: `linear-gradient(90deg, ${settings.primaryColor}, ${settings.secondaryColor})`,
                    color: 'white'
                }}
            >
                Free shipping on orders over $50! <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Shop now</span>
            </div>

            {/* Header */}
            <div 
                className="px-4 py-3 border-b flex items-center justify-between"
                style={{ 
                    borderColor: settings.mutedTextColor + '30',
                    backgroundColor: settings.headerBg || settings.backgroundColor
                }}
            >
                <div className="flex items-center gap-4">
                    <Menu className="w-5 h-5 md:hidden" style={{ color: settings.headingColor }} />
                    <span style={{ color: settings.headingColor, fontWeight: 700, fontSize: '1.1rem' }}>
                        {customContent.storeName || 'MyStore'}
                    </span>
                </div>
                <div className="hidden md:flex gap-5 text-sm">
                    <span style={{ color: settings.linkColor, cursor: 'pointer' }}>Shop</span>
                    <span style={{ color: settings.linkColor, cursor: 'pointer' }}>Collections</span>
                    <span style={{ color: settings.linkColor, cursor: 'pointer' }}>About</span>
                    <span style={{ color: settings.linkColor, cursor: 'pointer' }}>Contact</span>
                </div>
                <div className="flex items-center gap-3">
                    <Search className="w-5 h-5" style={{ color: settings.mutedTextColor }} />
                    <User className="w-5 h-5" style={{ color: settings.mutedTextColor }} />
                    <div className="relative">
                        <ShoppingCart className="w-5 h-5" style={{ color: settings.headingColor }} />
                        <span 
                            className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-xs flex items-center justify-center"
                            style={{ backgroundColor: settings.primaryColor, color: 'white', fontSize: '10px' }}
                        >
                            2
                        </span>
                    </div>
                </div>
            </div>
        </>
    );

    const renderFooter = () => (
        <div 
            className="px-4 py-4"
            style={{ 
                backgroundColor: settings.footerBg || settings.headingColor,
                color: settings.footerText || settings.backgroundColor
            }}
        >
            <div className="grid grid-cols-3 gap-4 text-xs mb-3">
                <div>
                    <p style={{ fontWeight: 600, marginBottom: '4px', fontSize: '0.7rem' }}>Shop</p>
                    <p style={{ opacity: 0.7, fontSize: '0.65rem' }}>All Products</p>
                    <p style={{ opacity: 0.7, fontSize: '0.65rem' }}>New Arrivals</p>
                </div>
                <div>
                    <p style={{ fontWeight: 600, marginBottom: '4px', fontSize: '0.7rem' }}>Help</p>
                    <p style={{ opacity: 0.7, fontSize: '0.65rem' }}>Contact Us</p>
                    <p style={{ opacity: 0.7, fontSize: '0.65rem' }}>FAQs</p>
                </div>
                <div>
                    <p style={{ fontWeight: 600, marginBottom: '4px', fontSize: '0.7rem' }}>About</p>
                    <p style={{ opacity: 0.7, fontSize: '0.65rem' }}>Our Story</p>
                    <p style={{ opacity: 0.7, fontSize: '0.65rem' }}>Blog</p>
                </div>
            </div>
            <div 
                className="pt-3 text-center"
                style={{ 
                    borderTop: `1px solid ${settings.backgroundColor}20`,
                    fontSize: '0.6rem',
                    opacity: 0.6
                }}
            >
                © 2024 MyStore. All rights reserved.
            </div>
        </div>
    );

    return (
        <div 
            className="rounded-xl overflow-hidden border border-slate-600 transition-all duration-300"
            style={{ 
                backgroundColor: settings.backgroundColor,
                fontFamily: `'${settings.fontFamily}', sans-serif`,
                ...viewportStyles[viewport]
            }}
        >
            {/* Page Tabs */}
            <div className="bg-slate-700 px-2 py-1.5 flex gap-1">
                {['home', 'product', 'collection', 'blog'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="px-3 py-1 text-xs rounded transition-colors"
                        style={{
                            backgroundColor: activeTab === tab ? settings.primaryColor : 'transparent',
                            color: activeTab === tab ? 'white' : '#94a3b8'
                        }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {renderHeader()}

            {/* Home Tab */}
            {activeTab === 'home' && (
                <>
                    {/* Hero Section */}
            <div 
                className="px-5 py-8 text-center"
                style={{ 
                    background: `linear-gradient(135deg, ${settings.primaryColor}15, ${settings.secondaryColor}15)`
                }}
            >
                <h1 style={{ 
                    color: settings.headingColor, 
                    fontSize: '1.5rem', 
                    fontWeight: 700,
                    marginBottom: '0.5rem'
                }}>
                    {customContent.heroTitle || 'New Arrivals'}
                </h1>
                <p style={{ color: settings.mutedTextColor, fontSize: '0.9rem', marginBottom: '1rem' }}>
                    Discover our latest collection
                </p>
                <button
                    style={{
                        background: `linear-gradient(135deg, ${settings.primaryColor} 0%, ${settings.secondaryColor} 100%)`,
                        borderRadius: `${settings.borderRadius}px`,
                        padding: `${settings.buttonPadding * 0.7}px ${settings.buttonPadding * 1.5}px`,
                        fontWeight: 600,
                        color: 'white',
                        border: 'none',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        boxShadow: `0 4px ${settings.shadowIntensity / 2}px rgba(102, 126, 234, ${settings.shadowIntensity / 100})`
                    }}
                >
                    Shop Collection
                </button>
            </div>

            {/* Product Grid */}
            <div className="p-4">
                <h2 style={{ 
                    color: settings.headingColor, 
                    fontSize: '1rem', 
                    fontWeight: 600,
                    marginBottom: '0.75rem'
                }}>
                    Featured Products
                </h2>
                <div className="grid grid-cols-3 gap-3">
                    {products.map((product, idx) => (
                        <div 
                            key={idx}
                            className="cursor-pointer transition-all duration-300"
                            style={{
                                borderRadius: `${settings.borderRadius}px`,
                                overflow: 'hidden',
                                backgroundColor: settings.backgroundColor,
                                boxShadow: hoveredCard === idx 
                                    ? `0 12px 30px rgba(0, 0, 0, 0.15)` 
                                    : `0 2px 8px rgba(0, 0, 0, 0.08)`,
                                transform: hoveredCard === idx ? 'translateY(-4px)' : 'translateY(0)',
                                border: `1px solid ${settings.mutedTextColor}20`
                            }}
                            onMouseEnter={() => setHoveredCard(idx)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div 
                                className="overflow-hidden"
                                style={{ height: '80px' }}
                            >
                                <img 
                                    src={product.img} 
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500"
                                    style={{
                                        transform: hoveredCard === idx ? 'scale(1.08)' : 'scale(1)'
                                    }}
                                />
                            </div>
                            <div className="p-2">
                                <p style={{ 
                                    color: settings.headingColor, 
                                    fontSize: '0.7rem', 
                                    fontWeight: 600,
                                    marginBottom: '2px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {product.name}
                                </p>
                                <div className="flex items-center gap-1">
                                    <span style={{ color: settings.primaryColor, fontSize: '0.7rem', fontWeight: 700 }}>
                                        {product.price}
                                    </span>
                                    {product.oldPrice && (
                                        <span style={{ 
                                            color: settings.mutedTextColor, 
                                            fontSize: '0.6rem', 
                                            textDecoration: 'line-through' 
                                        }}>
                                            {product.oldPrice}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Section */}
            <div className="px-4 py-4" style={{ backgroundColor: settings.mutedTextColor + '10' }}>
                <h3 style={{ 
                    color: settings.headingColor, 
                    fontSize: '0.85rem', 
                    fontWeight: 600,
                    marginBottom: '0.5rem'
                }}>
                    Newsletter
                </h3>
                <div className="flex gap-2">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 text-xs transition-all duration-200"
                        style={{
                            borderRadius: `${settings.borderRadius}px`,
                            border: `1px solid ${focusedInput === 'email' ? settings.primaryColor : settings.mutedTextColor + '50'}`,
                            padding: '8px 12px',
                            backgroundColor: settings.backgroundColor,
                            color: settings.textColor,
                            outline: 'none',
                            boxShadow: focusedInput === 'email' ? `0 0 0 3px ${settings.primaryColor}20` : 'none'
                        }}
                        onFocus={() => setFocusedInput('email')}
                        onBlur={() => setFocusedInput(null)}
                    />
                    <button
                        style={{
                            background: `linear-gradient(135deg, ${settings.primaryColor} 0%, ${settings.secondaryColor} 100%)`,
                            borderRadius: `${settings.borderRadius}px`,
                            padding: '8px 16px',
                            fontWeight: 600,
                            color: 'white',
                            border: 'none',
                            fontSize: '0.75rem',
                            cursor: 'pointer'
                        }}
                    >
                        Subscribe
                    </button>
                </div>
            </div>
                </>
            )}

            {/* Product Details Tab */}
            {activeTab === 'product' && (
                <div className="p-4">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-1 text-xs mb-3" style={{ color: settings.mutedTextColor }}>
                        <span style={{ color: settings.linkColor, cursor: 'pointer' }}>Home</span>
                        <ChevronRight className="w-3 h-3" />
                        <span style={{ color: settings.linkColor, cursor: 'pointer' }}>Apparel</span>
                        <ChevronRight className="w-3 h-3" />
                        <span>Classic Tee</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Product Image */}
                        <div 
                            className="overflow-hidden"
                            style={{ borderRadius: `${settings.borderRadius}px` }}
                        >
                            <img 
                                src={customContent.productImage || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop"}
                                alt="Product"
                                className="w-full h-auto"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="space-y-3">
                            <div>
                                <p style={{ color: settings.mutedTextColor, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Premium Collection</p>
                                <h1 style={{ color: settings.headingColor, fontSize: '1rem', fontWeight: 700 }}>Classic Cotton Tee</h1>
                                
                                {/* Rating */}
                                <div className="flex items-center gap-1 mt-1">
                                    {[1,2,3,4,5].map(i => (
                                        <Star key={i} className="w-3 h-3" style={{ fill: i <= 4 ? '#fbbf24' : 'transparent', color: '#fbbf24' }} />
                                    ))}
                                    <span style={{ color: settings.mutedTextColor, fontSize: '0.6rem', marginLeft: '4px' }}>(128 reviews)</span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-2">
                                <span style={{ color: settings.primaryColor, fontSize: '1.1rem', fontWeight: 700 }}>$49.00</span>
                                <span style={{ color: settings.mutedTextColor, fontSize: '0.8rem', textDecoration: 'line-through' }}>$65.00</span>
                                <span 
                                    style={{ 
                                        background: `${settings.primaryColor}15`, 
                                        color: settings.primaryColor,
                                        fontSize: '0.6rem',
                                        padding: '2px 6px',
                                        borderRadius: `${settings.borderRadius / 2}px`,
                                        fontWeight: 600
                                    }}
                                >
                                    SALE
                                </span>
                            </div>

                            {/* Color Selector */}
                            <div>
                                <p style={{ color: settings.headingColor, fontSize: '0.7rem', fontWeight: 600, marginBottom: '4px' }}>Color: {selectedColor}</p>
                                <div className="flex gap-2">
                                    {colors.map(color => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className="w-6 h-6 rounded-full border-2 transition-all"
                                            style={{
                                                backgroundColor: color.toLowerCase(),
                                                borderColor: selectedColor === color ? settings.primaryColor : settings.mutedTextColor + '30'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Size Selector */}
                            <div>
                                <p style={{ color: settings.headingColor, fontSize: '0.7rem', fontWeight: 600, marginBottom: '4px' }}>Size</p>
                                <div className="flex gap-1">
                                    {sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedVariant(size)}
                                            className="px-2 py-1 text-xs transition-all"
                                            style={{
                                                borderRadius: `${settings.borderRadius / 2}px`,
                                                border: `1px solid ${selectedVariant === size ? settings.primaryColor : settings.mutedTextColor + '50'}`,
                                                backgroundColor: selectedVariant === size ? settings.primaryColor : 'transparent',
                                                color: selectedVariant === size ? 'white' : settings.textColor,
                                                fontWeight: selectedVariant === size ? 600 : 400
                                            }}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div>
                                <p style={{ color: settings.headingColor, fontSize: '0.7rem', fontWeight: 600, marginBottom: '4px' }}>Quantity</p>
                                <div 
                                    className="inline-flex items-center"
                                    style={{ 
                                        border: `1px solid ${settings.mutedTextColor}30`,
                                        borderRadius: `${settings.borderRadius}px`
                                    }}
                                >
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-2 py-1"
                                        style={{ color: settings.textColor }}
                                    >
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="px-3 text-xs" style={{ color: settings.textColor }}>{quantity}</span>
                                    <button 
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-2 py-1"
                                        style={{ color: settings.textColor }}
                                    >
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart */}
                            <button
                                className="w-full flex items-center justify-center gap-2"
                                style={{
                                    background: `linear-gradient(135deg, ${settings.primaryColor} 0%, ${settings.secondaryColor} 100%)`,
                                    borderRadius: `${settings.borderRadius}px`,
                                    padding: `${settings.buttonPadding * 0.6}px`,
                                    fontWeight: 600,
                                    color: 'white',
                                    border: 'none',
                                    fontSize: '0.75rem',
                                    cursor: 'pointer',
                                    boxShadow: `0 4px ${settings.shadowIntensity / 2}px rgba(102, 126, 234, ${settings.shadowIntensity / 100})`
                                }}
                            >
                                <ShoppingCart className="w-4 h-4" />
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${settings.mutedTextColor}20` }}>
                        <h3 style={{ color: settings.headingColor, fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>Description</h3>
                        <p style={{ color: settings.textColor, fontSize: '0.7rem', lineHeight: 1.6 }}>
                            Premium cotton tee with a relaxed fit. Made from 100% organic cotton for ultimate comfort. Perfect for everyday wear.
                        </p>
                    </div>
                </div>
            )}

            {/* Collection Tab */}
            {activeTab === 'collection' && (
                <div className="p-4">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-1 text-xs mb-3" style={{ color: settings.mutedTextColor }}>
                        <span style={{ color: settings.linkColor, cursor: 'pointer' }}>Home</span>
                        <ChevronRight className="w-3 h-3" />
                        <span>Summer Collection</span>
                    </div>

                    {/* Collection Header */}
                    <div className="mb-4">
                        <h1 style={{ color: settings.headingColor, fontSize: '1.2rem', fontWeight: 700 }}>Summer Collection</h1>
                        <p style={{ color: settings.mutedTextColor, fontSize: '0.75rem' }}>24 products</p>
                    </div>

                    {/* Filter Bar */}
                    <div 
                        className="flex items-center justify-between mb-4 pb-3"
                        style={{ borderBottom: `1px solid ${settings.mutedTextColor}20` }}
                    >
                        <div className="flex gap-2">
                            <select 
                                className="text-xs px-2 py-1"
                                style={{
                                    borderRadius: `${settings.borderRadius / 2}px`,
                                    border: `1px solid ${settings.mutedTextColor}30`,
                                    backgroundColor: settings.backgroundColor,
                                    color: settings.textColor
                                }}
                            >
                                <option>All Categories</option>
                                <option>Tops</option>
                                <option>Bottoms</option>
                            </select>
                            <select 
                                className="text-xs px-2 py-1"
                                style={{
                                    borderRadius: `${settings.borderRadius / 2}px`,
                                    border: `1px solid ${settings.mutedTextColor}30`,
                                    backgroundColor: settings.backgroundColor,
                                    color: settings.textColor
                                }}
                            >
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Newest</option>
                            </select>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-3 gap-3">
                        {collectionProducts.map((product, idx) => (
                            <div 
                                key={idx}
                                className="cursor-pointer transition-all duration-300"
                                style={{
                                    borderRadius: `${settings.borderRadius}px`,
                                    overflow: 'hidden',
                                    backgroundColor: settings.backgroundColor,
                                    boxShadow: hoveredCard === `col-${idx}` 
                                        ? `0 12px 30px rgba(0, 0, 0, 0.15)` 
                                        : `0 2px 8px rgba(0, 0, 0, 0.08)`,
                                    transform: hoveredCard === `col-${idx}` ? 'translateY(-4px)' : 'translateY(0)',
                                    border: `1px solid ${settings.mutedTextColor}20`
                                }}
                                onMouseEnter={() => setHoveredCard(`col-${idx}`)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div className="overflow-hidden relative" style={{ height: '70px' }}>
                                    <img 
                                        src={product.img} 
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500"
                                        style={{ transform: hoveredCard === `col-${idx}` ? 'scale(1.08)' : 'scale(1)' }}
                                    />
                                    {product.oldPrice && (
                                        <span 
                                            className="absolute top-1 left-1 text-white px-1.5 py-0.5"
                                            style={{ 
                                                background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`,
                                                fontSize: '0.5rem',
                                                borderRadius: `${settings.borderRadius / 2}px`,
                                                fontWeight: 600
                                            }}
                                        >
                                            SALE
                                        </span>
                                    )}
                                </div>
                                <div className="p-2">
                                    <p style={{ color: settings.headingColor, fontSize: '0.65rem', fontWeight: 600, marginBottom: '2px' }}>
                                        {product.name}
                                    </p>
                                    <div className="flex items-center gap-1">
                                        <span style={{ color: settings.primaryColor, fontSize: '0.65rem', fontWeight: 700 }}>
                                            {product.price}
                                        </span>
                                        {product.oldPrice && (
                                            <span style={{ color: settings.mutedTextColor, fontSize: '0.55rem', textDecoration: 'line-through' }}>
                                                {product.oldPrice}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Blog Tab */}
            {activeTab === 'blog' && (
                <div className="p-4">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-1 text-xs mb-3" style={{ color: settings.mutedTextColor }}>
                        <span style={{ color: settings.linkColor, cursor: 'pointer' }}>Home</span>
                        <ChevronRight className="w-3 h-3" />
                        <span style={{ color: settings.linkColor, cursor: 'pointer' }}>Blog</span>
                        <ChevronRight className="w-3 h-3" />
                        <span>Style Guide</span>
                    </div>

                    {/* Blog Post */}
                    <article>
                        {/* Featured Image */}
                        <div 
                            className="overflow-hidden mb-4"
                            style={{ borderRadius: `${settings.borderRadius}px` }}
                        >
                            <img 
                                src={customContent.heroBackground || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop"}
                                alt="Blog"
                                className="w-full h-24 object-cover"
                            />
                        </div>

                        {/* Meta */}
                        <div className="flex items-center gap-3 mb-2">
                            <span 
                                className="px-2 py-0.5 text-xs"
                                style={{ 
                                    backgroundColor: `${settings.primaryColor}15`, 
                                    color: settings.primaryColor,
                                    borderRadius: `${settings.borderRadius / 2}px`,
                                    fontWeight: 500
                                }}
                            >
                                Style Guide
                            </span>
                            <div className="flex items-center gap-1" style={{ color: settings.mutedTextColor, fontSize: '0.65rem' }}>
                                <Calendar className="w-3 h-3" />
                                Nov 28, 2024
                            </div>
                            <div className="flex items-center gap-1" style={{ color: settings.mutedTextColor, fontSize: '0.65rem' }}>
                                <Clock className="w-3 h-3" />
                                5 min read
                            </div>
                        </div>

                        {/* Title */}
                        <h1 style={{ color: settings.headingColor, fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>
                            10 Ways to Style Your Summer Wardrobe
                        </h1>

                        {/* Author */}
                        <div className="flex items-center gap-2 mb-4">
                            <div 
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: settings.primaryColor }}
                            />
                            <div>
                                <p style={{ color: settings.headingColor, fontSize: '0.7rem', fontWeight: 600 }}>Sarah Johnson</p>
                                <p style={{ color: settings.mutedTextColor, fontSize: '0.6rem' }}>Fashion Editor</p>
                            </div>
                        </div>

                        {/* Content */}
                        <div style={{ color: settings.textColor, fontSize: '0.75rem', lineHeight: 1.7 }}>
                            <p className="mb-3">
                                Summer is here, and it's time to refresh your wardrobe with some exciting new looks. Whether you're heading to the beach or a casual brunch, we've got you covered.
                            </p>
                            <h2 style={{ color: settings.headingColor, fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                                1. Layer Light Fabrics
                            </h2>
                            <p className="mb-3">
                                Don't be afraid to layer even in summer. Light linens and cotton pieces can add depth to your outfit while keeping you cool.
                            </p>
                            <a href="#" style={{ color: settings.linkColor, fontWeight: 500 }}>
                                Shop Summer Collection →
                            </a>
                        </div>

                        {/* Comments Section */}
                        <div 
                            className="mt-4 pt-4"
                            style={{ borderTop: `1px solid ${settings.mutedTextColor}20` }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <MessageCircle className="w-4 h-4" style={{ color: settings.headingColor }} />
                                <h3 style={{ color: settings.headingColor, fontSize: '0.8rem', fontWeight: 600 }}>Comments (3)</h3>
                            </div>

                            {/* Comment */}
                            <div 
                                className="p-3 mb-2"
                                style={{ 
                                    backgroundColor: settings.mutedTextColor + '10',
                                    borderRadius: `${settings.borderRadius}px`
                                }}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-5 h-5 rounded-full" style={{ backgroundColor: settings.secondaryColor }} />
                                    <span style={{ color: settings.headingColor, fontSize: '0.7rem', fontWeight: 600 }}>Emily R.</span>
                                    <span style={{ color: settings.mutedTextColor, fontSize: '0.6rem' }}>2 days ago</span>
                                </div>
                                <p style={{ color: settings.textColor, fontSize: '0.7rem' }}>
                                    Love these tips! The layering idea is genius. 
                                </p>
                            </div>

                            {/* Comment Form */}
                            <div className="flex gap-2 mt-3">
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    className="flex-1 text-xs"
                                    style={{
                                        borderRadius: `${settings.borderRadius}px`,
                                        border: `1px solid ${settings.mutedTextColor}30`,
                                        padding: '8px 12px',
                                        backgroundColor: settings.backgroundColor,
                                        color: settings.textColor
                                    }}
                                />
                                <button
                                    style={{
                                        background: `linear-gradient(135deg, ${settings.primaryColor} 0%, ${settings.secondaryColor} 100%)`,
                                        borderRadius: `${settings.borderRadius}px`,
                                        padding: '8px 12px',
                                        color: 'white',
                                        border: 'none',
                                        fontSize: '0.7rem',
                                        fontWeight: 600
                                    }}
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </article>
                </div>
            )}

            {renderFooter()}
        </div>
    );
}