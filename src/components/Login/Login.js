import { useContext } from "react";//globalnite danni
import { useNavigate } from "react-router-dom"; //na kade da otide

import { AuthContext } from "../../contexts/AuthContext";//vzimame AuthContext(za da vkarame dannite vav userLogin//)
import * as authService from "../../services/authService";//fetch, GET, POST

const Login = () => {
  const { userLogin } = useContext(AuthContext);//vzimame userLogin() ot autconteksta, dolu mu davame dannite
  const navigate = useNavigate();

  const onSubmit = (e) => {//vzimame dannite ot htmla
      e.preventDefault();

      const {
          email,
          password,
      } = Object.fromEntries(new FormData(e.target));

      if (email === '' || password === '') {
        return alert('Pleas, fill all fields!')
    }

      authService.login(email, password)//vkarvame dannite vav sarvara
          .then(authData => {
            if (authData.status >= 400) {
                return alert('Email or password don/t match')
            }
    
              userLogin(authData);//davame danni na userLogin(vav AuthContext.js)
               navigate('/catalog');
          })
  };

  return(
    <section id="login-page" className="login">
      <form onSubmit={onSubmit} id="login-form" action="/login" method="/POST">
        <fieldset>
          <legend>Login Form</legend>
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
          <input className="button submit" type="submit" defaultValue="/" />
        </fieldset>
      </form>
    </section>
  )
}


export default Login;
