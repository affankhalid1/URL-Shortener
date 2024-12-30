import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";

const poppins = localFont({
  src: "./fonts/Poppins-ExtraBold.ttf",
  variable: "--font-poppins",
  weight: "100 900",
});


export default function Home() {
  return (
    <main>
      <section className="grid grid-cols-2 h-[50vh] bg-purple-100">
        <div className=" flex flex-col gap-4 justify-center items-center">
          <p className={`font-bold text-3xl ${poppins.className}`}>
            The best URL shortener in the Market
            </p>
          <p className="px-48 text-center">We are the most straightforward URL shortener in the world. Most of the URL shortener will track you or ask you to give your details for login. We understand your need and hence we created this URL shortener.</p>

          <div className='flex gap-3'>
            <Link href = "/shorten"><button className='bg-purple-500 shadow-lg px-3 py-1 rounded-lg font-bold text-white'>Try Now</button></Link>
            <Link href = "/github"><button className='bg-purple-500 shadow-lg px-3 py-1 rounded-lg font-bold text-white'>Github</button></Link>
        </div>

        </div>
        <div className=" flex px-10 justify-start relative">
        <Image src="/vector.svg" alt="an image of a vector" fill= {true}  className="py-10 "/>
        </div>
      </section>
    </main>
  );
}
