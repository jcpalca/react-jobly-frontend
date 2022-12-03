import { useContext, useEffect, useState } from "react";
import MySpinner from "./MySpinner";
import SearchForm from "./SearchForm";
import JobCard from "./JobCard";
import JoblyApi from "./api";
import userContext from "./userContext";

/**
 * JobList:
 *
 * Props: None
 *
 * State: jobs - list of jobs like
 *        [{companyHandle: "",
 *          companyName: "",
 *          equity: "",
 *          id: 1,
 *          salary: 110000,
 *          title: ""},
 *            ...{...}]
 *        currSearch - string
 *
 * Context: currUser
 *
 * Routes -> JobList -> { JobCard, SearchForm }
 */
function JobList() {
  const [jobs, setJobs] = useState(null);
  const [currSearch, setCurrSearch] = useState();

  const { currUser } = useContext(userContext);

  console.log("JobList", currSearch);

  useEffect(() => {
    search();
  }, []);

  if(!currUser) return null;

  /**Search for jobs and sets the jobs state.
   * Called from SearchForm and useEffect.
   */
  async function search(searchTerm = "") {
    const jobsResults = await JoblyApi.getJobs(
      searchTerm.length > 0 ? { title: searchTerm } : {}
    );
    setJobs(jobsResults);
    setCurrSearch(searchTerm);
  }

  if (jobs === null) {
    return <MySpinner />;
  }

  return (
    <div className="JobList container">
      <SearchForm searchFor={search} />
      {jobs.length > 0 ? (
        jobs.map((j) => <JobCard key={j.id} {...j} />)
      ) : (
        <p className="none lead d-flex justify-content-center mt-5">
          Nothing Found
        </p>
      )}
    </div>
  );
}

export default JobList;
