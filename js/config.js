/**
 * Site configuration — edit content here.
 */
const SITE_CONFIG = {
  name: "Roman Osipenko",
  roles: "AI Filmmaker · Senior Editor · VFX Artist",
  tagline: "Cinematic video production & post-production",
  bio: "Crafting cinematic commercials, trailers and AI-driven visuals for modern brands.",
  email: "hello@example.com",
  phone: "+79990000000",
  telegram: "@username",
  whatsapp: "+79990000000",
  resumeUrl: "assets/resume.pdf",

  navigation: [
    { id: "home", label: "Work", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "process", label: "Process", href: "#process" },
    { id: "contact", label: "Contact", href: "#contact" },
  ],

  headerCta: [
    { label: "Submit to Festivals", href: "#festivals", external: false },
    { label: "Book a Call", href: "#contact", external: false },
  ],

  heroSlides: [
    {
      type: "intro",
      background: "assets/images/hero-poster.svg",
    },
    {
      type: "video",
      title: "Drama Trailer",
      caption: "Emotional pacing, sound design and narrative arc for an indie feature.",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    },
    {
      type: "video",
      title: "Brand Reels",
      caption: "Short-form social content — hooks, rhythm and platform-native editing.",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    },
    {
      type: "video",
      title: "VFX & AI",
      caption: "Generative AI scenes blended with traditional compositing and color.",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    },
    {
      type: "video",
      title: "Showreel 2025",
      caption: "Selected work across trailers, social, VFX and festival submissions.",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    },
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

  process: {
    title: "AI-first creative workflow",
    description:
      "From concept to final delivery — combining editing, VFX, motion design and generative AI into one cinematic pipeline.",
    steps: [
      { title: "Brief & concept", text: "Goals, references, platform and timeline alignment." },
      { title: "Edit & story", text: "Assembly, pacing, sound and narrative structure." },
      { title: "VFX & AI", text: "Compositing, generative scenes with Higgsfield, ChatGPT, Claude." },
      { title: "Delivery", text: "Final exports, formats and revisions." },
    ],
  },

  festivalService: {
    title: "Festival submissions — end to end",
    description:
      "FilmFreeway setup, festival matching based on your film's level, deadline calendar and status tracking.",
    tags: ["FilmFreeway", "Festival matching", "Deadline calendar", "Status tracking"],
  },

  about: {
    paragraphs: [
      "Video editor and post-production specialist focused on film and digital content. I create trailers that tell a story and social videos built to perform.",
      "I work with modern AI tools to speed up production without sacrificing quality, and help independent filmmakers reach international festivals.",
    ],
    stats: [
      { value: "50+", label: "projects" },
      { value: "5+", label: "years" },
      { value: "15+", label: "festivals" },
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
        title: "Video Editor / Post-production",
        period: "2020 — present",
        company: "Freelance",
        description: "Trailers, promos, VFX and AI production for film and digital.",
      },
      {
        title: "Festival coordinator",
        period: "2022 — present",
        company: "Freelance",
        description: "Festival selection, FilmFreeway submissions, calendar and status management.",
      },
    ],
  },

  testimonials: [
    {
      text: "Excellent trailer work — dynamic editing that nailed the film's mood. Highly recommend.",
      author: "Alex K.",
      role: "Director",
    },
    {
      text: "Fast, quality reels for our brand. Content went live immediately.",
      author: "Maria S.",
      role: "SMM Manager",
    },
    {
      text: "Helped with festival submissions — clear calendar and status tracking throughout.",
      author: "Dmitry V.",
      role: "Producer",
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
