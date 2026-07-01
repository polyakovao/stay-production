/**
 * Main app initialization
 */

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  renderNavigation();
  renderProcess();
  renderFestivals();
  renderAbout();
  renderResume();
  renderTestimonials();
  initHeader();
  initScrollSpy();
  initReveal();
  initMobileNav();
  Hero.init();
  Portfolio.init();
  Calendar.init();

  document.getElementById("footerYear").textContent = new Date().getFullYear();
});

function applyConfig() {
  document.querySelectorAll("[data-config]").forEach((el) => {
    const key = el.dataset.config;
    if (SITE_CONFIG[key]) el.textContent = SITE_CONFIG[key];
  });

  document.title = `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;
  document.documentElement.lang = "en";

  document.getElementById("resumeDownload").href = SITE_CONFIG.resumeUrl;

  const aboutPhoto = document.getElementById("aboutPhoto");
  if (SITE_CONFIG.about.photo) {
    aboutPhoto.src = SITE_CONFIG.about.photo;
    aboutPhoto.alt = SITE_CONFIG.name;
  }
}

function renderNavigation() {
  document.getElementById("headerNav").innerHTML = SITE_CONFIG.navigation
    .map((item) => `<a href="${item.href}" class="header__link" data-section="${item.id}">${item.label}</a>`)
    .join("");

  document.getElementById("mobileNavLinks").innerHTML = SITE_CONFIG.navigation
    .map((item) => `<a href="${item.href}" class="mobile-nav__link" data-section="${item.id}">${item.label}</a>`)
    .join("");

  const ctaHtml = SITE_CONFIG.headerCta
    .map((cta, i) => {
      const cls = i === SITE_CONFIG.headerCta.length - 1 ? "header__cta header__cta--solid" : "header__cta";
      return `<a href="${cta.href}" class="${cls}">${cta.label}</a>`;
    })
    .join("");

  document.getElementById("headerCta").innerHTML = ctaHtml;
  document.getElementById("mobileNavCta").innerHTML = SITE_CONFIG.headerCta
    .map((cta) => `<a href="${cta.href}" class="btn btn--outline btn--large">${cta.label}</a>`)
    .join("");
}

function renderProcess() {
  const p = SITE_CONFIG.process;
  document.getElementById("processDescription").textContent = p.description;

  document.getElementById("processSteps").innerHTML = p.steps
    .map(
      (step, i) => `
      <article class="process-step">
        <p class="process-step__num">0${i + 1}</p>
        <h3 class="process-step__title">${step.title}</h3>
        <p class="process-step__text">${step.text}</p>
      </article>
    `
    )
    .join("");
}

function renderFestivals() {
  const f = SITE_CONFIG.festivalService;
  document.getElementById("festivalBanner").innerHTML = `
    <div>
      <h3 class="festival-banner__title">${f.title}</h3>
      <p class="festival-banner__text">${f.description}</p>
      <div class="festival-banner__features">
        ${f.tags.map((t) => `<span class="festival-banner__tag">${t}</span>`).join("")}
      </div>
    </div>
    <a href="#contact" class="btn btn--primary">Book a Call</a>
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
  const sectionIds = [...SITE_CONFIG.navigation.map((n) => n.id), "portfolio", "festivals", "testimonials"];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
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
