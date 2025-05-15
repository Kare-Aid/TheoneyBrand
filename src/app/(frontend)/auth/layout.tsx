export default function AuthLayout(props: { children: React.ReactNode }) {
  return (
    <div className="bg-primary dark:bg-[#011A16] text-white">
      <main className="max-w-screen-2xl mx-auto min-h-screen flex items-center justify-center">
        {props.children}
      </main>
    </div>
  )
}
