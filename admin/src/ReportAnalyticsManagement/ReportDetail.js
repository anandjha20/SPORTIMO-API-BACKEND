import React from "react";
import Header from "../Header";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
// import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import Moment from 'moment';
import { useNavigate } from "react-router-dom";

function ReportDetail() {

  const navigate = useNavigate();

  const [data, setData] = useState([])
  const [UserName, setUserName] = useState()

  const { _id } = useParams();

  let token = localStorage.getItem("token");
  let header = ({ 'token': `${token}` });
  let options = ({ headers: header });

  const userDetails = async () => {
    // const sanData = { page: "1", rows : "1" }
    const details = await axios.get(`/web_api/user_report_detail/${_id}`, options).then((result)=>{
      
      const data1 = result.data.body;
      const UserData=data1[0].reporting_user_id.name;
      console.log(data1);
      setData(data1);
      setUserName(UserData);
    }).catch((error)=>{
      setData([]);
      console.log(error);
    })

  }
  useEffect(() => {
    userDetails();
  }, []);


  const formatDate = Moment(data.date).format("DD/MM//YYYY");

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  

  return (
    <>
      <Header />




      <div className="main-content side-content pt-0">
        <div className="container-fluid">
          <div className="inner-body">

            <div className="page-header">
              <div>
                <h2 className="main-content-title tx-24 mg-b-5">Reports Detail</h2>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page"><Link to="/user-list">&nbsp;&nbsp;User Management</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Reports Detail</li>
                </ol>
              </div>


              <div className="d-flex">
                <div className="justify-content-center">
                  <Link to="/reports">
                    <Button type='button' variant="contained" className="mr-3 btn-pd btnBg"><i className="fal fa-angle-double-left"></i>&nbsp; Back</Button>
                  </Link>
                </div>
              </div>

            </div>
            <div className="row">
              <div className="col-lg-12 table-responsive border border-bottom-0">
                
              <div className="table-card table-responsive MuiPaper-root MuiPaper-elevation2 MuiPaper-rounded">
                        <h6 className="MuiTypography-root MuiTypography-h6 padd1rem">Reports Against : <bold>{UserName}</bold></h6>
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th scope="col">Unique ID Of Reporter</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Reason</th>
                                    <th scope="col">Discription</th>
                                    <th scope="col">Date</th>
                                    {/* <th scope="col">User language</th> */}
                                    
                                </tr>
                            </thead>
                            <tbody >
                            {data.length==0  ? <>
                               <tr>
                               <td className="text-center" colSpan='11'> 
                               <span>No Records To Display</span> </td>
                               </tr>
                               </> : null}
                                {data.map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <td>{item.reported_user_id._id}</td>
                                            <td>{item.reported_user_id.name}</td>
                                            <td>{item.reason_id.name}</td>
                                            <td>{item.discription}</td>
                                            <td>{Moment(item.date).format("DD/MM/YYYY")}</td>
                                            {/* <td>{item.user_language}</td> */}
                                           
                                        </tr>
                                    );


                                })}
                            </tbody>
                        </table>
                    </div>
                    
                
                
                
                
                
                {/* <div className="card custom-card">
                  <div className="card-body">
                    <div className="row">
                      
                      <div className="col-lg-6">
                      <div className="form-group mb-4"> <label className="tx-medium">Unique ID</label>
                          <input type="text" className="form-control" readOnly value={data._id || ''} /> </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group mb-4"> <label className="tx-medium">Unique Name</label>
                          <input type="text" className="form-control" readOnly value={data.u_name || ''} /> </div>
                      </div>
                      {data.user_type == "5"  ? <>
                      <div className="col-lg-6">
                        <div className="form-group mb-4"> <label className="tx-medium">User Type</label>
                          <input type="text" className="form-control" readOnly value="Guest User" /> </div>
                      </div>
                      </> : null}
                   
                        
                      <div className="col-lg-6">
                        <div className="form-group mb-4"> <label className="tx-medium">User Name</label>
                          <input type="text" className="form-control text-capitalize" readOnly value={data.name || ''} />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group mb-4"> <label className="tx-medium">Mobile Number</label>
                          <input type="text" className="form-control" readOnly value={data.mobile || ''} />
                        </div>
                      </div>



                      <div className="col-lg-6">
                        <div className="form-group mb-4"> <label className="tx-medium">Email Address</label>
                          <input type="text" className="form-control" readOnly value={data.email || ''} />
                        </div>
                      </div>



                      <div className="col-lg-6">
                        <div className="form-group mb-4"> <label className="tx-medium">Registration Date	</label>
                          <input type="text" className="form-control" readOnly value={formatDate || ''} />
                        </div>
                      </div>


                      <div className="col-lg-6">
                        <div className="form-group mb-4"> <label className="tx-medium">User language</label>
                          <input type="text" className="form-control" readOnly value={data.user_language || ''} />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group mb-4"> <label className="tx-medium">Country</label>
                          <input type="text" className="form-control" readOnly value={data.country || ''} />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group mb-4"> <label className="tx-medium">Gender</label>
                          <input type="text" className="form-control" readOnly value={data.gender || ''} />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group mb-4"> <label className="tx-medium">Preferred Sports</label>
                          <input type="text" className="form-control" readOnly value={data.sport_preferences || ''} />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group mb-4"> <label className="tx-medium">Preferred leagues</label>
                          <input type="text" className="form-control" readOnly value={data.league_preference || ''} />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group mb-4"> <label className="tx-medium">Preferred Teams</label>
                          <input type="text" className="form-control" readOnly value={data.team_preference || ''} />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group mb-4"> <label className="tx-medium">Preferred Players</label>
                          <input type="text" className="form-control" readOnly value={data.player_preference || ''} />
                        </div>
                      </div>



                    </div>
                  </div>

                </div> */}


              </div>
            </div>
          </div>



        </div>
      </div>
    </>
  )
}

export default ReportDetail