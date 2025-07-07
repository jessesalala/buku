import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useNavigate } from 'react-router-dom';
import './PdfViewer.css';

// Worker configuration with proper error handling
const setupPDFWorker = async () => {
  // Try CDN first
  try {
    pdfjs.GlobalWorkerOptions.workerSrc = 
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    await pdfjs.getDocument({ url: '' }).promise; // Test worker
    return true;
  } catch (cdnError) {
    console.warn('CDN worker failed, trying local...');
    
    // Fallback to local worker
    try {
      pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
      await pdfjs.getDocument({ url: '' }).promise; // Test worker
      return true;
    } catch (localError) {
      console.error('All worker sources failed:', localError);
      return false;
    }
  }
};

export default function PdfViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfUrl, setPdfUrl] = useState('');
  const [workerStatus, setWorkerStatus] = useState('loading');
  const navigate = useNavigate();

  // Initialize worker
  useEffect(() => {
    let mounted = true;
    
    const initialize = async () => {
      const success = await setupPDFWorker();
      if (mounted) {
        setWorkerStatus(success ? 'ready' : 'failed');
      }
    };
    
    initialize();
    
    return () => {
      mounted = false;
      // Proper cleanup
      pdfjs.GlobalWorkerOptions.workerPort = null;
    };
  }, []);

  // Load PDF
  useEffect(() => {
    if (workerStatus !== 'ready') return;

    const loadPDF = async () => {
      try {
        // First try direct URL
        const testUrl = '/books/book.pdf';
        const response = await fetch(testUrl);
        
        if (!response.ok) throw new Error('Fetch failed');
        if (!response.headers.get('content-type')?.includes('application/pdf')) {
          throw new Error('Invalid content type');
        }
        
        // Convert to blob for more reliable loading
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
        
        return () => URL.revokeObjectURL(objectUrl);
      } catch (error) {
        console.error('PDF loading error:', error);
        setPdfUrl('/books/book.pdf'); // Fallback to direct URL
      }
    };

    loadPDF();
  }, [workerStatus]);

  const reloadComponent = () => {
    window.location.reload();
  };

  return (
    <div className="pdf-viewer">
      <div className="header-controls">
        <button onClick={() => navigate(-1)}>← Back</button>
        <button onClick={reloadComponent}>⟳ Reload</button>
        <a 
          href={pdfUrl || '/books/book.pdf'} 
          target="_blank"
          rel="noopener noreferrer"
          className="external-link"
        >
          Open Directly
        </a>
      </div>

      {workerStatus === 'loading' && (
        <div className="status-message">
          <p>Initializing PDF engine...</p>
        </div>
      )}

      {workerStatus === 'failed' && (
        <div className="error-message">
          <h3>PDF Engine Failed Check Your Internet Connection</h3>
          <p>Could not initialize PDF rendering engine.</p>
          <button onClick={reloadComponent}>Try Again</button>
        </div>
      )}

      {workerStatus === 'ready' && pdfUrl && (
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          onLoadError={(error) => {
            console.error('Document load error:', error);
            reloadComponent();
          }}
          loading={<div className="loading">Loading book content...</div>}
          error={
            <div className="error-message">
              <h3>Rendering Failed</h3>
              <p>Technical details:</p>
              <pre>{`Worker: ${pdfjs.GlobalWorkerOptions.workerSrc}\nFile: ${pdfUrl}`}</pre>
              <button onClick={reloadComponent}>Full Reload</button>
            </div>
          }
        >
          <Page 
            pageNumber={pageNumber} 
            width={Math.min(window.innerWidth - 40, 800)}
            onRenderError={(error) => {
              console.error('Page render error:', error);
              reloadComponent();
            }}
          />
        </Document>
      )}
    </div>
  );
}