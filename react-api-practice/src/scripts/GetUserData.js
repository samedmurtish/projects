import { useEffect, useState } from "react";

export default function GetUserData(userId) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const apiUrl = "https://jsonplaceholder.typicode.com";
    const id = userId;

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        fetch(`${apiUrl}/users/${id}`, {
                signal: controller.signal,
            })
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
                setError(undefined);
            })
            .catch((error) => setError(error))
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            });
        return () => {
            controller.abort();
            setLoading(false);
        };
    }, []);

    return {
        user,
        loading,
        error,
    };
}