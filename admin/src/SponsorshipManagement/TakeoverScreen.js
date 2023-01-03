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
import { ListItemAvatar } from "@material-ui/core";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

export default function TakeoverSvreen() {

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
        document.body.className = "main-body leftmenu sponer_list";
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

 


  /////////////////delete api call /////////////////
   const deleteCategory = (_id) => {
    Swal.fire({
        // title: 'Are you sure?',
        title: "Are you sure you want to delete selected Takeover Screen ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {         
            axios.delete(`/web_api/takeover_screen_delete/${_id}`)
            .then(res => {
                if (res.status) {
                    let data = res.data;
                    if (data.status) { 
                        Swal.fire(
                            'Deleted!',
                             "Takeover Screen deleted successfully",
                            'success'
                          )
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
      })
}

 /////////////////status update/////////////////////
 const LeagueActiveDeactive = (_id, status) =>
{ 
           const setDataForm = { status } 
            axios.put(`/web_api/takeover_screen_status_update/${_id}`, setDataForm , options1)
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
             
} 


////////////////////skip
const [alignment, setAlignment] = React.useState("banner");
const [alignmentSkip, setAlignmentSkip] = React.useState("skip");
const [skip_add, setSkip_add] = React.useState("1");
const [view_type, setView_type] = React.useState("banner");

const handleChangeToggle = (event) => {
    setAlignment(event.target.value);
  };

const handleChangeToggleSkip = (event) => {
    setAlignmentSkip(event.target.value);
  };

  const onOpenModal = (sunil) => {
    setCat(sunil);
    setAlignment(sunil.view_type)
    if(sunil.skip==true){
        setAlignmentSkip("skip")
    }else{
        setAlignmentSkip("Noskip")
    }
    setOpen(true);
    console.log(sunil);

}



    /////////////////complaint list/////////////////
    const onCloseModal = () => setOpen(false);

    const limit = 5;

    const formsave = (e, page)=>{
        e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
      axios.post(`/web_api/takeover_screen_get`, Formvlaues, options1)
            .then(res => {
                const userData = res.data.body;
                const total = res.data.rows;
                const totalPage = (Math.ceil(total / limit));
                console.log(totalPage)
                setpageCount(totalPage);
                setData(userData);
            })
    }
    const PreferenceList = async (page) => {
        const sanData = { page: page }
        await axios.post(`/web_api/takeover_screen_get`,)
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


    ///////////////// Update complaint category /////////////////
     const saveFormData = async (e)  => {
        const id = catView._id
            e.preventDefault(_id);
            const data = new FormData(e.target);
            const Formvlaues = Object.fromEntries(data.entries());
    
            let dataToSend2 = new FormData();
            dataToSend2.append('image', Formvlaues.image);
            dataToSend2.append('skip', skip_add);
            dataToSend2.append('skip_time', Formvlaues.skip_time);
            dataToSend2.append('view_type', view_type);
    
                axios.put(`/web_api/takeover_screen_update/${id}`, dataToSend2, options1)
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
                    .catch(error => {
                        console.log(this.state);
                    })
        }

   ///////////////// add leagues api call /////////////////
    const AddFormData = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        let dataToSend2 = new FormData();
        dataToSend2.append('original_name', Formvlaues.original_name);
        dataToSend2.append('original_name_ara', Formvlaues.original_name_ara);
        dataToSend2.append('original_name_fr', Formvlaues.original_name_fr);
        dataToSend2.append('image', Formvlaues.image);

        axios.post(`/web_api/add_custom_league`, dataToSend2, options1)
                .then(response => {
                    if (response.status) {
                        let data = response.data;
                        console.log(data.msg)
                        if (data.status) {
                            toast.success("League Added Successfully");
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
                .catch(error => {
                    console.log(this.state);
                })
    }

    

    ///////////////pagenestion///////////////
    const fetchComments = async (page) => {
        const sanData = { page: page }
        axios.post(`/web_api/takeover_screen_get`, sanData)
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
        
    };

    return (
        <>
            <Header />
            <div className="main-content side-content pt-0">
                <div className="container-fluid">
                    <div className="inner-body">

                        <div className="page-header">
                            <div>
                                <h2 className="main-content-title tx-24 mg-b-5">Takeover Screen</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>

                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Takeover Screen</li>
                                </ol>
                            </div>


                        <div className="d-flex">
								<div className="justify-content-center">
							       <Link  to="/takeover/add">
                                    <Button type='button' variant="contained" className="mr-3 btn-pd btnBg"><i className="fas fa-plus"></i>&nbsp;&nbsp; Add Takeover Screen</Button>
                                    </Link>
                                </div>
							</div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">

                                <div className="card custom-card">
                                    <div className="card-body">
                                        <div className="row d-flex">
                                            {/* <div className="col-lg-3">


                                                <form className="mt-3" onSubmit={(e) => AddFormData(e)}>
                                                    <h6 className="MuiTypography-root MuiTypography-h6 text-white mb-4">Add League Preference</h6>

                                                    <label className="title-col">League Name <span className="text-blue">(English)</span></label>
                                                      <input  onChange={handleOnChange} id="categor" className="form-control mb-4" name="original_name"
                                                         type="text"
                                                        />

                                                    {errors.name && dirty.name && (
                                                    <p className="error">{errors.name}</p>
                                                     )}
    
                                                      <label className="title-col">League Name <span className="text-blue">(Arabic)</span></label>
                                                      <input  id="categor" className="form-control mb-4" name="original_name_ara"
                                                         type="text"
                                                        />

                                                    <label className="title-col">League Name <span className="text-blue">(French)</span></label>
                                                      <input  id="categor" className="form-control mb-4" name="original_name_fr"
                                                         type="text"
                                                        />

                                                   <div className="col-lg-12 mt-4 mb-4 p-0">
                                                        <label className="title-col">League Logo</label>
                                                        <input type="file" name='image' className="form-control file-input" />
                                                    </div>

                                                    <div className="mt-3 mb-3">
                                                        <Button type='submit' className="mr-3 btn-pd btnBg" >Add</Button>
                                                        <Button type='reset' variant="contained" className="btn btn-dark btn-pd">Reset</Button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="col-lg-1"></div> */}
                                            <div className="col-lg-12">
                                                <div className="row">
                                                    <div className="col-lg-12">

                                                        <div className="table-card MuiPaper-root MuiPaper-elevation2 MuiPaper-rounded">
                                                            
                                                            <form onSubmit={(e)=>formsave(e)}> 
                                                            <div className="filter-header row">
                                                            <div className="col-lg-7">
                                                            <h6 className="MuiTypography-root MuiTypography-h6 padd1rem">Takeover Screen</h6>
                                                            </div>

                                                            {/* <div className="col-lg-5 d-flex">
                                                                <div className="form-filter">
                                                            <input type="search" name="name" placeholder="Search.." className="form-control" aria-label="Search" aria-describedby="search-addon" />
                                                             <button type='submit' className="mr-3 btn-pd btnBg"><i className="fas fa-search"></i></button>
                                                             </div>
                                                          </div> */}

                                                          </div>
                                                            </form>
                                                            <table className="table  ">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col" className="text-left">Screen</th>
                                                                        <th scope="col" className="text-center">Type</th>
                                                                        <th scope="col" className="text-center">Skippable</th>
                                                                        <th scope="col" className="text-center">Status</th>
                                                                        <th scope="col" className="text-end">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                {data == '' ? <>
                                                                    <tr>
                                                                    <td className="text-center" colSpan='4'> 
                                                                    <span>No screens available!</span></td>
                                                                    </tr>
                                                                    </> : null}
                                                                    {data.map((item) => {
                                                                        if (item.original_name !== '') {
                                                                            
                                                                            return (
                                                                                <tr key={item._id}>
                                                                                    <td><div className="imageSliderSmall">{item.view_type=="video"?(item.image !== '' ? <> <video  controls></video> </> : <><img src='/assets/images/no-image.png' /></> ):(item.image !== '' ? <> <img src={item.image} alt="slider img" /></> : <><img src='/assets/images/no-image.png' /></> )}</div></td>
                                                                                    <td className="text-center">{item.view_type.charAt(0).toUpperCase() + item.view_type.slice(1)}</td>
                                                                                    <td className="text-center">{item.skip == true ? <>Yes </> :<> No</>}</td>
                                                                                    <td className="text-center">{item.status == true ? <><Button onClick={() => { LeagueActiveDeactive(item._id, item.status="0");}} className="mr-3 btn-pd deactive text-white ">Deactive</Button> </> :<> <Button onClick={() => { LeagueActiveDeactive(item._id, item.status="1");}} className="mr-3 btn-pd btnBg">Active</Button></>}</td>
                                                                                    <td className="text-end">
                                                                                        <div className="d-flex justtify-content-end">
                                                                                        <IconButton onClick={(e) => { onOpenModal(item); }} aria-label="delete"> <span className="material-symbols-outlined">
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
                                                                        // if
                                                                        // {
                                                                        //     return (  
                                                                        //     <img src="/assets/images/nodatafound.png" alt="mo data" />
                                                                        //     );
                                                                        // }

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
                                                    <h2 className=" text-white">Update Takeover Screen</h2>
                                                    <div className=" mt-4" >{catView.view_type=="video"?<><video height="120px" width="200px" controls>
                                                         <source src={catView.image} type="video/mp4"/>
                                                        </video></>:<div className="imageSlider"><img   src={catView.image} ></img></div> 
                                                        }
                                                    </div>
                                                   
                                                    <div className="mx-500">
                                                        <form className="mt-2 w-100 " onSubmit={(e) => saveFormData(e)}>
                                                        
                                                        <div className="col-lg-12 mt-4 mb-3  p-0">
                                                        <div className="title-col mt-4 mb-3 ">
                                                        <label className="title-col mb-3">Skippable</label>
                                                        <ToggleButtonGroup
                                                            color="primary" name='Skippable' value={alignmentSkip} exclusive fullWidth onChange={handleChangeToggleSkip} >
                                                            <ToggleButton onClick={(e) => setSkip_add(1)} value="skip">Yes</ToggleButton>
                                                            <ToggleButton onClick={(e) => setSkip_add(0)} value="Noskip">No </ToggleButton>
                                                        </ToggleButtonGroup>
                                                        </div>
                                                        <div className="title-col mt-4 mb-3  p-0">
                                                        <label className="title-col  mb-3">Time Limit For Skip (in seconds)</label>
                                                        <input type="text" name='skip_time' defaultValue={catView.skip_time} className="form-control file-input" />
                                                        </div>
                                                        <div className="title-col mb-3">
                                                        <label className="title-col mb-3">Screen Type</label>
                                                        <ToggleButtonGroup
                                                            color="primary" name='spon_type' value={alignment} exclusive fullWidth onChange={handleChangeToggle} >
                                                            <ToggleButton onClick={(e) => setView_type('banner')} value="banner">Banner </ToggleButton>
                                                            <ToggleButton onClick={(e) => setView_type('video')} value="video">Video (30 sec)</ToggleButton>
                                                        </ToggleButtonGroup>
                                                        </div>
                                                

                                                                <label className="title-col">File Upload</label>
                                                                <input type="file" name='image' className="form-control file-input" />
                                                              </div>
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

