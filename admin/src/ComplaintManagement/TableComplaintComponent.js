import React from "react";
import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import IconButton from '@mui/material/IconButton';

function TableComplaintComponent() {

    const [data, setData] = useState([])
    const [pageCount, setpageCount] = useState('');

    const [userCategory, setuserCategory] = useState([])

    const navigate = useNavigate();


    const viewFun = (_id)=>
    {
        navigate(`/complaint-reply/${_id}`); 
        return false;   
      } 

        let token = localStorage.getItem("token");
        let header = ({ 'token': `${token}` });
        let options1 = ({ headers: header });

    const limit = 10;
    const FaqList = async () =>
    {
        

        await axios.post(`/web_api/user_complaint_list`, options1)
        .then(res => {
          const data = res.data.body;
          const total = res.data.rows;
          const totalPage = (Math.ceil(total / limit));
          setData(data);
          const category = data.category;
          const image = res.data.body.image;
          console.log(data); 
        //   console.log(userCategory); 
        })
    }

  useEffect(()=> {
     FaqList()
  },[])

 
        
         ///////////////pagenestion///////////////
    const fetchComments = async (page) => {
        const senData = { page: page }
        // const cosole = Fromvalue;
        // console.log(Fromvalue);
        axios.post(`/web_api/user_complaint_list`, senData,  options1)
            .then(res => {
                const data = res.data.body;
                setData(data);
            })
        return data;
    };

    const handlePageClick = async (data) => {
        // console.log(data.selected);
        const page = data.selected + 1;
        const commentsFormServer = await fetchComments(page);
        setData(commentsFormServer);
    };
  

    return (

        <>


<div className="row">
                <div className="col-lg-12">
                    <div className="table-card MuiPaper-root MuiPaper-elevation2 MuiPaper-rounded">
                        <h6 className="MuiTypography-root MuiTypography-h6 padd1rem">Complaint List</h6>
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">User Name</th>
                                    {/* <th scope="col">Complaint Category</th> */}
                                    <th scope="col">Complaint</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Status</th>
                                    <th scope="col" className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                              {data == '' ? <>
                               <tr>
                               <td className="text-center" colSpan='9'> 
                                 <img src="/assets/images/nodatafound.png" alt='no image' width="350px" /> </td>
                               </tr>
                               </> : null}
                                {data.map((item) => {
                                    return (
                                        <tr key={item._id}>

                                            <td><div className="imageSliderSmall">{item.image !== '' ? <> <img src={item.image} alt="slider img" /></> : <><img src='/assets/images/no-image.png' /></> }</div></td>
                                            <td>{item.user_id.name}</td>
                                            <td>{item.question}</td>
                                            <td>{item.createdAt}</td>
                                            <td>{item.admin_status == false ? <>Open</> : <>Closed</>}</td>
                                            <td className="text-end">
                                                <div className="d-flex justtify-content-end">
                                                    <IconButton onClick={(e) => { viewFun(item._id); }} aria-label="delete"> <span className="material-symbols-outlined">
                                                    sms </span>
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
                <div>
                </div>
            </div>

            {/* <div className="row">
                <div className="col-lg-12">

                    <MaterialTable
                        title="Complaint List"
                        columns={columns}
                        data={data}
                        actions={[
                            {
                                icon: 'sms',
                                iconProps: { style: { color: "#6259ca" } },
                                tooltip: 'Reply',
                                 onClick: (event, setData) => { viewFun(setData._id); }
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
            </div> */}
        </>

    )
}

export default TableComplaintComponent