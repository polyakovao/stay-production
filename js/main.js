/**
 * Main app initialization
 */

const ICONS = {
  film: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 7h5M2 17h5M17 7h5M17 17h5"/></svg>`,
  share: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>`,
  sparkles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75L19 14z"/></svg>`,
  telegram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>`,
  email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
};

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  renderNavigation();
  renderSocialLinks();
  renderServices();
  renderAbout();
  renderResume();
  renderTestimonials();
  initHeader();
  initScrollSpy();
  initReveal();
  initMobileNav();
  Portfolio.init();
  Calendar.init();

  document.getElementById("footerYear").textContent = new Date().getFullYear();
});

function applyConfig() {
  document.querySelectorAll("[data-config]").forEach((el) => {
    const key = el.dataset.config;
    if (SITE_CONFIG[key]) el.textContent = SITE_CONFIG[key];
  });

  document.title = `${SITE_CONFIG.brand} — ${SITE_CONFIG.tagline}`;

  document.getElementById("resumeDownload").href = SITE_CONFIG.resumeUrl;

  const aboutPhoto = document.getElementById("aboutPhoto");
  if (SITE_CONFIG.about.photo) {
    aboutPhoto.src = SITE_CONFIG.about.photo;
    aboutPhoto.alt = SITE_CONFIG.name;
  }
}

function renderNavigation() {
  const navHtml = SITE_CONFIG.navigation
    .map((item) => `<a href="${item.href}" class="header__link" data-section="${item.id}">${item.label}</a>`)
    .join("");

  document.getElementById("headerNav").innerHTML = navHtml;

  document.getElementById("mobileNavLinks").innerHTML = SITE_CONFIG.navigation
    .map((item) => `<a href="${item.href}" class="mobile-nav__link" data-section="${item.id}">${item.label}</a>`)
    .join("");
}

function renderSocialLinks() {
  const social = [
    { href: `https://t.me/${SITE_CONFIG.telegram.replace("@", "")}`, icon: ICONS.telegram, label: "Telegram" },
    { href: `mailto:${SITE_CONFIG.email}`, icon: ICONS.email, label: "Email" },
    { href: `https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}`, icon: ICONS.whatsapp, label: "WhatsApp" },
  ];

  const html = social
    .map(
      (s) =>
        `<a href="${s.href}" class="header__social-link" target="_blank" rel="noopener" aria-label="${s.label}">${s.icon}</a>`
    )
    .join("");

  document.getElementById("headerSocial").innerHTML = html;
  document.getElementById("mobileNavSocial").innerHTML = html;
}

function renderServices() {
  const grid = document.getElementById("servicesGrid");
  grid.innerHTML = SITE_CONFIG.services
    .map(
      (s) => `
      <article class="service-card reveal">
        <div class="service-card__icon">${ICONS[s.icon] || ICONS.film}</div>
        <h3 class="service-card__title">${s.title}</h3>
        <p class="service-card__text">${s.description}</p>
      </article>
    `
    )
    .join("");

  const festival = SITE_CONFIG.festivalService;
  document.getElementById("festivalBanner").innerHTML = `
    <div>
      <h3 class="festival-banner__title">${festival.title}</h3>
      <p class="festival-banner__text">${festival.description}</p>
      <div class="festival-banner__features">
        ${festival.tags.map((t) => `<span class="festival-banner__tag">${t}</span>`).join("")}
      </div>
    </div>
    <a href="#contact" class="btn btn--primary">Обсудить проект</a>
  `;
}

function renderAbout() {
  document.getElementById("aboutText").innerHTML = SITE_CONFIG.about.paragraphs
    .map((p) => `<p class="about__text">${p}</p>`)
    .join("");

  document.getElementById("aboutStats").innerHTML = SITE_CONFIG.about.stats
    .map(
      (s) => `
      <div>
        <div class="about__stat-value">${s.value}</div>
        <div class="about__stat-label">${s.label}</div>
      </div>
    `
    )
    .join("");
}

function renderResume() {
  document.getElementById("resumeSkills").innerHTML = SITE_CONFIG.resume.skills
    .map((s) => `<span class="resume__skill">${s}</span>`)
    .join("");

  document.getElementById("resumeTimeline").innerHTML = SITE_CONFIG.resume.experience
    .map(
      (item) => `
      <div class="resume__item">
        <h4 class="resume__item-title">${item.title}</h4>
        <p class="resume__item-meta">${item.company} · ${item.period}</p>
        <p class="resume__item-text">${item.description}</p>
      </div>
    `
    )
    .join("");
}

function renderTestimonials() {
  document.getElementById("testimonialsGrid").innerHTML = SITE_CONFIG.testimonials
    .map(
      (t) => `
      <article class="testimonial-card">
        <p class="testimonial-card__text">"${t.text}"</p>
        <p class="testimonial-card__author">${t.author}</p>
        <p class="testimonial-card__role">${t.role}</p>
      </article>
    `
    )
    .join("");
}

function initHeader() {
  const header = document.getElementById("header");
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle("is-scrolled", window.scrollY > 10);
        ticking = false;
      });
      ticking = true;
    }
  });
}

function initScrollSpy() {
  const sections = SITE_CONFIG.navigation.map((n) => document.getElementById(n.id)).filter(Boolean);
  const links = document.querySelectorAll("[data-section]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => {
            link.classList.toggle("is-active", link.dataset.section === entry.target.id);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initMobileNav() {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("mobileNav");

  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    burger.classList.toggle("is-active", isOpen);
    burger.setAttribute("aria-expanded", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      burger.classList.remove("is-active");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  setTimeout(() => {
    document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => observer.observe(el));
  }, 100);
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = `toast is-visible is-${type}`;

  setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 4000);
}
