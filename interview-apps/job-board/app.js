import { useState, useEffect } from "react";
import "./styles.css";

const PAGE_SIZE = 3;

const JobPosting = ({ title, author, time, url }) => {
  const localTime = new Date(time * 1000).toLocaleString();
  return (
    <div className="post">
      <div className="post__title">
        {url ? (
          <a href={url} target="_blank">
            {title}
          </a>
        ) : (
          title
        )}
      </div>
      <div className="post_metadata">
        <p>
          By: {author} &middot; {localTime}
        </p>
      </div>
    </div>
  );
};

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [jobIds, setJobIds] = useState(null);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const fetchJobIds = async (curPage) => {
    let jobs = jobIds;
    if (!jobs) {
      const res = await fetch(
        "https://hacker-news.firebaseio.com/v0/jobstories.json"
      );
      jobs = await res.json();
      setJobIds(jobs);
    }
    const start = curPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return jobs.slice(start, end);
  };

  const fetchJobs = async (curPage) => {
    setIsFetching(true);
    const jobIdsForCurPage = await fetchJobIds(curPage);
    const jobsForCurPage = await Promise.all(
      jobIdsForCurPage.map((jobId) => {
        // remember to return the promise here
        return fetch(
          `https://hacker-news.firebaseio.com/v0/item/${jobId}.json`
        ).then((res) => res.json());
        // const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`)
        // const data = await res.json();
        // return data;
      })
    );
    console.log(jobsForCurPage);
    setJobs([...jobs, ...jobsForCurPage]);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  return (
    <div className="app">
      <h2>Hacker News Jobs Board</h2>
      {!jobIds ? (
        <p>Loading</p>
      ) : (
        <>
          <div className="jobs">
            {jobs.map((job) => {
              return (
                <JobPosting
                  key={job.id}
                  title={job.title}
                  author={job.by}
                  time={job.time}
                  url={job.url}
                />
              );
            })}
          </div>
          {page * PAGE_SIZE + PAGE_SIZE < jobIds.length && (
            <button
              className="load-more-button"
              disabled={isFetching}
              onClick={() => setPage(page + 1)}
            >
              {isFetching ? "Loading" : "Load more jobs"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
