//tajeta del curso
export default function CourseCard({ course }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-700 mb-4">{course.description}</p>
            <p className="text -sm mt-1">Profesor: {course.teacher?.name}</p>



        </div>
    );
}