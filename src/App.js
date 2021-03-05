import {React, useState, useEffect} from 'react';
import './App.css';
import Input from "./components/Input/Input";


function App() {
  const [todos, settodos] = useState([]);
  const [todo, settodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingText, seteditingText] = useState("");

//to load data on refreshing page
 useEffect(() => {
  const dataToLoad = localStorage.getItem("stringFromWhereWeGETDATA") 
  const loadedData = JSON.parse(dataToLoad)

  if(loadedData){
    settodos(loadedData);
  }
  
 }, [])

//we using useEffect to store data on local storage
  useEffect(() => {
    const temp = JSON.stringify(todos)
    localStorage.setItem("stringFromWhereWeGETDATA",temp)
  }, [todos])

  const handleChange = (e)=>{
    settodo(e.target.value)
  }

  const handleClick = ()=>{
    const newTodo = {
      id:new Date().getTime(),
      text:todo,
      completed: false
    }
    settodos(
     [...todos,newTodo]
    )
    settodo("")
  }
  const handleDelete = (id)=>{
    const updatedTodo = todos.filter((item)=> item.id !== id)
    settodos(updatedTodo);
  }

  const handleSave =(id)=>{
    if(editingText === "") {
      return;
    };
    const updatedTodo = todos.map((item)=>{
      if(id === item.id){
        item.text = editingText;
      }
      return item
    })
    settodos(updatedTodo)
    setEditingTodo(null)
    seteditingText("")
  }

  const toggelecheck = (id)=>{
    const updatedTodo = todos.map((item)=>{
      if(item.id === id){
        item.completed = !item.completed
      }
      return item
    })
    settodos(updatedTodo);
  }

  return (
    <div className="App">
      <h1>TO DO LIST</h1>
      <div className="addInput">
        <Input onChange = {handleChange} value = {todo}/>
        <button onClick = {handleClick} className = "btn">ADD</button>
      </div>


      {todos.map((item)=><div key = {item.id} className = "list">
          
          <div className = "itemToShow"><input 
                                          type ="checkbox" 
                                          onChange = {()=>toggelecheck(item.id)} 
                                          checked = {item.completed}/>
                                          {item.text}
          </div>
          <button onClick = {()=>handleDelete(item.id)}>Delete</button>
          {editingTodo === item.id ? (
            <>
            <input type ="text" onChange = {(e)=>seteditingText(e.target.value)} value ={editingText} />
            <button onClick ={()=>handleSave(item.id)}>Save</button>
            </>
          ): (<button onClick = {()=>setEditingTodo(item.id)}>Edit</button>)}
           
          </div>
      )}
      </div>
  );
}

export default App;
