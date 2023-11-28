import { Link } from "react-router-dom"
import { Container } from "semantic-ui-react"

const HomePage = () => {
  return (
    <Container style={{ marginTop: '7em' }}>
      <div>HomePage</div>
      <h3>Go to <Link to='/activities'>Go to Activities</Link></h3>
    </Container>
  )
}

export default HomePage