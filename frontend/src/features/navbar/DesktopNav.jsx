import React from "react";
import { Flex, Link, Icon, Text } from "@chakra-ui/react";
import { menuList, navButtonProps } from "../../utils";
import { NavLink } from "react-router-dom";
import NewPost from "../posts/NewPost";

function DesktopNav() {
  return (
    <>
      <Flex
        position={"fixed"}
        overflowY={"auto"}
        flex={1}
        direction={"column"}
        width={{ md: "275px", sm: "200px", lg: "320px" }}
        height={"100%"}
      >
        <Flex
          as={"nav"}
          direction={"column"}
          mt={6}
          ps={{ md: "3rem", sm: "1rem" }}
          width={"100%"}
        >
          {menuList.map(({ name, path, icon }) => (
            <Link
              as={NavLink}
              key={name}
              to={path}
              end
              {...navButtonProps}
              activeStyle={{
                color: "#fd751b",
                textDecoration: "none",
              }}
            >
              <Flex p={"1.2rem"} align={"center"} width={"100%"}>
                <Icon as={icon} fontSize={"1.5rem"}></Icon>
                <Text px={4} fontSize={"1.1rem"}>
                  {name}
                </Text>
              </Flex>
            </Link>
          ))}
          <Flex py={"1.2rem"} pe={{ md: "2.5rem", sm: "1rem" }}>
            <NewPost />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default DesktopNav;
