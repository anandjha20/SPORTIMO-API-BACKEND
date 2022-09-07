import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from "axios";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);

export default function UserAnswerPieChart(props) {


    const { id } = useParams();
    const [dataChart, setData] = useState('')
    const [dataChart0, setData0] = useState('')
    const [dataChart1, setData1] = useState('')
    const [dataChart2, setData2] = useState('')
    const [dataChart3, setData3] = useState('')
    const [dataChart4, setData4] = useState('')

    const userChart = async () =>
    {
        // await axios.get(`/poll_result_show/${id}`)
        await axios.get(`http://192.168.1.95:3600/web_api/poll_result_show/63186188a3c6c1cc38f72166`)
        .then(res => {
          const dataChart = res.data.body;
          const dataChart0 = res.data.body[0];
          const dataChart1 = res.data.body[1];
          const dataChart2 = res.data.body[2];
          const dataChart3 = res.data.body[3];
          setData(dataChart);
          setData0(dataChart0);
          setData1(dataChart1);
          setData2(dataChart2);
          setData3(dataChart3);
         
        })
    }
    
    useEffect(() => {
        userChart();
      },[]); 

    useEffect(() => {
        var chart = am4core.create("piediv", am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.legend = new am4charts.Legend();


        if(dataChart3._id == "ops_3")
        {
         chart.data = 
            [  
                {
                    option: dataChart0._id,
                    litres: dataChart0.count,
                },
                {
                    option: dataChart1._id,
                    litres: dataChart1.count,
                },
                {
                    option: dataChart2._id,
                    litres: dataChart2.count,
                },
                {
                    option: dataChart3._id,
                    litres: dataChart3.count,
                },
             ] 
            }

    
    // { dataChart.map((obj) => 
    //   chart.data = 
    //     [  
    //         {
    //             option: obj._id,
    //             litres: obj.count,
    //         },
    //     ] 
    //      )}

        // if(dataChart._id === 'ops_1')
        // {
        //     chart.data = [
        //         {
        //             option: "Answer 1",
        //             litres: dataChart.count
        //         },
        //     ]
        // }

     
        var series = chart.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = "litres";
        series.dataFields.category = "option";

        return () => {
            chart && chart.dispose();
        };
    });

    

    return(
        <>
            <div
                id="piediv"
                className={props.className}
                style={{ width: "100%", height: "380px", marginTop: "40px" , }}
            >

            </div>
        </>

    );
}
