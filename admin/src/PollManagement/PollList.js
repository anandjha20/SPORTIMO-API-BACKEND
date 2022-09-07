import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import TableListComponent from "./TableListComponent";
import Button  from "@mui/material/Button";

function PollList() {
    return (
        <>
          <Header />
            <div className="main-content side-content pt-0">
                <div className="container-fluid">
                    <div className="inner-body">

                        <div className="page-header">
                            <div>
                                <h2 className="main-content-title tx-24 mg-b-5">Poll List</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Poll Management</li>
                                </ol>
                            </div>
                            <div className="d-flex">
								<div className="justify-content-center">
                                <Link to="/poll/create" className="btn-link">
                                <i className="fas fa-plus"></i>&nbsp;&nbsp; Create Poll
                                </Link>
                               
                                </div>
							</div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">
                            <TableListComponent />        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default PollList;