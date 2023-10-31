'use client';

import { Calculator, Equal, X } from 'lucide-react';
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
  const calculatorValueOne = useRef(null);
  const calculatorValueTwo = useRef(null);
  const calculatorValueThree = useRef(null);
  const calculatorProfile = useRef(null);

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


  const calcular = () => {
    if (!calculatorValueOne.current?.value) {
      return toast.error('Adicione o valor 1 para calcular');
    }

    if (!calculatorValueTwo.current?.value) {
      return toast.error('Adicione o valor 2 para calcular');
    }

    if (!calculatorValueThree.current?.value) {
      return toast.error('Adicione o valor 3 para calcular');
    }

    if (!calculatorProfile.current?.value) {
      return toast.error('Adicione o perfil para calcular');
    }

    const result = calculatorValueOne.current?.value * calculatorValueTwo.current?.value * calculatorValueThree.current?.value;

    setData(prev => {
      return {
        ...prev,
        calculator: {
          ...prev.calculator,
          valueOne: calculatorValueOne.current.value,
          valueTwo: calculatorValueTwo.current.value,
          profile: calculatorProfile.current.value,
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
        defaultValue={document?.title}
      />

      <div className="flex flex-col my-2 gap-2 items-start">
        <span className="font-bold text-lg">Calculadora de multiplicação</span>
        <div className="flex flex-col gap-2">
          <label htmlFor="calculatorProfile" className='flex flex-col gap-0.5 max-w-sm'>
            <input
              type="text"
              id="calculatorProfile"
              placeholder="Digite o perfil"
              ref={calculatorProfile}
              defaultValue={data?.calculator?.profile}
              className='px-4 py-2 rounded-md text-black outline-0 focus:border-green-500 border-transparent border-2'
            />
          </label>
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
              <X />
            </span>
            <label htmlFor="valorZ" className='flex flex-col gap-0.5'>
              <input
                type="number"
                id="valorZ"
                placeholder="Digite o valor 3"
                ref={calculatorValueThree}
                defaultValue={data?.calculator?.valueThree}
                className='px-4 py-2 rounded-md text-black outline-0 focus:border-green-500 border-transparent border-2'
              />
            </label>
            <span className="">
              <Equal />
            </span>
            <span className='font-bold text-2xl'>{data?.calculator?.result}</span>
          </div>
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