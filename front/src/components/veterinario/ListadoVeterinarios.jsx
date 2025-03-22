import FilaVeterinario from "./FilaVeterinario";

export default function ListadoVeterinarios({ lista, borrar, abrirVentanaModificacion }) {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover table-sm">
                <thead className="table-primary">
                    <tr className="text-center">
                        <th>Legajo</th>
                        <th>Nombre y Apellido</th>
                        <th>Matrícula</th>
                        <th>Fecha Registro</th>
                        <th>Celular</th>
                        <th>Estado</th>
                        <th>Especialidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((veterinario) => (
                        <FilaVeterinario 
                            key={veterinario.legajo}
                            lista={veterinario}
                            borrar={borrar}
                            abrirVentanaModificacion={abrirVentanaModificacion}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}