import { useContext, useEffect, useState } from "react";
import userContext from "./userContext";
import JobCard from "./JobCard";
import JoblyApi from "./api";
import "./UserJobs.css";
import MySpinner from "./MySpinner";

/** UserJobs:
 *
 *  Props: none
 *
 *  States: jobs - like [{job: {id, title, salary, equity, company}}, ...]
 *
 *  ProfileForm -> UserJobs -> JobCard
 */

function UserJobs() {
  const { currUser, applicationIds } = useContext(userContext);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("UserJobs", jobs, currUser);

  useEffect(() => {
    async function getJobs(ids) {
      setIsLoading(true);
      const jobs = ids.map((id) => JoblyApi.getJob(id));
      const res = (await Promise.all(jobs)).map((j) => j.job);
      setJobs(res);
      setIsLoading(false);
      // ids.map(async id => {
      //   const jobResults = await JoblyApi.getJob(id);
      //   setJobs(prevJobs => [...prevJobs, jobResults]);
      // })
    }
    if (currUser && applicationIds) {
      getJobs(applicationIds);
    }
  }, [currUser, applicationIds]);

  if (isLoading) return <MySpinner />;

  return (
    <div className="UserJobs container">
      <h1 className="UserJobs-title mt-3">Jobs Applied to:</h1>
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

export default UserJobs;
