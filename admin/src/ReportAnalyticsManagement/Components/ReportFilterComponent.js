import React from "react";
import Select from 'react-select';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function ReportFilterComponent(props)
{


    const formsave = (e)=>{
        e.preventDefault();
        const data = new FormData(e.target);
        let Formvlaues = Object.fromEntries(data.entries());  
            console.log('Formvlaues === ',Formvlaues);
            props.onClick(Formvlaues);
     }
    
    const countryOptions = [
        { value: 'India', label: 'india' },
        { value: 'Afghanistan', label: 'Afghanistan' },
        { value: 'slbania', label: 'Albania'  },
    ]

    const customStyles = {
        container: (base, state) => ({
            ...base,
            zIndex: "999"
          })
    }

  return (
        <>
            <div className="card custom-card">
                <div className="card-body">
                    <form onSubmit={(e)=>formsave(e)}>
                    <div className="row align-items-center">
                        <div className="col-lg-12 ">
                                 <FormGroup className="mb-3 ml-2">
                                    <FormControlLabel name=''  control={<Checkbox />} label="Guest User" />
                                  </FormGroup>
                        </div>
                        <div className="col-lg-4 ">
                            <TextField id="search" name='name' className="filter-input" label="Search User" autoComplete="off" fullWidth type="search"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div className="col-lg-4">
                            <TextField id="email" name='email' className="filter-input" label="Email Address" autoComplete="off" fullWidth type="email"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                       
                        <div className="col-lg-4 ">
                            <TextField id="mobile" name='mobile' className="filter-input" label="Mobile Number"  autoComplete="off" fullWidth type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>

                        <div className="col-lg-4 reletive mt-4">
                            <span className="react-select-title">Select Country</span>
                            <Select   name = 'country'
                                options={countryOptions}
                                isSearchable
                                placeholder="Search.."
                                isSelected="slbania"
                                menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                className="basic-multi-select"
                                classNamePrefix="select" />

                        </div>
                       
                        <div className="col-lg-3  mt-4">
                            <TextField id="sdate" name='s_date' className="filter-input" label="Start Date" autoComplete="off" fullWidth type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                        </div>

                        <div className="col-lg-3 mt-4">
                            <TextField id="edate" name='e_date' className="filter-input" label="End Date" autoComplete="off" fullWidth type="date"
                                InputLabelProps={{ shrink: true, }} />

                        </div>
                        <div className="col-lg-2 mt-4 d-flex">
                            <Button type='submit'  variant="contained" className="mr-3 btn-filter btnBg">Search</Button>
                            <Button type='button' className="mr-3 btn-dark ">Reset</Button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </>
    );

}

export default ReportFilterComponent;