import React from 'react';
import Board from './components/Board';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <main className="game">
        <section className="game-board">
          <Board />
        </section>
        <section className="game-info">
          <div>{/* STATUS */}</div>
          <ol>{/* TODO */}</ol>
        </section>
      </main>
    </React.Fragment>
  );
}

export default App;
