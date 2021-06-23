import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/api";
import ContentItem from "../ContentItem";
import { Spinner } from "react-bootstrap";
import axios from "axios";

export default function GuidesInput() {
  const [page, setPage] = useState([]);
  const [allPages, setAllPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showItems, setShowItems] = useState(100);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await axios.get(BASE_URL);
        console.log(response.data);
        setPage(response.data);
        setAllPages(response.data);
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
    return <div>Please check your API: {error}</div>;
  }
  const onChange = (event) => {
    if (event.target.value === "all") {
      setPage(allPages);
    } else {
      setPage(allPages.filter((page) => page.category === event.target.value));
    }
    setShowItems(100);
  };


  return (
    <>
      <section className="guides-page-wrapper">
        <div className="selection-container">
          <label>
            <select onChange={onChange}>
              <option value="all">All Guides</option>
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="JAVASCRIPT">JavaScript</option>
              <option value="STRAPI">Strapi</option>
              <option value="BOOTSTRAP">Bootstrap</option>
              <option value="REACT">React</option>
            </select>
          </label>
        </div>
        <div className="guides-wrapper">
          {page.map((item, idx) => {
            console.log(showItems > idx);
            if (showItems > idx) {
              return <ContentItem key={item.id} item={item} />;
            } else {
              return null;
            }
          })}
        </div>
      </section>
    </>
  );
}
