import { useEffect, useRef, useState } from 'react'
import ListaTareas from '../components/ListaTareas'
import axios from 'axios'

const Prueba = ({ onSubmit: parentOnSubmit }) => {

    const form = useRef()

    const [tareas, setTareas] = useState([])

    const cargarTareas = () => {
        axios.get('http://localhost:8080/tareas')
            .then(({ data }) => setTareas(data))
            .catch((error) => console.error("Error al cargar tareas:", error))
    }

    useEffect(cargarTareas, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(form.current);
        const values = {
            nombre: formData.get('nombre'),
            completado: formData.get('completado') === 'on',
        }

        axios.post('http://localhost:8080/tareas', values)
            .then(() => {
                cargarTareas()
                form.current.reset()
            })
            .catch((error) => console.error("Error al agregar tarea:", error))

        if (parentOnSubmit) parentOnSubmit(values)
    }

    return (
        <div>
            <h1>Prueba</h1>
            <ListaTareas tareas={tareas} />
            <form ref={form} onSubmit={handleSubmit} className='mt-10 border bg-zinc-500 rounded-3xl p-10'>
                <h3>Tarea nueva</h3>
                <input
                    name='nombre'
                    type="text"
                    className='border rounded-3xl p-2'
                    placeholder='Nombre de la tarea'
                    required
                />
                <p>Completado</p>
                <input name='completado' type='checkbox' />
                <br />
                <button
                    type="submit"
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                >
                    Agregar
                </button>
            </form>
        </div>
    );
};

export default Prueba