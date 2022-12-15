import React from "react";
import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import SponsorshipList from './SponsorshipList'



function TableSponsorship(props) {

    const sponsor_list = props.myData;

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
                          window.location.reload(false);
                          return SponsorshipList()
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

    )
}

export default TableSponsorship