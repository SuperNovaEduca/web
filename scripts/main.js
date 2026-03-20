// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Navigation smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Only prevent default and smooth scroll for anchor links (starting with #)
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

    // Hero buttons functionality
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('Nuestro Trabajo')) {
                const proyectosSection = document.querySelector('#proyectos');
                if (proyectosSection) {
                    proyectosSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
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
            
            // Update toggle icon
            if (newTheme === 'dark') {
                themeToggle.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            }
            
            // Update logos based on theme
            updateLogos(newTheme);
            
            // Update navbar background immediately
            updateNavbarBackground();
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            themeToggle.textContent = '☀️';
        } else {
            themeToggle.textContent = '🌙';
        }
        
        // Update mobile panel theme toggle on page load
        const mobilePanelThemeToggle = document.querySelector('.mobile-panel-theme-toggle');
        if (mobilePanelThemeToggle) {
            if (savedTheme === 'dark') {
                mobilePanelThemeToggle.textContent = '☀️';
            } else {
                mobilePanelThemeToggle.textContent = '🌙';
            }
        }
        
        // Update logos on page load
        updateLogos(savedTheme);
    }

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        updateNavbarBackground();
    });
    
    // Update navbar background when theme changes
    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        const currentTheme = html.getAttribute('data-theme') || 'dark';
        
        if (window.scrollY > 50) {
            if (currentTheme === 'light') {
                navbar.style.background = 'rgba(248, 250, 252, 0.98)';
            } else {
                navbar.style.background = 'rgba(15, 20, 25, 0.98)';
            }
        } else {
            if (currentTheme === 'light') {
                navbar.style.background = 'rgba(248, 250, 252, 0.95)';
            } else {
                navbar.style.background = 'rgba(15, 20, 25, 0.95)';
            }
        }
    }
    
    // Función optimizada para actualizar logos
    function updateLogos(theme) {
        const isSubdirectory = window.location.pathname.includes('/paraguay/');
        const pathPrefix = isSubdirectory ? '../images/' : 'images/';
        
        const logoConfigs = {
            '.logo-supernova-header': {
                dark: 'header-alternativo.png',
                light: 'SupernovaHeder.png'
            },
            '.logo-header-alternativo': {
                dark: 'header-alternativo.png',
                light: 'SupernovaHeder.png'
            },
            '.logo-supernova-bienvenido': {
                dark: 'bienvenido alternativo.png',
                light: 'Supernovabienvenido.png'
            },
            '.logo-bienvenido-alternativo': {
                dark: 'bienvenido alternativo.png',
                light: 'Supernovabienvenido.png'
            },
            '.logo-mobile-panel': {
                dark: 'bienvenido alternativo.png',
                light: 'Supernovabienvenido.png'
            }
        };
        
        Object.entries(logoConfigs).forEach(([selector, config]) => {
            const element = document.querySelector(selector);
            if (element) {
                const imageName = config[theme];
                element.src = selector.includes('bienvenido') && !isSubdirectory 
                    ? `images/${imageName}` 
                    : `${pathPrefix}${imageName}`;
            }
        });
    }
    
    // Mobile Navigation with Extended Panel
    const hamburger = document.getElementById('hamburger');
    const mobilePanel = document.querySelector('.mobile-panel');
    const mobilePanelClose = document.querySelector('.mobile-panel-close');

    function closeMobilePanel() {
        if (hamburger) hamburger.classList.remove('active');
        if (mobilePanel) mobilePanel.classList.remove('active');
        document.body.classList.remove('mobile-panel-open');
    }

    if (hamburger && mobilePanel) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobilePanel.classList.toggle('active');
            document.body.classList.toggle('mobile-panel-open');
        });

        if (mobilePanelClose) {
            mobilePanelClose.addEventListener('click', closeMobilePanel);
        }

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', closeMobilePanel);
        });

        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !mobilePanel.contains(event.target)) {
                closeMobilePanel();
            }
        });

        const mobilePanelThemeToggle = document.querySelector('.mobile-panel-theme-toggle');
        if (mobilePanelThemeToggle) {
            mobilePanelThemeToggle.addEventListener('click', () => {
                const currentTheme = html.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                html.setAttribute('data-theme', newTheme);
                
                const mainThemeToggle = document.getElementById('theme-toggle');
                if (newTheme === 'dark') {
                    if (mainThemeToggle) mainThemeToggle.textContent = '☀️';
                    mobilePanelThemeToggle.textContent = '☀️';
                    localStorage.setItem('theme', 'dark');
                } else {
                    if (mainThemeToggle) mainThemeToggle.textContent = '🌙';
                    mobilePanelThemeToggle.textContent = '🌙';
                    localStorage.setItem('theme', 'light');
                }
                
                updateLogos(newTheme);
                updateNavbarBackground();
            });
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.project-card, .team-member, .achievement-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});