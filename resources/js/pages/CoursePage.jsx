//pagina donde se muestra la lista de cursos los cursos
import { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import api from '../../api';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';

export default function CoursePage() {
    const [courses, setCourses] = useState([]);
    const { user } = useUser();
    const navigate = useNavigate(); 

    //Navegar al curso
    const checkCourse = (courseId) => {
        
        console.log('Entrando al curso con ID:', courseId);
        navigate(`/courses/${courseId}`);
    };


    //funcion para updatear curso desde profesor
    const update = (courseId, updatedCourse) => {
        api.put(`/courses/${courseId}`, updatedCourse)
    }

    // función para borrar el curso desde el profesor
    const deletecourse = (courseId) => {
        api.delete(`/courses/${courseId}`)
            .then(() => {
                setCourses(courses.filter(course => course.id !== courseId));
            })
            .catch((err) => console.error('Error al eliminar el curso:', err));
    };
    
    //funcion para apuntar a un curso desde alumno
    const subscribe = (courseId) => {
        console.log ('role:', user.role);
        api.post(`/courses/${courseId}/subscribe`)
            .then(() => {
                
                console.log('Suscripción exitosa al curso:', courseId);
            })
            .catch((err) => console.error('Error al suscribirse al curso:', err));
    };

    useEffect(() => {
        // Definir el endpoint basado en el rol del usuario
        let endpoint = '/courses';
        if (user.role === 'guest') {
            endpoint = '/teachercourses';
        }
        //peticion al endpoint
        api.get(endpoint)
            .then((res) => setCourses(res.data))
            .catch((err) => console.error('Error en la peticion de courses:', err));
    }
        , []);
    // Mostrar los cursos 
    return (
        <div className='container mx-auto p-4'>
            <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => navigate('/dashboard')}
            >
                Ir al Dashboard
            </button>
            <h2 className='text-2x1 font-bold mb-4'>Cursos disponibles</h2>
            <div className='grid gap-4'>
                {courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        /* Pasar las props al CourseCard */
                        course={course}
                        onDelete={deletecourse}
                        updatecourse={update}
                        onSubscribe={subscribe}
                        checkCourse={checkCourse}

                        />
                ))}
            </div>
            <div>


            </div>
        </div>

    );


}

