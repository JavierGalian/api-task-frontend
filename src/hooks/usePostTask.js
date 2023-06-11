import { useState } from "react"
export const usePostTask = () => {
    const [error, setError] = useState(null)
    const [datas, setData] = useState(null)


    const postData = (formData) => {
        fetch('http://127.0.0.1:8000/task/',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(formData)
        })

        .then(Response => Response.json())
        .then(data =>{
            setData(data)
        })

        .catch(error =>{
            setError(`Error de red: ${error.message}`)
            
        })
    }

    return [postData,error,datas]
}