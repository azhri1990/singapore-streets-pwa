// MobileUISystem.js - Responsive mobile UI system
// Enables breakpoints, touch-friendly layouts, and adaptive UI elements

export class MobileUISystem {
    constructor(game) {
        this.game = game;
        this.isMobile = this.detectMobileDevice();
        this.breakpoints = this.detectBreakpoints();
        this.touchTargets = [];
        this.responsiveStyle = null;
        
        // Initialize responsive stylesheet
        this.setupResponsiveStyles();
        
        // Track touch targets for minimum size enforcement
        this.trackTouchTargetSize();
    }
    
    detectMobileDevice() {
        return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent) ||
               window.innerWidth < 768;
    }
    
    detectBreakpoints() {
        const screenWidth = window.innerWidth;
        
        const breakpoints = {
            xs:  { max: 320,  label: 'Small phone' },
            sm:  { max: 374,  label: 'Standard phone' },
            md:  { max: 480,  label: 'Large phone' },
            lg:  { max: 768,  label: 'Tablet / Foldable' },
            xl:  { max: Infinity, label: 'Desktop / Large screen' }
        };
        
        return breakpoints;
    }
    
    setupResponsiveStyles() {
        if (!this.isMobile) return;
        
        // Create adaptive style object
        this.responsiveStyle = new Map();
        
        // Base styles - remove tap highlights for performance
        const baseStyles = {
            body: {
                '-webkit-tap-highlight-color': 'transparent',
                '-webkit-touch-callout': 'none',
                'touch-action': 'manipulation',
                userSelect: 'none',
                MozUserSelect: 'none'
            },
            button: {
                minHeight: '48px',
                minWidth: '48px',
                minFontSize: '16px',
                paddingX: '16px',
                borderRadius: '8px'
            },
            nav: {
                position: 'fixed',
                bottom: '0',
                left: '0',
                right: '0',
                background: 'rgba(0,0,0,0.85)',
                padding: '8px 12px',
                zIndex: '10000',
                display: 'flex',
                gap: '8px',
                justifyContent: 'center'
            },
            'nav-button': {
                minHeight: '48px',
                width: 'auto',
                maxWidth: '80px',
                padding: '8px 12px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background 0.2s, transform 0.1s'
            },
            'nav-button:active': {
                background: 'rgba(255,255,255,0.3)'
            },
            hud: {
                position: 'fixed',
                top: '10px',
                left: '10px',
                zIndex: '9999',
                fontFamily: 'monospace',
                fontSize: '12px',
                color: '#fff',
                textShadow: '0 0 2px rgba(0,0,0,0.8)',
                lineHeight: '1.4'
            }
        };
        
        for (const [selector, styles] of Object.entries(baseStyles)) {
            this.responsiveStyle.set(selector, styles);
        }
        
        // Scale controls based on breakpoint
        this.applyBreakpointScale();
        
        // Add resize listener for real-time adjustment
        window.addEventListener('resize', () => {
            this.applyBreakpointScale();
        });
    }
    
    applyBreakpointScale() {
        const width = window.innerWidth;
        const scale = this.getScaleForWidth(width);
        
        // Scale touch zones and UI elements proportionally
        if (this.responsiveStyle.has('body')) {
            this.responsiveStyle.get('body').scaleFactor = scale;
        }
        if (this.responsiveStyle.has('nav')) {
            this.responsiveStyle.get('nav').scaleFactor = scale;
        }
        
        console.log(`[MobileUISystem] Breakpoint scale applied: ${scale}x for ${width}px width`);
    }
    
    getScaleForWidth(width) {
        switch (true) {
            case width <= 320:  return 0.5;  // xs
            case width <= 374:   return 0.65;  // sm
            case width <= 480:   return 0.75;  // md
            case width <= 768:   return 1.0;   // lg
            default:            return 1.2;   // xl+
        }
    }
    
    trackTouchTargetSize() {
        // Find all interactive elements and enforce 48px minimum
        const selectors = [
            'button',
            '[onclick]',
            '.interactive',
            '[data-interactive]',
            'input',
            'textarea',
            'select'
        ];
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.width < 48 || rect.height < 48) {
                    console.warn(
                        `[MobileUISystem] Element "${el.id || selector}" ` +
                        `has size ${rect.width}x${rect.height} < 48px, will be auto-enlarged`
                    );
                    // Auto-enlarge element if smaller than 48px
                    el.style.minWidth = '48px';
                    el.style.minHeight = '48px';
                    el.style.fontSize = '16px';
                }
            });
        });
    }
    
    createAdaptiveLayout(options = {}) {
        if (!this.isMobile) return null;
        
        const config = {
            breakpoints: this.breakpoints,
            layouts: {},
            ...options
        };
        
        // Default mobile-first layout configuration
        config.layouts['xs'] = {
            width: '320px',
            height: 'mobile',
            controls: 'compact',
            panels: 'collapsed',
            hud: 'compact'
        };
        config.layouts['sm'] = {
            width: '374px',
            height: 'mobile',
            controls: 'compact',
            panels: 'collapsed',
            hud: 'normal'
        };
        config.layouts['md'] = {
            width: '480px',
            height: 'tablet',
            controls: 'comfortable',
            panels: 'collapsed',
            hud: 'expanded'
        };
        config.layouts['lg'] = {
            width: '768px',
            height: 'tablet',
            controls: 'comfortable',
            panels: 'expanded',
            hud: 'expanded'
        };
        
        return config;
    }
    
    getCurrentBreakpoint() {
        const width = window.innerWidth;
        const breakpoints = this.breakpoints;
        
        let current = 'xs';
        for (const [name, bp] of Object.entries(breakpoints)) {
            if (width <= bp.max) {
                current = name;
                break;
            }
        }
        
        return current;
    }
    
    getLayoutForBreakpoint(breakpoint) {
        const layout = this.createAdaptiveLayout();
        if (!layout) return null;
        return layout.layouts[breakpoint];
    }
    
    forceResponsiveMode() {
        if (!this.isMobile) return false;
        document.body.classList.add('mobile-ui');
        this.applyBreakpointScale();
        return true;
    }
    
    cleanup() {
        window.removeEventListener('resize', this.onResizeHandler);
        this.responsiveStyle?.clear();
    }
}
