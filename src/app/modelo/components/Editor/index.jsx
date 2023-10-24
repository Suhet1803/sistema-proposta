'use client';

import JoditEditor from 'jodit-react';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { propostaKey, propostaModeloKey } from '../../../../config/localstorage';

export const Editor = ({ document, toUpdate }) => {
  const router = useRouter();

  const config = useMemo(() => {
    return {
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: 'Comece a escrever...'
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
      return toast.error('Adicione o título para a proposta modelo');
    }

    if (!data?.content) {
      return toast.error('Adicione o conteúdo para a proposta modelo');
    }

    const documentsSaved = localStorage.getItem(propostaModeloKey);

    try {
      let documentsSavedParsed = JSON.parse(documentsSaved) || [];

      const foundIndex = documentsSavedParsed.findIndex(document => document.id === data.id);

      if (foundIndex !== -1) {
        const newData = {
          ...data,
          updated_at: new Date(),
        };

        documentsSavedParsed[foundIndex] = newData;

        localStorage.setItem(propostaModeloKey, JSON.stringify(documentsSavedParsed));

        toast.success('Proposta modelo atualizada com sucesso');
      }
    } catch (error) {
      localStorage.removeItem(propostaModeloKey);
      localStorage.setItem(propostaModeloKey, JSON.stringify([data]));
    }
  }, [data]);

  const handleCreateDocument = useCallback(() => {
    if (!data?.title) {
      return toast.error('Adicione o título da nova proposta modelo');
    }

    if (!data?.content) {
      return toast.error('Adicione o conteúdo da nova proposta modelo');
    }

    const documentsSaved = localStorage.getItem(propostaModeloKey);

    try {
      let documentsSavedParsed = JSON.parse(documentsSaved) || [];

      documentsSavedParsed.push(data);

      localStorage.setItem(propostaModeloKey, JSON.stringify(documentsSavedParsed));
    } catch (error) {
      localStorage.removeItem(propostaModeloKey);
      localStorage.setItem(propostaModeloKey, JSON.stringify([data]));
    }

    titleRef.current.value = '';

    setData({
      id: uuid(),
      title: '',
      content: '',
      created_at: new Date(),
      updated_at: new Date(),
    });

    toast.success('Uma nova proposta modelo foi criada');
  }, [data]);

  const handleSaveDocument = useCallback(() => {
    if (toUpdate) {
      return handleUpdateDocument();
    }

    handleCreateDocument();
  }, [handleCreateDocument, handleUpdateDocument, toUpdate]);

  const createDocumentByThis = useCallback(() => {
    if (!data?.title) {
      return toast.error('Adicione o título da nova proposta');
    }

    if (!data?.content) {
      return toast.error('Adicione o conteúdo da nova proposta');
    }

    const documentsSaved = localStorage.getItem(propostaKey);

    const newData = {
      ...data,
      id: uuid(),
      created_at: new Date(),
      updated_at: new Date(),
    };

    try {
      let documentsSavedParsed = JSON.parse(documentsSaved) || [];

      documentsSavedParsed.push(newData);

      localStorage.setItem(propostaKey, JSON.stringify(documentsSavedParsed));
    } catch (error) {
      localStorage.removeItem(propostaKey);
      localStorage.setItem(propostaKey, JSON.stringify([newData]));
    }

    toast.success('Uma nova proposta baseado neste modelo foi criada');
  }, [data,]);

  const handleDeleteDocument = useCallback((id) => {
    const documentsSaved = localStorage.getItem(propostaModeloKey);

    try {
      let documentsSavedParsed = JSON.parse(documentsSaved);

      const foundDocument = documentsSavedParsed.find(document => document.id === id);

      if (foundDocument) {
        documentsSavedParsed = documentsSavedParsed.filter(where => where.id !== foundDocument.id);

        localStorage.setItem(propostaModeloKey, JSON.stringify(documentsSavedParsed));

        toast.success('Proposta modelo deletada com sucesso');
        router.push('/modelo/existentes');
      } else {
        toast.error('Proposta modelo inexistete');
      }
    } catch (error) {
      toast.error('Proposta modelo inexistete');
    }
  }, [router]);

  return (
    <div className='flex flex-col gap-4'>
      <input
        ref={titleRef}
        type="text"
        className="px-4 py-2 rounded-md text-black outline-0 focus:border-green-500 border-transparent border-2"
        placeholder='Título da proposta modelo'
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
              className='bg-orange-500 text-white px-8 py-2 rounded-md hover:brightness-110 transition-all'
              onClick={createDocumentByThis}
            >
              Criar proposta baseado neste modelo
            </button>

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