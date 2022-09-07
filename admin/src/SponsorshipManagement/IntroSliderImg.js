import React from "react";
import TextField from '@mui/material/TextField';
import Header from "../Header";
import { Link } from "react-router-dom";
import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from "react-paginate";
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'moment';

export default function IntroSliderImg() {



    useEffect(() => {
        document.body.className = "main-body leftmenu sponer_list";
        return () => {
            document.body.className = "main-body leftmenu";
        }
    }, []);


    const [data, setData] = useState([])
    const [pageCount, setpageCount] = useState('');
    const [catView, setCat] = useState([])
    const [open, setOpen] = useState(false);

    let token = localStorage.getItem("token");
    let header = ({ 'token': `${token}` });
    let options1 = ({ headers: header });

   
    const navigate = useNavigate();
    const viewFun = (_id)=>{ 
     navigate(`/intro-slider/detail/${_id}`);
        return false;   
    } 


    const limit = 10;
    const IntroSliderList = async () => {
        await axios.post(`/web_api/introSlider_get`)
            .then(res => {
                const userData = res.data.body;
                const total = res.data.rows;
                const totalPage = (Math.ceil(total / limit));
                setpageCount(totalPage);
                setData(userData);
            })
    }

    const formatDate = Moment(data.from_date).format("MM/DD/YYYY : HH:mm:ss");
    const totDate = Moment(data.to_date).format("MM/DD/YYYY : HH:mm:ss");

    useEffect(() => {
        IntroSliderList()
    }, []);

   
    ///////////////////////////  Add Introduction Slider Api Call  /////////////////////////////////////////

    const saveFormData = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());

        let dataToSend2 = new FormData();
        dataToSend2.append('title', Formvlaues.title);
        dataToSend2.append('description', Formvlaues.description);
        dataToSend2.append('image', Formvlaues.image);
        dataToSend2.append('from_date', Formvlaues.from_date);
        dataToSend2.append('to_date', Formvlaues.to_date);


        console.log("sunil" + Formvlaues);
        axios.post(`/web_api/introSlider_add`, dataToSend2, options1)
            .then(response => {
                if (response.status) {
                    let data = response.data;
                    console.log(data.msg)
                    if (data.status) {
                        toast.success(data.msg);
                        e.target.reset();
                        return IntroSliderList();
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


    ///////////////// delete Introduction Slider api call  /////////////////
    const deleteCategory = (_id) => {
        let sendData = { id: _id }
        axios.delete(`/web_api/introSlider_delete/${_id}`, options1)
            .then(res => {
                if (res.status) {
                    let data = res.data;

                    if (data.status) {
                        toast.success(data.msg);
                        return IntroSliderList();
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


    ///////////////// Update Introduction Slider  /////////////////
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
        axios.post(`/web_api/introSlider_get`, sanData)
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
                                <h2 className="main-content-title tx-24 mg-b-5">Add Introduction Slider</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to="/sponsorship">&nbsp;&nbsp;Sponsorship</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Introduction Slider</li>
                                </ol>
                            </div>


                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">

                                <div className="card custom-card">
                                    <div className="card-body">
                                        <div className="row d-flex">
                                            <div className="col-lg-5">

                                                <form className="mt-3" onSubmit={(e) => saveFormData(e)} encType="multipart/form-data">
                                                    <h6 className="MuiTypography-root MuiTypography-h6 text-white mb-4">Add Introduction Slider</h6>
                                                   
                                                    <div className="col-lg-12 mb-4 p-0">
                                                        <TextField id="categor" className="filter-input" name="title"
                                                            label="Title" fullWidth type="text"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-lg-12 mb-4 p-0">
                                                        <TextField id="filled-multiline-static" name='description' label="Enter Description" multiline rows={4} fullWidth variant="filled" />
                                                    </div>

                                                    <div className="col-lg-12 mb-4  p-0">
                                                        <label className="title-col">File Upload</label>
                                                        <input type="file" name='image' className="form-control file-input" />
                                                    </div>

                                                    <div className="col-lg-12 mb-4 p-0">
                                                    <label className="title-col mb-3">Date-Range</label>
                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                            <TextField id="categor" className="filter-input" type="datetime-local" name='from_date'
                                                              label="Start Date" fullWidth  InputLabelProps={{
                                                                 shrink: true,
                                                              }} />
                                                            </div>
                                                            <div className="col-lg-6">
                                                            <TextField id="categor" className="filter-input" type="datetime-local" name='to_date'
                                                              label="End Date" fullWidth  InputLabelProps={{
                                                                 shrink: true,
                                                              }} />
                                                            
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mt-3">
                                                        <Button type='submit' className="mr-3 btn-pd btnBg">Add</Button>
                                                        <Button type='reset' variant="contained" className="btn btn-dark btn-pd">Reset</Button>
                                                    </div>
                                                </form>
                                            </div>
                                            {/* <div className="col-lg-1"></div> */}
                                            <div className="col-lg-7">
                                                <div className="row">
                                                    <div className="col-lg-12">

                                                        <div className="table-card MuiPaper-root MuiPaper-elevation2 MuiPaper-rounded">
                                                            <h6 className="MuiTypography-root MuiTypography-h6 padd1rem">Introduction Slider List</h6>
                                                            <table className="table ">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Image</th>
                                                                        <th scope="col">Title</th>
                                                                        <th scope="col">Description</th>
                                                                        <th scope="col">Date-Range</th>
                                                                        <th scope="col" className="text-end">Actions</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {data == '' ? <>
                                                                        <tr>
                                                                            <td className="text-center" colSpan='5'>
                                                                                <img src="/assets/images/nodatafound.png" alt='no image' width="350px" /> </td>
                                                                        </tr>
                                                                    </> : null}
                                                                    {data.map((item) => {
                                                                        return (
                                                                            <tr key={item._id}>
                                                                                <td><div className="imageSlider"><img src={item.image} alt="slider img" /></div></td>
                                                                                <td>{item.title}</td>
                                                                                <td>{item.description}</td>
                                                                                <td>{formatDate} To {totDate}</td>
                                                                                <td className="text-end">
                                                                                    <div className="d-flex justtify-content-end">
                                                                                        <IconButton onClick={(e) => { viewFun(item._id); }} aria-label="delete"> <span className="material-symbols-outlined">
                                                                                            edit </span>
                                                                                        </IconButton>
                                                                                        <IconButton onClick={(e) => { deleteCategory(item._id, item.title); }} aria-label="delete">
                                                                                            <span className="material-symbols-outlined">
                                                                                                delete </span>
                                                                                        </IconButton>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        );
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

