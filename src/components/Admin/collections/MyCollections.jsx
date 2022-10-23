import { useEffect, useState } from "react"
import { Card, Col, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import '../../../App.css'
export const MyCollections =()=> {
    const [myCollections, setMyCollections] = useState([])
    const token = window.localStorage.getItem("token")
    const navigate = useNavigate()
    useEffect(()=> {
        getMyCollections()
    }, [])
    const getMyCollections =async()=> {
        const response = await fetch(`${window.remote_url}/users/me/stories`, {
            headers:{
                "Authorization":"Bearer " + token
            }
        })
        if(response.ok){
            const collection = await response.json()
            console.log(collection);
            setMyCollections(collection)
        }
    }
    return (
        <Row>
        {myCollections.map((collection) => (
          <Col xs={12} md={6} lg={3} key={collection._id} className="p-4">
            <Card className="card border-0 h-100">
              <Card.Img src={collection.image} className="card_img" />
              <Card.Body className="card_body">
                <span class="tag tag-teal">{collection.topic}</span>
                <Card.Title className="title">{collection.name}</Card.Title>
                <Card.Text className="text">{collection.description}</Card.Text>
                <div className="d-flex justify-content-center">
                  <div className="card_btn">
                    <button
                      variant="success"
                      type="submit"
                      className="card_btn"
                      onClick={() =>navigate(`singleCollection/${collection._id}`)}
                    >
                      view
                    </button>
                    <button
                      variant="danger"
                      type="submit"
                      className="card_btn"
                    //   onClick={() => deleteCollection(collection._id)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    )
}