import axios from "axios";

async function consultaEspecialidades(){
    return await axios.get('http://localhost:3500/api/especialidades')
};

export { consultaEspecialidades,}