"use client"
import { useState, useEffect, useRef } from "react"
import "@mdxeditor/editor/style.css"
import dynamic from "next/dynamic"
import Link from 'next/link';


const MDXEditor = dynamic(
  () => import("@mdxeditor/editor/MDXEditor").then(mod => mod.MDXEditor),
  { ssr: false }
)
import { toolbarPlugin } from "@mdxeditor/editor/plugins/toolbar"
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  markdownShortcutPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  InsertImage,
  InsertTable,
  ListsToggle,
  CreateLink
} from "@mdxeditor/editor"




const Editor = ({ markdown, editorRef }) => {
  return (
    <MDXEditor
      className="MDXEditor"
      ref={editorRef}
      markdown={markdown}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        tablePlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {" "}
              <UndoRedo />
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
              <InsertImage />
              <InsertTable />
              <ListsToggle />
              <CreateLink />
            </>
          )
        })
      ]}
    />
  )
}

function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  const format = [10, 21]

  for (let i = 0; i < 32; i++) {
    // Insert hyphens at the specified positions
    if (format.includes(i)) {
      result += "-"
    } else {
      const randomIndex = Math.floor(Math.random() * characters.length)
      result += characters[randomIndex]
    }
  }

  return result
}

export default function Page() {
  const [showCreate, setShowCreate] = useState(false)
  const [propostasState, setPropostasState] = useState([])
  const [totalPriceVal, setTotalPriceVal] = useState(0)
  const [hourPriceVal, setHourPriceVal] = useState(0)
  const [projectTime, setProjectTime] = useState(0)
  const [quantProf, setQuantProf] = useState(0)
  const pageData00 = useRef(null)
  const pageData01 = useRef(null)
  const pageData02 = useRef(null)
  const pageData03 = useRef(null)
  const pageData04 = useRef(null)
  const pageData05 = useRef(null)
  const pageData06 = useRef(null)
  

  
  useEffect(() => {
    fetch("http://localhost:8080/api/getall/propostas")
      .then(response => response.json())
      .then(data => setPropostasState(data))
  }, [setPropostasState])

  const validateCalcInput = val => {
    const regex = /^(\d*\.?\d{0,2}|\d{1,3}(,\d{3})*(\.\d{0,2})?)$/
    return regex.test(val)
  }


  const addNewProp = (event) => {
    event.preventDefault();
    if (!validateCalcInput(event.target.hrtrab?.value)) return;
  
    const newProposta = {
      Nome: event.target.title?.value,
      ID: generateRandomString(),
      Version: 0,
    };
      
    // Adicione a nova proposta ao estado
    const updatedPropostas = [...propostasState, newProposta];
    setPropostasState(updatedPropostas);
    setShowCreate(false);
  
  // Limpar os campos de entrada após criar uma nova proposta
  event.target.title.value = "";
  event.target.hrtrab.value = "";
  event.target.projmon.value = "";
  event.target.quantprof.value = "";
  

  // Certifique-se de limpar os campos de entrada relacionados à nova proposta
  setHourPriceVal(0);
  setProjectTime(0);
  setQuantProf(0);
  setTotalPriceVal(0);

  setShowCreate(false);
};

  const hourOnChange = (e) => {
    if (!validateCalcInput(e.target.value)) return;
    setHourPriceVal(e.target.value);
    setTotalPriceVal(((e.target.value) * projectTime) * quantProf);
}

const projectTimeOnChange = (e) => {
    if (!validateCalcInput(e.target.value)) return;
    setProjectTime(e.target.value);
    setTotalPriceVal(((hourPriceVal) * e.target.value) * quantProf);
}

const quantProfOnChange = (e) => {
    if (!validateCalcInput(e.target.value)) return;
    setQuantProf(e.target.value);
    setTotalPriceVal(((hourPriceVal) * projectTime) * e.target.value);
}

  const dadosPags = [
    `## Dados da Página 1 - Analytics - Reajuste de Preços NSPCLA2278\_2015

## Maio 2023

Responsáveis: \[Marcelo Hodeyuki]    

Data de Criação: São Paulo, 24 de Maio de 2023

Hitss do Brasil Serviços Tecnológicos LTDA. Av. Presidente Vargas, nº 1.012, 8º andar – Centro - Rio de Janeiro, Brasil, CEP 20071-910, Tel. (55) 21 2121-9100&#x20;

[www.globalhitss.com](https://www.globalhitss.com)`,
        `# Dados da Página 2 - (PROPOSTA TÉCNICA E COMERCIAL)

## Controle de Alteração de Proposta

| *Versão* | *Observações* |  *Responsável* |  *Data*  |
| :--------: | :-------------: | :--------------: | :--------: |
|     1.0    |  Versão Inicial | Marcelo Hideyuki | 24/05/2023 |`,

        `## Dados da Página 9 - *Modelo de Atendimento*
   1. *Metodologia Scrum*
      1. O projeto será entregue considerando a metodologia ágil, considerando a estruturação de uma SQUAD com perfis variados para atender a necessidade do projeto.
   2. *Pilares*
      1. De acordo com a metodologia Scrum, os pilares de sustentação dos projetos desenvolvidos com este framework são:
         * Transparência dos processos, requisitos de entrega e status.
         * Inspeção constante de tudo o que está sendo feito.
         * Adaptação, tanto do processo, quanto do produto às mudanças.
   3. *Papéis*
      * *Product Owner:* é a pessoa que define os itens que compõem o Product Backlog e os prioriza nas *Sprint Planning Meetings*.
      * *Scrum Master:* procura assegurar que a equipe respeite e siga os valores e as práticas do *Scrum*. Ele também protege a equipe assegurando que ela não se comprometa excessivamente com relação àquilo que é capaz de realizar durante um Sprint. Também atua como facilitador do Daily Scrum e torna-se responsável por remover quaisquer obstáculos que sejam levantados pela equipe durante essas reuniões. Tipicamente é exercido por um gerente de projeto ou um líder técnico, mas em princípio pode ser qualquer pessoa da equipe.
   4. Eventos
   5. * *Sprint Planning* é uma reunião na qual estão presentes o Product Owner, o Scrum Master e todo o Scrum Team, bem como qualquer pessoa interessada que esteja representando a gerência ou o cliente. Durante o Sprint Planning, o Product Owner descreve as funcionalidades de maior prioridade para a equipe. A equipe faz perguntas durante a reunião de modo que seja capaz de quebrar as funcionalidades em tarefas técnicas, após a reunião. Essas tarefas irão dar origem ao Sprint Backlog.
      * *Daily Scrum* é uma reunião diária que acontece durante todo o Sprint.  Ela tem como objetivo disseminar conhecimento sobre o que foi feito no dia anterior, identificar impedimentos e priorizar o trabalho a ser realizado no dia que se inicia. Os Daily Scrums normalmente são realizados no mesmo lugar, na mesma hora do dia. Idealmente são realizados na parte da manhã, para ajudar a estabelecer as prioridades do novo dia de trabalho.
      * *Sprint Review* é realizado ao final de cada Sprint. Durante esta reunião, o Scrum Team mostra o que foi alcançado durante o Sprint. Tipicamente, isso tem o formato de um demo das novas funcionalidades. Os participantes do Sprint Review tipicamente incluem o Product Owner, o Scrum Team, o Scrum Master, gerência, clientes e engenheiros de outros projetos. Durante o Sprint Review, o projeto é avaliado em relação aos objetivos do Sprint, determinados durante o Sprint Planning Meeting. Idealmente, a equipe completou cada um dos itens do Product Backlog trazidos para fazer parte do Sprint, mas o importante mesmo é que a equipe atinja o objetivo geral do Sprint.* *Sprint Retrospective* é feito pelo Scrum Master e Dev Team no final de um Sprint e serve para identificar os pontos positivos e negativos daquele Sprint. Ele conclui com as lições apreendidas daquele Sprint a fim de melhorar a execução dos próximos sprints.
      * *Sprint Execution* é a execução diária das atividades que formam o Sprint. Ela não pode ser muito extensa e se restringir entre 2 a 4 semanas. Neste período as reuniões diárias Daily Scrum são realizadas a fim de solucionar possíveis impedimentos do Sprint.`,
   
        `## Dados da Página 15 - Expertises e Diferenciais da Hitss

Abaixo, realizamos um breve descritivo das estruturas operacionais que irão atuar nas atividades do serviço a ser prestado pela Hitss.

* A HITSS possui profissionais com sólidos conhecimentos técnicos das linguagens de programação e bancos de dados nas versões instaladas no ambiente Claro.
* A HITSS garante a alocação de profissionais que tenham, comprovadamente, no mínimo 5 anos de atuação em atividades no ambiente Claro.  Dado o alto nível de complexidade/criticidade dos sistemas do ambiente e da documentação existente. Esta experiência é fundamental para garantir alto nível de qualidade nas entregas eliminando risco de não atendimento de requisitos e de atrasos nas entregas planejadas.
* A HITSS possui a certificação CMMI nível 3 no Brasil.`,
        `## Dados da Página 16 - Mobilização

Após a assinatura do contrato a HITSS se compromete com a mobilização do seu time de trabalho em um prazo máximo de 3 semanas`,
        `## Dados da Página 18 - Termos e Condições comerciais

### Informações da Empresa e contatos

| Nome              | HITSS DO BRASIL SERVICOS TECNOLOGICOS LTDA         |
| ----------------- | -------------------------------------------------- |
| Endereço 01       | Rua Bernardino de Campos, 799, Centro, Campinas    |
| CEP 01            | 13010-151                                          |
| CNPJ 01           | 11.168.199/0002-69                                 |
| Endereço 02       | AV. PRES. VARGAS, 1012  CENTRO  RIO DE JANEIRO(RJ) |
| CEP 02            | 20071-002                                          |
| CNPJ 02           | 11.168.199/0001-88                                 |
| Ponto Focal HITSS | pontofocalhitss@globalhitss.com.br                 |

### Local(is) da Prestação dos Serviços

* O local do serviço a ser prestados, será dentro das instalações da Claro.



| Código do serviço | sigla do serviço | descrição dos serviços                                                                                                       |
| ----------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 1.01              | CAPEX            | Análise e Desenvolvimento de Sistemas.                                                                                       |
| 1.06              | CAPEX            | ASSESSORIA E CONSULTORIA EM INFORMÁTICA                                                                                      |
| 1.07              | OPEX             | SUPORTE TÉCNICO EM INFORMÁTICA, INCLUSIVE INSTALAÇÃO, CONFIGURAÇÃO E MANUTENÇÃO DE PROGRAMAS DE COMPUTAÇÃO E BANCOS DE DADOS |
|                   |                  |                                                                                                                              |

### Moeda e Tributação

Os preços estão apresentados em Reais (R$) e encontram-se totalizados com impostos nas alíquotas vigentes abaixo descritas:

#### Campinas

| PIS    | 0,65% |
| ------ | ----- |
| COFINS | 3,00% |
| ISS    | 2,00% |
| INSS\* | 4,50% |

> \*Obs.: ISS(se RJ 5,00%  -  Se Campinas 2,00%)



Quaisquer impostos, tributos ou encargos legais criados, alterados ou extintos, bem como a superveniência de disposições legais, de comprovada repercussão nos preços ofertados, implicarão após comunicação formal pela *HITSS* e com a devida comprovação, na alteração destes, para mais ou para menos, conforme o caso, no mesmo percentual.

### Validade da Proposta

Esta proposta tem validade de 60 dias a partir de sua entrega ao cliente. A *HITSS*, a seu critério, se reserva ao direito de revogar esta proposta a qualquer momento.

Os encargos aqui descritos não possuem obrigatoriedade jurídica, entretanto podem formar as bases para um acordo formal com obrigatoriedade jurídica entre *CLARO/SA* e *HITSS*.

### Aceite da Proposta

Conforme necessidade do projeto, o critério de aceitação do serviço foi definido da seguinte forma: A *CLARO/SA* fornecerá o seu aceite mediante um documento de entrega dos serviços em conformidade com a execução e respectiva aprovação.

### Início dos Serviços

Os serviços serão iniciados de forma imediata, a partir da formalização contratual com a devida aceitação das condições comerciais e abertura formal do pedido pela *CLARO/SA*.

### Status da Contratação

Demanda Nova referente a contrato de prestação de serviços conforme listados na proposta técnica.

> \*Obs:

> Recorrente: para casos de projetos já existentes (Renovação e Aditivo)

> Novo: para projetos Novos.`,
        `## Dados da Página 21 -  Responsabilidades

A *HITSS* não poderá ser responsabilizada por atrasos nos trabalhos decorrentes de fatores não controlados por ela, como falta de disponibilidade de recursos da *Claro*, atrasos nas instalações dos ambientes, atrasos em testes nos sistemas legados, indisponibilidade dos sistemas locais, legados, e de redes ou ainda indisponibilidade da documentação necessária para a realização dos trabalhos, dentre outros fatores.`,
    ]

  return (
    <main className="w-full h-full">
      <div
        className={
          (showCreate ? "flex" : "hidden") +
          " bg-black/25 w-screen h-screen justify-center items-center -mt-16 z-20"
        }
      >
        <div className="w-[80%] h-[80%] bg-neutral-50 relative rounded-md overflow-y-auto">
          <button
            className="absolute top-1 right-2"
            onClick={() => setShowCreate(false)}
          >
            FECHAR
          </button>
          <form
            onSubmit={addNewProp}
            className="flex flex-col justify-start items-start w-full h-full p-2"
          >
            <input
              type="text"
              placeholder="Nova Proposta"
              name="title"
              className="text-2xl bg-neutral-50 font-black"
            />
            <div className="flex flex-row">
              <input
                type="text"
                placeholder="Perfil Profissional"
                name="perfprof"
              />
              <h1 className="mr-2">:</h1>
              <input
                type="text"
                placeholder="Valor Hora/Mes"
                name="hrtrab"
                onChange={hourOnChange}
              />
              <h1 className="mx-2">&times;</h1>
              <input
                type="text"
                placeholder="Meses do projeto"
                name="projmon"
                onChange={projectTimeOnChange}
              />
              <h1 className="mx-2">&times;</h1>
              <input
                type="text"
                placeholder="Quantidade de profissionais"
                name="quantprof"
                onChange={quantProfOnChange}
              />
              <h1 className="mx-2">&#61;</h1>
              <h1>{totalPriceVal}</h1>
            </div>
            <Editor editorRef={pageData00} markdown={dadosPags[0]} />
            <Editor editorRef={pageData01} markdown={dadosPags[1]} />
            <Editor editorRef={pageData02} markdown={dadosPags[2]} />
            <Editor editorRef={pageData03} markdown={dadosPags[3]} />
            <Editor editorRef={pageData04} markdown={dadosPags[4]} />
            <Editor editorRef={pageData05} markdown={dadosPags[5]} />
            <Editor editorRef={pageData06} markdown={dadosPags[6]} />
            <button type="submit">Salvar Proposta</button>
           
          </form>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="w-full h-full grid grid-cols-5 2xl:grid-cols-6 grid-flow-row auto-rows-auto gap-2 p-2">
          {propostasState.map((prop, idx) => (
            <div
              key={idx}
              className="p-2 border-2 border-neutral-400 rounded-md w-64 h-24"
            >
              <div className="flex flex-row justify-between items-center">
                <h1>{prop.Nome}</h1>
                <h2 className="border-2 border-neutral-300 rounded-full px-2 aspect-square text-sm flex justify-center items-center">
                  {idx}
                </h2>
              </div>
            </div>
          ))}
        </main>
        <button
          onClick={() => setShowCreate(true)}
          className="border-2 border-neutral-950 bg-neutral-50 hover:bg-neutral-950 hover:text-neutral-50 text-neutral-950 rounded-md p-2"
        >
          Nova Proposta
        </button>
        <Link href="/">
  <button className="border-2 border-neutral-950 bg-neutral-50 hover:bg-neutral-950 hover:text-neutral-50 text-neutral-950 rounded-md p-2 mt-4">
    &#8592; 
  </button>
</Link>

      </div>
    </main>
  )
}






