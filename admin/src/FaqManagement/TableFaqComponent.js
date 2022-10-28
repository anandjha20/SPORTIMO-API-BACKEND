import React from "react";
import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TableFaqComponent() {

    const [data, setData] = useState([])

    const navigate = useNavigate();

  


    const viewFun = (_id)=>{
        navigate(`/faq/update/${_id}`);
        return false;   
    
      } 

      let token = localStorage.getItem("token");
      let header = ({ 'token': `${token}` });
      let options1 = ({ headers: header });

    const FaqList = async () =>
    {
        await axios.get(`/web_api/faq_list`, options1)
        .then(res => {
          const userData = res.data.body;
          setData(userData);
          const faq_cat_id = userData.faq_cat_id;
          console.log(userData); 
          console.log(faq_cat_id); 
        })
    }

  useEffect(()=> {
     FaqList()
  },[])

  

    const columns =
        [

            { title: 'Category (English)',  render: rowData => <div>{rowData.faq_cat_id == null ? <><span className="text-red">Category Deleted</span></> : <>{rowData.faq_cat_id.cat_name}</>}</div> },
            // { title: 'Date', field: 'date' },
            { title: 'Questions(English)', render: rowData => <>{rowData.question.slice(0, 30)} </> },
            { title: 'Answer (English)',  render: rowData => <>{rowData.answer.slice(0, 30)} </> },
            { title: 'Category (Arabic)',  render: rowData => <div>{rowData.faq_cat_id == null ? <><span className="text-red">Category Deleted</span></> : <>{rowData.faq_cat_id.cat_name_ara}</>}</div> },
            { title: 'Questions (Arabic)', render: rowData => <>{rowData.question_ara.slice(0, 30)} </> },
            { title: 'Answer (Arabic)', render: rowData => <> {rowData.answer_ara.slice(0, 30)} </>},
           

        ]


///////////////// delete api call  /////////////////
const deleteFaq = (_id) => {  



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
            axios.delete(`/web_api/delete_faq/${_id}`,options1)
        .then(res => {
            if (res.status) {
                let data = res.data;
                if (data.status) { 
                    Swal.fire(
                        'Deleted!',
                         data.msg,
                        'success'
                      )
                     return FaqList();
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



    return (

        <>

            <div className="row">
                <div className="col-lg-12">

                    <MaterialTable
                        title="Faq List"
                        columns={columns}
                        data={data}
                        actions={[
                            {
                                icon: 'edit',
                                iconProps: { style: { color: "#6259ca" } },
                                tooltip: 'Update Faq',
                                onClick: (event, setData) => { viewFun(setData._id); }
                            },
                            // {
                            //     icon: 'visibility',
                            //     iconProps: { style: { color: "#6259ca" } },
                            //     tooltip: 'View Detail',
                            //     onClick: (event, setData) => { viewFun(setData._id); }
                            // },

                            {
                                icon: 'delete',
                                iconProps: { style: { color: "#ff0000 !important" } },
                                tooltip: 'Delete',
                                onClick: (event, setData) => { deleteFaq(setData._id); }
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

export default TableFaqComponent