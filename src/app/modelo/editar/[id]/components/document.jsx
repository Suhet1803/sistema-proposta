'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { propostaModeloKey } from '../../../../../config/localstorage';
import { Editor } from '../../../components/Editor';

export function EditDocument() {
  const router = useRouter();
  const documentId = useParams()?.id;
  // [{ id: '', title: '', content: '', created_at: '', updated_at: ''}]
  const [document, setDocument] = useState({});

  const [loading, setLoading] = useState(true);

  const foundDocument = useCallback(() => {
    const documentsSaved = localStorage.getItem(propostaModeloKey);

    try {
      const documentsSavedParsed = JSON.parse(documentsSaved);

      const foundDocument = documentsSavedParsed.find(document => document.id === documentId);

      if (foundDocument) {
        setDocument(foundDocument);
      }
    } catch (error) {
      toast.error('Proposta inexistete');
      router.push('/modelo/existentes');
    }

    setLoading(false);
  }, [documentId, router]);

  useEffect(() => {
    foundDocument();

    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <>
        <div className="max-w-5xl w-full mx-auto px-8 flex flex-col gap-8 mt-16">
          <h1 className="text-black tracking-wider font-bold text-3xl font-sans">Editar proposta modelo</h1>

          <div className="">Loading...</div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="max-w-5xl w-full mx-auto px-8 flex flex-col gap-8">
        <h1 className="text-black tracking-wider font-bold text-3xl font-sans">Editar proposta modelo</h1>
        <Editor document={document} toUpdate storageKey={propostaModeloKey} />
      </div>
    </>
  )
}