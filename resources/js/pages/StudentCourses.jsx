import React, { useEffect, useState } from 'react';
import { useUser } from '../UserContext';
import api from '../../api';
import MyCourse from '../components/MyCourse';

export default function StudentCourses() {


    const [courses, setCourses] = useState([]);
    const { user } = useUser();
    const studentboolean = user?.role === 'user';

    useEffect(() => {

        api.get('/mycourses')
            .then((res) => setCourses(res.data))
            .catch((err) => console.error('Error al obtener los cursos del alumno:', err));

    }, []);




    return (


        <div
            className='container mx-auto p-4'>
            {studentboolean && (
                courses.map((course) => (
                    <MyCourse
                        key={course.id}
                        course={course} />

                ))
            )}


        </div>

    );
}
