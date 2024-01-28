import React from "react";
import { Line, Pie } from "@ant-design/charts";
import "./style.css";

function Chart({ sortedTransactions }) {
    const data = sortedTransactions.map((item) => {
        return { date: item.date, amount: item.amount };
    });

    const config = {
        data: data,
        height: 400,
        xField: "date",
        yField: "amount",
    };

    const spendingData = sortedTransactions.filter((item) => {
        if (item.type == "expense") {
            return { amount: item.amount, tag: item.tag };
        }
    });

    //   let finalSpending = spendingData.reduce((acc, obj) => {
    //     let key = obj.tag;
    //     if (!acc[key]) {
    //       acc[key] = {
    //         amount: obj.amount,
    //         tag: obj.tag,
    //       };
    //     } else {
    //       acc[key].amount += obj.amount;
    //     }
    //     return acc;
    //   });

    let newSpending = [
        { tag: "food", amount: 0 },
        { tag: "trading", amount: 0 },
        { tag: "education", amount: 0 },
        { tag: "shopping", amount: 0 },
        { tag: "others", amount: 0 },
    ];

    spendingData.forEach((item) => {
        if (item.tag == "food") {
            newSpending[0].amount += item.amount;
        } else if (item.tag == "trading") {
            newSpending[1].amount += item.amount;
        } else if (item.tag == "education") {
            newSpending[2].amount += item.amount;
        } else if (item.tag == "shopping") {
            newSpending[3].amount += item.amount;
        } else if (item.tag == "others") {
            newSpending[4].amount += item.amount;
        }
    });

    const spendingConfig = {
        data: newSpending,
        height: 400,
        angleField: "amount",
        colorField: "tag",
    };
    let chart;
    let pieChart;

    return (
        <div className="chart-wrapper">
            <div className="chart-analytics chart">
                <h2>Your Analytics</h2>
                <Line
                    {...config}
                    onReady={(chartInstance) => (chart = chartInstance)}
                />
            </div>
            <div className="chart-spendings chart">
                <h2>Your Spendings</h2>
                <Pie
                    {...spendingConfig}
                    onReady={(chartInstance) => (pieChart = chartInstance)}
                />
            </div>
        </div>
    );
}

export default Chart;
