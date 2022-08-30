import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import { createReactEditorJS } from 'react-editor-js'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Table from '@editorjs/table'
import Image from '@editorjs/image'
import CheckList from '@editorjs/checklist'
import SimpleImage from '@editorjs/simple-image'
import RichTextEditor from "./RichTextEditor";
import { useNavigate } from 'react-router-dom';

function AddContent() {

  const navigate = useNavigate();
  const EDITOR_JS_TOOLS = {
    table: Table,
    image: Image,
    checkList: CheckList,
    simpleImage: SimpleImage,
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


    ////////////////////////////////////////////////////////////////////
    const [data, setData] = useState([])
    const saveFormData = async (e) => {
      e.preventDefault();
      try {

          let type = (e.target.elements.type !== 'undefined') ? e.target.elements.type.value : '';
          // let content_data = {value}

          let dataToSend2 = {
           "type": type,
           "content_data": value,
          }
          console.log("new values == ", dataToSend2);
          
          let token = localStorage.getItem("token");
          let header = ({ 'token': `${token}` });
          let options1 = ({ headers: header });

          axios.post(`/content_add`, dataToSend2, options1)
          .then(response => {
              if (response.status) {

                let data = response.data;
                console.log(data.msg)
                if (data.status) {   
                  e.target.reset();
                  navigate(`/content`);
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

  const ReactEditorJS = createReactEditorJS()


  const [value, setValue] = useState("");
  const getValue = (value) => {
    setValue(value);
  };

  return (
    <>

      <Header />

      <div className="main-content side-content pt-0">
        <div className="container-fluid">
          <div className="inner-body">

            <div className="page-header">
              <div>
                <h2 className="main-content-title tx-24 mg-b-5">Add Content</h2>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>

                  <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Content Management</li>
                </ol>
              </div>

              <div className="d-flex">
                <div className="justify-content-center">
                  <Link to="/content">
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

                        <form onSubmit={(e) => saveFormData(e)} encType="multipart/form-data">
                          <div className="row">

                            <div className="col-lg-12 mb-3">
                              <label className="title-col mb-3">Content Type</label>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Content Type</InputLabel>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select" name='type'
                                  MenuProps={MenuProps} value={match} label="Content Type" onChange={handleChange}>
                                  <MenuItem value="about_us">About Us</MenuItem>
                                  <MenuItem value="terms_and_conditions">Terms and Conditions</MenuItem>
                                  <MenuItem value="privacy_policy">Privacy Policy</MenuItem>
                                </Select>
                                {/* <FormHelperText>Without label</FormHelperText> */}
                              </FormControl>

                            </div>

                            <div className="col-lg-12 mb-4">
                              <label className="title-col">CONTENT</label>
                              {/* <TextField id="filled-multiline-static" label="Enter Question" multiline rows={4} fullWidth defaultValue="" variant="filled" /> */}
                              {/* <ReactEditorJS  name='content_data' tools={EDITOR_JS_TOOLS}  setValu>
                              </ReactEditorJS> */}
                             <RichTextEditor initialValue="" getValue={getValue} />
                            
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
  )
}

export default AddContent;
