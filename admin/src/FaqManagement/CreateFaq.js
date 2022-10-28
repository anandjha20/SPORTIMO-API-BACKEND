import React from 'react';
import Header from "../Header";
import { Link } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import MUIRichTextEditor from 'mui-rte'
import { useState, useEffect } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function CreateFaq() {
    useEffect(() => {
        document.body.className = "main-body leftmenu faq_list";
        return () => {
          document.body.className = "main-body leftmenu";
        }
      }, []);
    //////////////category lsit api

    const navigate = useNavigate();

    const [data, setData] = useState([])
    const FaqList = async () => {
        await axios.get(`/web_api/faq_cat_list`)
            .then(res => {
                const userData = res.data.body;
                const data = userData
                setData(data);
                console.log(data);
            })
    }

    useEffect(() => {
        FaqList()
    }, [])


    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const [match, setMatch] = React.useState('');

    const myTheme = createTheme({
        // Set up your custom MUI theme here
    })


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



    ////////////////////////////////////////////////////////////////////

 const saveFormData = async (e) => {
        e.preventDefault();
        try {

            let cat_id = (e.target.elements.cat_id !== 'undefined') ? e.target.elements.cat_id.value : '';
            let question = (e.target.elements.question !== 'undefined') ? e.target.elements.question.value : '';
            let answer = (e.target.elements.answer !== 'undefined') ? e.target.elements.answer.value : '';
            let question_ara = (e.target.elements.question_ara !== 'undefined') ? e.target.elements.question_ara.value : '';
            let answer_ara = (e.target.elements.answer_ara !== 'undefined') ? e.target.elements.answer_ara.value : '';

            let dataToSend2 = {
             "cat_id": cat_id,
             "question": question,
             "answer": answer,
             "question_ara": question_ara,
             "answer_ara": answer_ara,
            }
            
            console.log("new values == ", dataToSend2);
            let token = localStorage.getItem("token");
            let header = ({ 'token': `${token}` });
            let options1 = ({ headers: header });
           
            axios.post(`/web_api/add_faq`, dataToSend2, options1)
            .then(response => {
                if (response.status) {
  
                  let data = response.data;
      
                  console.log(data.msg)
          
                  if (data.status) {   
                    e.target.reset();
                    
                   
                    navigate("/faq");
                    toast.success(data.msg);
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
                  toast.error(data.msg); 
              })


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
                                <h2 className="main-content-title tx-24 mg-b-5">Add Faq</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>

                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Faq Management</li>
                                </ol>
                            </div>

                            <div className="d-flex">
                                <div className="justify-content-center">
                                    <Link to="/faq">
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

                                                <form id="faqreset" onSubmit={(e) => saveFormData(e)} enctype="multipart/form-data" >
                                                    <div className="row">

                                                        <div className="col-lg-12 mb-3">
                                                            <label className="title-col mb-3">Category</label>
                                                            <FormControl fullWidth>
                                                                <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                                                                <Select labelId="demo-simple-select-label" id="demo-simple-select" name='cat_id' MenuProps={MenuProps} value={match} label="Match/league" onChange={handleChange}>
                                                                    {data.map((daTa) => {
                                                                        return (
                                                                            <MenuItem value={daTa._id}>{daTa.cat_name}</MenuItem>
                                                                        );
                                                                    })}
                                                                </Select>
                                                            </FormControl>

                                                        </div>


                                                        <div className="col-lg-12 mb-4">
                                                            <label className="title-col">Question <span className="text-blue">(English)</span></label>
                                                            <TextField id="filled-multiline-static" label="Enter Question" multiline rows={4} fullWidth name='question' variant="filled" />
                                                            {/*<div className="textarea">
                                                               <ThemeProvider theme={myTheme}>
                                                                    <MUIRichTextEditor label="Enter Question"  value={question} name='question' />
                                                                </ThemeProvider> 
                                                            </div>*/}
                                                        </div>

                                                        <div className="col-lg-12 mb-4">
                                                            <label className="title-col">Answer <span className="text-blue">(English)</span></label>
                                                            <TextField id="filled-multiline-static" label="Enter Answer" multiline rows={4} fullWidth name='answer' variant="filled" />
                                                            {/*<div className="textarea">
                                                               <ThemeProvider theme={myTheme}>
                                                                    <MUIRichTextEditor label="Enter Answer" name='answer' />
                                                                </ThemeProvider> 
                                                            </div>*/}
                                                        </div>
                                                          
                                                        {/* ///////////Arabic////////// */}
                                                        <div className="col-lg-12 mb-4">
                                                            <label className="title-col">Question <span className="text-blue">(Arabic)</span> </label>
                                                            <TextField id="filled-multiline-static" label="Enter Question" multiline rows={4} fullWidth name='question_ara' variant="filled" />
                                                            
                                                        </div>

                                                        <div className="col-lg-12 mb-4">
                                                            <label className="title-col">Answer <span className="text-blue">(Arabic)</span> </label>
                                                            <TextField id="filled-multiline-static" label="Enter Answer" multiline rows={4} fullWidth name='answer_ara' variant="filled" />
                                                        </div>

                                                        <div className="col-lg-12 text-end">
                                                            <Button type='submit' variant="contained" className="mr-3 btn-pd">Submit</Button>
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
              <ToastContainer position="top-right" />
            </div>
        </>
    );
}

export default CreateFaq;
