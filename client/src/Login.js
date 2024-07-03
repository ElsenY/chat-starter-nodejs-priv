import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  imgContainer: {
    height: "100vh"
  },
  content: {
    padding: "2%"
  },
  topContent: {
    marginBottom: "20%"
  },
  signUpButton: {
    backgroundColor: "#ffffff",
    color: "#3a8dff"
  }
}));

const Login = ({ user, login }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const username = formElements.email.value;
    const password = formElements.password.value;

    await login({ username, password });
  };

  useEffect(() => {
    if (user && user.id) history.push("/home");
  }, [user, history]);

  return (
    <Grid container justifyContent="center">
      <Grid xs={5} container item className={classes.imgContainer}>
        <img src="splashscreen.png" width="100%" height="100%" />
      </Grid>
      <Grid xs={7} container item direction="column" className={classes.content}>
        <Grid item container justifyContent="flex-end" alignItems="center" className={classes.topContent}>
          <Grid item>
            <Typography>Don't have an account?</Typography>
          </Grid>
          <Grid item xs={1} />
          <Grid item>
            <Link href="/register" to="/register">
              <Button variant="contained" className={classes.signUpButton} >Create Account</Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item>
          <form onSubmit={handleLogin}>
            <Grid item container justifyContent="center">
              <Grid item xs={10} container justifyContent="center">
                <Grid item xs={12}>
                  <Typography variant="h3">
                    Welcome back!
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl margin="normal" fullWidth required>
                    <TextField
                      aria-label="email"
                      label="E-mail address"
                      name="email"
                      type="text"
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl margin="normal" fullWidth required>
                    <TextField
                      label="Password"
                      aria-label="password"
                      type="password"
                      name="password"
                      fullWidth
                      InputProps={{ endAdornment: <Button variant="text" color="primary">Forgot?</Button> }}
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained" size="large" color="primary">
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid >
  );
};

export default Login;
