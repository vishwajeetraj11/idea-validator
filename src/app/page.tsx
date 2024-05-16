import { CreateIdea } from "./_components/create-idea";
// import LogoutButton from "./_components/logout-button";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Creating Valid Ideas
        </h1>
        {/* <LogoutButton /> */}
        <div className="flex flex-col items-center gap-2">
          <CreateIdea />
        </div>
      </div>
    </main>
  );
}
