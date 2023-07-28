/* eslint-disable react/prop-types */
import { useGlobalCardsState } from "../hooks/useGlobalCardsState"
import io from "socket.io-client"

const socket = io('http://localhost:3000/');
export const SprintForm = () => {

    const { roleSelected, setOriginList, setDestinationList, setRole } = useGlobalCardsState()

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

    const handleRoleChange = (e) => {
        const role = e.target.selectedOptions[0].id
        setRole(role)
        if (role === "Scrum master") {
            socket.emit("roleBroadcast", "Player")
        }
    }
    return (
        <form action="" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr'
        }}>
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
                    <input
                        type="number"
                        id="sprintNumber"
                        placeholder="Numero del sprint"
                        onChange={(e) => setSprintNumber(e.target.value)}
                    />
                    <input
                        type="number"
                        id="sprintPoints"
                        placeholder="Puntos del sprint"
                        onChange={(e) => setSprintPoints(e.target.value)}
                    />
                </>
            }
        </form>
    )
}