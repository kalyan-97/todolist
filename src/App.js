import React,{useState} from "react";
import "./App.css";


const App = () =>{
  const [list,setList] = useState([])
  const [message,setMessage] = useState("")
  const [edit,setEdit] = useState({
    id : "",
    status : false
  })
   
  const handleMessage = (e) =>{
    setMessage({
      ...message,
      text : e.target.value,
    })
  }
  const handleAdd = () =>{
     let todo = {
      text : message.text,
      id : new Date().getSeconds().toString()
     }
     setList([...list,todo])
     setMessage({
      text : "",
      id : ""
     })
  }

  const handleDelete = (id) =>{
     const newTodo = list.filter((data) => data.id !== id);
     setList(newTodo)
  }  

  const handleEdit = (id) => {
    setEdit({
      ...edit,
      id : id,
      status : true
    })

    let newTodo = list.find((x) =>x.id===id)

    setMessage({
      ...message,
      text : newTodo.text,
      id : newTodo.id
    })
  }

  const handleChangedEdit = (e) =>{
    setEdit({
      ...edit,
      status : false
    })

    let newTodo = list.map((x) => {
      if(x.id === edit.id){
        return {
          text : message.text,
          id : edit.id
        }
      }else{
        return x 
      }
    })

    setList(newTodo)
    setMessage({
      text : "",
      id : ""
    })
  }

  return(
    <section className="section"> 
    <div className="container">
      <div> 
      <input value={message.text
      } onChange={handleMessage} type="text"/> 
       {edit.status ? <button className="edit" onClick={handleChangedEdit}> Edit </button> : <button className="add" onClick={handleAdd}> Add </button>}
      <hr/>
      </div>
      {
        list.map((x) =>{
          return(
            <ul key={x.id} className="wrapper">
              <li> 
              <span>{x.text} </span>   
              <div> 
              <button onClick={() => handleEdit(x.id)}> <i class="fa fa-pencil" aria-hidden="true"></i></button>
              <button onClick={() => handleDelete(x.id)}> <i class="fa fa-trash" aria-hidden="true"></i></button>
              </div>
              </li>
            </ul>
          )
        })
      }
    </div>
    </section>
  )
}

export default App;