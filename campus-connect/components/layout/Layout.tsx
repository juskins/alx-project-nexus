import Footer from "./Footer"
import Header from "./Header"

interface LayoutProps {
   children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
   return (
      <>
         <main className="min-h-screen">
            {children}
         </main>
      </>
   )
}

export default Layout