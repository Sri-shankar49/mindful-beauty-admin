import { useState } from "react";
import { createRoot } from "react-dom/client";
import { AgCharts } from "ag-charts-react";
import {
    // AgBarSeriesOptions,
    // AgCategoryAxisOptions,
    // AgChartCaptionOptions,
    // AgChartLegendOptions,
    AgChartOptions,
    // AgChartSubtitleOptions,
    // AgLineSeriesOptions,
    // AgNumberAxisOptions,
} from "ag-charts-community";

export function getData() {
    return [
        {
            quarter: "Q1'18",
            iphone: 140,
            mac: 16,
            ipad: 14,
            wearables: 12,
            services: 20,
        },
        {
            quarter: "Q2'18",
            iphone: 124,
            mac: 20,
            ipad: 14,
            wearables: 12,
            services: 30,
        },
        {
            quarter: "Q3'18",
            iphone: 112,
            mac: 20,
            ipad: 18,
            wearables: 14,
            services: 36,
        },
        {
            quarter: "Q4'18",
            iphone: 118,
            mac: 24,
            ipad: 14,
            wearables: 14,
            services: 36,
        },
    ];
}


export const BarChart = () => {
    const [options] = useState<AgChartOptions>({
        title: {
            text: "Apple's Revenue by Product Category",
        },
        subtitle: {
            text: "In Billion U.S. Dollars",
        },
        data: getData(),
        series: [
            {
                type: "bar",
                xKey: "quarter",
                yKey: "iphone",
                yName: "iPhone",
            },
            {
                type: "bar",
                xKey: "quarter",
                yKey: "mac",
                yName: "Mac",
            },
            {
                type: "bar",
                xKey: "quarter",
                yKey: "ipad",
                yName: "iPad",
            },
            {
                type: "bar",
                xKey: "quarter",
                yKey: "wearables",
                yName: "Wearables",
            },
            {
                type: "bar",
                xKey: "quarter",
                yKey: "services",
                yName: "Services",
            },
        ],
    });

    return <AgCharts options={options} />;
};

const root = createRoot(document.getElementById("root")!);
root.render(<BarChart />);