# Principais funções

1. Recebendo o Formulario
2. Construindo um Formulario
3. Salavando Dados Coletados Offline
4. Apresentando Dados Coletados
5. Enviado Dados Coletados

As principais funções em sua maioria utilizam o redux para fazer o controle de dados para facilitar o acesso desses dados por qualquer função ou página do aplicativo. Cada função principal contém seu próprio arquivo redux no formato Ducks(reducers, types e actions em um único arquivo)e suas requisições as API feitas através do middleware react-native-saga e a conexão do redux com as páginas ou componentes através do react-redux.

## 1. Recebendo um Formulario
O formulário é recebido na página New, na qual temos um picker Item que seleciona o tipo de perícia(Incêndio, Veículos, etc... ), e passa como parâmetro um valor numérico na URL da requisição através de um GET para receber o formulário no formato JSON. Isso é feito através da action:

```js
getNewRequest(value) // value é o valor numerico que vai ser passado na URL
```
que se encontra definida no arquivo new.js na pasta ducks, e armazena as informações no estado da aplicação em newState.

## 2. Construindo um Formulario
O aplicativo contém duas páginas importantes na coleta de dados, Step List que contém o componente Step Box e a Estepe que contém o componente Component List. A página Step List mostra todos os passos do formulário a ser preenchido na qual ela varre um array e apresenta cada passo com o componente Step Box. Ao clicar no componente Step Box o usuário é direcionado para a página Step que é o atual passo onde o usuário preencherá os dados. A página Step varre um array que contém os componentes que constitui o passo atual juntamente com as informações necessárias de cada componente e chama o Componente List  que irá selecionar o componente específico de acordo com o component_type presente nas informações do componente.

Para manter os dados preenchidos no formulário utiliza-se actions e o reducer formState presente no arquivo form.js na pasta ducks. O estado inicial no ducks tem um objeto vazio ```step = {}``` que será preenchidos com a chave valor correspondente de cada componente no formulário.

<p align="center">
  <img width="800" 420 src=./imagens_doc/criacaoForm.png>
</p>

*``createdFormSave()``* é uma função do componente Step Box que é chamada para criação do formulário, escutando a flag formEdit. Quando esta ``false`` executa o processo 1 que varre o array de componentes de cada step e cria um objeto na chave correspondente do componente.

```js
{
    key: data_value,
    value: valor,
    filled; false, // vai pra true quando o comonente é preenchido
}
``` 
e coloca em um objeto **form** sequencialmente, ja que para o envio dos dados não importa em qual step esteja, assim tempo um objeto contendo todos os as chaves valores do formulário e em seguida chama a action`` getCreateForm(*form*)`` presente no form.js passando como parâmetro o grande objeto **form** que foi construído.
A action substitui o objeto vazio ``step`` presente no formState pelo construído no componente Step Box.

Se formEdit ``true`` executa o processo dois que reconstrói o ``step`` do formState com os dados salvando no memória interna do dispositivo, reconstruindo o objeto ```step`` e recuperando os dados que foram coletados anteriormente de cada chave;

## 3. Salvando Dados Coletados No Estado
 Cada componente construído coleta um tipo de dado, que é armazenado no estado do próprio componente. Esse componente escuta a flag saveStep em fomStep na qual quando for ``true`` executa a atividade de salvar os dados do estado do componente no reducer formState.

<p align="center">
  <img width="800" 420 src=./imagens_doc/salvarestado.png>
</p>

À função *``saveStepState()``* é uma action que seta a flag ``saveStep`` para true e chama a função *``saveFormInput()``* na qual é avaliado se existe ou não alguma informação no state da coleção, se sim execute a tarefa 1 caso contrário tarefa 2.
A tarefa 1 varre todo o objeto ``step`` do reducer no form.js e quando a chave do objeto presente no ``step`` for igual a do componente , substitui os valores e passa filled para **true** atraves da action getSaveStateForm(newValue).
A tarefa 2 também varre todo o objeto mas só substitui quando as chaves são iguai e filled é **false**.

Esse processo faz com que a chamada da função ``saveFormInput()`` seja chamada recursivamente infinitas vezes, então surgi a necessidade de ter uma condição de parada que seria depois de varrer todo o objeto ``step``. Isso se dá através da action *``startControlArray()``* que pega o tamanho do array e decrementa a medida que cada elemento já foi visto ou alterado.

## 4. ProgressBar

Quando inicia o processo de criação de formulario pela função ``createFormSave()`` no componet StepBox, simultaneamente cria-se um objeto chamado **arrayProgress** contendo:
```js
 {
      name: steps.item.step_name,
      array: [],
      length: 0,
  }
```
<p align="center">
  <img width="800" 420 src=./imagens_doc/progressBar.png>
</p>

na qual o arrayProgress.array constrói um array contendo os elementos do Step.
Quando é feito a açao de salvar o os dados do form no formStat a flag **showProgres** passada como parâmetro para o header é tru e chama a action *``startUpdateProgress()``* que seta a flag **updateProgress** no state formState que garante quando o componente StepBox renderizar chame a função ``compareProgress()`` presente no componente StepBox que irá calcular o percentual do step preenchido varrendo o arrayProgress e vendo quantos dos elementos foram preenchidos pela flag **filled** e a quantidade total de elementos. Nessa mesma função chama a action ``finishUpdateProgress()`` no ducks form.js  que serve para setar a flag **updateProgres**s para false e garantir que não chame uma função após termina o processo.
