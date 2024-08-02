import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../store/api/authApi";
import ChangePassword from "../ChangePassword";


function Profile() {
  const { user_id } = useParams();
  const [check, setCheck] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [full_name, setFullName] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [billing_address, setBillingAddress] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const { data: profile, isLoading, error } = useGetProfileQuery(user_id);
  const [updateProfile] = useUpdateProfileMutation();

  console.log(profile);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.error}</div>;
  if (!profile) return <div>No profile found</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", full_name);
    formData.append("about", about);
    formData.append("address", address);
    formData.append("billing_address", billing_address);
    formData.append("email", email);
    formData.append("gender", gender);

    try {
      const response = await updateProfile({
        id: user_id,
        profileData: formData,
      });

      console.log(response);

      if (response.data.success === true) {
        alert("Profile is Updated Successfully");

        // localStorage.setItem("name", JSON.stringify(response.data.full_name));
        // localStorage.setItem("about", JSON.stringify(response.data.about));
        // localStorage.setItem("address", JSON.stringify(response.data.address));
        // localStorage.setItem(
        //   "billing_address",
        //   JSON.stringify(response.data.billing_address)
        // );
        // localStorage.setItem("email", JSON.stringify(response.data.email));
        // localStorage.setItem("gender", JSON.stringify(response.data.gender));

        setCheck(false);
      }
    } catch (error) {
      console.log("Error : ", error);
      const message = error?.data?.message;
      alert(message);
    }
  };

  return (
    <>
      <div className="header">
        <button className="btn" onClick={() => setCheck(!check)}>
          {check ? "Goto Profile" : "Update Profile"}
        </button>

        <button className="btn" onClick={() => setCheck2(!check2)} >Change Password</button>

        <Dashboard />
      </div>




      {
        check2 ? <ChangePassword setCheck2={setCheck2} /> : (
      
      
      check ? (
        <div className="profileContainer">
          <div className="titleProfile">Edit Profile</div>

          <div className="Items">
            <form onSubmit={handleSubmit}>
              <div className="profileItem">
                <div className="title" htmlFor="full_name">
                  Full Name
                </div>
                <input
                  className="inputB"
                  id="full_name"
                  type="text"
                  placeholder="Enter Full Name"
                  value={full_name}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="profileItem">
                <label className="title" htmlFor="email">
                  Email
                </label>
                <input
                  className="inputB"
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="profileItem">
                <label className="title" htmlFor="gender">
                  Gender
                </label>
                <input
                  className="inputB"
                  id="gender"
                  type="text"
                  placeholder="Set Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>

              <div className="profileItem">
                <label className="title address" htmlFor="address">
                  Address
                </label>
                <input
                  className="inputB"
                  id="address"
                  type="text"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="profileItem">
                <label className="title address" htmlFor="billing_address">
                  Billing Address
                </label>
                <input
                  className="inputB"
                  id="billing_address"
                  type="text"
                  placeholder="Enter billing_address"
                  value={billing_address}
                  onChange={(e) => setBillingAddress(e.target.value)}
                />
              </div>
              <div className="profileItem">
                <label className="title area" htmlFor="about">
                  About
                </label>
                <input
                  className="inputB"
                  id="about"
                  type="text"
                  placeholder="Enter About"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              <button className="btn submit" type="submit">
                {" "}
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className={"profileContainer"}>
            <div className={"titleProfile"}>Profile</div>
            <br />

            <div className="Items">
              <div className="profileItem">
                <div className="title">User_id</div>
                <div className="value">{profile.data.id}</div>
              </div>

              <div className="profileItem">
                <div className="title">FullName</div>
                <div className="value"> {profile.data.full_name}</div>
              </div>

              <div className="profileItem">
                <div className="title">Phone Number</div>
                <div className="value">{profile.data.phone}</div>
              </div>

              <div className="profileItem">
                <div className="title">Gender</div>
                <div className="value">{profile.data.gender}</div>
              </div>

              <div className="profileItem">
                <div className="title">Email</div>
                <div className="value">{profile.data.email}</div>
              </div>

              <div className="profileItem">
                <div className="title">Address</div>
                <div className="value address">{profile.data.address}</div>
              </div>

              <div className="profileItem">
                <div className="title">Billing Address</div>
                <div className="value address">
                  {profile.data.billing_address}
                </div>
              </div>

              <div className="profileItem">
                <div className="title">About</div>
                <div className="value area ">{profile.data.about}</div>
              </div>
            </div>
          </div>
        </>
      )
    )
    }
    </>
  );
}

export default Profile;
