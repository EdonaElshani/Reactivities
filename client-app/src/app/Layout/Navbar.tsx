import React from "react";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { activityStore } = useStore();
  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item header as={NavLink} to="/">
            <img
              src="/assets/logo.png"
              alt="logo"
              style={{ marginRight: "10px" }}
            />
            Reactivities
          </Menu.Item>
          <Menu.Item name="Activities" as={NavLink} to="/activities" />
          <Menu.Item>
            <Button
              positive
              as={NavLink}
              to="/createActivity"
              content="Create Activity"
             
            />
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};

export default Navbar;
