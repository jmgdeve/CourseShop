<?php

namespace App\Http\Controllers\Api;


use Illuminate\Http\Request;
use App\Models\Course;
use Illuminate\Support\Facades\Auth;


 

class CourseController 
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return response()->json(course::with('teacher')->get()); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validación de datos
        $validated= $request->validate ([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1000'],
        ]);

        $course = Course::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'teacher_id' => $request->user()->id, // Asignar el ID del usuario autenticado como teacher_id
        ]);
        return response()->json([
            'message' => 'Curso creado exitosamente',
            'course' => $course,
        ], 201);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $course = Course::with('teacher')->findOrFail($id);
        return response()->json($course);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Verificar si el curso existe y si el usuario autenticado es el profesor del curso
        $course = Course::findOrFail($id);
        if ($course->teacher_id !== $request->user()->id()){
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        // Validar los datos de entrada
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1000'],
        ]);
        // Actualizar el curso
        $course->update($validated);
           
        return response()->json($course);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $course = Course::findOrFail($id);
        // Verificar si el usuario autenticado es el profesor del curso
        if ($course->teacher_id !== Auth::id()){
            return response()->json(['error' => 'No autorizado'], 403);
        }else {
            $course->delete();
            return response()->json(['message' => 'Curso eliminado exitosamente']);
        }
        
    }
}
