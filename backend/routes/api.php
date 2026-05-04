<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

//Test api routes
Route::get('/', function () {
    return response()->json(['message' => 'API Working']);
});

// Login (public)
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/profile', [AuthController::class, 'profile']);

    Route::post('/logout', [AuthController::class, 'logout']);

});