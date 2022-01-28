import React, { Fragment, useState, useEffect } from "react";
import { MOCK_PROJECTS } from "./MockProjects";
import { projectAPI } from "./projectAPI";
import ProjectList from "./ProjectList";
import { Project } from "./Project";
import ProjectListSkeleton from "./ProjectListSkeleton";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

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
        const data = await projectAPI.get(currentPage);
        setError(null);
        if (currentPage === 1) {
          setProjects(data);
        } else {
          setProjects((projects) => [...projects, ...data]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, [currentPage]);

  const saveProject = (project) => {
    // let updatedProjects = projects.map((p) => {
    //   return p.id === project.id ? project : p;
    // });
    // setProjects(updatedProjects);

    projectAPI
      .put(project)
      .then((updatedProject) => {
        let updatedProjects = projects.map((p) => {
          return p.id === project.id ? project : p;
        });
        setProjects(updatedProjects);
      })
      .catch((e) => setError(e.message));
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
      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && <ProjectListSkeleton />}
    </Fragment>
  );
};

export default ProjectsPage;
