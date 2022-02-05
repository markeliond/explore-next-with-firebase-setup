import React from 'react';
import { useRouter } from 'next/router';

var globalThis = require('globalthis')();

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useAuth, useSigninCheck } from 'reactfire';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';

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
//       <CardSection title="Displayname">{user.displayName}</CardSection>
//       <CardSection title="Providers">
//         <ul>
//           {user.providerData?.map(profile => (
//             <li key={profile?.providerId}>{profile?.providerId}</li>
//           ))}
//         </ul>
//       </CardSection>
//       <CardSection title="Sign Out">
//         <WideButton label="Sign Out" onClick={() => signOut(auth)} />
//       </CardSection>


export const SignInForm = () => {
  const auth = useAuth;

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
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