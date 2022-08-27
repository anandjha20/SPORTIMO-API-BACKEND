import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import UserAnswerPieChart from "./UserAnswerPieChart";
import TextField  from "@mui/material/TextField";
import Button  from "@mui/material/Button";


function ViewDetailGameEnagenent() {


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
            <h2 className="main-content-title tx-24 mg-b-5">View Detail GEQ</h2>
         
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/home">Home</Link>
              </li>

              <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Game Engagement Questions</li>
            </ol>
          </div>

          <div className="d-flex">
								<div className="justify-content-center">
							       <Link  to="/geq">
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
                  <div className="col-lg-7">

                    <form>
                      <div className="row">

                        <div className="col-lg-12 mb-3">
                          <label className="title-col mb-3">Match/league</label>
                          <TextField id="filled-basic" fullWidth label="MATCH/LEAGU"  defaultValue="Bali Utd vs Rans Nusantara" variant="filled" 
                           InputProps={{readOnly: true, }} />
                        </div>


                        <div className="col-lg-12 mb-4">
                          <label className="title-col">Question</label>
                          <TextField id="filled-multiline-static"
                           label="Enter Question" multiline rows={3} InputProps={{readOnly: true, }} fullWidth defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry." variant="filled" />

                        </div>


                        <div className="col-lg-6 mb-4">
                          <TextField id="filled-basic" multiline rows={2} fullWidth label="Answer 1"  
                          defaultValue="printing and typesetting industry."  variant="filled" InputProps={{readOnly: true, }} 
                         />
                        </div>

                        <div className="col-lg-6 mb-4">
                          <TextField id="filled-basic1"  multiline rows={2} fullWidth label="Answer 2"  defaultValue="printing and typesetting industry."  variant="filled" InputProps={{readOnly: true, }} />
                        </div>

                            <div className="col-lg-6 mb-4">
                              <TextField id="filled-basic1"  multiline rows={2} fullWidth label="Answer 3"  defaultValue="printing and typesetting industry."  variant="filled" InputProps={{readOnly: true, }} />
                            </div>
                            <div className="col-lg-6 mb-4">
                              <TextField id="filled-basic1"  multiline rows={2} fullWidth label="Answer 4"  defaultValue="printing and typesetting industry."  variant="filled" InputProps={{readOnly: true, }} />
                            </div>
                            <div className="col-lg-6 mb-4">
                              <TextField id="filled-basic1"  multiline rows={2} fullWidth label="Answer 5"  defaultValue="printing and typesetting industry."  variant="filled" InputProps={{readOnly: true, }} />
                            </div>
                          </div> 
                       
                    </form>
                  </div>


                  <div className="col-lg-5">
                  <UserAnswerPieChart />
                  <h3 className="text-center mt-3 title-pie">User Answers Chart</h3>
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

export default ViewDetailGameEnagenent;
