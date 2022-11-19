import React from "react";
import TextField from '@mui/material/TextField';
import MaterialTable from 'material-table';
import Header from "../Header";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Textbox } from 'react-inputs-validation';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import useForm from "../useForm";
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2'  

export default function ReportReason() {

    const stateSchema = {
        name: { error: "" },
    };
    const stateValidatorSchema = {
        name: {
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

    const { name, last_name, tags } = values;

    const { _id } = useParams();
    const [data, setData] = useState([])
    const [catView, setCat] = useState([])
    const [pageCount, setpageCount] = useState('');
    const [open, setOpen] = useState(false);

    /////////////////view complaint detail/////////////////

    const onOpenModal = (_id) => {
        axios.post(`/web_api/report_reason_get/${_id}`)
            .then(res => {
                const catView = res.data.body[0];
                setCat(catView);
                setOpen(true);
                console.log(catView);
            })
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
            axios.delete(`/web_api/report_reason_delete/${_id}`)
            .then(res => {
                if (res.status) {
                    let data = res.data;
                    if (data.status) { 
                        Swal.fire(
                            'Deleted!',
                             data.msg,
                            'success'
                          )
                         return ReportReasonList();
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



    /////////////////complaint list/////////////////
    const onCloseModal = () => setOpen(false);

    const limit = 10;
    const ReportReasonList = async (page) => {
        const sanData = { page: page }
        await axios.post(`/web_api/report_reason_get`,)
            .then(res => {
                const userData = res.data.body;
                const total = res.data.rows;
                const totalPage = (Math.ceil(total / limit));
                setpageCount(totalPage);
                setData(userData);
                console.log({userData,total})
            })
    }
    useEffect(() => {
        ReportReasonList();
    }, []);


    ////////get token //////////
    const token = localStorage.getItem("token");
    const header = ({ 'token': `${token}` });
    const options1 = ({ headers: header });

    ///////////////// Update complaint category /////////////////
    const saveFormData = async (e) => {
        e.preventDefault();
        try {

            let name = (e.target.elements.name !== 'undefined') ? e.target.elements.name.value : '';
            let name_ara = (e.target.elements.name_ara !== 'undefined') ? e.target.elements.name_ara.value : '';
            let _id = (e.target.elements._id !== 'undefined') ? e.target.elements._id.value : '';
            let dataToSend2 = {
                "name": name,
                "name_ara": name_ara,
            }
            console.log("new values == ", dataToSend2);

            axios.put(`/web_api/report_reason_update/${_id}`, dataToSend2, options1)
                .then(res => {
                    if (res.status) {

                        let data = res.data;
                        if (data.status) {
                            toast.success(data.msg);
                            setOpen(false);
                            return ReportReasonList();
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


    /////////////////// Add  Report Reason API call ///////////////////////////////////////////////// 
    const AddFormData = async (e) => {
        e.preventDefault();
        try {
            let name = (e.target.elements.name !== 'undefined') ? e.target.elements.name.value : '';
            let name_ara = (e.target.elements.name_ara !== 'undefined') ? e.target.elements.name_ara.value : '';

            let dataToSend2 = {
                "name": name,
                "name_ara": name_ara,
            }
            console.log("new values == ", dataToSend2);
            let options1 = { headers: { headers: { 'Content-Type': 'multipart/form-data' }, "token": localStorage.getItem('token') } };
            axios.post(`/web_api/report_reason_add`, dataToSend2, options1)
                .then(response => {
                    if (response.status) {
                        let data = response.data;
                        console.log(data.msg)
                        if (data.status) {
                            toast.success(data.msg);
                            e.target.reset();
                            return ReportReasonList();
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

    ///////////////pagenestion///////////////
    const fetchComments = async (page) => {
        const sanData = { page: page }
        axios.post(`/web_api/report_reason_get`, sanData)
            .then(res => {
                const userData = res.data.body;
                setData(userData);
            })
        return data;
    };

    const handlePageClick = async (data) => {
        // console.log(data.selected);
        let page = data.selected + 1;
        const commentsFormServer = await fetchComments(page);
        setData(commentsFormServer);
    };

    return (
        <>
            <Header />
            <div className="main-content side-content pt-0">
                <div className="container-fluid">
                    <div className="inner-body">

                        <div className="page-header">
                            <div>
                                <h2 className="main-content-title tx-24 mg-b-5">Report Reason</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>

                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Report Reason</li>
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
                                                    <h6 className="MuiTypography-root MuiTypography-h6 text-white mb-4">Add Report Reason</h6>

                                                      <label className="title-col">Report Reason <span className="text-blue">(English)</span></label>

                                                       <input id="categor"  autoComplete="off"  onChange={handleOnChange} className="form-control mb-4" name="name"
                                                         type="text"
                                                        />
                                                           {errors.name && dirty.name && (
                                                            <p className="error">{errors.name}</p>
                                                          )}
                                                 
                                                      <label className="title-col">Report Reason <span className="text-blue">(Arabic)</span></label>
                                                      <input  id="categor" autoComplete="off" className="form-control mb-4" name="name_ara"
                                                         type="text"
                                                        />
                                                           {errors.name_ara && dirty.name_ara && (
                                                        <p className="error">{errors.name_ara}</p>
                                                         )}

                                                    <div className="mt-3">
                                                        <Button type='submit' className="mr-3 btn-pd btnBg" disabled={disable}>Add</Button>
                                                        <Button type='reset' variant="contained" className="btn btn-dark btn-pd">Reset</Button>
                                                    </div>
                                                </form>
                                            </div>
                                            {/* <div className="col-lg-1"></div> */}
                                            <div className="col-lg-7">
                                                <div className="row">
                                                    <div className="col-lg-12">

                                                        <div className="table-card MuiPaper-root MuiPaper-elevation2 MuiPaper-rounded">
                                                            <h6 className="MuiTypography-root MuiTypography-h6 padd1rem">Report Reason List</h6>
                                                            <table className="table ">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Report Reason (English)</th>
                                                                        <th scope="col">Report Reason (Arabic)</th>
                                                                        <th scope="col" className="text-end">Actions</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                {data == '' ? <>
                                                                    <tr>
                                                                    <td className="text-center" colSpan='3'> 
                                                                        <img src="/assets/images/nodatafound.png" alt='no image' width="350px" /> </td>
                                                                    </tr>
                                                                    </> : null}
                                                                    {data.map((item) => {
                                                                        if (item.name !== '') {
                                                                            return (
                                                                                <tr key={item._id}>
                                                                                    <td>{item.name}</td>
                                                                                    <td>{item.name_ara}</td>
                                                                                    <td className="text-end">
                                                                                        <div className="d-flex justtify-content-end">
                                                                                            <IconButton onClick={(e) => { onOpenModal(item._id); }} aria-label="delete"> <span className="material-symbols-outlined">
                                                                                                edit </span>
                                                                                            </IconButton>
                                                                                            <IconButton onClick={(e) => { deleteCategory(item._id); }} aria-label="delete">
                                                                                                <span className="material-symbols-outlined">
                                                                                                    delete </span>
                                                                                            </IconButton>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            );
                                                                        }
                                                                       
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="col-lg-12 mt-2 text-end">
                                                            <ReactPaginate
                                                                previousLabel={"previous"}
                                                                nextLabel={"next"}
                                                                breakLabel={"..."}
                                                                pageCount={pageCount}
                                                                marginPagesDisplayed={2}
                                                                pageRangeDisplayed={3}
                                                                onPageChange={handlePageClick}
                                                                containerClassName={"pagination justify-content-end"}
                                                                pageClassName={"page-item"}
                                                                pageLinkClassName={"page-link"}
                                                                previousClassName={"page-item"}
                                                                previousLinkClassName={"page-link"}
                                                                nextClassName={"page-item"}
                                                                nextLinkClassName={"page-link"}
                                                                breakClassName={"page-item"}
                                                                breakLinkClassName={"page-link"}
                                                                activeClassName={"active"}
                                                            />
                                                        </div>


                                                    </div>
                                                </div>
                                                <Modal open={open} onClose={onCloseModal} center>
                                                    <h2 className="mb-4 text-white">Update Report Reason</h2>
                                                    <div className="mx-500">
                                                    <form className="mt-3 w-100" onSubmit={(e) => saveFormData(e)}>

                                                            <div className="form-group mb-4"> 
                                                            <input type="hidden" className="form-control" name='_id' value={catView._id} />

                                                             <label className="title-col">Report Reason <span className="text-blue">(English)</span></label>
                                                            <input type="text" className="form-control" name='name' 
                                                            defaultValue={catView.name} /> 
                                                            </div>

                                                            <label className="title-col">Report Reason <span className="text-blue">(Arabic)</span></label>
                                                            <input  id="categor" className="form-control mb-4" name="name_ara"
                                                               defaultValue={catView.name_ara}  type="text"  />   
                                                              

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

