import React, { Fragment, useState, useEffect } from "react";
import { MOCK_PROJECTS } from "./MockProjects";
import { projectAPI } from "./projectAPI";
import ProjectList from "./ProjectList";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  // Approach 1: using promise then
  //  useEffect(() => {
  //    setLoading(true);
  //    projectAPI
  //      .get(1)
  //      .then((data) => {
  //        setError(null);
  //        setLoading(false);
  //        setProjects(data);
  //      })
  //      .catch((e) => {
  //        setLoading(false);
  //        setError(e.message);
  //      });
  //  }, []);

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const data = await projectAPI.get(1);
        setError(null);
        setProjects(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const saveProject = (project) => {
    let updatedProjects = projects.map((p) => {
      return p.id === project.id ? project : p;
    });
    setProjects(updatedProjects);
  };

  return (
    <Fragment>
      <h1>Projects</h1>
      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}

      <ProjectList projects={projects} onSave={saveProject} />
      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </Fragment>
  );
};

export default ProjectsPage;
