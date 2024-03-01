import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getClassroomPercentageByGroupType } from "../../api/admindashboardApi";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DBPieChart = () => {
  //Grafik için gerekli veriler burada çekiliyor.
  const [dataSet, setDataSet] = useState([]);
  const [labels, setLabels] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState([
    "#007bff", // Mavi
    "#fd7e14", // Turuncu
    "#ffc107", // Sarı
    "#28a745", // Yeşil
    "#b0b0b0", // Gri
    "#17a2b8", // Açık Mavi
    "#dc3545", // Kırmızı
  ]);
  const [otherData, setOtherData] = useState([]); //%10 dan küçük değere sahip olanlar için toplam

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getClassroomPercentageByGroupType();
        if (response.isSuccess) {
          const data = response.data;
          const newDataSet = [];
          const newLabels = [];
          const newBackgroundColor = [...backgroundColor];
          const otherDataTemp = [];

          data.forEach((item) => {
            if (item.percentage > 0) {
              //%10 dan küçükse ayrı bir diziye at
              if (item.percentage < 10) {
                otherDataTemp.push({
                  name: item.groupTypeName,
                  value: item.percentage,
                });
              } else {
                newDataSet.push(item.percentage);
                newLabels.push(item.groupTypeName);
              }
            }
          });

          //%10 dan küçük olanları ayrı bir yerde topla
          if (otherDataTemp.length > 0) {
            const otherTotal = otherDataTemp.reduce(
              (acc, item) => acc + item.value,
              0
            );
            newDataSet.push(otherTotal);
            newLabels.push("Diğer");
            newBackgroundColor.push("#a9a9a9"); // Gri
            setOtherData(otherDataTemp);
          }

          setDataSet(newDataSet);
          setLabels(newLabels);
          setBackgroundColor(newBackgroundColor);
        }
      } catch (error) {
        console.error("Pasta Grafiği Veri Çekme Hatası", error);
      }
    };

    fetchData();
  }, []);

  //Çekilen veriler grafiğe burada aktarıldı.
  const data = {
    labels: labels,
    datasets: [
      {
        data: dataSet,
        backgroundColor: backgroundColor,
        hoverBackgroundColor: backgroundColor,
      },
    ],
  };

  //Grafik için gerekli ayarlamalar
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            if (context.label === "Diğer") {
              return otherData.map((item) => `${item.name}: ${item.value}%`);
            }
            return `${context.label}: ${context.formattedValue}%`;
          },
        },
      },
      datalabels: {
        color: "#fff",
        display: function (context) {
          return context.dataset.data[context.dataIndex] > 5;
        },
        formatter: (value, context) => {
          // "Diğerleri" etiketinin yüzdelik değerini gizle
          if (context.chart.data.labels[context.dataIndex] === "Diğer") {
            return null;
          }
          return `${value}%`;
        },
      },
    },
    cutout: "45%",
  };

  return <Doughnut data={data} options={options} />;
};

export default DBPieChart;
