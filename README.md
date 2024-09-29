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

### Obtendo e configurando as credenciais da API WEATHERSTACK para obtenção das informações climáticas.

Crie uma Conta em [Real-Time & Historical World Weather Data API](https://weatherstack.com/). Após a criação da conta é possível obter o token em Dashborad - Your API Access Key. 
Esta chave será utilizada para o consumo da API em Dashboard.
Tendo a chave, abra o arquivo .env novamente, procure por "WEATHERSTACK_API_KEY" e substitua o valor pela chave obtida no site.

```xml

WEATHERSTACK_API_KEY=0040b460e823b534f24e98b87189852c

```

### Pronto! Seu ambiente e projeto está totalmente configurado. 

## Veja um pouco do funcionamento do Projeto: 
![Alt Text](https://github.com/pedrozanelato/previsaoTempoApp/blob/main/public/gif/previsaoTempoAppGif.gif)
