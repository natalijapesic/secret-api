import { Header } from '@/components/header';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <>
            <Header></Header>
            <main></main>
        </>
    );
}
