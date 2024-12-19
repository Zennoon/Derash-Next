import ThemeProvider from "@/components/providers/ThemeProvider";
import NavBar from "@/components/ui/NavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <NavBar />
      {children}
    </ThemeProvider>
  );
}
