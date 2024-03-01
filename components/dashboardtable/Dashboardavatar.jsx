import React from "react";
import { FaUser } from "react-icons/fa";

const colors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
];

const Dashboardavatar = ({ firstName, lastName }) => {
  const fullName =
    firstName && lastName ? firstName + " " + lastName : "Bilinmeyen Kullanıcı";

  const getInitials = (firstName, lastName) => {
    if (firstName === null || lastName === null) {
      return "";
    }
    return `${firstName[0]}${lastName[0]}`;
  };

  const getRandomColor = (firstName, lastName) => {
    if (firstName === null || lastName === null) {
      return "#9e9e9e";
    }
    const index =
      Math.abs(firstName.charCodeAt(0) + lastName.charCodeAt(0)) %
      colors.length;
    return colors[index];
  };

  // Eğer kullanıcı bilgisi yoksa, default bir fotoğraf gösterir
  if (firstName === null || lastName === null) {
    return (
      <div
        title="Bilinmeyen Kullanıcı"
        style={{
          height: "40px",
          width: "40px",
          borderRadius: "50%",
          backgroundColor: "#9e9e9e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          verticalAlign: "middle",
        }}
      >
        <FaUser color="white" />
      </div>
    );
  }

  return (
    <div
      title={fullName}
      style={{
        height: "40px",
        width: "40px",
        backgroundColor: getRandomColor(firstName, lastName),
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        fontSize: "1rem",
      }}
    >
      {getInitials(firstName, lastName)}
    </div>
  );
};

export default Dashboardavatar;
