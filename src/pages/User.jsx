import "../assets/stylesheets/app.css";
import {Link} from "react-router-dom";
import DatoEScolar from "../components/DatoEScolar";
import TableAfirmativa from "../components/TableAfirmativa";
import TableTutorados from "../components/TableTutorados";
import Menu from "../components/Menu";



function Login(){

    return (
       <div>
        <div className="container">
            <div className="row">
                <div className="col">
                    <Menu/>
                   
                    <p>SECRETARÍA ACADÉMICA</p>
                    <p>PROGRAMA INSTITUCIONAL DE TUTORÍAS</p>
                    <p>REPORTE DE LABOR TUTORIAL MAYO -AGOSTO 2022</p>
                    <div className="container1">
                        <label  className="">Nombre del tutor: . </label>
                        <input  type="tex" className="input-from" />
                        <label  className="">Programa Académico:</label>
                        <input  type="tex" className="input-from" />

                    </div>
                    <div className="table1">
                    <  DatoEScolar />
                    </div>
                    <div className="table1">
                        < TableAfirmativa />
                    </div>

                    <div className="table2">
                        < TableTutorados />
                    </div>

                    <div className="controls" >

                        <textarea id="comentarios" rows="5" cols="30"></textarea><br/>
                        <label  className="">Nombre del tutor: . </label>


                    </div><br/>
                    <p>COMENTARIOS ADICIONALES:</p>
                    <div className="controls1" >

                        <textarea id="comentarios" rows="5" cols="30"></textarea><br/>
                        <label  className="">Nombre y firma del Coordinador de Tutorías </label>


                    </div>

                </div>
                </div>
                </div>
       </div>
    );
}

export default Login;