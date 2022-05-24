import Swal from "sweetalert2"
import React from 'react'

var servers = ['http://localhost:3001/categoria', 'http://localhost:3001/categoria']


const leer = async () => {
  const datos = fetch(servers[0])
    .then(res => res.json())
    .then(datos => {
      return datos
    })
    .catch(err => {
      if (err) {
        servers = [servers[1], servers[0]]
        return leer()
      }
    })
  return datos

}

const agregar = (params) => {
  fetch(servers[0], params)
    .then(res => res.json())
    .then(response => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Agregado Correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .catch(err => {
      if (err) {
        servers = [servers[1], servers[0]]
        agregar(params)
      };
    })
}



function App() {
  const [lista, setLista] = React.useState();
  const [categoria, setCategoria] = React.useState();


  const obtenerDatos = () => {
    leer().then((datos) => {
      setLista(datos.reverse())
    })
  }

  const agregarNuevo = (e) => {
    e.preventDefault();

    const obj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ descripcion_categoria: categoria })
    }
    setCategoria('')
    agregar(obj);
    obtenerDatos();
  }


  



  return (
    <div className="d-flex flex-column  align-items-center" >
      <button className="btn btn-secondary m-2 col-10 " onClick={obtenerDatos}>Recargar</button>
      <div className="container d-flex justify-content-center ">
        
        <table className="table table-striped bg-light m-2">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Categoria</th>
              <th scope="col">Estatus</th>
            </tr>
          </thead>
          <tbody>
            {!lista ? null : lista.map((datos) => {
              return (<tr>
                <th scope="row">{datos.idCategoria}</th>
                <td>{datos.descripcion_categoria}</td>
                <td>{datos.status_categoria}</td>
              </tr>)
            })}
          </tbody>
        </table>
        <form className='formulario ml-2' onSubmit={agregarNuevo} >
          <h2 className='text-light ' >Categoria Nueva</h2>
          <input type="text" className="form-control" value={categoria} onChange={e => setCategoria(e.target.value)} />
          <button type="submit" className="btn btn-primary mt-2" >Agregar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
