const express = require("express");

const Employee = require("../models/employee");

const router = express.Router();

router.post("", (req, res, next) => {
  const employee = new Employee({
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary
  });

  employee.save().then(addEmployee => {
    res.status(201).json({
      message: "Employee added successfully",
      employeeId: addEmployee._id
    });
  });

});

router.put("/:id", (req, res, next) => {
  const employee = new Employee({
    _id: req.body.id,
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary

  });
  Employee.updateOne({ _id: req.params.id }, employee).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get("", (req, res, next) => {
  Employee.find().then(documents => {
    res.status(200).json({
      message: "Employees fetched successfully!",
      employees: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Employee.findById(req.params.id).then(employee => {
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: "Employee not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Employee.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Employee deleted!" });
  });
});

module.exports = router;
