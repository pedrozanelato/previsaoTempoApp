<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrevisaoTempo extends Model
{
    use HasFactory;

    protected $table = 'previsao_tempo';

    protected $fillable = ['city', 'country', 'region', 'temperature', 'weather_icons', 'is_day', 'weather_code', 'wind_speed', 'precip', 'humidity', 'localtime', 'uv_index'];
    
}
