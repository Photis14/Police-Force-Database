import React, { Component } from "react";
import { variables } from "./Variables.js";

export class Log extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: [],
      modalTitle: "",
      LogId: 0,
      MadeBy: "",
      Code: "",
      Type: "",
      DateOccured: "",
      Location: "",
      Time: "",
      Evidence: "",
      Parties: "",
      Action: "",
      Notes: "",

      LogIdFilter: "",
      MadeByFilter: "",
      logssWithoutFilter: []
    };
  }


  FilterFn() {
    var LogIdFilter = this.state.LogIdFilter;
    var MadeByFilter = this.state.MadeByFilter;

    var filteredData = this.state.logssWithoutFilter.filter(
      function (el) {
        return el.LogId.toString().toLowerCase().includes(
          LogIdFilter.toString().trim().toLowerCase()
        ) &&
          el.MadeBy.toString().toLowerCase().includes(
            MadeByFilter.toString().trim().toLowerCase()
          )
      }
    );

    this.setState({ logs: filteredData });

  }

  sortResult(prop, asc) {
    var sortedData = this.state.logssWithoutFilter.sort(function (a, b) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      }
      else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });

    this.setState({ employees: sortedData });
  }

  changeLogIdFilter = (e) => {
    this.state.LogIdFilter = e.target.value;
    this.FilterFn();
  }
  changeMadeByFilter = (e) => {
    this.state.MadeByFilter = e.target.value;
    this.FilterFn();
  }

  refreshList() {
    fetch(variables.API_URL + "log")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ logs: data, logssWithoutFilter: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changeMadeBy = (e) => {
    this.setState({ MadeBy: e.target.value });
  };
  changeCode = (e) => {
    this.setState({ Code: e.target.value });
  };
  changeType = (e) => {
    this.setState({ Type: e.target.value });
  };
  changeDateOccured = (e) => {
    this.setState({ DateOccured: e.target.value });
  };
  changeLocation = (e) => {
    this.setState({ Location: e.target.value });
  };
  changeTime = (e) => {
    this.setState({ Time: e.target.value });
  };
  changeEvidence = (e) => {
    this.setState({ Evidence: e.target.value });
  };
  changeParties = (e) => {
    this.setState({ Parties: e.target.value });
  };
  changeAction = (e) => {
    this.setState({ Action: e.target.value });
  };
  changeNotes = (e) => {
    this.setState({ Notes: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: "Add Log",
      LogId: 0,
      MadeBy: "",
      Code: "",
      Type: "",
      DateOccured: "",
      Location: "",
      Time: "",
      Evidence: "",
      Parties: "",
      Action: "",
      Notes: ""
    });
  }
  editClick(emp) {
    this.setState({
      modalTitle: "Edit Log",
      LogId: emp.LogId,
      MadeBy: emp.MadeBy,
      Code: emp.Code,
      Type: emp.Type,
      DateOccured: emp.DateOccured,
      Location: emp.Location,
      Time: emp.Time,
      Evidence: emp.Evidence,
      Parties: emp.Parties,
      Action: emp.Action,
      Notes: emp.Notes
    });
  }

  createClick() {
    fetch(variables.API_URL + "log", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        MadeBy: this.state.MadeBy,
        Code: this.state.Code,
        Type: this.state.Type,
        DateOccured: this.state.DateOccured,
        Location: this.state.Location,
        Time: this.state.Time,
        Evidence: this.state.Evidence,
        Parties: this.state.Parties,
        Action: this.state.Action,
        Notes: this.state.Notes
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
    fetch(variables.API_URL + "log", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        LogId: this.state.LogId,
        MadeBy: this.state.MadeBy,
        Code: this.state.Code,
        Type: this.state.Type,
        DateOccured: this.state.DateOccured,
        Location: this.state.Location,
        Time: this.state.Time,
        Evidence: this.state.Evidence,
        Parties: this.state.Parties,
        Action: this.state.Action,
        Notes: this.state.Notes
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
      fetch(variables.API_URL + "log/" + id, {
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

  render() {
    const {
      logs,
      modalTitle,
      LogId,
      MadeBy,
      Code,
      Type,
      DateOccured,
      Location,
      Time,
      Evidence,
      Parties,
      Action,
      Notes
    } = this.state;

    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}>
          Add Log
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <div className="d-flex flex-row">


                  <input className="form-control m-2"
                    onChange={this.changeLogIdFilter}
                    placeholder="Filter" />

                  <button type="button" className="btn btn-light"
                    onClick={() => this.sortResult('LogId', true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>

                  <button type="button" className="btn btn-light"
                    onClick={() => this.sortResult('LogId', false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                      <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                    </svg>
                  </button>

                </div>
                Log ID</th>
              <th>
                <div className="d-flex flex-row">
                  <input className="form-control m-2"
                    onChange={this.changeMadeByFilter}
                    placeholder="Filter" />

                  <button type="button" className="btn btn-light"
                    onClick={() => this.sortResult('MadeBy', true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>

                  <button type="button" className="btn btn-light"
                    onClick={() => this.sortResult('MadeBy', false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                      <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                    </svg>
                  </button>
                </div>
                Made By (ID)</th>
              <th>Code</th>
              <th>Type</th>
              <th>Date Occured</th>
              <th>Location</th>
              <th>Time</th>
              <th>Evidence</th>
              <th>Parties</th>
              <th>Action</th>
              <th>Notes</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((emp) => (
              <tr key={emp.LogId}>
                <td>{emp.LogId}</td>
                <td>{emp.MadeBy}</td>
                <td>{emp.Code}</td>
                <td>{emp.Type}</td>
                <td>{emp.DateOccured}</td>
                <td>{emp.Location}</td>
                <td>{emp.Time}</td>
                <td>{emp.Evidence}</td>
                <td>{emp.Parties}</td>
                <td>{emp.Action}</td>
                <td>{emp.Notes}</td>
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
                    onClick={() => this.deleteClick(emp.LogId)}
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
                      <span className="input-group-text">Made By</span>
                      <input
                        type="text"
                        className="form-control"
                        value={MadeBy}
                        onChange={this.changeMadeBy}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Code</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Code}
                        onChange={this.changeCode}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Type</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Type}
                        onChange={this.changeType}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Date Occured</span>
                      <input
                        type="date"
                        className="form-control"
                        value={DateOccured}
                        onChange={this.changeDateOccured}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Location</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Location}
                        onChange={this.changeLocation}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Time</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Time}
                        onChange={this.changeTime}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Evidence</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Evidence}
                        onChange={this.changeEvidence}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Parties</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Parties}
                        onChange={this.changeParties}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Action</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Action}
                        onChange={this.changeAction}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Notes</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Notes}
                        onChange={this.changeNotes}
                      />
                    </div>
                  </div>
                </div>

                {LogId == 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Create
                  </button>
                ) : null}

                {LogId != 0 ? (
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
