import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export default function LogDetails() {
  const [log, setlog] = useState([]);
  let { index } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // fetch a list of logs from our API
    axios
      .get(`${API}/logs/${index}`)
      .then((res) => {
        setlog(res.data);
      })
      .catch(() => {
        navigate('/not-found');
      });
  }, [index, navigate]);

  const handleDelete = () => {
    axios
      .delete(`${API}/logs/${index}`)
      .then(() => {
        navigate('/logs');
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  return (
    <article>
      <h1>
        {log.title} - By {log.captainName}
      </h1>
      <h2>{log.post}</h2>
      <h3>Days since last crisis: {log.daysSinceLastCrisis}</h3>
      <div className='showNavigation'>
        <div>
          <Link to={`/logs`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          <Link to={`/logs/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}