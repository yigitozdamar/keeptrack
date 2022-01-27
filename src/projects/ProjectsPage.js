import React, { Fragment } from "react";
import { MOCK_PROJECTS } from "./MockProjects";
import ProjectList from "./ProjectList";

const ProjectsPage = () => {
  const saveProject = (project) => {
    console.log("Saving Project: ", project);
  };

  return (
    <Fragment>
      <h1>Projects</h1>
      <ProjectList projects={MOCK_PROJECTS} onSave={saveProject} />
    </Fragment>
  );
};

export default ProjectsPage;
