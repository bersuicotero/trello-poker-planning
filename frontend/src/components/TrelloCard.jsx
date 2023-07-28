/* eslint-disable react/prop-types */
import { usePageStyles } from "../hooks/usePageStyles"
import { useGlobalCardsState } from '../hooks/useGlobalCardsState'
import io from "socket.io-client"

const socket = io('http://localhost:3000/');

export const TrelloCard = ({ boards }) => {
    const { setSelectedCardToEstimate } = useGlobalCardsState()
    const classes = usePageStyles()
    const handleClick = ({ board }) => {

        setSelectedCardToEstimate(board)
        socket.emit('cardSelected', board)
    }
    return (
        <>
            <h3 className={classes.h3}>Tarjetas</h3>
            <h5 className={classes.h5}>{boards.length} tarjetas</h5>
            <div className={classes.trelloCardsContainer}>
                {boards?.length > 0 && boards.map(board => {
                    return (
                        <div
                            key={board.id}
                            onClick={() => handleClick({ board })}
                            id="trello-card"
                            className={classes.trelloCard}
                        >
                            <div style={{
                                display: 'flex',
                                fontSize: '.7rem',
                                gap: '5px',
                                marginLeft: '8px',
                                marginTop: '4px',
                                alignSelf: 'flex-start'
                            }}>
                                {board.labels.length > 0 && board.labels.map(label => {
                                    return (
                                        <div style={{backgroundColor:label.color, padding: '2px', borderRadius: '4px'}} key={label.id}>{label.name}</div>
                                    )
                                })}
                            </div>
                            <header className={classes.trelloCardHeader}>{board.name}</header>
                            <p className={classes.trelloCardBody}>{board.desc}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}