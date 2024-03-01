import React, { useState, useEffect } from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSchool,
  FaUserTie,
} from "react-icons/fa";
import TotalCard from "./components/totalcards/TotalCard";
import Combochart from "./components/combochart/Combochart";
import styles from "./scss/maindashboard.module.scss";
import DBarChart from "./components/dashboardbarchart/DBarChart";
import DBTable from "./components/dashboardtable/DBTable";
import DBPieChart from "./components/dashboardpiechart/DBPieChart";
import Storagepiechart from "./components/storagepiechart/Storagepiechart";
import DBarChartGroup from "./components/dashboardbarchart/DBarChartGroup";
import {
  getActiveStudentCount,
  getActiveTrainerCount,
  getActiveAdminCount,
  getActiveClassroomCount,
} from "./api/admindashboardApi";
import Accordion from "./components/accordion/Accordion";

const Maindashboard = () => {
  const [activeStudentCount, setActiveStudentCount] = useState(0);
  const [activeTrainerCount, setActiveTrainerCount] = useState(0);
  const [activeAdminCount, setActiveAdminCount] = useState(0);
  const [activeClassroomCount, setActiveClassroomCount] = useState(0);
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const studentCount = await getActiveStudentCount();
        setActiveStudentCount(studentCount);

        const trainerCount = await getActiveTrainerCount();
        setActiveTrainerCount(trainerCount);

        const adminCount = await getActiveAdminCount();
        setActiveAdminCount(adminCount);

        const classroomCount = await getActiveClassroomCount();
        setActiveClassroomCount(classroomCount);
      } catch (error) {
        console.error("Card verileri alınırken hata oluştu: ", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (isAccordionExpanded) {
      setTimeout(() => {
        const pageHeight = document.body.scrollHeight;
        window.scrollTo({
          top: pageHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [isAccordionExpanded]);

  const handleAccordionToggle = () => {
    setIsAccordionExpanded(!isAccordionExpanded);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.cardContainer}>
        <TotalCard
          icon={<FaUserGraduate />}
          title={"Aktif Öğrenci Sayısı"}
          number={activeStudentCount}
          color={"#007bff"}
        />

        <TotalCard
          icon={<FaChalkboardTeacher />}
          title={"Eğitmen Sayısı"}
          number={activeTrainerCount}
          color={"#28a745"}
        />

        <TotalCard
          icon={<FaSchool />}
          title={"Aktif Grup Sayısı"}
          number={activeClassroomCount}
          color={"#ffc107"}
        />

        <TotalCard
          icon={<FaUserTie />}
          title={"Admin Sayısı"}
          number={activeAdminCount}
          color={"#dc3545"}
        />
      </div>

      <div className={styles.comboContainer}>
        <div className={styles.comboChartCard}>
          <h3>Kayıtlı Öğrencilerin Aylık Şubelere Göre Dağılımı</h3>
          <div className={styles.comboChart}>
            <Combochart />
          </div>
        </div>
        <div className={styles.barChartContainer}>
          <div className={styles.pieChartCard}>
            <h3>Sınıfların Grup Tiplerine Göre Dağılımı</h3>
            <div className={styles.pieChart}>
              <DBPieChart />
            </div>
          </div>
          <div className={styles.storageChartCard}>
            <h3>Kaynak Depolama Alanı</h3>
            <div className={styles.storageChart}>
              <Storagepiechart />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.graphContainer}>
        <div className={styles.dBarChartCard}>
          <h3>Eğitime Kayıtlı Öğrenci Sayısı</h3>
          <div className={styles.barChart}>
            <DBarChart />
          </div>
        </div>
        <div className={styles.dBarChartCard}>
          <h3>Eğitime Kayıtlı Grup Sayısı</h3>
          <div className={styles.barChart}>
            <DBarChartGroup />
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <Accordion
          title="Onay Bekleyen Kaynak Listesi"
          onToggle={handleAccordionToggle}
        >
          <DBTable />
        </Accordion>
      </div>
    </div>
  );
};

export default Maindashboard;
