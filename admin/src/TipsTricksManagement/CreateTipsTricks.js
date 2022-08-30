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

export default function CreateTipsTricks() {

    const [data, setData] = useState([])
    const [catView, setCat] = useState([])
    const [open, setOpen] = useState(false);

    let token = localStorage.getItem("token");
    let header = ({ 'token': `${token}` });
    let options1 = ({ headers: header });
    
    const onOpenModal = (_id) => 
    {
      axios.get(`/get_tips/${_id}`, options1 )
        .then(res => {
          const catView = res.data.body[0];
          setCat(catView);
          setOpen(true);
          console.log(catView); 
        })
    }
    
    const onCloseModal = () => setOpen(false);   
    const TipsTricksList = async () =>
    {
        await axios.get(`/get_tip_list`)
        .then(res => {
          const userData = res.data.body;
          setData(userData);
        })
    }

  useEffect(() => {
    TipsTricksList()
  }, []);

 const columns =[   { title: 'Tips & Tricks', field: 'tips_trick' }, ] 

///////////////////////////  Add Tips & Tricks Api Call  /////////////////////////////////////////

    const saveFormData = async (e) => {
        e.preventDefault();
        try {

            let tips_trick = (e.target.elements.tips_trick !== 'undefined') ? e.target.elements.tips_trick.value : '';

            let dataToSend2 = {
                "tips_trick": tips_trick,
            }

            console.log("new values == ", dataToSend2);


            axios.post(`/add_tips`, dataToSend2, options1)
                .then(response => {
                    if (response.status) {

                        let data = response.data;

                        console.log(data.msg)

                        if (data.status) {

                            toast.success(data.msg);

                            e.target.reset();
                            return axios.get("/get_tip_list", options1)
                            .then(res => {
                                const userData = res.data.body;
                                setData(userData);
                            })
                            
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
                })

        } catch (err) { console.error(err); toast.error('some errror'); return false; }
    }


///////////////// delete tips tricks api call  /////////////////
    const deleteCategory = (_id) => {  
        let sendData = { id : _id  }
        axios.delete(`/delete_tip/${_id}`, options1)
            .then(res => {
                if (res.status) {
                    let data = res.data;

                    if (data.status) { 
                        toast.success(data.msg);
                         return axios.get("/get_tip_list", options1)
                            .then(res => {
                                const userData = res.data.body;
                                setData(userData);
                            })
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
            })
    }


 ///////////////// Update complaint category /////////////////
 const UpdateFormData = async (e) => {
    e.preventDefault();
    try {

        let tips_trick = (e.target.elements.tips_trick !== 'undefined') ? e.target.elements.tips_trick.value : '';
        let id = (e.target.elements.id !== 'undefined') ? e.target.elements.id.value : '';
        let dataToSend2 = {
            "tips_trick": tips_trick,
            "id": id,
        }
        console.log("new values == ", dataToSend2);
        axios.put(`/update_tips`, dataToSend2, options1)
            .then(res => {
                if (res.status) {

                    let data = res.data;
                    if (data.status) {
                        toast.success(data.msg);
                        setOpen(false);
                        return axios.get("/get_tip_list", options1)
                        .then(res => {
                            const userData = res.data.body;
                            setData(userData);
                        })
                    } else {
                        toast.error('something went wrong please try again');
                    }
                }
                else {
                    toast.error('something went wrong please try again..'); }
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
                                <h2 className="main-content-title tx-24 mg-b-5">Tips & Tricks</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Tips & Tricks</li>
                                </ol>
                            </div>


                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">

                                <div className="card custom-card">
                                    <div className="card-body">
                                        <div className="row d-flex">
                                            <div className="col-lg-5">

                                                <form className="mt-3" onSubmit={(e) => saveFormData(e)}>
                                                    <h6 className="MuiTypography-root MuiTypography-h6 text-white mb-4">Add Tips & Tricks</h6>

                                                    <TextField id="categor" className="filter-input" name="tips_trick"
                                                        label="Add Tips & Tricks" fullWidth type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />

                                                    <div className="mt-3">
                                                        <Button type='submit'  className="mr-3 btn-pd btnBg">Add</Button>
                                                        <Button type='reset' variant="contained" className="btn btn-dark btn-pd">Reset</Button>
                                                    </div>
                                                </form>
                                            </div>
                                            {/* <div className="col-lg-1"></div> */}
                                            <div className="col-lg-7">
                                            <div className="row">
                                            <div className="col-lg-12">
                                                <MaterialTable
                                                    title="Tips & Tricks"
                                                    columns={columns}
                                                    data={data}
                                                    actions={[
                                                        {
                                                            icon: 'edit',
                                                            iconProps: { style: { color: "#6259ca" } },
                                                            tooltip: 'Edit Category',
                                                            onClick: (event, setData) => { onOpenModal(setData._id); }
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

                                         <Modal open={open} onClose={onCloseModal} center>
                                                      <h2 className="mb-4 text-white">Update Category</h2>
                                                    <div className="mx-500">
                                                        <form className="mt-3 w-100"  onSubmit={(e) => UpdateFormData(e)}>
                                                        <div className="form-group mb-4"> <label className="tx-medium">Update Category</label>
                                                          <input type="hidden" className="form-control" name="id" defaultValue={catView._id} />
                                                          <input type="text" className="form-control" name="tips_trick" defaultValue={catView.tips_trick} /> </div>
                                                            <div className="mt-3">
                                                             <Button type='submit' className="mr-3 btn-pd btnBg">Update</Button>
                                                                </div>
                                                        </form>
                                                    </div>
                                                </Modal>
          
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

