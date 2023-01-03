import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import UserAnswerPieChart from "./UserAnswerPieChart";
import axios from "axios";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function PollDetailComponent() {
  const { id } = useParams();

  console.log("params idsdd == ", id);


  //////////////////////////////////////////////////////////

  const [pollData, setPollData] = useState([]);
  const get_data = async (id) => {

    {
      try {


        let token = localStorage.getItem("token");
        let header = ({ 'token': `${token}` });
        let options1 = ({ headers: header });
        const sendatds = {data1 : "data1"}        //  let options1 = { headers:{"Content-type": "application/json" }};
        let response = await axios.post('/web_api/poll_list/' + id, sendatds, options1);
        let t_data = response.data;


        if (t_data.status) {
          setPollData(t_data.body[0]);
        }

        return response.data;
      } catch (err) { console.error(err); toast.error('some errror'); return false; }
    }
  }

  useEffect(() => {
    get_data(id);
  }, []);


  console.log('fdfffff ==', pollData);



  ////////////////////////////////////////////////////////////////////////////


  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const [match, setMatch] = React.useState('');


  const handleChange = (event) => {
    setMatch(event.target.value);
  };
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  return (
    <>

      <Header />

      <div className="main-content side-content pt-0">
        <div className="container-fluid">
          <div className="inner-body">

            <div className="page-header">
              <div>
                <h2 className="main-content-title tx-24 mg-b-5">Poll Detail</h2>

                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>

                  <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Poll Management</li>
                </ol>
              </div>

              <div className="d-flex">
                <div className="justify-content-center">
                  <Link to="/poll">
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
                      {(pollData) ?
                        <div className="col-lg-7">

                          <form>
                            <div className="row">

                              <div className="col-lg-6 mb-3">
                                <label className="title-col mb-3">POLL TYPE  </label>
                                <TextField id="filled-basic" fullWidth label="Poll Type" value={pollData.poll_type || ''}
                                  InputProps={{ readOnly: true }} />
                              </div>

                              <div className="col-lg-6 mb-3">
                                <label className="title-col mb-3">POLL FEE</label>
                                <TextField id="filled-basic" fullWidth label="Poll Fee" value={pollData.fee_type || ''}
                                  InputProps={{ readOnly: true, }} />
                              </div>

                              <div className="col-lg-12 mb-3">
                                <label className="title-col mb-">Match/league</label>
                                <TextField id="filled-basic" fullWidth label="MATCH/LEAGU" value={pollData.match || ''} variant="filled"
                                  InputProps={{ readOnly: true, }} />
                              </div>

                              <div className="col-lg-6 mb-3">
                                <label className="title-col mb-">APPEARANCE TIME</label>
                                <TextField id="filled-basic" fullWidth label="Appearance Time" value={pollData.apperance_time || ''} variant="filled"
                                  InputProps={{ readOnly: true, }} />
                              </div>


                              <div className="col-lg-6 mb-3">
                                <label className="title-col mb-1">DURATION</label>
                                <TextField id="filled-basic" fullWidth label="Duration" value={pollData.time_duration || ''} variant="filled"
                                  InputProps={{ readOnly: true, }} />
                              </div>


                              <div className="col-lg-12 mb-4">
                                <label className="title-col">Question <span className="text-blue">(English)</span></label>
                                <TextField id="filled-multiline-static"
                                  label="Enter Question" multiline rows={3} InputProps={{ readOnly: true, }} fullWidth value={pollData.qus || ''} variant="filled" />

                              </div>

                              <div className="col-lg-6 mb-4">
                                <TextField id="filled-basic1" multiline rows={2} fullWidth label="Answer 1" value={pollData.ops_1 || ''} variant="filled" InputProps={{ readOnly: true }} />
                              </div>

                              <div className="col-lg-6 mb-4">
                                <TextField id="filled-basic1" multiline rows={2} fullWidth label="Answer 2" value={pollData.ops_2 || ''} variant="filled" InputProps={{ readOnly: true }} />
                              </div>

                              <div className="col-lg-6 mb-4">
                                <TextField id="filled-basic1" multiline rows={2} fullWidth label="Answer 3" value={pollData.ops_3 || ''} variant="filled" InputProps={{ readOnly: true }} />
                              </div>

                              <div className="col-lg-6 mb-4">
                                <TextField id="filled-basic1" multiline rows={2} fullWidth label="Answer 4" value={pollData.ops_4 || ''} variant="filled" InputProps={{ readOnly: true }} />
                              </div>

                              <div className="col-lg-6 mb-4">
                                <TextField id="filled-basic1" multiline rows={2} fullWidth label="Answer 5" value={pollData.ops_5 || ''} variant="filled" InputProps={{ readOnly: true, }} />
                              </div>

                              <div className="col-lg-12 mb-4">
                                <label className="title-col">Question <span className="text-blue">(Arabic)</span></label>
                                <TextField id="filled-multiline-static"
                                  label="Enter Question" multiline rows={3} InputProps={{ readOnly: true, }} fullWidth value={pollData.qus_ara || ''} variant="filled" />

                              </div>

                              <div className="col-lg-6 mb-4">
                                <TextField id="filled-basic1" multiline rows={2} fullWidth label="Answer 1" value={pollData.ops_1_ara || ''} variant="filled" InputProps={{ readOnly: true }} />
                              </div>

                              <div className="col-lg-6 mb-4">
                                <TextField id="filled-basic1" multiline rows={2} fullWidth label="Answer 2" value={pollData.ops_2_ara || ''} variant="filled" InputProps={{ readOnly: true }} />
                              </div>

                              <div className="col-lg-6 mb-4">
                                <TextField id="filled-basic1" multiline rows={2} fullWidth label="Answer 3" value={pollData.ops_3_ara || ''} variant="filled" InputProps={{ readOnly: true }} />
                              </div>

                              <div className="col-lg-6 mb-4">
                                <TextField id="filled-basic1" multiline rows={2} fullWidth label="Answer 4" value={pollData.ops_4_ara || ''} variant="filled" InputProps={{ readOnly: true }} />
                              </div>

                              <div className="col-lg-6 mb-4">
                                <TextField id="filled-basic1" multiline rows={2} fullWidth label="Answer 5" value={pollData.ops_5_ara || ''} variant="filled" InputProps={{ readOnly: true, }} />
                              </div>

                              <div className="col-lg-12 mb-4">
                                <label className="title-col">Question <span className="text-blue">(French)</span></label>
                                <TextField id="filled-multiline-static"
                                  label="Enter Question" multiline rows={3} InputProps={{ readOnly: true, }} fullWidth value={pollData.qus_fr || ''} variant="filled" />

                              </div>

                              <div className="col-lg-6 mb-4">
                                <TextField id="filled-basic1" multiline rows={2} fullWidth label="Answer 1" value={pollData.ops_1_fr || ''} variant="filled" InputProps={{ readOnly: true }} />
                              </div>

                              <div className="col-lg-6 mb-4">
                                <TextField id="filled-basic1" multiline rows={2} fullWidth label="Answer 2" value={pollData.ops_2_fr || ''} variant="filled" InputProps={{ readOnly: true }} />
                              </div>

                              <div className="col-lg-6 mb-4">
                                <TextField id="filled-basic1" multiline rows={2} fullWidth label="Answer 3" value={pollData.ops_3_fr || ''} variant="filled" InputProps={{ readOnly: true }} />
                              </div>

                              <div className="col-lg-6 mb-4">
                                <TextField id="filled-basic1" multiline rows={2} fullWidth label="Answer 4" value={pollData.ops_4_fr || ''} variant="filled" InputProps={{ readOnly: true }} />
                              </div>

                              <div className="col-lg-6 mb-4">
                                <TextField id="filled-basic1" multiline rows={2} fullWidth label="Answer 5" value={pollData.ops_5_fr || ''} variant="filled" InputProps={{ readOnly: true, }} />
                              </div>


                            </div>

                          </form>
                        </div> : ''}

                      <div className="col-lg-5">
                        <UserAnswerPieChart />
                        {/* <h3 className="text-center mt-3 title-pie">User Answers Chart</h3> */}
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
        <ToastContainer position="top-right" />
      </div>
    </>
  )
}

export default PollDetailComponent;
