import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import documentService from '../../services/documentService';
import Spinner from '../../components/common/Spinner';
import toast from 'react-hot-toast';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import Tabs from '../../components/common/Tabs';
import ChatInterface from '../../components/chat/ChatInterface';
import AIActions from '../../components/ai/AIActions';
import FlashcardManager from '../../components/flashcards/FlashcardManager';
import QuizManager from '../../components/quizzes/QuizManager';
import QuizResultsManager from '../../components/quizzes/QuizResultsManager';

const DocumentDetailPage = () => {

    const { id } = useParams();
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Content');
    const [blobUrl, setBlobUrl] = useState(null);
    const [isFetchingBlob, setIsFetchingBlob] = useState(false);

    useEffect(() => {
        const fetchDocumentDetails = async () => {
            try {
                const data = await documentService.getDocumentById(id);
                setDocument(data);
            } catch (error) {
                toast.error('Failed to fetch document details.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDocumentDetails();
    }, [id]);

    // Helper function to get the full PDF URL
    const getPdfUrl = () => {
        if (!document?.data?.filePath) return null;

        const filePath = document.data.filePath;

        if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
            return filePath;
        }

        const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        return `${baseUrl}${filePath.startsWith('/') ? '' : '/'}${filePath}`;
    };

    useEffect(() => {
        const url = getPdfUrl();
        let objectUrl = null;
        if (url && url.includes('cloudinary.com')) {
            setIsFetchingBlob(true);
            fetch(url)
                .then(res => res.blob())
                .then(blob => {
                    const pdfBlob = new Blob([blob], { type: 'application/pdf' });
                    objectUrl = URL.createObjectURL(pdfBlob);
                    setBlobUrl(objectUrl);
                    setIsFetchingBlob(false);
                })
                .catch(err => {
                    console.error('Error fetching PDF blob:', err);
                    setIsFetchingBlob(false);
                });
        }
        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [document]);

    const renderContent = () => {
        if (loading) {
            return <Spinner />;
        }

        if (!document || !document.data || !document.data.filePath) {
            return <div className="text-center p-8">PDF not available.</div>;
        }

        const pdfUrl = getPdfUrl();
        const isCloudinary = pdfUrl && pdfUrl.includes('cloudinary.com');
        const displayUrl = isCloudinary ? blobUrl : pdfUrl;

        return (
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-300">
                    <span className="text-sm font-medium text-gray-700">Document Viewer</span>

                    <a
                        href={isCloudinary ? (blobUrl || '#') : pdfUrl}
                        target={isCloudinary && !blobUrl ? "_self" : "_blank"}
                        onClick={(e) => {
                            if (isCloudinary && !blobUrl) {
                                e.preventDefault();
                                toast.error("Please wait for the document to load");
                            }
                        }}
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 text-sm font-medium transition-color-blue ${isCloudinary && !blobUrl ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-700'}`}
                    >
                        <ExternalLink size={16} />
                        Open in new tab
                    </a>
                </div>
                <div className="bg-gray-100 p-1 relative">
                    {isFetchingBlob && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                            <Spinner />
                        </div>
                    )}
                    {displayUrl && (
                        <iframe
                            src={displayUrl}
                            className="w-full h-[70vh] bg-white rounded border border-gray-300"
                            title="PDF Viewer"
                            frameBorder="0"
                            style={{
                                colorScheme: "light",
                            }}
                        />
                    )}
                </div>
            </div>
        )
    };

    const renderChat = () => {
        return <ChatInterface />
    };

    const renderAIActions = () => {
        return <AIActions />
    };

    const renderFlashcardsTab = () => {
        return <FlashcardManager documentId={id} />
    };

    const renderQuizzesTab = () => {
        return <QuizManager documentId={id} />
    };

    const renderResultsTab = () => {
        return <QuizResultsManager documentId={id} />
    };

    const tabs = [
        { name: 'Content', label: 'Content', content: renderContent() },
        { name: 'Chat', label: 'Chat', content: renderChat() },
        { name: 'AI Actions', label: 'AI Actions', content: renderAIActions() },
        { name: 'Flashcards', label: 'Flashcards', content: renderFlashcardsTab() },
        { name: 'Quizzes', label: 'Quizzes', content: renderQuizzesTab() },
        { name: 'Results', label: 'Results', content: renderResultsTab() },
    ];

    if (loading) {
        return <Spinner />;
    }

    if (!document) {
        return <div className="text-center p-8">Documen</div>
    }

    return (
        <div>
            <div className="mb-4">
                <Link to="/documents" className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                    <ArrowLeft size={16} />
                    Back to Documents
                </Link>
            </div>
            <PageHeader title={document.data.title} />
            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    )
}

export default DocumentDetailPage;