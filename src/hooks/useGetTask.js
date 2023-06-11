import { useEffect, useState } from "react"

export const useGetTask = () => {
    const [tasks, setTasks] = useState([])
    const [error, setError] = useState('')

    const getTasks = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8000/task/")
        const data = await response.json()
        setTasks(data)
        
        if (response.status !== 200 ) setError(`${response.status}`)
        
    } catch (error) {
        setError(`Error de red: ${error.message}`)
    }}

    useEffect(() => {
        getTasks()
    }, [])

    return [tasks,error]
};