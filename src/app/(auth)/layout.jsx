import { Toaster } from "react-hot-toast";

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}