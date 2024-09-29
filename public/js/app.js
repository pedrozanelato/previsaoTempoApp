
$(document).ready(function() {
    applyCepMask("#cep");
    applyCepMask("#cepCompare");
    
    buttonHandler("#btn-get-clima", "#climaForm", getClima);
    buttonHandler("#btn-compara-clima", "#climaFormCompare", comparaClimas);
});

function applyCepMask(input) {
    $(input).mask("99999-999");
}

function buttonHandler(button, formSelect, callback) {
    $(button).click(function(event) {
        const form = $(formSelect)[0];
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            $(formSelect).addClass('was-validated');
        } else {
            callback();
        }
    });
}

let dataClima = [];

function appendAlert(message, type) {
    const alertPlaceholder = $('#liveAlertPlaceholder');
    const alertHTML = `
        <div class="alert alert-${type} alert-dismissible" role="alert">
            <div>${message}</div>
        </div>
    `;
    alertPlaceholder.html(alertHTML);
    setTimeout(() => alertPlaceholder.html(''), 3000);
}

function clearInput(inputId) {
    $(`#${inputId}`).val('');
}


function applyHtmlInput(inputId, value) {
    $(`#${inputId}`).html(value);
}

async function getCity(campoOrigem, campoDestino) {
    const cep = $(`#${campoOrigem}`).val();
    if (cep.length === 9) {
        try {
            const response = await fetch('/api/cep', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cep })
            });
            const data = await response.json();

            if (!data.error) {
                $(`#${campoDestino}`).val(data.response.city);
            } else {
                appendAlert(data.message, 'warning');
            }
        } catch (error) {
            appendAlert('Erro ao buscar cidade pelo CEP.', 'warning');
        }
    } else {
        appendAlert('Informe o CEP corretamente!', 'warning');
    }
}

async function getClima() {
    const city = $('#city').val();
    showLoadingState('card-clima-1', 'result');

    try {
        const data = await fetchClima(city);

        if (data.error) {
            handleError('card-clima-1', 'result', data.message);
            return;
        }
        document.getElementById('idcity1').value = data.response.id;
        dataClima = data;
        renderClimaData(data.response);
        
    } catch (error) {
        handleError('card-clima-1', 'result', 'Erro ao buscar clima.');
    }
}

function showLoadingState(card, result) {
    $(`#${card}`).css('display', 'inline-block');
    applyHtmlInput(result, loadingResult);
}

function handleError(card, result, message) {
    appendAlert(message, 'warning');
    $(`#${card}`).css('display', 'none');
    applyHtmlInput(result, '');
}

function renderClimaData(clima) {
    const isDay = clima.is_day === 'yes';
    const periodIcon = isDay ? getIconeDia() : getIconeNoite();

    $('#result').html(`
        <h5 class="card-title">${clima.city}, ${clima.region} - ${clima.country}</h5>
        <h1 class="card-title">${clima.temperature}°C</h1>
        <p class="card-text">${clima.weather_code}</p>
        ${renderClimaIndices(clima)}
        <p class="card-text">${new Date(clima.localtime).toLocaleString('pt-BR')} | ${periodIcon}</p>
        ${renderButtons()}
    `);
}

function renderClimaIndices(clima) {
    return `
        <div class="row">
            <div class="col-6 indicesTempo">
                <div class="indicesTempoItem">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-droplet-fill" viewBox="0 0 16 16"><path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6M6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13"></path>
                    </svg>
                    <span> Umidade</span>
                    <p>${clima.humidity}%</p>
                </div>
            </div>
            <div class="col-6 indicesTempo">
                <div class="indicesTempoItem">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-rain-heavy-fill" viewBox="0 0 16 16"><path d="M4.176 11.032a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293m3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293m3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293m3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293m.229-7.005a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973"></path>
                    </svg>
                    <span> Precipitação</span>
                    <p>${clima.precip}%</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-6 indicesTempo">
                <div class="indicesTempoItem">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
                    <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/>
                    </svg>
                    <span> Vento</span>
                    <p>${clima.wind_speed} KM/H</p>
                </div>
            </div>
            <div class="col-6 indicesTempo">
                <div class="indicesTempoItem">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-thermometer-sun" viewBox="0 0 16 16">
                        <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5"/>
                        <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1m5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5m4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0M8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5M12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5m-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708M8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5"/>
                    </svg>
                    <span> Índice UV</span>
                    <p>${clima.uv_index}</p>
                </div>
            </div>
        </div>
    `;
}

function renderButtons() {
    return `
            <button type="button" class="btn btn-outline-primary" id="saveClima" onclick="salvarClima()">
                Salvar 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                </svg>
            </button>
            <button type="button" class="btn btn-outline-success" id="savedClima" style="display:none;" disabled> 
                Salvo 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
            </button>
            
            <button type="button" class="btn btn-outline-success" id="compararClima" onclick="abreModalComparaClima()">Comparar <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                </svg>
            </button>
    `;
}

function getIconeDia() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun-fill" viewBox="0 0 16 16">
            <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
        </svg> Dia
    `;
}

function getIconeNoite() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16">
            <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
        </svg> Noite
    `;
}

async function comparaClimas(){
    const cityCompare = document.getElementById('cityCompare').value.trim().toLowerCase();
    const cityOrigem = dataClima.response.city.trim().toLowerCase();

    if (cityCompare === cityOrigem) {
        appendAlert('Você não pode comparar a mesma cidade!', 'warning');
        return;
    }
    toggleComparaCard(true);
    setLoadingResult('resultComparaClima');

    try {
        const climaResponse = await fetchClima(cityCompare);

        if (climaResponse.error) {
            handleError('card-compara-clima', 'resultComparaClima', climaResponse.message);
            return;
        }

        renderComparaClimas(climaResponse);
        
    } catch (error) {
        handleError('card-compara-clima', 'resultComparaClima', 'Erro ao buscar clima.');
    }
}

function toggleComparaCard(visible) {
    document.getElementById('card-compara-clima').style.display = visible ? 'inline-block' : 'none';
}

function setLoadingResult(element) {
    applyHtmlInput(element, loadingResultCompara);
}

async function fetchClima(city) {
    const response = await fetch('/api/clima', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city })
    });
    return await response.json();
}

function renderComparaClimas (data) {
    const comparaPeriodoIcon1 = dataClima.response.is_day === "yes" ? getIconeDia() : getIconeNoite();
    const comparaPeriodoIcon2 = data.response.is_day === "yes" ? getIconeDia() : getIconeNoite();
    
    document.getElementById('resultComparaClima').innerHTML = `
        ${renderComparaTemperatura(dataClima.response, data.response)}
        ${renderComparaClimaIndices(dataClima.response, data.response)}
        ${renderDataLocal(dataClima.response, comparaPeriodoIcon1, data.response, comparaPeriodoIcon2)}
    `;
}

function getPeriodoDiaIcon(isDay) {
    const icon = isDay === 'yes' ? 'sun-fill' : 'moon-fill';
    const text = isDay === 'yes' ? 'Dia' : 'Noite';
    return `<span class="card-text"><svg class="bi bi-${icon}" ... ></svg> ${text}</span>`;
}

function renderComparaTemperatura(city1, city2) {
    return `
    
        <div class="row">
            <h5 class="card-title col-6 comparaCity" id="comparaCity1">${city1.city}, ${city1.region} - ${city1.country}</h5>
            <h5 class="card-title col-6 comparaCity" id="comparaCity2">${city2.city}, ${city2.region} - ${city2.country}</h5>
        </div>
        
        <div class="row">
            <h1 class="card-title col-6 comparaTemperatura" id="comparaTemperatura1">${city1.temperature}°C</h1>
            <h1 class="card-title col-6 comparaTemperatura" id="comparaTemperatura2">${city2.temperature}°C</h1>
        </div>
    `;
}

function renderComparaClimaIndices(city1, city2) {
    return `
        <ul class="list-group list-group-flush listaItensCompara">
            <li class="list-group-item">
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-droplet-fill" viewBox="0 0 16 16"><path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6M6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13"></path>
                    </svg>
                    <span> Umidade</span>
                </p>
                <div class="row">
                    <p class="col-6 compareItens">${city1.humidity}%</p>
                    <p class="col-6 compareItens">${city2.humidity}%</p>
                </div>
            </li>
            <li class="list-group-item">
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-rain-heavy-fill" viewBox="0 0 16 16"><path d="M4.176 11.032a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293m3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293m3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293m3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293m.229-7.005a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973"></path>
                    </svg>
                    <span> Precipitação</span>
                </p>
                <div class="row">
                    <p class="col-6 compareItens">${city1.precip}%</p>
                    <p class="col-6 compareItens">${city2.precip}%</p>
                </div>
            </li>
            <li class="list-group-item">
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
                    <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/>
                    </svg>
                    <span> Vento</span>
                </p>
                <div class="row">
                    <p class="col-6 compareItens">${city1.wind_speed} KM/H</p>
                    <p class="col-6 compareItens">${city2.wind_speed} KM/H</p>
                </div>
            </li>
            <li class="list-group-item">
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-thermometer-sun" viewBox="0 0 16 16">
                        <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5"/>
                        <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1m5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5m4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0M8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5M12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5m-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708M8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5"/>
                    </svg>
                    <span> Índice UV</span>
                </p>
                <div class="row">
                    <p class="col-6 compareItens">${city1.uv_index}%</p>
                    <p class="col-6 compareItens">${city2.uv_index}%</p>
                </div>
            </li>
        </ul>
    `;
}

function renderDataLocal(cityData1, periododia1, cityData2, periododia2) {
    const localTime1 = new Date(cityData1.localtime).toLocaleString("pt-BR", {
        year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    const localTime2 = new Date(cityData2.localtime).toLocaleString("pt-BR", {
        year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    return `
        <div class="row">
            <div class="comparaHorarioLocal1 col-6">
                <p class="card-text">${localTime1}</p>
                </p>
                <span class="card-text">${periododia1}</span>
            </div>
            <div class="comparaHorarioLocal2 col-6">
                <p class="card-text">${localTime2}</p>
                </p>
                <span class="card-text">${periododia2}</span>
            </div>
        </div>
    `;
}

async function salvarClima() {
    const cityId = document.getElementById('idcity1').value;
    const response = await fetch('/api/saveClima', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idCity: cityId })
    });

    const data = await response.json();
    if (!data.error) {
        appendAlert('Clima salvo com sucesso!', 'success');
        toggleSaveButtons(true);
    } else {
        appendAlert('Ocorreu um erro ao salvar o clima!', 'warning');
    }
}

function toggleSaveButtons(isSaved) {
    document.getElementById('saveClima').style.display = isSaved ? 'none' : 'block';
    document.getElementById('savedClima').style.display = isSaved ? 'block' : 'none';
}

function abreModalComparaClima() {
    clearInput('cepCompare');
    clearInput('cityCompare');
    applyHtmlInput('resultComparaClima', '');
    toggleComparaCard(false);
    $('#modalCompare').modal('show');
}

function fecharHistorico() {
    document.getElementById('historicoMain').style.display = 'none';
}

function abrirHistorico(url){
    document.getElementById('historicoMain').style.display = 'block';
    $("#gridContainer").dxDataGrid({
        dataSource: {
            load: function(loadOptions) {
                const deferred = $.Deferred();
                const params = {
                    page: loadOptions.skip / loadOptions.take + 1,
                    per_page: loadOptions.take,
                };

                $.getJSON(`/${url}`, params)
                    .done(function(response) {
                        deferred.resolve(response.data, {
                            totalCount: response.totalCount,
                        });
                    })
                    .fail(function() {
                        deferred.reject("Erro ao carregar os dados.");
                    });

                return deferred.promise();
            }
        },
        keyExpr: 'id',
        columnsAutoWidth: true,
        filterRow: { visible: true },
        filterPanel: { visible: true },
        headerFilter: { visible: true },
        grouping: {
            contextMenuEnabled: true,
            expandMode: 'rowClick',
        },
        groupPanel: {
            emptyPanelText: 'Use the context menu of header columns to group data',
            visible: true,
        },
        columnHidingEnabled: true,
        width: '100%',
        columnChooser: {
            enabled: true,
            mode: 'select',
        },
        paging: {
            pageSize: 10,
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [5, 10, 20],
            showInfo: true,
            showNavigationButtons: true,
            visible: true,
        },
        columns: [
            { dataField: 'city', caption: 'Cidade' },
            { dataField: 'region', caption: 'Estado' },
            { dataField: 'country', caption: 'País' },
            { dataField: 'temperature', caption: 'Temperatura (°C)' },
            { dataField: 'weather_code', caption: 'Condição' },
            { dataField: 'humidity', caption: 'Umidade' },
            { dataField: 'precip', caption: 'Precipitação' },
            { dataField: 'wind_speed', caption: 'Vento' },
            { dataField: 'uv_index', caption: 'Índice UV' },
            { dataField: 'localtime', caption: 'Data/Hora Local', dataType: 'datetime', format: "dd/MM/yyyy hh:mm"}
        ],
        showBorders: true,
        rowAlternationEnabled: true,
        showRowLines: true,
        showColumnLines: true,
        columnAutoWidth: true,
    });
}
