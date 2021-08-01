import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useAuth, useSigninCheck } from 'reactfire';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const signOut = auth => auth.signOut().then(() => console.log('signed out'));

export const AuthWrapper = ({ children, fallback }: React.PropsWithChildren<{ fallback: JSX.Element }>): JSX.Element => {
  const { status, data: signInCheckResult } = useSigninCheck();

  if (!children) {
    throw new Error('Children must be provided');
  }
  if (status === 'loading') {
    return <CircularProgress />;
  } else if (signInCheckResult.signedIn === true) {
    return children as JSX.Element;
  }

  return fallback;
};

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


const SignInForm = () => {
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
        <Typography component="h1" variant="h5">
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
    return <CircularProgress />;
  }

  const { signedIn, user } = signinResult;

  if (signedIn === true) {
    return <UserDetails user={user} />;
  } else {
    return <SignInForm />;
  }
};