// IDEA: declararemos una variable global para acceder a las funciones del
//juego. Esta variable se inicializará cada vez que se haga clic en
//el botón "Nuevo juego".
var hangman;

var newGameClick = function () {
  _initializeControls();
  hangman = new Hangman();
  drawCurrentWord();
};
// IDEA: esta funcion reseta el juego a los valores iniciales
var _initializeControls = function () {
  document.getElementById("you-win").classList   = "hide";
  document.getElementById("game-over").classList = "hide";
  document.getElementById("hangman").classList   = "";
  document.getElementById("letters").innerHTML   = "";
};

//borra el estado actual de la palabra
var resetCurrentWord = function () {
  // este dom, enlaza la palabra a adivinar con el contenido del
  // div currentWord
  var word = document.getElementById("currentWord");
  //borra la palabra dentro de currentWord
  while (word.firstChild) {
    word.removeChild(word.firstChild);
  }
};
//funcion que agrega las letras a nuestra palabra
var drawCurrentWord = function (word) {
  resetCurrentWord();

  var currentWord    = word || hangman.getWordStatus();
  //cambia la variable que enlaca con el div currentWord
  var currentWordDom = document.getElementById("currentWord");

  currentWord.forEach(function (letter) {
    //creamos una etiquiqueta span
    var spanLetter = document.createElement("span");
    //creamos un text node con la info de las letras o _ de la palabra descubierta
    var content    = document.createTextNode(letter);

    //introducimos el contenido de text node en el span
    spanLetter.appendChild(content);
    //añadimos los span a el div currentWord
    currentWordDom.appendChild(spanLetter);
  });
};
//dibujamos una parte del hombre ahorcado por cada fallo
var drawHangman = function () {
  document.getElementById("hangman").classList += " lifes-" + (hangman.errorsLeft + 1);
};
//añadimos las letras utilizadas al div letters
var _addLetter = function (letter) {
  document.getElementById("letters").innerHTML += letter;
};
//funcion para introducir una letra
var insertLetter = function (event) {
  //con este if, hacemos que solo se active el evento al pulsar una letra (que no cualquier tecla)
  if (!hangman || (event.keyCode < 65 || event.keyCode > 90))
    return;

  //con El método String.fromCharCode devuelvemos el string creado utilizando la
  //representación ASCII de la misma.
  var letter  = String.fromCharCode(event.keyCode);
  //devolvera verdadero o falso, de la funcion askLetter()
  var correct = hangman.askLetter(letter);

  if (!correct && correct !== undefined) {
    _addLetter(letter);
    drawHangman();
  } else {
    drawCurrentWord();
  }

  afterRound();
};
//funcion que verifica si el juego a finalizado
var afterRound = function () {
  var status = hangman.gameStatus();

  if (!status)
    return;

  if(status.toLowerCase() === "you win") {
    document.getElementById("you-win").classList = "";
  } else {
    drawCurrentWord(hangman.secretWord.split(""));
    document.getElementById("game-over").classList = "";
  }

  hangman = undefined;
};
// IDEA: este dom hace que al pulsar el boton nuevo juego, se inicie hangman
document.getElementById("new-game").addEventListener("click", newGameClick);
// IDEA: este dom permite insertar letras a traves del teclado
document.addEventListener("keydown", insertLetter);
