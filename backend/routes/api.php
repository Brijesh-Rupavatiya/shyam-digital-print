<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\CustomerEntryController;

/**
 * Test API
 */
Route::get('/', function () {
    return response()->json([
        'message' => 'API Working'
    ]);
});

/**
 * Public Routes
 */
Route::post('/login', [AuthController::class, 'login']);

/**
 * Protected Routes
 */
Route::middleware('auth:sanctum')->group(function () {

    /**
     * Auth
     */
    Route::get('/profile', [AuthController::class, 'profile']);

    Route::post('/logout', [AuthController::class, 'logout']);

    /**
     * Customers
     */

    // List customers
    Route::get('/customers', [CustomerController::class, 'index']);

    // Create customer
    Route::post('/customers', [CustomerController::class, 'store']);

    // Single customer
    Route::get('/customers/{id}', [CustomerController::class, 'show']);

    // Update customer
    Route::put('/customers/{id}', [CustomerController::class, 'update']);

    // Delete customer
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);

    /**
     * Customer Entries
     */

    // List entries
    Route::get('/entries', [CustomerEntryController::class, 'index']);

    // Create entry
    Route::post('/entries', [CustomerEntryController::class, 'store']);

    // Single entry
    Route::get('/entries/{id}', [CustomerEntryController::class, 'show']);

    // Update entry
    Route::put('/entries/{id}', [CustomerEntryController::class, 'update']);

    // Delete entry
    Route::delete('/entries/{id}', [CustomerEntryController::class, 'destroy']);

});


// WE CAN ALSO USE apiResource (apiResource automatically creates all the above routes for us, but here we are defining them manually for clarity)
// /**
//  * Customers
//  */
// Route::apiResource('customers', CustomerController::class);

// /**
//  * Entries
//  */
// Route::apiResource('entries', CustomerEntryController::class);
