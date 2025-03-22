import React, { useState } from "react";

export default function FilaVeterinario({ lista, borrar, abrirVentanaModificacion }) {  
    const { legajo, nombre, matricula, fechaRegistro, celular, especialidad } = lista;   
    const [activo, setActivo] = useState(lista.activo); // Estado de activación inicial

    // Función para manejar el cambio de estado activo/inactivo
    const toggleActivo = () => {
        // Cambia el estado y llama a la función de borrar si es necesario
        if (activo) {
            borrar(legajo);
            alert(`El Legajo ${legajo} ha sido desactivado con éxito`);
        } else {
            alert(`El Legajo ${legajo} ha sido activado con éxito`);
        }
        setActivo(!activo); // Alterna el estado activo/inactivo
    };

    return (  
        <>
            <tr className="text-center" key={legajo}>
                <td className="align-middle">{legajo}</td>
                <td className="align-middle">{nombre}</td>
                <td className="align-middle">{matricula}</td>
                <td className="align-middle">{new Date(fechaRegistro).toISOString().split('T')[0]}</td>
                <td className="align-middle">{celular}</td>
                <td className="align-middle">{activo ? "Activo" : "Inactivo"}</td>
                <td className="align-middle">{especialidad}</td>
                <td className="align-middle">
                    <div className="btn-group btn-group-sm">
                        <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => abrirVentanaModificacion(lista)}
                            title="Modificar"
                        >
                            ✏️
                        </button>
                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={toggleActivo}
                            title={activo ? "Desactivar" : "Activar"}
                        >
                            {activo ? "❌" : "✔️"}
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );  
};
