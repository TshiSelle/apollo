import React from "react";
import "./contactus.css";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

function ContactUs() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#f7df1e",
      },
      secondary: {
        main: "#14213d ",
      },
    },
  });

  return (
    <div className="contactus">
      <div className="contactus__left">
        <h1>Contact Us</h1>
        <p>
          Need to get in touch with us? Either fill out the form with your
          inquiry or find the phone number you'd like to contact below.
        </p>
        <p>+961 123456</p>
        <p>+961 654321</p>
      </div>
      <div className="contactus__right">
        {" "}
        <ThemeProvider theme={theme}>
          <div className="contactus__row1">
            <TextField
              className="contactus__input"
              helperText=" "
              id="demo-helper-text-aligned-no-helper"
              label="First Name"
              variant="outlined"
              color="secondary"
              size="small"
            />
            <TextField
              className="contactus__input"
              helperText=" "
              id="demo-helper-text-aligned-no-helper"
              label="Last Name"
              variant="outlined"
              color="secondary"
              size="small"
            />
            <TextField
              className="contactus__input"
              helperText=" "
              id="demo-helper-text-aligned-no-helper"
              label="Email"
              variant="outlined"
              color="secondary"
              size="small"
            />
            <TextField
              className="contactus__input"
              id="outlined-multiline-flexible"
              label="Message"
              color="secondary"
              multiline
              maxRows={5}
              minRows={3}
              size="medium"
            />

            <Button
              style={{ marginTop: "1rem" }}
              variant="contained"
              color="secondary"
            >
              Send
            </Button>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default ContactUs;
