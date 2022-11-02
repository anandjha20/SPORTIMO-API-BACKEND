import React from "react";
import TextField from '@mui/material/TextField';
import Header from "../Header";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function IntroSliderDetails() {

    useEffect(() => {
        document.body.className = "main-body leftmenu sponer_list";
        return () => {
            document.body.className = "main-body leftmenu";
        }
    }, []);

    const navigate = useNavigate();
    const { _id } = useParams();
    const [datadetail, setDatadetail] = useState([])
    const [formDate, setFromdate] = useState([])
    const [toDate, setToDate] = useState([])

    let token = localStorage.getItem("token");
    let header = ({ 'token': `${token}` });
    let options1 = ({ headers: header });

   
    const IntroSliderDetail = async () => {
        await axios.post(`/web_api/introSlider_get/${_id}`)
            .then(res => {
                const datadetail = res.data.body;
                const formDate = res.data.body[0].from_date.substring(0, 19);
                const toDate = res.data.body[0].to_date.substring(0, 19);
                setFromdate(formDate)
                setToDate(toDate)
                setDatadetail(datadetail);
            })
    }

    useEffect(() => {
        IntroSliderDetail()
    }, []);


    ///////////////////////////  Add Introduction Slider Api Call  /////////////////////////////////////////

    const saveFormData = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());

        let dataToSend2 = new FormData();
        dataToSend2.append('title', Formvlaues.title);
        dataToSend2.append('description', Formvlaues.description);
        dataToSend2.append('title_ara', Formvlaues.title_ara);
        dataToSend2.append('description_ara', Formvlaues.description_ara);
        dataToSend2.append('image', Formvlaues.image);
        dataToSend2.append('from_date', Formvlaues.from_date);
        dataToSend2.append('to_date', Formvlaues.to_date);

        axios.put(`/web_api/introSlider_update/${_id}`, dataToSend2, options1)
            .then(response => {
                if (response.status) {
                    let data = response.data;
                    console.log(data.msg)
                    if (data.status) {
                        IntroSliderDetail();
                        toast.success(data.msg);
                        const timer = setTimeout(() => {
                             navigate(`/intro-slider`);
                          }, 2000);
                         
                    } else {
                        toast.error('something went wrong please try again');
                    }
                }
                else {
                    toast.error('something went wrong please try again..');
                }
            })
            .catch(error => {
                console.log(this.state);
            })
    }



    return (
        <>
            <Header />
            <div className="main-content side-content pt-0">
                <div className="container-fluid">
                    <div className="inner-body">

                        <div className="page-header">
                            <div>
                                <h2 className="main-content-title tx-24 mg-b-5">Update Introduction Slider</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to="/sponsorship">&nbsp;&nbsp;Sponsorship</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Introduction Slider</li>
                                </ol>
                            </div>

                            <div className="d-flex">
                                <div className="justify-content-center">
                                    <Link to="/intro-slider">
                                        <Button type='button' variant="contained" className="mr-3 btn-pd btnBg"><i className="fal fa-angle-double-left"></i>&nbsp; Back</Button>
                                    </Link>
                                </div>
                            </div>


                        </div>

                       {datadetail.map(dataShow => 
                       <>
                        <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">

                                <div className="card custom-card">
                                    <div className="card-body">
                                    
                                        <div className="row d-flex justify-content-center">
                                            <div className="col-lg-7">
                                                <form className="mt-3" onSubmit={(e) => saveFormData(e)} encType="multipart/form-data">
                                                    <h6 className="MuiTypography-root MuiTypography-h6 text-white mb-4">Update Introduction Slider</h6>
                                                   
                                               
                                                
                                                    <div className="col-lg-12 mb-4 p-0">
                                                         <label className="title-col">Title <span className="text-blue">(English)</span></label>
                                                         <input  id="categor" defaultValue={ dataShow.title} autoComplete="off" className="form-control mb-4" name="title"
                                                            type="text"
                                                            />
                                                    </div>

                                                    <div className="col-lg-12 mb-4 p-0">
                                                         <label className="title-col">Title <span className="text-blue">(Arabic)</span></label>
                                                         <input  id="categor" defaultValue={ dataShow.title_ara} autoComplete="off" className="form-control mb-4" name="title_ara"
                                                            type="text"
                                                            />
                                                    </div>


                                                    <div className="col-lg-12 mb-4 p-0">
                                                       <label className="title-col">Description <span className="text-blue">(English)</span></label>
                                                        <TextField id="filled-multiline-static" defaultValue={ dataShow.description} name='description' label="Enter Description" multiline rows={4} fullWidth variant="filled" />
                                                    </div>

                                                    <div className="col-lg-12 mb-4 p-0">
                                                       <label className="title-col">Description <span className="text-blue">(Arabic)</span></label>
                                                        <TextField id="filled-multiline-static" defaultValue={ dataShow.description_ara} name='description_ara' label="Enter Description" multiline rows={4} fullWidth variant="filled" />
                                                    </div>
                                                   

                                                    <div className="col-lg-12 mb-4  p-0">
                                                        <label className="title-col">File Upload</label>
                                                        <div className="imageSlider">
                                                            <img src={dataShow.image} alt="img" />
                                                        </div>
                                                        <input type="file" name='image' className="form-control file-input"  />
                                                    </div>

                                                    <div className="col-lg-12 mb-4 p-0">
                                                    <label className="title-col mb-3">Date-Range</label>
                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                               
                                                            <TextField id="categor" className="filter-input" defaultValue={formDate} type="datetime-local" name='from_date'
                                                              label="Start Date"/>
                                                            </div>
                                                            
                                                            <div className="col-lg-6">
                                                            <TextField id="categor" className="filter-input"  defaultValue={toDate}  type="datetime-local" name='to_date'
                                                              label="End Date" fullWidth />
                                                            
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mt-3 mb-3">
                                                        <Button type='submit' className="mr-3 btn-pd btnBg">Update</Button>
                                                        <Button type='reset' variant="contained" className="btn btn-dark btn-pd">Reset</Button>
                                                    </div>
                                                </form>
                                            </div>
                                          
                                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </> )}
                      </div>
                </div>
            </div>
            <ToastContainer position="top-right" />
        </>
    );
}

