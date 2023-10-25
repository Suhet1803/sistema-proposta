'use client';

import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Navigation } from '../../../../../components/Navigation';
import { propostaHistoryKey } from '../../../../../config/localstorage';
import { DocumentHistory } from './DocumentHistory';
import { EditDocument } from './document';

export function EditDocumentContainer() {
  const documentId = useParams()?.id;

  const [documentsHistory, setDocumentsHistory] = useState([]);

  const foundDocumentsHistory = useCallback(() => {
    try {
      const documentsSaved = localStorage.getItem(propostaHistoryKey);

      let documentsSavedParsed = JSON.parse(documentsSaved);

      documentsSavedParsed = documentsSavedParsed.filter(document => {
        return document.documentId === documentId
      })

      setDocumentsHistory(documentsSavedParsed);
    } catch (error) {
      localStorage.removeItem(propostaHistoryKey);
    }
  }, [documentId]);

  useEffect(() => {
    foundDocumentsHistory();

    return () => { }
  }, [foundDocumentsHistory])

  return (
    <>
      <EditDocument setDocumentsHistory={setDocumentsHistory} />

      <Navigation />

      <DocumentHistory foundDocumentsHistory={foundDocumentsHistory} documentsHistory={documentsHistory} setDocumentsHistory={setDocumentsHistory} />
    </>
  );
}