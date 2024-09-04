import React, { useState } from 'react';
import { backend } from '../../declarations/backend';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorMessage from '../components/ErrorMessage';

interface SharedFileInfo {
  id: bigint;
  name: string;
  size: bigint;
  createdAt: bigint;
  updatedAt: bigint;
}

const Shared: React.FC = () => {
  const [shareId, setShareId] = useState('');
  const [sharedFile, setSharedFile] = useState<SharedFileInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleShareIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShareId(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await backend.getSharedFile(shareId);
      if (result.length > 0) {
        setSharedFile(result[0]);
      } else {
        setError('Shared file not found');
        setSharedFile(null);
      }
    } catch (error) {
      console.error('Error fetching shared file:', error);
      setError('Error fetching shared file. Please try again.');
      setSharedFile(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Shared Files
      </Typography>
      <form onSubmit={handleSubmit} className="mb-4">
        <TextField
          label="Share ID"
          variant="outlined"
          value={shareId}
          onChange={handleShareIdChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          Get Shared File
        </Button>
      </form>
      {loading && <CircularProgress />}
      {error && <ErrorMessage message={error} />}
      {sharedFile && (
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              {sharedFile.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Size: {Number(sharedFile.size)} bytes
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Created: {new Date(Number(sharedFile.createdAt) / 1000000).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Shared;
