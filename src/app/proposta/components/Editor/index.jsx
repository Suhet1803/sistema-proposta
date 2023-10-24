'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { propostaKey } from '../../../../config/localstorage';

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

export const Editor = ({ document, toUpdate }) => {
  const router = useRouter();

  const config = useMemo(() => {
    return {
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: 'Comece a escrever...',
      allowTabNavigation: true,
      allowResizeY: true,
      autofocus: true,
    }
  }, []);

  const editor = useRef(null);

  const titleRef = useRef('');

  const [data, setData] = useState(document ?? {
    id: uuid(),
    title: titleRef.current.value,
    content: '',
    created_at: new Date(),
    updated_at: new Date(),
  });

  const handleUpdateDocument = useCallback(() => {
    if (!data?.title) {
      return toast.error('Adicione o título para a proposta');
    }

    if (!data?.content) {
      return toast.error('Adicione o conteúdo para a proposta');
    }

    const documentsSaved = localStorage.getItem(propostaKey);

    try {
      let documentsSavedParsed = JSON.parse(documentsSaved) || [];

      const foundIndex = documentsSavedParsed.findIndex(document => document.id === data.id);

      if (foundIndex !== -1) {
        const newData = {
          ...data,
          updated_at: new Date(),
        };

        documentsSavedParsed[foundIndex] = newData;

        localStorage.setItem(propostaKey, JSON.stringify(documentsSavedParsed));

        toast.success('Proposta atualizada com sucesso');
      }
    } catch (error) {
      localStorage.removeItem(propostaKey);
      localStorage.setItem(propostaKey, JSON.stringify([data]));
    }
  }, [data]);

  const handleCreateDocument = useCallback(() => {
    if (!data?.title) {
      return toast.error('Adicione o título da nova proposta');
    }

    if (!data?.content) {
      return toast.error('Adicione o conteúdo da nova proposta');
    }

    const documentsSaved = localStorage.getItem(propostaKey);

    try {
      let documentsSavedParsed = JSON.parse(documentsSaved) || [];

      documentsSavedParsed.push(data);

      localStorage.setItem(propostaKey, JSON.stringify(documentsSavedParsed));
    } catch (error) {
      localStorage.removeItem(propostaKey);
      localStorage.setItem(propostaKey, JSON.stringify([data]));
    }

    titleRef.current.value = '';

    setData({
      id: uuid(),
      title: '',
      content: '',
      created_at: new Date(),
      updated_at: new Date(),
    });

    toast.success('Uma nova proposta foi criada');
  }, [data]);

  const handleSaveDocument = useCallback(() => {
    if (toUpdate) {
      return handleUpdateDocument();
    }

    handleCreateDocument();
  }, [handleCreateDocument, handleUpdateDocument, toUpdate]);

  const handleDeleteDocument = useCallback((id) => {
    const documentsSaved = localStorage.getItem(propostaKey);

    try {
      let documentsSavedParsed = JSON.parse(documentsSaved);

      const foundDocument = documentsSavedParsed.find(document => document.id === id);

      if (foundDocument) {
        documentsSavedParsed = documentsSavedParsed.filter(where => where.id !== foundDocument.id);

        localStorage.setItem(propostaKey, JSON.stringify(documentsSavedParsed));

        toast.success('Proposta deletada com sucesso');
        router.push('/proposta/existentes');
      } else {
        toast.error('Proposta inexistete');
      }
    } catch (error) {
      toast.error('Proposta inexistete');
    }
  }, [router]);

  return (
    <div className='flex flex-col gap-4'>
      <input
        ref={titleRef}
        type="text"
        className="px-4 py-2 rounded-md text-black outline-0 focus:border-green-500 border-transparent border-2"
        placeholder='Título da proposta'
        defaultValue={data?.title}
        onBlur={(e) => {
          setData(prev => {
            return {
              ...prev,
              title: e.target.value,
            }
          })
        }}
      />

      <JoditEditor
        ref={editor}
        value={data?.content}
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
          onClick={handleSaveDocument}
        >
          Gravar Documento
        </button>

        {toUpdate && (
          <>
            <button
              className='bg-red-500 text-white px-8 py-2 rounded-md hover:brightness-110 transition-all'
              onClick={() => handleDeleteDocument(data.id)}
            >
              Deletar
            </button>
          </>
        )}
      </div>
    </div>
  );
};