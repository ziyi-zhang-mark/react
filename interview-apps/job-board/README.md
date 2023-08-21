### Convert timestamp to local time string

```js
const localTime = new Date(time * 1000).toLocaleString();
```

### batch http requests using Promise.all()

```js
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

// 不能用 useCallback() 因为 jobs 在每次 render 时都会被更新，每次 render 要创建新的 fetchJobs function
const fetchJobs = async (curPage) => {
  setIsFetching(true);
  const jobIdsForCurPage = await fetchJobIds(curPage);
  const jobsForCurPage = await Promise.all(
    jobIdsForCurPage.map((jobId) => {
      // remember to return the promise here
      return fetch(
        `https://hacker-news.firebaseio.com/v0/item/${jobId}.json`
      ).then((res) => res.json());
      // OR USING AWAIT...
      // const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`)
      // const data = await res.json();
      // return data;
    })
  );
  setJobs([...jobs, ...jobsForCurPage]);
  setIsFetching(false);
};

useEffect(() => {
  fetchJobs(page);
}, [page]);
```
