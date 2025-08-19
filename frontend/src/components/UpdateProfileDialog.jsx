import React, { useState } from "react";
import {
  Dialog,
  DialogFooter,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";

function UpdateProfileDialog({ open, setOpen }) {
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file});
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", Array.isArray(input.skills) ? input.skills.join(",") : input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/profile/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="max-w-full w-[95vw] sm:max-w-[425px] p-2 sm:p-6 overflow-y-auto max-h-[90vh]"
          onInteractOutside={() => setOpen(false)}
          aria-describedby="profile-dialog-desc"
        >
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Update Profile</DialogTitle>
          </DialogHeader>
          <p id="profile-dialog-desc" className="sr-only">
            Update your profile information here.
          </p>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-2 sm:py-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="name" className="text-right text-sm sm:text-base">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  name="fullname"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  className="sm:col-span-3 col-span-1 w-full text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="email" className="text-right text-sm sm:text-base">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="sm:col-span-3 col-span-1 w-full text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="number" className="text-right text-sm sm:text-base">
                  Number
                </Label>
                <Input
                  id="number"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="sm:col-span-3 col-span-1 w-full text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="bio" className="text-right text-sm sm:text-base">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="sm:col-span-3 col-span-1 w-full text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="skills" className="text-right text-sm sm:text-base">
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="sm:col-span-3 col-span-1 w-full text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor="file" className="text-right text-sm sm:text-base">
                  Resume
                </Label>
                <Input
                  type="file"
                  onChange={fileChangeHandler}
                  accept="application/pdf"
                  id="file"
                  name="file"
                  className="sm:col-span-3 col-span-1 w-full text-sm"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4 py-2 text-base" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full py-2 text-base">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateProfileDialog;
