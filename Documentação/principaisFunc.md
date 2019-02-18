# Principais funções

1. Recebendo o Formulario
2. Construindo um Formulario
3. Salvando Dados Coletados no Estado
4. ProgressBar
5. Enviando o formulário

As principais funções em sua maioria utilizam o redux para fazer o controle de dados para facilitar o acesso desses dados por qualquer função ou página do aplicativo. Cada função principal contém seu próprio arquivo redux no formato Ducks(reducers, types e actions em um único arquivo)e suas requisições as API feitas através do middleware react-native-saga e a conexão do redux com as páginas ou componentes através do react-redux.

## 1. Recebendo um Formulario
O formulário é recebido na página New, na qual temos um picker Item que seleciona o tipo de perícia(Incêndio, Veículos, etc... ), e passa como parâmetro um valor numérico na URL da requisição através de um GET para receber o formulário no formato JSON. Isso é feito através da action:

```js
getNewRequest(value) // value é o valor numerico que vai ser passado na URL
```
que se encontra definida no arquivo new.js na pasta ducks, e armazena as informações no estado da aplicação em newState.

## 2. Construindo um Formulario
O aplicativo contém duas páginas importantes na coleta de dados, Step List que contém o componente Step Box e a Step que contém o componente Component List. A página Step List mostra todos os passos do formulário a ser preenchido na qual ela varre um array e apresenta cada passo com o componente Step Box. Ao clicar no componente Step Box o usuário é direcionado para a página Step que é o atual passo onde o usuário preencherá os dados. A página Step varre um array que contém os componentes que constitui o passo atual juntamente com as informações necessárias de cada componente e chama o Componente List  que irá selecionar o componente específico de acordo com o component_type presente nas informações do componente.

Para manter os dados preenchidos no formulário utiliza-se actions e o reducer formState presente no arquivo form.js na pasta ducks. O estado inicial no ducks tem um objeto vazio ```step = {}``` que será preenchidos com a chave valor correspondente de cada componente no formulário.

<p align="center">
  <img width="800" 420 src=./imagens_doc/criacaoForm.png>
</p>

*``createdFormSave()``* é uma função do componente Step Box que é chamada para criação do formulário, escutando a flag formEdit. Quando esta ``false`` executa o processo 1 que varre o array de componentes de cada step e cria um objeto na chave correspondente do componente.

```js
{
    key: data_value,
    value: valor,
    filled: false, // vai pra true quando o comonente é preenchido
}
``` 
e coloca em um objeto **form** sequencialmente, ja que para o envio dos dados não importa em qual step esteja, assim temos um objeto contendo todos os as chaves valores do formulário. Em seguida chamamos a action`` getCreateForm(form)`` presente no form.js passando como parâmetro o grande objeto **form** que foi construído.
A action substitui o objeto vazio ``step`` presente no formState pelo construído no componente Step Box.

Se formEdit ``true`` executa o processo dois que reconstrói o ``step`` do formState com os dados salvo n memória interna do dispositivo, reconstruindo o objeto ```step`` e recuperando os dados que foram coletados anteriormente de cada chave;

## 3. Salvando Dados Coletados no Estado
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

na qual o arrayProgress.array constrói um array contendo os elementos do Step. Quando é feito a ação de salvar o os dados do form no formState a flag **showProgres** passada como parâmetro para o header é true e chama a action *``startUpdateProgress()``* que seta a flag **updateProgress** no state formState. Isso garante  que quando o componente StepBox renderizar, chame a função ``compareProgress()``, presente no componente StepBox, que irá calcular o percentual do step preenchido varrendo o arrayProgress e vendo quantos dos elementos foram preenchidos pela flag **filled** no objeto step presente no formState e a quantidade total de elementos do step. Nessa mesma função chama-se a action ``finishUpdateProgress()`` no ducks form.js  que serve para setar a flag **updateProgress** para false e garantir que não chame recursivamente a função após o termino do processo.

## 5. Envio de formulário

O envio do formulário acontece na página StepList ao pressionar o botão *Enviar*, na qual chama a função ``**enviaForm**``. Nela recuperamos a matrícula do usuário que está logado e o os dados do formulário preenchido e salvos no objeto ``step`` no estado da aplicação *formState* através da chave formulário.

[imagem]

após recuperamos esses dados construimos um formData varrendo o objeto ``step`` e damos incio a requisição do tipo *POST* passando o formData no corpo da requisição e a matricula no cabeçalho. Se a requisição for bem sucedida recebe como reposta o Id da prerícia no servidor caso contrario uma mensagem de erro ou de que não ha conexão.