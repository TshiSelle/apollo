import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuthenticator } from "../../context/AuthContext";
import { usePage } from "../../context/PageContext";
import PageEntries from "./Entries";

const Page = () => {
  const { loggedIn } = useAuthenticator();
  const { pageEntries } = usePage();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  return (
    <div>
      {loggedIn ? (
        // pageEntries?.length === 0
        // ? <>
        <>
          <PageBanner>
            <BannerHeader>Page</BannerHeader>
            <BannerPara>
              How was your day? Use your private page to express your
              feelings and write down your thoughts.
            </BannerPara>
          </PageBanner>

          <PageEntries setMessage={setMessage} setError={setError} />
        </>
      ) : (
        <LoggedOutPage>
          <PageBanner>
            <BannerHeader>You Are Not Logged In</BannerHeader>
            <BannerPara>Please login to access your page.</BannerPara>
          </PageBanner>
          <ButtonHolder>
            <Link to="/SignIn">
              <SignInButton>Sign In</SignInButton>
            </Link>
            <Link to="/SignUp">
              <SignUpButton>Sign Up</SignUpButton>
            </Link>
          </ButtonHolder>
        </LoggedOutPage>
        // : <PageEntries setMessage={setMessage} setError={setError} />
      )}
      {error ? (
        <div style={{ paddingTop: 20, flex: 1 }}>
          <Alert variant="danger">{error}</Alert>
        </div>
      ) : null}
    </div>
  );
};

export default Page;

const PageBanner = styled.div`
  font-family: FuturaLight;
  line-height: 1.5;
  color: #212529;
  height: 200px;
  text-align: center;
  display: grid;
  align-content: center;
  justify-content: center;

  @media (max-width: 991px) {
    height: unset;
    padding: 20px;
  }
`;

const BannerHeader = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;

const BannerPara = styled.p`
  max-width: 600px;
  margin-top: 10px;
`;

const LoggedOutPage = styled.div`
  font-family: FuturaLight;
  line-height: 1.5;
  color: #212529;
  height: 65vh;
`;

const SignUpButton = styled.button`
  width: 404px;
  justify-self: center;
  border: 1px solid #54626F;
  background-color: transparent;
  height: 54px;
  color: #212529;
  border-radius: 0.25rem;

  &:hover {
    background-color: #fbfbfb;
  }

  @media (max-width: 991px) {
    width: 350px;
  }
`;

const SignInButton = styled.button`
  width: 404px;
  justify-self: center;
  background-color: #54626F;
  border: none;
  height: 54px;
  color: #ffffff;
  border-radius: 0.25rem;

  &:hover {
    background-color: #FFC000;
    color: #000103;
  }

  @media (max-width: 991px) {
    width: 350px;
  }
`;

const ButtonHolder = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  @media (max-width: 991px) {
    display: grid;
  }
`;
