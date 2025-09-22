import { useState } from 'react';

const UserRegister = () => {
  const [registerSubmit, setRegisterSubmit] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    cpassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterSubmit({
      ...registerSubmit,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!registerSubmit.fullName) {
      newErrors.fullName = 'Name is required.';
    }
    
    if (!registerSubmit.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(registerSubmit.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    if (!registerSubmit.mobile) {
      newErrors.mobile = 'Mobile Number is required.';
    } else if (!/^\d{10}$/.test(registerSubmit.mobile)) {
      newErrors.mobile = 'Mobile Number must be exactly 10 digits.';
    }
    
    if (!registerSubmit.password) {
      newErrors.password = 'Password is required.';
    }
    
    if (!registerSubmit.cpassword) {
      newErrors.cpassword = 'Confirm Password is required.';
    } else if (registerSubmit.password !== registerSubmit.cpassword) {
      newErrors.cpassword = 'Passwords do not match.';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', registerSubmit);
        setIsSubmitting(false);
        // Handle successful registration here
      }, 2000);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="container-fluid min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/images/erp.jpg')" }}>
      <div className="row flex">
        <div className="col-md-3"></div>
        <div className="col-lg-8 col-md-6 col-sm-6 mt-3">
          <div className="row loginbox mt-3" style={{ 
            background: 'linear-gradient(163deg, rgb(221 248 255) 0%, rgb(255 255 255) 100%)',
            boxShadow: '0 4px 18px #00696c9e',
            borderRadius: '25px'
          }}>
            <div className="col-md-5">
              <div className="text-center" style={{ marginTop: '50px' }}>
                <img src="assets/images/logo.png" alt="" className="img-fluid" style={{ width: '40%' }} />
              </div>
              <img src="assets/images/billing-software.png" alt="" style={{ marginLeft: '15px', marginTop: '10px' }} />
            </div>
            <div className="col-md-7">
              <div className="card-body" style={{ 
                padding: '20px 15px', 
                background: '#fff', 
                marginRight: '-15px', 
                borderRadius: '0 25px 25px 0' 
              }}>
                <h4 className="text-center" style={{ 
                  fontWeight: '600', 
                  letterSpacing: '-0.5px', 
                  color: '#2e50a3', 
                  marginBottom: '0px', 
                  fontSize: '20px' 
                }}>
                  Sign Up
                </h4>
                
                <form onSubmit={handleSubmit} className="loginform">
                  {/* Full Name field */}
                  <div className="mb-2">
                    <label htmlFor="fullName" className="form-label" style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      marginBottom: '2px' 
                    }}>
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="fullName" 
                      name="fullName"
                      value={registerSubmit.fullName}
                      onChange={handleChange}
                      required 
                      placeholder="Full Name"
                      style={{ 
                        boxShadow: 'none',
                        borderRadius: '3px',
                        border: '#ddd 1px solid'
                      }}
                    />
                    {submitted && errors.fullName && (
                      <div className="text-danger">{errors.fullName}</div>
                    )}
                  </div>
                  
                  {/* Email field */}
                  <div className="mb-2">
                    <label htmlFor="email" className="form-label" style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      marginBottom: '2px' 
                    }}>
                      Email
                    </label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      name="email"
                      value={registerSubmit.email}
                      onChange={handleChange}
                      required 
                      placeholder="Email"
                      style={{ 
                        boxShadow: 'none',
                        borderRadius: '3px',
                        border: '#ddd 1px solid'
                      }}
                    />
                    {submitted && errors.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
                  </div>
                  
                  {/* Mobile field */}
                  <div className="mb-2">
                    <label htmlFor="mobile" className="form-label" style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      marginBottom: '2px' 
                    }}>
                      Mobile
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="mobile" 
                      name="mobile"
                      value={registerSubmit.mobile}
                      onChange={handleChange}
                      required 
                      placeholder="Mobile"
                      style={{ 
                        boxShadow: 'none',
                        borderRadius: '3px',
                        border: '#ddd 1px solid'
                      }}
                    />
                    {submitted && errors.mobile && (
                      <div className="text-danger">{errors.mobile}</div>
                    )}
                  </div>
                  
                  {/* Password field */}
                  <div className="mb-2">
                    <label htmlFor="password" className="form-label" style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      marginBottom: '2px' 
                    }}>
                      Password
                    </label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      name="password"
                      value={registerSubmit.password}
                      onChange={handleChange}
                      required 
                      placeholder="Password"
                      style={{ 
                        boxShadow: 'none',
                        borderRadius: '3px',
                        border: '#ddd 1px solid'
                      }}
                    />
                    {submitted && errors.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}
                  </div>
                  
                  {/* Confirm Password field */}
                  <div className="mb-2">
                    <label htmlFor="cpassword" className="form-label" style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      marginBottom: '2px' 
                    }}>
                      Confirm Password
                    </label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="cpassword" 
                      name="cpassword"
                      value={registerSubmit.cpassword}
                      onChange={handleChange}
                      required 
                      placeholder="Confirm Password"
                      style={{ 
                        boxShadow: 'none',
                        borderRadius: '3px',
                        border: '#ddd 1px solid'
                      }}
                    />
                    {submitted && errors.cpassword && (
                      <div className="text-danger">{errors.cpassword}</div>
                    )}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="width-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Please wait.........' : 'Sign-Up'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;