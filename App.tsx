import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, Pressable, StatusBar } from 'react-native';

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(''));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares: string[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i: number) => (
    <Pressable style={styles.button} onPress={() => handleClick(i)}>
      <Text style={styles.buttonText}>{squares[i]}</Text>
    </Pressable>
  );

  const winner = calculateWinner(squares);
  let status: string;
  if (winner) {
    status = `Winner: ${winner} ✨🎉✨`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"black"}></StatusBar>

      <Text style={[{color:"gray", fontSize:20}]}>Tic Tac Toe</Text>
      <Text style={[styles.status, {color:"white"}]}>{status}</Text>

      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
      <Button title='RESTART' color="red" onPress={()=> setSquares(Array(9).fill("")) }></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:"space-around",
    backgroundColor:"black"
  },
  board: {
    flexDirection: 'column',
    gap:30
  },
  row: {
    flexDirection: 'row',
    gap:30
  },
  square: {
    width: 100,
    height: 100,
  },
  button:{
    backgroundColor:"#333945",
    height:60,
    width:60,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:5
  },
  buttonText:{
    fontSize:30,
    color:"white"
  },
  status: {
    marginBottom: 10,
    backgroundColor:"green",
    padding:10
  },
});
