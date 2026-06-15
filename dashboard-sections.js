document.addEventListener('DOMContentLoaded', function () {
    const userIdentifier = sessionStorage.getItem('portalCurrentUser') || localStorage.getItem('rememberedLogin') || 'Guest';
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
