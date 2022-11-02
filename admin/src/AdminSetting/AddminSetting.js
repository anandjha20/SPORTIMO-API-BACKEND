import React from 'react'
import Header from "../Header";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import axios from 'axios';

function AddminSetting() {
    const [data ,setData] =useState([]) 

    const UpdateFormData = async(e) =>{
        e.preventDefault();
        
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        const formData = Formvlaues;
        console.log(Formvlaues)
        axios.post(`/web_api/admin_settings_update`,formData)
        .then(resp =>{
             if(resp.status){
                let data =resp.data
                if(data.status){
                    toast.success(data.msg)
                    setData(data);  
                    
                }else{
                    toast.error(data.msg)
                }
             }else{
                toast.error(data.msg)
             }
        })

        
    }
    
    const userlist = async () => {
      await axios.get(`/web_api/admin_settings_get`)
      .then(resp =>{
        const data = resp.data.body
        setData(data);
        console.log(data)
      })
    }
 
 useEffect(() => {
   userlist();

 }, [])
 

  return (
    <div><Header />
    <div className="main-content side-content pt-0">
        <div className="container-fluid">
          <div className="inner-body">

            <div className="page-header">
              <div>
                <h2 className="main-content-title tx-24 mg-b-5">Admin Setting</h2>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Admin Setting</li>
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
                      <form onSubmit={(e) => UpdateFormData(e)}>
                          <div className="row">
                            
                            <div className="col-lg-12 reletive mb-4">
                            <label className="title-col">Unblock Period Days </label>
                              <input type="text" className="form-control card-input"  name='unblock_period_days' defaultValue={data.unblock_period_days}  fullWidth  variant="filled" autoComplete="off" />
                            </div>
                            <div className="col-lg-12 reletive mb-4">
                            <label className="title-col">Auto Chat Blocking </label>
                              <input type="text" className="form-control card-input"  name='auto_chat_blocking' defaultValue={data.auto_chat_blocking} fullWidth  variant="filled" autoComplete="off" />
                            </div>

                            <div className="col-lg-12 reletive mb-4">
                            <label className="title-col">Guest User Active Days </label>
                              <input type="text" className="form-control card-input"  name='guest_user_active_days' defaultValue={data.guest_user_active_days}  fullWidth  variant="filled" autoComplete="off" />
                            </div>   

                            <div className="col-lg-12 reletive mb-4">
                            <label className="title-col">Default Prediction Period </label>
                              <input type="text" className="form-control card-input"  name='default_prediction_period' defaultValue={data.guest_user_active_days}  fullWidth  variant="filled" autoComplete="off" />
                            </div>   
                            <div className="col-lg-12 reletive mb-4">
                            <label className="title-col">Default Prediction Update Period</label>
                              <input type="text" className="form-control card-input"  name='default_prediction_update_period' defaultValue={data.guest_user_active_days}  fullWidth  variant="filled" autoComplete="off" />
                            </div>   

                            <div className="col-lg-12 text-start">
                              <Button type='submit' className="mr-3 btn-pd btnBg">Update</Button>
                              {/* <Button type='reset' variant="contained" className="btn btn-dark btn-pd">Reset</Button> */}
                            </div>

                          </div>
                        </form>
                       
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

export default AddminSetting