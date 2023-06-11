import { useGetTask } from "./hooks/useGetTask";
import CreateForm from "./components/createForm";
import { useEffect, useState } from "react";
import { useDeleteTask } from "./hooks/useDeleteTask";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrashCan} from '@fortawesome/free-solid-svg-icons'

import './styles/app.css'
import './styles/tasks.css'

function App() {
  const [task,setTask] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [messageOk, setMessageOk] = useState('')
  const [showMessage, setShowMessage] = useState(false);
  const [tasks,errorGet] = useGetTask()
  const [selectedTask, setSelectedTask] = useState(null);
  const [deleteTask, deleteError, deleteData] = useDeleteTask();

  useEffect(() => {
    if (setTask(tasks)){
      console.log('task complete')
    }else if (errorGet) {
      console.log('error',errorGet)
      setErrorMessage(`Error al cargar la pagina: ${errorGet}`)
    }
  },[tasks,errorGet])

  useEffect(( ) => {
    if (deleteError) {
      console.log(`Error al eliminar la tarea: ${deleteError}`)
      setErrorMessage(`Error al eliminar la tarea: ${deleteError}`)
      setShowMessage(true)
    } else if (deleteData) {
      console.log('Tarea eliminada correctamente')
      setMessageOk('Se ha eliminado correctamente la Tarea')
      setShowMessage(true)

      setTask(task.filter((viewTask) => viewTask.id !== deleteData.taskId));
    }
    setShowMessage(false)

  }, [deleteError, deleteData, task])

  useEffect(() => {
    if (messageOk) {
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
        setMessageOk('')
      }, 3000)
    }
  }, [messageOk])

  useEffect(() => {
    if (errorMessage) {
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
        setErrorMessage('')
      }, 3000)
    }
  }, [errorMessage])

  const handleEditButtonClick = (task) => {
    setSelectedTask(task);
  };

  const handleDeleteButtonClick = (taskId) => {
    deleteTask(taskId)
  };


  const newTask = (formData) => {
    setTask([...task,formData])
    setMessageOk('Se ha creado correctamente la Tarea')
  }

  const handleUpdateTask = (updateTask) => {
    const updatedTaskList = task.map((list) => {
      if (list.id === updateTask.id) {
        setMessageOk('Se ha editado correctamente la Tarea')
        return {
          ...list,
          task: updateTask.task,
          description: updateTask.description
        }
      } else {
        return list;
      }
    });
    setTask(updatedTaskList);
  };

  const capturedError = (errorPost) => {
    console.log(errorPost);
    setErrorMessage(errorPost)
  }
  return (
    <main className="content">
      <div className="box">
        <h1 className="gradient-text">Tareas</h1>
      </div>
      <CreateForm 
        initialData={selectedTask}
        newTask = {newTask}
        updateTask={handleUpdateTask}
        messageError={capturedError}
      />

      {messageOk && <p className="message-ok">{messageOk}</p>}
    
      {errorMessage && <p className='message-error'>{errorMessage}</p>}

      {task.map((viewTask)=>{
        const createdAt = new Date(viewTask.created_at)
        const formattedDate = createdAt.toLocaleDateString()
        const formattedTime = createdAt.toLocaleTimeString()
        
        return(
          <article className='new-task' key={viewTask.id}>
            <div className="view-task">
              <h2 className="name-task">{viewTask.task}</h2>
              <p className="name-description">{viewTask.description}</p>
              <p className="">fecha: {formattedDate}</p>
              <p className="">hora: {formattedTime}</p>
            </div>
            <div className="content-button">
              <div className="content-button-update">
                <button onClick={() => handleEditButtonClick(viewTask)}><FontAwesomeIcon icon={faPenToSquare}/>Editar</button>
              </div>
              <div className="content-button-delete">
                <button onClick={() => handleDeleteButtonClick(viewTask.id)}><FontAwesomeIcon icon={faTrashCan}/>delete</button>
              </div>
            </div>
          </article>
        )
      })}
    </main>
  )
}

export default App
