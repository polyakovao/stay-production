/**
 * Calendar booking component
 */

const Calendar = {
  currentDate: new Date(),
  selectedDate: null,
  selectedTime: null,
  availableSlots: [],

  elements: {},

  init() {
    this.elements.container = document.getElementById("calendar");
    this.elements.timeSlots = document.getElementById("timeSlots");
    this.elements.timeSlotsGrid = document.getElementById("timeSlotsGrid");
    this.elements.form = document.getElementById("bookingForm");
    this.elements.submit = document.getElementById("bookingSubmit");

    this.render();
    this.bindEvents();
  },

  render() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const monthNames = [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
    ];
    const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = (firstDay.getDay() + 6) % 7; // Monday = 0
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let daysHtml = "";

    for (let i = 0; i < startOffset; i++) {
      daysHtml += `<button class="calendar__day is-empty" disabled aria-hidden="true"></button>`;
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const dateStr = this.formatDate(date);
      const isPast = date < today;
      const isDayOff = SITE_CONFIG.workingHours.daysOff.includes(date.getDay());
      const isDisabled = isPast || isDayOff;
      const isToday = date.getTime() === today.getTime();
      const isSelected = this.selectedDate === dateStr;

      let classes = "calendar__day";
      if (isDisabled) classes += " is-disabled";
      if (isToday) classes += " is-today";
      if (isSelected) classes += " is-selected";

      daysHtml += `
        <button
          class="${classes}"
          data-date="${dateStr}"
          ${isDisabled ? "disabled" : ""}
          aria-label="${day} ${monthNames[month]} ${year}"
          aria-pressed="${isSelected}"
        >${day}</button>
      `;
    }

    this.elements.container.innerHTML = `
      <div class="calendar__header">
        <button class="calendar__nav-btn" id="calPrev" aria-label="Предыдущий месяц">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span class="calendar__month">${monthNames[month]} ${year}</span>
        <button class="calendar__nav-btn" id="calNext" aria-label="Следующий месяц">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
      <div class="calendar__weekdays">
        ${weekdays.map((d) => `<span class="calendar__weekday">${d}</span>`).join("")}
      </div>
      <div class="calendar__days">${daysHtml}</div>
    `;
  },

  async selectDate(dateStr) {
    this.selectedDate = dateStr;
    this.selectedTime = null;
    this.render();
    this.updateSubmitState();

    this.elements.timeSlots.hidden = false;
    this.elements.timeSlotsGrid.innerHTML = `<p style="color:var(--color-text-secondary);font-size:var(--text-sm);grid-column:1/-1;text-align:center;padding:var(--space-4)">Загрузка...</p>`;

    try {
      this.availableSlots = await Api.getAvailability(dateStr);
      this.renderTimeSlots();
    } catch {
      this.elements.timeSlotsGrid.innerHTML = `<p style="color:var(--color-error);font-size:var(--text-sm);grid-column:1/-1;text-align:center">Не удалось загрузить слоты</p>`;
    }
  },

  renderTimeSlots() {
    if (this.availableSlots.length === 0) {
      this.elements.timeSlotsGrid.innerHTML = `<p style="color:var(--color-text-secondary);font-size:var(--text-sm);grid-column:1/-1;text-align:center;padding:var(--space-4)">Нет свободных слотов</p>`;
      return;
    }

    this.elements.timeSlotsGrid.innerHTML = this.availableSlots
      .map(
        (time) => `
        <button
          type="button"
          class="time-slot${this.selectedTime === time ? " is-selected" : ""}"
          data-time="${time}"
        >${time}</button>
      `
      )
      .join("");
  },

  bindEvents() {
    this.elements.container.addEventListener("click", (e) => {
      if (e.target.id === "calPrev") {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.render();
      }
      if (e.target.id === "calNext") {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.render();
      }

      const dayBtn = e.target.closest(".calendar__day[data-date]");
      if (dayBtn && !dayBtn.disabled) {
        this.selectDate(dayBtn.dataset.date);
      }
    });

    this.elements.timeSlotsGrid.addEventListener("click", (e) => {
      const slot = e.target.closest(".time-slot");
      if (!slot) return;

      this.selectedTime = slot.dataset.time;
      this.elements.timeSlotsGrid.querySelectorAll(".time-slot").forEach((s) => {
        s.classList.toggle("is-selected", s.dataset.time === this.selectedTime);
      });
      this.updateSubmitState();
    });

    this.elements.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      await this.handleSubmit();
    });

    this.elements.form.addEventListener("input", () => this.updateSubmitState());
  },

  updateSubmitState() {
    const name = document.getElementById("bookingName").value.trim();
    const email = document.getElementById("bookingEmail").value.trim();
    const isValid = name && email && this.selectedDate && this.selectedTime;
    this.elements.submit.disabled = !isValid;
  },

  async handleSubmit() {
    const name = document.getElementById("bookingName").value.trim();
    const email = document.getElementById("bookingEmail").value.trim();
    const message = document.getElementById("bookingMessage").value.trim();

    if (!name || !email || !this.selectedDate || !this.selectedTime) return;

    this.elements.submit.disabled = true;
    this.elements.submit.textContent = "Отправка...";

    try {
      const result = await Api.submitBooking({
        name,
        email,
        message,
        date: this.selectedDate,
        time: this.selectedTime,
      });

      showToast(result.message, "success");
      this.elements.form.reset();
      this.selectedDate = null;
      this.selectedTime = null;
      this.elements.timeSlots.hidden = true;
      this.render();
    } catch {
      showToast("Ошибка отправки. Попробуйте позже.", "error");
    } finally {
      this.elements.submit.textContent = "Забронировать созвон";
      this.updateSubmitState();
    }
  },

  formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  },
};
