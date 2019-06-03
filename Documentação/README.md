![N|Solid](http://www.marca.unb.br/img/assinatura_cor/as_bas_cor.gif)

# Sistema Móvel de Suporte à Perícia - AppINC

#### Introdução
O appINC é uma solução composta de um aplicativo para dispositivos móveis e o correspondente servidor de processamento, customização e armazenamento de POPs (Procedimento Operacional Padrão) dando suporte ao usuário durante a coleta de vestígios e a confecção dos laudos em arquivos com extensão .DOCX editáveis.


#### Executando o projeto (Sistema Operacional Android):

Para executar o projeto devem ser seguidos os seguintes passos:

*  Clonar o projeto no [GitHub](https://github.com/paulohlips/appINC.git) ;
* Dentro do diretório do projeto instalar as dependências com : 
```
$ yarn
```
* Instalar o app no dispositivo ou emulador:
```
$ react-native run-android
```
ou
```
$ react-native run-ios
```

#### Executando o projeto (Sistema Operacional IOS):

*  Clonar o projeto no [GitHub](https://github.com/paulohlips/appINC.git) ;
* Dentro do diretório do projeto instalar as dependências com : 
```
$ yarn
```
* Dentro do diretório do projeto, vincular as bibliotecas que contém código nativo com o comando : 
```
$ react-native link
```
* Inicializar o XCode e por meio da barra de navegação, acessar o diretório em que o projeto foi clonado.
Dentro do diretório, seguir o caminho abaixo para acessar o arquivo “appincv2.xcodeproj”:

```bash.
└── diretório_clonado
    ├── ios
         └── appincv2.xcodeproj
```

Basta clicar neste arquivo que o XCode se encarregará de carregar as dependências da aplicação e deixar a mesma pronta para o deploy. 

* Execução do projeto (Emulador)

Para executar o projeto em um emulador, basta acessar a barra de navegação do XCode, que contém um campo de seleção de dispositivo e um botão "Play", que inicializa o dispositivo emulado e executa o projeto no mesmo.

* Execução do projeto (Dispositivo físico)

Para executar o projeto em um dispositivo físico com Sistema Operacional IOS, basta conectar o dispositivo e seleciona-lo para executar o projeto na barra de navegação. Se esta for a primeira vez que você executa um aplicativo no seu dispositivo iOS, talvez seja necessário registrar seu dispositivo para desenvolvimento.Abra o menu Product na barra de menus do Xcode e vá para Destination . Procure e selecione seu dispositivo na lista. O Xcode registrará seu dispositivo para desenvolvimento.

* "Deploy" da aplicação

Para realizar o deploy da aplicação, deve-se selecionar a opção “Generic IOS Device”, localizada na mesma aba que se encontram as opções de simulação, na barra de navegação do XCode. Ao selecionar esta opção, a aba “Product” do programa habilitará uma opção “Archive”. Selecionar esta opção resultará na compilação do projeto. Caso tudo esteja certo, ao fim do processo surgirá uma janela com o arquivo gerado. Selecione este arquivo e clique na opção “deploy”. Por fim, haverá uma mensagem nesta janela deixando claro que o deploy foi realizado com sucesso

* TestFlight

Após a realização do "deploy" da aplicação, é possível acessar as versões do projeto que já passaram por este processo com sucesso (caso exista mais de uma) por meio da [Página](https://appstoreconnect.apple.com/), na conta responsável pela aplicação. Para isso, basta selecionar a opção "Meus Apps", acessar o aplicativo e clicar na opção “TestFlight”. Este processo não é instantâneo, e pode-se levar alguns minutos para que os usuários de teste possam acessar a versão disponibilizada.

#### Árvore de diretórios

O diretório ./src contém o núcleo do aplicativo onde ficam os principais arquivos de construção do aplicativo.

* /assets: guarda as imagens e animações utilizadas;
* /components: recebe os index.js e os styles.js de cada componente;
* /config: configuração da ferramenta de debug Reactotron;
* /globalComponents: componentes globais que são utilizados com frequência;
* /pages: páginas que são exibidas no aplicativo;
* /services: instancia uma conexão com a api do servidor;
* /store:  guarda os arquivos sagas e ducks para manipulação do estado da aplicação.
* /styles: estilos globais do aplicativo como cores, bordas, espaçamentos e etc.
* /routes: configura a ordem de exibição das páginas no aplicativo utilizando o conceito de StackNavigation.

```bash.
└── src
    ├── assents
    │   ├── imgs
    │   ├── lottie
    │   └── pdf
    ├── components
    │   ├── audio
    │   ├── camera
    │   ├── checkbox
    │   ├── date
    │   ├── geolocation
    │   ├── InputText
    │   ├── ocr
    │   ├── scanner
    │   ├── sketch
    │   ├── veiculo
    │   └── vestigios
    ├── config
    ├── globalComponents
    │   ├── alert
    │   ├── header
    │   ├── info
    │   ├── load
    │   ├── menu
    │   └── modal
    ├── pages
    │   ├── components
    │   │   ├── audio
    │   │   ├── camera
    │   │   ├── checkbox
    │   │   ├── date
    │   │   ├── geoloc
    │   │   ├── group
    │   │   ├── input
    │   │   ├── ocr
    │   │   ├── scanner
    │   │   ├── sketch
    │   │   ├── veiculo
    │   │   └── vestigio
    │   ├── email
    │   ├── hash
    │   ├── hist
    │   ├── login
    │   ├── main
    │   ├── new
    │   ├── offline
    │   ├── password
    │   ├── Step
    │   │   └── components
    │   │       └── ComponentsList
    │   ├── StepList
    │   │   └── components
    │   │       └── StepBox
    │   └── Testes
    ├── services
    ├── store
    │   ├── actions
    │   ├── ducks
    │   └── sagas
    └── styles
└───routes
```

#### Navegação: Detalhamento das páginas 

*  Login: Página inicial que possibilita ao usuário entrar com suas credenciais ou realizar cadastro.

<p align="center">
  <img width="250" 420 src=./imagens_doc/app1.jpg>
</p>

* SignUp: O usuário informa seu ID para cadastrar a senha de acesso.
<p align="center">
  <img width="250" 420 src=./imagens_doc/app(2).jpg>
</p> 

* Main: Usuário logado pode iniciar nova coleta, acessar o histórico de coletas realizadas ou verificar a validade do seu token de acesso ao aplicativo.

<p align="center">
  <img width="250" 420 src=./imagens_doc/app(3).jpg>
</p>


* NewMenu: Nesta página o usuário escolhe qual tipo de coleta deseja fazer, esta seleção determina quais compenentes serão disponibilizados para uso.
<p align="center">
  <img width="250" 420 src=./imagens_doc/app(5).jpg>
</p>

* StepPage: Página que engloba os chamados steps que são conjuntos de componentes.
<p align="center">
  <img width="250" 420 src=./imagens_doc/app(6).jpg>
</p>

* StepList: Página dentro de cada step onde se encontram os componentes que serão preenchidos com os dados de interesse.
<p align="center">
  <img width="250" 420 src=./imagens_doc/app(7).jpg>
</p>

* Hist: Mostra a lista de perícias já enviadas para o servidor e o seu id para download do docx e das mídias associadas.
<p align="center">
  <img width="250" 420 src=./imagens_doc/hist.jpeg>
</p>


### Os Componentes

O conceito de componenetização é amplamente utilizado no aplicativo, desta forma, as funcionalidades utilizadas na coleta de dados foram implementadas como componentes. Alguns destes componentes são obtidos diretamente da biblioteca do React Native enquanto outros foram construídos com auxílio de bibliotecas externas como pode ser visto a seguir.

#### A) Estrutura dos componentes
A instalação dos componentes, mesmo daqueles que possuem documentação no site do NPM, como dito anteriormente, utiliza o gerenciador de pacotes [Yarn](https://yarnpkg.com/pt-BR/). 
Em casos de manuteção, adição de novos componentes ou outras modificações usar ***sem excessão Yarn***. 

O diretório do componente contém dois arquivos padrões, sendo o primeiro deles *index.js*, que inclui todo o código que constroi e executa as funções do componente, e um segundo, o *styles.js* responsável pela estilização e customização. 

#### B) Componentes externos
##### 1. Câmera

Este componente é responsável por acessar diretamente o hardware nativo do dispositivo permitindo assim a captura de fotos e vídeos do objeto ou local periciado ou ainda a seleção de fotos da galeria do dispositivo móvel.


* [react-native-image-picker](https://github.com/react-community/react-native-image-picker)

##### 2. Gravador de Áudio

Componente que permite gravar audio e executar atraves de uma mescla de dois componentes, um para gravar(react-native-audio) e outro para reproduzir(react-native-sound).

* [react-native-audio](https://github.com/jsierles/react-native-audio)
* [react-native-sound](https://github.com/zmxv/react-native-sound)

##### 3. Data (Calendário)

É o componente responsável pela gravação e reprodução de áudio o que permite que os áudios gravados possam ser reproduzidos antes de serem enviados ao servidor, contando ainda com as opções de pausar, parar e retornar à gravação.

* [react-native-datepicker](https://github.com/xgfe/react-native-datepicker)

##### 4. Ícones

Utilizamos um componente que junto varias bibliotecas em um mesmo componente, fornecendo uma vasta quantidade de icones.

* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
* [Bibliote de pesquisa](https://oblador.github.io/react-native-vector-icons/)

##### 5. Geolocalização

Este componente interage diretamente com o GPS embarcado no celular ou tablet e ao ser chamado retorna latitude, longitude e altura correspondentes ao local e a precisão associada a essas informações. Nos casos em que o GPS não consiga se alinhar com os satélites uma mensagem de erro é renderizada ao usuário.

##### 6. Entrada de Texto

Este é o componente que permite ao usuário inserir um texto e tem como características as opções de ser marcado como campo obrigatório ou opcional e ainda permite a adição de uma descrição para sugerir ao usuário quais informações são mais desejáveis.


* [TextInput](https://facebook.github.io/react-native/docs/textinput)

##### 7. Leitor de Codigo de Barras e QR Code

Responsável pela leitura de códigos de barras e bi-dimensionais (QRcode). Este componente foi projetado para facilitar o processo de cadeia de custódia das evidências físicas coletadas no local de crime, visto que pode conectar as evidências coletadas com os dados preenchidos no aplicativo.

* [react-native-barcode-scanner-google](https://www.npmjs.com/package/@nois/react-native-barcode-scanner-google)

##### 8. Croqui 

Componente que permite a confecção de desenho à mão livre em diversas cores, sendo disponível nove cores principais que podem ser estendidas para qualquer tom dentro do espectro de cores em código hexadecimal, assim como traços de diferentes espessuras que podem ser escolhidas ao longo do desenho de acordo com a necessidade do usuário através de um botão no menu superior do componente .

* [SketchCanvas](https://www.npmjs.com/package/@terrylinla/react-native-sketch-canvas)

##### 9. Consulta a APIs e Banco de Dados

Este componente permite integrar o aplicativo a APIs e BDs externos, com auxílio do cliente HTTP Axios, que envia e trata requisições HTTP possibilitando a comunicação com servidores externos aos quais o app possua credenciais de acesso. Um exemplo utilizado no projeto é a consulta à API da tabela FIPE.

* [Axios](https://github.com/axios/axios)

##### 10. OCR

O OCR (Optical Character Recognition) é utilizado para leitura e reconhecimento de textos. A
captura do texto é feita utilizando a câmera do dispositivo móvel, mas o processamento e a posterior
resposta depende de uma API externa. No período de desenvolvimento deste projeto foi utilizada a Google
Uma observação importante é que o resultado final depende da qualidade do material lido,
resolução da câmera do dispositivo e também existe uma margem de erro da própria API externa, por isso
deve-se confrontar sempre o resultado da leitura com o material previamente lido para atestar a qualidade
da leitura.

* [API_Vision](https://cloud.google.com/vision/docs/ocr?hl=pt-br)
* [Requests_Google_API](https://cloud.google.com/vision/docs/request?hl=pt-br)


##### 11. Período
Utiliza as o mesma biblioteca do componente Data, o react-native-datepicker. Trabalha com duas datas associadas onde a ​ data inicial nunca é anterior ao dia em que o usuário está utilizando o componente e a ​ data final nunca é posterior a ​ data inical . 

##### 12. Coleção

Esta estrutura, que se aplica a todos os componentes, permite que um mesmo
componente seja utilizado mais de uma vez e relacionado a um mesmo campo do formulário, um exemplo
prático é a foto de um veículo onde o campo “foto frontal” pode possuir mais de uma foto caso o usuário
deseje criar uma coleção de fotos.

##### 13. Grupo

O grupo é uma coleção de dados heterogêneos que se mostra útil em situações onde um
mesmo campo possua informações de diferentes componentes e assim como a coleção citada acima é
possível utilizá-lo quantas vezes o usuário desejar. Um exemplo de utilização em perícias de genética
forense onde uma amostra de material genético possível uma ​ data, um ​ código de barras e uma descrição
feita com ​ texto ​ , esse exemplo então utiliza um grupo {data, leitor de código de barras, entrada de texto} e o mesmo se repete para cada amostra a ser documentada.


##### 14. Notas
Esta estrutura não faz parte do conjunto de informações utilizada na confecção do laudo
pré-formatado, as ​ Notas foram desenvolvidas com o intuito de permitir que o usuário possa fazer pequenas
anotações em áudio vinculadas ao aos campos em que este tenha interesse de guardar alguma
observação.

### Componentes Globais


Componentes criados a partir de outros componentes nativos do próprio framework, com o objetivo de suprir necessidades específicas da aplicação, que aparecem com frequência.

##### 1. Header

O Header é um componente de navegação criado para mostrar informações e habilitar ações relacionadas à página atual. É possível apresentar: O título da página atual, botão de voltar , botão que leva ao menu e botão de informações adicionais (info) por meio das propriedades.

##### Uso

title : string -- habilita título da página atual


showMenu : bool -- Botão que leva ao menu lateral genérico


showExit : bool -- Botão para logout


showInfo : bool -- Botão que apresenta informações adicionais


showArrow : bool -- Botão que habilita seta de volta


showClear : bool -- botão que habilita edição de itens


##### 2. Info

Componente criado para exibir informações adicionais por meio de um modal. O botão de informações adicionais é apresentado dentro de outro componente global , o  Header, e pode ser habilitado por meio de uma propriedade. O conteúdo do modal vem do banco de dados.


##### 3. Menu

O menu disponibiliza uma lista de opções por meio de uma tela temporária, facilitando a navegação entre telas. Os links de navegação disponibilizados no menu lateral são: Nova Perícia, Renovar Token, Sair (logout) e Minhas Perícias. O botão de acesso ao menu é apresentado dentro de outro componente global , o  Header, e pode ser habilitado por meio de uma propriedade.

##### 4. Modal

Tela temporária que apresenta mensagens de erro e sucesso ao usuário. O formato deste componente é padronizado, mas é necessário definir por meio de propriedades a animação e mensagem que serão apresentadas, que podem ser referentes à um erro ou ao sucesso de determinado processo.

##### Uso

sucess: bool -- Apresenta a animação e mensagem de sucesso


failure: bool -- Apresenta a animação e mensagem de erro


### Adicionando Novos Componentes

Para adicionar novos componentes alguns passos simples devem ser seguidos:

#### 1) Adicionar a chamada do componente no JSON da perícia dentro do step desejado. Ex:
```
{
          "hint": "Dica para ajudar o usuário",
          "group": "false",
          "label": "Rótulo do componente",
          "required": "false",
          "data_name": "nome_do_dado_coletado",
          "lenght_max": "0",
          "length_min": "0",
          "invalid_text": "mensangem de erro",
          "default_value": "99",
          "component_type": "nome_do_componente",
          "required_message": ""
        }
 ```
#### 2) Instanciar o componente dentro do repositório de componentes em ./src/components/pasta_do_novo_componente.
#### 3) Configurar o componente dentro da pasta de páginas em ./src/pages/components/pasta_do_novo_componente/index.js
#### 4) Instanciar o componente na página src/pages/Step/components/ComponentsList/index.js. Ex:
```
        {
          props.data.component_type === 'nome_do_componente' && (
            <View style={styles.component}>
              <nome_do_componente data={props.data} />
            </View>
          )
        }
```

É importante que o nome do componente no JSON seja o mesmo no arquivo index.js de ComponentList. 

### Gerando APK:
#### 1) Dentro da pasta do projeto:
```
$ react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```
#### 2) Dentro da pasta .Android:
```
$ gradlew assembleRelease

```
#### 3) Diretório da APK:
```
$ ../diretorio_do_projeto/android/app/build/outputs/apk/release
```
##### O procedimento para gerar uma .apk pode ser encontrado na [Documetação oficial](https://facebook.github.io/react-native/docs/signed-apk-android) do React Native. 

