import React from "react";
import Select from 'react-select';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";


 function FilterComponent(props)
{

 const formsave = (e)=>{
  
    e.preventDefault();
    const data = new FormData(e.target);
    let Formvlaues = Object.fromEntries(data.entries());  
        console.log('Formvlaues === ',Formvlaues);
        props.onClick(Formvlaues);

 }
const sportOptions = [
    { value: 'banner', label: 'Banner' },
    { value: 'video', label: 'Video' },
]

  return (
        <>
            <div className="card custom-card">
                <div className="card-body">
                <form onSubmit={(e)=>formsave(e)} >
                    <div className="row align-items-center">
                        <div className="col-lg-3 p-0">
                            <TextField id="search" name = 'match' className="filter-input" label="Search Match/league" fullWidth type="search"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div className="col-lg-3 reletive">
                            <span className="react-select-title">Sponsorship Type</span>
                            <Select   name = 'view_type'
                                options={sportOptions}
                                className="basic-multi-select"
                                classNamePrefix="select" />

                        </div>
                        <div className="col-lg-3" style={{ maxWidth: "19.5%" }}>
                            <TextField id="sdate" name = 'Fdate'  className="filter-input" label="Start Date" fullWidth type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                        </div>

                        <div className="col-lg-3" style={{ maxWidth: "19.5%" }}>
                            <TextField id="edate"  name = 'Ldate' className="filter-input" label="End Date" fullWidth type="date"
                                InputLabelProps={{ shrink: true, }} />

                        </div>
                        <div className="col-lg-1">
                            <Button type='submit' variant="contained" className="mr-3 btn-filter btnBg">Search</Button>
                        </div>
                    </div>
                 </form>

                </div>
            </div>
        </>
    );

}

export default FilterComponent;