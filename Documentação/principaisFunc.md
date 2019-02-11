#Principais funções

1. REcebendo o FOrmulario
2. Construindo um Formulario
3. Slavando Dados Coletados Offline
4. Apresentando Dados Coletados
5. Enviado Dados Coletados

As principais funçoes em sua maioria utilizam o redux para fazer o controle de dados para facilitar o acesso desses dados por qualquer função ou pagina do aplicativo. Cada função principal contem seu proprio arquivo redux no formato Ducks(reducers, types e actions em um unico arquivo)e suas requisiçoes as API feitas atraves do midleware react-native-saga e a conexão do redux com as paginas ou compoentes atraves do react-redux;

### 1. Recebendo um Formulario
O formulario é recebido na pagina New, na qual temos um pickerItem que seleciona o tipo de pericia(Incêndio, Veiculos, etc... ), e passa como parametro um valor numerico na URL da requisição atraves de um GET para receber o formulario no formato JSON. Isso é feito atraves da action:
```js
getNewRequest(value) // value é o valor numerico que vai ser passado na URL
```
que se encontra definida no arquivo new.js na pasta ducks, e armazena as informações no estado da aplicação em newState.

### 2. Construindo um Formulario
O aplicativo contem duas paginas importantes na coleta de dados, StepList que contem o componente StepBox e a Step que contem o componente ComponentList. A pagina Steplist mostra todos os passos do formulario a ser prenchido na qual ela varre um array e apresenta cada passo com o componente StepBox. Ao clicar no componente StepBox o usuario é direcionado para a pagina Step que é o atual passo onde o usuario preenchera os dados. A pagina Step varre um array que contem os componetes que constitui o passo atual juntamente com as informaçoes necessarias de cada componente e chama o ComponentList  que ira selecionar o componente especifico de acordo com o component_type presente nas informações do componente.

Para manter os dados preenchidos no formulario utiliza-se actions presente no arquivo form.js na pasta ducks. Antes de definirmos entendermos as funçoes é importante saber como funciona o fluxo da informação e a logica de manter, armazernar e enviar. 






### 3. Salvando Dados Coletados Offline
### 4. Apresntando Dados Coletados 
### 5. Enviado Dados Coletados