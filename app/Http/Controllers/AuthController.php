<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\DB;




class AuthController
{


    public function register(RegisterRequest $request): JsonResponse
    {
        //transaccion para que no se cree el usuario si no se valida el role (en desarrollo)
        return DB::transaction (function () use ($request) {
            $request->validated();

            // Verificar si el usuario ya existe
            if (User::where('email', $request->email)->exists()) {
                return response()->json(['message' => 'User already exists'], 409);
            }
        
        // Crear usuario
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Asignar rol (por defecto 'student' si no se envía uno)
        $user->assignRole($request->role ?? 'user');

        // Crear token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Devolver respuesta
        return response()->json([
            'message' => 'User registered successfully',
            'token' => $token,
        ], 201);
        });
    }
    public function login(LoginRequest $request): JsonResponse
    {

        $request->validated();

        // Si el usuario existe o no
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
        ], 200);
    }
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
}