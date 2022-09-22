import React, { Component } from 'react';
import axios from "axios";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from 'reactstrap';
import { CSVLink } from 'react-csv';


class TableAfirmativa extends Component {
    state={
        data:[],
        modalInsertar: false,
        modalEliminar: false,
        form:{
            id: "",
            pregunta_1: "",
            pregunta_2: "",
            pregunta_3: "",
            pregunta_4: ""
        }
    }

    peticionGet=()=>{
        axios.get('http://localhost:3000/api/encuesta/view_preguntas').then(response=>{
            this.setState({data: response.data});
        }).catch(error=>{
            console.log(error.message);
        })
    }

    peticionPost=async()=>{
        delete this.state.form.id;
        await axios.post("http://localhost:3000/api/encuesta/create_preguntas?",this.state.form).then(response=>{
             window.location.replace("/home");

            this.peticionGet();
        }).catch(error=>{
            console.log(error.message);
        })
    }

    peticionPut=()=>{
        axios.put("http://localhost:3000/api/encuesta/update_preguntas?"+this.state.form.id, this.state.form).then(response=>{

            this.modalInsertar();
            this.peticionGet();
        })
    }


    peticionDelete=(id)=>{

        axios.delete(`http://localhost:3000/api/encuesta/delete_preguntas?id=${id}`, {
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
                pregunta_1: empresa.pregunta_1,
                pregunta_2: empresa.pregunta_2,
                pregunta_3: empresa.pregunta_3,
                pregunta_4: empresa.pregunta_4
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
        const { data } = this.state;
        return (
          <div className="App">
            <br />
            <br />
            <br />

            <br />
            <br />
            <CSVLink data={data} filename={"tablaAfirmativa.csv"}>
              <button className="btn btn-success ">Exportar CSV</button>
            </CSVLink>
            <table className="table ">
              <thead>
                <tr className="tr-back">
                  <td className="white">
                    Establece días y horarios fijos para encontrarse con sus
                    tutorados
                  </td>
                  <td className="white">
                    El alumno acude para pedirle una tutoría cuando sea
                    necesario
                  </td>
                  <td className="white">
                    Se comunica con los alumnos a través del correo electrónico
                  </td>
                  <td className="white">
                    si utiliza algún otro sistema, descríbalo por favor.
                  </td>
                  <td className="bg-primary">Accion</td>
                </tr>
                <tr className="tr-back">
                  <td className="white">
                    <input
                      className="from-input"
                      onChange={this.handleChange}
                      id="pregunta_1"
                      name="pregunta_1"
                      type="tex"
                    />
                  </td>
                  <td className="white">
                    <input
                      className="from-input"
                      type="tex"
                      onChange={this.handleChange}
                      id="pregunta_2"
                      name="pregunta_2"
                    />
                  </td>
                  <td className="white">
                    <input
                      className="from-input"
                      type="tex"
                      onChange={this.handleChange}
                      id="pregunta_3"
                      name="pregunta_3"
                    />
                  </td>
                  <td className="white">
                    <input
                      className="from-input"
                      type="tex"
                      onChange={this.handleChange}
                      id="pregunta_4"
                      name="pregunta_4"
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
                      <td className="tr-back">{empresa.pregunta_1}</td>
                      <td className="tr-back">{empresa.pregunta_2}</td>
                      <td className="tr-back">{empresa.pregunta_3}</td>
                      <td className="tr-back">{empresa.pregunta_4}</td>
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
                    <div className="form-group">
                      <div>
                        <ModalHeader className="text-primary">
                          Establece días y horarios fijos para encontrarse con
                          sus tutorados
                        </ModalHeader>
                        <input
                          type="text"
                          className="form-control"
                          i
                          name="pregunta_1"
                          id="pregunta_1"
                          onChange={this.handleChange}
                          value={form ? form.pregunta_1 : ""}
                          required
                        ></input>
                        <ModalHeader className="text-primary">
                          El alumno acude para pedirle una tutoría cuando sea
                          necesario
                        </ModalHeader>
                        <input
                          type="text"
                          className="form-control"
                          i
                          name="pregunta_2"
                          id="pregunta_2"
                          onChange={this.handleChange}
                          value={form ? form.pregunta_2 : ""}
                          required
                        ></input>
                      </div>
                      <ModalHeader className="text-primary">
                        Se comunica con los alumnos a través del correo
                        electrónico
                      </ModalHeader>
                      <input
                        type="text"
                        className="form-control"
                        i
                        name="pregunta_3"
                        id="pregunta_3"
                        onChange={this.handleChange}
                        value={form ? form.pregunta_3 : ""}
                        required
                      ></input>
                      <ModalHeader className="text-primary">
                        si utiliza algún otro sistema, descríbalo por favor.
                      </ModalHeader>
                      <input
                        type="text"
                        className="form-control"
                        i
                        name="pregunta_4"
                        id="pregunta_4"
                        onChange={this.handleChange}
                        value={form ? form.pregunta_4 : ""}
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
export default TableAfirmativa;