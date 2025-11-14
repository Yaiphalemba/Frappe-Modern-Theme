// modern_theme.js
// - Loads theme settings (background images) from backend
// - Watches for theme changes and applies appropriate background

(function () {

    function stripCardBackgrounds() {
        // Target all card elements and apply glossy effect
        const selectors = [
            '.frappe-card',
            '.page-card',
            '.card',
            '.list-row',
            '.result',
            '.list-header',
            '.widget.dashboard-widget-box',
            '.ce-block__content'
        ];

        const theme = document.body.getAttribute('data-theme') || 'light';
        const bgColor = theme === 'dark' 
            ? 'rgba(20, 22, 24, 0.15)'
            : 'rgba(255, 255, 255, 0.15)';

        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                // Remove conflicting background styles
                el.style.removeProperty('background-image');
                
                // Set to glossy background
                el.style.setProperty('background-color', bgColor, 'important');
                el.style.setProperty('-webkit-backdrop-filter', 'blur(12px)', 'important');
                el.style.setProperty('backdrop-filter', 'blur(12px)', 'important');
                
                // Also strip backgrounds from all direct children
                el.querySelectorAll('*').forEach(child => {
                    const computedStyle = window.getComputedStyle(child);
                    if (computedStyle.backgroundColor === 'rgb(255, 255, 255)' ||
                        computedStyle.backgroundColor === 'rgba(255, 255, 255, 1)') {
                        child.style.setProperty('background-color', 'transparent', 'important');
                    }
                });
            });
        });
    }

    function init() {

        // -------------------------------------------------------
        // 1️⃣ Fetch background settings
        // -------------------------------------------------------
        fetch('/api/method/frappe_modern_theme.api.get_theme_settings')
            .then(r => r.json())
            .then(data => {
                const s = data.message;
                
                console.log('[Modern Theme] Settings loaded:', s);

                if (!s.enable) {
                    console.log('[Modern Theme] Wallpaper disabled');
                    return;
                }

                // Apply light and dark backgrounds
                if (s.light_bg) {
                    const lightUrl = s.light_bg.startsWith('/') ? s.light_bg : `/${s.light_bg}`;
                    document.documentElement.style.setProperty('--bg-light', `url('${lightUrl}')`);
                    console.log('[Modern Theme] Light BG set:', lightUrl);
                }

                if (s.dark_bg) {
                    const darkUrl = s.dark_bg.startsWith('/') ? s.dark_bg : `/${s.dark_bg}`;
                    document.documentElement.style.setProperty('--bg-dark', `url('${darkUrl}')`);
                    console.log('[Modern Theme] Dark BG set:', darkUrl);
                }

                // Apply current theme
                const t = document.body.getAttribute('data-theme') || 'light';
                applyThemeVars(t);
            })
            .catch(err => console.error("[Modern Theme] Failed to load theme settings:", err));

        // -------------------------------------------------------
        // 2️⃣ Watch for theme changes
        // -------------------------------------------------------
        const observer = new MutationObserver(function (mutations) {
            for (const m of mutations) {
                if (m.type === 'attributes' && m.attributeName === 'data-theme') {
                    const theme = document.body.getAttribute('data-theme') || 'light';
                    applyThemeVars(theme);
                }
            }
        });

        // -------------------------------------------------------
        // 3️⃣ Strip card backgrounds every 300ms
        // -------------------------------------------------------
        stripCardBackgrounds();
        setInterval(() => {
            stripCardBackgrounds();
        }, 300);

        window.frappe_modern_theme = { applyThemeVars };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();