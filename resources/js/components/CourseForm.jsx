//formulario de creacion y actualizacion de cursos

import { useState } from 'react';
import api from '../../api';


export default function CourseForm({ onSuccess, initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  //prevenir recargar la página
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (onSubmit) {
        await onSubmit(form); // funcion para actualizar el curso

      } else {
        await api.post('/courses', form);
      }
      if (onSuccess) onSuccess(); // para redirigir en caso de éxito (prop del componente padre CoursePage)
    } catch (err) {
      console.log(err);
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
