<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::group([
	'middleware' => 'api',
	'prefix' => 'auth'
], function ($router) {
	Route::post('/login', [AuthController::class, 'login']);
	Route::post('/register', [AuthController::class, 'register']);
	Route::post('/logout', [AuthController::class, 'logout']);
	Route::post('/refresh', [AuthController::class, 'refresh']);

	// Api ______________________________________________________
	Route::get('/users', [UserController::class, 'index']);
	Route::get('/users/{id}', [UserController::class, 'show']);
	Route::put('/users/{id}', [UserController::class, 'update']);
});
