import React from 'react'
import Header from "../Header";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import axios from 'axios';

function GEQAnalyticsMangement() {

    const [data ,setData] =useState([]) 
    const userlist = async () => {
      await axios.post(`/web_api/polls_analytics`)
      .then(resp =>{
        const data = resp.data.body
        setData(data);
        console.log(data)
      })
    }
 
 useEffect(() => {
   userlist();
 }, [])


 useEffect(() => {
  document.body.className = "main-body leftmenu analytics";
  return () => {
      document.body.className = "main-body leftmenu";
  }
}, []);
 

  return (
    <div><Header />
    <div className="main-content side-content pt-0">
        <div className="container-fluid">
          <div className="inner-body">

            <div className="page-header">
              <div>
                <h2 className="main-content-title tx-24 mg-b-5">GEQ Analytics</h2>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;GEQ Analytics</li>
                </ol>
              </div>
              {/* <div className="d-flex">
                <div className="justify-content-center">
                  <Link to="/home" className="btn-link">
                    <i className="fal fa-angle-double-left"></i>&nbsp; Back
                  </Link>
                </div>
              </div> */}
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-12 table-responsive border border-bottom-0">
                <div className="card custom-card">
                  <div className="card-body">
                    <div className="row justify-content-center">
                      <div className="col-lg-6">
                          <div className="row">
                            <div className="col-lg-12 reletive mb-4">
                            <label className="title-col">Total User Participate</label>
                              <input type="text" className="form-control card-input"   readOnly defaultValue={data.total_user_participated_in_polls}  fullWidth  variant="filled" autoComplete="off" />
                            </div>
                            <div className="col-lg-12 reletive mb-4">
                            <label className="title-col">Total User Skipped </label>
                              <input type="text" className="form-control card-input"   defaultValue={data.total_user_skipped_in_polls} fullWidth  variant="filled" autoComplete="off" />
                            </div>

                            <div className="col-lg-12 reletive mb-4">
                            <label className="title-col">Total Participate In Public </label>
                              <input type="text" className="form-control card-input"  defaultValue={data.total_user_participated_in_public_polls}  fullWidth  variant="filled" autoComplete="off" />
                            </div>   

                            <div className="col-lg-12 reletive mb-4">
                            <label className="title-col">Total Participate In Private </label>
                              <input type="text" className="form-control card-input" defaultValue={data.total_user_participated_in_private_polls}  fullWidth  variant="filled" autoComplete="off" />
                            </div>   
                            <div className="col-lg-12 reletive mb-4">
                            <label className="title-col">Total Participate In Paid </label>
                              <input type="text" className="form-control card-input" defaultValue={data.total_user_participated_in_paid_polls}  fullWidth  variant="filled" autoComplete="off" />
                            </div>   
                          </div>                       
                      </div>
                    </div>
                  </div>
                  <div className="card-footer mb-1">

                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
      <ToastContainer position="top-right" />
    </div>
  )
}

export default GEQAnalyticsMangement