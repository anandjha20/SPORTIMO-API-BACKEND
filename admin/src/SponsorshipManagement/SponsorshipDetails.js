import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


    
function SponsorshipDetails() {
    useEffect(() => {
        document.body.className = "main-body leftmenu sponer_list";
        return () => {
          document.body.className = "main-body leftmenu";
        }
      }, []);     
     const { id } = useParams();
     console.log("params idsdd == ",id);

    const[sponsorData,setSponsorData] = useState([]);
    const get_data = async(id)=>{
    
      {  try{ 
          let formData = {};    
          let token = localStorage.getItem("token");
          let header = ({ 'token': `${token}` });
          let options1 = ({ headers: header });
          let response = await axios.get('/web_api/sponsor_detail/'+id,options1, formData);
         let t_data = response.data;
          
    
         if(t_data.status){
            
            setSponsorData(t_data.body);
         }
         
          return   response.data;
         } catch(err){ console.error(err); toast.error('some errror'); return false;  }
     } 
    }
    
      useEffect(() => {
          get_data(id);
        },[]); 
    
    
    
    
        console.log('fdfffff   ==',sponsorData);

    return (
        <>

            <Header />

            <div className="main-content side-content pt-0">
                <div className="container-fluid">
                    <div className="inner-body">

                        <div className="page-header">
                            <div>
                                <h2 className="main-content-title tx-24 mg-b-5">Banner Details</h2>

                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>

                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Hero Banner</li>
                                </ol>
                            </div>

                            <div className="d-flex">
                                <div className="justify-content-center">
                                    <Link to="/sponsorship">
                                        <Button type='button' variant="contained" className="mr-3 btn-pd btnBg"><i className="fal fa-angle-double-left"></i>&nbsp; Back</Button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">
                                <div className="card custom-card">
                                    <div className="card-body">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-12">
                                          
                                           { (sponsorData.length >0 )? 
                                                <form>
                                                    <div className="row">

                                                        <div className="col-lg-6 mb-3">
                                                            <label className="title-col mb-2">Match/league</label>
                                                            <TextField id="filled-basic" fullWidth label="" className="dt-input"   value = {sponsorData[0].match || ''} 
                                                               variant="filled"  InputProps={{ readOnly: true, }} />
                                                        </div>

                                                        <div className="col-lg-3 mb-3">
                                                        <label className="title-col mb-2">Impressions</label>
                                                            <TextField id="filled-basic" fullWidth label="" className="dt-input" value = {sponsorData[0].impressions_count } variant="filled"
                                                              InputProps={{ readOnly: true, }} />
                                                        </div>

                                                        <div className="col-lg-3 mb-3">
                                                        <label className="title-col mb-2">Clicks</label>
                                                            <TextField id="filled-basic" fullWidth label="" className="dt-input" value = {sponsorData[0].clicks_count } variant="filled"
                                                                InputProps={{ readOnly: true, }} />
                                                        </div>

                                                        <div className="col-lg-6 mb-3">
                                                        <label className="title-col mb-2">Skippable</label>
                                                            <TextField id="filled-basic" fullWidth label="" className="dt-input" value = {(sponsorData[0].skip_ad)? 'Yes' : 'No' } 
                                                              variant="filled"   InputProps={{ readOnly: true, }} />
                                                        </div>

                                                        <div className="col-lg-6 mb-3">
                                                        <label className="title-col mb-2">Banner Type</label>
                                                            <TextField id="filled-basic" fullWidth label="" className="dt-input" value = {sponsorData[0].view_type=="banner"?"Photo":sponsorData[0].view_type || ''} 
                                                                variant="filled" InputProps={{ readOnly: true, }} />
                                                        </div>

                                                        <div className="col-lg-12 mb-3">
                                                        <label className="title-col mb-2">FILE UPLOADED</label>
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                        {sponsorData[0].view_type=="banner"?
                                                            <div className="banner-box">
                                                                {sponsorData[0].image !== '' ? <img src={sponsorData[0].image || ''} alt="banner image" /> : <><img src='/assets/images/no-image.png' /></>}
                                                            </div>
                                                            :<div className="banner-box">
                                                            {sponsorData[0].image !== '' ? <video height="200px" width="300px" controls><source src={sponsorData[0].image || ''}  type="video/mp4"></source></video> : <><img src='/assets/images/no-image.png' /></>}
                                                            </div>
                                                            }
                                                        </div>
                                                        </div>
                                                        </div>

                                                        <div className="col-lg-12 mb-3">
                                                        <label className="title-col mb-2">CAMPAIGN DATE RANGE</label>
                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                            
                                                            <TextField id="filled-basic" fullWidth label="Start Date"  value = {sponsorData[0].Fdate.slice(0, 10).split("-").reverse().join("-") || ''} 
                                                                InputProps={{ readOnly: true, }} />
                                                                </div>
                                                            <div className="col-lg-6">
                                                            <TextField id="filled-basic" fullWidth label="End Date"  value = {sponsorData[0].Ldate.slice(0, 10).split("-").reverse().join("-") || ''} 
                                                                InputProps={{ readOnly: true, }} />
                                                                </div>
                                                        </div>
                                                        </div>
                                                      

                                                        {/* <div className="col-lg-12 mb-3">
                                                        <label className="title-col mb-2">SPONSORSHIP TARGETING</label>
                                                        <div className="row">
                                                            <div className="col-lg-6 mb-3">
                                                            
                                                            <TextField  id="filled-basic" fullWidth label="Sports"  value = {sponsorData[0].sports_name} 
                                                                InputProps={{ readOnly: true, }} />
                                                                </div>
                                                            <div className="col-lg-6 mb-3">
                                                            <TextField id="filled-basic" fullWidth label="League"   value = {sponsorData[0].league_name || ''} 
                                                                InputProps={{ readOnly: true, }} />
                                                                </div>
                                                            <div className="col-lg-6 mb-3">
                                                            <TextField id="filled-basic" fullWidth label="Team"  value = {sponsorData[0].team_name || ''} 
                                                                InputProps={{ readOnly: true, }} />
                                                                </div>
                                                            
                                                        </div>
                                                        </div> */}

                                                        {/* <div className="col-lg-12 mb-3">
                                                        <label className="title-col mb-2">TARGETED COUNTRY</label>
                                                        <div className="row">
                                                            <div className="col-lg-12 mb-3">
                                                            
                                                            <TextField  id="filled-basic" fullWidth label="Country" value = {sponsorData[0].country_name || ''}   variant="filled"
                                                                InputProps={{ readOnly: true, }} />
                                                                </div>
                                                            
                                                        </div>
                                                        </div> */}


                                                    </div>

                                                </form>
                                                 : '' } 
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
        </>
    )
}

export default SponsorshipDetails;
