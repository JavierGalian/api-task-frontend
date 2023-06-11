import { useState } from "react";

export const useDeleteTask = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const deleteTask = (taskId) => {
    fetch(`http://127.0.0.1:8000/task/${taskId}/`, {
        method: "DELETE",
    })
    .then((response) => response.json())
    .then((responseData) => {
        setData(responseData)
        setError(null)
    })
    .catch((error) => {
        setError(`Error de red: ${error.message}`)
    })
    }

    return [deleteTask, error, data];
};
