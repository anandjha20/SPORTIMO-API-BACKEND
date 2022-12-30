import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import FilterComponent from "./Components/FilterComponent";
import { useNavigate } from 'react-router-dom';
import MaterialTable from 'material-table';
import Swal from 'sweetalert2';



import { useState,useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SponsorshipList() {

    useEffect(() => {
        document.body.className = "main-body leftmenu sponer_list";
        return () => {
          document.body.className = "main-body leftmenu";
        }
      }, []);

    const [sponsor_list, setSponsor_list] = React.useState([]);

    const get_data = async(sendData) =>{
        try {
         
            let token = localStorage.getItem("token");
            let header = ({ 'token': `${token}` });
            let options1 = ({ headers: header });
            let response = await axios.post( '/web_api/sponsor_list', sendData, options1);
    
          if (response.status) {
    
            let data = response.data;
    
            if (data.status) {
                setSponsor_list(data.body);
             // toast.success(data.msg);
            } else {
              toast.error('something went wrong please try again');
            }
          }
          else {
            toast.error('something went wrong please try again..');
          }
    
    
        } catch (err) { console.error(err); toast.error('some errror'); return false; }
    
    }
    
      useEffect(() => {
        get_data({});
      }, []);
    
      const navigate = useNavigate();

      /////////////////delete api call /////////////////
   const deleteCategory = (_id) => {
    Swal.fire({
        // title: 'Are you sure?',
        title: "Are you sure you want to delete Sponsorship ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {         
            axios.delete(`/web_api/delete_sponsor/${_id}`)
            .then(res => {
                if (res.status) {
                    let data = res.data;
                    if (data.status) { 
                        Swal.fire(
                            'Deleted!',
                             "Sponsorship deleted successfully",
                            'success'
                          )
                         // window.location.reload(false);
                          return get_data()
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



    const viewFun = (id)=>{ 
     navigate(`/sponsorship/detail/${id}`);
        return false;   
    }  
    const UpdateFun = (id)=>{ 
     navigate(`/sponsorship/update/${id}`);
        return false;   
    }  
    
    const columns =
        [
 

            { title: 'Match/league', field: 'match'},
            { title: 'Sponsorship Type', field: 'type'},
            // { title: 'Fill Name', field: 'filename'},
            { title: 'Campaign  Date-Range', field: 'date'},
            { title: 'Impressions', field: 'impression'},
            { title: 'Clicks', field: 'Clicks'},
        ]

    const data = sponsor_list.length>0? sponsor_list.map((item)=>{

       return { type : item.view_type, date : `${item.Fdate.slice(0, 10).split("-").reverse().join("-")} To  ${item.Ldate.slice(0,10).split("-").reverse().join("-")}  `, 
                       impression : item.impressions_count, Clicks : item.clicks_count, match: item.match , id:item._id,  };
    }) :[];


    return (
        <>
            <Header />
            <div className="main-content side-content pt-0">
                <div className="container-fluid">
                    <div className="inner-body">

                        <div className="page-header">
                            <div>
                                <h2 className="main-content-title tx-24 mg-b-5">Sponsorship List</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>

                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Sponsorship</li>
                                </ol>
                            </div>
                            <div className="d-flex">
                          
                                <div className="justify-content-center">
                                    <Link to="/sponsorship/add">
                                        <Button type='button' variant="contained" className="mr-3 btn-pd btnBg"><i className="fas fa-plus"></i>&nbsp;&nbsp; Add  Sponsorship</Button>
                                    </Link>
                                </div>                              
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">
                              
                                <FilterComponent   onClick={get_data}  />
                                <>
            <div className="row">
                <div className="col-lg-12">
               
                    <MaterialTable
                        title="Sponsorship List"
                        columns={columns}
                        data={data}
                        actions={[
                            {
                                icon: 'visibility',
                                iconProps: { style: { color: "#6259ca" } },
                                tooltip: 'View Detail',
                                onClick: (event, setData) => { viewFun(setData.id);}
                            },
                            {
                                icon: 'edit',
                                iconProps: { style: { color: "#6259ca" } },
                                tooltip: 'Update Sponsorship',
                                onClick: (event, setData) => { UpdateFun(setData.id);}
                            },
                            {
                                icon: 'delete',
                                iconProps: { style: { color: "#6259ca" } },
                                tooltip: 'delete Sponsorship',
                                onClick: (event, setData) => { deleteCategory(setData.id);}
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
        </>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default SponsorshipList;