import React from 'react';
import Board from './components/Board';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move # ${move}` :
        `Go to game start`;

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }
    return (
      <React.Fragment>
        <main className="game">
          <section className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              restart={() => {
                this.setState(
                  {
                    history: [{
                      squares: Array(9).fill(null),
                    }],
                    xIsNext: true,
                    stepNumber: 0,
                  }
                )
              }}
            />
          </section>
          <section className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </section>
        </main>
      </React.Fragment>
    );
  }

}

export default App;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 6],
    [2, 5, 8]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }

  }
  return null;
}