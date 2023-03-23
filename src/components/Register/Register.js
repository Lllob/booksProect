import { useNavigate } from 'react-router-dom';
import * as authService from "../../services/authService";

import { AuthContext } from "../../contexts/AuthContext";//vzimame AuthContext(informaciqta za login, logaut)
import { useContext } from "react";//kontexta('globalnite' danni)


const Register = () => {
  const { userLogin } = useContext(AuthContext);//vzimame userLogin() ot Auttexta

  const navigate = useNavigate();

  const onSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      const email = formData.get('email');
      const password = formData.get('password');
      const confirmPassword = formData.get('confirm-pass');
        if (email === '' || password === '') {
            return alert('Pleas, fill all fields!')
        }

      if (email.length < 2 || password.length < 2) {
        return alert('Email or Password mast be at least two character long')
      }
      
      if (password !== confirmPassword) {
        return alert('Password don/t match')
      }
   
      authService.register(email, password)//vkarvame dannite vav sarvara
          .then(authData => {
              userLogin(authData);//davame dannite na userLogin()
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
              <input type="text" name="email" id="email" placeholder="Email" />
            </span>
          </p>
          <p className="field">
            <label htmlFor="password">Password</label>
            <span className="input">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
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