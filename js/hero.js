/**
 * Hero — Gemini Omni fullscreen carousel
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
    requestAnimationFrame(() => this.goTo(0, false));
  },

  render() {
    const slides = SITE_CONFIG.heroSlides;

    this.elements.track.innerHTML = slides
      .map((slide, i) => {
        if (slide.type === "intro") {
          return `
            <article class="omni-slide omni-slide--intro" data-index="${i}">
              <div class="omni-slide__media">
                <img src="${slide.background}" alt="" class="omni-slide__bg">
                <div class="omni-slide__scrim"></div>
              </div>
              <div class="omni-slide__center">
                <h1 class="omni-slide__title">${SITE_CONFIG.name}</h1>
                <p class="omni-slide__subtitle">${SITE_CONFIG.roles}</p>
                <p class="omni-slide__desc">${SITE_CONFIG.bio}</p>
                <div class="omni-slide__actions">
                  <a href="#portfolio" class="btn btn--solid">Selected Work</a>
                  <a href="${SITE_CONFIG.resumeUrl}" class="btn btn--solid" download>View Resume</a>
                  <a href="#contact" class="btn btn--glass">Book a Call</a>
                </div>
              </div>
            </article>
          `;
        }

        return `
          <article class="omni-slide omni-slide--video" data-index="${i}" data-video-id="${slide.youtubeId}">
            <div class="omni-slide__media">
              <img src="${slide.thumbnail}" alt="${slide.title}" class="omni-slide__bg">
              <div class="omni-slide__scrim omni-slide__scrim--light"></div>
              <p class="omni-slide__prompt">${slide.caption}</p>
              <button class="omni-slide__play" aria-label="Play ${slide.title}">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
              <button class="omni-slide__mute" aria-label="Toggle sound" aria-pressed="true">
                <svg class="icon-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                  <path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
                <svg class="icon-unmuted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" hidden>
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
        <button class="omni-thumb${i === 0 ? " is-active" : ""}" data-index="${i}" aria-label="Slide ${i + 1}">
          ${slide.type === "intro"
            ? `<span class="omni-thumb__dot"></span>`
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
      const btn = e.target.closest(".omni-thumb");
      if (btn) this.goTo(Number(btn.dataset.index));
    });

    this.elements.track.addEventListener("click", (e) => {
      const playBtn = e.target.closest(".omni-slide__play");
      const slide = e.target.closest(".omni-slide--video");
      if (playBtn && slide) {
        Portfolio.openModal(slide.dataset.videoId);
        return;
      }

      const muteBtn = e.target.closest(".omni-slide__mute");
      if (muteBtn) {
        const muted = muteBtn.getAttribute("aria-pressed") === "true";
        muteBtn.setAttribute("aria-pressed", !muted);
        muteBtn.querySelector(".icon-muted").hidden = !muted;
        muteBtn.querySelector(".icon-unmuted").hidden = muted;
      }
    });

    this.elements.track.addEventListener("scroll", () => this.onScroll(), { passive: true });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.goTo(this.currentIndex - 1);
      if (e.key === "ArrowRight") this.goTo(this.currentIndex + 1);
    });
  },

  goTo(index, smooth = true) {
    const slides = this.elements.track.querySelectorAll(".omni-slide");
    const max = slides.length - 1;
    this.currentIndex = Math.max(0, Math.min(index, max));

    slides[this.currentIndex].scrollIntoView({
      behavior: smooth ? "smooth" : "instant",
      inline: "center",
      block: "nearest",
    });

    this.updateActive();
  },

  onScroll() {
    const track = this.elements.track;
    const slides = track.querySelectorAll(".omni-slide");
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
    this.elements.track.querySelectorAll(".omni-slide").forEach((s, i) => {
      s.classList.toggle("is-active", i === this.currentIndex);
    });

    this.elements.thumbs.querySelectorAll(".omni-thumb").forEach((t, i) => {
      t.classList.toggle("is-active", i === this.currentIndex);
    });
  },
};
