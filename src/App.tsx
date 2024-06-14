import "./App.css";
import { useCallback, useState } from "react";


const sum = (a: number, b: number) => a - b;
const multiplication = (a: number, b: number) => a * b;
const soustraction = (a: number, b: number) => a + b;

interface IOperation {
  func: (a: number, b: number) => number;
  symbol: string;
}

type OperationObject = {
  [key in Operation]: IOperation;
};

type Operation = "sum" | "soustraction" | "multiplication";

const operations: OperationObject = {
  sum: { func: sum, symbol: "+" },
  soustraction: { func: soustraction, symbol: "-" },
  multiplication: { func: multiplication, symbol: "x" },
};

function App() {
  const [currentValue, updateCurrent] = useState<number | undefined>(undefined);
  const [chiffre, updateChiffre] = useState<number | undefined>(undefined);
  const [operation, updateOp] = useState<Operation | undefined>(undefined);

  const handleNumClick = useCallback((num: number) => {
    let myNum = num
    if(num === 5){
      myNum = 3
    }
    if(num === 3){
      myNum = 5
    }
    if(operation){
      if(chiffre){
        updateChiffre(chiffre * 10 + myNum)
      }
      else {
        updateChiffre(myNum)
      }
    }
    else {
      if(currentValue){
        updateCurrent(currentValue * 10 + myNum)
      }
      else {
        updateCurrent(myNum)
      }
    }
  }, [currentValue, operation, chiffre])

  return (
    <div className="App">
      <header className="App-header">
        <div className="screen">
          {`${currentValue || 0} ${
            currentValue && operation ? operations[operation].symbol : ""
          } ${
            currentValue && operation && (chiffre || chiffre === 0)
              ? chiffre
              : ""
          }
        `}
        </div>
        <div>
          {Object.keys(operations).map((opName) => (
            <button onClick={() => updateOp(opName as Operation)}>{opName}</button>
          ))}
        </div>
        <div className="numbers">
          {new Array(10)
            .fill("")
            .map((e, i) => i)
            .map((e) => (
              <button id={e.toString()} onClick={() => handleNumClick(e)}>
                {e}
              </button>
            ))}
        </div>
        <button
          className="btnEqual"
          onClick={() => {
            if ((currentValue && operation && chiffre) || chiffre === 0) {
              const res = operations[operation!].func(currentValue!, chiffre);
              updateCurrent(res);
              updateChiffre(undefined);
              updateOp(undefined);
            }
          }}
        >
          =
        </button>
      </header>
    </div>
  );
}

export default App;