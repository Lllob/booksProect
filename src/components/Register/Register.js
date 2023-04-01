import { useNavigate } from 'react-router-dom';
import * as authService from "../../services/authService";

import { AuthContext } from "../../contexts/AuthContext";//vzimame AuthContext(informaciqta za login, logaut)
import { useContext, useState } from "react";//kontexta('globalnite' danni)


const Register = () => {
  const [errorEm, setErrorEm] = useState(false)//greshkite na emaila
  const [errorPss, setErrorPass] = useState(false) //greshkite na parolata
  const [messige, setMessige] = useState('')
  const [messigePass, setMessigePass] = useState('')
  const { userLogin } = useContext(AuthContext);//vzimame userLogin() ot Autcontexta

  const navigate = useNavigate();

  const onSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData(e.target); //vzimame dannite ot htmla

      const email = formData.get('email');
      const password = formData.get('password');
      const confirmPassword = formData.get('confirm-pass');
        
        if (email.length < 1) {
        setErrorEm(true)
         setMessige('Email mast be at least one character long')
       // return alert('Email or Password mast be at least two character long')
      } else {
        setErrorEm(false)
      }

      if (password.length < 1) {
        setErrorPass(true)
        setMessigePass('Password mast be at least one character long')
        //return alert('Email or Password mast be at least two character long')
      } else {
        setErrorPass(false)
      }
      
      if (password !== confirmPassword) {
        return alert('Password don/t match')
      }
  
   
      authService.register(email, password)//vkarvame dannite vav sarvara
          .then(userData => {
              userLogin(userData);//davame dannite na userLogin()
              navigate('/catalog');
          });
  }

  return(
    <section id="register-page" className="register">
      <form onSubmit={onSubmit} id="register-form" action="/register" method="POST">
        <fieldset>
          <legend>Register Form</legend>
          <p className="field">
            <label htmlFor="email">Email</label>
            <span className="input">
            {errorEm ? <input type="text" name="email" id="email" placeholder={messige} /> 
             : <input type="text" name="email" id="email" placeholder="Email" />
            }
            </span>
          </p>
          <p className="field">
            <label htmlFor="password">Password</label>
            <span className="input">
            {errorPss ? <input
                type="password"
                name="password"
                id="password"
                placeholder={messigePass}
              />
               : <input type="password" name="password" id="password"
               placeholder="Password" 
               />}
            </span>
          </p>
          <p className="field">
            <label htmlFor="repeat-pass">Repeat Password</label>
            <span className="input">
              <input
                type="password"
                name="confirm-pass"
                id="repeat-pass"
                placeholder="Repeat Password"
              />
            </span>
          </p>
          <input
            className="button submit"
            type="submit"
            defaultValue="Register"
          />
        </fieldset>
      </form>
    </section>
  )
};

export default Register;