export function buildCalendar(
  elementId,
  eventosDaAPI,
  onSelectCallback,
  onEventClickCallback,
  onEventDropCallback,
) {
  const calendarEl = document.getElementById(elementId);

  if (!calendarEl) {
    console.error(`Elemento com ID '${elementId}' não encontrado.`);
    return null;
  }

  const calendar = new FullCalendar.Calendar(calendarEl, {
    locale: "pt-br",

    initialView: "timeGridWeek",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "timeGridWeek,timeGridDay",
    },
    buttonText: {
      today: "Hoje",
      week: "Semana",
      day: "Dia",
    },

    slotMinTime: "08:00:00",
    slotMaxTime: "20:00:00",
    slotDuration: "00:15:00",
    allDaySlot: false,
    hiddenDays: [0],

    eventOverlap: false,

    selectable: true,
    selectMirror: true,
    editable: true,

    events: eventosDaAPI,

    select: function (info) {
      if (onSelectCallback) onSelectCallback(info);
    },
    eventClick: function (info) {
      if (onEventClickCallback) onEventClickCallback(info);
    },
    eventDrop: function (info) {
      if (onEventDropCallback) onEventDropCallback(info);
    },

    eventContent: function (arg) {
      return {
        html: `
          <div class="d-flex flex-column h-100 p-1" style="overflow: hidden; font-size: 0.85rem; line-height: 1.2;">
            <div class="fw-bold mb-1 text-truncate">
              <i class="bi bi-scissors me-1" style="color: #d4a017;"></i> ${arg.event.title}
            </div>
            <div class="small opacity-75">
              <i class="bi bi-clock me-1"></i> ${arg.timeText}
            </div>
          </div>
        `,
      };
    },

    businessHours: {
      daysOfWeek: [1, 2, 3, 4, 5, 6], // Segunda a Sábado
      startTime: "08:00", // Hora que abre
      endTime: "20:00", // Hora que fecha
    },

    // Customização 3: Tirar o fundo feio dos eventos de "fundo"
    nowIndicator: true, // Mostra uma linha vermelha com a hora exata de AGORA
  });

  return calendar;
}
