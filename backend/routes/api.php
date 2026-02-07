<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user/profile', [AuthController::class, 'updateProfile']);

    // Missions
    Route::get('/missions', [\App\Http\Controllers\MissionController::class, 'index']);
    Route::post('/missions', [\App\Http\Controllers\MissionController::class, 'store']);
    Route::get('/missions/{mission}', [\App\Http\Controllers\MissionController::class, 'show']);
    Route::put('/missions/{mission}', [\App\Http\Controllers\MissionController::class, 'update']);
    Route::delete('/missions/{mission}', [\App\Http\Controllers\MissionController::class, 'destroy']);

    // Messages
    Route::get('/messages', [\App\Http\Controllers\MessageController::class, 'index']);
    Route::post('/messages', [\App\Http\Controllers\MessageController::class, 'store']);

    // Users (Public/Shared)
    Route::get('/users', [\App\Http\Controllers\UserController::class, 'index']);
    Route::get('/users/{id}', [\App\Http\Controllers\UserController::class, 'show']);
});
