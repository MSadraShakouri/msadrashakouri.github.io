/* msadrashakouri.ir — progress, reveals, parallax plates, measured drop caps,
   footnote popover, toast. */
(function () {
    'use strict';

    var doc = document;
    var reducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Reading progress bar ---------- */
    var bar = doc.querySelector('.progress-bar');

    function updateProgress() {
        if (!bar) return;
        var el = doc.documentElement;
        var max = el.scrollHeight - el.clientHeight;
        var y = window.pageYOffset || el.scrollTop;
        bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }

    /* ---------- Reveals ----------
       Wide screens: a .movement reveals as one unit.
       Narrow screens: the movement itself is inert and its
       section/plate children animate individually (see CSS). */
    function setupReveals() {
        if (reducedMotion || !('IntersectionObserver' in window)) return;

        var movements = Array.prototype.slice.call(doc.querySelectorAll('.movement'))
            .filter(function (el) { return !el.classList.contains('solo'); });
        var sections = Array.prototype.slice.call(doc.querySelectorAll('.essay-section'));
        var plates = Array.prototype.slice.call(doc.querySelectorAll('.plate'));
        var items = Array.prototype.slice.call(
            doc.querySelectorAll('.faq-item, .repo-card, .repo-footer'));

        movements.forEach(function (el) { el.classList.add('reveal'); });
        sections.forEach(function (el) { el.classList.add('reveal'); });
        plates.forEach(function (el) { el.classList.add('reveal-img'); });
        items.forEach(function (el) { el.classList.add('reveal'); });

        var single = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    single.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

        var stagger = new IntersectionObserver(function (entries) {
            var visible = entries.filter(function (e) { return e.isIntersecting; });
            visible.forEach(function (entry, i) {
                entry.target.style.transitionDelay = Math.min(i * 80, 320) + 'ms';
            });
            visible.forEach(function (entry) {
                entry.target.classList.add('is-visible');
                stagger.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -7% 0px', threshold: 0.06 });

        movements.forEach(function (el) { single.observe(el); });
        sections.forEach(function (el) { single.observe(el); });
        plates.forEach(function (el) { single.observe(el); });
        items.forEach(function (el) { stagger.observe(el); });
    }

    /* ---------- Gentle parallax on plates ---------- */
    var parallaxWraps = Array.prototype.slice.call(
        doc.querySelectorAll('[data-parallax]'));
    var parallaxTick = false;

    function parallaxUpdate() {
        parallaxTick = false;
        var vh = window.innerHeight;
        parallaxWraps.forEach(function (wrap) {
            var img = wrap.querySelector('img');
            if (!img) return;
            var rect = wrap.getBoundingClientRect();
            if (rect.bottom < -100 || rect.top > vh + 100) return;
            var centerDelta = rect.top + rect.height / 2 - vh / 2;
            var offset = Math.max(-1, Math.min(1, centerDelta / (vh / 2)));
            var shift = offset * rect.height * 0.05;
            img.style.transform = 'translate3d(0,' + shift.toFixed(1) + 'px,0)';
        });
    }

    function requestParallax() {
        if (!parallaxTick) {
            parallaxTick = true;
            window.requestAnimationFrame(parallaxUpdate);
        }
    }

    function setupParallax() {
        if (reducedMotion || parallaxWraps.length === 0) return;
        window.addEventListener('scroll', requestParallax, { passive: true });
        window.addEventListener('resize', requestParallax);
        parallaxUpdate();
    }

    /* ---------- Footnote popover (no page scrolling) ---------- */
    function setupFootnotes() {
        var link = doc.querySelector('a.fn-mark');
        var aside = doc.getElementById('fn-lineage');
        if (!link || !aside) return;

        var popover = doc.createElement('div');
        popover.className = 'fn-popover';
        popover.setAttribute('role', 'note');
        popover.hidden = true;

        var close = doc.createElement('button');
        close.type = 'button';
        close.className = 'fn-close';
        close.setAttribute('aria-label', 'Close footnote');
        close.innerHTML = '&#10005;';

        var body = doc.createElement('div');
        var src = aside.querySelector('p');
        if (src) {
            var clone = src.cloneNode(true);
            var back = clone.querySelector('a');
            if (back) back.remove();
            body.innerHTML = clone.innerHTML;
        }

        popover.appendChild(close);
        popover.appendChild(body);
        doc.body.appendChild(popover);

        function place() {
            var rect = link.getBoundingClientRect();
            var vw = window.innerWidth;
            var left = rect.left + rect.width / 2 - 170;
            left = Math.max(16, Math.min(left, vw - 356 - 16));
            var top = rect.bottom + 10;
            if (top + popover.offsetHeight + 12 > window.innerHeight) {
                top = rect.top - popover.offsetHeight - 10;
            }
            popover.style.left = Math.round(left) + 'px';
            popover.style.top = Math.round(top) + 'px';
        }

        function open() {
            popover.hidden = false;
            link.setAttribute('aria-expanded', 'true');
            place();
        }

        function closePop() {
            popover.hidden = true;
            link.setAttribute('aria-expanded', 'false');
        }

        link.addEventListener('click', function (ev) {
            ev.preventDefault();
            if (popover.hidden) open(); else closePop();
        });

        close.addEventListener('click', closePop);

        doc.addEventListener('click', function (ev) {
            if (popover.hidden) return;
            if (!popover.contains(ev.target) && ev.target !== link && !link.contains(ev.target)) {
                closePop();
            }
        });

        doc.addEventListener('keydown', function (ev) {
            if (ev.key === 'Escape' && !popover.hidden) closePop();
        });

        window.addEventListener('resize', function () {
            if (!popover.hidden) place();
        });
    }

    /* ---------- Toast (Guides) ---------- */
    var toastTimer = null;

    function setupToast() {
        var btn = doc.querySelector('[data-guides]');
        if (!btn) return;
        var toast = doc.createElement('div');
        toast.className = 'toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.textContent = 'Guides are on the way — coming soon.';
        doc.body.appendChild(toast);
        btn.addEventListener('click', function () {
            toast.classList.add('show');
            window.clearTimeout(toastTimer);
            toastTimer = window.setTimeout(function () {
                toast.classList.remove('show');
            }, 2600);
        });
    }

    function init() {
        setupReveals();
        setupParallax();
        setupFootnotes();
        setupToast();
        updateProgress();
    }

    if (doc.readyState === 'loading') {
        doc.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
})();
