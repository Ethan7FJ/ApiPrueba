<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;


class ConexionController extends Controller
{
    public function conexion()
    {
        try {

            $cienRegistros = [];

            for ($i = 1; $i < 6; $i++) {
                $api = Http::get("https://rickandmortyapi.com/api/character?page=$i");

                $data = $api->json();

                if (isset($data['results'])) {
                    $cienRegistros = array_merge($cienRegistros, $data['results']);
                }
            }

            return response()->json([
                'personas' => $cienRegistros,
            ], 200);

        } catch (\Exception $e) {
            Log::error("Error al obtener datos del api {$e->getMessage()}");
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function detalles($id)
    {
        try {

            $api = Http::get("https://rickandmortyapi.com/api/character/{$id}");

            $data = $api->json();

            return response()->json([
                'detalles' => $data,
            ], 200);

        } catch (\Exception $e) {
            Log::error("Error al obtener datos del api {$e->getMessage()}");
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function añadir(Request $request)
    {

        $requestf = $request->all();

        \Log::info('Google API Response: ', ['requestf' => $requestf]);

        $data = $requestf['data'];

        try {

            foreach ($data as $item) {
                DB::insert('INSERT INTO personajes (id, name, status, species, image, type, gender, origin_name, origin_url, location_name, location_url) VALUE(?,?,?,?,?,?,?,?,?,?,?)', [$item["id"], $item["name"], $item["status"], $item["species"], $item["image"], $item["type"], $item["gender"], $item["origin"]["name"], $item["origin"]["url"], $item["location"]["name"], $item["location"]["url"]]);
            }

            DB::insert('INSERT INTO estado (primer_estado, segundo_estado) VALUE (false,true)');

            return response()->json(["mensaje" => "Datos guardados"]);

        } catch (\Exception $e) {
            Log::error("Error al obtener datos del api {$e->getMessage()}");
            return response()->json(['error' => $e->getMessage()], 500);
        }

    }

    public function estados()
    {
        $estado_primero = DB::select('SELECT primer_estado FROM estado');
        $estado_segundo = DB::select('SELECT segundo_estado FROM estado');

        return response()->json([
            "primero" => $estado_primero,
            "segundo" => $estado_segundo
        ]);
    }

    public function dbconsulta()
    {
        $dataDB = DB::select("SELECT * FROM personajes");
        return response()->json([
            "dbData" => $dataDB
        ]);
    }

    public function editarDatos(Request $request)
    {
        $requesDta = $request->all();

       /*  $dataEdit = $requesDta['newData'];

        \Log::info('dataEdit: ', ['dataEdit' => $dataEdit]); */
        
        try {

            foreach ($requesDta as $item) {
                DB::update('UPDATE personajes SET status = ?, species = ?, type = ?, gender = ? WHERE id = ?', [$item["Status"], $item["Specie"],$item["Type"],$item["Gender"],$item["id_edit"]]);
            }

            return response()->json(["mensaje" => "Los datos fueron editados correctamente"]);

        } catch (\Exception $e) {
            Log::error("Error al obtener datos del api {$e->getMessage()}");
            return response()->json(['error' => $e->getMessage()], 500);
        }

    }

}