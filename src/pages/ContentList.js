import { useState, useEffect } from "react";
import { BASE_URL } from "../constants/api";
import ContentItem from "./ContentItem";
import { Spinner } from "react-bootstrap";

function ContentList() {
  const [page, setPage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(BASE_URL);

        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setPage(json);
        } else {
          setError("Something went wrong, check your API");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="spinner-blue">
        <Spinner animation="grow" variant="info" size="large" />
        <h4>Loading Guides</h4>
      </div>
    );
  }

  if (error) {
    return <div>Error, Please check your API {error}</div>;
  }

  return (
    <div className="popular-guides-container">
      {page
        .filter((item) => item.featured)
        .map(function (item) {
          return <ContentItem key={item.id} item={item} />;
        })}
    </div>
  );
}

export default ContentList;
