const { useState, useEffect } = React;

function AutocompleteInput() {
  const [guests, setGuests] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredGuests, setFilteredGuests] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetch('invitados.json')
      .then(response => response.json())
      .then(data => setGuests(data))
      .catch(error => console.error('Error fetching guest data:', error));
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowDropdown(true);

    if (value.length > 0) {
      const filtered = guests.filter(guest =>
        guest.name.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredGuests(filtered);
    } else {
      setFilteredGuests([]);
    }
  };

  const handleSelectGuest = (guest) => {
    setInputValue(guest.name);
    setShowDropdown(false);
    window.location.href = `invitacion.html?name=${encodeURIComponent(guest.name)}&guests=${guest.guests}`;
  };

  return (
    <div className="bg-green-700 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src="assets/logoinmo1.png" alt="Logo" className="w-32 h-auto" />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6 text-green-700">Coloque su nombre, se le mostrará una lista y debe elegir el que corresponda</h2>
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
            placeholder="Escriba su nombre"
            aria-label="Nombre del invitado"
            aria-autocomplete="list"
          />
          {showDropdown && filteredGuests.length > 0 && (
            <ul 
              className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-md"
              role="listbox"
            >
              {filteredGuests.map((guest, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectGuest(guest)}
                  className="p-2 hover:bg-green-100 cursor-pointer"
                  role="option"
                >
                  {guest.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<AutocompleteInput />, document.getElementById('root'));

