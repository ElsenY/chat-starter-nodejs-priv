import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  imgContainer: {
    height: "100vh"
  },
  content: {
    padding: "2%"
  },
  topContent: {
    marginBottom: "10%"
  },
  LoginButton: {
    backgroundColor: "#ffffff",
    color: "#3a8dff"
  }
}));

const Signup = ({ user, register }) => {
  const classes = useStyles();
  const history = useHistory();

  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const username = formElements.username.value;
    const email = formElements.email.value;
    const password = formElements.password.value;
    const confirmPassword = formElements.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }
    await register({ username, email, password });
  };

  useEffect(() => {
    if (user && user.id) history.push("/home");
  }, [user, history]);

  return (
    <Grid container justifyContent="center">
      <Grid sm={5} container item className={classes.imgContainer}>
        <img src="splashscreen.png" height="100%" width="100%" />
      </Grid>
      <Grid sm={7} container item direction="column" className={classes.content}>
        <Grid item container justifyContent="flex-end" alignItems="center" className={classes.topContent}>
          <Grid item>
            <Typography>Already have an account?</Typography>
          </Grid>
          <Grid item xs={1} />
          <Grid item>
            <Link href="/login" to="/login">
              <Button variant="contained" className={classes.LoginButton}>Login</Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item>
          <form onSubmit={handleRegister}>
            <Grid item container justifyContent="center">
              <Grid item xs={10} container justifyContent="center">
                <Grid item xs={12}>
                  <Typography variant="h3">
                    Create an account.
                  </Typography>
                </Grid>
                <FormControl margin="normal" fullWidth required>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    required
                  />
                </FormControl>
                <Grid item xs={12}>
                  <FormControl margin="normal" fullWidth required>
                    <TextField
                      label="E-mail address"
                      aria-label="e-mail address"
                      type="email"
                      name="email"
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl error={!!formErrorMessage.confirmPassword} margin="normal" fullWidth required>
                    <TextField
                      aria-label="password"
                      label="Password"
                      type="password"
                      inputProps={{ minLength: 6 }}
                      name="password"
                      required
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl error={!!formErrorMessage.confirmPassword} margin="normal" fullWidth required>
                    <TextField
                      label="Confirm Password"
                      aria-label="confirm password"
                      type="password"
                      inputProps={{ minLength: 6 }}
                      name="confirmPassword"
                      required
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid>
                  <Button type="submit" variant="contained" size="large" color="primary">
                    Create
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Signup;
