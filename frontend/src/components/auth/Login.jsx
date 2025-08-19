import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `http://localhost:8000/api/v1/user/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh] px-2">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-xs sm:max-w-md bg-white rounded-xl p-6 my-10 shadow-md border border-gray-200"
        >
          <h1 className="font-bold text-2xl mb-6 text-center">Login</h1>
          <div className="mb-4">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="rolex@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              className="mt-1"
            />
          </div>
          <div className="mb-4">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Your password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              className="mt-1"
            />
          </div>
          <div className="mb-6">
            <RadioGroup className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 my-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  id="login-student"
                />
                <Label htmlFor="login-student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  id="login-recruiter"
                />
                <Label htmlFor="login-recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full my-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-2">
              Login
            </Button>
          )}
          <span className="text-sm block text-center mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500">Sign Up</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
