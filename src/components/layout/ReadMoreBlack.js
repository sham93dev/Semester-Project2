import React from "react";
import { Link } from "react-router-dom";

function ReadMoreBlack({url}) {
  return (
    <Link className="read-more-black" to={url}>
      Read More
    </Link>
  );
}

export default ReadMoreBlack;
