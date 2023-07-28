import { getTrelloBoard, moveCardEstimated } from "./services/TrelloServices"
import { useEffect, useState } from "react"
import JSConfetti from "js-confetti"

import './App.css'
import { usePageStyles } from "./hooks/usePageStyles"
import { TrelloCard } from "./components/TrelloCard"
import { useGlobalCardsState } from "./hooks/useGlobalCardsState"
import io from "socket.io-client"
import Toastify from 'toastify-js'
import MicroModal from 'micromodal';


const socket = io('http://localhost:3000/');

function App() {

  MicroModal.init()
  //MicroModal.show('prueba-dialog')

  const confetti = new JSConfetti()
  const { setRole, roleSelected, cardsToEstimate, setCardsToEstimate, selectedCardToEstimate, setOriginList, originList, setDestinationList, destinationList, setSelectedCardToEstimate } = useGlobalCardsState();

  const [sprintNumber, setSprintNumber] = useState("")

  const [voted, setVoted] = useState([])
  const [selectedCardNumber, setselectedCardNumber] = useState(0)

  const [players, setPlayers] = useState([])
  const [estimation, setEstimation] = useState("")
  const [sprintPoints, setSprintPoints] = useState(0)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (originList) {
      getTrelloBoard(originList).then(data => {
        setCardsToEstimate(data)
        setSelectedCardToEstimate([])
        socket.emit("originListSelected", data)
      })
    }

  }, [originList])

  function concatName(a, b) {
    if (b < 10) return `${a}0${b}`
    if (b >= 10) return a + b
  }
  useEffect(() => {
    socket.on("cardSelected", selectedCard => {
      setSelectedCardToEstimate(selectedCard)
    })
    socket.on("originListSelected", data => {
      setCardsToEstimate(data)
      setSelectedCardToEstimate([])
    })
    socket.on("roleBroadcast", role => {
      setRole(role)
      socket.emit("playerConnected", "claudio")
    })
    socket.on("vote", card => {
      setVoted(prevState => [...prevState, card])
    })

  }, [])

  useEffect(() => {
    socket.on("playerConnected", player => {
      if (roleSelected === "Scrum master") {
        console.log(player)
        setPlayers(prevState => [...prevState, player])
      }
    })
  }, [roleSelected])

  console.log("PLAYERS", players)

  const classes = usePageStyles()

  console.log("card from server", selectedCardToEstimate)
  const handleClickModal = (url) => {
    setOpenModal(true)
  }
  const lists = [
    {
      "id": "64bec9793433ce689c872091",
      "name": "Lista de tareas",
      "closed": false,
      "idBoard": "64bec9793433ce689c87208a",
      "pos": 16384,
      "subscribed": false,
      "softLimit": null,
      "status": null
    },
    {
      "id": "64bec9793433ce689c872092",
      "name": "En proceso",
      "closed": false,
      "idBoard": "64bec9793433ce689c87208a",
      "pos": 32768,
      "subscribed": false,
      "softLimit": null,
      "status": null
    },
    {
      "id": "64bec9793433ce689c872093",
      "name": "Hecho",
      "closed": false,
      "idBoard": "64bec9793433ce689c87208a",
      "pos": 49152,
      "subscribed": false,
      "softLimit": null,
      "status": null
    }
  ]
  const roles = ["Scrum master", "Player"]
  const pokerCards = ['?', 1, 2, 3, 5, 8, 13, 20]
  const handleRoleChange = (e) => {
    const role = e.target.selectedOptions[0].id
    setRole(role)
    if (role === "Scrum master") {
      socket.emit("roleBroadcast", "Player")
    }
  }

  console.log("Role", roleSelected)
  return (
    <>
      <dialog open={openModal} id="prueba-dialog">
        <p>Greetings, one and all!</p>
        <form method="dialog">
          <button>OK</button>
        </form>
      </dialog>
      <h1 className={classes.h1Title}>Planning Poker</h1>
      <div>
        <form action="">
          <select placeholder="Seleccione un rol" name="listaRoles" id="listaRoles" onChange={handleRoleChange}>
            <option style={{ display: 'none' }} value="" default selected>{roleSelected ? roleSelected : "Seleccione un rol"}</option>
            {roles.map(role => {
              return (
                <option key={role} id={role} value={role}>{role}</option>
              )
            })}
          </select>
          {
            roleSelected === "Scrum master" &&
            <>
              <select placeholder="Seleccione una Lista para estimar" name="listaOrigen" id="listaOrigen" onChange={(e) => setOriginList(e.target.selectedOptions[0].id)}>
                <option style={{ display: 'none' }} value="" default selected>Seleccione una Lista para estimar</option>
                {lists.map(listItem => {
                  return (
                    <option key={listItem.id} id={listItem.id} value={listItem.name}>{listItem.name}</option>
                  )
                })}
              </select>
              <select placeholder="Seleccione una Lista de destino" name="listaDestino" id="listaDestino" onChange={(e) => setDestinationList(e.target.selectedOptions[0].id)}>
                <option style={{ display: 'none' }} value="" default selected>Seleccione una Lista de destino</option>
                {lists.map(listItem => {
                  return (
                    <option key={listItem.id} id={listItem.id} value={listItem.name}>{listItem.name}</option>
                  )
                })}
              </select>
              <input type="number" id="sprintNumber" placeholder="Numero del sprint" onChange={(e) => setSprintNumber(e.target.value)} />
              <input type="number" id="sprintPoints" placeholder="Puntos del sprint" onChange={(e) => setSprintPoints(e.target.value)} />
            </>
          }
        </form>
      </div>
      <main className={classes.mainContainer}>
        <aside className={classes.aside}>
          <TrelloCard boards={cardsToEstimate} />
        </aside>
        <article className={classes.article}>
          <div className={classes.estimationsContainer}>
            <div className={classes.cardDetails}>
              <h2 className={classes.h2}>{selectedCardToEstimate?.name}</h2>
              {
                cardsToEstimate.length > 0 &&
                <>
                  <button className={classes.button} key={selectedCardToEstimate?.id} href='#' onClick={() => handleClickModal(selectedCardToEstimate?.url)}>Abrir la tarjeta</button>
                  <p className={classes.descriptionCard}>{selectedCardToEstimate?.desc}</p>
                </>
              }
            </div>
            <div>
              <h3 style={{ marginBottom: 0 }}>Estimaciones</h3>
              {
                roleSelected === "Scrum master" &&
                <div style={{ display: 'flex' }}>
                  <span style={{ margin: 0 }}>Participantes: {players.length}</span>
                  <span style={{ margin: 0 }}>Puntos restantes del sprint: {sprintPoints}</span>
                </div>
              }
              <div className={classes.pokerCardsContainer}>
                {
                  roleSelected === "Scrum master" ?
                    <>
                      {
                        voted.map(card => {
                          return (
                            <p
                              id="poker-card"
                              key={card}
                              className={classes.pokerCard}
                              onClick={() => socket.emit("vote", card)}
                            >
                              {card}
                            </p>)
                        })
                      }
                    </>
                    :
                    pokerCards.map(card => {
                      return (
                        <p
                          id="poker-card"
                          key={card}
                          className={classes.pokerCard}
                          onClick={() => socket.emit("vote", card)}
                        >
                          {card}
                        </p>)
                    })
                }
              </div>
              {
                roleSelected === "Scrum master" &&
                <footer>
                  <form action="submit" onSubmit={e => e.preventDefault()}>
                    <input type="number" name="" id="estimateInput" onChange={e => setEstimation(e.target.value)} />
                    <button onClick={() => {
                      if (selectedCardToEstimate.id && destinationList && sprintNumber && estimation !== "") {
                        const newCardNumber = selectedCardNumber + 1
                        const concatedNumbers = concatName(sprintNumber, newCardNumber)
                        const name = `${concatedNumbers} - ${selectedCardToEstimate.name.replace("[]", `[${estimation}]`)}`
                        console.log(name)
                        setselectedCardNumber(newCardNumber)

                        moveCardEstimated({ cardId: selectedCardToEstimate.id, idList: destinationList, name })
                          .then((response) => {
                            console.log("respuesta del move card", response)
                            getTrelloBoard(originList)
                              .then(data => {
                                setCardsToEstimate(data)
                                setSprintPoints(prevState => prevState - estimation)
                                socket.emit("originListSelected", data)
                                confetti.addConfetti()

                                Toastify({
                                  text: `Se movió la tarjeta ${name} al tablero seleccionado`,
                                  duration: 4000,
                                  newWindow: true,
                                  close: true,
                                  gravity: "top", // `top` or `bottom`
                                  position: "right", // `left`, `center` or `right`
                                  stopOnFocus: true, // Prevents dismissing of toast on hover
                                  style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '40px',
                                    //background: "linear-gradient(to right, #00b09b, #96c93d)",
                                  },
                                  onClick: function () { } // Callback after click
                                }).showToast();
                              })
                              .finally(() => setSelectedCardToEstimate([]))
                          })
                      }
                    }}>Agregar estimación</button>
                  </form>
                </footer>
              }
            </div>
          </div>
        </article>
      </main>
    </>
  )
}

export default App
