'use client';

import { Calculator, Equal, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { propostaHistoryKey, propostaKey } from '../../../../config/localstorage';

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

export const Editor = ({ document, toUpdate, setDocumentsHistory }) => {
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
  const calculatorValueOne = useRef(null);
  const calculatorValueTwo = useRef(null);

  const [data, setData] = useState(document ?? {
    id: uuid(),
    title: titleRef.current.value,
    content: '',
    created_at: new Date(),
    updated_at: new Date(),
    calculator: {
      valueOne: calculatorValueOne.current?.value ?? null,
      valueTwo: calculatorValueTwo.current?.value ?? null,
      operator: '*', // Multiplicator
      result: null
    }
  });

  const handleUpdateDocument = useCallback(() => {
    if (!data?.title) {
      return toast.error('Adicione o título para a proposta');
    }

    if (!data?.content) {
      return toast.error('Adicione o conteúdo para a proposta');
    }

    const documentsSaved = localStorage.getItem(propostaKey);
    const documentsHistorySaved = localStorage.getItem(propostaHistoryKey);

    try {
      let documentsSavedParsed = JSON.parse(documentsSaved) || [];
      let documentsHistorySavedParsed = JSON.parse(documentsHistorySaved) || [];

      const foundIndex = documentsSavedParsed.findIndex(document => document.id === data.id);

      if (foundIndex !== -1) {
        const newData = {
          ...data,
          updated_at: new Date(),
        };

        documentsSavedParsed[foundIndex] = newData;

        localStorage.setItem(propostaKey, JSON.stringify(documentsSavedParsed));

        const newHistoryData = {
          id: uuid(),
          title: data.title,
          content: data.content,
          documentId: document.id,
          calculator: data.calculator,
          updated_at: new Date(),
          created_at: new Date(),
        };

        documentsHistorySavedParsed = [newHistoryData, ...documentsHistorySavedParsed];

        documentsHistorySavedParsed = documentsHistorySavedParsed.filter(document => {
          return document.documentId === newHistoryData.documentId
        })

        setDocumentsHistory(documentsHistorySavedParsed);

        localStorage.setItem(propostaHistoryKey, JSON.stringify(documentsHistorySavedParsed));
        toast.success('Proposta atualizada com sucesso');
      }
    } catch (error) {
      localStorage.removeItem(propostaKey);
      localStorage.setItem(propostaKey, JSON.stringify([data]));
    }
  }, [data, setDocumentsHistory, document]);

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

  const calcular = () => {
    if (!calculatorValueOne.current?.value) {
      return toast.error('Adicione o valor 1 para calcular');
    }

    if (!calculatorValueTwo.current?.value) {
      return toast.error('Adicione o valor 2 para calcular');
    }

    const result = calculatorValueOne.current?.value * calculatorValueTwo.current?.value;

    setData(prev => {
      return {
        ...prev,
        calculator: {
          ...prev.calculator,
          valueOne: calculatorValueOne.current.value,
          valueTwo: calculatorValueTwo.current.value,
          operator: '*', // Multiplicator
          result
        }
      }
    });

    toast.success('Valor calculado. Agora é só salvar a proposta para atualizar.')
  };

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

      <div className="flex flex-col my-2 gap-2 items-start">
        <span className="font-bold text-lg">Calculadora de multiplicação</span>
        <div className="flex gap-2 items-end">
          <label htmlFor="valorX" className='flex flex-col gap-0.5'>
            <input
              type="number"
              id="valorX"
              placeholder="Digite o valor 1"
              ref={calculatorValueOne}
              defaultValue={data?.calculator?.valueOne}
              className='px-4 py-2 rounded-md text-black outline-0 focus:border-green-500 border-transparent border-2'
            />
          </label>
          <span className="">
            <X />
          </span>
          <label htmlFor="valorY" className='flex flex-col gap-0.5'>
            <input
              type="number"
              id="valorY"
              placeholder="Digite o valor 2"
              ref={calculatorValueTwo}
              defaultValue={data?.calculator?.valueTwo}
              className='px-4 py-2 rounded-md text-black outline-0 focus:border-green-500 border-transparent border-2'
            />
          </label>
          <span className="">
            <Equal />
          </span>
          <span className='font-bold text-2xl'>{data?.calculator?.result}</span>
        </div>

        <button
          onClick={calcular}
          className='flex items-center gap-1 bg-green-500 text-white px-8 py-2 rounded-md hover:brightness-110 transition-all'
        >
          <Calculator className='w-4 h-4' />
          Calcular
        </button>
      </div>

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