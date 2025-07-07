import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useNavigate } from 'react-router-dom';

// PDF worker setup
pdfjs.GlobalWorkerOptions.workerSrc = 
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

export default function BookReader() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();

  // CORRECT path - using process.env.PUBLIC_URL
  const pdfFile = `${process.env.PUBLIC_URL}/books/book.pdf`;

  // Verify PDF exists
  useEffect(() => {
    const verifyPdf = async () => {
      try {
        const response = await fetch(pdfFile);
        if (!response.ok) {
          console.error('PDF not found at:', pdfFile);
          alert(`PDF not found at: ${pdfFile}\nCheck public/books/`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    verifyPdf();
  }, [pdfFile]);

  return (
    <div style={{ padding: '20px' }}>
      <button 
        onClick={() => navigate(-1)}
        style={{
          padding: '10px 15px',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          marginBottom: '20px',
          cursor: 'pointer'
        }}
      >
        ← Back to Books
      </button>

      <Document
        file={pdfFile}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        error={
          <div style={{
            textAlign: 'center',
            padding: '20px',
            background: '#ffebee',
            borderRadius: '8px'
          }}>
            <h3>BOOK NOT FOUND</h3>
            <p>Required file location:</p>
            <code>public/books/book.pdf</code>
            <p>Current path:</p>
            <code>{pdfFile}</code>
          </div>
        }
      >
        <Page 
          pageNumber={pageNumber} 
          width={Math.min(window.innerWidth - 40, 800)}
        />
      </Document>

      {numPages && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          marginTop: '20px'
        }}>
          <button 
            onClick={() => setPageNumber(p => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
            style={{
              padding: '8px 16px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ◀ Previous
          </button>
          <span>Page {pageNumber} of {numPages}</span>
          <button
            onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
            disabled={pageNumber >= numPages}
            style={{
              padding: '8px 16px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}