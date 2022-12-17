import React, { Component } from 'react';
import { variables } from './Variables.js';

export class Unit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            units: [],
            modalTitle: "",
            UnitName: "",
            UnitId: 0,
            UnitType: "",
            UnitChief: "",
            UnitCreationDate: "",
            UnitStatus: "",

            UnitIdFilter: "",
            UnitNameFilter: "",
            unitsWithoutFilter: []
        }
    }

    FilterFn() {
        var UnitIdFilter = this.state.UnitIdFilter;
        var UnitNameFilter = this.state.UnitNameFilter;

        var filteredData = this.state.unitsWithoutFilter.filter(
            function (el) {
                return el.UnitId.toString().toLowerCase().includes(
                    UnitIdFilter.toString().trim().toLowerCase()
                ) &&
                    el.UnitName.toString().toLowerCase().includes(
                        UnitNameFilter.toString().trim().toLowerCase()
                    )
            }
        );

        this.setState({ units: filteredData });

    }

    sortResult(prop, asc) {
        var sortedData = this.state.unitsWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });

        this.setState({ units: sortedData });
    }

    changeUnitIdFilter = (e) => {
        this.state.UnitIdFilter = e.target.value;
        this.FilterFn();
    }
    changeUnitNameFilter = (e) => {
        this.state.UnitNameFilter = e.target.value;
        this.FilterFn();
    }

    refreshList() {
        fetch(variables.API_URL + 'unit')
            .then(response => response.json())
            .then(data => {
                this.setState({ units: data, unitsWithoutFilter: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeUnitName = (e) => {
        this.setState({ UnitName: e.target.value });
    }

    changeUnitType = (e) => {
        this.setState({ UnitType: e.target.value });
    }

    changeUnitChief = (e) => {
        this.setState({ UnitChief: e.target.value });
    }

    changeUnitCreationDate = (e) => {
        this.setState({ UnitCreationDate: e.target.value });
    }

    changeUnitStatus = (e) => {
        this.setState({ UnitStatus: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Unit",
            UnitId: 0,
            UnitName: "",
            UnitType: "",
            UnitChief: "",
            UnitCreationDate: "",
            UnitStatus: ""
        });
    }
    editClick(emp) {
        this.setState({
            modalTitle: "Edit Unit",
            UnitId: emp.UnitId,
            UnitName: emp.UnitName,
            UnitType: emp.UnitType,
            UnitChief: emp.UnitChief,
            UnitCreationDate: emp.UnitCreationDate,
            UnitStatus: emp.UnitStatus
        });
    }

    createClick() {
        fetch(variables.API_URL + 'unit', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UnitId: this.state.UnitId,
                UnitName: this.state.UnitName,
                UnitType: this.state.UnitType,
                UnitChief: this.state.UnitChief,
                UnitCreationDate: this.state.UnitCreationDate,
                UnitStatus: this.state.UnitStatus
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            },
                (error) => {
                    alert('Failed');
                })
    }


    updateClick() {
        fetch(variables.API_URL + 'unit', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UnitId: this.state.UnitId,
                UnitName: this.state.UnitName,
                UnitType: this.state.UnitType,
                UnitChief: this.state.UnitChief,
                UnitCreationDate: this.state.UnitCreationDate,
                UnitStatus: this.state.UnitStatus

            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'unit/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

    render() {
        const {
            units,
            modalTitle,
            UnitId,
            UnitName,
            UnitType,
            UnitChief,
            UnitCreationDate,
            UnitStatus
        } = this.state;

        return (
            <div>

                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Unit
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                <div className="d-flex flex-row">


                                    <input className="form-control m-2"
                                        onChange={this.changeUnitIdFilter}
                                        placeholder="Filter" />

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('UnitId', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('UnitId', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>

                                </div>
                                Unit ID
                            </th>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2"
                                        onChange={this.changeUnitNameFilter}
                                        placeholder="Filter" />

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('UnitName', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('UnitName', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>
                                Unit Name</th>
                            <th>Unit Type</th>
                            <th>Unit Chief (ID)</th>
                            <th>Unit Creation Date</th>
                            <th>Unit Status</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {units.map(emp =>
                            <tr key={emp.UnitId}>
                                <td>{emp.UnitId}</td>
                                <td>{emp.UnitName}</td>
                                <td>{emp.UnitType}</td>
                                <td>{emp.UnitChief}</td>
                                <td>{emp.UnitCreationDate}</td>
                                <td>{emp.UnitStatus}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(emp)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(emp.UnitId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Unit Name</span>
                                    <input type="text" className="form-control"
                                        value={UnitName}
                                        onChange={this.changeUnitName} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Unit Type</span>
                                    <input type="text" className="form-control"
                                        value={UnitType}
                                        onChange={this.changeUnitType} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Unit Chief ID</span>
                                    <input type="text" className="form-control"
                                        value={UnitChief}
                                        onChange={this.changeUnitChief} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Creation Date</span>
                                    <input type="date" className="form-control"
                                        value={UnitCreationDate}
                                        onChange={this.changeUnitCreationDate} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Unit Status</span>
                                    <input type="text" className="form-control"
                                        value={UnitStatus}
                                        onChange={this.changeUnitStatus} />
                                </div>

                                {UnitId == 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {UnitId != 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Update</button>
                                    : null}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
