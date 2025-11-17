import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Homepage from "./pages/Homepage.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Explore from "./pages/Explore.jsx";
import Community from "./pages/Community.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import Summaries from "./pages/Summaries.jsx";
import Notes from "./pages/Notes.jsx";
import Quizzes from "./pages/Quizzes.jsx";
import AdminHome from "./pages/admin/AdminHome.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import NotFound from "./pages/NotFound.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "explore", element: <Explore /> },
      { path: "community", element: <Community /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "summaries", element: <Summaries /> },
      { path: "notes", element: <Notes /> },
      { path: "quizzes", element: <Quizzes /> },
      { path: "admin", element: <AdminHome /> },
      { path: "admin/users", element: <AdminUsers /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
