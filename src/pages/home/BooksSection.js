import React from "react";

function BooksSection() {
  return (
    <div className="books-section-wrapper">
      <div className="books-container" style={{ backgroundImage: `url(${"./assets/books.jpg"})` }}></div>
      <div className="books-container2">
        <h2>All tutorials at one place</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </p>
        <div className="buttons-wrapper">
          <a href="https://www.freecodecamp.org/" target="_blank" rel="noreferrer" >
            <button className="details-button">FreeCampCode</button>
          </a>
          <a href="https://www.w3schools.com/" target="_blank" rel="noreferrer">
            <button className="details-button2">W3Schools</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default BooksSection;
