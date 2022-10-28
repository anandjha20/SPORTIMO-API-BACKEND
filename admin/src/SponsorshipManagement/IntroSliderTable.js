import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ReactPaginate from "react-paginate";
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'moment';
import Swal from 'sweetalert2'

export default function IntroSliderTable() {



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

   
    ///////////////// delete Introduction Slider api call  /////////////////
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
            //let sendData = { id: _id }
            axios.delete(`/web_api/introSlider_delete/${_id}`, options1)
            .then(res => {
            if (res.status) {
                let data = res.data;
                if (data.status) {
                    Swal.fire(
                        'Deleted!',
                         data.msg,
                        'success'
                      )
                    return IntroSliderList();
                } else {
                    toast.error('something went wrong please try again');
                }
            }
            else {
                toast.error('something went wrong please try again..');
            }

        })
            }
          })

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
                                <h2 className="main-content-title tx-24 mg-b-5">Introduction Slider</h2>
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
                            <div className="d-flex">
								<div className="justify-content-center">
							       <Link  to="/intro-slider/add">
                                    <Button type='button' variant="contained" className="mr-3 btn-pd btnBg"><i className="fas fa-plus"></i>&nbsp;&nbsp; Add Introduction Slider</Button>
                                    </Link>
                                </div>
							</div>


                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">

                                <div className="card custom-card">
                                    <div className="card-body">
                                        <div className="row d-flex">
                                            <div className="col-lg-12 p-0">
                                                <div className="row">
                                                    <div className="col-lg-12">

                                                        <div className="table-card MuiPaper-root MuiPaper-elevation2 MuiPaper-rounded">
                                                            <h6 className="MuiTypography-root MuiTypography-h6 padd1rem">Introduction Slider List</h6>
                                                            <table className="table ">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Image</th>
                                                                        <th scope="col">Title (English)</th>
                                                                        <th scope="col">Title (Arabic)</th>
                                                                        <th scope="col">Description (English)</th>
                                                                        <th scope="col">Description (Arabic)</th>
                                                                        <th scope="col">Date-Range</th>
                                                                        <th scope="col" className="text-end">Actions</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {data == '' ? <>
                                                                        <tr>
                                                                            <td className="text-center" colSpan='6'>
                                                                                <img src="/assets/images/nodatafound.png" alt='no image' width="350px" /> </td>
                                                                        </tr>
                                                                    </> : null}
                                                                    {data.map((item) => {
                                                                        return (
                                                                            <tr key={item._id}>
                                                                                <td><div className="imageSlider"><img src={item.image} alt="slider img" /></div></td>
                                                                                <td>{item.title}</td>
                                                                                <td>{item.title_ara}</td>
                                                                                <td>{item.description}</td>
                                                                                <td>{item.description_ara}</td>
                                                                                <td>{formatDate} To <br></br>{totDate}</td>
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

