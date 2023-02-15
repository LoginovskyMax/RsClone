
interface IProps {
    gameName:string
}

export const CreateGamesList = ({gameName}:IProps) => {
  const getGames = () => {
    fetch(`https://rsgames.online:8888//games/list?name=${gameName}`)
      .then(response=>response.json())
      .then(data=>console.log(data))
  }
  return (
    <div>
        CreateGamesList
        <button onClick={getGames}>get</button>
    </div>
  )
}
