import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Link, useLocation } from 'wouter';
import './BubbleMenu.css';

interface MenuItem {
    label: string;
    href: string;
    ariaLabel?: string;
    rotation?: number;
    hoverStyles?: {
        bgColor: string;
        textColor: string;
    };
}

interface BubbleMenuProps {
    logo?: React.ReactNode;
    onMenuClick?: (isOpen: boolean) => void;
    className?: string;
    style?: React.CSSProperties;
    menuAriaLabel?: string;
    menuBg?: string;
    menuContentColor?: string;
    useFixedPosition?: boolean;
    items?: MenuItem[];
    animationEase?: string;
    animationDuration?: number;
    staggerDelay?: number;
}

// Updated navigation list for single-page scrolling
const DEFAULT_ITEMS: MenuItem[] = [
    {
        label: 'home',
        href: '#hero',
        ariaLabel: 'Home',
        hoverStyles: { bgColor: '#0f172a', textColor: '#ffffff' }
    },
    {
        label: 'skills',
        href: '#skills',
        ariaLabel: 'Skills',
        hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
    },
    {
        label: 'education',
        href: '#education',
        ariaLabel: 'Education',
        hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
    },
    {
        label: 'experience',
        href: '#experience',
        ariaLabel: 'Experience',
        hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
    },
    {
        label: 'research',
        href: '#research',
        ariaLabel: 'Research',
        hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
    },
    {
        label: 'talks',
        href: '#talks',
        ariaLabel: 'Invited Talks',
        hoverStyles: { bgColor: '#06b6d4', textColor: '#ffffff' }
    },
    {
        label: 'awards',
        href: '#awards',
        ariaLabel: 'Awards',
        hoverStyles: { bgColor: '#eab308', textColor: '#ffffff' }
    },
    {
        label: 'contact',
        href: '#contact',
        ariaLabel: 'Contact',
        hoverStyles: { bgColor: '#0891b2', textColor: '#ffffff' }
    }
];

export default function BubbleMenu({
    logo,
    onMenuClick,
    className,
    style,
    menuAriaLabel = 'Toggle menu',
    menuBg = '#fff',
    menuContentColor = '#111',
    useFixedPosition = true,
    items,
    animationEase = 'back.out(1.2)',
    animationDuration = 0.4,
    staggerDelay = 0.1
}: BubbleMenuProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [location] = useLocation();

    const overlayRef = useRef<HTMLDivElement>(null);
    const bubblesRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

    const menuItems = items?.length ? items : DEFAULT_ITEMS;
    const containerClassName = ['bubble-menu', useFixedPosition ? 'fixed' : 'absolute', className]
        .filter(Boolean)
        .join(' ');

    const handleToggle = () => {
        const nextState = !isMenuOpen;
        if (nextState) setShowOverlay(true);
        setIsMenuOpen(nextState);
        onMenuClick?.(nextState);
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsMenuOpen(false);
    };

    // Close menu when location changes
    useEffect(() => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    }, [location]);

    useEffect(() => {
        const overlay = overlayRef.current;
        const bubbles = bubblesRef.current.filter(Boolean);
        const labels = labelRefs.current.filter(Boolean);

        if (!overlay || !bubbles.length) return;

        if (isMenuOpen) {
            gsap.killTweensOf([overlay, ...bubbles, ...labels]);
            gsap.set(overlay, { xPercent: 100, autoAlpha: 1 });
            gsap.set(bubbles, { x: 30, autoAlpha: 0 });

            const tl = gsap.timeline();
            tl.to(overlay, {
                xPercent: 0,
                duration: 0.5,
                ease: "expo.out"
            });

            tl.to(bubbles, {
                x: 0,
                autoAlpha: 1,
                duration: 0.4,
                ease: "power2.out",
                stagger: 0.05
            }, "-=0.3");
        } else if (showOverlay) {
            const tl = gsap.timeline({
                onComplete: () => {
                    setShowOverlay(false);
                }
            });

            tl.to(bubbles, {
                x: 30,
                autoAlpha: 0,
                duration: 0.3,
                ease: "power2.in",
                stagger: 0.02
            });

            tl.to(overlay, {
                xPercent: 100,
                duration: 0.4,
                ease: "expo.in"
            }, "-=0.2");
        }
    }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

    useEffect(() => {
        const handleResize = () => {
            // Menu items are now vertical and fixed, no special resize logic needed for rotation
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <nav className={containerClassName} style={style} aria-label="Main navigation">
                <div className="bubble logo-bubble" aria-label="Logo" style={{ background: menuBg }}>
                    <span className="logo-content">
                        {typeof logo === 'string' ? (
                            <img src={logo} alt="Logo" className="bubble-logo" />
                        ) : logo ? (
                            logo
                        ) : (
                            <span className="font-serif font-bold text-xl text-primary">NLS <small className="text-[10px] opacity-50">v1.1</small></span>
                        )}
                    </span>
                </div>

                <button
                    type="button"
                    className={`bubble toggle-bubble menu-btn ${isMenuOpen ? 'open' : ''}`}
                    onClick={handleToggle}
                    aria-label={menuAriaLabel}
                    aria-pressed={isMenuOpen}
                    style={{ background: menuBg }}
                >
                    <span className="menu-line" style={{ background: menuContentColor }} />
                    <span className="menu-line short" style={{ background: menuContentColor }} />
                </button>
            </nav>
            {showOverlay && (
                <div
                    ref={overlayRef}
                    className={`bubble-menu-items ${useFixedPosition ? 'fixed' : 'absolute'}`}
                    aria-hidden={!isMenuOpen}
                    onClick={() => setIsMenuOpen(false)}
                >
                    <ul className="pill-list" role="menu" aria-label="Menu links" onClick={(e) => e.stopPropagation()}>
                        {menuItems.map((item, idx) => (
                            <li key={idx} role="none" className="pill-col">
                                <a
                                    href={item.href}
                                    role="menuitem"
                                    aria-label={item.ariaLabel || item.label}
                                    className="pill-link"
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    style={{
                                        '--item-rot': `${item.rotation ?? 0}deg`,
                                        '--pill-bg': menuBg,
                                        '--pill-color': menuContentColor,
                                        '--hover-bg': item.hoverStyles?.bgColor || '#f3f4f6',
                                        '--hover-color': item.hoverStyles?.textColor || menuContentColor
                                    } as React.CSSProperties}
                                    ref={el => {
                                        if (el) bubblesRef.current[idx] = el;
                                    }}
                                >
                                    <span
                                        className="pill-label"
                                        ref={el => {
                                            if (el) labelRefs.current[idx] = el;
                                        }}
                                    >
                                        {item.label}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
