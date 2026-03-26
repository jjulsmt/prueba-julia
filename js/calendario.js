// Tus eventos personalizados (¡SOLO AQUÍ los editas!)
const events = {
    '2026-03-10': { title: '🏆 Concurso Sity-Pó Stars (10)'},
    '2026-03-26': { title: '🎤​ Noche de Anime (26)'},
    '2026-04-17': { title: '​🍟 Patatas ilimitadas (17)'},
    '2026-05-06': { title: '🍓​ Sity-Pó x Strawberry Prince (06)'},
    '2026-05-23': { title: '🍷​ Sity-Pó x Puerto de Indias (23)'},
    '2026-06-14': { title: '🌑​​ Sity-Pó x K-pop (14)'}
};

const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
let currentDate = new Date();

// Elementos DOM
const monthYearSpan = document.getElementById('monthYear');
const daysContainer = document.getElementById('days');
const eventInfo = document.getElementById('eventInfo');

// Renderizar calendario
function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    monthYearSpan.textContent = monthNames[month] + ' ' + year;
    daysContainer.innerHTML = '';
    eventInfo.textContent = 'Haz clic en un día para ver el evento';

    const firstDay = new Date(year, month, 1);
    const startWeekDay = (firstDay.getDay() + 6) % 7; // Lunes = 0
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Agregar celdas vacías antes del primer día del mes
    for (let i = 0; i < startWeekDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'day empty';
        daysContainer.appendChild(emptyCell);
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('div');
        cell.className = 'day';
        cell.textContent = day;
        cell.setAttribute('role', 'gridcell');

        const key = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        const dayLabel = `${day} de ${monthNames[month]} de ${year}`;
        
        if (events[key]) {
            cell.classList.add('event');
            cell.setAttribute('role', 'button');
            cell.setAttribute('tabindex', '0');
            cell.setAttribute('aria-label', `${dayLabel}. Día con evento`);

            const showEvent = () => {
                const ev = events[key];
                eventInfo.innerHTML = `<strong>${ev.title}</strong>`;
            };

            cell.addEventListener('click', showEvent);
            cell.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showEvent();
                }
            });
        } else {
            cell.setAttribute('aria-label', dayLabel);
        }

        daysContainer.appendChild(cell);
    }

    // Agregar celdas vacías después del último día para completar la última semana
    const totalCells = startWeekDay + daysInMonth;
    const remainingCells = 7 - (totalCells % 7);
    if (remainingCells < 7) {
        for (let i = 0; i < remainingCells; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'day empty';
            daysContainer.appendChild(emptyCell);
        }
    }
}

// Controles navegación
document.getElementById('prev').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

document.getElementById('next').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

// Inicializar
renderCalendar(currentDate);
