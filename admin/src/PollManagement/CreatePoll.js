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

import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

import { useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreatePoll() {

  const [showhide, setShowhide] = useState('');

  const [show, setShow] = useState('');

  const handleshowhide = (event) => {
    const getuser = event.target.value;
    setShowhide(getuser);
  }

  console.log('fee_type === ', showhide);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const [match, setMatch] = React.useState('');
  const [timeapp, setTimeapp] = React.useState('');
  const [minute, setMinute] = React.useState('');
  const [second, setSecond] = React.useState('');


  const handleChange = (event) => {
    setMatch(event.target.value);
  };

  const handleChange1 = (event) => {
    setTimeapp(event.target.value);
  };

  const handleChangeSecond = (event) => {
    setSecond(event.target.value);
  };

  const handleChangeMinute = (event) => {
    setMinute(event.target.value);
  };
  /// poll type select value get section 
  const [p_type, setP_type] = React.useState('Public Poll');
  const handleChangep_type = (event) => { setP_type(event.target.value); }

  /// Fess type select value get section 
  const [f_type, setF_type] = React.useState('');
  const handleChangef_type = (event) => { setF_type(event.target.value); }



  const [notis, setNotis] = React.useState(1);

  const notifun = (event) => {
    if (notis == 1) { setNotis(0); }
    if (notis == 0) { setNotis(1); }
    return false;
  };






  console.log(p_type);
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const FormData = async (e) => {
    e.preventDefault();

    try {

      // console.log('122 amount',e.target.elements.amount.value) ;
      let amt = (typeof e.target.elements.amount !== 'undefined') ? e.target.elements.amount.value : 0;




      let qus = (e.target.elements.qus.value) ? e.target.elements.qus.value : '';

      let ops_1 = (e.target.elements.ops_1 !== 'undefined') ? e.target.elements.ops_1.value : '';
      let ops_2 = (e.target.elements.ops_2 !== 'undefined') ? e.target.elements.ops_2.value : '';
      let ops_3 = (e.target.elements.ops_3 !== 'undefined') ? e.target.elements.ops_3.value : '';
      let ops_4 = (e.target.elements.ops_4 !== 'undefined') ? e.target.elements.ops_4.value : '';
      let noti_status = (e.target.elements.noti_status !== 'undefined') ? e.target.elements.noti_status.value : '';


      let sendData = {
        "match": match,
        "poll_type": p_type,
        "fee_type": showhide,
        "amount": amt,
        "apperance_time": timeapp,
        "time_duration": timeapp + ':' + second,

        "qus": qus,
        "ops_1": ops_1,
        "ops_2": ops_2,
        "ops_3": ops_3,
        "ops_4": ops_4,
        //  "ops_5": "d-5",
        //	"ans_ops": "ops_2",
        "noti_status": notis,

      }

      let token = localStorage.getItem("token");
      let header = ({ 'token': `${token}` });
      let options = ({ headers: header });

      // let options1 = { headers: { "Content-type": "application/json" } };
      let response = await axios.post('/add_poll', sendData, options);

      // const result = await axios('/add_poll',{ method: 'POST',data : sendData,headers: {
      //                                             // 'Authorization': `bearer ${token}`,
      //                                             'Content-Type': 'application/json'
      //                                           }
      //                                         })

      console.log('my fun call', response);

      if (response.status) {

        let data = response.data;

        if (data.status) {
          toast.success(data.msg);
        } else {
          toast.error('something went wrong please try again');
        }
      }
      else {
        toast.error('something went wrong please try again..');
      }


    } catch (err) { console.error(err); toast.error('some errror'); return false; }



  }


  return (
    <>

      <Header />

      <div className="main-content side-content pt-0">
        <div className="container-fluid">
          <div className="inner-body">

            <div className="page-header">
              <div>
                <h2 className="main-content-title tx-24 mg-b-5">Create Poll</h2>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Poll Management</li>
                </ol>
              </div>
              <div className="d-flex">
                <div className="justify-content-center">
                  <Link to="/poll" className="btn-link">
                  <i className="fal fa-angle-double-left"></i>&nbsp; Back
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

                        <form onSubmit={(e) => FormData(e)}>
                          <div className="row">
                            <div className="col-lg-12">
                              <label className="title-col">Poll Type</label>
                              <FormControl className="w-100">
                                {/* <FormLabel id="demo-radio-buttons-group-label">Create Poll</FormLabel> */}
                                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" value={p_type} name="radio-buttons-group">
                                  <div className="row  mb-0">
                                    <div className="col-lg-3" style={{ maxWidth: "23%" }}>
                                      <FormControlLabel value="Public Poll" control={<Radio />} label="Public Poll" onChange={handleChangep_type} />
                                    </div>
                                    <div className="col-lg-3 text-end">
                                      <FormControlLabel value="Private Poll" control={<Radio />} label="Private Poll" onChange={handleChangep_type} />
                                    </div>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                            </div>

                            <div className="col-lg-12 mb-3">
                              <label className="title-col">Select Match</label>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Match</InputLabel>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select"
                                  name="match"
                                  MenuProps={MenuProps} value={match} label="select match" onChange={handleChange}>
                                  <MenuItem value="Bali">Bali Utd vs Rans Nusantara</MenuItem>
                                  <MenuItem value="Persija">Persija vs Persita	</MenuItem>
                                  <MenuItem value="Dewa">Dewa United vs Arema</MenuItem>
                                </Select>
                                {/* <FormHelperText>Without label</FormHelperText> */}
                              </FormControl>

                            </div>


                            <div className="col-lg-12 mb-2">
                              <label className="title-col">Poll Fee</label>
                              <FormControl className="w-100">
                                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="free" name="radio-buttons-group">
                                  <div className="row  mb-2">
                                    <div className="col-lg-3" style={{ maxWidth: "21%" }}>
                                      <FormControlLabel value="Free" control={<Radio />} label="Free" onChange={(e) => (handleshowhide(e))} />
                                    </div>
                                    <div className="col-lg-3 text-end">
                                      <FormControlLabel value="Paid" control={<Radio />} label="Paid" onChange={(e) => (handleshowhide(e))} />
                                    </div>
                                  </div>
                                </RadioGroup>
                              </FormControl>


                              {
                                showhide === 'Paid' && (
                                  <div className="col-lg-12 p-0 mb-4">
                                    <FormControl fullWidth>
                                      <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                      <OutlinedInput id="outlined-adornment-amount" name='amount' startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        label="Amount"
                                      />
                                    </FormControl>
                                  </div>
                                )}

                            </div>



                            <div className="col-lg-6 mb-4">
                              <label className="title-col mb-3">Appearance Time</label>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Time of Appearance</InputLabel>
                                <Select labelId="demo-simple-select-label1" name='apperance_time' id="demo-simple-select1"
                                  MenuProps={MenuProps} value={timeapp} label="select match" onChange={handleChange1}>
                                  <MenuItem value="1">1</MenuItem>
                                  <MenuItem value="2">2</MenuItem>
                                  <MenuItem value="3">3</MenuItem>
                                  <MenuItem value="4">4</MenuItem>
                                  <MenuItem value="5">5</MenuItem>
                                  <MenuItem value="6">6</MenuItem>
                                  <MenuItem value="7">7</MenuItem>
                                  <MenuItem value="8">8</MenuItem>
                                  <MenuItem value="9">9</MenuItem>
                                  <MenuItem value="10">10</MenuItem>
                                  <MenuItem value="11">11</MenuItem>
                                  <MenuItem value="12">12</MenuItem>
                                  <MenuItem value="13">13</MenuItem>
                                  <MenuItem value="14">14</MenuItem>
                                  <MenuItem value="15">15</MenuItem>
                                  <MenuItem value="16">16</MenuItem>
                                  <MenuItem value="17">17</MenuItem>
                                  <MenuItem value="18">18</MenuItem>
                                  <MenuItem value="19">19</MenuItem>
                                  <MenuItem value="21">20</MenuItem>
                                  <MenuItem value="22">21</MenuItem>
                                  <MenuItem value="23">22</MenuItem>
                                  <MenuItem value="24">23</MenuItem>
                                  <MenuItem value="25">24</MenuItem>
                                  <MenuItem value="25">25</MenuItem>
                                  <MenuItem value="25">26</MenuItem>
                                  <MenuItem value="27">27</MenuItem>
                                  <MenuItem value="28">28</MenuItem>
                                  <MenuItem value="29">29</MenuItem>
                                  <MenuItem value="30">30</MenuItem>
                                  <MenuItem value="31">31</MenuItem>
                                  <MenuItem value="32">32</MenuItem>
                                  <MenuItem value="33">33</MenuItem>
                                  <MenuItem value="34">34</MenuItem>
                                  <MenuItem value="35">35</MenuItem>
                                  <MenuItem value="36">36</MenuItem>
                                  <MenuItem value="37">37</MenuItem>
                                  <MenuItem value="38">38</MenuItem>
                                  <MenuItem value="39">39</MenuItem>
                                  <MenuItem value="10">40</MenuItem>
                                  <MenuItem value="41">41</MenuItem>
                                  <MenuItem value="42">42</MenuItem>
                                  <MenuItem value="43">43</MenuItem>
                                  <MenuItem value="44">44</MenuItem>
                                  <MenuItem value="45">45</MenuItem>
                                  <MenuItem value="46">46</MenuItem>
                                  <MenuItem value="47">47</MenuItem>
                                  <MenuItem value="48">48</MenuItem>
                                  <MenuItem value="49">49</MenuItem>
                                  <MenuItem value="51">50</MenuItem>
                                  <MenuItem value="52">51</MenuItem>
                                  <MenuItem value="53">52</MenuItem>
                                  <MenuItem value="54">53</MenuItem>
                                  <MenuItem value="55">54</MenuItem>
                                  <MenuItem value="55">55</MenuItem>
                                  <MenuItem value="56">56</MenuItem>
                                  <MenuItem value="57">57</MenuItem>
                                  <MenuItem value="58">58</MenuItem>
                                  <MenuItem value="59">59</MenuItem>
                                  <MenuItem value="60">60</MenuItem>

                                  <MenuItem value="61">61</MenuItem>
                                  <MenuItem value="62">62</MenuItem>
                                  <MenuItem value="63">63</MenuItem>
                                  <MenuItem value="64">64</MenuItem>
                                  <MenuItem value="65">65</MenuItem>
                                  <MenuItem value="66">66</MenuItem>
                                  <MenuItem value="67">67</MenuItem>
                                  <MenuItem value="68">68</MenuItem>
                                  <MenuItem value="69">69</MenuItem>

                                  <MenuItem value="70">70</MenuItem>
                                  <MenuItem value="72">71</MenuItem>
                                  <MenuItem value="73">72</MenuItem>
                                  <MenuItem value="74">73</MenuItem>
                                  <MenuItem value="75">74</MenuItem>
                                  <MenuItem value="75">75</MenuItem>
                                  <MenuItem value="75">76</MenuItem>
                                  <MenuItem value="77">77</MenuItem>
                                  <MenuItem value="78">78</MenuItem>
                                  <MenuItem value="79">79</MenuItem>
                                  <MenuItem value="80">80</MenuItem>

                                  <MenuItem value="80">80</MenuItem>
                                  <MenuItem value="82">81</MenuItem>
                                  <MenuItem value="83">82</MenuItem>
                                  <MenuItem value="84">83</MenuItem>
                                  <MenuItem value="85">84</MenuItem>
                                  <MenuItem value="85">85</MenuItem>
                                  <MenuItem value="85">86</MenuItem>
                                  <MenuItem value="87">87</MenuItem>
                                  <MenuItem value="88">88</MenuItem>
                                  <MenuItem value="89">89</MenuItem>
                                  <MenuItem value="90">90</MenuItem>




                                </Select>
                                {/* <FormHelperText>Without label</FormHelperText> */}
                              </FormControl>
                            </div>

                            <div className="col-lg-6 mb-4">
                              <label className="title-col mb-3">Duration</label>
                              <div className="row">

                                <div className="col-lg-6">
                                  <FormControl fullWidth>
                                    <InputLabel id="minute">Minute</InputLabel>
                                    <Select labelId="minute" name='minute' id="minute"
                                      MenuProps={MenuProps} value={minute} label="minute" onChange={handleChangeMinute}>
                                      <MenuItem value="1">1</MenuItem>
                                      <MenuItem value="2">2</MenuItem>
                                      <MenuItem value="3">3</MenuItem>
                                      <MenuItem value="4">4</MenuItem>
                                      <MenuItem value="5">5</MenuItem>
                                      <MenuItem value="6">6</MenuItem>
                                      <MenuItem value="7">7</MenuItem>
                                      <MenuItem value="8">8</MenuItem>
                                      <MenuItem value="9">9</MenuItem>
                                      <MenuItem value="10">10</MenuItem>
                                      <MenuItem value="11">11</MenuItem>
                                      <MenuItem value="12">12</MenuItem>
                                      <MenuItem value="13">13</MenuItem>
                                      <MenuItem value="14">14</MenuItem>
                                      <MenuItem value="15">15</MenuItem>
                                      <MenuItem value="16">16</MenuItem>
                                      <MenuItem value="17">17</MenuItem>
                                      <MenuItem value="18">18</MenuItem>
                                      <MenuItem value="19">19</MenuItem>
                                      <MenuItem value="21">20</MenuItem>
                                      <MenuItem value="22">21</MenuItem>
                                      <MenuItem value="23">22</MenuItem>
                                      <MenuItem value="24">23</MenuItem>
                                      <MenuItem value="25">24</MenuItem>
                                      <MenuItem value="25">25</MenuItem>
                                      <MenuItem value="25">26</MenuItem>
                                      <MenuItem value="27">27</MenuItem>
                                      <MenuItem value="28">28</MenuItem>
                                      <MenuItem value="29">29</MenuItem>
                                      <MenuItem value="30">30</MenuItem>
                                      <MenuItem value="31">31</MenuItem>
                                      <MenuItem value="32">32</MenuItem>
                                      <MenuItem value="33">33</MenuItem>
                                      <MenuItem value="34">34</MenuItem>
                                      <MenuItem value="35">35</MenuItem>
                                      <MenuItem value="36">36</MenuItem>
                                      <MenuItem value="37">37</MenuItem>
                                      <MenuItem value="38">38</MenuItem>
                                      <MenuItem value="39">39</MenuItem>
                                      <MenuItem value="10">40</MenuItem>
                                      <MenuItem value="41">41</MenuItem>
                                      <MenuItem value="42">42</MenuItem>
                                      <MenuItem value="43">43</MenuItem>
                                      <MenuItem value="44">44</MenuItem>
                                      <MenuItem value="45">45</MenuItem>
                                      <MenuItem value="46">46</MenuItem>
                                      <MenuItem value="47">47</MenuItem>
                                      <MenuItem value="48">48</MenuItem>
                                      <MenuItem value="49">49</MenuItem>
                                      <MenuItem value="51">50</MenuItem>
                                      <MenuItem value="52">51</MenuItem>
                                      <MenuItem value="53">52</MenuItem>
                                      <MenuItem value="54">53</MenuItem>
                                      <MenuItem value="55">54</MenuItem>
                                      <MenuItem value="55">55</MenuItem>
                                      <MenuItem value="55">56</MenuItem>
                                      <MenuItem value="57">57</MenuItem>
                                      <MenuItem value="58">58</MenuItem>
                                      <MenuItem value="59">59</MenuItem>
                                      <MenuItem value="00">00</MenuItem>
                                    </Select>
                                    {/* <FormHelperText>Without label</FormHelperText> */}
                                  </FormControl>
                                </div>
                                <div className="col-lg-6">
                                  <FormControl fullWidth>
                                    <InputLabel id="Second">Second</InputLabel>
                                    <Select labelId="Second" name='second' id="demo-simple-select"
                                      MenuProps={MenuProps} value={second} label="Second" onChange={handleChangeSecond}>
                                      <MenuItem value="1">1</MenuItem>
                                      <MenuItem value="2">2</MenuItem>
                                      <MenuItem value="3">3</MenuItem>
                                      <MenuItem value="4">4</MenuItem>
                                      <MenuItem value="5">5</MenuItem>
                                      <MenuItem value="6">6</MenuItem>
                                      <MenuItem value="7">7</MenuItem>
                                      <MenuItem value="8">8</MenuItem>
                                      <MenuItem value="9">9</MenuItem>
                                      <MenuItem value="10">10</MenuItem>
                                      <MenuItem value="11">11</MenuItem>
                                      <MenuItem value="12">12</MenuItem>
                                      <MenuItem value="13">13</MenuItem>
                                      <MenuItem value="14">14</MenuItem>
                                      <MenuItem value="15">15</MenuItem>
                                      <MenuItem value="16">16</MenuItem>
                                      <MenuItem value="17">17</MenuItem>
                                      <MenuItem value="18">18</MenuItem>
                                      <MenuItem value="19">19</MenuItem>
                                      <MenuItem value="21">20</MenuItem>
                                      <MenuItem value="22">21</MenuItem>
                                      <MenuItem value="23">22</MenuItem>
                                      <MenuItem value="24">23</MenuItem>
                                      <MenuItem value="25">24</MenuItem>
                                      <MenuItem value="25">25</MenuItem>
                                      <MenuItem value="25">26</MenuItem>
                                      <MenuItem value="27">27</MenuItem>
                                      <MenuItem value="28">28</MenuItem>
                                      <MenuItem value="29">29</MenuItem>
                                      <MenuItem value="30">30</MenuItem>
                                      <MenuItem value="31">31</MenuItem>
                                      <MenuItem value="32">32</MenuItem>
                                      <MenuItem value="33">33</MenuItem>
                                      <MenuItem value="34">34</MenuItem>
                                      <MenuItem value="35">35</MenuItem>
                                      <MenuItem value="36">36</MenuItem>
                                      <MenuItem value="37">37</MenuItem>
                                      <MenuItem value="38">38</MenuItem>
                                      <MenuItem value="39">39</MenuItem>
                                      <MenuItem value="10">40</MenuItem>
                                      <MenuItem value="41">41</MenuItem>
                                      <MenuItem value="42">42</MenuItem>
                                      <MenuItem value="43">43</MenuItem>
                                      <MenuItem value="44">44</MenuItem>
                                      <MenuItem value="45">45</MenuItem>
                                      <MenuItem value="46">46</MenuItem>
                                      <MenuItem value="47">47</MenuItem>
                                      <MenuItem value="48">48</MenuItem>
                                      <MenuItem value="49">49</MenuItem>
                                      <MenuItem value="51">50</MenuItem>
                                      <MenuItem value="52">51</MenuItem>
                                      <MenuItem value="53">52</MenuItem>
                                      <MenuItem value="54">53</MenuItem>
                                      <MenuItem value="55">54</MenuItem>
                                      <MenuItem value="55">55</MenuItem>
                                      <MenuItem value="55">56</MenuItem>
                                      <MenuItem value="57">57</MenuItem>
                                      <MenuItem value="58">58</MenuItem>
                                      <MenuItem value="59">59</MenuItem>
                                      <MenuItem value="00">00</MenuItem>
                                    </Select>
                                    {/* <FormHelperText>Without label</FormHelperText> */}
                                  </FormControl>
                                </div>
                              </div>


                            </div>




                            <div className="col-lg-12 mb-3">
                              <FormGroup>
                                <FormControlLabel name='noti_status' onChange={(e) => notifun()} control={<Checkbox defaultChecked />} label="Send Notification" />
                              </FormGroup>

                            </div>

                            <div className="col-lg-12 mb-4">
                              <label className="title-col">Question</label>
                              <TextField id="filled-multiline-static" name='qus' label="Enter Question" multiline rows={4} fullWidth defaultValue="" variant="filled" />

                            </div>


                            <div className="col-lg-6 mb-4">
                              <TextField id="filled-basic" name='ops_1' fullWidth label="Answer 1" variant="filled" />
                            </div>

                            <div className="col-lg-6 mb-4">
                              <TextField id="filled-basic1" name='ops_2' fullWidth label="Answer 2" variant="filled" />
                            </div>

                            <div className="col-lg-12">

                              {
                                show ? <div className="row">
                                  <div className="col-lg-6 mb-4">
                                    <TextField id="filled-basic1" name='ops_3' fullWidth label="Answer 3" variant="filled" />
                                  </div>
                                  <div className="col-lg-6 mb-4">
                                    <TextField id="filled-basic1" name='ops_4' fullWidth label="Answer 4" variant="filled" />
                                  </div>
                                </div> : null
                              }
                            </div>
                            <div className="col-lg-12 text-end">
                              <Button variant="contained" onClick={(ButtonText) => setShow(!show)} className="buttonStyle">
                                {
                                  !show ? <span>
                                    <Button variant="contained" style={{ float: "right" }}> Show More  </Button></span> :
                                    <span><Button variant="contained" style={{ float: "right", backgroundColor: "#ff4e17b3" }}>Show Less</Button></span>
                                }
                              </Button>
                            </div>

                            <div className="col-lg-12 text-end">
                              <Button type='submit' className="mr-3 btn-pd btnBg">Submit</Button>
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
      <ToastContainer position="top-right" />
    </>
  )
}

export default CreatePoll;
