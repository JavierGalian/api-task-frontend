/* eslint-disable react/prop-types */
import { useState,useEffect } from "react"
import { usePostTask } from "../hooks/usePostTask"
import { usePutTask } from "../hooks/usePutTask"

import '../styles/createForm.css'

function CreateForm ({initialData, newTask, updateTask, messageError }) {
    const [task, setTask] = useState('')
    const [description, setDescription] = useState('')
    const [postData,errorPost,dataPost] = usePostTask()
    const [putData, errorPut,dataPut] = usePutTask()

    useEffect(() => {
        if (dataPost) {
            console.log('dataPost',dataPost);
            const taskNew = {...dataPost}
            newTask(taskNew)
        } else if (errorPost){
            console.log('Error al guardar la tarea: ', errorPost)
            const newError = (`Error al guardar la tarea: ${errorPost}`)
            messageError(newError)
        }
    }, [dataPost, errorPost]);

    useEffect(() => {
            if (dataPut) {
                const updateNew = {...dataPut}
                updateTask(updateNew)
            } else if (errorPut){
                const newError = (`Error al editar la tarea: ${errorPut}`)
                messageError(newError)
            }
        }, [dataPut,errorPut]);

    useEffect(()=>{
        if (initialData){
            setTask(initialData.task)
            setDescription(initialData.description)
        } else {
            setTask('')
            setDescription('')
        }
    },[initialData])


    const handleTaskChange = (e) => {setTask(e.target.value)}
    const handleDescriptionChange = (e) => {setDescription(e.target.value)}

    const handleSubmit = (e) =>{
        e.preventDefault()
    
        const formData = {
            task: task,
            description: description
        }
        
        if (initialData && initialData.id) {
            putData(initialData.id, formData)
            setTask('')
            setDescription('')
        } else {
            postData(formData)
            setTask('')
            setDescription('')
        }
    }

    return(
        <section className="content-form">
            <form className="form" onSubmit={handleSubmit}>
                <label className="label">Tarea:</label>
                <input type="text" 
                placeholder={initialData? `${initialData.id}` : 'Nueva Tarea...'}
                id="task"
                value={task}
                onChange={handleTaskChange}/>

                <label className="label">Descripcion:</label>
                <textarea placeholder={initialData? `${initialData.description}` : 'Descripcion...'}
                id="description"
                value={description}
                onChange={handleDescriptionChange}/>
                <div className="content-button-save">
                    <button className="button-save" type="submit" >{initialData ? 'update' : 'save'}</button>
                </div>
            </form>    
        </section>
    )
}

export default CreateForm