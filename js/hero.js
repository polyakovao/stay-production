/**
 * Hero carousel — Gemini Omni–inspired horizontal slides
 */

const Hero = {
  currentIndex: 0,
  elements: {},

  init() {
    this.elements.track = document.getElementById("heroTrack");
    this.elements.thumbs = document.getElementById("heroThumbs");
    this.elements.prev = document.getElementById("heroPrev");
    this.elements.next = document.getElementById("heroNext");

    this.render();
    this.bindEvents();
    this.updateActive();
  },

  render() {
    const slides = SITE_CONFIG.heroSlides;

    this.elements.track.innerHTML = slides
      .map((slide, i) => {
        if (slide.type === "intro") {
          return `
            <article class="hero-slide hero-slide--intro" data-index="${i}">
              <div class="hero-slide__media">
                <img src="${slide.background}" alt="" class="hero-slide__bg">
                <div class="hero-slide__overlay"></div>
              </div>
              <div class="hero-slide__body">
                <p class="hero-slide__roles">${SITE_CONFIG.roles}</p>
                <h1 class="hero-slide__name">${SITE_CONFIG.name}</h1>
                <p class="hero-slide__bio">${SITE_CONFIG.bio}</p>
                <div class="hero-slide__actions">
                  <a href="#portfolio" class="btn btn--outline">Selected Work ↗</a>
                  <a href="${SITE_CONFIG.resumeUrl}" class="btn btn--outline" download>View Resume ↗</a>
                  <a href="#contact" class="btn btn--primary">Book a Call ↗</a>
                </div>
              </div>
            </article>
          `;
        }

        return `
          <article class="hero-slide hero-slide--video" data-index="${i}" data-video-id="${slide.youtubeId}">
            <div class="hero-slide__media">
              <img src="${slide.thumbnail}" alt="${slide.title}" class="hero-slide__bg">
              <div class="hero-slide__overlay"></div>
              <p class="hero-slide__caption">${slide.caption}</p>
              <button class="hero-slide__play" aria-label="Play ${slide.title}">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
              </button>
              <button class="hero-slide__mute" aria-label="Toggle sound" aria-pressed="true">
                <svg class="icon-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
                <svg class="icon-unmuted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" hidden>
                  <path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
                </svg>
              </button>
            </div>
          </article>
        `;
      })
      .join("");

    this.elements.thumbs.innerHTML = slides
      .map(
        (slide, i) => `
        <button class="hero-thumb${i === 0 ? " is-active" : ""}" data-index="${i}" aria-label="Go to slide ${i + 1}">
          ${slide.type === "intro"
            ? `<span class="hero-thumb__label">Intro</span>`
            : `<img src="${slide.thumbnail}" alt="${slide.title}">`}
        </button>
      `
      )
      .join("");
  },

  bindEvents() {
    this.elements.prev.addEventListener("click", () => this.goTo(this.currentIndex - 1));
    this.elements.next.addEventListener("click", () => this.goTo(this.currentIndex + 1));

    this.elements.thumbs.addEventListener("click", (e) => {
      const btn = e.target.closest(".hero-thumb");
      if (btn) this.goTo(Number(btn.dataset.index));
    });

    this.elements.track.addEventListener("click", (e) => {
      const playBtn = e.target.closest(".hero-slide__play");
      const slide = e.target.closest(".hero-slide--video");
      if (playBtn && slide) {
        Portfolio.openModal(slide.dataset.videoId);
        return;
      }

      const muteBtn = e.target.closest(".hero-slide__mute");
      if (muteBtn) {
        const pressed = muteBtn.getAttribute("aria-pressed") === "true";
        muteBtn.setAttribute("aria-pressed", !pressed);
        muteBtn.querySelector(".icon-muted").hidden = !pressed;
        muteBtn.querySelector(".icon-unmuted").hidden = pressed;
      }
    });

    this.elements.track.addEventListener("scroll", () => this.onScroll(), { passive: true });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.goTo(this.currentIndex - 1);
      if (e.key === "ArrowRight") this.goTo(this.currentIndex + 1);
    });
  },

  goTo(index) {
    const slides = this.elements.track.querySelectorAll(".hero-slide");
    const max = slides.length - 1;
    this.currentIndex = Math.max(0, Math.min(index, max));
    slides[this.currentIndex].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    this.updateActive();
  },

  onScroll() {
    const track = this.elements.track;
    const slides = track.querySelectorAll(".hero-slide");
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;

    slides.forEach((slide, i) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const dist = Math.abs(center - slideCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    if (closest !== this.currentIndex) {
      this.currentIndex = closest;
      this.updateActive();
    }
  },

  updateActive() {
    const slides = this.elements.track.querySelectorAll(".hero-slide");
    slides.forEach((s, i) => s.classList.toggle("is-active", i === this.currentIndex));

    this.elements.thumbs.querySelectorAll(".hero-thumb").forEach((t, i) => {
      t.classList.toggle("is-active", i === this.currentIndex);
    });
  },
};
