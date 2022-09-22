import React, { Component } from 'react';
import axios from "axios";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from 'reactstrap';
import { CSVLink } from 'react-csv';


class DatoEScolar extends Component {
    state={
        data:[],
        modalInsertar: false,
        modalEliminar: false,
        form:{
            id : "",
            periodoEscolar: "",
            cuatrimestre: "",
            grupo: "",
            hombresTA: "",
            mujeresTA: "",
            hombresAtendidos: "",
            mujeresAtendidos: "",
            resuelto: "",
            canalizacion: "",
            casosTutor: "",
            casosCanaliacion: ""
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
        await axios.post("http://localhost:3000/api/tutorados/create_dataT?",this.state.form).then(response=>{

            this.peticionGet();
         window.location.replace("/home");

        }).catch(error=>{
            console.log(error.message);
        })
    }

    peticionPut=()=>{
        axios.put("http://localhost:3000/api/tutorados/update_dataT?"+this.state.form.id, this.state.form).then(response=>{

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
                periodoEscolar: empresa.periodoEscolar,
                cuatrimestre: empresa.cuatrimestre,
                grupo: empresa.grupo,
                hombresTA: empresa.hombresTA,
                mujeresTA: empresa.mujeresTA,
                hombresAtendidos: empresa.hombresAtendidos,
                mujeresAtendidos: empresa.mujeresAtendidos,
                resuelto: empresa.resuelto,
                canalizacion: empresa.canalizacion,
                casosTutor: empresa.casosTutor,
                casosCanaliacion: empresa.casosCanaliacion

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


    render(){
        const {form}=this.state;
        const {data}=this.state;
        return (
          <div className="App">
            <br />
            <br />
            <br />

            <br />
            <br />
            <CSVLink data={data} filename={"tablaDatosEscolares.csv"}>
              <button className="btn btn-success ">Exportar CSV</button>
            </CSVLink>
            <table className="table ">
              <thead>
                <tr>
                  <td className="bg-primary" rowSpan="2">
                    Periodo escolar
                  </td>
                  <th colSpan="2" className="table-secondary">
                    Tutorados
                  </th>
                  <th colSpan="2" className="bg-success">
                    # de tutorados asignados
                  </th>
                  <th rowSpan="2" className="bg-danger">
                    hombres Atendidos
                  </th>
                  <th rowSpan="2" className="bg-danger">
                    mujeres Atendidos
                  </th>
                  <th colSpan="2" className="table-secondary">
                    {" "}
                    # de casos atendidos y resueltos
                  </th>
                  <th colSpan="2" className="table-secondary">
                    {" "}
                    # de casos atendidos en seguimiento
                  </th>
                  <td className="bg-primary" rowSpan="2">
                    Accion
                  </td>
                </tr>
                <tr>
                  <td scope="col" className="bg-info">
                    Cuatrimestre
                  </td>
                  <td scope="col" className="bg-info">
                    Grupo
                  </td>
                  <td scope="col" className="bg-info">
                    Hombres
                  </td>
                  <td scope="col" className="table-success">
                    Mujeres
                  </td>
                  <td scope="col" className="table-success">
                    Necesitó canalización
                  </td>
                  <td scope="col" className="table-success">
                    Resuelto por el tutor
                  </td>
                  <td scope="col" className="table-success">
                    Por el tutor
                  </td>
                  <td scope="col" className="table-success">
                    Canalizados
                  </td>
                </tr>

                <tr className="tr-back">
                  <td>
                    <input
                      type="tex"
                      name="periodoEscolar"
                      id="periodoEscolar"
                      className="from-input"
                      onChange={this.handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="cuatrimestre"
                      id="cuatrimestre"
                      type="tex"
                      className="from-input"
                      onChange={this.handleChange}
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      name="grupo"
                      id="grupo"
                      type="tex"
                      className="from-input"
                      onChange={this.handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="hombresTA"
                      id="hombresTA"
                      type="tex"
                      className="from-input"
                      onChange={this.handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="mujeresTA"
                      id="mujeresTA"
                      className="from-input"
                      onChange={this.handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="hombresAtendidos"
                      id="hombresAtendidos"
                      className="from-input"
                      onChange={this.handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="mujeresAtendidos"
                      id="mujeresAtendidos"
                      className="from-input"
                      onChange={this.handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="resuelto"
                      id="resuelto"
                      className="from-input"
                      onChange={this.handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="canalizacion"
                      id="canalizacion"
                      className="from-input"
                      onChange={this.handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="casosTutor"
                      id="casosTutor"
                      className="from-input"
                      onChange={this.handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="casosCanaliacion"
                      id="casosCanaliacion"
                      className="from-input"
                      onChange={this.handleChange}
                    />
                  </td>
                  <td className="white2">
                    <button
                      className="Button"
                      onClick={() => this.peticionPost()}
                    >
                      Agregar
                    </button>
                  </td>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((empresa) => {
                  return (
                    <tr className="tr-back">
                      <td className="tr-back">{empresa.periodoEscolar}</td>
                      <td className="tr-back">{empresa.cuatrimestre}</td>
                      <td className="tr-back">{empresa.grupo}</td>
                      <td className="tr-back">{empresa.hombresTA}</td>
                      <td className="tr-back">{empresa.mujeresTA}</td>
                      <td className="tr-back">{empresa.hombresAtendidos}</td>
                      <td className="tr-back">{empresa.mujeresAtendidos}</td>
                      <td className="tr-back">{empresa.resuelto}</td>
                      <td className="tr-back">{empresa.canalizacion}</td>
                      <td className="tr-back">{empresa.casosTutor}</td>
                      <td className="tr-back">{empresa.casosCanaliacion}</td>
                      <td>
                        <button
                          className="Button"
                          onClick={() => {
                            this.seleccionarEmpresa(empresa);
                            this.modalInsertar();
                          }}
                        >
                          actualizar
                        </button>
                        {"   "}
                        <button
                          className="Button"
                          onClick={() => {
                            this.seleccionarEmpresa(empresa);
                            this.setState({ modalEliminar: true });
                          }}
                        >
                          eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <Modal isOpen={this.state.modalInsertar}>
              <ModalHeader className="text-primary">Agregar</ModalHeader>
              <ModalBody>
                <form className="was-validated" noValidate>
                  <FormGroup>
                    <div>
                      <Label for="price">Periodo Escolar</Label>
                      <input
                        type="text"
                        className="form-control"
                        i
                        name="periodoEscolar"
                        id="periodoEscolar"
                        onChange={this.handleChange}
                        value={form ? form.periodoEscolar : ""}
                        required
                      ></input>
                    </div>
                    <ModalHeader className="text-primary">
                      Tutorados
                    </ModalHeader>
                    <div>
                      <Label>Cuatrimestres</Label>
                      <input
                        type="text"
                        className="form-control"
                        i
                        name="cuatrimestre"
                        id="cuatrimestre"
                        onChange={this.handleChange}
                        value={form ? form.cuatrimestre : ""}
                        required
                      ></input>
                    </div>
                    <div>
                      <Label>grupo</Label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.handleChange}
                        value={form ? form.grupo : ""}
                        i
                        name="grupo"
                        id="grupo"
                        required
                      ></input>
                    </div>
                    <ModalHeader className="text-primary">
                      Tutorados
                    </ModalHeader>
                    <div>
                      <Label>Numero de hombre</Label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={this.handleChange}
                        value={form ? form.hombresTA : ""}
                        i
                        name="hombresTA"
                        id="hombresTA"
                        required
                      ></input>
                    </div>
                    <div>
                      <Label>Número de Mujeres </Label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={this.handleChange}
                        value={form ? form.mujeresTA : ""}
                        id="mujeresTA"
                        name="mujeresTA"
                        required
                      ></input>
                    </div>
                    <div>
                      <ModalHeader className="text-primary">
                        Total de horas dedicadas a la tutoría en el cuatrimestre
                      </ModalHeader>
                      <Label>hombres Atendidos</Label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={this.handleChange}
                        value={form ? form.hombresAtendidos : ""}
                        id="hombresAtendidos"
                        i
                        name="hombresAtendidos"
                        required
                      ></input>
                      <Label>Mujeres Atendidos</Label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={this.handleChange}
                        value={form ? form.mujeresAtendidos : ""}
                        id="mujeresAtendidos"
                        name="mujeresAtendidos"
                        required
                      ></input>
                    </div>
                    <ModalHeader className="text-primary">
                      # de casos atendidos y resueltos
                    </ModalHeader>
                    <div>
                      <Label>Necesitó canalización</Label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.handleChange}
                        value={form ? form.resuelto : ""}
                        id="resuelto"
                        name="resuelto"
                        required
                      ></input>
                    </div>
                    <div>
                      <Label>Resuelto por el tutor</Label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.handleChange}
                        value={form ? form.canalizacion : ""}
                        id="canalizacion"
                        name="canalizacion"
                        required
                      ></input>
                    </div>
                    <ModalHeader className="text-primary">
                      # de casos atendidos en seguimiento
                    </ModalHeader>

                    <div>
                      <Label>Por el tutor</Label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.handleChange}
                        value={form ? form.casosTutor : ""}
                        id="casosTutor"
                        name="casosTutor"
                        required
                      ></input>
                    </div>
                    <div>
                      <Label>Canalizados</Label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.handleChange}
                        value={form ? form.casosCanaliacion : ""}
                        id="casosCanaliacion"
                        name="casosCanaliacion"
                        required
                      ></input>
                    </div>
                  </FormGroup>
                </form>
              </ModalBody>

              <ModalFooter>
                <button
                  className="btn btn-primary"
                  onClick={() => this.peticionPut()}
                >
                  Actualizar
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => this.modalInsertar()}
                >
                  Cancelar
                </button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modalEliminar}>
              <ModalBody>
                <label htmlFor="id">ID</label>
                <input
                  className="form-control"
                  type="text"
                  name="id"
                  id="id"
                  readOnly
                  onChange={this.handleChange}
                  value={form ? form.id : ""}
                />
                <br />
              </ModalBody>
              <ModalFooter>
                <button
                  className="btn btn-danger"
                  onClick={() => this.peticionDelete(this.state.form.id)}
                >
                  Sí
                </button>
                <button
                  className="btn btn-secundary"
                  onClick={() => this.setState({ modalEliminar: false })}
                >
                  No
                </button>
              </ModalFooter>
            </Modal>
          </div>
        );
    }
}
export default DatoEScolar;