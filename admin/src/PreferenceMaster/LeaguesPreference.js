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
import { BottomNavigation } from "@mui/material";

export default function LeaguesPreference() {

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
    const [catViewLogo, setCatLogo] = useState('')
    const [pageCount, setpageCount] = useState('');
    const [open, setOpen] = useState(false);

    let token = localStorage.getItem("token");
    let header = ({ 'token': `${token}` });
    let options1 = ({ headers: header });

    /////////////////view complaint detail/////////////////

    const onOpenModal = (sunil) => {
        let match=sunil.league_logo_sportimo.match("https://www.dsg-images.com")
        if(match==null){
            setCatLogo(  <>  <div className="imageSlider  carousel-item " >
            <img src={sunil.league_logo_sportimo}></img><i onClick={(e)=>{logoReset(sunil._id)}} class="fal fa-times-circle " style={{color:"white",marginTop:"-57px",cursor:"pointer",     position: "absolute",
    zIndex: "10",
    right: "-11px",
    marginTop: "-89px"}}></i>
            </div><br/><br/><br/>
            </>
        )
        }else{
            setCatLogo(<></>)
        }
        console.log({catViewLogo})
                setCat(sunil);
                setOpen(true);
                //console.log(sunil);
        
    }

  /////////////////logo reset call /////////////////
  const logoReset = (_id) => {
    axios.put(`/web_api/restore_league_logo/${_id}`)
    .then(res => {
        if (res.status) {
            let data = res.data;
            if (data.status) { 
                 console.log(data.body)
                 onOpenModal(data.body)
            } else {
                toast.error(data.msg);
            }
        }
        else {
            toast.error(data.msg);
        }
    })
}


  /////////////////delete api call /////////////////
   const deleteCategory = (_id) => {
    Swal.fire({
        // title: 'Are you sure?',
        title: "Are you sure you want to delete selected League Preference ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {         
            axios.delete(`/web_api/delete_custom_league/${_id}`)
            .then(res => {
                if (res.status) {
                    let data = res.data;
                    if (data.status) { 
                        Swal.fire(
                            'Deleted!',
                             "League preference deleted successfully",
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
           const setDataForm = {_id, status } 
            axios.post(`/web_api/league_status_update`, setDataForm , options1)
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




    /////////////////complaint list/////////////////
    const onCloseModal = () =>{ 
        setOpen(false);
        return PreferenceList();

    }

    const limit = 10;

    const formsave = (e, page)=>{
        e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
      axios.post(`/web_api/league_list_new`, Formvlaues, options1)
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
        await axios.post(`/web_api/league_list_new`,)
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
            dataToSend2.append('original_name_sportimo', Formvlaues.original_name_sportimo);
            dataToSend2.append('original_name_ara_sportimo', Formvlaues.original_name_ara_sportimo);
            dataToSend2.append('original_name_fr_sportimo', Formvlaues.original_name_fr_sportimo);
            dataToSend2.append('image', Formvlaues.image);
    
                axios.put(`/web_api/update_league/${id}`, dataToSend2, options1)
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
        axios.post(`/web_api/leagues_get`, sanData)
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
                                <h2 className="main-content-title tx-24 mg-b-5">Leagues Preference</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>

                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Preference Master</li>
                                </ol>
                            </div>


                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">

                                <div className="card custom-card">
                                    <div className="card-body">
                                        <div className="row d-flex">
                                            <div className="col-lg-3">


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
                                            {/* <div className="col-lg-1"></div> */}
                                            <div className="col-lg-9">
                                                <div className="row">
                                                    <div className="col-lg-12">

                                                        <div className="table-card MuiPaper-root MuiPaper-elevation2 MuiPaper-rounded">
                                                            
                                                            <form onSubmit={(e)=>formsave(e)}> 
                                                            <div className="filter-header row">
                                                            <div className="col-lg-7">
                                                            <h6 className="MuiTypography-root MuiTypography-h6 padd1rem">Leagues Preference List</h6>
                                                            </div>

                                                            <div className="col-lg-5 d-flex">
                                                                <div className="form-filter">
                                                            <input type="search" name="name" placeholder="Search.." className="form-control" aria-label="Search" aria-describedby="search-addon" />
                                                             <button type='submit' className="mr-3 btn-pd btnBg"><i className="fas fa-search"></i></button>
                                                             </div>
                                                          </div>

                                                          </div>
                                                            </form>
                                                            <table className="table  ">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Logo</th>
                                                                        <th scope="col">Leagues (English)</th>
                                                                        <th scope="col">Leagues (Arabic)</th>
                                                                        <th scope="col">Leagues (French)</th>
                                                                        <th scope="col">Followers</th>
                                                                        <th scope="col" className="text-center">Status</th>
                                                                        <th scope="col" className="text-end">Actions</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                {data == '' ? <>
                                                                    <tr>
                                                                    <td className="text-center" colSpan='4'> 
                                                                    <span>No leagues available!</span> </td>
                                                                    </tr>
                                                                    </> : null}
                                                                    {data.map((item) => {
                                                                        if (item.original_name !== '') {
                                                                            
                                                                            return (
                                                                                <tr key={item._id}>
                                                                                    <td><div className="imageSliderSmall">{item.league_logo_sportimo !== '' ? <> <img src={item.league_logo_sportimo} alt="slider img" /></> : <><img src='/assets/images/no-image.png' /></> }</div></td>
                                                                                    <td>{item.original_name_sportimo}</td>
                                                                                    <td>{item.original_name_ara_sportimo}</td>
                                                                                    <td>{item.original_name_fr_sportimo}</td>
                                                                                    <td>{item.total_select}</td>
                                                                                    <td>{item.status == true ? <><Button onClick={() => { LeagueActiveDeactive(item._id, item.status="0");}} className=" btn-pd deactive text-white">Deactive</Button> </> :<> <Button onClick={() => { LeagueActiveDeactive(item._id, item.status="1");}} className=" btn-pd btnBg">Active</Button></>}</td>
                                                                                    <td className="text-end">
                                                                                        <div className="d-flex justtify-content-end">
                                                                                        {item.type=="custom"?<>
                                                                                            <IconButton onClick={(e) => { onOpenModal(item); }} aria-label="delete"> <span className="material-symbols-outlined">
                                                                                                edit </span>
                                                                                            </IconButton>
                                                                                            <IconButton  onClick={(e) => { deleteCategory(item._id); }} aria-label="delete">
                                                                                                <span className="material-symbols-outlined">
                                                                                                    delete </span>
                                                                                            </IconButton>
                                                                                            </>:<><IconButton onClick={(e) => { onOpenModal(item); }} aria-label="delete"> <span className="material-symbols-outlined">
                                                                                                edit </span>
                                                                                            </IconButton>
                                                                                            <IconButton disabled onClick={(e) => { deleteCategory(item._id); }} aria-label="delete">
                                                                                                <span className="material-symbols-outlined">
                                                                                                    delete </span>
                                                                                            </IconButton>
                                                                                            </>}
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
                                                    <h2 className="mb-4 text-white">Update League</h2>
                                                    <div className="imageSlider carousel-item " >
                                                    <img src={catView.league_logo}></img>
                                                    </div>
                                                    <span>
                                                    <h5 className="mb-2 text-white">&nbsp;&nbsp;{catView.original_name}</h5>
                                                    <h5 className="mb-2 text-white">&nbsp;&nbsp;{catView.original_name_ara}</h5>
                                                    <h5 className="mb-4 text-white">&nbsp;&nbsp;{catView.original_name_fr}</h5>
                                                    </span>
                                                    <h5 className="mb-2 text-white">Edit Here To Reflect...</h5>
                                                    <div className="mx-500">
                                                        <form className="mt-3 w-100" onSubmit={(e) => saveFormData(e)}>
                                                            <div className="form-group mb-4">
                                                               <label className="title-col">League Name <span className="text-blue">(English)</span></label>
                                                                <input type="hidden" className="form-control" name='_id' value={catView._id} />
                                                                <input type="text" className="form-control" name='original_name_sportimo'
                                                                    defaultValue={catView.original_name_sportimo} /> </div>

                                                                <label className="title-col">League Name <span className="text-blue">(Arabic)</span></label>
                                                                <input  id="categor" className="form-control mb-4" name="original_name_ara_sportimo" defaultValue={catView.original_name_ara_sportimo}
                                                                type="text"/>  

                                                                <label className="title-col">League Name <span className="text-blue">(French)</span></label>
                                                                <input  id="categor" className="form-control mb-4" name="original_name_fr_sportimo" defaultValue={catView.original_name_fr_sportimo}
                                                                type="text"/>


                                                                {catViewLogo}
                                                            
                                                               <div className="col-lg-12 mt-4 mb-3  p-0">
                                                                <label className="title-col">File Upload</label>
                                                                <input type="file" name='image' className="form-control file-input" oninput="pic.src=window.URL.createObjectURL(this.files[0])"/><img id="pic" />
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

