import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Statistics = () => {
    const axiosSecure = useAxiosSecure();
    const [bookingData, setBookingData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get("/admin/statistics");
                console.log("Booking Data:", response.data);
                setBookingData(response.data);
            } catch (error) {
                console.error("Error fetching statistics data:", error);
            }
        };

        fetchData();
    }, [axiosSecure]);

    const barChartData = {
        series: [
            {
                name: "Total Users",
                data: [bookingData.totalUsers || 0],
            },
            {
                name: "Total Parcels",
                data: [bookingData.totalParcels || 0],
            },
        ],
        options: {
            chart: {
                type: "bar",
                height: 350,
            },
            title: {
                text: "Total Users and Parcels",
                align: "center",
            },
            xaxis: {
                categories: bookingData.totalUsers && bookingData.totalParcels ? ['Metric'] : [], // চেক করুন যে ডেটা আছে কিনা
                title: {
                    text: "Metric",
                },
            },
            yaxis: {
                title: {
                    text: "Count",
                },
            },
        },
    };

    return (
        <div className="statistics">
        {bookingData.totalUsers && bookingData.totalParcels ? (
            <>
                <h2 className="text-2xl font-bold text-center mb-6">Dashboard Statistics</h2>
                <div className="chart-container mb-8">
                    <Chart 
                        options={barChartData.options} 
                        series={barChartData.series} 
                        type="bar" 
                        height={350} 
                    />
                </div>
            </>
        ) : (
            <div>Loading...</div>
        )}
    </div>
    );
};

export default Statistics;
