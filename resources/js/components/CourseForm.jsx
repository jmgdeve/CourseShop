import { useState } from 'react';
import api from '../../api';


export default function CourseForm({ onSuccess }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await api.post('/courses', form);
      if (onSuccess) onSuccess(); // para redirigir o refrescar
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al crear el curso';
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Crear nuevo curso</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        name="title"
        placeholder="Título del curso"
        className="w-full p-2 mb-2 border rounded"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Descripción"
        className="w-full p-2 mb-4 border rounded"
        value={form.description}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Guardar curso
      </button>
    </form>
  );
}
