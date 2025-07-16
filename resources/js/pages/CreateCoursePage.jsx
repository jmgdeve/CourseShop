import CourseForm from '../components/CourseForm';
import { useNavigate } from 'react-router-dom';

export default function CreateCoursePage() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/courses');
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <CourseForm onSuccess={handleSuccess} />
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => navigate('/dashboard')}
      >
        Ir al Dashboard
      </button>
    </div>
  );
}