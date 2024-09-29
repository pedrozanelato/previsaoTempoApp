# Previsão do Tempo Project

Um projeto de Previsão do Tempo em Laravel

## Funcionalidades

Um sistema que informa sobre o clima na localidade informada. Além disso, é possível consultar o histórico de climas das localidades consultas e dos climas salvos pelo usuário.
Para o funcionamento do sistema é utilizado a API da ViaCEP para a consulta do nome da cidade através do CEP. Também é utilizado a API [Real-Time & Historical
World Weather Data API](https://weatherstack.com/) para a consulta da condição climática.


## Tecnologias

Projeto foi desenvolvido em Laravel. Utilizado Bibliotecas como Bootstrap, Jquery, DataGrid DevExtreme. 
### Banco de dados
- MYSQL

## Configuração

### Versão Laravel
- Compatível com Versão 9.52.16+

### Versão PHP
- Compatível com Versão 8.1+

### Configurando o ambiente e o projeto 

Primeiramente, localize o arquivo .env na raiz do projeto. Altere as informações de conexão com o banco de dados de acordo com o seu database:

```xml

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=previsaoTempo
DB_USERNAME=
DB_PASSWORD=

```

Na raíz do projeto execute o comando:

```xml
php artisan migrate
```
Este comando criará o banco de dados e as tabelas necessárias para a execução e funcionamento do Projeto.

### Pronto! Seu ambiente e projeto está totalmente configurado. 

## Veja um pouco do funcionamento do Projeto: 
![Alt Text](https://github.com/pedrozanelato/previsaoTempoApp/blob/main/public/gif/previsaoTempoAppGif.gif)
