//import { lazy, Suspense } from "react";//npm run build //
import { Routes, Route } from 'react-router-dom';//npm i react-router-dom //npm start//tova sa za path="/catalog"

import { PostProvider } from './contexts/PostContext';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from "./components/common/PrivateRoute";//ne lognat potrebitel da ne vijda catalog

import  Header  from './components/Header/Header.js'
import Home from './components/Home/Home'
import  Register from './components/Register/Register.js'
import  Login  from './components/Login/Login.js'
import Logout from './components/Logout/Logout';
import  Catalog  from './components/Catalog/Catalog'
import  Details  from './components/Details/Details'
import  Create  from './components/Create/Create'
import  Edit  from './components/Edit/Edit'
import MyList from './components/MyList/MyList'
import  Search  from './components/Search/Search'
import  Footer  from './components/Footer/Footer'
import  Page404  from './components/Page404/Page404'

import './App.css';

//const Search = lazy(() => import('./components/Search/Search'));

function App() {
  return (
    <AuthProvider> {/*elementite vajat za celiqt html */}
    <div id="container">
    <Header />

    <PostProvider>
    <main id="site-content">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/details/:id" element={<Details />} />
    
      <Route path="/create" element={(
            <PrivateRoute> {/*pri lognat potrebitel */}
              <Create />
            </PrivateRoute>
      )} />

       <Route path="/edit/:id" element={(
            <PrivateRoute> 
              <Edit />
          </PrivateRoute>
      )} />

     <Route path="/mylist" element={(
            <PrivateRoute> 
              <MyList />
          </PrivateRoute>
      )} />

<Route path="/search" element={(
            <PrivateRoute>
                <Search />
          </PrivateRoute>
      )} />

    <Route path="*" element={<Page404 />} />
    </Routes>
     
    </main>
    </PostProvider>
    <Footer />
  </div>
  </AuthProvider>
  );
}

export default App;


///////////////
// <PrivateRoute> {/*pri lognat potrebitel */}
//<Suspense fallback={<span>Loading....</span>}>
//     <Search />
//* </Suspense> 