import React, { useState } from "react";
import styles from "./accordion.module.scss";

const Accordion = ({ title, children, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    if (onToggle) {
      onToggle(!isOpen);
    }
  };

  return (
    <div className={styles.accordion}>
      <div className={styles.accordionTitle} onClick={toggleAccordion}>
        <div className={styles.titleWithArrow}>
          <h3>{title}</h3>
          <span className={isOpen ? styles.upArrow : styles.downArrow}></span>
        </div>
      </div>
      {isOpen && <div className={styles.accordionContent}>{children} </div>}
    </div>
  );
};

export default Accordion;
