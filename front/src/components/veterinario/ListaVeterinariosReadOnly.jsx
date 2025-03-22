import React, { useState, useEffect } from 'react';
import { consulta } from '../../service/Veterinarios.Services';

const ListaVeterinariosReadOnly = () => {
    const [veterinarios, setVeterinarios] = useState([]);

    useEffect(() => {
        const cargarVeterinarios = async () => {
            try {
                const res = await consulta({});
                setVeterinarios(res.data.filter(vet => vet.activo));
            } catch (error) {
                console.error('Error al cargar veterinarios:', error);
            }
        };
        cargarVeterinarios();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Lista de Veterinarios Activos</h2>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead className="table-primary">
                        <tr>
                            <th>Nombre</th>
                            <th>Matrícula</th>
                            <th>Especialidad</th>
                            <th>Celular</th>
                        </tr>
                    </thead>
                    <tbody>
                        {veterinarios.map(vet => (
                            <tr key={vet.legajo}>
                                <td>{vet.nombre}</td>
                                <td>{vet.matricula}</td>
                                <td>{vet.especialidad}</td>
                                <td>{vet.celular}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListaVeterinariosReadOnly;