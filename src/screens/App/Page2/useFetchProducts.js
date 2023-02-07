import { useEffect, useState } from "react";
import client from '../../../api-client'

export default function useFetchProducts(params) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                setLoading(true);
                const response = await client.get(`/products/?${params}`);
                setProducts(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [params]);

    return { products, error, loading };
}