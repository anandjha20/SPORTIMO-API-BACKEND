import React from "react";
import MaterialTable from 'material-table';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Moment from 'moment';
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function UserListTable() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  const [data, setData] = useState([])

  const date = Moment().format("MMM Do YY");
  const navigate = useNavigate();
  
  const viewFun = (_id)=>{
    navigate(`/user/detail/${_id}`);
    return false;   

  } 
  
    const columns =
    [
    // { title: 'Unique Id', field: '_id'},
    { title: 'User Name', field: 'name'},
    { title: 'Unique Name', field: 'u_name'},
    { title: 'Mobile No.', field: 'mobile'},
    { title: 'Email Address' , field: 'email'},
    { title: 'Date Of Birth', field: 'date',  },
    // { title: 'User language', field: 'user_language' },
    { title: 'Country' , field: 'country'},
    {title: 'Gender', field: 'gender'},
    ]

   
    const userlist = async () =>
    {
        await axios.get(`/user_list`)
        .then(res => {
          const userData = res.data.body;
          setData(userData);
          console.log(userData); 
        })
    }

    useEffect(()=> {
        userlist()
    },[])


return (

    <>

        <div className="row">
            <div className="col-lg-12">
                <MaterialTable
                    title="User Management"
                    columns={columns}
                     data={data}
                    actions={[
                        {
                            icon: 'visibility',
                            iconProps: { style: {color: "#6259ca" } },
                            tooltip: 'View Detail',
                            onClick: (event, setData) => { viewFun(setData._id);}
                        },
                        {
                            icon: 'notifications_active',
                            iconProps: { style: {color: "#6259ca" } },
                            tooltip: 'View Detail',
                            onClick: (event, setData) => { handleClickOpen(setData._id);}
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
                <div>
    
                     <Dialog className="notifi-style" open={open} onClose={handleClose}>
                        <DialogTitle><i className="fal fa-paper-plane"></i> &nbsp;Send Notification</DialogTitle>
                        <DialogContent>
                        {/* <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText> */}
                        <TextField multiline rows={3}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Enter Message"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        </DialogContent>
                        <DialogActions className="mb-2">
                        <Button className="mr-3" onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" className="mr-3 btn-pd btnBg" onClick={handleClose}>Send</Button>
                        </DialogActions>
                    </Dialog>
               </div>
            </div>
        </div>
    </>

)
}

export default UserListTable