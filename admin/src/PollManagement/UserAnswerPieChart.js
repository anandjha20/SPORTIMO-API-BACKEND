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
    const [dataChart, setData] = useState([])

    const userChart = async () =>
    {
        // await axios.get(`/poll_result_show/${id}`)
        await axios.get(`http://192.168.1.95:3600/web_api/poll_result_show/62f0e84de7122c6fbc1d4dac`)
        .then(res => {
          const dataChart = res.data.body[0];
          setData(dataChart);
          console.log(dataChart); 
        })
    }
    
    useEffect(() => {
        userChart();
      },[]); 

    useEffect(() => {
        var chart = am4core.create("piediv", am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.legend = new am4charts.Legend();
      
        if(dataChart._id == 'ops_1')
        {
            chart.data = [
                {
                    option: "Answer 1",
                    litres: dataChart.count
                },
            ]
        }

        // else(dataChart._id == 'ops_1' && dataChart._id == 'ops_2')   
        // {
        //     chart.data = [
        //         {
        //             option: "Answer 1",
        //             litres: dataChart.count
        //         },
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
