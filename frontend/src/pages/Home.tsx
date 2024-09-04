import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to IC Box
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Secure cloud storage on the Internet Computer
      </Typography>
      <img
        src="https://images.unsplash.com/photo-1489415964239-b86d5c6552ce?ixid=M3w2MzIxNTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjU0NjQ4MDR8&ixlib=rb-4.0.3"
        alt="Cloud Storage"
        className="my-8 rounded-lg shadow-lg max-w-full h-auto"
      />
      <div>
        <Button variant="contained" color="primary" component={Link} to="/files" size="large">
          Get Started
        </Button>
      </div>
      <Typography variant="caption" display="block" className="mt-4">
        Photo by <a href="https://unsplash.com/photos/empty-desert-under-gray-couldy-sky-mM8oyeEOnlk" target="_blank" rel="noopener noreferrer">Unsplash</a>
      </Typography>
    </div>
  );
};

export default Home;
