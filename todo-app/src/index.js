import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';


//adding task to list
let AddList = (props) => {
  //striking on completed
  const [state, setstate] = React.useState(false);

  //setting strike state
  let changestate = () => {
    setstate(!state);
  }

  // sets classname of input
  let setClassName = (task) => {
    return task;
  }

  return (
    <React.Fragment>

      <td>
        <button id="complete" onClick={changestate}>
          {state ? <i className="material-icons" style={{ fontSize: "36px" }}>check_box</i> : <i className="material-icons" style={{ fontSize: "24px" }}>check_box_outline_blank</i>}
        </button>
      </td>

      <td className={state ? "strike" : "nostrike"}>
        <span className="fontli">&nbsp;{props.listEle}</span>
      </td>

      <td>
        <input type="text" className={setClassName(`${props.listEle}`)} />
      </td>

      <td>
        <button disabled={state ? true : false}>
          <i className='fas fa-edit' onClick={() => props.editRow()} style={{ fontSize: '36px', cursor: 'pointer' }}>
          </i>
        </button>
      </td>

      <td><i className="material-icons" onClick={() => props.deleteRow()} style={{ fontSize: "36px", color: "red", cursor: "pointer" }}>delete</i></td>
    </React.Fragment>

  )
}


//Todo app
let TodoAppComponent = () => {
  const [todoArr, setTodo] = React.useState(['Shopping', 'React ToDo'])

  // display task in list on clicking on add button
  let printVal = () => {
    let inpEle = document.getElementById('task');
    let newVal = inpEle.value;
    if (todoArr.includes(newVal)) {
      alert('This todo already exists in list');
      inpEle.focus();
      return;
    }

    if (inpEle.value == "") return;
    inpEle.value = "";
    inpEle.focus();

    let newtodoArr = todoArr.concat([newVal]);
    setTodo(newtodoArr);
  }

  //deleting task row
  let deleteRow = (todoindex) => {
    let newTodoArr = [...todoArr];
    newTodoArr.splice(todoindex, 1);
    setTodo(newTodoArr);
  }

  //update task row with new text
  let editRow = (todoIndex) => {

    let ele = document.getElementsByClassName(`${todoArr[todoIndex]}`)[0];
    if (!ele) return;
    let newtodoArr = [...todoArr];
    let updatedVal = ele.value;
    if (updatedVal == "") return;
    if (todoArr.includes(updatedVal)) {
      alert('This todo already exists in list');
      ele.focus();
      return;
    }
    newtodoArr.splice(todoIndex, 1, updatedVal);
    setTodo(newtodoArr);
    ele.value = "";
  }

  return (
    <div className="container">
      <h1>ToDo App</h1>
      <input type="text" id="task" />
      <i id="addBtn" onClick={printVal} className="fa fa-plus-square" style={{ fontSize: "40px", cursor: "pointer" }}></i><br /><br />
      <table className="table table-hover w-auto">
        <tbody>
          {todoArr.map((todo, index) => <tr><AddList listEle={todo} todoIndex={index} deleteRow={() => deleteRow(index)}
            editRow={() => editRow(index)}></AddList></tr>)}
        </tbody>
      </table>
    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>

    <TodoAppComponent />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
