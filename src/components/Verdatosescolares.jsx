
import React, {useState, useEffect} from "react";
import axios from "axios";
import Swal from 'sweetalert2';

function Verdatosescolares() {
    const [data, setData] = useState([])

    const URL = 'http://localhost:3000/api/tutorados/view_dataT'
    useEffect(() =>{
        axios.get("http://localhost:3000/api/tutorados/view_dataT")
            .then(res =>{
               console.log(res)
            })
            .catch(err =>{
                console.log(err)
            })
    }, [])
    const postDelete = (id,e) =>{
        e.preventDefault();
        axios.delete(`http://localhost:3000/api/tutorados/delete_dataT?id=${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        alert("Dato Eliminado")
    }
    const arr = data.map((data, index)=>{
        return(
            <tr className="tr-back">
                <td>{data.id}</td>
                <td>{data.periodoEscolar}</td>
                <td>{data.cuatrimestre}</td>
                <td>{data.grupo}</td>
                <td>{data.hombresTA}</td>
                <td>{data.mujeresTA}</td>
                <td>{data.hombresAtendidos}</td>
                <td>{data.mujeresAtendidos}</td>
                <td>{data.resuelto}</td>
                <td>{data.canalizacion}</td>
                <td>{data.casosTutor}</td>
                <td>{data.casosCanaliacion}</td>
                <td><button onClick={(e) => postDelete(data.id, e)} type="button" class="btn btn-outline-danger btn-sm">Delete</button></td>
            </tr>

        );
    })
    return(
        <div>

            <table >
                <tr>
                    <td className="bg-primary" rowSpan="2">Periodo escolar</td>
                    <th colSpan="2" className="table-secondary">Tutorados</th>
                    <th colSpan="2" className="bg-success"># de tutorados asignados</th>
                    <th rowSpan="2" className="bg-danger">Total de horas dedicadas a la tutoría en el cuatrimestre</th>
                    <th colSpan="2" className="table-secondary"> # de casos atendidos y resueltos</th>
                    <th colSpan="2" className="table-secondary"> # de casos atendidos en seguimiento</th>
                    <td className="bg-primary" rowSpan="2" >Accion</td>
                </tr>
                <tr>
                    <td scope="col" className="bg-info">Cuatrimestre</td>
                    <td scope="col" className="bg-info">Grupo</td>
                    <td scope="col" className="bg-info">Hombres</td>
                    <td scope="col" className="table-success">Mujeres</td>
                    <td scope="col" className="table-success">Necesitó canalización</td>
                    <td scope="col" className="table-success">Resuelto por el tutor</td>
                    <td scope="col" className="table-success">Por el tutor</td>
                    <td scope="col" className="table-success">Canalizados</td>

                </tr>
                <tbody>
                {arr}
                </tbody>
            </table>
          
            
        </div>
    )
}
export default Verdatosescolares; 