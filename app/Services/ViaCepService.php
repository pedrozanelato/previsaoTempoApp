<?php
namespace App\Services;

use GuzzleHttp\Client;

class ViaCepService
{
    public function getCityByCep($cep)
    {
        
        $client = new Client();
        $response = $client->get("https://viacep.com.br/ws/{$cep}/json/");
        $data = json_decode($response->getBody(), true);

        return $data;
    }
}