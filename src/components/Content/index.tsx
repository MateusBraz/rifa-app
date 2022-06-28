import React from "react";
import { Container } from "./styles";

const Content: React.FC<any> = function ({ children }) {
    return <Container>{children}</Container>;
};

export default Content;