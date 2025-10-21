import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainView from './MainView';
import TrackingPanel from './tracking';
import Dashboard from './Dashboard';
import CompoundRequestForm from './request-form';
import HomeView from './HomeView';
import FooterView from './FooterView';
import HeaderView from './HeaderView';
import NavView from './NavView';
import CenterView from './CenterView';
import MenuView from './MenuView';
import TopView from './TopView';
import Layout from './Layout'; // Assuming you have a Layout component

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/MainView" element={<MainView />} />

        <Route path="/tracking" element={<TrackingPanel />} />

        <Route path="/Dashboard" element={<Dashboard />} />

        <Route path="/request-form" element={<CompoundRequestForm />} />

        <Route path="/HomeView" element={<HomeView />} />

        <Route path="/FooterView" element={<FooterView />} />

        <Route path="/HeaderView" element={<HeaderView />} />

        <Route path="/NavView" element={<NavView />} />

        <Route path="/CenterView" element={<CenterView />} />

        <Route path="/MenuView" element={<MenuView />} />

        <Route path="/TopView" element={<TopView />} />
      </Route>

    </Routes>
  );
};

export default App;