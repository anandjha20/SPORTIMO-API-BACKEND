import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);

export default function UserAnswerPieChart(props) {
    useEffect(() => {
        var chart = am4core.create("piediv", am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.legend = new am4charts.Legend();

        chart.data = [
            {
                country: "Answer 1",
                litres: 501.9
            },
            {
                country: "Answer 2",
                litres: 301.9
            },
            {
                country: "Answer 3",
                litres: 201.1
            },
            {
                country: "Answer 4",
                litres: 165.8
            },
            {
                country: "Answer 5",
                litres: 139.9
            },
        ];

        var series = chart.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = "litres";
        series.dataFields.category = "country";

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
