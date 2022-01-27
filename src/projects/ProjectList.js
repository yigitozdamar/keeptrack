import React from "react";
import PropTypes from "prop-types";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

function ProjectList({ projects }) {
  const items = projects.map((project) => (
    <div key={project.id} className="cols-sm">
      <ProjectCard project={project}></ProjectCard>
      <ProjectForm />
    </div>
  ));

  return <div className="row">{items}</div>;
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired,
};

export default ProjectList;
