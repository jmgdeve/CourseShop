import { useUser } from "../UserContext";




export default function MyCourse({ course }) {
    const { user } = useUser();





    //comprobacion de que es estudiante el usuario logueado
    const studentboolean = user?.role === 'user';




    return (
        <>
        <div className="font-semibold">Mis cursos</div>

            {studentboolean && (

                <div className="bg-gray shadow-md rounded-lg p-4 hover:shadow-lg mb-3 transition-shadow duration-300">
                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                    <p className="text-gray-700 mb-4">{course.description}</p>
                    <p className="text -sm mt-1">Profesor: {course.teacher?.name}</p>
                </div>

            )}
        </>
    );
}