import React from 'react';
import Alert from '@mui/material/Alert';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Alert severity="error" className="mb-4">
      {message}
    </Alert>
  );
};

export default ErrorMessage;
