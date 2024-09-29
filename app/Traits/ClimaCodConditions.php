<?php

namespace App\Traits;

use Illuminate\Support\Facades\Log;

trait ClimaCodConditions
{
    protected function findConditionByCode($code)
    {
        $arrayCondition = [
            395 => ["Neve moderada ou forte em área com trovões", "wsymbol_0012_heavy_snow_showers", "wsymbol_0028_heavy_snow_showers_night"], 
            392 => ["Neve fraca e irregular em área com trovões", "wsymbol_0016_thundery_showers", "wsymbol_0032_thundery_showers_night"],
            389 => ["Chuva moderada ou forte em área com trovoadas", "wsymbol_0024_thunderstorms", "wsymbol_0040_thunderstorms_night"],
            386 => ["Chuva fraca em área com trovões", "wsymbol_0016_thundery_showers", "wsymbol_0032_thundery_showers_night"],
            377 => ["Chuvas moderadas ou fortes com pedras de gelo", "wsymbol_0021_cloudy_with_sleet", "wsymbol_0037_cloudy_with_sleet_night"],
            374 => ["Chuvas leves de pedras de gelo", "wsymbol_0013_sleet_showers", "wsymbol_0029_sleet_showers_night"],
            371 => ["Chuvas de neve moderadas ou fortes", "wsymbol_0012_heavy_snow_showers", "wsymbol_0028_heavy_snow_showers_night"],
            368 => ["Chuvas de neve fracas", "wsymbol_0011_light_snow_showers", "wsymbol_0027_light_snow_showers_night"],
            365 => ["Chuvas de granizo moderadas ou fortes", "wsymbol_0013_sleet_showers", "wsymbol_0029_sleet_showers_night"],
            362 => ["Chuvas de granizo fracas", "wsymbol_0013_sleet_showers", "wsymbol_0029_sleet_showers_night"],
            359 => ["Chuva torrencial", "wsymbol_0018_cloudy_with_heavy_rain", "wsymbol_0034_cloudy_with_heavy_rain_night"],
            356 => ["Chuva moderada ou forte", "wsymbol_0010_heavy_rain_showers", "wsymbol_0026_heavy_rain_showers_night"],
            353 => ["Chuva leve", "wsymbol_0009_light_rain_showers", "wsymbol_0025_light_rain_showers_night"],
            350 => ["Pedras de gelo", "wsymbol_0021_cloudy_with_sleet", "wsymbol_0037_cloudy_with_sleet_night"],
            338 => ["Neve forte", "wsymbol_0020_cloudy_with_heavy_snow", "wsymbol_0036_cloudy_with_heavy_snow_night"],
            335 => ["Neve forte e irregular", "wsymbol_0012_heavy_snow_showers", "wsymbol_0028_heavy_snow_showers_night"],
            332 => ["Neve moderada", "wsymbol_0020_cloudy_with_heavy_snow", "wsymbol_0036_cloudy_with_heavy_snow_night"],
            329 => ["Neve moderada irregular", "wsymbol_0020_cloudy_with_heavy_snow", "wsymbol_0036_cloudy_with_heavy_snow_night"],
            326 => ["Neve fraca", "wsymbol_0011_light_snow_showers", "wsymbol_0027_light_snow_showers_night"],
            323 => ["Neve fraca irregular", "wsymbol_0011_light_snow_showers", "wsymbol_0027_light_snow_showers_night"],
            320 => ["Granizo moderado ou forte", "wsymbol_0019_cloudy_with_light_snow", "wsymbol_0035_cloudy_with_light_snow_night"],
            317 => ["Granizo leve", "wsymbol_0021_cloudy_with_sleet", "wsymbol_0037_cloudy_with_sleet_night"],
            314 => ["Chuva congelante moderada ou forte", "wsymbol_0021_cloudy_with_sleet", "wsymbol_0037_cloudy_with_sleet_night"],
            311 => ["Chuva leve e gelada", "wsymbol_0021_cloudy_with_sleet", "wsymbol_0037_cloudy_with_sleet_night"],
            308 => ["Chuva forte", "wsymbol_0018_cloudy_with_heavy_rain", "wsymbol_0034_cloudy_with_heavy_rain_night"],
            305 => ["Chuva forte em alguns momentos", "wsymbol_0010_heavy_rain_showers", "wsymbol_0026_heavy_rain_showers_night"],
            302 => ["Chuva moderada", "wsymbol_0010_heavy_rain_showers", "wsymbol_0026_heavy_rain_showers_night"],
            296 => ["Chuva fraca", "wsymbol_0018_cloudy_with_heavy_rain", "wsymbol_0034_cloudy_with_heavy_rain_night"],
            293 => ["Chuva fraca e irregular", "wsymbol_0017_cloudy_with_light_rain", "wsymbol_0033_cloudy_with_light_rain_night"],
            284 => ["Chuvisco forte e gelado", "wsymbol_0021_cloudy_with_sleet", "wsymbol_0037_cloudy_with_sleet_night"],
            281 => ["Chuvisco gelado", "wsymbol_0021_cloudy_with_sleet", "wsymbol_0037_cloudy_with_sleet_night"],
            266 => ["Chuvisco fraco", "wsymbol_0017_cloudy_with_light_rain", "wsymbol_0033_cloudy_with_light_rain_night"],
            263 => ["Chuvisco leve e irregular", "wsymbol_0009_light_rain_showers", "wsymbol_0025_light_rain_showers_night"],
            260 => ["Névoa congelante", "wsymbol_0007_fog", "wsymbol_0007_fog"],
            248 => ["Névoa", "wsymbol_0007_fog", "wsymbol_0007_fog"],
            230 => ["Nevasca", "wsymbol_0020_cloudy_with_heavy_snow", "wsymbol_0036_cloudy_with_heavy_snow_night"],
            227 => ["Soprando neve", "wsymbol_0019_cloudy_with_light_snow", "wsymbol_0035_cloudy_with_light_snow_night"],
            200 => ["Surtos trovejantes nas proximidades", "wsymbol_0016_thundery_showers", "wsymbol_0032_thundery_showers_night"],
            185 => ["Chuvisco gelado nas proximidades", "wsymbol_0021_cloudy_with_sleet", "wsymbol_0037_cloudy_with_sleet_night"],
            182 => ["Granizo irregular nas proximidades", "wsymbol_0021_cloudy_with_sleet", "wsymbol_0037_cloudy_with_sleet_night"],
            179 => ["Neve irregular nas proximidades", "wsymbol_0013_sleet_showers", "wsymbol_0029_sleet_showers_night"],
            176 => ["Chuva irregular nas proximidades", "wsymbol_0009_light_rain_showers", "wsymbol_0025_light_rain_showers_night"],
            143 => ["Névoa", "wsymbol_0006_mist", "wsymbol_0006_mist"],
            122 => ["Nublado", "wsymbol_0004_black_low_cloud", "wsymbol_0004_black_low_cloud"],
            119 => ["Nublado", "wsymbol_0003_white_cloud", "wsymbol_0004_black_low_cloud"],
            116 => ["Parcialmente Nublado", "wsymbol_0002_sunny_intervals", "wsymbol_0008_clear_sky_night"],
            113 => ["Céu Limpo", "wsymbol_0001_sunny", "wsymbol_0008_clear_sky_night"],
        ];
        
        $val = $arrayCondition[$code];
        return $val;
    }
}