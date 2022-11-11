import React from "react";
import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import Moment from 'moment';
import Header from "../Header";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


function UsersListGroup() {

    const {id} = useParams();

    let token = localStorage.getItem("token");
    let header = ({ 'token': `${token}` });
    let options1 = ({ headers: header });
    const [data, setData] = useState([]);
    const [item, setItems] = useState('');
    const GroupListData = async () =>
    {
        await axios.get(`/web_api/FirebaseGroupUserList/${id}`, options1)
        .then(res => {
          const data = res.data.body[0].members;
          const items = res.data.body[0];
          setData(data);
          setItems(items);
        })
    }

    useEffect(() => {
        GroupListData()
      }, []);


    const columns =
        [  
            { title: 'Image', render : rowData => <><div className="imageSet">
            {rowData.profileImg !== '' ? <><img src={rowData.profileImg}  /></> : <><img src="/assets/images/no-image.png"  /></> }
            </div> </> },
            { title: 'Members Name', field: 'name'},
            { title: 'Email Address', field: 'email'},
            // { title: 'Date', field: 'gamedate'},  
        ]

    return (
        <>
          <Header />
            <div className="main-content side-content pt-0">
                <div className="container-fluid">
                    <div className="inner-body">

                        <div className="page-header">
                            <div>
                                <h2 className="main-content-title tx-24 mg-b-5">Group Members List</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>
                                  
                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Group Members List</li>
                                </ol>
                            </div>
                            <div className="d-flex">
								<div className="justify-content-center">
							       {/* <Link  to="/geq/create">
                                    <Button type='button' variant="contained" className="mr-3 btn-pd btnBg"><i className="fas fa-plus"></i>&nbsp;&nbsp; Add  Groups Chat Management</Button>
                                    </Link> */}
                                </div>
							</div>
                           
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">
                                
                                        <div className="row">
                            <div className="col-lg-12">
                                <MaterialTable
                                    title={item.name} 
                                    columns={columns}
                                    data={data}
                                
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default UsersListGroup;