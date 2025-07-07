import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "@/redux/applicationSlice";
import store from "@/redux/store";

function Applicants() {
  const params = useParams();
  const dispatch = useDispatch();
  const applicants = useSelector((store) => store.application);

//   console.log(applicants.applicants.applications);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );

        // console.log(res.data.success);

        if (res.data.success) {
          dispatch(setApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplicants();
  }, []);

  return (
    <div className="min-h-[80vh] bg-[#f8fafc] py-8">
      <div className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-lg">
        <h1 className="font-bold text-lg mb-5">
          Applicants ({applicants?.applicants?.applications?.length})
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
}

export default Applicants;
