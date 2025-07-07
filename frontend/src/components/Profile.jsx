import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Pen, Mail, Contact } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import UpdateProfileDialog from "./UpdateProfileDialog";
import AppliedJobTable from "./AppliedJobTable";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetApliedjobs";

// const skills = ["Html","Css","javaScript","ReactJs"];
const isResume = true;

function Profile() {
  useGetAppliedJobs();

  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 py-8">
      <div className="max-w-4xl shadow-lg mx-auto bg-white border border-gray-100 rounded-xl my-5 p-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 shadow">
              <AvatarImage src={user?.profile?.profilePhoto || 'https://imgs.search.brave.com/68f9Ql2VSS1Jq1s4cg-w6La7HZnxeMfJHy-QZHqsVeM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzI3Lzk5LzQ4/LzM2MF9GXzMyNzk5/NDgwNV8xRzBiQkVp/TXg5eVR6MFZCNXZF/elFyOWRFVWcwVGxC/TC5qcGc'} />
            </Avatar>
            <div>
              <h1 className="font-bold text-2xl text-gray-800">{user?.fullname}</h1>
              <p className="text-gray-500">{user?.profile.bio}</p>
              <div className="flex items-center gap-3 mt-2">
                <Mail className="text-blue-400" />
                <span className="text-gray-600">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <Contact className="text-blue-400" />
                <span className="text-gray-600">{user?.phoneNumber}</span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow px-4 py-2"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-8">
          <h1 className="font-semibold text-lg mb-2">Skills</h1>
          <div className="flex flex-wrap items-center gap-2">
            {user?.profile.skills.length !== 0 ? (
              user?.profile.skills.map((item, index) => (
                <Badge key={index} className="bg-pink-100 text-pink-600 rounded-full px-3 py-1 font-semibold text-sm shadow">{item}</Badge>
              ))
            ) : (
              <span className="text-gray-400">No Skills</span>
            )}
          </div>
        </div>
        <div className="my-8">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile.resume}
              className="text-blue-500 hover:underline block mt-1"
            >
              {user?.profile.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-400">NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
        <h1 className="font-bold text-lg mb-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
