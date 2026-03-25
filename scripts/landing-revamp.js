document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observerObj) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerObj.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // 2. Stats Counter Animation (Innovación Global)
    const statsObserver = new IntersectionObserver((entries, observerObj) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observerObj.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    function animateCounters() {
        const counters = document.querySelectorAll('.stat-num');
        counters.forEach(counter => {
            const targetStr = counter.innerText;
            const target = parseInt(targetStr.replace(/\D/g, ''));
            const suffix = targetStr.replace(/[0-9]/g, '');
            const duration = 2000;
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = target / steps;

            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.innerText = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.ceil(current) + suffix;
                }
            }, stepTime);
        });
    }

    // 3. Generaciones Data & Logic
    const genData = {
        1: {
            year: "2023",
            title: "Primera Generación — Los Fundadores",
            desc: "El grupo pionero que encendió la chispa. Establecieron los primeros nodos, compitieron en FLL por primera vez y estructuraron la metodología de trabajo de alto rendimiento de Supernova.",
            photos: 5
        },
        2: {
            year: "2023 - 2024",
            title: "Segunda Generación — La Expansión",
            desc: "Integraron nuevos talentos y consolidaron proyectos como Un Litro de Luz. Sentaron las bases de la educación interactiva con nuevas metodologías STEAM.",
            photos: 5
        },
        3: {
            year: "2024",
            title: "Tercera Generación — El Salto IoT",
            desc: "Se especializaron en Internet de las Cosas, participando en ferias nacionales con sistemas de domótica y reciclaje tecnológico avanzado.",
            photos: 5
        },
        4: {
            year: "2025",
            title: "Cuarta Generación — Alcance Internacional",
            desc: "Alcanzaron certificaciones internacionales y comenzaron a operar como mentores junior para las nuevas cohortes, liderando el desarrollo de Eco-Bot.",
            photos: 5
        },
        5: {
            year: "2026",
            title: "Quinta Generación — El Legado Continuo",
            desc: "El futuro se escribe hoy. Abriendo nuevos nodos y desarrollando Inteligencia Artificial orientada a sostenibilidad y conservación ambiental.",
            photos: 5
        }
    };

    const genTabs = document.querySelectorAll('.gen-tab');
    const genArea = document.getElementById('gen-content-area');

    function setupGenerationEventListeners() {
        if (!genArea) return;
        genTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                genTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const genId = tab.getAttribute('data-gen');
                renderGeneration(genId);
            });
        });
        // Initial render
        renderGeneration(1);
    }

    function renderGeneration(id) {
        if (!genArea || !genData[id]) return;
        const data = genData[id];

        let photosHtml = '';
        const placeholderIcon = `
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.3;">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
        `;
        for (let i = 1; i <= data.photos; i++) {
            photosHtml += `<div class="gen-photo-box">${placeholderIcon} Gen ${id}</div>`;
        }
        photosHtml += `<div class="gen-photo-box add-photo"><span>📷</span><br>Subir foto</div>`;

        const html = `
            <div class="gen-info fade-in visible">
                <h3 class="gen-year glow-text-cyan">${data.year}</h3>
                <h4 class="gen-title">${data.title}</h4>
                <p class="gen-desc">${data.desc}</p>
                <div class="gen-actions">
                    <button class="btn btn-outline-neon" onclick="document.querySelector('#proyectos').scrollIntoView({behavior: 'smooth'})">VER PROYECTOS</button>
                    <button class="btn btn-outline-neon" onclick="document.querySelector('#generaciones').scrollIntoView({behavior: 'smooth'})">VER TRAYECTORIA</button>
                </div>
            </div>
            <div class="gen-photos fade-in visible">
                ${photosHtml}
            </div>
        `;
        genArea.innerHTML = html;
    }

    // 4. Países Data & Logic
    const paisesData = [
        { id: 'py', code: 'PY', name: 'Paraguay', status: 'visitado', desc: 'Sede de delegación principal. Actividades y proyectos realizados.', url: 'paraguay/index.html' },
        { id: 'cr', code: 'CR', name: 'Costa Rica', status: 'visitado', desc: 'Sede de delegación. UWC y alianzas locales.', url: '#' },
        { id: 'es', code: 'ES', name: 'España', status: 'visitado', desc: 'Intercambio tecnológico y competencia.', url: '#' },
        { id: 'mx', code: 'MX', name: 'México', status: 'por_visitar', desc: 'Apertura de nuevo nodo planeada.', url: '#' },
        { id: 'co', code: 'CO', name: 'Colombia', status: 'por_visitar', desc: 'Semilleros de investigación conjuntos futuros.', url: '#' }
    ];

    const paisesContainer = document.getElementById('paises-container');
    const paisesTabs = document.querySelectorAll('.paises-tab');

    function renderPaises(filter) {
        if (!paisesContainer) return;
        paisesContainer.innerHTML = '';

        const filtered = filter === 'todos'
            ? paisesData
            : paisesData.filter(p => p.status === filter);

        filtered.forEach(p => {
            let statusBadge = '';
            if (p.status === 'visitado') {
                statusBadge = '<span class="pais-status status-visitado">VISITADO</span>';
            } else {
                statusBadge = '<span class="pais-status status-porvisitar">POR VISITAR</span>';
            }

            paisesContainer.innerHTML += `
                <div class="pais-card fade-in visible" ${p.url !== '#' ? `style="cursor:pointer;" onclick="window.location.href='${p.url}'"` : ''}>
                    <div class="pais-code">${p.code}</div>
                    <div class="pais-name">${p.name}</div>
                    ${statusBadge}
                    <p class="pais-desc">${p.desc}</p>
                </div>
            `;
        });
    }

    function setupPaisesEventListeners() {
        if (paisesContainer) {
            renderPaises('todos');
            paisesTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    paisesTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    renderPaises(tab.getAttribute('data-pais'));
                });
            });
        }
    }

    // 5. Galería Interactiva
    const galeriaData = [
        { id: 1, title: 'Ganadores FLL', tag: 'PREMIO', tagClass: 'premio', img: 'images/techvoyage.jpg', fallback: 'https://images.unsplash.com/photo-1563968603417-1833e70cf7c5?w=600&h=400&fit=crop', video: '' },
        { id: 2, title: 'Expo Educación 2024', tag: 'EVENTO', tagClass: 'evento', img: 'images/unlitrodeluz.jpg', fallback: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop', video: '' },
        { id: 3, title: 'Eco-Bot en Acción', tag: 'PROYECTO', tagClass: 'proyecto', img: 'images/smarttouch.jpg', fallback: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop', video: 'mqhqTruwY3A' },
        { id: 4, title: 'Scratch Olympiad', tag: 'COMPETENCIA', tagClass: 'competencia', img: 'images/techvoyage.jpg', fallback: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop', video: '' },
        { id: 5, title: 'Alianza PTI', tag: 'COLABORACIÓN', tagClass: 'proyecto', img: 'images/unlitrodeluz.jpg', fallback: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop', video: '' },
        { id: 6, title: 'Feria Maker CDE', tag: 'FERIA', tagClass: 'evento', img: 'images/smarttouch.jpg', fallback: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop', video: '' }
    ];

    const galeriaContainer = document.getElementById('projects-container');
    const galeriaTabs = document.querySelectorAll('#proyectos .filter-btn');

    function renderGaleria(filter) {
        if (!galeriaContainer) return;
        galeriaContainer.innerHTML = '';

        const filtered = filter === 'all'
            ? galeriaData
            : galeriaData.filter(g => g.tagClass === filter);

        filtered.forEach(g => {
            const clickAction = g.video ? `onclick="openYouTubeModal('${g.video}')"` : '';
            galeriaContainer.innerHTML += `
                <div class="galeria-item fade-in visible" ${clickAction}>
                    <img src="${g.img}" onerror="this.src='${g.fallback}'" alt="${g.title}">
                    <div class="galeria-overlay"></div>
                    <span class="galeria-badge badge-${g.tagClass}">${g.tag}</span>
                    ${g.video ? '<span class="video-play-icon">▶</span>' : ''}
                </div>
            `;
        });
    }

    function setupGaleriaEventListeners() {
        if (galeriaContainer) {
            renderGaleria('all');
            galeriaTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    galeriaTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    renderGaleria(tab.getAttribute('data-filter'));
                });
            });
        }
    }

    // Initial setup calls
    setupGenerationEventListeners();
    setupPaisesEventListeners();
    setupGaleriaEventListeners();
});
