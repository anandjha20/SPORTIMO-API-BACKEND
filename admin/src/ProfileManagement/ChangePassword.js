import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import { useEffect } from 'react';


function ChangePassword() {

    useEffect(() => {
        // 👇 add class to body element
        document.body.classList.add('bg-salmon');

    }, []);

    const [showhide, setShowhide] = useState('');


    return (
        <>

            <Header />

            <div className="main-content side-content pt-0">
                <div className="container-fluid">
                    <div className="inner-body">

                        <div className="page-header">
                            <div>
                                <h2 className="main-content-title tx-24 mg-b-5">Change Password</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>

                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Change Password</li>
                                </ol>
                            </div>

                            {/* <div className="d-flex">
                                <div className="justify-content-center">
                                    <Link to="/geq-list">
                                        <Button type='button' variant="contained" className="mr-3 btn-pd btnBg"><i class="fal fa-angle-double-left"></i>&nbsp; Back</Button>
                                    </Link>
                                </div>
                            </div> */}

                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">
                                <div className="card custom-card">
                                    <div className="card-body">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-5 pt-3 pb-3">

                                              <form>
                                                    <div className="row">

                                                        <div className="col-lg-12 mb-4">
                                                            <TextField id="filled-basic" type="password" fullWidth label="Current Password" variant="filled" />
                                                        </div>

                                                        <div className="col-lg-12 mb-4">
                                                            <TextField id="filled-basic" type="password" fullWidth label="New Password" variant="filled" />
                                                        </div>

                                                        <div className="col-lg-12 mb-4">
                                                            <TextField id="filled-basic1" type="password" fullWidth label="Confirm Password" variant="filled" />
                                                        </div>


                                                        <div className="col-lg-12 text-center">
                                                            <Button type='button' variant="contained" className="mr-3 btn-pd">Save</Button>
                                                            <Button type='reset' variant="contained" className="btn btn-dark btn-pd">Reset</Button>
                                                        </div>

                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ChangePassword;
