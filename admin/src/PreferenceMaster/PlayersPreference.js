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


export default function TeamsPreference() {

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

    useEffect(() => {
        document.body.className = "main-body leftmenu preference_list";
        return () => {
            document.body.className = "main-body leftmenu";
        }
    }, []);
    const { _id } = useParams();
    const [data, setData] = useState([])
    const [catView, setCat] = useState([])
    const [pageCount, setpageCount] = useState('');
    const [open, setOpen] = useState(false);


    let token = localStorage.getItem("token");
    let header = ({ 'token': `${token}` });
    let options1 = ({ headers: header });

    /////////////////view complaint detail/////////////////

    const onOpenModal = (_id) => {
        axios.post(`/web_api/players_get/${_id}`, options1)
            .then(res => {
                const catView = res.data.body[0];
                setCat(catView);
                setOpen(true);
                console.log(catView);
            })
    }

    /////////////////delete complaint /////////////////
    const deleteCategory = (_id) => {

        axios.delete(`/web_api/players/${_id}`, options1)
            .then(res => {
                if (res.status) {
                    let data = res.data;

                    if (data.status) {
                        toast.success(data.msg);
                        return PreferenceList();
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

    const limit = 10;
    const PreferenceList = async (page) => {
        const sanData = { page: page }
        await axios.post(`/web_api/players_get`, options1)
            .then(res => {
                const userData = res.data.body;
                const total = res.data.rows;
                const totalPage = (Math.ceil(total / limit));
                setpageCount(totalPage);
                setData(userData);
            })
    }
    useEffect(() => {
        PreferenceList();
    }, []);



    ///////////////// Update players category /////////////////
    const saveFormData = async (e)  => {
        const id = catView._id
            e.preventDefault(_id);
            const data = new FormData(e.target);
            const Formvlaues = Object.fromEntries(data.entries());
    
            let dataToSend2 = new FormData();
            dataToSend2.append('name', Formvlaues.name);
            dataToSend2.append('name_ara', Formvlaues.name_ara);
            dataToSend2.append('image', Formvlaues.image);
    
                axios.put(`/web_api/players/${id}`, dataToSend2, options1)
                    .then(res => {
                        if (res.status) {
    
                            let data = res.data;
                            if (data.status) {
                                toast.success(data.msg);
                                setOpen(false);
                                return PreferenceList();
                            } else {
                                toast.error(data.msg);
                            }
                        }
                        else {
                            toast.error(data.msg);
                        }
                    })
        }

   ///////////////// add players api call /////////////////
    const AddFormData = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        let dataToSend2 = new FormData();
        dataToSend2.append('name', Formvlaues.name);
        dataToSend2.append('name_ara', Formvlaues.name_ara);
        dataToSend2.append('image', Formvlaues.image);

        axios.post(`/web_api/players`, dataToSend2, options1)
                .then(response => {
                    if (response.status) {
                        let data = response.data;
                        console.log(data.msg)
                        if (data.status) {
                            toast.success(data.msg);
                            e.target.reset();
                            return PreferenceList();
                        } else {
                            toast.error(data.msg);
                        }
                    }
                    else {
                        toast.error(data.msg);
                    }
                })
    }



    ///////////////pagenestion///////////////
    const fetchComments = async (page) => {
        const sanData = { page: page }
        axios.post(`/web_api/players_get`, sanData)
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
                                <h2 className="main-content-title tx-24 mg-b-5">Players Preference</h2>
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
                                                    <h6 className="MuiTypography-root MuiTypography-h6 text-white mb-4">Add Players Preference</h6>

                                                    <label className="title-col">Players Preference <span className="text-blue">(English)</span></label>
                                                      <input  onChange={handleOnChange} id="categor" className="form-control mb-4" name="name"
                                                         type="text"
                                                        />

                                                    {errors.name && dirty.name && (
                                                    <p className="error">{errors.name}</p>
                                                     )}
    
                                                      <label className="title-col">Players Preference <span className="text-blue">(Arabic)</span></label>
                                                      <input  id="categor" className="form-control mb-4" name="name_ara"
                                                         type="text"
                                                        />

                                                   <div className="col-lg-12 mt-4 mb-4 p-0">
                                                        <label className="title-col">File Upload</label>
                                                        <input type="file" name='image' className="form-control file-input" />
                                                    </div>

                                                    <div className="mt-3 mb-4">
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
                                                            <h6 className="MuiTypography-root MuiTypography-h6 padd1rem">Players Preference List</h6>
                                                            <table className="table ">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Image</th>
                                                                        <th scope="col">Players Preference (English)</th>
                                                                        <th scope="col">Players Preference (Arabic)</th>
                                                                        <th scope="col" className="text-end">Actions</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                {data == '' ? <>
                                                                    <tr>
                                                                    <td className="text-center" colspan='4'> 
                                                                        <img src="/assets/images/nodatafound.png" alt='no image' width="350px" /> </td>
                                                                    </tr>
                                                                    </> : null}
                                                                    {data.map((item) => {
                                                                        if (item.team_name !== '') {
                                                                            return (
                                                                                <tr key={item._id}>
                                                                                    <td><div className="imageSliderSmall">{item.image !== '' ? <> <img src={item.image} alt="slider img" /></> : <><img src='/assets/images/no-image.png' /></> }</div></td>
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
                                                    <h2 className="mb-4 text-white">Update Players Preference</h2>
                                                    <div className="mx-500">
                                                        <form className="mt-3 w-100" onSubmit={(e) => saveFormData(e)}>
                                                            <div className="form-group mb-4"> 

                                                              <label className="title-col"> Players Preference <span className="text-blue">(English)</span></label>
                                                                <input type="hidden" className="form-control" name='_id' value={catView._id} />
                                                                <input type="text" className="form-control" name='name'
                                                                    defaultValue={catView.name} /> </div>

                                                                <label className="title-col"> Players Preference <span className="text-blue">(Arabic)</span></label>
                                                                <input  id="categor" className="form-control mb-4" name="name_ara"
                                                                type="text" defaultValue={catView.name_ara}
                                                                />  


                                                        <div className="col-lg-12 mt-4 mb-3  p-0">
                                                                <label className="title-col">File Upload</label>
                                                                <input type="file" name='image' className="form-control file-input" />
                                                              </div>
                                                            <div className="mt-4 mb-3">
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

