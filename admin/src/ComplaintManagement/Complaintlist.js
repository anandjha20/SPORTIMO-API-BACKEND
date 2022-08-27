import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import Button  from "@mui/material/Button";
import TableComplaintComponent from "./TableComplaintComponent";
import {useEffect} from "react";


function Complaintlist() {
   
    useEffect(() => {
        document.body.className = "main-body leftmenu camp_list";
        return () => {
          document.body.className = "main-body leftmenu";
        }
      }, []);

    return (
        <>
          <Header />
            <div className="main-content side-content pt-0">
                <div className="container-fluid">
                    <div className="inner-body">

                        <div className="page-header">
                            <div>
                                <h2 className="main-content-title tx-24 mg-b-5">Complaint List</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>
                                  
                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Complaint Management</li>
                                </ol>
                            </div>
                            {/* <div className="d-flex">
								<div className="justify-content-center">
							       <Link  to="/faq/add">
                                    <Button type='button' variant="contained" className="mr-3 btn-pd btnBg"><i className="fas fa-plus"></i>&nbsp;&nbsp; Add Faq</Button>
                                    </Link>
                                </div>
							</div> */}
                           
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">

                          <TableComplaintComponent />   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Complaintlist;