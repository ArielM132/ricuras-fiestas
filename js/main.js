(function () {
  "use strict";

  const content = window.RICURAS_CONTENT;
  const business = content.business;
  const page = document.body.dataset.page || "inicio";

  const whatsappIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.4-4.7A8.5 8.5 0 1 1 20.5 11.7Z"/>
      <path d="M8.3 7.9c.3-.7.6-.7 1-.7h.3c.2 0 .4.1.5.4l.8 1.9c.1.3.1.5-.1.7l-.6.8c-.2.2-.2.4 0 .7.7 1.2 1.7 2.1 3 2.8.3.2.5.1.7-.1l.9-1.1c.2-.2.4-.3.7-.2l2 .9c.3.1.4.3.4.5 0 .4-.2 1.3-.8 1.8-.6.6-1.5.9-2.4.7-1.3-.3-3.3-1-5.1-2.7-1.4-1.3-2.5-3-2.8-4.2-.3-1.1.1-1.8.5-2.2Z"/>
    </svg>`;

  const navItems = [
    {
      id: "quincho",
      label: "Quincho",
      detail: "Con pileta",
      href: "quincho.html",
      image: "assets/images/nav/quincho.webp"
    },
    {
      id: "perniles",
      label: "Perniles",
      detail: "Para compartir",
      href: "perniles.html",
      image: "assets/images/nav/perniles.webp"
    },
    {
      id: "alquileres",
      label: "Alquileres",
      detail: "Equipamiento",
      href: "alquileres.html",
      image: "assets/images/nav/alquileres.webp"
    },
    {
      id: "eventos",
      label: "Eventos",
      detail: "Servicio integral",
      href: "eventos.html",
      image: "assets/images/nav/eventos.webp"
    },
    {
      id: "catering",
      label: "Catering",
      detail: "Elaboración propia",
      href: "catering.html",
      image: "assets/images/nav/catering.webp"
    }
  ];

  function whatsappUrl(message) {
    return `https://wa.me/${business.phoneDigits}?text=${encodeURIComponent(message)}`;
  }

  function renderHeader() {
    const mount = document.querySelector("[data-site-header]");
    if (!mount) return;

    const links = navItems.map(({ id, label, detail, href, image }) => {
      const current = page === id ? ' aria-current="page"' : "";
      return `
        <li>
          <a class="nav-card" href="${href}"${current}>
            <span class="nav-card-media"><img src="${image}" alt="" width="96" height="96"></span>
            <span class="nav-card-copy">
              <strong>${label}</strong>
              <small>${detail}</small>
            </span>
          </a>
        </li>`;
    }).join("");

    mount.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="Ricuras Fiestas, ir al inicio">
            <img src="assets/images/brand/ricuras-fiestas-logo.webp" alt="" width="656" height="343">
            <span class="brand-copy">
              <span class="brand-name">Ricuras Fiestas</span>
              <span class="brand-tagline">Organización de eventos</span>
            </span>
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-navigation" aria-label="Abrir menú">
            <span class="nav-toggle-lines" aria-hidden="true"></span>
          </button>
          <nav class="main-nav" id="main-navigation" aria-label="Navegación principal">
            <p class="nav-mobile-intro">Explorá nuestros servicios</p>
            <ul class="nav-list">${links}</ul>
            <div class="nav-utility">
              <a href="index.html"${page === "inicio" ? ' aria-current="page"' : ""}>Inicio</a>
              <a href="contacto.html"${page === "contacto" ? ' aria-current="page"' : ""}>Contacto <span aria-hidden="true">↗</span></a>
            </div>
          </nav>
        </div>
      </header>`;
  }

  function renderFooter() {
    const mount = document.querySelector("[data-site-footer]");
    if (!mount) return;

    mount.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <span class="brand-name">Ricuras Fiestas</span>
              <p>Más de 30 años acompañando celebraciones con soluciones integrales, atención cercana y sabor artesanal.</p>
            </div>
            <div>
              <p class="footer-title">Servicios</p>
              <ul class="footer-links">
                <li><a href="quincho.html">Quincho con pileta</a></li>
                <li><a href="eventos.html">Eventos integrales</a></li>
                <li><a href="catering.html">Catering</a></li>
                <li><a href="perniles.html">Perniles</a></li>
                <li><a href="alquileres.html">Alquileres</a></li>
              </ul>
            </div>
            <div>
              <p class="footer-title">Contacto</p>
              <ul class="footer-links">
                <li><a href="tel:+5493795038571">${business.phoneDisplay}</a></li>
                <li><a href="mailto:${business.email}">${business.email}</a></li>
                <li><a href="${business.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="${business.facebook}" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              </ul>
            </div>
            <div>
              <p class="footer-title">Dónde encontrarnos</p>
              <ul class="footer-links">
                <li>Oficina: ${business.officeAddress}</li>
                <li>Quincho: ${business.venueAddress}</li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© <span data-current-year></span> Ricuras Fiestas.</span>
            <span>Corrientes Capital · Argentina</span>
          </div>
        </div>
      </footer>`;
  }

  function setupNavigation() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".main-nav");
    const header = document.querySelector(".site-header");
    if (!toggle || !nav || !header) return;

    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
      nav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    };

    toggle.addEventListener("click", () => {
      const opening = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(opening));
      toggle.setAttribute("aria-label", opening ? "Cerrar menú" : "Abrir menú");
      nav.classList.toggle("is-open", opening);
      document.body.classList.toggle("menu-open", opening);
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) closeMenu();
    });

    const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  function renderWhatsappLinks() {
    document.querySelectorAll("[data-whatsapp]").forEach((link) => {
      const message = link.dataset.whatsapp || "Hola, quiero solicitar una cotización.";
      link.href = whatsappUrl(message);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });

    const float = document.querySelector("[data-whatsapp-float]");
    if (float) {
      float.href = whatsappUrl(`Hola, estoy viendo la sección de ${page} y quiero hacer una consulta.`);
      float.innerHTML = `${whatsappIcon}<span>WhatsApp</span>`;
      float.target = "_blank";
      float.rel = "noopener noreferrer";
    }
  }

  function renderGalleries() {
    document.querySelectorAll("[data-gallery]").forEach((gallery) => {
      const name = gallery.dataset.gallery;
      const items = content.galleries[name] || [];
      gallery.innerHTML = items.map((item, index) => `
        <button class="gallery-item" type="button" data-gallery-index="${index}" aria-label="Ampliar: ${item.alt}">
          <img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async">
        </button>`).join("");
    });
  }

  function setupGalleryDialog() {
    const galleries = document.querySelectorAll("[data-gallery]");
    if (!galleries.length) return;

    const dialog = document.createElement("dialog");
    dialog.className = "gallery-dialog";
    dialog.setAttribute("aria-label", "Visor de galería");
    dialog.innerHTML = `
      <div class="dialog-shell">
        <button class="dialog-close" type="button" aria-label="Cerrar galería">×</button>
        <div class="dialog-image-wrap">
          <button class="dialog-nav dialog-nav--prev" type="button" aria-label="Foto anterior">←</button>
          <img class="dialog-image" src="" alt="">
          <button class="dialog-nav dialog-nav--next" type="button" aria-label="Foto siguiente">→</button>
        </div>
        <p class="dialog-caption" aria-live="polite"></p>
      </div>`;
    document.body.append(dialog);

    const image = dialog.querySelector(".dialog-image");
    const caption = dialog.querySelector(".dialog-caption");
    let activeItems = [];
    let activeIndex = 0;

    const showItem = (index) => {
      if (!activeItems.length) return;
      activeIndex = (index + activeItems.length) % activeItems.length;
      const item = activeItems[activeIndex];
      image.src = item.src;
      image.alt = item.alt;
      caption.textContent = `${activeIndex + 1} de ${activeItems.length} · ${item.alt}`;
    };

    galleries.forEach((gallery) => {
      gallery.addEventListener("click", (event) => {
        const button = event.target.closest("[data-gallery-index]");
        if (!button) return;
        activeItems = content.galleries[gallery.dataset.gallery] || [];
        showItem(Number(button.dataset.galleryIndex));
        dialog.showModal();
        document.body.classList.add("dialog-open");
      });
    });

    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
    dialog.querySelector(".dialog-nav--prev").addEventListener("click", () => showItem(activeIndex - 1));
    dialog.querySelector(".dialog-nav--next").addEventListener("click", () => showItem(activeIndex + 1));
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") showItem(activeIndex - 1);
      if (event.key === "ArrowRight") showItem(activeIndex + 1);
    });
  }

  function setupReveal() {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
  }

  function setupQuoteForm() {
    const form = document.querySelector("[data-quote-form]");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const lines = [
        "Hola, quiero solicitar una cotización personalizada.",
        `Nombre: ${data.get("nombre")}`,
        `Servicio: ${data.get("servicio")}`,
        data.get("fecha") ? `Fecha estimada: ${data.get("fecha")}` : "",
        data.get("personas") ? `Cantidad de personas: ${data.get("personas")}` : "",
        data.get("mensaje") ? `Detalles: ${data.get("mensaje")}` : ""
      ].filter(Boolean);
      window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
    });
  }

  renderHeader();
  renderFooter();
  renderWhatsappLinks();
  renderGalleries();
  setupNavigation();
  setupGalleryDialog();
  setupReveal();
  setupQuoteForm();
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
})();
