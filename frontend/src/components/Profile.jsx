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
  const { allAppliedJobs, loading } = useSelector((store) => store.job);

  // Profile completeness calculation (example: 20% per field)
  const fields = [user?.fullname, user?.email, user?.phoneNumber, user?.profile?.bio, user?.profile?.skills?.length, user?.profile?.resume];
  const completeness = Math.round((fields.filter(Boolean).length / fields.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50">
      <Navbar />
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 py-10">
        {/* Sidebar/Profile Summary */}
        <aside className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center md:w-1/3 w-full gap-4">
          <Avatar className="h-28 w-28 mb-2 shadow-lg">
            <AvatarImage src={user?.profile?.profilePhoto || 'https://ui-avatars.com/api/?name=' + user?.fullname} />
          </Avatar>
          <h1 className="font-bold text-2xl text-primary text-center">{user?.fullname}</h1>
          <p className="text-muted-foreground text-center">{user?.profile?.bio || 'No bio provided.'}</p>
          <div className="flex flex-col gap-2 w-full mt-4">
            <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4" /> {user?.email}</div>
            <div className="flex items-center gap-2 text-sm"><Contact className="w-4 h-4" /> {user?.phoneNumber || 'N/A'}</div>
          </div>
          <div className="w-full mt-6">
            <Label className="text-xs font-semibold mb-1">Profile Completeness</Label>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-primary h-3 rounded-full transition-all" style={{ width: completeness + '%' }}></div>
            </div>
            <span className="text-xs text-muted-foreground font-semibold mt-1 block text-right">{completeness}%</span>
          </div>
          <Button onClick={() => setOpen(true)} className="w-full mt-4" variant="outline"><Pen className="mr-2" /> Edit Profile</Button>
        </aside>
        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-8">
          <section className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="font-semibold text-lg mb-2 text-primary">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length ? (
                user.profile.skills.map((item, index) => (
                  <Badge key={index} className="bg-accent/10 text-accent font-semibold px-3 py-1 rounded-full">{item}</Badge>
                ))
              ) : (
                <span className="text-muted-foreground">No skills added.</span>
              )}
            </div>
            <div className="mt-6">
              <Label className="text-md font-bold">Resume</Label>
              {isResume && user?.profile?.resume ? (
                <a target="_blank" rel="noopener noreferrer" href={user?.profile.resume} className="text-blue-500 hover:underline block mt-1">
                  {user?.profile.resumeOriginalName || 'View Resume'}
                </a>
              ) : (
                <span className="text-muted-foreground">No resume uploaded.</span>
              )}
            </div>
          </section>
          <section className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="font-semibold text-lg mb-4 text-primary">Applied Jobs</h2>
            {loading ? (
              <div className="flex flex-col gap-4">
                {[1,2,3].map((i) => (
                  <div key={i} className="animate-pulse h-12 bg-gray-200 rounded w-full" />
                ))}
              </div>
            ) : allAppliedJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10">
                <img src="https://www.svgrepo.com/show/327408/empty-box.svg" alt="No jobs" className="w-24 h-24 mb-4 opacity-60" />
                <span className="text-muted-foreground text-lg">You haven't applied to any jobs yet.</span>
              </div>
            ) : (
              <AppliedJobTable />
            )}
          </section>
        </main>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
