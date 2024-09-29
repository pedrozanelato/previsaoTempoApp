<?php 
namespace App\Services;

use GuzzleHttp\Client;

class WeatherstackService
{
    public function getClimaByCity($city)
    {
        $client = new Client();
        $apiKey = env('WEATHERSTACK_API_KEY');
        $res = $client->get("http://api.weatherstack.com/current", [
            'query' => [
                'access_key' => $apiKey,
                'query' => $city,
            ]
        ]);

        $data = json_decode($res->getBody(), true);
        return $data;
    }
}