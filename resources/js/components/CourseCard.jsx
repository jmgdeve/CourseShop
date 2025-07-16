//tajeta del curso

import { useUser } from "../UserContext";
import { useState } from "react";
import CourseForm from "./CourseForm";
import api from "../../api";



export default function CourseCard({ course, onDelete, onUpdate, onSubscribe, checkCourse }) {
    const { user } = useUser();
    const [showEdit, setShowEdit] = useState(false);


    // Verifica si el usuario es un profesor y es el dueño del curso
    const teacherboolean = user?.role === 'guest' && user?.id === course.teacher.id;
    //comprobacion de que es estudiante el usuario logueado
    const studentboolean = user?.role === 'user';



    return (
        <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-700 mb-4">{course.description}</p>
            <p className="text -sm mt-1">Profesor: {course.teacher?.name}</p>
            {/* Booleano para comprobar si es profesor y sus cursos */}
            {teacherboolean && (
                <>  
                    <button onClick={() => checkCourse (course.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Entrar al curso
                    </button>
                    <button onClick={() => onDelete(course.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        Eliminar curso
                    </button>
                    <button onClick={() => setShowEdit(!showEdit)}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        Actualizar curso
                    </button>
                    {showEdit && (
                        <div className="mt-2">
                            <CourseForm
                                initialData={course}
                                onSuccess={() => setShowEdit(false)}
                                onSubmit={async (form) => {
                                    await api.put(`/courses/${course.id}`, form);
                                    if (onUpdate) onUpdate();
                                }}
                            />
                        </div>
                    )}
                </>
            )}
            {/* Mostrar boton de inscribirse si el usuario es estudiante */}

            {studentboolean && (
                <>
                    <button onClick={() => onSubscribe(course.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Inscribirse al curso
                    </button>

                </>
            )}


        </div>

    );
}