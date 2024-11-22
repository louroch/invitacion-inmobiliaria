document.addEventListener('DOMContentLoaded', () => {
    const DateTime = luxon.DateTime;

    // Configuración del evento
    const eventDate = DateTime.local(2024, 12, 14, 21, 0);
    const eventDateElement = document.getElementById('event-date');
    const eventTimeElement = document.getElementById('event-time');
    eventDateElement.textContent = eventDate.toLocaleString(DateTime.DATE_FULL);
    eventTimeElement.textContent = eventDate.toLocaleString(DateTime.TIME_SIMPLE);

    // Cuenta regresiva
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    function updateCountdown() {
        const now = DateTime.local();
        const diff = eventDate.diff(now, ['days', 'hours', 'minutes', 'seconds']);

        // Actualizar los valores individuales
        daysElement.textContent = Math.floor(diff.days);
        hoursElement.textContent = Math.floor(diff.hours);
        minutesElement.textContent = Math.floor(diff.minutes);
        secondsElement.textContent = Math.floor(diff.seconds);
    }

    setInterval(updateCountdown, 1000);

    // Carrusel de imágenes
    const carouselContainer = document.getElementById('carousel-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const images = Array.from(carouselContainer.querySelectorAll('img'));
    let currentIndex = 0;

    function showImage(index) {
        carouselContainer.style.transform = `translateX(-${index * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    // Modal de galería de imágenes
    const galleryModal = document.createElement('div');
    galleryModal.id = 'gallery-modal';
    galleryModal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center hidden';
    galleryModal.innerHTML = `
        <button id="close-modal" class="absolute top-4 right-4 text-white text-2xl">&times;</button>
        <button id="modal-prev" class="absolute left-4 text-white text-3xl">&#8249;</button>
        <img id="modal-image" class="max-w-full max-h-full rounded-lg" />
        <button id="modal-next" class="absolute right-4 text-white text-3xl">&#8250;</button>
    `;
    document.body.appendChild(galleryModal);

    const modalImage = galleryModal.querySelector('#modal-image');
    const modalPrev = galleryModal.querySelector('#modal-prev');
    const modalNext = galleryModal.querySelector('#modal-next');
    const closeModal = galleryModal.querySelector('#close-modal');

    images.forEach((img, index) => {
        img.addEventListener('click', () => openModal(index));
    });

    let modalIndex = 0;

    function openModal(index) {
        modalIndex = index;
        modalImage.src = images[modalIndex].src;
        galleryModal.classList.remove('hidden');
    }

    function closeModalFunction() {
        galleryModal.classList.add('hidden');
    }

    modalPrev.addEventListener('click', () => {
        modalIndex = (modalIndex - 1 + images.length) % images.length;
        modalImage.src = images[modalIndex].src;
    });

    modalNext.addEventListener('click', () => {
        modalIndex = (modalIndex + 1) % images.length;
        modalImage.src = images[modalIndex].src;
    });

    closeModal.addEventListener('click', closeModalFunction);

    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            closeModalFunction();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (galleryModal.classList.contains('hidden')) return;

        switch (e.key) {
            case 'ArrowLeft':
                modalPrev.click();
                break;
            case 'ArrowRight':
                modalNext.click();
                break;
            case 'Escape':
                closeModalFunction();
                break;
        }
    });
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const guests = urlParams.get('guests');

    const guestNameElement = document.getElementById('guestName');
    const guestCountElement = document.getElementById('guestCount');
    const confirmButton = document.getElementById('confirmButton');
    const calendarButton = document.getElementById('calendarButton');

    if (guestNameElement) guestNameElement.textContent = name;
    if (guestCountElement) guestCountElement.textContent = guests;

    if (confirmButton) {
        confirmButton.addEventListener('click', () => {
            const message = `Hola! Soy ${name} y confirmo asistencia para el 5to Aniversario de Lamelas y Chaumont, para ${guests} persona${guests > 1 ? 's' : ''}.`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappLink = `https://wa.me/5493816502438?text=${encodedMessage}`;
            window.open(whatsappLink, '_blank');
        });
    }

    if (calendarButton) {
        calendarButton.addEventListener('click', () => {
            const eventDetails = {
                text: '5to Aniversario Lamelas y Chaumont',
                dates: '20241214T210000/20241215T020000',
                details: 'Celebración del 5to Aniversario de Lamelas y Chaumont',
                location: 'Salon Las cañas. Diagonal Raúl Leccesi Colectora Norte km 5, Tafi Viejo',
                reminders: [
                    ['2', 'days']
                ]
            };

            const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.text)}&dates=${eventDetails.dates}&details=${encodeURIComponent(eventDetails.details)}&location=${encodeURIComponent(eventDetails.location)}&sf=true&output=xml&reminders=${eventDetails.reminders[0][0]}%2C${eventDetails.reminders[0][1]}`;

            window.open(calendarUrl, '_blank');
        });
    }
  
});
