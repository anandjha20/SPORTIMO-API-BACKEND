import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import {useEffect} from 'react';


function GameEngagementQuestions() {

  useEffect(() => {
    // 👇 add class to body element
    document.body.classList.add('bg-salmon');

  }, []);

const [showhide, setShowhide] = useState('');

const [show, setShow] = useState('');



const handleshowhide = (event) => {
const getuser = event.target.value;
setShowhide(getuser);
}

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
            <h2 className="main-content-title tx-24 mg-b-5">Add GEQ</h2>
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
                  <div className="col-lg-8">

                    <form>
                      <div className="row">
                       
                        <div className="col-lg-12 mb-3">
                        <label className="title-col mb-3">Match/league</label>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Match/league</InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" 
                            MenuProps={MenuProps} value={match} label="Match/league" onChange={handleChange}>
                              <MenuItem value="Bali">Bali Utd vs Rans Nusantara</MenuItem>
                              <MenuItem value="Persija">Persija vs Persita	</MenuItem>
                              <MenuItem value="Dewa">Dewa United vs Arema</MenuItem>
                            </Select>
                            {/* <FormHelperText>Without label</FormHelperText> */}
                          </FormControl>

                        </div>




                


                        <div className="col-lg-12 mb-4">
                        <label className="title-col">Question</label>
                          <TextField id="filled-multiline-static" label="Enter Question" multiline rows={4} fullWidth defaultValue="" variant="filled" />

                        </div>


                        <div className="col-lg-6 mb-4">
                          <TextField id="filled-basic" fullWidth label="Answer 1" variant="filled" />
                        </div>

                        <div className="col-lg-6 mb-4">
                          <TextField id="filled-basic1" fullWidth label="Answer 2" variant="filled" />
                        </div>

                        <div className="col-lg-12">

                        {
                            show? <div className="row">
                                 <div className="col-lg-6 mb-4">
                                    <TextField id="filled-basic1" fullWidth label="Answer 3" variant="filled" />
                                    </div>
                                 <div className="col-lg-6 mb-4">
                                    <TextField id="filled-basic1" fullWidth label="Answer 4" variant="filled" />
                                    </div>
                                 <div className="col-lg-6 mb-4">
                                    <TextField id="filled-basic1" fullWidth label="Answer 5" variant="filled" />
                                    </div>
                            </div> : null
                        }
                        </div>
                        <div className="col-lg-12 text-end">
                          <Button variant="contained" onClick={(ButtonText) => setShow(!show) } className="buttonStyle">
                          {
                             !show? <span> 
                                 <Button variant="contained"  style={{ float: "right" }}> Show More  </Button></span> :
                                 <span><Button variant="contained"  style={{ float: "right", backgroundColor : "#ff4e17b3" }}>Show Less</Button></span>
                           }
                          </Button>
                        </div>

                        
                        <div className="col-lg-12 mb-2">
                          <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Send Notification" />
                          </FormGroup>

                        </div>


                        <div className="col-lg-12 text-end">
                          <Button type='button' variant="contained" className="mr-3 btn-pd">Submit</Button>
                          <Button type='reset' variant="contained" className="btn btn-dark btn-pd">Reset</Button>
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
</>
)
}

export default GameEngagementQuestions;
