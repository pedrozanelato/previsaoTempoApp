<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('previsao_tempo', function (Blueprint $table) {
            $table->id();
            $table->string('city');
            $table->string('country');
            $table->string('region');
            $table->integer('temperature');
            $table->boolean('salvo')->default(0);
            $table->string('weather_icons');
            $table->char('is_day', 3);
            $table->string('weather_code');
            $table->integer('wind_speed');
            $table->decimal('precip', 3, 1);
            $table->integer('humidity');
            $table->integer('uv_index');
            $table->dateTime('localtime');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('previsao_tempo');
    }
};
