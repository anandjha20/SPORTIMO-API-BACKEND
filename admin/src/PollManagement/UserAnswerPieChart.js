import React ,{ useState, useEffect} from "react";
import  Chart  from "react-apexcharts";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserAnswerPieChart()
{
   const [stdudentSubject, setStudentsubject]= useState([]);
   const [studentMarks, setStudentMarks]= useState([]);
   const [datachart, setData]= useState([]);
  
   const { id } = useParams();



const disclosedPoll = ()=>
{
    const OptionCount=[];
    const optionName=[];
   axios.get(`/web_api/poll_result_show/${id}`)
    .then(res => {
          const datachart = res.data.body;
          setData(datachart)
          console.log(datachart);
          if(res.status)
          {
            for(let i=0; i< datachart.length; i++)
                {
                optionName.push(datachart[i]._id);
                OptionCount.push((datachart[i].count));
                }
                setStudentsubject(optionName);
                setStudentMarks(OptionCount);
                console.log(optionName); 
                console.log(OptionCount); 
                console.log(datachart); 
         }
         else {
            toast.error('something went wrong please try again');
        }
        })
       
}

   useEffect( ()=>
    {
    disclosedPoll();

   },[]);

   
    return(
        <>
           <ToastContainer position="top-right" />

            <div className="container-fluid mb-3" >
                <h3 className="text-center mt-3 title-pie">USER ANSWERS CHART</h3>


                {!datachart ? <><h2 className="text-white text-center mt-5">No Answer Available!</h2></>  : null}
                {/* <Button type='submit' variant="contained" className="mr-3 btn-filter btnBg" onClick={() => { disclosedPoll();}}>Show Pie Chart</Button> */}
                <Chart 
                type="pie"
                style={{ width: "100%", height: "380px", marginTop: "40px" , }}
                series={ studentMarks}                
                 options={{
                        // title:{ text:"Student PieChart"
                        // } , 
                  noData:{text:"Empty Data"},                        
                  labels:stdudentSubject                     

                 }}
                >  

              
                </Chart>
            </div>
        </>
    );
}
export default UserAnswerPieChart;