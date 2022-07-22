import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./navbar.css";

const SiteFooter = () => {
  return (
    <FooterContainer>
      <FooterGrid>
        <FooterHeader>Project: APollo</FooterHeader>

        <FooterAddress>
          AstroLabs <br />
          Duabi, United Arab Emirates<br />
          support@apollo.com
        </FooterAddress>

        <FooterPara>
          The portal made for developers by developers. Driven to help
          every individual who strive to improve their technical skills in
          JavaScript by progressing through community-made documentations and
          practice.
        </FooterPara>

        <LinksMenu>
          <StyledLink to={"/"} className="footer-link">
            Home
          </StyledLink>{" "}
          |
          <StyledLink to={"/find-therapists"} className="footer-link">
            {" "}
            Therapists
          </StyledLink>{" "}
          |
          <StyledLink to={"/Journal"} className="footer-link">
            {" "}
            Journal
          </StyledLink>{" "}
          |
          <StyledLink to={"/about"} className="footer-link">
            {" "}
            About Us
          </StyledLink>
        </LinksMenu>
      </FooterGrid>
    </FooterContainer>
  );
};

export default SiteFooter;

const FooterContainer = styled.div`
  font-family: FuturaLight;
  line-height: 1.5;
  color: #ffffff;
  background-color: #414141;
  padding: 50px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const FooterHeader = styled.h1`
  font-size: 30px;
  font-weight: bold;
  @media (max-width: 991px) {
    order: 1;
    text-align: center;
  }
`;

const FooterPara = styled.p`
  color: #cccccc;
  @media (max-width: 991px) {
    order: 2;
    text-align: center;
  }
`;

const FooterAddress = styled.p`
  color: #cccccc;
  justify-self: end;
  @media (max-width: 991px) {
    order: 3;
    justify-self: start;
    margin-top: 20px;
  }
`;

const LinksMenu = styled.div`
  justify-self: end;
  @media (max-width: 991px) {
    order: 4;
    justify-self: center;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
`;