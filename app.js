document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. CARGA DE DATOS DESDE JSON
    // ==========================================
    fetch('datos.json')
        .then(response => response.json())
        .then(data => {
            
            // Función segura: Si no encuentra el ID, lo ignora y sigue funcionando.
            const inyectar = (id, contenido) => {
                const elemento = document.getElementById(id);
                if (elemento && contenido) {
                    elemento.innerHTML = contenido;
                }
            };

            // GLOBALES
            inyectar('nav-logo', data.global.nombre_marca);
            inyectar('nav-inicio', data.global.nav_inicio);
            inyectar('nav-servicios', data.global.nav_servicios);
            inyectar('nav-proyectos', data.global.nav_proyectos);
            inyectar('nav-contacto', data.global.nav_contacto);
            inyectar('nav-btn-presupuesto', data.global.boton_presupuesto);

            // INICIO
            inyectar('hero-etiqueta', data.inicio.hero_etiqueta);
            inyectar('hero-titulo', data.inicio.hero_titulo);
            inyectar('hero-descripcion', data.inicio.hero_descripcion);
            inyectar('hero-boton', data.inicio.hero_boton);

            // SERVICIOS
            inyectar('titulo-servicios', data.servicios.titulo_seccion);
            inyectar('srv1-titulo', data.servicios.srv1_titulo);
            inyectar('srv1-desc', data.servicios.srv1_desc);
            inyectar('srv2-titulo', data.servicios.srv2_titulo);
            inyectar('srv2-desc', data.servicios.srv2_desc);
            inyectar('srv3-titulo', data.servicios.srv3_titulo);
            inyectar('srv3-desc', data.servicios.srv3_desc);

            // DETALLES SERVICIOS
            inyectar('det-web-titulo', data.detalles_servicios.web_titulo);
            inyectar('det-web-sub', data.detalles_servicios.web_sub);
            inyectar('det-gestion-titulo', data.detalles_servicios.gestion_titulo);
            inyectar('det-gestion-sub', data.detalles_servicios.gestion_sub);
            inyectar('det-menu-titulo', data.detalles_servicios.menu_titulo);
            inyectar('det-menu-sub', data.detalles_servicios.menu_sub);

            // PROYECTOS
            inyectar('titulo-proyectos', data.proyectos.titulo_seccion);
            inyectar('proy1-titulo', data.proyectos.proy1_titulo);
            inyectar('proy1-desc', data.proyectos.proy1_desc);
            inyectar('proy2-titulo', data.proyectos.proy2_titulo);
            inyectar('proy2-desc', data.proyectos.proy2_desc);

            // PRESUPUESTOS
            inyectar('pres-titulo', data.presupuesto.titulo);
            inyectar('pres-desc', data.presupuesto.descripcion);
            inyectar('plan1-tit', data.presupuesto.plan1_titulo);
            inyectar('plan1-pre', data.presupuesto.plan1_precio);
            inyectar('plan2-tit', data.presupuesto.plan2_titulo);
            inyectar('plan2-pre', data.presupuesto.plan2_precio);
            inyectar('plan3-tit', data.presupuesto.plan3_titulo);
            inyectar('plan3-pre', data.presupuesto.plan3_precio);
            inyectar('plan4-tit', data.presupuesto.plan4_titulo);
            inyectar('plan4-pre', data.presupuesto.plan4_precio);
            inyectar('pres-btn-pago', data.presupuesto.boton_pago);

            // PAGO
            inyectar('pago-titulo', data.pago.titulo);
            inyectar('pago-sub', data.pago.subtitulo);
            inyectar('pago-instruccion', data.pago.instruccion);
            inyectar('pago-banco', data.pago.datos_banco);
            inyectar('pago-yappy', data.pago.datos_yappy);
            inyectar('pago-btn-wa', data.pago.boton_whatsapp);

            // CONTACTO
            inyectar('titulo-contacto', data.contacto.titulo);
            inyectar('descripcion-contacto', data.contacto.descripcion);
            inyectar('dato-whatsapp', data.contacto.whatsapp_texto);
            inyectar('dato-ubicacion', data.contacto.ubicacion);
            inyectar('dato-correo', data.contacto.correo);
            
            // Enlaces Dinámicos de WhatsApp
            const linkWaContacto = document.getElementById('link-whatsapp');
            if(linkWaContacto) linkWaContacto.href = `https://wa.me/${data.contacto.whatsapp_numero}`;

            const linkWaPago = document.getElementById('pago-btn-wa');
            if(linkWaPago) linkWaPago.href = `https://wa.me/${data.contacto.whatsapp_numero}?text=Hola,%20adjunto%20el%20comprobante%20de%20pago%20para%20iniciar%20mi%20proyecto.`;

        })
        .catch(error => console.error('Error al cargar datos:', error));

    // ==========================================
    // 2. RASTREADOR DE SCROLL PARA ANIMACIONES
    // ==========================================
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

    // ==========================================
    // 3. TRANSICIÓN FLUIDA ENTRE CLICS DE PÁGINAS
    // ==========================================
    setTimeout(() => { document.body.classList.add('page-loaded'); }, 10);

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

}); // <--- ESTOS ERAN LOS CORCHETES QUE FALTABAN
