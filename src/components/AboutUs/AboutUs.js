import React, { useEffect } from "react";
import { Image, Transformation } from "cloudinary-react";
import styled from "styled-components";
import ContactUs from "../ContactUs/ContactUsRoute.js";

const AboutUs = () => {
  return (
    <Main>
      <BgContainer>
        <AboutUsContainer>
          <AboutUsImage publicId={"https://res.cloudinary.com/projectapollo/image/upload/v1655993017/Profiles/jslogo.png"} alt="Apollo_logo">
            <Transformation fetchFormat="auto" />
          </AboutUsImage>

          <AboutUsHeader style={{ marginTop: "1rem" }}>About Us</AboutUsHeader>

          <AboutUsText>
            Apollo is an open-database progressive web application designed to build a
            community of developers health professionals as well as encourage
            positive lifestyle practices. <br />
            <br />
            Included in Apollo is a page section where developers can add their information with tips, tricks and interview hints that can help developers progress with their web development career.
            <br />
            <br />
            Apollo aims to lend a helping hand to anyone who requires
            technical insight, by aiding in different areas such as covering knowledge gaps, technical tips, and fun facts.

          </AboutUsText>
        </AboutUsContainer>
      </BgContainer>

      <div className="home-contact">
        <ContactUs />
      </div>
    </Main>
  );
};

export default AboutUs;

const Main = styled.main`
  font-family: FuturaLight;
  line-height: 1.5;
  color: #212529;
  @media (max-width: 991px) {
  }
`;

const AboutUsContainer = styled.section`
  background-color: #ffffff;
  text-align: center;
  width: 820px;
  padding: 30px;
  @media (max-width: 991px) {
    margin-top: 100px;
    width: unset;
  }
`;

const AboutUsImage = styled(Image)`
  width: 125px;
  height: 125px;
  margin-top: -65px;
  border-radius: 50%;
  @media (max-width: 991px) {
  }
`;
const BgContainer = styled.section`
  background-image: url("https://res.cloudinary.com/projectapollo/image/upload/v1658755099/Profiles/nasa_nqs9lo.jpg");
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: grid;
  align-items: center;
  justify-items: center;
  @media (max-width: 991px) {
    background-position: bottom;
    height: unset;
  }
  @media (max-width: 780px) {
    background-position-y: 110px;
  }
`;

const AboutUsHeader = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
  @media (max-width: 991px) {
    font-size: 20px;
  }
`;

const AboutUsText = styled.p`
  @media (max-width: 991px) {
  }
`;