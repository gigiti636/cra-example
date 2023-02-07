import { useEffect, useState } from "react";
import client from '../../../api-client'

export default function useFetchCategories(params) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        (async function () {
            try {
                setLoading(true);
                const response = await client.get(`/categories`);
                setCategories(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [params]);

    const categories_error = error;
    const categories_loading = error;
    return { categories, categories_error, categories_loading };
}