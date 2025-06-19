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
    </div>
  );
}