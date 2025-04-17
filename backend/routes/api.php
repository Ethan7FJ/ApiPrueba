<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConexionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/conexion', [ConexionController::class, 'conexion']);
Route::get('/detalles/{id}', [ConexionController::class, 'detalles']);
Route::post('/añadir/info', [ConexionController::class, 'añadir']);
Route::get('/estados', [ConexionController::class, 'estados']);
Route::get('/basedatos/consultar', [ConexionController::class, 'dbconsulta']);
Route::post('/editar/personaje', [ConexionController::class, 'editarDatos']);

