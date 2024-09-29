<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Traits\ApiResponse;
use App\Traits\ClimaCodConditions;
use Illuminate\Support\Facades\Validator;
use App\Models\PrevisaoTempo;
use App\Services\ViaCepService;
use App\Services\WeatherstackService;

class ClimaController extends Controller
{
    
    use ApiResponse;
    use ClimaCodConditions;
    private $viaCepService;
    private $weatherstackService;

    public function __construct(
        ViaCepService $viaCepService,
        WeatherstackService $weatherstackService,
    ) {
        $this->viaCepService = $viaCepService;
        $this->weatherstackService = $weatherstackService;
    }

    public function getCityCep(Request $request)
    {
        try {
            
            $validator = Validator::make($request->all(), ['cep' => 'required']);

            if ($validator->fails()) {
                return $this->responseErrorValidation($validator->errors());
            }
            
            $data = $this->viaCepService->getCityByCep($request->cep);
    
            if (isset($data['localidade'])) {
                
                return $this->responseSuccess(['city' => $data['localidade']]);
            }
    
            return $this->responseNotFound('CEP não encontrado.');
            
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
        
    }

    public function getClimaByCity(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), ['city' => 'required|string']);
            if ($validator->fails()) {
                return $this->responseErrorValidation($validator->errors());
            }

            $data = $this->weatherstackService->getClimaByCity($request->city);

            if (isset($data['current']) && isset($data['location'])) {
                
                $data = [
                    'city' => $data['location']['name'],
                    'country' => $data['location']['country'],
                    'region' => $data['location']['region'],
                    'localtime' => $data['location']['localtime'],
                    'temperature' => $data['current']['temperature'],
                    'weather_icons' => $data['current']['weather_icons'][0],
                    'wind_speed' => $data['current']['wind_speed'],
                    'precip' => $data['current']['precip'],
                    'humidity' => $data['current']['humidity'],
                    'is_day' => $data['current']['is_day'],
                    'uv_index' => $data['current']['uv_index'],
                    'weather_code' => $this->findConditionByCode($data['current']['weather_code'])[0]
                ];
                
                $previsaoTempo = PrevisaoTempo::create($data);

                return $this->responseSuccess($previsaoTempo);
            }

            return $this->responseNotFound('Cidade não encontrada.');
        }
        catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
    
    public function getHistorico(Request $request)
    {
        $historico = PrevisaoTempo::orderBy('created_at', 'desc')->get();

        return response()->json([
                'data' => $historico,
                'totalCount' => 10,
        ]);
    }
    
    public function getClimasSalvos(Request $request)
    {
        $historico = PrevisaoTempo::where('salvo', '=', 1)->orderBy('updated_at', 'desc')->get();

        return response()->json([
                'data' => $historico,
                'totalCount' => 10,
        ]);
    }
    
    public function saveClima(Request $request)
    {
        $validator = Validator::make($request->all(), ['idCity' => 'required|integer']);

        if ($validator->fails()) {
            return $this->responseErrorValidation($validator->errors());
        }

        try {
            $previsao = PrevisaoTempo::findOrFail($request->idCity);
            $previsao->salvo = true;
            $previsao->save();

            return $this->responseSuccess($previsao);
        } catch (ModelNotFoundException $e) {
            return $this->responseRegisterNotFound('Registro não encontrado.');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
}
