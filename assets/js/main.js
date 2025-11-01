// ==============================
// Main JS for Tech Portfolio (no-optional-chaining build)
// ==============================
document.addEventListener('DOMContentLoaded', function() {
    // ---------- Mobile Nav Toggle ----------
    try {
        var toggle = document.querySelector('.nav-toggle');
        var nav = document.querySelector('.nav');
        if (toggle && nav) {
            toggle.addEventListener('click', function() {
                nav.classList.toggle('open');
            });
        }
    } catch (e) { console.warn('[nav-toggle]', e); }

    // ---------- Theme Switch ----------
    try {
        var themeBtn = document.getElementById('themeSwitch');
        var root = document.documentElement;
        var saved = null;
        try { saved = localStorage.getItem('theme'); } catch (_) {}
        var systemLight = false;
        try { systemLight = window.matchMedia('(prefers-color-scheme: light)').matches; } catch (_) {}

        var initial = saved || (systemLight ? 'light' : 'dark');
        if (initial === 'light') root.classList.add('light');

        if (themeBtn) {
            themeBtn.addEventListener('click', function() {
                root.classList.toggle('light');
                try {
                    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
                } catch (_) {}
            });
        }
    } catch (e) { console.warn('[theme]', e); }

    // ---------- Active Link Highlight ----------
    try {
        var current = location.pathname.split('/').pop() || 'index.html';
        var links = document.querySelectorAll('.nav a');
        for (var i = 0; i < links.length; i++) {
            var a = links[i];
            var href = a.getAttribute('href');
            if (href === current) a.classList.add('active');
            if ((current === '' || current === 'index.html') && href === 'index.html') {
                a.classList.add('active');
            }
        }
    } catch (e) { console.warn('[active-link]', e); }

    // ---------- Hero Slider ----------
    (function heroSlider() {
        var track = document.getElementById('heroSlides');
        if (!track) return; // 非首頁不啟動

        var slides = [];
        for (var i = 0; i < track.children.length; i++) {
            var el = track.children[i];
            if (el.tagName === 'IMG' || el.tagName === 'DIV') slides.push(el);
        }
        var dotsWrap = document.getElementById('heroDots');
        var prev = document.querySelector('.ctrl.prev');
        var next = document.querySelector('.ctrl.next');

        if (!slides.length) return;
        if (slides.length === 1) {
            if (prev) prev.setAttribute('hidden', 'true');
            if (next) next.setAttribute('hidden', 'true');
            if (dotsWrap) dotsWrap.style.display = 'none';
            return;
        }

        // 建立圓點
        var dots = [];
        if (dotsWrap) {
            for (var d = 0; d < slides.length; d++) {
                var b = document.createElement('button');
                if (d === 0) b.classList.add('active');
                dotsWrap.appendChild(b);
                (function(idx, btn) {
                    btn.addEventListener('click', function() { goTo(idx); });
                })(d, b);
                dots.push(b);
            }
        }

        var index = 0;

        function width() {
            var rect = track.getBoundingClientRect();
            return Math.round(rect.width) || track.clientWidth || 1;
        }

        function setDots(i) {
            for (var k = 0; k < dots.length; k++) {
                if (i === k) dots[k].classList.add('active');
                else dots[k].classList.remove('active');
            }
        }

        function goTo(i, smooth) {
            if (smooth === void 0) smooth = true;
            index = (i + slides.length) % slides.length;
            try {
                track.scrollTo({ left: index * width(), behavior: smooth ? 'smooth' : 'auto' });
            } catch (e) {
                track.scrollLeft = index * width();
            }
            setDots(index);
        }

        function nearestIndex() {
            var w = width();
            return Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / w)));
        }

        if (prev) prev.addEventListener('click', function() { goTo(index - 1); });
        if (next) next.addEventListener('click', function() { goTo(index + 1); });

        // 尺寸變化
        if ('ResizeObserver' in window) {
            try {
                var ro = new ResizeObserver(function() { goTo(nearestIndex(), false); });
                ro.observe(track);
                window.addEventListener('beforeunload', function() { try { ro.disconnect(); } catch (_) {} });
            } catch (_) {
                window.addEventListener('resize', function() { goTo(nearestIndex(), false); });
            }
        } else {
            window.addEventListener('resize', function() { goTo(nearestIndex(), false); });
        }

        // 滾動同步圓點
        var t;
        track.addEventListener('scroll', function() {
            clearTimeout(t);
            t = setTimeout(function() {
                index = nearestIndex();
                setDots(index);
            }, 80);
        }, { passive: true });

        // 自動播放
        var INTERVAL = 5000;
        var timer = startAutoplay();

        function startAutoplay() { return setInterval(function() { goTo(index + 1); }, INTERVAL); }

        function stopAutoplay() {
            clearInterval(timer);
            timer = null;
        }

        ['touchstart', 'mousedown', 'mouseenter', 'focusin'].forEach(function(evt) {
            track.addEventListener(evt, function() { if (timer) stopAutoplay(); }, { passive: true });
        });
        ['mouseleave', 'focusout'].forEach(function(evt) {
            track.addEventListener(evt, function() { if (!timer) timer = startAutoplay(); });
        });
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) stopAutoplay();
            else if (!timer) timer = startAutoplay();
        });

        // 鍵盤
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' && prev) prev.click();
            if (e.key === 'ArrowRight' && next) next.click();
        });
    })();
});
// ---- Hero intro animation on page load ----
function playHeroIntro() {
    var t = document.getElementById('brandTitle');
    var s = document.getElementById('brandSubtitle');
    var c = document.getElementById('brandCta');

    // 允許重播：先移除再強制回流，重新加上 class
    [t, s, c].forEach(function(el) { if (!el) return;
        el.classList.remove('reveal', 'del-1', 'del-2'); });
    // 強制回流以重置動畫（關鍵）
    void document.body.offsetWidth;

    if (t) t.classList.add('reveal');
    if (s) s.classList.add('reveal', 'del-1');
    if (c) c.classList.add('reveal', 'del-2');
}

document.addEventListener('DOMContentLoaded', playHeroIntro);

//（可選）點 Logo 或標題重播一次
var titleEl = document.getElementById('brandTitle');
if (titleEl) titleEl.addEventListener('click', playHeroIntro);

//（可選）從其他分頁切回來時重播
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) playHeroIntro();
});