import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../constants/api";
import { Spinner } from "react-bootstrap";
import AdminMenu from "../AdminMenu";
import { Toast } from "react-bootstrap";
import DeleteButton from './DeletePost';

export default function PostList() {
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
    <>
      <AdminMenu />
      <div className="menu-posts-container">
        {page.map((item) => {
          return (
            <React.Fragment key={item.id}>
            <div className="posts-arrange">
            <Toast>
        <Toast.Header>
          <strong className="mr-auto">{item.category}</strong>
          <small>{item.author}</small>
        </Toast.Header>
          <Toast.Body className="toast-body"> 
              <img src={item.image.url} className="rounded mr-2" alt="" />
              <h4>{item.title}</h4>
            <div id="posts-design" key={item.id}>
               <Link className="edit-text" to={`/adminpage/posts/update/${item.id}`}>Update Post</Link>
               <DeleteButton id={item.id} />
            </div>
           </Toast.Body>
              </Toast>
              </div>
              </React.Fragment>
          );
        })}
      </div>
    </>
  );
}
