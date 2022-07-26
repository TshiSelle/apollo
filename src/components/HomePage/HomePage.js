import { Image, Transformation } from "cloudinary-react";
import React, { useState } from "react";
import styled from "styled-components";
import { GetUserInfo } from "../../api/ApiClient";
import { useAuthenticator } from "../../context/AuthContext";
import ContactUs from "../ContactUs/ContactUsRoute.js";
import VerificationPopUp from "../Profile/SignUp/VerificationPopUp/VerificationPopUp";
import "./HomePage.css";

const HomePage = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const { loggedIn, authToken } = useAuthenticator();
  if (loggedIn) {
    GetUserInfo(authToken)
      .then((response) => {
        const user = response.data.dbUser;
        if (
          response.data.success &&
          !user.verified &&
          Date.now() - Date.parse(user.createdAt) < 20000
        ) {
          setShowPopUp(true);
        }
      })
      .catch((error) => console.log(error.response.data.message));
    // if user unverified and newly created show verification popup
  }

  return (
    <Container>
      <GreenBackground></GreenBackground>

      {showPopUp && <VerificationPopUp />}
      <Main>
        <BannerSection>
          <BnHeader>Project: Apollo</BnHeader>
          <BnDescription>From developers to developers</BnDescription>
        </BannerSection>

        <JourneySection>
          <ThImage publicId={"https://res.cloudinary.com/projectapollo/image/upload/v1658815877/Provision/programming.gif"} alt="hand">
            <Transformation fetchFormat="auto" />
          </ThImage>

          <ThDetails>
            <ThHeader>Begin your Journey</ThHeader>

            <div>
              <ThPara>
                Javascript is a programming language that has been used for decades. It’s how you make interactive websites, how you build mobile apps. And it’s how most of us interact with our smartphones’ virtual assistants like Siri and Alexa.
              </ThPara>
              <ThPara>
                To become proficient in any coding language, one needs to be familiar with the concepts of the particular language as well as syntax and algorithms- but when you already read many books and did lots of courses or one big course, you have to start getting experience and practice your new skills.
              </ThPara>
              <ThPara>The most important in the process is to create a code and understand how it works. This will help you to understand the theory that you already know from books, and teach you how to choose the best solutions.</ThPara>

            </div>
          </ThDetails>
        </JourneySection>
      </Main>

      <ContentSection>
        <MediHeader>Our Content</MediHeader>
        <MediPara>
          Every journey has its beginning, why not start here ?<br />
          From "Hello World" to "npm run build". LET'S GO.

        </MediPara>

        <MediFlex>
          <MediItem>
            <MediImage
              className="images"
              publicId={"Provision/home-learn.svg"}
              alt="learn"
            >
              <Transformation fetchFormat="auto" />
            </MediImage>
            <MediName className="mediname">0 level learning</MediName>
          </MediItem>

          <MediItem>
            <MediImage
              className="images"
              publicId={"Provision/home-practice.svg"}
              alt="practice"
            >
              <Transformation fetchFormat="auto" />
            </MediImage>
            <MediName className="mediname">Practice Content</MediName>
          </MediItem>

          <MediItem>
            <MediImage
              className="images"
              publicId={"Provision/home-interview.svg"}
              alt="interview"
            >
              <Transformation fetchFormat="auto" />
            </MediImage>
            <MediName className="mediname">Interview Tips and Tricks</MediName>
          </MediItem>
        </MediFlex>
        <MediPara>All features will be coming soon</MediPara>
      </ContentSection>

      <div className="home-contact">
        <ContactUs />
      </div>
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  font-display: swap;
  font-family: FuturaLight;
  line-height: 1.5;
  color: #212529;
`;

const GreenBackground = styled.div`
  background-color: #54626F;
  height: 1101px;
  width: 100%;
  position: absolute;
  z-index: -1;
  margin-top: 350px;

  @media (max-width: 991px) {
    margin-top: 100px;
    height: 500px;
  }
`;

const Main = styled.main`
  width: 90%;
  margin: 0 auto;
  display: grid;

  @media (max-width: 991px) {
    margin: 0 auto;
    width: 100%;
  }
`;

const BannerSection = styled.section`
  background-image: url("https://res.cloudinary.com/projectapollo/image/upload/v1658745451/Provision/home-laptop.jpg");
  height: 800px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  display: grid;
  justify-content: center;
  text-align: center;
  color: #ffffff;

  @media (max-width: 991px) {
    height: 200px;
  }
`;

const BnHeader = styled.h1`
  font-size: 70px;
  font-weight: bold;
  align-self: end;

  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

const BnDescription = styled.p`
  font-size: 20px;

  @media (max-width: 991px) {
    font-size: 15px;
  }
`;

const JourneySection = styled.section`
  display: flex;
  height: 738px;
  background-color: #ffffff;
  margin-top: 135px;

  @media (max-width: 991px) {
    display: block;
    margin-top: 25px;
    height: unset;
  }
`;

const ThImage = styled(Image)`
  width: 50%;
  object-fit: cover;

  @media (max-width: 991px) {
    width: 100%;
    height: 320px;
    // object-position: 0px -135px;
  }
`;

const ThDetails = styled.section`
  width: 50%;
  padding: 5% 7%;
  box-sizing: border-box;

  @media (max-width: 991px) {
    width: 100%;
    padding: 5% 7% 0;
  }
`;

const ThHeader = styled.h1`
  font-size: 30px;
  font-weight: bold;
  border-bottom: 1px solid #212529;
  padding-bottom: 40px;
  margin-bottom: 40px;

  @media (max-width: 991px) {
    font-size: 25px;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
`;

const ThPara = styled.p`
  font-size: 16px;
  margin-top: 20px;
  text-align: justify;

  @media (max-width: 991px) {
    margin-top: 10px;
  }
`;

const ContentSection = styled.section`
  background-color: #FFD700;
  display: grid;
  justify-items: center;
  margin-top: 150px;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const MediHeader = styled.h1`
  font-size: 30px;
  margin-top: 75px;
  font-weight: bold;

  @media (max-width: 991px) {
    font-size: 25px;
    margin-top: 30px;
  }
`;

const MediPara = styled.p`
  font-size: 16px;
  margin-top: 20px;
  text-align: center;
  padding: 0 10px;

  @media (max-width: 991px) {
    margin-top: 10px;
  }
`;

const MediFlex = styled.div`
  display: flex;
  margin: 75px 0 70px;
  gap: 30px;

  @media (max-width: 991px) {
    display: block;
    margin: 15px 0;
  }
`;

const MediItem = styled.div`
  width: 300px;
`;

const MediImage = styled(Image)`
  width: 100%;
`;

const MediName = styled.p`
  background-color: #ffffff;
  font-size: 21px;
  padding: 10px;
  font-family: ProximaNova;

  @media (max-width: 991px) {
    font-size: 16px;
  }
`;
