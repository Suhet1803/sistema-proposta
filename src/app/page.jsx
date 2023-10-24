import Image from 'next/image';
import Link from 'next/link';
import { CurrentDate } from '../components/CurrentDate';
import styles from '../styles/Button.module.css';
import '../styles/tailwind.css';

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Pode fazer um component também para usar nas outras telas. É basicamente o mesmo conceito do CurrentDate */}
      <header className='max-w-max p-4'>
        <Image
          src="/logo.png"
          alt="Logo"
          width={150}
          height={100}
        />
      </header>

      <div className="flex items-center justify-center flex-col gap-24">
        {/* Isso é um component, percebe que reduz a quantidade de código em um arquivo, pois você separa em outro locais e pode reaproveitar */}
        <CurrentDate />

        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <h1 className='text-5xl bg-[#A6DBEA] p-28 rounded-[50px]'>Reunião</h1>

          {/* Pode fazer um component também para usar nas outras telas. É basicamente o mesmo conceito do CurrentDate */}
          <nav className="flex flex-col items-center gap-16">
            <Link href="/editar" className={styles.button}>
              Editar proposta
              <span className={styles.tooltip}>
                É uma ação para editar uma proposta existente no sistema
              </span>
            </Link>
            <Link href="/lista_de_propostas" className={styles.button}>
              Lista de Propostas Existentes
              <span className={styles.tooltip}>
                Ação para vizualizar suas propostas existentes dentro do sistema
              </span>
            </Link>
            <Link href="/proposta-nova-modelo" className={styles.button}>
              Proposta nova Modelo
              <span className={styles.tooltip}>
                Criação de uma proposta com base no modelo de uma proposta existente
              </span>
            </Link>
            <Link href="/proposta-nova" className={styles.button}>
              Proposta Nova
              <span className={styles.tooltip}>
                Ação de criação de uma proposta nova, já com os dados preedefinidos,mas com o modelo normal de proposta
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}


