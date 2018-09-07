/* Para jugar, necesitaremos cuatro estructuras de datos diferentes. Estas estructuras son las siguientes:

Palabras. Una array con palabras secretas. Tomaremos una palabra aleatoria de este array, y será la palabra que el jugador tendrá que adivinar.
Palabra secreta. Esta será un string para almacenar la palabra que seleccionamos al azar.
Letras. Otro array, en este caso solo para letras. Éste almacenará todas las letras utilizadas por el jugador, para que podamos mostrarlas todas. Ayudará al usuario a evitar seleccionar la misma letra dos veces.
Errores restantes. Cantidad de errores que el usuario puede hacer hasta el final del juego.
*/
function Hangman () {
  this.words      = ["IRONHACK", "NODEJS", "JAVASCRIPT", "METEOR", "ANGULAR"];
  this.secretWord = "";
  this.letters    = [];
  this.errorsLeft = 10;

//variable que contiene la palabra a adivinar, obtenida de _getWord
  this.secretWord = this._getWord();
}
// Obtener palabra aleatoria
Hangman.prototype._getWord = function () {
  var random = Math.floor(Math.random() * this.words.length);
  return this.words[random];
};
// _isFinished y _gameOver son las funciones que controlan el estado del juego
Hangman.prototype._isFinished = function () {
  return this.getWordStatus().indexOf("_") < 0;
};

Hangman.prototype._gameOver = function () {
  return this.errorsLeft === 0;
};

//insertar una letra, no tiene que funcionar si la letra ya esta,
//saber si es correcta o incorrecta, y si es correcta, que letra es
Hangman.prototype.askLetter = function (letter) {
  letter = letter.toUpperCase();

  if (this.letters.indexOf(letter) > -1) {
    return;
  }

  this.letters.push(letter);
  //Esta variable tiene una condicion, por tanto es, booleana. Devolvera
  //true si se cumple la funcion
  var correct = this.secretWord.indexOf(letter) > -1;

  if (!correct) {
    this.errorsLeft -= 1;
  }

  return correct;
};
//esta funcion comprueba cuando se cumple _isFinished y _gameOver, y devuelve
//un mensaje de victoria o derrota
Hangman.prototype.gameStatus = function () {
  if (this._isFinished()) {
    return "You Win";
  } else if (this._gameOver()) {
    return "Game Over";
  }
};
//mostrar el estado actual de la palabra, y mostrar un _ en los lugares
//donde aun no sepamos la palabra
Hangman.prototype.getWordStatus = function () {
  var that        = this;
  var wordStatus  = [];
  var splitedWord = this.secretWord.split("");

  splitedWord.forEach(function (letter) {
    if (that.letters.indexOf(letter) > -1) {
      wordStatus.push(letter);
    } else {
      wordStatus.push("_");
    }
  });

  return wordStatus;
};
