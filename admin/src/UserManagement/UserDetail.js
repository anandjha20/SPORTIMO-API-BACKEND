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

function UserDetail() {

  const navigate = useNavigate();

  const [data, setData] = useState([])

  const { _id } = useParams();

  let token = localStorage.getItem("token");
  let header = ({ 'token': `${token}` });
  let options = ({ headers: header });

  const userDetails = async () => {
    
    const result = await axios.get(`/user_list/${_id}`, options);
    const data = result.data.body[0];
    setData(data);
    console.log(data);

  }
  useEffect(() => {
    userDetails();
  }, []);


  const formatDate = Moment(data.date).format("MMM Do YY");


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
                <h2 className="main-content-title tx-24 mg-b-5">User Detail</h2>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page"><Link to="/user-list">&nbsp;&nbsp;User Management</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;User Detail</li>
                </ol>
              </div>


              <div className="d-flex">
                <div className="justify-content-center">
                  <Link to="/user">
                    <Button type='button' variant="contained" className="mr-3 btn-pd btnBg"><i className="fal fa-angle-double-left"></i>&nbsp; Back</Button>
                  </Link>
                </div>
              </div>

            </div>
            <div className="row">
              <div className="col-lg-12 table-responsive border border-bottom-0">
                <div className="card custom-card">
                  <div className="card-body">
                    <div className="row">


                      <div className="col-lg-12">

                        {/* <div className="box-img">
                          <img src="/assets/img/users.webp" alt="avtar" />
                        </div> */}

                      </div>

                      <div className="col-lg-6">


                        <div className="form-group mb-4"> <label className="tx-medium">Unique Name</label>
                          <input type="text" className="form-control" readOnly value={data.u_name || ''} /> </div>
                      </div>

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
                        <div className="form-group mb-4"> <label className="tx-medium">Date Of Birth</label>
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

                </div>


              </div>
            </div>
          </div>



        </div>
      </div>
    </>
  )
}

export default UserDetail