import React, { useState } from 'react';
import { Box } from '@mui/material';
import './CenterView.css'; // Assuming you have a CSS file for styles

const CenterView = () => {
  const [activeCard, setActiveCard] = useState(0);

  // Simulate card items if needed
  const cardItems = [
    <div key={0}>Card 1 Content</div>,
    <div key={1}>Card 2 Content</div>,
    // Add more card items as needed
  ];

  return (
    <Box className="centerview" sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* {cardItems[activeCard]} */}
    </Box>
  );
};

export default CenterView;