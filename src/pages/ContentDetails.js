import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BASE_URL } from "../constants/api";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function ContentDetails() {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let history = useHistory();

  const { id } = useParams();

  if (!id) {
    history.push("/");
  }

  const url = BASE_URL + "/" + id;

  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await fetch(url);

          if (response.ok) {
            const json = await response.json();
            console.log(json);
            setPage(json);
          } else {
            setError("An error occured");
          }
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    },
    [url]
  );

  if (loading) {
    return (
      <div className="spinner-blue">
        <Spinner animation="grow" variant="info" size="large" />
        <h4>Loading Guides</h4>
      </div>
    );
  }

  if (error) {
    return <div>An error occured: {error}</div>;
  }

  return (
    <>
      <section className="guides-detail-wrapper">
        <div className="guides-detail-info">
          <img src={page.image.url} alt="Illustration" />
          <div className="category-wrapper">
            <h3>{page.category}</h3>
          </div>
        </div>
        <div className="guides-detail-info2">
          <h1>{page.title}</h1>
          <h5>
            <strong>Author:</strong> {page.author}
          </h5>
          <p>{page.description}</p>

          <div className="card-buttons-section">
            <Link to="/guides">
              <button className="go-back-button">Back to Guides</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContentDetails;
