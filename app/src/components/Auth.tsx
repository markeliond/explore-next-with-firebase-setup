import React from 'react';
import { useRouter } from 'next/router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useAuth, useSigninCheck } from 'reactfire';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';


/*
  File below demonstrates basic login and out and user profile view using the Firebase Auth library
  and reactfire helpers. Will need to adapt these based on new designs
*/

const signOut = async auth => await auth.signOut();

export const AuthWrapper = ({ children, fallback }: React.PropsWithChildren<{ fallback: JSX.Element }>): JSX.Element => {
  const { status, data: signInCheckResult } = useSigninCheck();

  if (!children) {
    throw new Error('Children must be provided');
  }
  if (status === 'loading') {
    return <AuthLoading />;
  } else if (signInCheckResult.signedIn === true) {
    return children as JSX.Element;
  }

  return fallback;
};

export const UserDetailsAvatar = ({ user }) => {
  return <Avatar>{user.displayName[0]}</Avatar>
}

const UserDetails = ({ user }) => {
  const auth = useAuth();

  return (
    <>
        <Avatar>{user.displayName[0]}</Avatar>
        <Button onClick={() => signOut(auth)}>Sign out</Button>
    </>
  );
};



export const SignInForm = () => {
  const auth = useAuth;

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [auth.EmailAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography id="sign-in-prompt" component="h1" variant="h5">
          Sign in
        </Typography>

      </Box>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
      </Container>

  );
};

export const Auth = () => {
  const { status, data: signinResult } = useSigninCheck();

  if (status === 'loading') {
    return <AuthLoading />;
  }

  const { signedIn, user } = signinResult;

  if (signedIn === true) {
    return <UserDetails user={user} />;
  } else {
    return <SignInForm />;
  }
};

export const AuthFallback = () => {
  const { status, data: signinResult } = useSigninCheck();

  if (status === 'loading') {
    return <AuthLoading />;
  }

  const { signedIn, user } = signinResult;

  if (signedIn === true) {
    return;
  } else {
    return <SignInForm />;
  }
};

export const AuthLoading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '10rem',
      }}
    >
      <CircularProgress />
    </Box>
  );
}


export const AccountToolbarIcon = () => {

  const { status: authStatus, data: signinResult } = useSigninCheck();
  const auth = useAuth();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const router = useRouter();

  if (authStatus === 'loading') {
    return <AuthLoading />;
  }

  const { signedIn, user } = signinResult;


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
return (
  <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        id="user-avatar"
      >
        {!!signedIn && (
            <>
                <UserDetailsAvatar user={user} /> 
            </>
        )}
        {!signedIn && (
            <>
                <AccountCircle /> 
            </>
        )}
      </IconButton>

      <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
      >
          {!!signedIn && (
              [
                  <MenuItem key='profile' onClick={handleClose}>Profile</MenuItem>, 
                  <MenuItem key='sign-out' onClick={() => { handleClose(); router.push('/').then( () => signOut(auth) ) } }>Sign Out</MenuItem> 
              ]
          )}
          {!signedIn && (
              [
                  <MenuItem key='sign-in' onClick={() => { handleClose(); router.push('/signin'); } }>Sign In</MenuItem> 
              ]
          )}
      </Menu>
    </>
  )
}