import axios from "axios";

async function alta(data){
    return await axios.post('http://localhost:3500/api/veterinarios', data)
};

async function baja(legajo){
    const res = await axios.delete('http://localhost:3500/api/veterinarios/'+legajo)
    return res.status === 200
};

async function modificacion(data){
    try{
        const res = await axios.put('http://localhost:3500/api/veterinarios/'+ data.legajo, data)
        return res.data
    } catch(error){
        console.error(error);
    }
};

async function consulta(data){
    return await axios.get('http://localhost:3500/api/veterinarios', {
        params: data,
    });
};


async function buscarVeterinariosPorNombre(nombre) {
    try {
        const res = await axios.get('http://localhost:3500/api/veterinarios/search', {
            params: { nombre } // Aquí pasas el nombre como parámetro de consulta
        });
        return res.data; // Devuelve los resultados encontrados
    } catch (error) {
        console.error("Error al buscar veterinarios:", error);
        throw error; // Opcional: re-lanza el error para que pueda ser manejado en la parte del componente
    }
}

export { alta, baja, modificacion, consulta, buscarVeterinariosPorNombre }
