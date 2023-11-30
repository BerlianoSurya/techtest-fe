import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Page404 = () => {
  return (
    <div className="home container-fluid">
      <div className="page-404 text-center">
        <p>
          404 Not Found <br />
          Kembali ke{' '}
          <Link to="/" style={{ color: '#0000ff' }}>
            home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page404;
