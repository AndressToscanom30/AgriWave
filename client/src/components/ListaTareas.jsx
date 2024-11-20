const ListaTareas = ({ tareas }) => {
    return (
        <div>
            <h1 className="mb-3">Lista de tareas</h1>
            {tareas.length > 0 ? (
                tareas.map((tarea) => (
                    <div className="mb-3 border rounded p-3" key={tarea.id}>
                        <p>{tarea.nombre}</p>
                        {tarea.completado ? (
                            <div>Completado</div>
                        ) : (
                            <div>Pendiente</div>
                        )}
                    </div>
                ))
            ) : (
                <p>No hay tareas disponibles</p> // Mensaje cuando no hay tareas
            )}
        </div>
    );
};

export default ListaTareas;
