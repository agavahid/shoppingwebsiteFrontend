
import './App.css';
import MainPage from './pages/mainPage/mainPage';
import LoginPage from './pages/loginPage/loginPage';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/mainLayout/mainLayout';
import GenrePage from './pages/genrePage/genrePage';
import RegisterPage from './pages/registerPage/registerPage';
import UserProfileLayout from './layouts/userProfileLayout/userProfileLayout';
import Profile from './components/profile/profile';
import Settings from './components/settings/settings';
import LikedList from './components/likedList/likedList';
import Messages from './components/messages/messages';
import ItemPage from './pages/itemPage/itemPage';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import BlogPage from './pages/blogPage/blogPage';
import Admin from './pages/admin/admin';
import AdminLoginPage from './pages/adminLogin/adminLogin';
import ProtectedAdminRoute from './components/protectedRoute/protectedAdminRoute';
import AdminProfile from './components/adminProfile/adminProfile';
import UserInfos from './components/userInfos/userInfos';
import ProductsList from './components/productsList/productsList';
import BlogList from './components/blogList/blogList';
import AdminMessages from './components/adminMessages/adminMessages';

function App() {
  return (

    <MainLayout>
      <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/genre/:id' element={<GenrePage/>}/>
        <Route path='/item/:id' element={<ItemPage/>}/>
        <Route path='/profile' element={<ProtectedRoute><UserProfileLayout/></ProtectedRoute>}>
          <Route path='account' element={<Profile/>}/>
          <Route path='settings' element={<Settings/>}/>
          <Route path='likedList' element={<LikedList />}/>
          <Route path='messages' element={<Messages/>}/>
        </Route>
        <Route path='/blogs' element={<BlogPage/>}/>
        <Route path='/admin/login' element={<AdminLoginPage/>}/>
        <Route path='/admin/dashboard' element={<ProtectedAdminRoute><Admin/></ProtectedAdminRoute>}>
          <Route path='info' element={<AdminProfile/>}/>
          <Route path='users' element={<UserInfos/>}/>
          <Route path='products' element={<ProductsList/>}/>
          <Route path='blogs' element={<BlogList/>}/>
          <Route path='messages' element={<AdminMessages/>}/>
        </Route>
      </Routes>
    </MainLayout>
  
  );
}

export default App;
