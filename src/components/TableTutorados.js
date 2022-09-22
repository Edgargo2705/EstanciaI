import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from 'reactstrap';
import {useState} from "react";

import React, { Component } from 'react';
import axios from "axios";
import { CSVLink } from 'react-csv';




class TableTutorados extends Component {
    state={
        data:[],
        modalInsertar: false,
        modalEliminar: false,
        form:{
            id: "",
            numTR: "",
            numTRiesgo: "",
            numTCO: "",
            numBajaD: "",
            EBTemporal: ""
        }
    }

    peticionGet=()=>{
        axios.get('http://localhost:3000/api/atencion/view_data').then(response=>{
            this.setState({data: response.data});
        }).catch(error=>{
            console.log(error.message);
        })
    }

    peticionPost=async()=>{
        delete this.state.form.id;
        await axios.post("http://localhost:3000/api/atencion/create_data?",this.state.form).then(response=>{
            window.location.replace("/home");

            this.peticionGet();
        }).catch(error=>{
            console.log(error.message);
        })
    }

    peticionPut=()=>{
        axios.put("http://localhost:3000/api/atencion/update_data?"+this.state.form.id, this.state.form).then(response=>{

            this.modalInsertar();
            this.peticionGet();
        })
    }


    peticionDelete=(id)=>{

        axios.delete(`http://localhost:3000/api/atencion/delete_data?id=${id}`, {
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
                numTR: empresa.numTR,
                numTRiesgo: empresa.numTRiesgo,
                numTCO: empresa.numTCO,
                numBajaD: empresa.numBajaD,
                EBTemporal: empresa.EBTemporal
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
        const {data}= this.state;
        return (
          <div className="App">
            <br />
            <br />
            <br />

            <br />
            <br />
            <CSVLink data={data} filename={"tablaTutorados.csv"}>
              <button className="btn btn-success ">Exportar CSV</button>
            </CSVLink>
            <table className="table1">
              <thead>
                <tr className="tr-back">
                  <td className="warning">
                    Número de tutorados detectados como irregular
                  </td>
                  <td className="bg-danger">
                    Número de tutorados detectados en riesgo
                  </td>
                  <td className="bg-success">
                    Número de tutorados canalizados oportunamente
                  </td>
                  <td className="bg-purple">
                    Número de tutorados dados de baja definitiva o academica{" "}
                  </td>
                  <td className="bg-primary">
                    Número de estudiantes con baja temporal{" "}
                  </td>
                  <td className="bg-primary">Accion</td>
                </tr>
                <tr className="tr-back">
                  <td className="white">
                    <input
                      className="from-input"
                      onChange={this.handleChange}
                      id="numTR"
                      name="numTR"
                      type="tex"
                    />
                  </td>
                  <td className="white">
                    <input
                      className="from-input"
                      type="tex"
                      onChange={this.handleChange}
                      id="numTRiesgo"
                      name="numTRiesgo"
                    />
                  </td>
                  <td className="white">
                    <input
                      className="from-input"
                      type="tex"
                      onChange={this.handleChange}
                      id="numTCO"
                      name="numTCO"
                    />
                  </td>
                  <td className="white">
                    <input
                      className="from-input"
                      type="tex"
                      onChange={this.handleChange}
                      id="numBajaD"
                      name="numBajaD"
                    />
                  </td>
                  <td className="white">
                    <input
                      className="from-input"
                      type="tex"
                      onChange={this.handleChange}
                      id="EBTemporal"
                      name="EBTemporal"
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
                      <td className="tr-back">{empresa.numTR}</td>
                      <td className="tr-back">{empresa.numTRiesgo}</td>
                      <td className="tr-back">{empresa.numTCO}</td>
                      <td className="tr-back">{empresa.numBajaD}</td>
                      <td className="tr-back">{empresa.EBTemporal}</td>
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
                          Número de tutorados detectados como irregular
                        </ModalHeader>
                        <input
                          type="text"
                          className="form-control"
                          i
                          name="numTR"
                          id="numTR"
                          onChange={this.handleChange}
                          value={form ? form.numTR : ""}
                          required
                        ></input>
                        <ModalHeader className="text-primary">
                          Número de tutorados detectados en riesgo
                        </ModalHeader>
                        <input
                          type="text"
                          className="form-control"
                          i
                          name="numTRiesgo"
                          id="numTRiesgo"
                          onChange={this.handleChange}
                          value={form ? form.numTRiesgo : ""}
                          required
                        ></input>
                      </div>
                      <ModalHeader className="text-primary">
                        Número de tutorados canalizados oportunamente
                      </ModalHeader>
                      <input
                        type="text"
                        className="form-control"
                        i
                        name="numTCO"
                        id="numTCO"
                        onChange={this.handleChange}
                        value={form ? form.numTCO : ""}
                        required
                      ></input>
                      <ModalHeader className="text-primary">
                        Número de tutorados dados de baja definitiva o
                        academica.
                      </ModalHeader>
                      <input
                        type="text"
                        className="form-control"
                        i
                        name="numBajaD"
                        id="numBajaD"
                        onChange={this.handleChange}
                        value={form ? form.numBajaD : ""}
                        required
                      ></input>
                      <ModalHeader className="text-primary">
                        Número de estudiantes con baja temporal.
                      </ModalHeader>
                      <input
                        type="text"
                        className="form-control"
                        i
                        name="EBTemporal"
                        id="EBTemporal"
                        onChange={this.handleChange}
                        value={form ? form.EBTemporal : ""}
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
export default TableTutorados;