'use client'

import { ChartData, ChartDataX } from '@/helpers/chartData';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { useEffect, useState } from 'react';

Chart.register( CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend );

import { Line } from 'react-chartjs-2';

export default function SubmissionChart({ submissions }: { submissions: string[][] }) { // Expecting 3 datasets
    // const [submissionData, setSubmissionData] = useState([0,0,0,0,0,0])

    // useEffect(() => {
    //     setSubmissionData(ChartDataX(submissions || [])[0])
    // }, [submissions])

    const data = {
        labels: ChartData(),
        datasets: [
            {
                data: submissions[0], // First submission dataset
                borderColor: "rgb(145, 97, 227)",
                fill: {
                    target: 'origin',
                    above: "rgba(132, 97, 227, 0.2)",
                    below: "rgba(0, 0, 0, 0.1)",
                },
                label: "Orders",
                tension: 0.4,
                borderWidth: 1,
                point: {
                    radius: 2,
                    hitRadius: 0,
                },
            },
            {
                data: submissions[1], // Second submission dataset
                borderColor: "rgb(235, 54, 87)", // Different color
                fill: {
                    target: 'origin',
                    above: "rgba(235, 54, 93, 0.2)",
                    below: "rgba(0, 0, 0, 0.1)",
                },
                label: "Customers",
                tension: 0.4,
                borderWidth: 1,
                point: {
                    radius: 2,
                    hitRadius: 0,
                },
            }
        ]
    }

    const options = {
        plugins: {
            legend: {
                display: true, // Enable legend to differentiate between submissions
            },
            title: {
                display: false
            }
        },
        elements: {
            line: {
                tension: 0.4,
                borderWidth: 1,
            },
            point: {
                radius: 2,
                hitRadius: 0
            }
        }
    }

    return (
        <Line data={data} options={options} />
    )
}
