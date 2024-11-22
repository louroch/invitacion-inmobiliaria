document.addEventListener('DOMContentLoaded', async () => {
    const guestList = document.getElementById('guestList');
    const searchForm = document.getElementById('searchForm');
    const guestNameInput = document.getElementById('guestName');
    const errorMessage = document.getElementById('errorMessage');

    try {
        const response = await fetch('invitados.json');
        const guests = await response.json();

        guests.forEach(guest => {
            const option = document.createElement('option');
            option.value = guest.name;
            guestList.appendChild(option);
        });

        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const selectedName = guestNameInput.value.trim();
            const selectedGuest = guests.find(guest => guest.name.toLowerCase() === selectedName.toLowerCase());

            if (selectedGuest) {
                window.location.href = `invitacion.html?name=${encodeURIComponent(selectedGuest.name)}&guests=${selectedGuest.guests}`;
            } else {
                errorMessage.classList.remove('hidden');
            }
        });

        guestNameInput.addEventListener('input', () => {
            errorMessage.classList.add('hidden');
        });

    } catch (error) {
        console.error('Error fetching guest data:', error);
        errorMessage.textContent = 'Error al cargar la lista de invitados. Por favor, intente más tarde.';
        errorMessage.classList.remove('hidden');
    }
});

