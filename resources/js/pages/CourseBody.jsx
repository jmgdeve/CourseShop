//pagina donde se muestra un curso
import {useUser} from '../UserContext';
import api from '../../api';
import { use, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function CourseBody () {
//agregar logica de asegurarse que es profe
const { user } = useUser();
const [courseDetails, setCourseDetails] = useState(null);
const {courseId} = useParams(); // Obtener el ID de la URL

//useEffect para obtener los detalles del curso cuando cambia el courseId "[courseId])""
useEffect(() => {
api.get(`/courses/${courseId}`)
    .then((res) => {setCourseDetails(res.data)})
    .then (console.log('Detalles del curso:', courseDetails))
    .catch((err) => console.error('Error al obtener los detalles del curso:', err));
}, [courseId]);



    return (
         <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">{courseDetails.title}</h3>
            <p className="text-gray-700 mb-4">{courseDetails.description}</p>
            <p className="text -sm mt-1">Profesor: {courseDetails.teacher?.name}</p>
        </div>
    );
}