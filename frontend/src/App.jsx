import { useEffect, useState } from 'react';

function App() {
  const [plants, setPlants] = useState([]);
  const [form, setForm] = useState({
    name: '',
    species: '',
    planting_date: '',
    emergence_start: '',
    emergence_end: '',
    location: '',
    notes: ''
  });

  useEffect(() => {
    fetch('http://localhost:4000/api/plants')
      .then((res) => res.json())
      .then(setPlants);
  }, []);

  return (
    <div className="w-full max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-soil">
        🌱 Garden Tracker
      </h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          {/* Add Plant Form */}
          <form className="bg-mint shadow-md rounded p-4 mb-6 grid gap-3"
            onSubmit={async (e) => {
              e.preventDefault();
              const res = await fetch('http://localhost:4000/api/plants', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
              });
              const newPlant = await res.json();
              setPlants([...plants, newPlant]);
              setForm({
                name: '',
                species: '',
                planting_date: '',
                emergence_start: '',
                emergence_end: '',
                location: '',
                notes: '',
              });
            }}
          >
            <h2 className="text-xl font-semibold mb-2">Add a Plant</h2>
            {Object.entries(form).map(([field, value]) => (
              <div key={field}>
                <label className="block text-sm font-medium capitalize mb-1">
                  {field.replace(/_/g, ' ')}
                </label>
                <input
                  type={field.includes('date') ? 'date' : 'text'}
                  value={value}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full p-2 border rounded"
                  required={field === 'name' || field === 'planting_date'}
                />
              </div>
            ))}
            <button className="bg-olive hover:bg-sage text-white py-2 px-4 rounded transition">
              Add Plant
            </button>

          </form>
        </div>
        <div>
          {/* Display Plant List */}
          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {plants.map((p) => (
              <li key={p.id} className="bg-white border-l-4 border-sage p-3 rounded shadow">
                <h2 className="text-lg font-semibold text-soil">{p.name} <span className="text-gray-500 text-sm">({p.species})</span></h2>
                <p className="text-sm">Planted: {p.planting_date}</p>
                <p className="text-sm">Location: {p.location}</p>
                {p.notes && <p className="text-sm text-gray-700 mt-1">{p.notes}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;