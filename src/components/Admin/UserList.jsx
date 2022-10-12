import { Table, Form, Container } from "react-bootstrap";

const UserList = ({ users }) => {
  return (
    <Container className="p-5">
      <Table striped bordered hover variant="dark" className="">
        <thead>
          <tr>
            <th>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Select all"
                  //   checked={isCheckAll}
                  //   onChange={handleSelectAll}
                />
              </Form.Group>
            </th>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users
            .sort((a, b) => a.username.localeCompare(b.username))
            .map((user) => (
              <tr key={user._id} onClick={() => alert("hi")}>
                <td>
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      value={user._id}
                      // checked={isCheckAll ? isCheckAll : user.isChecked}
                      // onChange={(e) => handlecheckbox(e)}
                    />
                  </Form.Group>
                </td>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};
export default UserList;
