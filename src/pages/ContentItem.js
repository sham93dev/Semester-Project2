import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReadMoreBlack from "../components/layout/ReadMoreBlack";

function ContentItem({ item }) {
  const { id, title, category, info, image, author } = item;

  return (
    <Card className="guides-card">
      <div className="guide-type">{category}</div>
      {image && <Card.Img variant="top" src={image.url} alt={image.alternativeText} />}
      <Card.Body>
        <Card.Title>
          <Link to={`/page/${id}`}>
            <h4>{title}</h4>
          </Link>
        </Card.Title>
        <Card.Subtitle>
          <h5>Author: {author}</h5>
        </Card.Subtitle>
        <Card.Subtitle>
          <p>{info} </p>
        </Card.Subtitle>
        <div className="card-buttons-section">
          <ReadMoreBlack url={`/page/${id}`} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default ContentItem;
