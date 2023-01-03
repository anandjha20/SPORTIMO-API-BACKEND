import React from "react";
import TextField from '@mui/material/TextField';
import Header from "../Header";
import { Link } from "react-router-dom";
import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import SweetAlert2 from 'react-sweetalert2';
// import { withSwal } from 'react-sweetalert2';
import Swal from 'sweetalert2'

export default function CreateDefaultMessage() {


    const handleClickOpen = (setData) => {
        const opnData = setData
        setDmsg(opnData)
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

    const [data, setData] = useState([])
    const [catView, setCat] = useState([])
    const [opnData, setDmsg] = useState([])
    const [open, setOpen] = useState(false);

    let token = localStorage.getItem("token");
    let header = ({ 'token': `${token}` });
    let options1 = ({ headers: header });

    const onCloseModal = () => setOpen(false);
    const DefaultStausMessage = async () => {
        await axios.get(`/web_api/get_defaultMsg`)
            .then(res => {
                const userData = res.data.body;
                setData(userData);
            })
    }

    useEffect(() => {
        DefaultStausMessage()
    }, []);

    const columns = [
        { title: 'Default Status Message (English)', field: 'd_msg' },
        { title: 'Default Status Message (Arabic)'  , field: 'd_msg_ara' },
        { title: 'Default Status Message (French)'  , field: 'd_msg_fr' },
    ]

    ///////////////////////////  Add Default Status Message Api Call  /////////////////////////////////////////

    const saveFormData = async (e) => {
        e.preventDefault();
        try {

            let d_msg = (e.target.elements.d_msg !== 'undefined') ? e.target.elements.d_msg.value : '';
            let d_msg_ara = (e.target.elements.d_msg_ara !== 'undefined') ? e.target.elements.d_msg_ara.value : '';
            let d_msg_fr = (e.target.elements.d_msg_fr !== 'undefined') ? e.target.elements.d_msg_fr.value : '';

            let dataToSend2 = {
                "d_msg": d_msg,
                "d_msg_ara": d_msg_ara,
                "d_msg_fr": d_msg_fr,
            }

            console.log("new values == ", dataToSend2);


            axios.post(`/web_api/addDefaultMsg`, dataToSend2, options1)
                .then(response => {
                    if (response.status) {

                        let data = response.data;

                        console.log(data.msg)

                        if (data.status) {

                            toast.success("Status message added successfully");

                            e.target.reset();
                            return axios.get("/web_api/get_defaultMsg", options1)
                                .then(res => {
                                    const userData = res.data.body;
                                    setData(userData);
                                })

                        } else {
                            toast.error(data.msg);
                        }
                    }
                    else {
                        toast.error(data.msg);
                    }

                })
                .catch(error => {
                    console.log(this.state);
                })

        } catch (err) { console.error(err); toast.error('some errror'); return false; }
    }


    ///////////////// delete tips tricks api call  /////////////////
    const deleteCategory = (_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {         
            //   let sendData = { id: _id }
              axios.delete(`/web_api/defaultMsg_delete/${_id}`, options1)
                  .then(res => {
                      if (res.status) {
                          let data = res.data;
                          if (data.status) {
                              Swal.fire(
                                'Deleted!',
                                 "Default message deleted successfully",
                                'success'
                              )
                              return axios.get("/web_api/get_defaultMsg", options1)
                                  .then(res => {
                                      const userData = res.data.body;
                                      setData(userData);
                                  })
                          } else {
                              toast.error(data.msg);
                          }
                      }
                      else {
                        toast.error(data.msg);
                      }
      
                  })
            }
          })
    }


    ///////////////// Update complaint category /////////////////
    const UpdateFormData = async (e) => {
        // console.log(_id);
        e.preventDefault();
        try {

            let d_msg = (e.target.elements.d_msg !== 'undefined') ? e.target.elements.d_msg.value : '';
            let d_msg_ara = (e.target.elements.d_msg_ara !== 'undefined') ? e.target.elements.d_msg_ara.value : '';
            let d_msg_fr = (e.target.elements.d_msg_fr !== 'undefined') ? e.target.elements.d_msg_fr.value : '';

            let dataToSend2 = {
                "d_msg": d_msg,
                "d_msg_ara": d_msg_ara,
                "d_msg_fr": d_msg_fr,
            }
            const id = opnData._id
            console.log("new values == ", dataToSend2);
            axios.put(`/web_api/defaultMsg_update/${id}`, dataToSend2, options1)
                .then(res => {
                    if (res.status) {

                        let data = res.data;
                        if (data.status) {
                            
                            toast.success(data.msg);
                            setOpen(false);
                            return DefaultStausMessage();   
                        } else {
                            toast.error(data.msg);
                        }
                    }
                    else {
                        toast.error(data.msg);
                    }
                })
                .catch(error => {
                    console.log(this.state);
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
                                <h2 className="main-content-title tx-24 mg-b-5">Default Status Message</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Default Status Message</li>
                                </ol>
                            </div>


                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">
                            {/* <button onClick={handleClick}> Open  </button> */}
                                <div className="card custom-card">
                                    <div className="card-body">
                                        <div className="row d-flex">
                                            <div className="col-lg-5">

                                                <form className="mt-3" onSubmit={(e) => saveFormData(e)}>
                                                    <h6 className="MuiTypography-root MuiTypography-h6 text-white mb-4">Add Default Status Message</h6>

                                                     <label className="title-col">Default Status <span className="text-blue">(English)</span></label>
                                                      <input id="categor" className="form-control mb-4" name="d_msg"
                                                         type="text"
                                                        />

                                                 
                                                      <label className="title-col">Default Status <span className="text-blue">(Arabic)</span></label>
                                                      <input  id="categor" className="form-control mb-4" name="d_msg_ara"
                                                         type="text"
                                                        />

                                                        <label className="title-col">Default Status <span className="text-blue">(French)</span></label>
                                                      <input  id="categor" className="form-control mb-4" name="d_msg_fr"
                                                         type="text"
                                                        />

                                                    <div className="mt-3">
                                                        <Button type='submit' className="mr-3 btn-pd btnBg">Add</Button>
                                                        <Button type='reset' variant="contained" className="btn btn-dark btn-pd">Reset</Button>
                                                    </div>
                                                </form>
                                            </div>
                                            {/* <div className="col-lg-1"></div> */}
                                            <div className="col-lg-7">
                                                <div className="row">
                                                    <div className="col-lg-12 title-small">
                                                        <MaterialTable 
                                                            title="Default Status Message"
                                                            columns={columns}
                                                            data={data}
                                                            actions={[
                                                                {
                                                                    icon: 'edit',
                                                                    iconProps: { style: { color: "#6259ca" } },
                                                                    tooltip: 'Edit Category',
                                                                    onClick: (event, setData) => { handleClickOpen(setData); }
                                                                },
                                                                {
                                                                    icon: 'delete',
                                                                    iconProps: { style: { color: "#ff0000" } },
                                                                    tooltip: 'Delete Category',
                                                                    onClick: (event, setData) => { deleteCategory(setData._id); }
                                                                },
                                                            ]}
                                                            options={{
                                                                search: true,
                                                                actionsColumnIndex: -1,
                                                                showFirstLastPageButtons: true,
                                                                pageSize: 5,
                                                                pageSizeOptions: [5, 20, 50]
                                                            }}
                                                           
                                                        />
                                                    </div>
                                                </div>

                                                <Dialog className="notifi-style" open={open} onClose={handleClose}>
                                                  <form onSubmit={(e) => UpdateFormData(e)}>
                                                    <DialogTitle><i className="fad fa-comments-alt"></i> &nbsp;Default Status Message</DialogTitle>
                                                    <DialogContent>
                                                    {/* <DialogContentText>
                                                        To subscribe to this website, please enter your email address here. We
                                                        will send updates occasionally.
                                                    </DialogContentText> */}
                                                    <TextField multiline rows={2}
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        name="d_msg"
                                                        label="English"
                                                        type="text"
                                                        fullWidth
                                                        variant="standard"
                                                        defaultValue={opnData.d_msg}
                                                                
                                                    />
                                                    <TextField multiline rows={2}
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        name="d_msg_ara"
                                                        label="Arabic"
                                                        type="text"
                                                        fullWidth
                                                        variant="standard"
                                                        defaultValue={opnData.d_msg_ara}
                                                                
                                                    />
                                                    <TextField multiline rows={2}
                                                        autoFocus
                                                        margin="dense"
                                                        id="name"
                                                        name="d_msg_fr"
                                                        label="French"
                                                        type="text"
                                                        fullWidth
                                                        variant="standard"
                                                        defaultValue={opnData.d_msg_fr}
                                                                
                                                    />
                                                    </DialogContent>
                                                    
                                                    <DialogActions className="mb-2">
                                                    
                                                    <Button className="mr-3" type="button" onClick={handleClose}>Cancel</Button>
                                                    <Button variant="contained" type="submit" className="mr-3 btn-pd btnBg">Submit</Button>
                                                    </DialogActions>
                                                    </form>
                                                </Dialog>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" />
        </>
    );
}

