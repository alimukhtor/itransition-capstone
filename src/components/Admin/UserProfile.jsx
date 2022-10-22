import { Button, Modal } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export const UserProfile =({smShow, setSmShow, setIsUserLoggedIn})=> {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const logOutUser =()=> {
        localStorage.clear(token)
        navigate('/login')
        setSmShow(false)
        setIsUserLoggedIn(false)
    }
    return (
        <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-sm">
           Profile
          </Modal.Title>
        </Modal.Header>
        <Button variant="danger" onClick={logOutUser}>Log out</Button>
      </Modal>
    )
}