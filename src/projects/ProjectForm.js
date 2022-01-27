import React, { useState } from "react";
import PropTypes from "prop-types";
import { Project } from "./Project";

const ProjectForm = ({ onCancel, onSave, project: initialProject }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(new Project({ name: "Updated Project" }));
  };

  const [project, setProject] = useState(initialProject);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    //if input type is checkbox use checked
    //otherwise it's type is text,number etc. so use value
    let updatedValue = type === "checkbox" ? checked : value;
    //if input type is number convert the updatedValue  string to a number
    if (type === "number") {
      updatedValue = Number(updatedValue);
    }
    const change = {
      [name]: updatedValue,
    };

    let updatedProject;

    //need to do functional update b/c
    //the new project state is based on the previous project state
    //so we can keep the project properties that aren't being edited +like project.id
    //the spread operator (...) is used to
    //spread the previous project properties and the new change

    setProject((p) => {
      updatedProject = new Project({ ...p, ...change });
    });
  };

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input type="text" name="name" placeholder="enter name" />
      <label htmlFor="description">Project Description</label>
      <textarea name="description" placeholder="enter description" />
      <label htmlFor="budget">Project Budget</label>
      <input type="number" name="budget" placeholder="enter budget" />
      <label htmlFor="isActive">Active?</label>
      <input type="checkbox" name="isActive" />
      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span />
        <button type="button" className="bordered medium" onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
};

ProjectForm.propTypes = {
  project: PropTypes.instanceOf(Project),
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ProjectForm;
