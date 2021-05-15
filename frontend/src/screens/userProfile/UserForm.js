import React from "react";
import { Header } from "../../components/index";

const UserForm = ({
  name,
  email,
  password,
  gender,
  mobile,
  confirmPassword,
  setName,
  setEmail,
  setGender,
  setConfirmPassword,
  setPassword,
  setMobile,
  handleSubmit,
  errorUpdate,
  loadingUpdate,
  success,
  history,
}) => {
  const formData = [
    {
      type: "text",
      id: "name",
      pholder: "name",
      label: "Name",
      value: name,
      setValue: setName,
    },
    {
      type: "text",
      id: "email",
      pholder: "email",
      label: "Email Address",
      value: email,
      setValue: setEmail,
    },
    {
      type: "number",
      id: "mobile",
      pholder: "mobile",
      label: "Phone No",
      maxLength: "10",
      value: mobile,
      setValue: setMobile,
    },
    {
      type: "text",
      id: "password",
      pholder: "password",
      label: "Password",
      value: password,
      setValue: setPassword,
    },
    {
      type: "text",
      id: "confirmpassword",
      pholder: "confirmpassword",
      label: "Confirm Password",
      value: confirmPassword,
      setValue: setConfirmPassword,
    },
  ];

  return (
    <>
      <div className="card card-body">
        {loadingUpdate && <div>Loading...</div>}
        {errorUpdate && <div className="alert alert-danger">{errorUpdate}</div>}
        {success && (
          <div className="alert alert-info">Profile Update Succesfully</div>
        )}
        <React.Fragment>
          <div className="card-title fs-5 mb-4">Personal Informations</div>
          <form action="" onSubmit={handleSubmit}>
            <div className="row g-4 ">
              {formData.map((item) => (
                <div className="col-12 col-lg-6 col-xl-6" key={item.id}>
                  <div className="form-floating">
                    <input
                      type={item.type}
                      id={item.id}
                      placeholder={item.pholder}
                      className="form-control"
                      value={item.value}
                      name={item.id}
                      maxLength={item.maxLength}
                      required
                      onChange={(e) => item.setValue(e.target.value)}
                    />
                    <label htmlFor={item.id} style={{ fontSize: 14 }}>
                      {item.label}
                    </label>
                  </div>
                </div>
              ))}
              <div className="col-12 col-lg-6 col-xl-6">
                <div className="form-floating">
                  <select
                    name="gender"
                    className="form-select"
                    value={gender}
                    id="gender"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <label htmlFor="gender">Gender</label>
                </div>
              </div>
            </div>
            <button className="btn btn-primary mx-auto my-4">
              Update Profile
            </button>
          </form>
        </React.Fragment>
      </div>
    </>
  );
};

export default UserForm;
