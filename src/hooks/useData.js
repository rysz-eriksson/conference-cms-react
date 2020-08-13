import { useState, useEffect } from 'react';
import database from '../firebase/firebase';

export default function useData(library_type) {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        database.ref(library_type).on('value', (snapshot) => {
            let lectures = []
            if (snapshot.val() !== null) {
                snapshot.forEach((childSnap) => {
                    lectures.push({
                        id: childSnap.key,
                        ...childSnap.val()
                    })
                    setMovies([...lectures])
                })
        }
    }, (err) => {
        alert(err)
        })
    }, []);
    return movies
}