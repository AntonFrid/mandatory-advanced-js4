import React from 'react';

let gridArray = new Array(7 * 6).fill(0);

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentColor: 1, winner: null, draw: false };

    this.onClickCell = this.onClickCell.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  onClickCell(e) {
    let newColor = this.state.currentColor === 1 ? 2: 1;
    let i = parseInt(e.target.id);

    if(gridArray[i + 35] === 0) {
      gridArray[i + 35] = this.state.currentColor;
    }else {
      if(gridArray[i + 28] === 0) {
        gridArray[i + 28] = this.state.currentColor;
      }else {
        if(gridArray[i + 21] === 0) {
          gridArray[i + 21] = this.state.currentColor;
        }else {
          if(gridArray[i + 14] === 0) {
            gridArray[i + 14] = this.state.currentColor;
          }else {
            if(gridArray[i + 7] === 0) {
              gridArray[i + 7] = this.state.currentColor;
            }else {
              if(gridArray[i] === 0) {
                gridArray[i] = this.state.currentColor;
              }
            }
          }
        }
      }
    }

    this.winChecker();
    this.drawCheck();

    this.setState({ currentColor: newColor });
  }

  winChecker() {
    //Row.
    for(let i = 0; i < gridArray.length; i += 7) {
      for(let j = i; j <= i + 3; j++) {
        if(gridArray[j] !== 0){
          if(gridArray[j] === gridArray[j + 1] && gridArray[j] === gridArray[j + 2] && gridArray[j] === gridArray[j + 3]){
            if(this.state.currentColor === 1) {
              this.setState({ winner: 'Red'});
            }else {
              this.setState({ winner: 'Yellow'});
            }
          }
        }
      }
    }

    //Column.
    for(let i = 0; i < gridArray.length / 6; i++) {
      for(let j = i; j <= i + 14 ; j += 7) {
        if(gridArray[j] !== 0){
          if(gridArray[j] === gridArray[j + 7] && gridArray[j] === gridArray[j + 14] && gridArray[j] === gridArray[j + 21]){
            if(this.state.currentColor === 1) {
              this.setState({ winner: 'Red'});
            }else {
              this.setState({ winner: 'Yellow'});
            }
          }
        }
      }
    }

    //Diagonal descending.
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        const idx = i * 7 + j;

        if(gridArray[idx] !== 0){
          if(gridArray[idx] === gridArray[idx + 8] && gridArray[idx] === gridArray[idx + 16] && gridArray[idx] === gridArray[idx + 24]){
            if(this.state.currentColor === 1) {
              this.setState({ winner: 'Red'});
            }else {
              this.setState({ winner: 'Yellow'});
            }
          }
        }
      }
    }

    //Diagonal ascending.
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        const idx = (i * 7 + j) + 21;

        if(gridArray[idx] !== 0){
          if(gridArray[idx] === gridArray[idx - 6] && gridArray[idx] === gridArray[idx - 12] && gridArray[idx] === gridArray[idx - 18]){
            if(this.state.currentColor === 1) {
              this.setState({ winner: 'Red'});
            }else {
              this.setState({ winner: 'Yellow'});
            }
          }
        }
      }
    }
  }

  drawCheck() {
    let whiteCount = 0;

    for (let i = 0; i < gridArray.length; i++) {
      if (gridArray[i] === 0) {
        whiteCount++;
      }
    }

    if (whiteCount === 0 && !this.state.winner) {
      this.setState({ draw: true });
    }
  }

  resetGame() {
    this.setState({ winner: null, currentColor: 1 });
    gridArray = new Array(7 * 6).fill(0);
  }

  render() {
    return (
      <>
        <h2>{ this.state.winner ? this.state.winner + ' has won the game!': this.state.draw ? 'It\'s a draw!': null}</h2>
        {this.state.winner || this.state.draw ? <button onClick={ this.resetGame }>Reset</button>: null}
        <div className='grid'>
          { gridArray.map((value, index) => {
            return <div
              key={ index }
              id={ index }
              onClick={ !this.state.winner ? index <= 6 && value === 0 ? this.onClickCell: null: null}
              className={ value === 0 ? 'grid-cell': value === 1 ? 'cell-red': 'cell-yellow'}>
            </div>
          })}
        </div>
        <div className='trapezoid'></div>
      </>
    );
  }
}

export default Grid;
