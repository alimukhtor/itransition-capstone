import { useState } from "react";
import { Table, Form, Button, Alert } from "react-bootstrap";
import { BiLockOpenAlt } from "react-icons/bi";
import { HiLockClosed } from "react-icons/hi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { AiFillWarning } from "react-icons/ai";
import { GrUserAdmin } from "react-icons/gr";
const UserList = ({ users, setUsers }) => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [onlyAdmin, setOnlyAdmin] = useState(false);
  const [isChecked, setisChecked] = useState([]);
  const token = window.localStorage.getItem("token");

  // selects single row
  const handlecheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setisChecked([...isChecked, value]);
    } else {
      setisChecked(isChecked.filter((e) => e !== value));
    }
  };

  // selects all selected row
  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setisChecked(users.map((user) => user._id));
    if (isCheckAll) {
      setisChecked([]);
    }
  };

  // deletes selected users
  const handleDeleteUser = async () => {
    const response = await fetch(
      `https://itransition-capstone.herokuapp.com/users/deleteUsers`,
      {
        method: "DELETE",
        body: JSON.stringify(isChecked),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      setUsers(users.filter((user) => !data.find((row) => row === user._id)));
    } else if (response.status === 403) {
      setOnlyAdmin(true);
    }
  };

  // blocks/actives selected users status
  const handleChangeUserStatus = async (event) => {
    let userStatus = event.currentTarget.getAttribute("name");
    try {
      const response = await fetch(
        `${window.remote_url}/users/updateUserStatus`,
        {
          method: "PUT",
          body: JSON.stringify({ isChecked, title: userStatus }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        const userIds = await response.json();
        const usersWithupdatedStatus = users
          .map(user => {
            if (userIds.includes(user._id)) {
              user.status = userStatus;
            }
            return {
              ...user
            };
          })
          setUsers(usersWithupdatedStatus)
      }
    } catch (error) {
      console.log(error);
    }
  };

  // changes selected user roles
  const handleChangeUserRole = async (event) => {
    let userRole = event.currentTarget.getAttribute("name");
    try {
      const response = await fetch(
        `${window.remote_url}/users/updateUserRole`,
        {
          method: "PUT",
          body: JSON.stringify({ isChecked, title: userRole }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.ok) {
        const userIds = await response.json();
        const usersWithupdatedRole = users
          .map(user => {
            if (userIds.includes(user._id)) {
              user.role = userRole;
            }
            return {
              ...user
            };
          })
          setUsers(usersWithupdatedRole)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-3 my-1">
      <div className="toolbar-btns">
        <Button
          variant="success"
          style={{ fontSize: "25px" }}
          name="admin"
          onClick={(e) => handleChangeUserRole(e)}
        >
          <GrUserAdmin />
        </Button>
        <Button
          variant="danger"
          name="user"
          onClick={(e) => handleChangeUserRole(e)}
        >
          Remove from admin
        </Button>
        <Button
          variant="danger"
          name="blocked"
          onClick={(e) => handleChangeUserStatus(e)}
        >
          <HiLockClosed style={{ fontSize: "25px" }} />
        </Button>
        <Button
          variant="success"
          name="active"
          onClick={(e) => handleChangeUserStatus(e)}
        >
          <BiLockOpenAlt style={{ fontSize: "25px" }} />
        </Button>
        <Button variant="danger" onClick={() => handleDeleteUser()}>
          <RiDeleteBin2Fill style={{ fontSize: "30px" }} />
        </Button>
      </div>
      {onlyAdmin ? (
        <Alert variant="danger">
          You do not have permission for this action <AiFillWarning />
        </Alert>
      ) : null}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Select all"
                  checked={isCheckAll}
                  onChange={handleSelectAll}
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
              <tr key={user._id}>
                <td>
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      value={user._id}
                      checked={isCheckAll ? isCheckAll : user.isChecked}
                      onChange={(e) => handlecheckbox(e)}
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
    </div>
  );
};
export default UserList;
