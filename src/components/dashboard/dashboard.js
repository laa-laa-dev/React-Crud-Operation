import React from "react";
import Header from "../headers/header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { MdAddCard } from "react-icons/md";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin2Line } from "react-icons/ri";
import axios from "axios";
import { useState, useEffect } from "react";
import "./dashboard.css";
function Dashboard() {
  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setDeleteShow(false);
  };

  const [expenseData, setExpenseData] = useState([]);
  const [formData, setFormData] = useState({
    expenseName: "",
    description: "",
    amount: "",
  });
  const [isDataPosted, SetIsDataPosted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [deletedId, setDeletedId] = useState(null);
  // call an api which will get all the details that needs to show on table i.e expense data
  useEffect(() => {
    axios
      .get("https://67ea34ec34bcedd95f6293c5.mockapi.io/api/v1/expense") // API URL
      .then((response) => {
        console.log(response.data);
        setExpenseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isDataPosted]);

  // Handle input changes and update state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Dynamically update field values
    });
  };
  // Open Modal on click of add button
  const handleShow = () => {
    setShow(true);
    setIsEdit(false);
    handelResetForm();
  };
  // Add new Expense
  const handleAddNewExpense = async () => {
    console.log(formData);

    try {
      const response = await axios.post(
        "https://67ea34ec34bcedd95f6293c5.mockapi.io/api/v1/expense",
        formData
      );
      //   setMessage(`Submitted successfully! ID: ${response.data.id}`);
      console.log(response);
      if (response.status == 201) {
        SetIsDataPosted(!isDataPosted);
        setShow(false);
        handelResetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Function for reseting formdata
  const handelResetForm = () => {
    setFormData({
      expenseName: "",
      description: "",
      amount: "",
    });
  };

  // Open Modal Form Forn Edit Expense
  const handelEdit = (id) => {
    setIsEdit(true);
    setSelectedID(id);
    const selectedRow = expenseData.find((exp) => exp.id === id);
    console.log(selectedRow);
    setFormData(selectedRow);
    setShow(true);
  };
  // Function to update form
  const handleUpdateExpense = async () => {
    try {
      const response = await axios.put(
        `https://67ea34ec34bcedd95f6293c5.mockapi.io/api/v1/expense/${selectedID}`,
        formData
      );
      //   console.log(response);
      if (response.status == 200) {
        SetIsDataPosted(!isDataPosted);
        setShow(false);
        handelResetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // funtion to open delete modal and set selected id which i need to delete
  const handelDelete = (id) => {
    setDeletedId(id);
    setSelectedID(id);
    setDeleteShow(true);
  };
  // function to delete the selected id
  const handleDeleteExpense = async () => {
    try {
      const response = await axios.delete(
        `https://67ea34ec34bcedd95f6293c5.mockapi.io/api/v1/expense/${selectedID}`
      );
      console.log(response);
      if (response.status == 200) {
        SetIsDataPosted(!isDataPosted);
        setDeleteShow(false);
        handelResetForm();
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  return (
    <>
      <Row>
        <Header></Header>
      </Row>

      <Container>
        {/* Created a btn for form open */}
        <Row>
          <Col className="mt-3">
            {" "}
            <Button
              className="expenseAddBtn"
              variant="primary"
              onClick={handleShow}
            >
              <span>
                <MdAddCard className="expBtnIcon" />
              </span>{" "}
              Add New Expense
            </Button>
          </Col>
        </Row>
        <Row>
          {/* List of All Expenses */}
          <Col className="mt-3">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="custom-header">S.No</th>
                  <th className="custom-header">Tittle </th>
                  <th className="custom-header">Description </th>
                  <th className="custom-header">Amount</th>
                  <th className="custom-header">Action</th>
                </tr>
              </thead>
              <tbody>
                {expenseData.map((exp, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{exp.expenseName}</td>
                    <td>{exp.description}</td>
                    <td>{exp.amount}</td>
                    <td>
                      <Button variant="info" onClick={() => handelEdit(exp.id)}>
                        <span className="actionBtn">
                          <TbEdit />
                        </span>{" "}
                        Edit
                      </Button>
                      {"  "}
                      <Button
                        variant="danger"
                        onClick={() => handelDelete(exp.id)}
                      >
                        <span className="actionBtn">
                          <RiDeleteBin2Line />
                        </span>{" "}
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      {/* Add expense on modal form */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="custom-header" closeButton>
          <Modal.Title>Add New Expense </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form>
            {/* Tittle */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tittle </Form.Label>
              <Form.Control
                type="text"
                name="expenseName"
                placeholder="Expense Tittle "
                value={formData.expenseName}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Amount */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Amount </Form.Label>
              <Form.Control
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
              />
              {/* Description */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="Add description of Expense">
              <Form.Label>Description </Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={2}
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
          {/* Modal for form */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {isEdit ? (
            <Button
              className="custom-header"
              variant="primary"
              onClick={handleUpdateExpense}
            >
              Update Expense
            </Button>
          ) : (
            <Button
              className="custom-header"
              variant="primary"
              onClick={handleAddNewExpense}
            >
              Add new Expense
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* delete Modal */}
      <Modal show={deleteShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Expense </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Expense?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="custom-header"
            variant="primary"
            onClick={handleDeleteExpense}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Dashboard;
