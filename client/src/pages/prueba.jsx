import { useEffect, useRef, useState } from 'react';
import ListaTareas from '../components/ListaTareas';
import axios from 'axios';

const Prueba = ({ onSubmit: parentOnSubmit }) => { // Renombrado para evitar colisión con `onSubmit`

    const form = useRef();

    const [tareas, setTareas] = useState([]);

    // Cargar tareas desde el backend
    const cargarTareas = () => {
        axios.get('http://localhost:8080/tareas')
            .then(({ data }) => setTareas(data))
            .catch((error) => console.error("Error al cargar tareas:", error)); // Manejo de errores
    };

    useEffect(cargarTareas, []); // Llama cargarTareas al montar el componente

    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        const formData = new FormData(form.current); // Obtiene los valores del formulario
        const values = {
            nombre: formData.get('nombre'),
            completado: formData.get('completado') === 'on', // Convierte a booleano
        };

        axios.post('http://localhost:8080/tareas', values)
            .then(() => {
                cargarTareas(); // Refresca la lista de tareas
                form.current.reset(); // Reinicia el formulario
            })
            .catch((error) => console.error("Error al agregar tarea:", error)); // Manejo de errores

        if (parentOnSubmit) parentOnSubmit(values); // Llama al callback si se proporciona
    };

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
                    required // Valida que no esté vacío
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