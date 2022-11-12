import "./index.css"

interface iDeveloperName {
  developerName: string
}


export const Header = ({developerName}:iDeveloperName) => {
  return (
    <header className="header">
      <h1>{developerName}'s Challenge</h1>
    </header>
  )
}
