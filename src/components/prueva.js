import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url="http://localhost:3000/api/tutorados/create_dataT?";
const url1="http://localhost:3000/api/tutorados/update_dataT?";
const url2="http://localhost:3000/api/reporte/delete?";

class DatoEScolar extends Component {
    state={
        data:[],
        modalInsertar: false,
        modalEliminar: false,
        form:{
            id: '',
            periodoEscolar: '',
            cuatrimestre: '',
            grupo: '',
            hombresTA: '',
            mujeresTA: '',
            hombresAtendidos: '',
            mujeresAtendidos: '',
            resuelto: '',
            canalizacion: '',
            casosTutor: '',
            casosCanaliacion: ''
        }
    }

    peticionGet=()=>{
        axios.get('http://localhost:3000/api/tutorados/view_dataT').then(response=>{
            this.setState({data: response.data});
        }).catch(error=>{
            console.log(error.message);
        })
    }

    peticionPost=async()=>{
        delete this.state.form.id;
        await axios.post(url,this.state.form).then(response=>{
            this.modalInsertar();
            this.peticionGet();
        }).catch(error=>{
            console.log(error.message);
        })
    }

    peticionPut=()=>{
        axios.put(url1+this.state.form.id, this.state.form).then(response=>{

            this.modalInsertar();
            this.peticionGet();
        })
    }


    peticionDelete=(id)=>{

        axios.delete(`http://localhost:3000/api/tutorados/delete_dataT?id=${id}`, {
            data: this.state.form,
        })
            .then(response=>{
                this.setState({modalEliminar: false});
                this.peticionGet();

                console.log(response)

            })
            .catch(err =>{
                console.log(err)
                console.log(`http://localhost:3000/api/reporte/delete?id=${id}`)

            } )
    }


    modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar});
    }

    seleccionarEmpresa=(empresa)=>{
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: empresa.id,
                cubiculo: empresa.cubiculo,
                numeroAula: empresa.numeroAula,
                energiaElec: empresa.energiaElec,
                infraestructura: empresa.infraestructura
            }
        })
    }

    handleChange=async e=>{
        e.persist();
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    componentDidMount() {
        this.peticionGet();
    }
/*delite*/


    render(){
        const {form}=this.state;
        return (
            <div className="App">
                <br /><br /><br />
                <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Reporte</button>
                <br /><br />
                <table className="table ">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cubiculo</th>
                        <th>Numero de Cubiculo</th>
                        <th>Energia Electrica</th>
                        <th>infraestructura</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map(empresa=>{
                        return(
                            <tr>
                                <td className="tr-back"> { empresa.periodoEscolar } </td>
                                <td className="tr-back"> { empresa.cuatrimestre } </td>
                                <td className="tr-back"> { empresa.grupo } </td>
                                <td className="tr-back"> { empresa.hombresTA } </td>
                                <td className="tr-back"> { empresa.mujeresTA } </td>
                                <td className="tr-back"> { empresa.hombresAtendidos } </td>
                                <td className="tr-back"> { empresa.mujeresAtendidos } </td>
                                <td className="tr-back"> { empresa.resuelto } </td>
                                <td className="tr-back"> { empresa.casosTutor } </td>
                                <td className="tr-back"> { empresa.casosCanaliacion } </td>
                                <td>
                                    <button className="btn btn-primary" onClick={()=>{this.seleccionarEmpresa(empresa); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                                    {"   "}
                                    <button className="btn btn-danger" onClick={()=>{this.seleccionarEmpresa(empresa); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>



                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{display: 'block'}}>
                        <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: ''}/>
                            <br />
                            <label htmlFor="nombre">Cubiculo</label>
                            <input className="form-control" type="text" name="cubiculo" id="cubiculo" onChange={this.handleChange} value={form?form.cubiculo: ''}/>
                            <br />
                            <label htmlFor="nombre">Numero de Cubiculo</label>
                            <input className="form-control" type="text" name="numeroAula" id="numeroAula" onChange={this.handleChange} value={form?form.numeroAula: ''}/>
                            <br />
                            <label htmlFor="energiaElec">Energia Electrica</label>
                            <input className="form-control" type="text" name="energiaElec" id="energiaElec" onChange={this.handleChange} value={form?form.energiaElec:''}/>
                            <br />
                            <label htmlFor="infraestructura">Infraestructura</label>
                            <input className="form-control" type="text" name="infraestructura" id="infraestructura" onChange={this.handleChange} value={form?form.infraestructura:''}/>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        {this.state.tipoModal=='insertar'?
                            <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                                Insertar
                            </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                                Actualizar
                            </button>
                        }
                        <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        Estás seguro que deseas eliminar a la empresa {form && form.id}
                        <label htmlFor="id">ID</label>
                        <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: ''}/>
                        <br />
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={()=>this.peticionDelete(this.state.form.id)}>Sí</button>
                        <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
                    </ModalFooter>
                </Modal>
            </div>



        );
    }
}
export default DatoEScolar;