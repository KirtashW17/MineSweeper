'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfColumns * numberOfRows;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',

    //creamos la variable fliptile()
    value: function flipTile(rowIndex, columnIndex) {
      if (this.playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }
      this._numberOfTiles--;
    }

    //creamos una funcion para obtener las bombas adyacentes
    //This will calculate the number of bombs next to the square at the given rowIndex and columnIndex on the provided bombBoard.

  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      //cada array representa una casilla adyacente
      var neighborOffsets = [[0, 1], [0, -1], [1, 0], [-1, 0], [-1, -1], [1, 1], [1, -1], [-1, 1]];
      //calcula el numero de filas contando las arrays dentro de bombBoard(array)
      var numberOfRows = this._bombBoard.length;
      //calcula las columnas contando los elementos ' ' dentro de la primera nested array
      var numberOfColumns = this._bombBoard[0].length;
      //numero de bombas descubiertas alrededor ; creamos la variable
      var numberOfBombs = 0;
      //foreach para cada casilla de las 8 alrededor
      neighborOffsets.forEach(function (offset) {
        //calcula las coordenadas de las casillas adyacentes
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        //Controla que la casilla no esté fuera del tabero
        if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
          //se ejecuta : en el caso de que la casilla en cuestion contiene una bomba
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            //sumamos 1 al contador
            numberOfBombs++;
          }
        }
      });
      //devuelve el numero de bombas como llamada de la funcion
      return numberOfBombs;
    }

    // Comprueba si el jugador ha ganado

  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }
    //le damos formato al tablero

  }, {
    key: 'print',
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
    //creamos una constante con la función que generará el tablero, acepta 2 parametros

  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      //creamos una array vacía que contiene el tablero
      var board = [];
      //iteramos por el numero de filas
      for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        //creamos una array vacía que contiene una fila
        var row = [];
        //iteramos por el numero de columnas
        for (var cIndex = 0; cIndex < numberOfColumns; cIndex++) {
          //ponemos un espacio vacío en la fila
          row.push(' ');
        }
        //ponemos la fila en la array del tablero
        board.push(row);
      }
      //devolvemos el tablero como respuesta a la llamada de la función
      return board;
    }

    //Creamos la función que generará las bombas del tablero

  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      //creamos una array vacía que contiene el tablero
      var board = [];
      //iteramos por el numero de filas
      for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        //creamos una array vacía que contiene una fila
        var row = [];
        //iteramos por el numero de columnas
        for (var cIndex = 0; cIndex < numberOfColumns; cIndex++) {
          //ponemos un espacio vacío en la fila
          row.push(null);
        }
        //ponemos la fila en la array del tablero
        board.push(row);
      }

      //creamos una variable con el numero de bombas ya colocadas.
      var numberOfBombsPlaced = 0;
      //creamos un loop mientras la condicion sea cierta
      while (numberOfBombsPlaced < numberOfBombs) {
        //IMPORTANT: The code in your while loop has the potential to place bombs on top of already existing bombs. This will be fixed when you learn about control flow.
        //generamos las bombas automaticamente y sumamos a la variable creada anteriormente
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }
      }
      //devolvemos el tablero como respuesta a la llamada de la función
      return board;
    }
  }]);

  return Board;
}();