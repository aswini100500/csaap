import React from 'react';

const LogoHeader = () => {
  return (
    <div style={headerStyle}>
      <div style={containerStyle}>
        <img src="iq.png" alt="IQ Logo" style={logoStyle} />
        <img src="logo.png" alt="Company Logo" style={logoStyle} />
        <img src="auditfiling-logo-bg.png" alt="Audit Filing Logo" style={logoStyle} />
        <img src="tracolab-logo.png" alt="Tracolab Logo" style={logoStyle} />
        <img src="sociomint_logo.png" alt="Sociomint Logo" style={logoStyle} />
      </div>
    </div>
  );
};

const headerStyle = {
  height: '60px',
  backgroundColor: '#f8f9fa',
  borderBottom: '1px solid #e9ecef',
  display: 'flex',
  alignItems: 'center',
  padding: '0 20px'
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto'
};

const logoStyle = {
  height: '30px',
  width: 'auto',
  maxWidth: '120px',
  objectFit: 'contain',
  filter: 'grayscale(100%)',
  opacity: '0.7',
  transition: 'all 0.3s ease'
};

export default LogoHeader;