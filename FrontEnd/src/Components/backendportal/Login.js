import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "../../Styles/Login.css";
import { login } from '../../api/Apicall';
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme. SingleTon class

const defaultTheme = createTheme();

export default function SignInSide() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const respData = await login(data.get('email'), data.get('password'));
      const { token, userData, companyList } = respData.data;
      const userPayload = { 
        userId:userData._id,
         userEmail :userData.email,
      };
      sessionStorage.setItem('token', token);
      dispatch({ type: 'LOGIN', payload: { user: userPayload }});
      if(userData.navIndicator ===2){
        navigate('/user_dash', { state: { moduleList: userData.menuFunctionList } });
      }else{
      dispatch({ type: 'SET_COMPANY_LIST', payload: { companyList: companyList}});
      navigate('/dash', { state: { moduleList: userData.menuFunctionList } });
      }
    } catch (error) {
      console.error('Error during login:', error.response.data.error);
      // Handle the login error, e.g., show an error message to the user
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
           <Grid container component="main" sx={{
  height: { xs: '100vh',sm:'4cm', md: '5cm' },  my: { xs: '0', sm: '1.2cm', md: '1.2cm' } , margin: 'auto',  width: '100%', maxWidth: '20cm',}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={6}
          md={6}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        /> 
        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                variant="standard" 
                required
                fullWidth
                id="email"
                label="email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                variant="standard" 
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
               {/* <Copyright sx={{ mt: 5 }} />  */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}