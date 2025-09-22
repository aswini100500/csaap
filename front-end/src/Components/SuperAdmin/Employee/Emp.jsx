import React from "react";

const Emp = () => {
  return (
    <div className="flex">
      <div className="md:w-1/2">
        <div>
          <h1>Secure & Privacy-Focused Employee Monitoring Software</h1>
          <p>
            Teramind’s #1 rated employee monitoring software helps companies
            track work time, enhance team productivity, and secure sensitive
            data while respecting privacy for both in-office and remote workers
          </p>
          <button>Request for a Demo</button>
        </div>
      </div>
      <div className="md:w-1/2">
        <div>
          <img src="public/emp.webp" className="h-12 w-32" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Emp;
