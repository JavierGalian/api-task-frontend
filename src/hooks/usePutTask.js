import { useState } from "react";

export const usePutTask = () => {
    const [error, setError] = useState(null)
    const [datas, setData] = useState(null)

    const putData = (taskId, formData) => {

        fetch(`http://127.0.0.1:8000/task/${taskId}/`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        setData(data)
    })
    .catch(error => {
        setError(`Error de red: ${error.message}`)
    });
    }

    return[putData,error,datas]
}