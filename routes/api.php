<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\CourseController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');




// RUTAS DE AUTENTICACIÓN
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// USER INFO
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = $request->user();
    $role = $user->getRoleNames()->first();//role en spatie
    
    return response()->json([
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        'role' => $role,
    ]);
});

// RUTAS DE LA API CURSOS
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/courses', [CourseController::class, 'index']);
    //role guest
    Route::post('/courses', [CourseController::class, 'store'])->middleware('role:guest');
    Route::get('/courses/{id}', [CourseController::class, 'show']);
    Route::delete('/courses/{id}', [CourseController::class, 'destroy'])->middleware('role:guest');
});