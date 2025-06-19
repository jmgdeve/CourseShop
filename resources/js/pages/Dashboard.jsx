
import { Link } from 'react-router-dom';
import {useUser} from '../UserContext';




export default function Dashboard({ onLogout }) {
  const {user} = useUser();





  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Bienvenido al Dashboard</h1>
      <button
        onClick={onLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        Cerrar sesión
      </button>
      {user?.role === 'guest' && (
        <Link to="/courses/new ">curso nuevo</Link>)}
    </div>
  );
}