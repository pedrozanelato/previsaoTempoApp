<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Previsão do Tempo</title>
        <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
        <link rel="stylesheet" href="https://cdn3.devexpress.com/jslib/23.1.3/css/dx.light.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    </head>
    <body>
        <main>
            <section id="topo">
                <div class="container-xxl bd-gutter" id="content">
                    <div class="bd-masthead mb-3 content-main">
                        <div class="container-xxl bd-gutter pl-0 pr-0">
                            <div class="mx-auto col-12 topo">

                                <h1>Como está o Clima?</h1>
                                <p>Informe a cidade ou o CEP de onde deseja visualizar o clima</p>
                                <form id="climaForm" class="m-auto needs-validation" novalidate>
                                    <div class="col">
                                        <div class="input-group input-group-sm mb-3">
                                            <span class="input-group-text" id="inputGroup-sizing-sm">CEP</span>
                                            <input type="text" id="cep" class="form-control" aria-label="Digite o CEP"  name="cep" placeholder="Digite o CEP" aria-describedby="inputGroup-sizing-sm" onkeypress="clearInput('city')">
                                            <button class="btn btn-outline-warning" onclick="getCity('cep', 'city')" type="button" id="button-addon2">Procurar Cidade</button>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="input-group input-group-sm mb-3 has-validation">
                                            <span class="input-group-text" id="inputGroup-sizing-sm-2">Cidade</span>
                                            <input required type="text" id="city" class="form-control" aria-label="Informe a cidade"  name="city" placeholder="Informe a cidade" aria-describedby="inputGroup-sizing-sm-2" required onkeypress="clearInput('cep')">
                                            <div class="invalid-feedback invalid-feedback-yellow">
                                                Informe a cidade ou busque pelo CEP.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                    <button type="button" id="btn-get-clima" class="btn btn-warning">Ver Clima</button>
                                    </div>

                                </form>

                                <input type="text" id="idcity1" name="idcity1" hidden>

                                <div class="row row-cols-1 row-cols-md-1 g-4" id="card-clima-1" style="display:none;">
                                    <div class="col" style="max-width: 25rem;min-width: 20rem;">
                                        <div class="card">
                                            <div class="card-body">
                                                <div id="result">
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="modal fade" id="modalCompare" tabindex="-1" aria-labelledby="modalCompareLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Informe a cidade ou o CEP de onde deseja comparar o clima</p>
                            <form id="climaFormCompare" class="m-auto needs-validation" novalidate>
                                <div class="col">
                                    <div class="input-group input-group-sm mb-3">
                                        <span class="input-group-text" id="inputGroup-sizing-sm">CEP</span>
                                        <input type="text" id="cepCompare" class="form-control" aria-label="Digite o CEP"  name="cepCompare" placeholder="Digite o CEP" aria-describedby="inputGroup-sizing-sm" onkeypress="clearInput('cityCompare')">
                                        <button class="btn btn-outline-warning" onclick="getCity('cepCompare', 'cityCompare')" type="button" id="button-addon2">Procurar Cidade</button>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="input-group input-group-sm mb-3 has-validation">
                                        <span class="input-group-text" id="inputGroup-sizing-sm-2">Cidade</span>
                                        <input required type="text" id="cityCompare" class="form-control" aria-label="Informe a cidade"  name="cityCompare" placeholder="Informe a cidade" aria-describedby="inputGroup-sizing-sm-2" required onkeypress="clearInput('cepCompare')">
                                        <div class="invalid-feedback">
                                            Informe a cidade ou busque pelo CEP.
                                        </div>
                                    </div>
                                </div>
                                <div class="col" style="text-align: center;">
                                    <button type="button" id="btn-compara-clima" onClick="comparaClimas()" class="btn btn-warning">Comparar</button>
                                </div>

                            </form>

                            <div class="row row-cols-1 row-cols-md-1 g-4" id="card-compara-clima" style="display:none;">
                                <div class="col">
                                    <div class="card">
                                        <div class="card-body">
                                            <div id="resultComparaClima">
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="toast-container position-fixed bottom-0 end-0 p-3">
                <div id="liveAlertPlaceholder"></div>
            </div>

            <div class="flex-box container-box">
                <div class="content-box">
                    <a class="btn btn-outline-light mb-1" id="btnClimasSalvos" href="#" onClick="abrirHistorico('climas-salvos')">
                        Ver Climas Salvos
                    </a>
                    <a class="btn btn-outline-light mb-1" id="btnHistorico" href="#" onClick="abrirHistorico('historico')">
                        Acessar Histórico
                    </a>
                </div>
            </div>
        </main>

        <div id="historicoMain" style="display:none">
            <div class="container-xxl bd-gutter" id="content">
                <div class="bd-masthead mb-3 content-main">
                    <div class="container-xxl bd-gutter pl-0 pr-0">
                        <div class="mx-auto col-12">
                            <div class="flex-box-hist container-box">
                                <div class="content-box">
                                    <a class="btn btn-warning" id="btnFecharHistorico" href="#" onClick="fecharHistorico()">
                                        Fechar
                                    </a>
                                </div>
                            </div>
                            <div id="gridContainer"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.12/jquery.mask.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        <script src="https://cdn3.devexpress.com/jslib/23.1.3/js/jquery.min.js"></script>
        <script src="https://cdn3.devexpress.com/jslib/23.1.3/js/dx.all.js"></script>

        <script src="{{ asset('js/loading.js') }}"></script>
        <script src="{{ asset('js/app.js') }}"></script>

        <script>
            
        </script>
    </body>
</html>