<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\CourseController;






// RUTAS DE AUTENTICACIÓN
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// USER INFO
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = $request->user();
    $role = $user->getRoleNames()->first();//role en spatie, devuleve el primero asignado, por que en un futuro quizá un usuario tenga varios roles
    
    return response()->json([
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        'role' => $role,
    ]);
});

// RUTAS DE LA API CURSOS
Route::middleware('auth:sanctum')->group(function () {
    // rutas de todos los profesores
    Route::get('/courses', [CourseController::class, 'index']);
    //rutas de el profesor autenticado
    Route::get('/teachercourses', [CourseController::class, 'coursesByTeacher'])->middleware('role:guest');
    //role guest
    Route::post('/courses', [CourseController::class, 'store'])->middleware('role:guest');
    Route::get('/courses/{id}', [CourseController::class, 'show']);
    Route::delete('/courses/{id}', [CourseController::class, 'destroy'])->middleware('role:guest');
    Route::put('/courses/{id}', [CourseController::class, 'update'])->middleware('role:guest');
   //poner aqui ruta para seleccionar un curso pa traves del id, y ver cuantos alumnos hay de ese curso
   Route::get('/courses/{id}', [CourseController::class, 'show'])->middleware('role:guest');

    //role user
    Route::post('/courses/{id}/subscribe', [CourseController::class, 'subscribe'])->middleware('role:user');
    Route::get('/mycourses', [CourseController::class, 'MyCourses'])->middleware('role:user');
});