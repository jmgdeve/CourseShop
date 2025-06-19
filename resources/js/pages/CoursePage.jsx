//pagina de los cursos
import { useEffect, useState } from 'react';

import CourseCard from '../components/CourseCard';
import api from '../../api';

export default function CoursePage() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        api.get('/courses')
            .then((res) => setCourses(res.data))
            .catch((err) => console.error('Error en la peticion api de courses:', err));
    }
        , []);


    return (
        <div className='container mx-auto p-4'>


            <h2 className='text-2x1 font-bold mb-4'>Cursos disponibles</h2>
            <div className='grid gap-4'>
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}

            </div>




        </div>

    );


}

