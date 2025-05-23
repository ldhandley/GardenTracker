import { useEffect, useState } from 'react';

function App() {
  const [plants, setPlants] = useState([]);
  const [editingId, setEditingId] = useState(null);
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

              const url = editingId
                ? `http://localhost:4000/api/plants/${editingId}`
                : `http://localhost:4000/api/plants`;

              const method = editingId ? 'PUT' : 'POST';

              const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
              });

              const updatedPlant = await res.json();

              if (editingId) {
                setPlants((prev) =>
                  prev.map((p) => (p.id === editingId ? updatedPlant : p))
                );
              } else {
                setPlants((prev) => [...prev, updatedPlant]);
              }

              // Reset form
              setForm({
                name: '',
                species: '',
                planting_date: '',
                emergence_start: '',
                emergence_end: '',
                location: '',
                notes: '',
              });
              setEditingId(null);
            }}
          >
            <h2 className="text-xl font-semibold mb-2">
              {editingId ? 'Update a Plant' : 'Add a Plant'}
            </h2>
            {Object.entries(form).map(([field, value]) => (
              <div key={field}>
                <label className="block text-sm font-medium capitalize mb-1">
                  {field.replace(/_/g, ' ')}
                </label>
                <input
                  type={
                    field.includes('date') || field.includes('emergence')
                      ? 'date'
                      : 'text'
                  }
                  value={value}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full p-2 border rounded"
                  required={field === 'name' || field === 'planting_date'}
                />
              </div>
            ))}
            <button className="bg-olive hover:bg-sage text-white py-2 px-4 rounded transition">
              {editingId ? 'Update Plant' : 'Add Plant'}
            </button>
          </form>
        </div>
        <div>
          {/* Display Plant List */}
          <ul className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">            {plants.map((p) => (
            <li key={p.id} className="relative bg-white border border-sage p-4 rounded-lg shadow-md min-w-[300px]">
              <h2 className="text-lg font-semibold text-soil mb-1">
                {p.name} <span className="text-gray-500 text-sm">({p.species})</span>
              </h2>
              <p className="text-sm">Planted: {p.planting_date}</p>
              <p className="text-sm">Location: {p.location}</p>
              {p.notes && <p className="text-sm text-gray-700 mt-1">{p.notes}</p>}

              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => {
                    setForm({
                      name: p.name || '',
                      species: p.species || '',
                      planting_date: p.planting_date || '',
                      emergence_start: p.emergence_start || '',
                      emergence_end: p.emergence_end || '',
                      location: p.location || '',
                      notes: p.notes || '',
                    });
                    setEditingId(p.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                  title="Edit plant"
                >
                  ✏️
                </button>

                <button
                  onClick={async () => {
                    const confirmDelete = window.confirm(`Are you sure you want to delete "${p.name}"?`);
                    if (!confirmDelete) return;

                    await fetch(`http://localhost:4000/api/plants/${p.id}`, {
                      method: 'DELETE',
                    });
                    setPlants(plants.filter((plant) => plant.id !== p.id));
                  }}
                  className="text-red-500 hover:text-red-700 text-sm"
                  title="Delete plant"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;