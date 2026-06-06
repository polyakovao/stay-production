/**
 * API layer — stubs for Laravel backend integration.
 * Replace mock responses with real fetch calls when backend is ready.
 */

const Api = {
  /**
   * Submit booking request
   * @param {Object} data - { name, email, message, date, time }
   * @returns {Promise<{success: boolean, message: string}>}
   */
  async submitBooking(data) {
    const endpoint = SITE_CONFIG.api.baseUrl + SITE_CONFIG.api.booking.replace(SITE_CONFIG.api.baseUrl, "");

    // TODO: Uncomment when Laravel backend is ready
    // const response = await fetch(endpoint, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
    //     "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.content,
    //   },
    //   body: JSON.stringify(data),
    // });
    // if (!response.ok) throw new Error("Booking failed");
    // return response.json();

    // Mock response for frontend development
    console.log("[API Mock] POST", endpoint, data);
    await delay(800);
    return {
      success: true,
      message: "Заявка отправлена! Я свяжусь с вами для подтверждения.",
    };
  },

  /**
   * Get available time slots for a date
   * @param {string} date - ISO date string (YYYY-MM-DD)
   * @returns {Promise<string[]>} - Array of available times ["10:00", "11:00", ...]
   */
  async getAvailability(date) {
    const endpoint = `${SITE_CONFIG.api.baseUrl}${SITE_CONFIG.api.availability.replace(SITE_CONFIG.api.baseUrl, "")}?date=${date}`;

    // TODO: Uncomment when Laravel backend is ready
    // const response = await fetch(endpoint);
    // if (!response.ok) throw new Error("Failed to fetch availability");
    // const data = await response.json();
    // return data.slots;

    // Mock: return all working hours slots
    console.log("[API Mock] GET", endpoint);
    await delay(300);

    const { start, end, slotDuration } = SITE_CONFIG.workingHours;
    const slots = [];
    for (let hour = start; hour < end; hour++) {
      slots.push(`${String(hour).padStart(2, "0")}:00`);
      if (slotDuration === 30) {
        slots.push(`${String(hour).padStart(2, "0")}:30`);
      }
    }

    // Mock some booked slots
    const day = new Date(date).getDay();
    if (day === 3) {
      return slots.filter((s) => !["12:00", "14:00"].includes(s));
    }

    return slots;
  },

  /**
   * Submit contact form
   * @param {Object} data - { name, email, message }
   */
  async submitContact(data) {
    const endpoint = SITE_CONFIG.api.baseUrl + SITE_CONFIG.api.contact.replace(SITE_CONFIG.api.baseUrl, "");

    // TODO: Uncomment when Laravel backend is ready
    // const response = await fetch(endpoint, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json", "Accept": "application/json" },
    //   body: JSON.stringify(data),
    // });
    // return response.json();

    console.log("[API Mock] POST", endpoint, data);
    await delay(600);
    return { success: true, message: "Сообщение отправлено!" };
  },
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
