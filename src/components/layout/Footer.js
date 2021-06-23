import React from "react";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";

export default function Footer() {
  return (
    <footer>
      <div className="social-media-icons">
        <FaInstagram />
        <FaTwitter />
        <FiInstagram />
      </div>
      <p>&copy; Semester Project 2 - © Babuevs 2021</p>
    </footer>
  );
}
