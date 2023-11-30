import React from "react";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer py-5">
      <div className="container">
        <div className="row justify-content-lg-around">
          <div className="col-md-9 mb-2 col-sm-12">
            <h4 className="fw-bold">About</h4>
            <ul className="list-unstyled">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                et commodo purus. Nunc nec lacus efficitur leo tincidunt
                tristique. Nam porta eros ante, in facilisis ipsum commodo nec.
                Quisque nec quam ante.
              </p>
            </ul>
          </div>
          <div className="col-md-3 mb-2 col-sm-12">
            <h4 className="fw-bold">Contacs</h4>
            <ul className="list-unstyled">
              <li>
                <TiSocialFacebook className="fs-4 fw-bold" /> Facebook
              </li>
              <li>
                <TiSocialInstagram className="fs-4 fw-bold" /> Instagram
              </li>
              <li>
                <TiSocialTwitter className="fs-4 fw-bold" /> Twitter
              </li>
              <li>
                <TiSocialYoutube className="fs-4 fw-bold" /> Youtube
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom mt-4">
          <p className="text-lg-center">
            &copy;{new Date().getFullYear()} Todo App - Dionisius Berliano Surya
            Wijaya
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
