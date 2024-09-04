import React, { useState, useEffect } from 'react';
import { backend } from '../../declarations/backend';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../components/ErrorMessage';

interface FileInfo {
  id: bigint;
  name: string;
  size: bigint;
  createdAt: bigint;
  updatedAt: bigint;
}

const Files: React.FC = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const result = await backend.listFiles([]);
      setFiles(result);
      setError(null);
    } catch (error) {
      console.error('Error fetching files:', error);
      setError('Failed to fetch files. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: { file: FileList }) => {
    setLoading(true);
    try {
      const file = data.file[0];
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer]);
      const result = await backend.uploadFile(file.name, [...new Uint8Array(arrayBuffer)], []);
      if ('ok' in result) {
        console.log('File uploaded successfully');
        fetchFiles();
        reset();
        setError(null);
      } else {
        console.error('Error uploading file:', result.err);
        setError('Failed to upload file. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        My Files
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <input type="file" {...register('file')} required />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          Upload File
        </Button>
      </form>
      {error && <ErrorMessage message={error} />}
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {files.map((file) => (
            <ListItem key={Number(file.id)}>
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText
                primary={file.name}
                secondary={`Size: ${Number(file.size)} bytes | Created: ${new Date(Number(file.createdAt) / 1000000).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default Files;
