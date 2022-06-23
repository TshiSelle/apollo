import React from "react";
import "./footer.css";
import jslogo from "../../assets/javascript-svgrepo-com.svg";

function Footer() {
  return (
    <div className="footer__container">
      <div>
        <img className="footer__logo" src={jslogo} />
        <h2>Apollo</h2>
        <p>Everything you need to know about JavaScript</p>
      </div>
      <div>
        <h3>Legal</h3>
        <p> Terms & Conditions </p>
        <p> Privacy</p>
      </div>
      <div>
        <h3>Contact Us</h3>
        <p> +961 123456 </p>
        <p> +961 654321</p>
        <p> support@apollo.com </p>
      </div>
      <div>
        <h3>Follow Us</h3>
        <p> <a href="https://www.facebook.com/" target="_blank">Facebook </a></p>
        <p> <a href="https://www.instagram.com/" target="_blank">Instagram </a></p>
        <p> <a href="https://www.twitter.com/" target="_blank">Twitter </a></p>
      </div>
    </div>
  );
}

export default Footer;
