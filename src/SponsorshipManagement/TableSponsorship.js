import React from "react";
import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';



function TableSponsorship(props) {

    const sponsor_list = props.myData;

    const navigate = useNavigate();

    const viewFun = (id)=>{

      
     navigate(`/sponsorship/detail/${id}`);
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
                       impression : '20', Clicks : '50', match: item.match , id:item._id };
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