import React, { Component } from 'react';
import './styles.css';
import ResultComponent from './components/ResultComponent';
import KeyPadComponent from './components/KeyPadComponent';
import math from 'mathjs';

class App extends Component {
  state = {
    result: ""
  }

  onClick = button => {
    if(button === "=") {
      this.calculate();
    }

    else if(button === "C") {
      this.reset();
    }

    else if(button === "CE") {
      this.backspace();
    }

    else {
      this.setState({
        result: this.state.result + button
      })
    }
  };

  calculate = () => {
    try {
      const calculatedResult = this.evaluateExpression(this.state.result);
      this.setState({
          result: (calculatedResult || '') + ''
      });
    } catch (e) {
      this.setState({
          result: 'error'
      });
    }
  };

  reset = () => {
    this.setState({
      result: ""
    })
  };

  backspace = () => {
    this.setState({
        result: this.state.result.slice(0, -1)
    })
  };

  // Función para evaluar la expresión matemática
  evaluateExpression = (expression) => {
    return Function(`'use strict'; return (${expression})`)();
  };

  render() {
    return (
      <div>
        <div className="calculator-body">
          <h1>SCalculadora Cuantica</h1>
          <ResultComponent result={this.state.result} />
          <KeyPadComponent onClick={this.onClick} />
        </div>
      </div>
    )
  }
}

export default App;
