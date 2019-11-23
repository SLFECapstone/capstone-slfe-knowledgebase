import React from "react";
import SectionTitle from "../SectionTitle";
import PropTypes from "prop-types";

export default function ResultUser({ username, role }) {
  return (
    <div
      style={{
        marginBottom: "10px",
        display: "flex",
        borderBottom: "1px solid",
        flexDirection: "row",
        alignItems: "center"
      }}>
      <div style={{ maginBottom: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "500px"
          }}>
          <div style={{ marginBottom: "10px" }}>
            <SectionTitle label={username} />
            <div style={{ font: "Helvetica", fontSize: "14px", color: "#5D5D5D" }}>
              current role: {role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ResultUser.propTypes = {
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};
