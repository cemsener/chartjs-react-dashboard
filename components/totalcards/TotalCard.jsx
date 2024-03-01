import React from "react";
import styles from "./totalcard.module.scss";

const TotalCard = ({ icon, title, number, color }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card} style={{ borderColor: color }}>
        <div
          className={styles.cardBorder}
          style={{ backgroundColor: color }}
        ></div>
        <div className={styles.cardBody}>
          <div className={styles.cardIcon} style={{ color: color }}>
            {icon}
          </div>
          <div className={styles.cardDivider}></div>
          <div className={styles.cardContent}>
            <p className={styles.cardTitle}>{title}</p>
            <p className={styles.cardNumber} style={{ color: color }}>
              {number}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCard;
