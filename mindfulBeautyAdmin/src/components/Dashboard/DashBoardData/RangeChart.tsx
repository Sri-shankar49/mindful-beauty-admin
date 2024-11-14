import { useState } from "react";
import { createRoot } from "react-dom/client";
import { AgCharts } from "ag-charts-react"; // Ensure correct component import
import {
    AgChartOptions,
    // AgNumberAxisOptions,
    // AgTimeAxisOptions,
    // AgAreaSeriesOptions,
    // AgChartCaptionOptions,
    // AgChartSubtitleOptions,
} from "ag-charts-community";

export function getData() {
    return [
        { asset: "Stocks", amount: 60000 },
        { asset: "Bonds", amount: 40000 },
        { asset: "Cash", amount: 7000 },
        { asset: "Real Estate", amount: 5000 },
        { asset: "Commodities", amount: 3000 },
    ];
}

export const RangeChart = () => {
    const [options] = useState<AgChartOptions>({
        data: getData(),
        title: {
            text: "Portfolio Composition",
        },
        series: [
            {
                type: "pie",
                angleKey: "amount",
                legendItemKey: "asset",
            },
        ],
    });


    return <AgCharts options={options} />;
};

const root = createRoot(document.getElementById("root")!);
root.render(<RangeChart />);
