import React from "react";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import userlogo from "../images/user.png";
import Products from "../components/Products";

function UserProfile() {
  const [userData, setUserData] = useState("");
  const location = useLocation();
  const { userdata } = useContext(UserContext);

  async function getData() {
    if (userData != "") return;

    await getDoc(doc(getFirestore(), "users", location.state)).then((res) => {
      setUserData(res.data());
    });
  }

  useEffect(() => {
    getData();
  }, [userData]);

  return (
    <div
      style={{
        marginTop: "13%",
        paddingLeft: "5%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <div
        className="profile-header"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <h4>Account</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img
            src={userData?.profileurl ? userData.profileurl : userlogo}
            width={100}
          />
          <div
            style={{
              height: "100%",
              width: "80%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "0 5% 0 10px",
            }}
          >
            <div style={{ lineHeight: "normal" }}>
              <p
                style={{
                  paddingLeft: "10px",
                  margin: 0,
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                {userData?.username}
              </p>
              <p
                style={{
                  paddingLeft: "10px",
                  margin: 0,
                  fontWeight: "300",
                  fontSize: "12px",
                }}
              >
                {userData?.email}
              </p>
            </div>
            <p
              style={{
                paddingLeft: "10px",
                margin: 0,
                fontWeight: "300",
              }}
            >
              Avg.rating :
              {userData?.avg_rating == 0
                ? "NAN"
                : userData?.avg_rating +
                  `<span><i className="tf-ion-android-star"></i></span>`}
            </p>
          </div>
        </div>
      </div>
      <Products
        userProfileData={userData}
        isCurrentUser={userdata?.uid == location.state}
      />
    </div>
  );
}

export default UserProfile;
