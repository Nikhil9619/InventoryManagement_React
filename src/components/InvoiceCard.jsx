import React from "react";
import "../styles/Dashboard.css";

const InvoiceCard = ({ title, count, amount, color }) => {
  return (
    <div className="invoice-card">
      <div className="invoice-card-circle" style={{ borderColor: color }}>
        <span className="invoice-card-count">{count}</span>
      </div>
      <div className="invoice-card-info">
        <h3>{title}</h3>
        <p style={{ color }}>{`$${amount}`}</p>
      </div>
    </div>
  );
};

export default InvoiceCard;
