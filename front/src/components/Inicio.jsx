import React from 'react';
import './styles.css';

function Inicio() {
  return (
    <div className="container tablainicio">
      <h1>Veterinaria</h1>
      <hr />
      <div
        className="mt-4 p-5 rounded"
        style={{ backgroundColor: 'lightgray' }}
      >
        <h3>TPI</h3>
        <div>
          <h4>Veterinaria 2024:</h4>
          <p>Este TPI está desarrollado con las siguientes tecnologías:</p>
          <p>Backend: NodeJs, Express, WebApiRest, Swagger, Sequelize, Sqlite múltiples capas en Javascript.</p>
          <p>Frontend: Single Page Application, HTML, CSS, Bootstrap, NodeJs, Javascript y React.</p>
        </div>
        <table className="table table-striped square border border-3 border-dark text-center mt-2 mb-2">
  <thead>
    <tr className="bg-dark">
      <th colSpan={2}>
        <h3 className="text-light">Desarrollado por</h3>
      </th>
    </tr>
    <tr className="bg-dark bg-opacity-75">
      <th className="text-light w-25">Legajo</th>
      <th className="text-light w-50">Nombre Completo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="p-2">84108</td>
      <td className="p-2">Saavedra Fabiola Emilce</td>
    </tr>
   
  </tbody>
</table>

      </div>
    </div>
  );
}

export { Inicio };
