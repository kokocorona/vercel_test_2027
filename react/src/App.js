import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import Home from "./pages/Home";
import PostsList from "./pages/PostsList";
import Header from "./components/Header";
import AddPost from "./pages/AddPost";
import Login from "./pages/Login";
import AddPostAuth from "./pages/AddPostAuth";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/addPost" element={<AddPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addPostAuth" element={<AddPostAuth />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
