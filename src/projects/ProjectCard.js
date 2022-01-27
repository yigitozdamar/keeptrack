import React from "react";
import { Project } from "./Project";
import PropTypes from "prop-types";

function formatDescription(description) {
  return description.substring(0, 60) + "...";
}

function ProjectCard(props) {
  const { project, onEdit } = props;

  const handleEditClick = (projectBeingEdited) => {
    onEdit(projectBeingEdited);
  };
  return (
    <div className="card">
      <img src={project.imageUrl} alt={project.name} />
      <section className="section dark">
        <h5 className="strong">
          <strong>{project.name}</strong>
        </h5>
        <p>{formatDescription(project.description)}</p>
        <p>Budget : {project.budget.toLocaleString()}</p>
        <button
          className="bordered"
          onClick={() => {
            handleEditClick(project);
          }}
        >
          <span className="icon-edit"></span>
          Edit
        </button>
      </section>
    </div>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.instanceOf(Project).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ProjectCard;
