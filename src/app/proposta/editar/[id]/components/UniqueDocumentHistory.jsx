'use client';

import dynamic from 'next/dynamic';
import { useCallback, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { propostaHistoryKey } from '../../../../../config/localstorage';
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

export function UniqueDocumentHistory({
  document,
  foundDocumentsHistory
}) {
  const config = useMemo(() => {
    return {
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: 'Comece a escrever...',
      allowTabNavigation: true,
      allowResizeY: true,
    }
  }, []);

  const editor = useRef(null);

  const titleRef = useRef('');

  const [data, setData] = useState(document);

  const handleUpdateDocument = useCallback(() => {
    const documentsHistorySaved = localStorage.getItem(propostaHistoryKey);

    const newHistoryData = {
      ...data,
      id: uuid(),
      updated_at: new Date(),
    };

    try {
      let documentsHistorySavedParsed = JSON.parse(documentsHistorySaved) || [];

      documentsHistorySavedParsed = [newHistoryData, ...documentsHistorySavedParsed];

      documentsHistorySavedParsed = documentsHistorySavedParsed.filter(document => {
        return document.documentId === data.documentId
      });

      localStorage.setItem(propostaHistoryKey, JSON.stringify(documentsHistorySavedParsed));

      toast.success('Proposta no histórico atualizada com sucesso');

      foundDocumentsHistory();
    } catch (error) {
      localStorage.removeItem(propostaHistoryKey);
      localStorage.setItem(propostaHistoryKey, JSON.stringify([newHistoryData]));
    }
  }, [foundDocumentsHistory, data]);

  return (
    <div className='flex flex-col gap-4'>
      <input
        ref={titleRef}
        type="text"
        className="px-4 py-2 rounded-md text-black outline-0 focus:border-green-500 border-transparent border-2"
        placeholder='Título da proposta'
        defaultValue={document?.title}
      />

      <JoditEditor
        ref={editor}
        value={document?.content}
        config={config}
        tabIndex={1}
        onBlur={content => {
          setData(prev => {
            return {
              ...prev,
              content,
            }
          });
        }}
      />

      <div className="flex gap-4 items-center">
        <button
          className='bg-green-500 text-white px-8 py-2 rounded-md hover:brightness-110 transition-all'
          onClick={handleUpdateDocument}
        >
          Gravar Documento
        </button>

        <span className="font-bold">Atualizado em: {new Date(document.updated_at).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })}</span>
      </div>

    </div>
  );
}