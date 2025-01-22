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
                name: "Bookings",
                data: bookingData.bookingsByDate || [], // API থেকে সংগ্রহকৃত ডেটা
            },
        ],
        options: {
            chart: {
                type: "bar",
                height: 350,
            },
            title: {
                text: "Bookings by Date",
                align: "center",
            },
            xaxis: {
                categories: bookingData.dates || [], // API থেকে তারিখ
                title: {
                    text: "Booking Date",
                },
            },
            yaxis: {
                title: {
                    text: "Number of Bookings",
                },
            },
        },
    };

    const lineChartData = {
        series: [
            {
                name: "Booked Parcels",
                data: bookingData.bookedByDate || [], // Booked ডেটা
            },
            {
                name: "Delivered Parcels",
                data: bookingData.deliveredByDate || [], // Delivered ডেটা
            },
        ],
        options: {
            chart: {
                type: "line",
                height: 350,
            },
            title: {
                text: "Booked vs Delivered Parcels by Date",
                align: "center",
            },
            xaxis: {
                categories: bookingData.dates || [], // API থেকে তারিখ
                title: {
                    text: "Booking Date",
                },
            },
            yaxis: {
                title: {
                    text: "Number of Parcels",
                },
            },
            stroke: {
                curve: "smooth",
            },
        },
    };

    return (
        <div className="statistics">
            <h2 className="text-2xl font-bold text-center mb-6">Dashboard Statistics</h2>
            <div className="chart-container mb-8">
                <Chart 
                    options={barChartData.options} 
                    series={barChartData.series} 
                    type="bar" 
                    height={350} 
                />
            </div>
            <div className="chart-container mb-8">
                <Chart 
                    options={lineChartData.options} 
                    series={lineChartData.series} 
                    type="line" 
                    height={350} 
                />
            </div>
        </div>
    );
};

export default Statistics;