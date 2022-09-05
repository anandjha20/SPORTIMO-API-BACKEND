import React from "react";
import TextField from '@mui/material/TextField';
import MaterialTable from 'material-table';
import Header from "../../Header";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Textbox } from 'react-inputs-validation';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import useForm from "../../useForm";


export default function AddComplaintCategory() {
   
    const stateSchema = {
        cat_name: {error: "" },
      };
    
      const stateValidatorSchema = {
        cat_name: {
          required: true,
          validator: {
           func: value => /^[a-zA-Z]+$/.test(),
            error: "Invalid first name format."
          }
        }
      };
    
   
      const {
        values,
        errors,
        dirty,
        handleOnChange,
        disable,
      } = useForm(stateSchema, stateValidatorSchema);
    
      const { cat_name, last_name, tags } = values;
   
   
   
    useEffect(() => {
        document.body.className = "main-body leftmenu camp_list";
        return () => {
          document.body.className = "main-body leftmenu";
        }
      }, []);
    const { _id } = useParams();
    const [data, setData] = useState([])
    const [catView, setCat] = useState([])
    const [open, setOpen] = useState(false);
    /////////////////view complaint detail/////////////////

    const onOpenModal = (_id) => {

           axios.get(`/web_api/user_complaint_cat_list/${_id}`)
            .then(res => {
                const catView = res.data.body[0];
                setCat(catView);
                setOpen(true);
                console.log(catView);
            }) 
        }

    /////////////////delete complaint /////////////////
    const deleteCategory = (_id) => {

        axios.delete(`/web_api/user_complaint_cat_delete/${_id}`)
            .then(res => {
                if (res.status) {
                    let data = res.data;

                    if (data.status) { 
                        toast.success(data.msg);
                         return axios.get("/web_api/user_complaint_cat_list")
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

    /////////////////complaint list/////////////////
    const onCloseModal = () => setOpen(false);

    const FaqCategoryList = async () => {
        await axios.get(`/web_api/user_complaint_cat_list`)
            .then(res => {
                const userData = res.data.body;
                setData(userData);
            })  }

    useEffect(() => {
        FaqCategoryList();
        // const timer = setInterval(() => {
        //   setData();
        // }, 500);
        // return () => clearInterval(timer);
    }, []);

    const columns = [{ title: 'Complaint Category', field: 'cat_name' }, ]
    ///////////////// Update complaint category /////////////////
    const saveFormData = async (e) => {
        e.preventDefault();
        try {

            let cat_name = (e.target.elements.cat_name !== 'undefined') ? e.target.elements.cat_name.value : '';
            let _id = (e.target.elements._id !== 'undefined') ? e.target.elements._id.value : '';
            let dataToSend2 = {
                "cat_name": cat_name,
            }
            console.log("new values == ", dataToSend2);

            let options1 = { headers: { headers: { 'Content-Type': 'multipart/form-data' }, "token": localStorage.getItem('token') } };

            axios.put(`/web_api/user_complaint_cat_update/${_id}`, dataToSend2, options1)
                .then(res => {
                    if (res.status) {

                        let data = res.data;
                        if (data.status) {
                            toast.success(data.msg);
                            setOpen(false);
                            return axios.get("/web_api/user_complaint_cat_list")
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

   

    /////////////////// Add  Complaint Category API call ///////////////////////////////////////////////// 
    const AddFormData = async (e) => {
        e.preventDefault();
        try {

            let cat_name = (e.target.elements.cat_name !== 'undefined') ? e.target.elements.cat_name.value : '';

            let dataToSend2 = {
                "cat_name": cat_name,
            }

            console.log("new values == ", dataToSend2);

            let options1 = { headers: { headers: { 'Content-Type': 'multipart/form-data' }, "token": localStorage.getItem('token') } };

            axios.post(`/web_api/add_user_complaint_category`, dataToSend2, options1)
                .then(response => {
                    if (response.status) {

                        let data = response.data;

                        console.log(data.msg)

                        if (data.status) {
                            toast.success(data.msg);
                            e.target.reset();

                            return axios.get("/web_api/user_complaint_cat_list")
                            .then(res => {
                                const userData = res.data.body;
                                setData(userData);
                            });

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


    return (
        <>
            <Header />



            
            <div className="main-content side-content pt-0">
                <div className="container-fluid">
                    <div className="inner-body">

                        <div className="page-header">
                            <div>
                                <h2 className="main-content-title tx-24 mg-b-5">Complaint Category</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>

                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Complaint</li>
                                </ol>
                            </div>


                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">

                                <div className="card custom-card">
                                    <div className="card-body">
                                        <div className="row d-flex">
                                            <div className="col-lg-5">
                                              

                                                <form className="mt-3" onSubmit={(e) => AddFormData(e)}>
                                                    <h6 className="MuiTypography-root MuiTypography-h6 text-white mb-4">Add Complaint Category</h6>
                                                   
                                                    <TextField id="categor" className="filter-input" name="cat_name"  autoComplete="off"
                                                       onChange={handleOnChange} label="Complaint Category" fullWidth type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                    {errors.cat_name && dirty.cat_name && (
                                                    <p className="error">{errors.cat_name}</p>
                                                     )}

                                                    <div className="mt-3">
                                                        <Button type='submit'  className="mr-3 btn-pd btnBg" disabled={disable}>Add</Button>
                                                        <Button type='reset' variant="contained" className="btn btn-dark btn-pd">Reset</Button>
                                                    </div>
                                                </form>
                                            </div>
                                            {/* <div className="col-lg-1"></div> */}
                                            <div className="col-lg-7">
                                            <div className="row">
                                        <div className="col-lg-12">
                                            <MaterialTable
                                                title="Category List"
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
                                                    <form className="mt-3 w-100" onSubmit={(e) => saveFormData(e)}>
                                                        <div className="form-group mb-4"> <label className="tx-medium">Update Category</label>
                                                            <input type="hidden" className="form-control" name='_id' value={catView._id} />
                                                            <input type="text" className="form-control" name='cat_name' 
                                                            defaultValue={catView.cat_name} /> </div>
                                                           <div className="mt-3">
                                                            <Button type='submit' className="mr-3 btn-pd btnBg" >Update</Button>
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

