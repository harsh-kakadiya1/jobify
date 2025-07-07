import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
// import { USER_API_END_POINT } from "../../../../backend/";
import { toast } from "sonner";
import axios from "axios";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/authSlice";

function Signup() {
  const [input, setInput] = React.useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading,user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      // toast.error(error.response.data.message);
      const errorMessage =
        error.response?.data?.message || "Something is missing";
      toast.error(errorMessage);
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
          <h1 className="font-bold text-2xl text-center mb-2">Sign Up</h1>
          <div>
            <Label className="mb-1 block">Full Name</Label>
            <Input
              type="text"
              placeholder="e.g. John Doe"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              className="rounded-md border border-gray-300 px-3 py-2 w-full"
            />
          </div>
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
            <Label className="mb-1 block">Phone Number</Label>
            <Input
              type="text"
              placeholder="e.g. 9876543210"
              value={input.phoneNumber}
              name="phoneNumber"
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
          <div>
            <Label className="mb-1 block">Profile</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="cursor-pointer w-full"
            />
          </div>
          {loading ? (
            <Button className="w-full my-2 rounded-md bg-blue-500 text-white font-semibold py-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 shadow">
              Sign Up
            </Button>
          )}
          <span className="text-sm text-center mt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
