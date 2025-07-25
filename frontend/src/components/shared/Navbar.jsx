import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { User2, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

function Navbar() {

  const {user} = useSelector(store=>store.auth); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async() =>{
    try {

      const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});

      if(res.data.success){
          dispatch(setUser(null));
          navigate("/");
          toast.success(res.data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-[80px] max-w-7xl h-16 ">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-blue-600">Jobify</span>
            <span className="text-pink-500 font-normal text-base">· Find Your Fit</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {
              user && user.role == 'recruiter' ? (
                <>
                  <li> <Link to="/admin/companies">Compnies</Link></li>
                  <li> <Link to="/admin/jobs">Jobs</Link></li>
                </>
              ):(
                <>
                  <li> <Link to="/">Home</Link></li>
                  <li> <Link to="/jobs">Jobs</Link></li>
                  <li> <Link to="/browse">Browse</Link></li>
                </>
              )
            }
            
          </ul>
          { 
          !user ? (
            <div className="flex gap-2">
              <Link to="/login"><Button className="bg-blue-500 hover:bg-blue-600 rounded-full px-6 py-2 text-white font-semibold shadow-md" variant="outline">Login</Button></Link>
              <Link to="/signup"><Button className="bg-pink-500 hover:bg-pink-600 rounded-full px-6 py-2 text-white font-semibold shadow-md" variant="outline">Sign Up</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2 ">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 text-gray-600 my-2">
                  {
                    user && user.role === 'student' && (
                      <>
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                  </div>
                      </>
                    )
                  }
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
