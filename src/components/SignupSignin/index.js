import React, { useState } from 'react'
import Input from '../Input'
import './style.css'
import Button from '../Button';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth,db, provider } from '../../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc,getDoc } from "firebase/firestore";
const SignupSigninComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();
  function signupWithEmail() {
    setLoading(true);
    console.log("name:", name)
    console.log("Email:", email)
    console.log("password:", password)
    console.log("confirmPassword:", confirmPassword)
    // Authenticate the user or basically create new account using email and password
    if (name != '' && email != '' && password != '' && confirmPassword != '') {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("user>>", user)
            toast.success("user created!");
            setLoading(false);
            setName('');
            setPassword('');
            setConfirmPassword('');
            setEmail('');
            // ...
            createDoc(user);
            navigate('/dashboard');
            //create a doc user id as the following id
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage)
            setLoading(false);
          });
      }
      else {
        toast.error("Password Confirm Password don't match!")
        setLoading(false);
      }

    }
    else {
      toast.error("All fiels are mandatory!")
      setLoading(false);

    }

  }
  function loginUsingEmail() {
    console.log("login")
    setLoading(true);
    if (email != '' && password != '') {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          toast.success("User logged In!")
          console.log("user logged In", user)
          setLoading(false);
          navigate('/dashboard');
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
      
    }
    else {
      toast.error("All field are mandatory!")
      setLoading(false);
    }
    
  }
  async function createDoc(user) {
    //Make sure that the doc with the uid doen't exist
    // create Doc
    setLoading(true);
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          namne: user.displayName ? user.displayName : name,
          email:user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt:new Date(),
        });
        toast.success("Doc created!");
        setLoading(false);
      }
      catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    }
    else {
      // toast.error("Doc already exits!");
      setLoading(false);
    }
   
   
  }
  function googleAuth() {
    setLoading(true)
    try {
      signInWithPopup(auth,provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("user>>>",user)
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          toast.success("User authenticated!");
          createDoc(user);
          setLoading(false)
          navigate('/dashboard');
        }).catch((error) => {
          // Handle Errors here.
          setLoading(false)
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          toast.error(errorMessage);
        });
    }
    catch (e) {
      setLoading(false)
      toast.error(e.message);
      
    }
   
  }
  return (
    <>
      {loginForm ? (<div className='signup-wrapper'>
        <h1 className='title'>Login on <span style={{ color: "var(--theme)" }}>Financely.</span></h1>
        <form>
          {/* <Input label={"Full Name"} state={name} setState={setName} placeholder={"John Doe"} /> */}
          <Input label={"Email"} type={"email"} state={email} setState={setEmail} placeholder={"JohnDoe@gmail.com"} />
          <Input type={"password"} label={"Password"} state={password} setState={setPassword} placeholder={"Example@123"} />
          {/* <Input type={"password"} label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={"Example@123"} /> */}
          <Button disabled={loading} text={loading ? "Loading..." : "Login using Email and Password"} onClick={loginUsingEmail} />
          <p className='p-login'>or</p>
          <Button onClick={googleAuth} text={loading ? "Loading..." : "Login using Google"} blue={true} />
          <p className='p-login' style={{cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)}>or Don't Have An account? Click Here</p>
        </form>
      </div>) : (<div className='signup-wrapper'>
        <h2 className='title'>Sign Up on <span style={{ color: "var(--theme)" }}>Financely.</span></h2>
        <form>
          <Input label={"Full Name"} state={name} setState={setName} placeholder={"John Doe"} />
          <Input label={"Email"} type={"email"} state={email} setState={setEmail} placeholder={"JohnDoe@gmail.com"} />
          <Input type={"password"} label={"Password"} state={password} setState={setPassword} placeholder={"Example@123"} />
          <Input type={"password"} label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={"Example@123"} />
          <Button disabled={loading} text={loading ? "Loading..." : "Signup using Email and Password"} onClick={signupWithEmail} />
            <p className='p-login'>or</p>
            <Button onClick={googleAuth} text={loading ? "Loading..." : "Signup using Google"} blue={true} />
            <p className='p-login' style={{ cursor: "pointer" }} onClick={() => setLoginForm(!loginForm)}>or Don't Have An account? Click Here</p>
        </form>
      </div>)}

    </>
  )
}

export default SignupSigninComponent;


// lecture- 7 completed successfully all authentication like signin with email and password and sign in with google