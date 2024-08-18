import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { AiFillDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  const handleDelete = (e, id) => {
    let newtodos = todos.filter(item=>{
      return item.id!==id
    });
    confirm("do u wanna delete?")
    setTodos(newtodos)
    saveTodos()
  }

  const handleshowfinished = (e)=>{
    setshowfinished(!showfinished)

  }

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let ts = JSON.parse(localStorage.getItem("todos"))
      setTodos(ts)
    }
  }, [])
  

  const saveTodos =()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  
  const handleEdit = (e,id) => {
    let newtodo = todos.filter(item=>item.id ===id)
    setTodo(newtodo[0].todo)
    let newtodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newtodos)
    saveTodos()
  }


  const handleAdd = () => {
    setTodos([...todos,{id:uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveTodos()

  }
  const handleChange = (e) =>{
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) =>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    setTodos(newtodos)
    saveTodos()
  }

  return (
    <>
      <Navbar />
      <div className="container bg-violet-100 w-[60vw] my-5 rounded-xl min-h-[80vh] mx-[20vw] ">
        <div className="font-bold text-2xl text-center">iTask- manage your Todos</div>
        <div className="font-bold text-xl my-5 mx-5">Add a Todo</div>
        <div className="input">
          <input value={todo} onChange={handleChange} type="text" className='textinput w-[35vw] mx-5 h-8 rounded-2xl sm: w-[50vw]' />
          <button onClick={handleAdd} className='bg-violet-700 rounded-2xl w-28 text-white h-8 hover:bg-violet-900 max-sm: w-[50vw] max-sm: m-5 '>Save</button>
        </div>

        <input onChange={handleshowfinished} type="checkbox" name="showfnished" checked={showfinished} id="" className='h-[20px] w-10 m-0 p-0 border-black-50 items-center my-5'   /> Show finished Todos


        <div className="yourtodo font-bold text-xl my-5 mx-5">Your Todos</div>
        {todos.length===0 && <div className='mx-5'>No todos to display</div> }

        {todos.map(item=>{
        return(showfinished || !item.isCompleted) && <div key={item.id} className="todos">
          <input name={item.id} onChange={handleCheckbox} checked={item.isCompleted}  type="checkbox" id="" className='h-[20px] w-10 m-0 p-0 border-black-50' />
          <div className="todo flex justify-between m-5 items-center">
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            <div className="buttons flex gap-5">
              <button onClick={(e)=>handleDelete(e, item.id)} className='bg-violet-700 rounded-3xl w-10 flex items-center justify-center  text-white h-8 hover:bg-violet-900'><AiFillDelete /></button>
              <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-700 rounded-3xl w-10 flex justify-center items-center text-white h-8 hover:bg-violet-900'><CiEdit /></button>
            </div>
          </div>
        </div>
        })}


      </div>
    </>
  )
}

export default App
