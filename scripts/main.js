// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function () {
    // Navigation smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
            localStorage.setItem('theme', newTheme);
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-theme', savedTheme);
        themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    // Mobile Navigation with Extended Panel
    const hamburger = document.getElementById('hamburger');
    const mobilePanel = document.querySelector('.mobile-panel');

    function closeMobilePanel() {
        if (hamburger) hamburger.classList.remove('active');
        if (mobilePanel) mobilePanel.classList.remove('active');
        document.body.classList.remove('mobile-panel-open');
    }

    if (hamburger && mobilePanel) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            mobilePanel.classList.toggle('active');
            document.body.classList.toggle('mobile-panel-open');
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', closeMobilePanel);
        });
    }
});

// YouTube Modal Functions
window.openYouTubeModal = function (videoId) {
    const modal = document.getElementById('youtubeModal');
    const iframe = document.getElementById('youtubeVideo');
    if (modal && iframe) {
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
};

window.closeYouTubeModal = function () {
    const modal = document.getElementById('youtubeModal');
    const iframe = document.getElementById('youtubeVideo');
    if (modal && iframe) {
        iframe.src = '';
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
};

// Close modal when clicking outside
window.addEventListener('click', function (event) {
    const modal = document.getElementById('youtubeModal');
    if (event.target === modal) {
        window.closeYouTubeModal();
    }
});
