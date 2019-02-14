![N|Solid](http://www.marca.unb.br/img/assinatura_cor/as_bas_cor.gif)

# Sistema Móvel de Suporte à Perícia - AppINC

#### Introdução
O appINC é uma solução composta de um aplicativo para dispositivos móveis e o correspondente servidor de processamento, customização e armazenamento de POPs (Procedimento Operacional Padrão) dando suporte ao usuário durante a coleta de vestígios e a confecção dos laudos em docx editável.


#### Executando o projeto:

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
├───assets
│   ├───img
│   └───lottie
├───components
│   ├───audio
│   ├───camera
│   ├───checkbox
│   ├───date
│   ├───geolocation
│   ├───InputText
│   ├───scanner
│   ├───sketch
│   ├───veiculo
│   └───vestigios
├───config
├───globalComponents
│   ├───alert
│   ├───header
│   ├───info
│   ├───load
│   ├───menu
│   └───modal
├───pages
│   ├───components
│   │   ├───audio
│   │   ├───camera
│   │   ├───checkbox
│   │   ├───date
│   │   ├───geoloc
│   │   ├───group
│   │   ├───input
│   │   ├───scanner
│   │   ├───sketch
│   │   └───veiculo
│   │ 
│   ├───email
│   ├───hash
│   ├───hist
│   ├───login
│   ├───main
│   ├───new
│   ├───offline
│   ├───password
│   ├───Step
│   │   └───components
│   │       └───ComponentsList
│   └───StepList
│       └───components
│           └───StepBox
│ 
├───services
├───store
│   ├───actions
│   ├───ducks
│   └───sagas
└───styles
|
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

##### 3. Selecionar Data

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

##### 7. Leito de Codigo de Barras e QR Code

Responsável pela leitura de códigos de barras e bi-dimensionais (QRcode). Este componente foi projetado para facilitar o processo de cadeia de custódia das evidências físicas coletadas no local de crime, visto que pode conectar as evidências coletadas com os dados preenchidos no aplicativo.

* [react-native-barcode-scanner-google](https://www.npmjs.com/package/@nois/react-native-barcode-scanner-google)

##### 8. Croqui 

Componente que permite a confecção de desenho à mão livre em diversas cores, sendo disponível nove cores principais que podem ser estendidas para qualquer tom dentro do espectro de cores em código hexadecimal, assim como traços de diferentes espessuras que podem ser escolhidas ao longo do desenho de acordo com a necessidade do usuário através de um botão no menu superior do componente .

* [SketchCanvas](https://www.npmjs.com/package/@terrylinla/react-native-sketch-canvas)

##### 9. Consulta a APIs e Banco de Dados

Este componente permite integrar o aplicativo a APIs e BDs externos, com auxílio do cliente HTTP Axios, que envia e trata requisições HTTP possibilitando a comunicação com servidores externos aos quais o app possua credenciais de acesso. Um exemplo utilizado no projeto é a consulta à API da tabela FIPE.

* [Axios](https://github.com/axios/axios)

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


### Adicionando Novos Documentos

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
$ ../diretorio_do_projeto/android/app/build/outputs/apk/release
```
#### O procedimento oficial para gerar uma .apk pode ser encontrado na [Documetação oficial](https://facebook.github.io/react-native/docs/signed-apk-android) do React Native. 

