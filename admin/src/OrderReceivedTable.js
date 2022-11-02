import React from "react";
import MaterialTable from 'material-table';

function OrderReceivedTable() {


    const columns =
        [
            
            { title: 'Order ID', field: 'id' },
            { title: 'Image', field: 'imageUrl', render: rowData => <i className="far fa-gem"></i> },
            { title: 'Package Name', field: 'pname'},
        
            { title: 'Price', field: 'price',},
            { title: 'Date', field: 'date',},
        ]

    const data =
        [
            { id: '#AB1234', pname: 'Diamonds(20)', imageUrl: '', price : 500, date : "20/05/2022" },
            { id: '#AB1232', pname: 'Diamonds(30)', imageUrl: '', price : 520, date : "20/05/2022" },
            { id: '#AB1231', pname: 'Diamonds(50)', imageUrl: '', price : 600, date : "20/05/2022" },
            { id: '#AB1239', pname: 'Diamonds(80)', imageUrl: '', price : 700, date : "20/05/2022" },
            
        ]


    return (

        <>

            <div className="row">
                <div className="col-lg-12 mb-5" style={{display : "none"}}>
               
                    <MaterialTable
                        title="Order Received"
                        columns={columns}
                        data={data}
                        actions={[
                            {
                                icon: 'visibility',
                                iconProps: { style: { color: "#6259ca" } },
                                tooltip: 'View Detail',
                                onClick: (event, rowData) => {}
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

export default OrderReceivedTable;