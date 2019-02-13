# Principais funções

1. REcebendo o FOrmulario
2. Construindo um Formulario
3. Slavando Dados Coletados Offline
4. Apresentando Dados Coletados
5. Enviado Dados Coletados

As principais funçoes em sua maioria utilizam o redux para fazer o controle de dados para facilitar o acesso desses dados por qualquer função ou pagina do aplicativo. Cada função principal contem seu proprio arquivo redux no formato Ducks(reducers, types e actions em um unico arquivo)e suas requisiçoes as API feitas atraves do midleware react-native-saga e a conexão do redux com as paginas ou compoentes atraves do react-redux;

## 1. Recebendo um Formulario
O formulario é recebido na pagina New, na qual temos um pickerItem que seleciona o tipo de pericia(Incêndio, Veiculos, etc... ), e passa como parametro um valor numerico na URL da requisição atraves de um GET para receber o formulario no formato JSON. Isso é feito atraves da action:
```js
getNewRequest(value) // value é o valor numerico que vai ser passado na URL
```
que se encontra definida no arquivo new.js na pasta ducks, e armazena as informações no estado da aplicação em newState.

## 2. Construindo um Formulario
O aplicativo contem duas paginas importantes na coleta de dados, StepList que contem o componente StepBox e a Step que contem o componente ComponentList. A pagina Steplist mostra todos os passos do formulario a ser prenchido na qual ela varre um array e apresenta cada passo com o componente StepBox. Ao clicar no componente StepBox o usuario é direcionado para a pagina Step que é o atual passo onde o usuario preenchera os dados. A pagina Step varre um array que contem os componetes que constitui o passo atual juntamente com as informaçoes necessarias de cada componente e chama o ComponentList  que ira selecionar o componente especifico de acordo com o component_type presente nas informações do componente.

Para manter os dados preenchidos no formulario utiliza-se actions e o reducer formState presente no arquivo form.js na pasta ducks.O estado inicial no ducks tem um obejeto vazio ```step = {}``` que sera preenchidos com a chave valor correspondente de cada componente no formulario.

<p align="center">
  <img width="800" 420 src=./imagens_doc/criacaoForm.png>
</p>

createdFormSave() é uma função do componente StepBox que é chamada para criação do formulario, escutando a flag formEdit. Quando esta ``false`` executa o processo 1 que varre o array de componetes de cada step e cria um objeto na chave correspondente do componente.

```js
{
    key: data_value,
    value: valor,
    filled; false, // vai pra true quando o comonente é preenchido
}
``` 
 e coloca em um objeto **form** sequencialmente, ja que para o envio dos dados não importa em qual step esteja, assim tempo um objeto contendo todos os as chaves valores do formulario e em seguida chama a action getCreateForm(*form*) prenset no form.js passando como paramentro o grande objto **form** que foi construido. 
 A action substitui o ojeto vazio ``step`` presente no formState pelo construido no componente StepBox.

 Se formEdit ``true`` execuata o processo dois que reconstroi o ``step`` do formState com os dados salvando no memoria interna do dispositivo, reconstruntindo o objeto ```step`` e recuperando os dados que foram coletados anteriomente de cada chave;

## 3. Salvando Dados Coletados No Estado
 Cada componente construido coleta um tipo de dado, que é armazenado no estadao do proprio componente. Esse componente escuta a flag saveStep em fomStep na qual quando for ``true`` executa a atividade de salvar os dados do estado do componente no reducer formState.

<p align="center">
  <img width="800" 420 src=./imagens_doc/salvarestado.png>
</p>


À função *``saveStepState()``* é uma action que seta a flag ``saveStep`` para true e chama a função *``saveFormInput()``* na qual é avaliado se existe ou nao alguma informação no state da coleção, se sim execute a tarefa 1 caso contrario tarefa 2.
A tarefa 1 varre todo o objete ``step`` do reducer no form.js e quando a chave do objeto presente no ``step`` for igual a do componente , substitui os valorese e passa filled para **true** atraves da action getSaveStateForm(newValue).
A tarefa 2 tambem varre todo o obejeto mas so substitui quando as chaves são iguai e filled é **false**.

Esse processo faz com que a chamada da função saveFormInput seja chamada recursivamente infinitas vezes, então surgi a necessidade de ter uma confdição de parada que seria depois de varrer todo o obejeto ``step``. Isso se da atraves da action *``startControlArray()``* que pega o tamanho do array e decrementa a medida que cada elemento ja foi vist ou alterado.