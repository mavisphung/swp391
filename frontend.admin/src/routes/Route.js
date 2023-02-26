import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import { Dashboard } from '~/pages/Dashboard';
import { dashboard, home, login } from '~/system/Constants/LinkURL';

const CustomRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${home}`} />} />
      <Route path={`/${home}`} element={<Home />} />
      <Route path={`/${login}`} element={<Login />} />
      <Route path={`/${dashboard}`} element={<Dashboard />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
};

export default CustomRoute;
