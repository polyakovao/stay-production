/**
 * Site configuration — edit this file to customize content.
 */
const SITE_CONFIG = {
  brand: "STAY",
  name: "Roman Penko",
  tagline: "Видеопродакшн и постпродакшн",
  heroTitle: "Трейлеры, соцсети, VFX",
  heroSubtitle: "и AI-продакшн",
  heroDescription:
    "Создаю трейлеры к фильмам, видео для социальных сетей и визуальные эффекты. Работаю с AI-инструментами: Higgsfield, ChatGPT, Claude.",
  email: "hello@example.com",
  phone: "+79990000000",
  telegram: "@username",
  whatsapp: "+79990000000",
  resumeUrl: "assets/resume.pdf",

  navigation: [
    { id: "home", label: "Home", href: "#home" },
    { id: "portfolio", label: "Portfolio", href: "#portfolio" },
    { id: "about", label: "About", href: "#about" },
    { id: "services", label: "Our Services", href: "#services" },
    { id: "testimonials", label: "Testimonials", href: "#testimonials" },
    { id: "contact", label: "Contact", href: "#contact" },
  ],

  api: {
    baseUrl: "/api",
    booking: "/api/booking",
    contact: "/api/contact",
    availability: "/api/availability",
  },

  workingHours: {
    start: 10,
    end: 19,
    slotDuration: 60,
    daysOff: [0, 6],
  },

  services: [
    {
      id: "trailers",
      title: "Трейлеры к фильмам",
      description:
        "Создание динамичных трейлеров, тизеров и промо-роликов для кино и сериалов.",
      icon: "film",
    },
    {
      id: "social",
      title: "Видео для соцсетей",
      description:
        "Контент для Instagram, TikTok, YouTube — от идеи до финального монтажа.",
      icon: "share",
    },
    {
      id: "vfx",
      title: "VFX и AI-продакшн",
      description:
        "Визуальные эффекты, AI-генерация и постпродакшн с Higgsfield, ChatGPT, Claude.",
      icon: "sparkles",
    },
  ],

  festivalService: {
    title: "Отправка на фестивали под ключ",
    description:
      "Создаю страницу на FilmFreeway, подбираю фестивали под уровень вашего фильма и формирую календарь с дедлайнами и статусами.",
    tags: ["FilmFreeway", "Подбор фестивалей", "Календарь дедлайнов", "Отслеживание статусов"],
  },

  about: {
    paragraphs: [
      "Видеоредактор и постпродакшн-специалист с фокусом на кино и digital-контент. Создаю трейлеры, которые рассказывают историю, и видео, которое работает в соцсетях.",
      "Работаю с современными AI-инструментами для ускорения продакшна без потери качества. Помогаю независимым режиссёрам вывести фильмы на международные фестивали.",
    ],
    stats: [
      { value: "50+", label: "проектов" },
      { value: "5+", label: "лет опыта" },
      { value: "15+", label: "фестивалей" },
    ],
    photo: "assets/images/about.svg",
  },

  resume: {
    skills: [
      "Adobe Premiere Pro",
      "After Effects",
      "DaVinci Resolve",
      "Higgsfield",
      "ChatGPT / Claude",
      "Color Grading",
      "Sound Design",
      "FilmFreeway",
    ],
    experience: [
      {
        title: "Видеоредактор / Постпродакшн",
        period: "2020 — настоящее время",
        company: "Freelance",
        description:
          "Трейлеры, промо-ролики, VFX, AI-продакшн для кино и digital-проектов.",
      },
      {
        title: "Фестивальный координатор",
        period: "2022 — настоящее время",
        company: "Freelance",
        description:
          "Подбор фестивалей, оформление заявок на FilmFreeway, ведение календаря и статусов.",
      },
    ],
  },

  testimonials: [
    {
      text: "Отличная работа над трейлером — динамичный монтаж, точное попадание в настроение фильма. Рекомендую!",
      author: "Алексей К.",
      role: "Режиссёр",
    },
    {
      text: "Быстро и качественно сделали серию reels для бренда. Контент сразу пошёл в работу.",
      author: "Мария С.",
      role: "SMM-менеджер",
    },
    {
      text: "Помог с подачей на фестивали — всё структурировано, понятный календарь и статусы.",
      author: "Дмитрий В.",
      role: "Продюсер",
    },
  ],

  genres: [
    { id: "all", label: "All" },
    { id: "social", label: "Social media content" },
    { id: "trailers", label: "Trailers and teasers" },
    { id: "corporate", label: "Corporate videos" },
    { id: "youtube", label: "YouTube videos" },
    { id: "documentary", label: "Documentaries" },
    { id: "promo", label: "Promo videos" },
    { id: "feature", label: "Feature films" },
    { id: "event", label: "Event clips" },
    { id: "sport", label: "Sport" },
    { id: "bts", label: "BTS" },
    { id: "interviews", label: "Interviews" },
    { id: "color", label: "Color correction" },
    { id: "vfx", label: "VFX" },
    { id: "mogrt", label: "MOGRT" },
    { id: "showreel", label: "Showreel" },
    { id: "vsl", label: "VSL" },
    { id: "other", label: "Other" },
  ],

  portfolio: [
    { id: 1, title: "Brand Reels", genre: "social", youtubeId: "dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" },
    { id: 2, title: "Drama Trailer", genre: "trailers", youtubeId: "dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" },
    { id: 3, title: "Thriller Teaser", genre: "trailers", youtubeId: "dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" },
    { id: 4, title: "Corporate Film", genre: "corporate", youtubeId: "dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" },
    { id: 5, title: "YouTube Series", genre: "youtube", youtubeId: "dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" },
    { id: 6, title: "Promo Video", genre: "promo", youtubeId: "dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" },
    { id: 7, title: "VFX Compositing", genre: "vfx", youtubeId: "dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" },
    { id: 8, title: "Event Highlight", genre: "event", youtubeId: "dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" },
    { id: 9, title: "Showreel 2025", genre: "showreel", youtubeId: "dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" },
  ],
};

if (typeof module !== "undefined") {
  module.exports = SITE_CONFIG;
}
