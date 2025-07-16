//página de inicio
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';

export default function Dashboard({ onLogout }) {
  const { user } = useUser();

  const studentboolean = user?.role === 'user';
  const teacherboolean = user?.role === 'guest';
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Bienvenido al Dashboard</h1>
      {/* boton cerrar sesion */}
      <button
        onClick={onLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        Cerrar sesión
      </button>

      {/* Mostrar enlace para crear curso si el usuario es profesor */}

      {user?.role === 'guest' && (
        <Link to="/courses/new">curso nuevo</Link>)}

      {/*boton de ver cursos */}

      <button
        className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
        <Link to="/courses">Ver cursos</Link>
      </button>
        {/*  boton para mostrar cursos del alumno */}

      {studentboolean && (
        <Link to="/mycourses" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Mis cursos
        </Link>
      )}
    </div>
  );
}