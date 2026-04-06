import Menu from '$lib/components/layouts/Menu';
import ContactForm from '$lib/components/layouts/ContactForm';
import PageTransition from '$lib/components/layouts/PageTransition';

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="flex justify-between px-[5vw] py-[10vh] h-screen">
        <div className="flex flex-col items-start w-full min-h-screen text-white gap-8">
          <h1 className="text-3xl font-futura_pt tracking-wider">Say HELLO !</h1>
          <Menu />
        </div>
        <div className="flex flex-col justify-center items-end w-full text-white gap-8">
          <ContactForm />
        </div>
      </main>
    </PageTransition>
  );
}
