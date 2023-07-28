/* eslint-disable react/prop-types */
import { useReducer } from "react"
import Context from "./context"
import reducer from "./reducer"

const State = ({ children }) => {
    const initialState = {
        originList: "",
        destinationList: "",
        cardsToEstimate: [],
        selectedCardToEstimate: {},
        roleSelected: ""
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    const setCardsToEstimate = (cards) => {
        dispatch({
            type: 'CARDS_TO_ESTIMATE',
            payload: cards
        })
    }
    const setSelectedCardToEstimate = (card) => {
        dispatch({
            type: 'SELECTED_CARD_TO_ESTIMATE',
            payload: card
        })
    }

    const setOriginList = (listId) => {
        dispatch({
            type: 'ORIGIN_LIST',
            payload: listId
        })
    }
    const setDestinationList = (listId) => {
        dispatch({
            type: 'DESTINATION_LIST',
            payload: listId
        })
    }
    const setRole = (role) =>{
        dispatch({
            type: 'ROLE_SELECTED',
            payload: role
        })
    }

    return (
        <Context.Provider value={{
            cardsToEstimate: state.cardsToEstimate,
            selectedCardToEstimate: state.selectedCardToEstimate,
            originList:state.originList,
            destinationList:state.destinationList,
            roleSelected: state.roleSelected,
            setRole,
            setOriginList,
            setDestinationList,
            setSelectedCardToEstimate,
            setCardsToEstimate
        }}>
            {children}
        </Context.Provider>
    )
}

export default State;