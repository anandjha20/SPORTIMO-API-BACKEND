import React from "react";
import TextField from '@mui/material/TextField';
import Header from "../Header";
import { Link } from "react-router-dom";
import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2'
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
      axios.get(`/web_api/get_tips/${_id}`, options1 )
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
        await axios.get(`/web_api/get_tip_list`)
        .then(res => {
          const userData = res.data.body;
          setData(userData);
        })
    }

  useEffect(() => {
    TipsTricksList()
  }, []);

 const columns =[   
 { title: 'Tips & Tricks (English)', field: 'tips_trick' }, 
  { title: 'Status', render: rowData => {
    if (rowData.active_status == true) {
        return (
            <>
            
             <Button onClick={() => { TipsActiveDeactive(rowData._id, rowData.statusTips="0");}} className="mr-3 btn-pd btnBg">Active</Button>
            </>
        );
      }
      if (rowData.active_status == false) {
        return (
            <>
            <Button onClick={() => { TipsActiveDeactive(rowData._id, rowData.statusTips="1");}} className="mr-3 btn-pd deactive text-white">Deactive</Button>
            </>
        );
      }
}
  }, ] 



 /////////////////status update/////////////////////
 const TipsActiveDeactive = (_id, statusTips) =>
{ 
           const setDataForm = { tips_status : statusTips } 
            axios.put(`/web_api/tips_status_update/${_id}`, setDataForm , options1)
             .then(res => {
                if (res.status) {
                    let data = res.data;
                    if (data.status) { 
                        toast.success(data.msg);
                        return TipsTricksList();
                    } else {
                        toast.error('something went wrong please try again');
                    }
                }
                else {
                    toast.error('something went wrong please try again..');
                }

            })
             
} 

///////////////////////////  Add Tips & Tricks Api Call  /////////////////////////////////////////

    const saveFormData = async (e) => {
        e.preventDefault();
        try {

            let tips_trick = (e.target.elements.tips_trick !== 'undefined') ? e.target.elements.tips_trick.value : '';
                let tips_trick_ara = (e.target.elements.tips_trick_ara !== 'undefined') ? e.target.elements.tips_trick_ara.value : '';
                let tips_trick_fr = (e.target.elements.tips_trick_fr !== 'undefined') ? e.target.elements.tips_trick_fr.value : '';
                let dataToSend2 = {
                    "tips_trick": tips_trick,
                    "tips_trick_ara": tips_trick_ara,
                    "tips_trick_fr": tips_trick_fr,
                }


            console.log("new values == ", dataToSend2);


            axios.post(`/web_api/add_tips`, dataToSend2, options1)
                .then(response => {
                    if (response.status) {

                        let data = response.data;

                        console.log(data.msg)

                        if (data.status) {

                            toast.success(data.msg);

                            e.target.reset();
                            return TipsTricksList()
                            
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

  /////////////////delete api call /////////////////
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
            axios.delete(`/web_api/delete_tip/${_id}`)
            .then(res => {
                if (res.status) {
                    let data = res.data;
                    if (data.status) { 
                        Swal.fire(
                            'Deleted!',
                             data.msg,
                            'success'
                          )
                         return TipsTricksList();
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
    e.preventDefault();
    try {

        let tips_trick = (e.target.elements.tips_trick !== 'undefined') ? e.target.elements.tips_trick.value : '';
        let tips_trick_ara = (e.target.elements.tips_trick_ara !== 'undefined') ? e.target.elements.tips_trick_ara.value : '';
        let tips_trick_fr = (e.target.elements.tips_trick_fr !== 'undefined') ? e.target.elements.tips_trick_fr.value : '';
        let id = (e.target.elements.id !== 'undefined') ? e.target.elements.id.value : '';
        let dataToSend2 = {
            "tips_trick": tips_trick,
            "tips_trick_ara": tips_trick_ara,
            "tips_trick_fr": tips_trick_fr,
            "id": id,
        }
        console.log("new values == ", dataToSend2);
        axios.put(`/web_api/update_tips`, dataToSend2, options1)
            .then(res => {
                if (res.status) {

                    let data = res.data;
                    if (data.status) {
                        toast.success(data.msg);
                        setOpen(false);
                        return axios.get("/web_api/get_tip_list", options1)
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

                                                    
                                                    <label className="title-col">Add Tips & Tricks <span className="text-blue">(English)</span></label>
                                                       <input id="categor" autoComplete="off" className="form-control mb-4" name="tips_trick"
                                                         type="text"
                                                        />

                                                      <label className="title-col">Add Tips & Tricks <span className="text-blue">(Arabic)</span></label>
                                                      <input  id="categor" autoComplete="off" className="form-control mb-4" name="tips_trick_ara"
                                                         type="text"
                                                        />

                                                    <label className="title-col">Add Tips & Tricks <span className="text-blue">(French)</span></label>
                                                      <input  id="categor" autoComplete="off" className="form-control mb-4" name="tips_trick_fr"
                                                         type="text"
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
                                                      <h2 className="mb-4 text-white">Update Tips & Tricks</h2>
                                                    <div className="mx-500">
                                                        <form className="mt-3 w-100"  onSubmit={(e) => UpdateFormData(e)}>
                                                        <div className="form-group mb-4">

                                                        <label className="title-col"> Tips & Tricks <span className="text-blue">(English)</span></label>
                                                          <input type="hidden" className="form-control" name="id" defaultValue={catView._id} />
                                                
                                                          <input type="text" autoComplete="off" className="form-control" name="tips_trick" defaultValue={catView.tips_trick} /> 
                                                          </div>

                                                          <label className="title-col"> Tips & Tricks <span className="text-blue">(Arabic)</span></label>
                                                          <input  id="categor" autoComplete="off" defaultValue={catView.tips_trick_ara} className="form-control mb-4" name="tips_trick_ara"
                                                         type="text"
                                                        />

                                                        <label className="title-col"> Tips & Tricks <span className="text-blue">(French)</span></label>
                                                          <input  id="categor" autoComplete="off" defaultValue={catView.tips_trick_fr} className="form-control mb-4" name="tips_trick_fr"
                                                         type="text"
                                                        />

                                                            <div className="mt-3 mb-3">
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

