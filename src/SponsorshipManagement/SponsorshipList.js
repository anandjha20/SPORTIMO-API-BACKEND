import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import TableSponsorship from "./TableSponsorship";
import Button from "@mui/material/Button";
import FilterComponent from "./Components/FilterComponent";



import { useState,useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function SponsorshipList() {
   

    const [sponsor_list, setSponsor_list] = React.useState([]);

    const get_data = async(sendData) =>{
        try {
         
          let options1 = { headers: { "Content-type": "application/json","token": localStorage.getItem('token') } };
          let response = await axios.post( '/sponsor_list', sendData, options1);
    
          if (response.status) {
    
            let data = response.data;
    
            if (data.status) {
                setSponsor_list(data.body);
             // toast.success(data.msg);
            } else {
              toast.error('something went wrong please try again');
            }
          }
          else {
            toast.error('something went wrong please try again..');
          }
    
    
        } catch (err) { console.error(err); toast.error('some errror'); return false; }
    
    }
    
    
    
      useEffect(() => {
        get_data({});
      }, []);
    

    return (
        <>
            <Header />
            <div className="main-content side-content pt-0">
                <div className="container-fluid">
                    <div className="inner-body">

                        <div className="page-header">
                            <div>
                                <h2 className="main-content-title tx-24 mg-b-5">Sponsorship List</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>

                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Sponsorship</li>
                                </ol>
                            </div>
                            <div className="d-flex">
                                <div className="justify-content-center">
                                    <Link to="/sponsorship/add">
                                        <Button type='button' variant="contained" className="mr-3 btn-pd btnBg"><i className="fas fa-plus"></i>&nbsp;&nbsp; Add  Sponsorship</Button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">
                              
                                <FilterComponent   onClick={get_data}  />
                                <TableSponsorship myData = {sponsor_list} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default SponsorshipList;