let loadingResult = `<h5 class="card-title placeholder" id="resultCity1">{data.response.city}, {data.response.region} - {data.response.country}</h5>
    <h1 class="card-title placeholder-glow placeholder"></h1>
    <p class="card-text placeholder" id="resultCondition1">{data.response.weather_code}</p>
    <div class="row">
        <div class="col-6 indicesTempo">
            <div class="indicesTempoItem">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-droplet-fill placeholder" viewBox="0 0 16 16"><path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6M6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13"></path>
                </svg>
                <span class="placeholder"> Umidade</span>
            </div>
        </div>
        <div class="col-6 indicesTempo">
            <div class="indicesTempoItem">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-droplet-fill placeholder" viewBox="0 0 16 16"><path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6M6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13"></path>
                </svg>
                <span class="placeholder"> Umidade</span>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-6 indicesTempo">
            <div class="indicesTempoItem">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-droplet-fill placeholder" viewBox="0 0 16 16"><path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6M6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13"></path>
                </svg>
                <span class="placeholder"> Umidade</span>
            </div>
        </div>
        <div class="col-6 indicesTempo">
            <div class="indicesTempoItem">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-droplet-fill placeholder" viewBox="0 0 16 16"><path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6M6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13"></path>
                </svg>
                <span class="placeholder"> Umidade</span>
            </div>
        </div>
    </div>
    <button type="button" class="btn btn-outline-primar placeholder" id="saveClima">
        Salvar 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
        </svg>
    </button>
    
    <button type="button" class="btn btn-outline-success placeholder" id="compararClima">Comparar <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
        </svg>
    </button>`;
let loadingResultCompara = `<div class="row">
                    <h5 class="card-title col-6 comparaCity placeholder" id="comparaCity1">{dataClima.response.city}, {dataClima.response.region} - {dataClima.response.country}</h5>
                    <h5 class="card-title col-6 comparaCity placeholder" id="comparaCity2">{data.response.city}, {data.response.region} - {data.response.country}</h5>
                </div>
                
                

                <div class="row">
                    <p class="card-text col-6 compareCondition placeholder" id="compareCondition1">{.response.weather_code}</p>
                    <p class="card-text col-6 compareCondition placeholder" id="compareCondition2">{.response.weather_code}</p>
                </div>
                <ul class="list-group list-group-flush listaItensCompara">
                    <li class="list-group-item">
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="placeholder bi bi-droplet-fill" viewBox="0 0 16 16"><path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6M6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13"></path>
                            </svg>
                            <span class="placeholder"> Umidade</span>
                        </p>
                        <div class="row">
                            <p class="col-6 compareItens placeholder">{dataClima.response.}%</p>
                            <p class="col-6 placeholder">{data.response.}%</p>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="placeholder bi bi-cloud-rain-heavy-fill" viewBox="0 0 16 16"><path d="M4.176 11.032a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293m3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293m3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293m3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293m.229-7.005a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973"></path>
                            </svg>
                            <span class="placeholder"> Precipitação</span>
                        </p>
                        <div class="row">
                            <p class="col-6 compareItens placeholder">{dataClima.response.}%</p>
                            <p class="col-6 compareItens placeholder">{data.response.}%</p>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind placeholder" viewBox="0 0 16 16">
                            <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"></path>
                            </svg>
                            <span class="placeholder"> Vento</span>
                        </p>
                        <div class="row">
                            <p class="col-6 compareItens placeholder">{.response.}%</p>
                            <p class="col-6 compareItens placeholder"></p>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-thermometer-sun placeholder" viewBox="0 0 16 16">
                                <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5"></path>
                                <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1m5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5m4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0M8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5M12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5m-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708M8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5"></path>
                            </svg>
                            <span class="placeholder"> Índice UV</span>
                        </p>
                        <div class="row">
                            <p class="col-6 compareItens placeholder">{.response.uv_index}%</p>
                            <p class="col-6 compareItens placeholder">{data.response.}%</p>
                        </div>
                    </li>
                </ul>
                
                <div class="row">
                    <div class="comparaHorarioLocal1 col-6">
                        <p class="card-text placeholder">{new Date(dataClima)</p>
                        <p></p>
                        <span class="card-text placeholder">{periododia1}</span>
                    </div>
                    <div class="comparaHorarioLocal2 col-6">
                        <p class="card-text placeholder">{new Date(dataClima)</p>
                        <p></p>
                        <span class="card-text placeholder">{periododia2}</span>
                    </div>
                </div>`;