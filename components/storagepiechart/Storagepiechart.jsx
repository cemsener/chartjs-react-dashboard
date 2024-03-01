import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { FaHdd } from "react-icons/fa";
import { getTotalStorage } from "../../api/admindashboardApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

const Storagepiechart = () => {
  const [usedStorage, setUsedStorage] = useState(0);
  const totalStorage = 2; //Toplam depolama alanı GB cinsinden

  useEffect(() => {
    const fetchStorageData = async () => {
      try {
        const storageData = await getTotalStorage();
        setUsedStorage(storageData / 1024 / 1024); //KB to GB
      } catch (error) {
        console.error("Storage data fetch error:", error);
      }
    };
    fetchStorageData();
  }, []);

  const remainingStorage = totalStorage - usedStorage;
  const usedPercentage = (usedStorage / totalStorage) * 100;

  const data = {
    labels: [""],
    datasets: [
      {
        label: "Kullanılan Depolama",
        data: [usedStorage],
        backgroundColor: usedPercentage >= 80 ? "#ff0000" : "#007bff", //%80 ve üstünde kırmızı renkli
        barPercentage: 0.5,
      },
      {
        label: "Kalan Depolama",
        data: [remainingStorage],
        backgroundColor: "#d3d3d3",
        barPercentage: 0.5,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: "end",
        align: "top",
        offset: 30,
        color: "#000000",
        font: {
          size: 12,
        },
        formatter: (value, context) => {
          if (context.datasetIndex === 0) {
            return `${usedPercentage.toFixed(2)}%`;
          }
          return null;
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const datasetIndex = context.datasetIndex;
            const value = context.raw;

            if (datasetIndex === 0) {
              // Kullanılan Depolama
              return `Kullanılan Depolama: ${(value * 1024).toFixed(2)} MB`;
            } else {
              // Kalan Depolama
              return `Kalan Depolama: ${(value * 1024).toFixed(2)} MB`;
            }
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        display: false,
      },
      y: {
        stacked: true,
        display: false,
      },
    },
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaHdd
          style={{ fontSize: "3rem", marginRight: "10px", color: "dark-gray" }}
        />
        <Bar data={data} options={options} />
      </div>
      <div
        style={{
          alignSelf: "flex-end",
          marginTop: "-35px",
          marginBottom: "20px",
        }}
      >
        <span style={{ fontWeight: "bold" }}>Toplam Depolama Alanı:</span>{" "}
        {totalStorage} GB
      </div>
    </div>
  );
};

export default Storagepiechart;
