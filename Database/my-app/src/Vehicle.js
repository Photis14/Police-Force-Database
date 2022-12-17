import React, { Component } from "react";
import { variables } from "./Variables.js";

export class Vehicle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehicles: [],
      modalTitle: "",
      VehicleId: 0,
      PlateNumber: "",
      Make: "",
      Model: "",
      Year: "",
      DatePurchased: "",
      Assignment: "",

      VehicleIdFilter: "",
      PlateFilter: "",
      vehiclesWithoutFilter: []
    };
  }

  FilterFn() {
    var VehicleIdFilter = this.state.VehicleIdFilter;
    var PlateFilter = this.state.PlateFilter;

    var filteredData = this.state.vehiclesWithoutFilter.filter(
      function (el) {
        return el.VehicleId.toString().toLowerCase().includes(
          VehicleIdFilter.toString().trim().toLowerCase()
        ) &&
          el.PlateNumber.toString().toLowerCase().includes(
            PlateFilter.toString().trim().toLowerCase()
          )
      }
    );

    this.setState({ vehicles: filteredData });

  }

  sortResult(prop, asc) {
    var sortedData = this.state.vehiclesWithoutFilter.sort(function (a, b) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      }
      else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });

    this.setState({ vehicles: sortedData });
  }

  changeVehicleIdFilter = (e) => {
    this.state.VehicleIdFilter = e.target.value;
    this.FilterFn();
  }
  changePlateFilter = (e) => {
    this.state.PlateFilter = e.target.value;
    this.FilterFn();
  }

  refreshList() {
    fetch(variables.API_URL + "vehicle")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ vehicles: data, vehiclesWithoutFilter: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changePlateNumber = (e) => {
    this.setState({ PlateNumber: e.target.value });
  };
  changeMake = (e) => {
    this.setState({ Make: e.target.value });
  };
  changeModel = (e) => {
    this.setState({ Model: e.target.value });
  };
  changeYear = (e) => {
    this.setState({ Year: e.target.value });
  };
  changeDatePurchased = (e) => {
    this.setState({ DatePurchased: e.target.value });
  };
  changeAssignment = (e) => {
    this.setState({ Assignment: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: "Add Vehicle",
      VehicleId: 0,
      PlateNumber: "",
      Make: "",
      Model: "",
      Year: "",
      DatePurchased: "",
      Assignment: ""
    });
  }
  editClick(emp) {
    this.setState({
      modalTitle: "Edit Vehicle",
      VehicleId: emp.VehicleId,
      PlateNumber: emp.PlateNumber,
      Make: emp.Make,
      Model: emp.Model,
      Year: emp.Year,
      DatePurchased: emp.DatePurchased,
      Assignment: emp.Assignment
    });
  }

  createClick() {
    fetch(variables.API_URL + "vehicle", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        PlateNumber: this.state.PlateNumber,
        Make: this.state.Make,
        Model: this.state.Model,
        Year: this.state.Year,
        DatePurchased: this.state.DatePurchased,
        Assignment: this.state.Assignment
      })
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  updateClick() {
    fetch(variables.API_URL + "vehicle", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        VehicleId: this.state.VehicleId,
        PlateNumber: this.state.PlateNumber,
        Make: this.state.Make,
        Model: this.state.Model,
        Year: this.state.Year,
        DatePurchased: this.state.DatePurchased,
        Assignment: this.state.Assignment
      })
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  deleteClick(id) {
    if (window.confirm("Are you sure?")) {
      fetch(variables.API_URL + "vehicle/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }

  imageUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    fetch(variables.API_URL + "vehicle/savefile", {
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ PhotoFileName: data });
      });
  };

  render() {
    const {
      vehicles,
      modalTitle,
      VehicleId,
      PlateNumber,
      Make,
      Model,
      Year,
      DatePurchased,
      Assignment
    } = this.state;

    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}>
          Add Vehicle
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <div className="d-flex flex-row">


                  <input className="form-control m-2"
                    onChange={this.changeVehicleIdFilter}
                    placeholder="Filter" />

                  <button type="button" className="btn btn-light"
                    onClick={() => this.sortResult('VehicleId', true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>

                  <button type="button" className="btn btn-light"
                    onClick={() => this.sortResult('VehicleId', false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                      <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                    </svg>
                  </button>

                </div>
                Vehicle ID</th>
              <th>
                <div className="d-flex flex-row">
                  <input className="form-control m-2"
                    onChange={this.changePlateFilter}
                    placeholder="Filter" />

                  <button type="button" className="btn btn-light"
                    onClick={() => this.sortResult('PlateNumber', true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>

                  <button type="button" className="btn btn-light"
                    onClick={() => this.sortResult('PlateNumber', false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                      <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                    </svg>
                  </button>
                </div>
                Plate Number</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Date Purchased</th>
              <th>Assignment</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((emp) => (
              <tr key={emp.VehicleId}>
                <td>{emp.VehicleId}</td>
                <td>{emp.PlateNumber}</td>
                <td>{emp.Make}</td>
                <td>{emp.Model}</td>
                <td>{emp.Year}</td>
                <td>{emp.DatePurchased}</td>
                <td>{emp.Assignment}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(emp)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(emp.VehicleId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
                  <div className="p-2 w-50 bd-highlight">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Plate Number</span>
                      <input
                        type="text"
                        className="form-control"
                        value={PlateNumber}
                        onChange={this.changePlateNumber}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Make</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Make}
                        onChange={this.changeMake}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Model</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Model}
                        onChange={this.changeModel}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Year</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Year}
                        onChange={this.changeYear}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Date Purchased</span>
                      <input
                        type="date"
                        className="form-control"
                        value={DatePurchased}
                        onChange={this.changeDatePurchased}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Assignment</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Assignment}
                        onChange={this.changeAssignment}
                      />
                    </div>
                  </div>
                </div>

                {VehicleId == 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Create
                  </button>
                ) : null}

                {VehicleId != 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.updateClick()}
                  >
                    Update
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
