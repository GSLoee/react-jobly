import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

function SignupForm({ signup }) {
  const navigate = useNavigate(); 
  const [formErrors, setFormErrors] = useState([]);
  const [formData, setFormData] = useState({
    username: '', 
    password: '',
    firstName: '', 
    lastName: '', 
    email: ''        
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await signup(formData);
      if (result.success) {
        navigate("/");
      } else {
        setFormErrors(result.errors);
      }
    } catch (e) {
      setFormErrors([e.message]);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h2 className="mb-3">Sign Up</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>First name</label>
                <input
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                />
              </div>

              {formErrors.length
                ? <div className="alert alert-danger">{formErrors.join(", ")}</div>
                : null
              }

              <button className="btn btn-primary float-right">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
