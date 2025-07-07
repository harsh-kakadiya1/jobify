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
      <div className="min-h-[80vh] flex items-center justify-center bg-[#f8fafc]">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4"
        >
          <h1 className="font-bold text-2xl text-center mb-2">Login</h1>
          <div>
            <Label className="mb-1 block">Email</Label>
            <Input
              type="email"
              placeholder="e.g. john@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              className="rounded-md border border-gray-300 px-3 py-2 w-full"
            />
          </div>
          <div>
            <Label className="mb-1 block">Password</Label>
            <Input
              type="password"
              placeholder="Your password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              className="rounded-md border border-gray-300 px-3 py-2 w-full"
            />
          </div>
          <div className="flex items-center gap-6 my-2">
            <div className="flex items-center gap-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="cursor-pointer"
                id="student"
              />
              <Label htmlFor="student">Student</Label>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="cursor-pointer"
                id="recruiter"
              />
              <Label htmlFor="recruiter">Recruiter</Label>
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-2 rounded-md bg-blue-500 text-white font-semibold py-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 shadow">
              Login
            </Button>
          )}
          <span className="text-sm text-center mt-2">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
