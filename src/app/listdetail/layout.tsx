import Nav from '../components/nav'


export default function MyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
        <Nav/>
        {children}  
    </div>
  )
}
