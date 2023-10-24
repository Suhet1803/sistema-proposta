'use client';

import { Trash } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { propostaKey } from '../../../../config/localstorage';

export function Documents() {
  // [{ id: '', title: '', content: '', created_at: '', updated_at: ''}]
  const [documents, setDocuments] = useState([]);
  const [originalDocuments, setOriginalDocuments] = useState([]);

  function foundDocuments() {
    try {
      const documentsSaved = localStorage.getItem(propostaKey);

      const documentsSavedParsed = JSON.parse(documentsSaved);

      setDocuments(documentsSavedParsed);
      setOriginalDocuments(documentsSavedParsed);
    } catch (error) {
      localStorage.removeItem(propostaKey);
    }
  }

  const handleDeleteDocument = useCallback((id) => {
    const documentsSaved = localStorage.getItem(propostaKey);

    try {
      let documentsSavedParsed = JSON.parse(documentsSaved);

      const foundDocument = documentsSavedParsed.find(document => document.id === id);

      if (foundDocument) {

        documentsSavedParsed = documentsSavedParsed.filter(where => where.id !== foundDocument.id);

        localStorage.setItem(propostaKey, JSON.stringify(documentsSavedParsed));

        setDocuments((prev) => {
          return prev.filter(where => where.id !== foundDocument.id);
        });

        toast.success('Proposta deletada com sucesso');
      }
    } catch (error) {
      toast.error('Proposta inexistete');
    }
  }, []);

  const searchDocuments = useCallback((search) => {
    if (search) {
      const filteredDocs = originalDocuments.filter(document => document.title.includes(search));
      setDocuments(filteredDocs);
    } else {
      setDocuments(originalDocuments);
    }
  }, [originalDocuments]);

  useEffect(() => {
    foundDocuments();

    return () => { }
  }, []);

  return (
    <div className="max-w-5xl w-full mx-auto px-8 flex flex-col">
      <div className='flex flex-col gap-6'>
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-black tracking-wider font-bold text-3xl font-sans">Propostas existentes ({documents?.length ?? 0})</h1>

          {originalDocuments?.length > 0 && (
            <input
              type="text"
              className="max-w-md w-full px-4 py-2 rounded-md text-black outline-0 focus:border-green-500 border-transparent border-2"
              placeholder='Pesquisar proposta'
              onChange={(e) => searchDocuments(e.target.value)}
            />
          )}
        </div>

        <ul className="flex flex-col items-center w-full gap-4 pt-6 max-h-[640px] overflow-auto px-2">
          {documents && documents?.map(item => (
            <li key={item.id} className='flex items-center w-full relative'>
              <Link
                href={`/proposta/editar/${item.id}`}
                className="border-gray-300 rounded-md rounded-r-none border-2 w-full p-8 hover:border-green-500 transition-all text-2xl tracking-wider font-bold"
              >
                {item.title}
              </Link>

              <button
                className="bg-red-500 rounded-lg p-2 absolute -top-2 right-0 hover:brightness-125 transition-all text-2xl tracking-wider font-bold"
                title={'Deletar proposta'}
                onClick={() => handleDeleteDocument(item.id)}
              >
                <Trash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}