import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';
import './Admin.css'

const Statistics = () => {
  const [bookingData, setBookingData] = useState([]);
  const [parcelData, setParcelData] = useState([]);
  const [chartOptions, setChartOptions] = useState({
    bar: {
      series: [],
      options: {
        chart: {
          id: 'bookings-by-date',
          type: 'bar',
        },
        xaxis: {
          categories: [],
        },
        title: {
          text: 'Bookings by Date',
          align: 'center',
        },
      },
    },
    line: {
      series: [],
      options: {
        chart: {
          id: 'booked-vs-delivered',
          type: 'line',
        },
        xaxis: {
          categories: [],
        },
        title: {
          text: 'Comparison of Booked vs Delivered Parcels',
          align: 'center',
        },
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsResponse = await axios.get('http://localhost:5000/parcels');
        const parcels = bookingsResponse.data;

        const bookingsByDate = parcels.reduce((acc, parcel) => {
          const bookingDate = new Date(parcel.bookingDate).toLocaleDateString();
          if (!acc[bookingDate]) acc[bookingDate] = 0;
          acc[bookingDate] += 1;
          return acc;
        }, {});

        setChartOptions((prevOptions) => ({
          ...prevOptions,
          bar: {
            series: [{ name: 'Bookings', data: Object.values(bookingsByDate) }],
            options: {
              ...prevOptions.bar.options,
              xaxis: {
                categories: Object.keys(bookingsByDate),
              },
            },
          },
        }));

        const bookedVsDelivered = parcels.reduce(
          (acc, parcel) => {
            const bookingDate = new Date(parcel.bookingDate).toLocaleDateString();
            if (!acc[bookingDate]) {
              acc[bookingDate] = { booked: 0, delivered: 0 };
            }
            acc[bookingDate].booked += 1;
            if (parcel.status === 'Delivered') {
              acc[bookingDate].delivered += 1;
            }
            return acc;
          },
          {}
        );

        setChartOptions((prevOptions) => ({
          ...prevOptions,
          line: {
            series: [
              {
                name: 'Booked',
                data: Object.values(bookedVsDelivered).map((item) => item.booked),
              },
              {
                name: 'Delivered',
                data: Object.values(bookedVsDelivered).map((item) => item.delivered),
              },
            ],
            options: {
              ...prevOptions.line.options,
              xaxis: {
                categories: Object.keys(bookedVsDelivered),
              },
            },
          },
        }));
      } catch (error) {
        console.error('Error fetching statistics data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="chart-container">
        <h2>Statistics</h2>
        <div className="chart">
          <h3>Bookings by Date</h3>
          <ApexCharts options={chartOptions.bar.options} series={chartOptions.bar.series} type="bar" height={350} />
        </div>
        <div className="chart">
          <h3>Booked vs Delivered Parcels</h3>
          <ApexCharts options={chartOptions.line.options} series={chartOptions.line.series} type="line" height={350} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
