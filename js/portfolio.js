/**
 * Portfolio — filters, grid, category blocks, video modal
 */

const Portfolio = {
  currentFilter: "all",
  elements: {},

  init() {
    this.elements.filters = document.getElementById("portfolioFilters");
    this.elements.grid = document.getElementById("portfolioGrid");
    this.elements.blocks = document.getElementById("portfolioBlocks");
    this.elements.modal = document.getElementById("videoModal");
    this.elements.iframe = document.getElementById("modalIframe");
    this.elements.modalClose = document.getElementById("modalClose");

    this.renderFilters();
    this.renderGrid();
    this.renderBlocks();
    this.bindEvents();
  },

  renderFilters() {
    this.elements.filters.innerHTML = SITE_CONFIG.genres
      .map(
        (genre) => `
        <button
          class="filter-btn${genre.id === this.currentFilter ? " is-active" : ""}"
          data-genre="${genre.id}"
          role="tab"
          aria-selected="${genre.id === this.currentFilter}"
        >${genre.label}</button>
      `
      )
      .join("");
  },

  renderGrid() {
    const videos =
      this.currentFilter === "all"
        ? SITE_CONFIG.portfolio
        : SITE_CONFIG.portfolio.filter((v) => v.genre === this.currentFilter);

    this.elements.blocks.hidden = this.currentFilter !== "all";
    this.elements.grid.hidden = this.currentFilter === "all";

    if (this.currentFilter === "all") {
      this.elements.grid.innerHTML = "";
      return;
    }

    if (videos.length === 0) {
      this.elements.grid.innerHTML = `<p class="portfolio__empty">No work in this category yet</p>`;
      return;
    }

    const genreLabels = Object.fromEntries(
      SITE_CONFIG.genres.filter((g) => g.id !== "all").map((g) => [g.id, g.label])
    );

    this.elements.grid.innerHTML = videos.map((video) => this.renderCard(video, genreLabels)).join("");
  },

  renderBlocks() {
    const genresWithWork = SITE_CONFIG.genres.filter(
      (g) => g.id !== "all" && SITE_CONFIG.portfolio.some((v) => v.genre === g.id)
    );

    this.elements.blocks.innerHTML = genresWithWork
      .map((genre) => {
        const items = SITE_CONFIG.portfolio.filter((v) => v.genre === genre.id);
        return `
          <section class="portfolio-block">
            <h3 class="portfolio-block__title">${genre.label}</h3>
            <div class="portfolio-block__grid">
              ${items
                .map(
                  (video) => `
                <article class="portfolio-block__item" data-video-id="${video.youtubeId}" tabindex="0" role="button" aria-label="Watch: ${video.title}">
                  <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
                  <span class="portfolio-block__label">${video.title}</span>
                </article>
              `
                )
                .join("")}
            </div>
          </section>
        `;
      })
      .join("");
  },

  renderCard(video, genreLabels) {
    return `
      <article class="portfolio-card" data-video-id="${video.youtubeId}" tabindex="0" role="button" aria-label="Watch: ${video.title}">
        <img class="portfolio-card__thumb" src="${video.thumbnail}" alt="${video.title}" loading="lazy">
        <div class="portfolio-card__play" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#000"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div class="portfolio-card__overlay">
          <h3 class="portfolio-card__title">${video.title}</h3>
          <p class="portfolio-card__genre">${genreLabels[video.genre] || ""}</p>
        </div>
      </article>
    `;
  },

  bindEvents() {
    this.elements.filters.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;

      this.currentFilter = btn.dataset.genre;
      this.elements.filters.querySelectorAll(".filter-btn").forEach((b) => {
        b.classList.toggle("is-active", b.dataset.genre === this.currentFilter);
        b.setAttribute("aria-selected", b.dataset.genre === this.currentFilter);
      });
      this.renderGrid();
    });

    const openFromClick = (e) => {
      const card = e.target.closest("[data-video-id]");
      if (card) this.openModal(card.dataset.videoId);
    };

    this.elements.grid.addEventListener("click", openFromClick);
    this.elements.blocks.addEventListener("click", openFromClick);

    [this.elements.grid, this.elements.blocks].forEach((el) => {
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          const card = e.target.closest("[data-video-id]");
          if (card) {
            e.preventDefault();
            this.openModal(card.dataset.videoId);
          }
        }
      });
    });

    this.elements.modalClose.addEventListener("click", () => this.closeModal());
    this.elements.modal.addEventListener("click", (e) => {
      if (e.target === this.elements.modal) this.closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.elements.modal.classList.contains("is-open")) {
        this.closeModal();
      }
    });
  },

  openModal(youtubeId) {
    this.elements.iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
    this.elements.modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  },

  closeModal() {
    this.elements.modal.classList.remove("is-open");
    this.elements.iframe.src = "";
    document.body.style.overflow = "";
  },
};
