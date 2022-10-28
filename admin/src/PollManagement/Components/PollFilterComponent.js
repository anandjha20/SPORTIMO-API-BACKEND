import React from "react";
import Select from 'react-select';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

 function PollFilterComponent()
{
const polltype = [
    { value: 'public', label: 'Public' },
    { value: 'private', label: 'Private' },
]
const pollfee = [
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Private' },
]

  return (
        <>
            <div className="card custom-card">
                <div className="card-body">
                    <div className="row align-items-center">
                    <div className="col-lg-12 ml-2">
                                 <FormGroup className="mb-3">
                                    <FormControlLabel name=''  control={<Checkbox />} label="Active Poll" />
                                  </FormGroup>
                        </div>
                        <div className="col-lg-4 mb-3">
                            <TextField id="search" className="filter-input" label="Search Match/league" fullWidth type="search"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div className="col-lg-4 reletive mb-3">
                            <span className="react-select-title">Poll Type</span>
                            <Select name="sports"
                                options={polltype}
                                className="basic-multi-select"
                                classNamePrefix="select" />

                        </div>
                        <div className="col-lg-4 reletive mb-3">
                            <span className="react-select-title">Poll Fee</span>
                            <Select name="sports"
                                options={pollfee}
                                className="basic-multi-select"
                                classNamePrefix="select" />

                        </div>
                        <div className="col-lg-4 mb-3">
                            <TextField id="sdate" className="filter-input" label="Start Date" fullWidth type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                        </div>

                        <div className="col-lg-3 mb-3">
                            <TextField id="edate" className="filter-input" label="End Date" fullWidth type="date"
                                InputLabelProps={{ shrink: true, }} />

                        </div>
                        <div className="col-lg-4 mb-3 d-flex">
                            <Button type='button' variant="contained" className="mr-3 btn-filter btnBg">Search</Button>
                            <Button type='button' className="mr-3 btn-dark pdl3">Reset</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default PollFilterComponent;