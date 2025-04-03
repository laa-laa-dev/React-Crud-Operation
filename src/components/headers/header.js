import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./header.css";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

function Header() {
  return (
    <Navbar className="bgStyle">
      <Container>
        <Navbar.Brand href="#dashboard" className="logoText">
          <span className="logoIcon">
            {" "}
            <FaMoneyBillTrendUp />
          </span>
          Expense Tracker
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
export default Header;
