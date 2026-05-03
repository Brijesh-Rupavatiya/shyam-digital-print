<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

//Test api routes
Route::get('/', function () {
    return response()->json(['message' => 'API Working']);
});

//login api
Route::post('/login', [AuthController::class, 'login']);