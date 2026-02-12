import Home from "./pages/Home.jsx";
import AddRoom from "./pages/AddRoom.jsx";
import Room from "./pages/Room.jsx";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/addroom", element: <AddRoom /> },
  { path: "/room/:roomId", element: <Room /> },
];
