import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { User2, LogOut, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Close menu on navigation
  const handleNavClick = () => setMenuOpen(false);

  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav className="bg-white/80 backdrop-blur shadow-md rounded-b-xl mx-auto mt-4 max-w-6xl px-2 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between font-sans relative">
      {/* Logo & Tagline */}
      <div className="flex flex-col items-center sm:flex-row sm:items-center gap-0 sm:gap-2 w-full sm:w-auto z-30">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary drop-shadow-sm">Jobify</span>
          <span className="text-accent font-bold text-base sm:text-lg">• Find Your Fit</span>
        </Link>
      </div>
      {/* Hamburger for mobile */}
      <button
        className="sm:hidden absolute right-4 top-4 z-40 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {/* Nav Links & Auth Buttons */}
      {/* Mobile Fullscreen Overlay */}
      <div
        className={`sm:flex items-center gap-8 text-base font-medium
          ${menuOpen ? "fixed inset-0 flex flex-col justify-center items-center bg-white/95 z-30 p-6" : "hidden"}
          sm:static sm:bg-transparent sm:p-0 sm:relative sm:flex-row sm:w-auto sm:h-auto
        `}
        style={menuOpen ? { minHeight: '100vh' } : {}}
      >
        <ul className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-full sm:w-auto mb-8 sm:mb-0">
          {user && user.role === "recruiter" ? (
            <>
              <li onClick={handleNavClick}>
                <Link to="/admin/companies" className="hover:text-primary transition-colors">Companies</Link>
              </li>
              <li onClick={handleNavClick}>
                <Link to="/admin/jobs" className="hover:text-primary transition-colors">Jobs</Link>
              </li>
            </>
          ) : (
            <>
              <li onClick={handleNavClick}>
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li onClick={handleNavClick}>
                <Link to="/jobs" className="hover:text-primary transition-colors">Jobs</Link>
              </li>
              <li onClick={handleNavClick}>
                <Link to="/browse" className="hover:text-primary transition-colors">Browse</Link>
              </li>
            </>
          )}
        </ul>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {!user ? (
            <>
              <Link to="/login" className="w-full" onClick={handleNavClick}>
                <Button className="bg-primary text-white rounded-full px-5 py-2 shadow hover:bg-primary/90 transition w-full sm:w-auto text-lg sm:text-base mb-2 sm:mb-0">Login</Button>
              </Link>
              <Link to="/signup" className="w-full" onClick={handleNavClick}>
                <Button className="bg-accent text-white rounded-full px-5 py-2 shadow hover:bg-accent/90 transition w-full sm:w-auto text-lg sm:text-base">Sign Up</Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer border-2 border-primary shadow">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 rounded-xl shadow-lg">
                <div className="flex gap-4 items-center mb-4">
                  <Avatar className="border-2 border-primary">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-lg">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-gray-700">
                  {user && user.role === "student" && (
                    <div className="flex items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link" className="text-primary px-0">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link" className="text-destructive px-0">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
