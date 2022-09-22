import React, { Component } from 'react';
import axios from "axios";
import Menu from '../components/Menu';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from 'reactstrap';
import { CSVLink } from 'react-csv';


class Atencion extends Component {
    state={
        data:[],
        modalInsertar: false,
        modalEliminar: false,
        form:{
            id: "",
            matricula: "",
            apellidoP: "",
            apellidoM: "",
            nombres: "",
            sexo: ""
        }
    }

    peticionGet=()=>{
        axios.get('http://localhost:3000/api/alumnos/view_estudiantes').then(response=>{
            this.setState({data: response.data});
        }).catch(error=>{
            console.log(error.message);
        })
    }

    peticionPost=async()=>{
        delete this.state.form.id;
        await axios.post("http://localhost:3000/api/alumnos/create_estudiantes?",this.state.form).then(response=>{

            this.peticionGet();
             window.location.replace("/Atencion");

        }).catch(error=>{
            console.log(error.message);
        })
    }

    peticionPut=()=>{
        axios.put("http://localhost:3000/api/alumnos/update_estudiantes?"+this.state.form.id, this.state.form).then(response=>{

            this.modalInsertar();
            this.peticionGet();
        })
    }


    peticionDelete=(id)=>{

        axios.delete(`http://localhost:3000/api/alumnos/delete_estudiantes?id=${id}`, {
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
                matricula: empresa.matricula,
                apellidoP: empresa.apellidoP,
                apellidoM: empresa.apellidoM,
                nombres: empresa.nombres,
                sexo: empresa.sexo
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
            <Menu />
            <CSVLink data={data} filename={"tablaAtencion.csv"}>
              <button className="btn btn-success ">Exportar CSV</button>
            </CSVLink>
            <table className="table ">
              <thead>
                <tr>
                  <td className="bg-primary">Matricula</td>
                  <th className="table-secondary">Apellido Paterno</th>
                  <th className="bg-success">Apellido Materno</th>
                  <th className="bg-danger">Nombre</th>
                  <th className="table-secondary">sexo</th>
                  <th className="table-secondary">opciones</th>
                </tr>

                <tr className="tr-back">
                  <td>
                    <input
                      type="tex"
                      name="matricula"
                      id="matricula"
                      className="from-input"
                      onChange={this.handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="apellidoP"
                      id="apellidoP"
                      type="tex"
                      className="from-input"
                      onChange={this.handleChange}
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      name="apellidoM"
                      id="apellidoM"
                      type="tex"
                      className="from-input"
                      onChange={this.handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="nombres"
                      id="nombres"
                      type="tex"
                      className="from-input"
                      onChange={this.handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="sexo"
                      id="sexo"
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
                      <td className="tr-back">{empresa.matricula}</td>
                      <td className="tr-back">{empresa.apellidoP}</td>
                      <td className="tr-back">{empresa.apellidoM}</td>
                      <td className="tr-back">{empresa.nombres}</td>
                      <td className="tr-back">{empresa.sexo}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            this.seleccionarEmpresa(empresa);
                            this.modalInsertar();
                          }}
                        >
                          actualizar
                        </button>
                        {"   "}
                        <button
                          className="btn btn-outline-danger"
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
                          Matricula
                        </ModalHeader>
                        <input
                          type="text"
                          className="form-control"
                          i
                          name="matricula"
                          id="matricula"
                          onChange={this.handleChange}
                          value={form ? form.matricula : ""}
                          required
                        ></input>
                        <ModalHeader className="text-primary">
                          apellido paderno
                        </ModalHeader>
                        <input
                          type="text"
                          className="form-control"
                          i
                          name="apellidoP"
                          id="apellidoP"
                          onChange={this.handleChange}
                          value={form ? form.apellidoP : ""}
                          required
                        ></input>
                      </div>
                      <ModalHeader className="text-primary">
                        Apellido Materno
                      </ModalHeader>
                      <input
                        type="text"
                        className="form-control"
                        i
                        name="apellidoM"
                        id="apellidoM"
                        onChange={this.handleChange}
                        value={form ? form.apellidoM : ""}
                        required
                      ></input>
                      <ModalHeader className="text-primary">Nombre</ModalHeader>
                      <input
                        type="text"
                        className="form-control"
                        i
                        name="nombres"
                        id="nombres"
                        onChange={this.handleChange}
                        value={form ? form.nombres : ""}
                        required
                      ></input>
                      <ModalHeader className="text-primary">Sexo</ModalHeader>
                      <input
                        type="text"
                        className="form-control"
                        i
                        name="sexo"
                        id="sexo"
                        onChange={this.handleChange}
                        value={form ? form.sexo : ""}
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
export default Atencion;