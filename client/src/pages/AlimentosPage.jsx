import { useEffect, useState } from 'react'

const AlimentosPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/alimentos')
        if (!response.ok) {
          throw new Error('Error al obtener los datos del servidor')
        }
        const result = await response.json()
        setData(result)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="p-4">Cargando datos...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Datos de Alimentos</h1>
      {data.length === 0 ? (
        <div>No hay datos disponibles</div>
      ) : (
        <ul className="space-y-4">
          {data.map((item, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded shadow">
              <p><strong>Nombre:</strong> {item.nombre}</p>
              <p><strong>Costo:</strong> {item.costo}</p>
              <p><strong>Descripción:</strong> {item.descripcion}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlimentosPage;
