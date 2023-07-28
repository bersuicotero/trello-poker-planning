import { useContext } from "react";
import Context from "../context/context";

export const useGlobalCardsState = () => {
  const {
    cardsToEstimate,
    selectedCardToEstimate,
    setSelectedCardToEstimate,
    setCardsToEstimate,
    originList,
    destinationList,
    setOriginList,
    setDestinationList,
    roleSelected,
    setRole
  } = useContext(Context);

  return {
    cardsToEstimate,
    selectedCardToEstimate,
    setSelectedCardToEstimate,
    setCardsToEstimate,
    originList,
    destinationList,
    setOriginList,
    setDestinationList,
    roleSelected,
    setRole
  };
};
