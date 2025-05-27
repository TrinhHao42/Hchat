import { useEffect, useState } from "react"
import axios from 'axios'

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchAPI = async () => {
            setLoading(true)

            await axios(url)
                .then(data => setData(data))
                .catch(error => setError(error))
                .finally(setLoading(false))
        }

        fetchAPI()
    })

    return { data, loading, error }
}

export default useFetch