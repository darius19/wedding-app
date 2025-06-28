import React, { useState } from 'react';

const UploadSection = () => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleDownload = () => {
    // Placeholder for download logic
    alert('Download not implemented. Files: ' + files.map(f => f.name).join(', '));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-deepgreen text-ivory px-4">
      <h1 className="text-4xl md:text-6xl font-serif font-semibold text-center mb-2">
        Share the <span className="italic">Love</span>
      </h1>
      <p className="text-center text-lg md:text-xl mb-8">
        Capture & Share Precious Moments<br />
        from Our Wedding Celebration
      </p>

      <div className="bg-ivory text-deepgreen p-6 rounded-xl w-full max-w-xl shadow-lg space-y-4">
        <div className="border-2 border-dashed border-deepgreen rounded-lg p-6 text-center cursor-pointer">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full h-full opacity-0 absolute cursor-pointer"
            style={{ top: 0, left: 0 }}
          />
          <p>Drag and drop your photos here<br />or click to select</p>
        </div>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Leave a message for the couple (optional)"
          className="w-full p-2 rounded-md border border-deepgreen focus:outline-none"
        />

        <button
          onClick={handleDownload}
          className="w-full bg-deepgreen text-ivory py-3 rounded-full font-medium text-lg shadow-md hover:bg-deepgreen/90"
        >
          Download Selected Photos
        </button>
      </div>

      <div className="mt-10 text-center">
        {files.length === 0 ? (
          <>
            <p className="text-lg font-medium">No photos uploaded yet.</p>
            <p className="text-sm text-ivory/80">Be the first to share your memories!</p>
          </>
        ) : (
          <p className="text-lg font-medium">{files.length} photo(s) ready for download.</p>
        )}
      </div>

      <div className="mt-16 text-center">
        <p className="uppercase text-sm tracking-widest">Save the Date</p>
        <p className="text-2xl md:text-4xl font-serif font-semibold">July 19th, 2025</p>
      </div>
    </div>
  );
};

export default UploadSection;