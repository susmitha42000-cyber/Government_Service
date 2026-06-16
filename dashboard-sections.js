document.addEventListener('DOMContentLoaded', function () {
    const userIdentifier = sessionStorage.getItem('portalCurrentUser') || localStorage.getItem('rememberedLogin') || 'Guest';
    const sectionShell = document.querySelector('.section-shell');
    const sidebar = document.querySelector('.dashboard-sidebar');

    if (sectionShell && sidebar) {
        if (!sidebar.id) {
            sidebar.id = 'dashboardSidebar';
        }

        if (!document.querySelector('.section-mobile-bar')) {
            const mobileBar = document.createElement('div');
            mobileBar.className = 'section-mobile-bar';
            mobileBar.innerHTML = `
                <a href="index.html" class="section-mobile-brand" aria-label="Stackly home">
                    <img src="assets/stackly-whitish_blue-logo.webp" alt="Stackly">
                </a>
                <button class="section-menu-toggle" type="button" aria-label="Open dashboard menu" aria-expanded="false" aria-controls="dashboardSidebar">
                    <span aria-hidden="true"></span>
                </button>
            `;
            sectionShell.insertBefore(mobileBar, sectionShell.firstChild);
        }

        if (!document.querySelector('.section-sidebar-backdrop')) {
            const backdrop = document.createElement('div');
            backdrop.className = 'section-sidebar-backdrop';
            sectionShell.insertBefore(backdrop, sidebar.nextSibling);
        }
    }

    const menuToggle = document.querySelector('.section-menu-toggle');
    const backdrop = document.querySelector('.section-sidebar-backdrop');

    function openMenu() {
        if (!sectionShell || !menuToggle) return;
        sectionShell.classList.add('is-menu-open');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        if (!sectionShell || !menuToggle) return;
        sectionShell.classList.remove('is-menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            if (sectionShell && sectionShell.classList.contains('is-menu-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeMenu);
    }

    document.querySelectorAll('.sidebar-menu a').forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 980) {
                closeMenu();
            }
        });
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 980) {
            closeMenu();
        }
    });

    document.querySelectorAll('[data-user-identifier]').forEach(function (node) {
        node.textContent = userIdentifier;
    });

    document.querySelectorAll('.sidebar-logout-btn').forEach(function (button) {
        button.addEventListener('click', function () {
            sessionStorage.removeItem('portalCurrentUser');
            localStorage.removeItem('rememberedLogin');
            window.location.href = 'index.html';
        });
    });
});
