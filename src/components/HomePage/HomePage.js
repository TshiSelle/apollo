import { Image, Transformation } from "cloudinary-react";
import React, { useState } from "react";
import styled from "styled-components";
import { GetUserInfo } from "../../api/apiClient";
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
        <RadioSection>
          <RaHeader>Radio</RaHeader>
          <RaDescription className="radioDesc">
            Music can help with stress management and mood modulation. The best
            feature is that it is always there for anyone who needs it. Whether
            you're on the edge or need a slight lift, one song can send you back
            to a more even and healthy place. When it comes to your mental
            health, music can help you sleep better, raise your mood, and reduce
            stress.
          </RaDescription>
        </RadioSection>
      </Main>

      <MeditationSection>
        <MediHeader>Meditations</MediHeader>
        <MediPara>
          Meditation is the practice of focused concentration and bringing
          yourself back to the moment over and over again. <br />
          Here are some meditations found in Eirene.
        </MediPara>

        <MediFlex>
          <MediItem>
            <MediImage
              publicId={"Provision/home-learn.svg"}
              alt="Learning"
            >
              <Transformation fetchFormat="auto" />
            </MediImage>
            <MediName>10 minute meditation for anxiety</MediName>
          </MediItem>

          <MediItem>
            <MediImage
              publicId={"Provision/home-interview.svg"}
              alt="Interview"
            >
              <Transformation fetchFormat="auto" />
            </MediImage>
            <MediName>10 minute meditation for sleep</MediName>
          </MediItem>

          <MediItem>
            <MediImage
              publicId={"Provision/home-tip.svg"}
              alt="Tips"
            >
              <Transformation fetchFormat="auto" />
            </MediImage>
            <MediName>10 minute meditation for stress</MediName>
          </MediItem>
        </MediFlex>
        <MediPara>Meditations can be found in the media player</MediPara>
      </MeditationSection>

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
  background-color: #e1ebd5;
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
  height: 600px;
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



const RadioSection = styled.section`
  margin-top: 100px;
  text-align: center;
  display: grid;
  justify-items: center;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const RaHeader = styled.h1`
  font-size: 30px;
  border-bottom: 1px solid #212529;
  padding-bottom: 10px;
  width: 60%;
  font-weight: bold;
  @media (max-width: 991px) {
    font-size: 25px;
    width: 65%;
  }
`;

const RaDescription = styled.p`
  font-size: 23px;
  margin-top: 50px;
  width: 40%;
  @media (max-width: 991px) {
    font-size: 16px;
    margin-top: 25px;
    width: 65%;
  }
`;

const MeditationSection = styled.section`
  background-color: #e1ebd5;
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
  padding: 20px;
  font-family: ProximaNova;
  @media (max-width: 991px) {
    font-size: 16px;
  }
`;