import { useEffect, useState, useContext } from 'react';
import { getRedirectResult } from 'firebase/auth';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import { UserContext } from '../../contexts/user.context';


import './sign-in-form.styles.scss';

import {
  auth,
  singInWithGooglePopup,
  createUserDocumentFromAuth,
  singInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormField] = useState(defaultFormFields);
  const { email, password } = formFields;

  // const { setCurrentUser } = useContext(UserContext);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await getRedirectResult(auth);
  //     if (response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   }
  //   fetchData();
  // }, []);

  const logGoogleUser = async () => {
    const { user } = await singInWithGooglePopup();
    // const userDocRef = await createUserDocumentFromAuth(user);
  };

  const clickHandler = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormField(defaultFormFields);
  };

  const logInweap = async (event) => {
    event.preventDefault();
    console.log('logInweap');
    try {
      const { user } = await singInAuthUserWithEmailAndPassword(
        email,
        password
      );
      // setCurrentUser(user);
      // signUserInWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        alert('Password incorrect');
      } else if (error.code === 'auth/user-not-found') {
        alert('Wrong email.');
      }
      console.log(error);
    }
    // if there are too many if else conditions use switch case instead
  };

  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <FormInput
        label='Email'
        required
        onChange={clickHandler}
        type='email'
        name='email'
        value={email}
      />
      <FormInput
        label='Password'
        required
        onChange={clickHandler}
        type='password'
        name='password'
        value={password}
      />
      <div className='buttons-container'>
        <Button onClick={logInweap} type='submit'>
          {/* log in with email and password */}
          Log In
        </Button>

        {/* button code in the bottom*/}
        <Button type='button' onClick={logGoogleUser} buttonType='google'>
          Google SignIn
        </Button>
      </div>
    </div>
  );
};

export default SignInForm;

/* <Button buttonType='google' onClick={signInWithGoogleRedirect}>
         Sign In With Google Redirect
      </Button>*/
