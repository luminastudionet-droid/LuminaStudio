document.addEventListener('DOMContentLoaded', () => {

    // 1. CARGA DE DATOS (JSON)
    fetch('datos.json')
        .then(response => response.json())
        .then(data => {
            const inyectar = (id, contenido) => {
                const elemento = document.getElementById(id);
                if (elemento && contenido) elemento.innerHTML = contenido;
            };

            // Ejecución de inyección de datos (Globales, Inicio, Servicios, etc...)
            inyectar('nav-logo', data.global.nombre_marca);
            inyectar('nav-inicio', data.global.nav_inicio);
            inyectar('nav-servicios', data.global.nav_servicios);
            inyectar('nav-proyectos', data.global.nav_proyectos);
            inyectar('nav-contacto', data.global.nav_contacto);
            inyectar('nav-btn-presupuesto', data.global.boton_presupuesto);
            
            inyectar('hero-etiqueta', data.inicio.hero_etiqueta);
            inyectar('hero-titulo', data.inicio.hero_titulo);
            inyectar('hero-descripcion', data.inicio.hero_descripcion);
            inyectar('hero-boton', data.inicio.hero_boton);

            // ... (resto de tus inyecciones de datos) ...
            
            const linkWaContacto = document.getElementById('link-whatsapp');
            if(linkWaContacto) linkWaContacto.href = `https://wa.me/${data.contacto.whatsapp_numero}`;
        })
        .catch(error => console.error('Error:', error));

    // 2. RASTREADOR DE SCROLL (Animaciones al bajar)
    const elementosAnimar = document.querySelectorAll('.service-card, .project-card, .pricing-card, .section-title, .hero-text, .hero-image, .glass-form, .contact-item, .terms-box');
    elementosAnimar.forEach(el => el.classList.add('scroll-anim'));

    const observadorScroll = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('scroll-visible');
                observadorScroll.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15 });

    elementosAnimar.forEach(el => observadorScroll.observe(el));

    // 3. TRANSICIÓN FLUIDA ENTRE CLICS
    const enlacesMenu = document.querySelectorAll('.nav-links a, .logo, .service-link, .btn-primary, .btn-outline');
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            const urlDestino = this.getAttribute('href');
            if (urlDestino && urlDestino !== '#' && !urlDestino.startsWith('https://wa.me')) {
                e.preventDefault();
                document.body.classList.add('page-exit');
                setTimeout(() => { window.location.href = urlDestino; }, 150);
            }
        });
    });

});
