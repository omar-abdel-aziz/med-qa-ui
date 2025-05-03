import React, { useState } from 'react';
import { uploadFile, processSession } from '../api';

function UploadForm({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const sid = await uploadFile(file);
    await processSession(sid);
    onUpload(sid);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept=".pdf,image/png,image/jpeg"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Upload & Process'}
      </button>
    </form>
  );
}

export default UploadForm;
