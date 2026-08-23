import { NavbarPrimary } from "@/components/site/navbar-primary"
import { Navbar } from "@/components/site/navbar"
import { SiteFooter } from "@/components/site/site-footer"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavbarPrimary />
      <Navbar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  )
}
