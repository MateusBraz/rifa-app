import React from "react";
import Content from "../../components/Content";
import Description from "../../components/Description";
import Header from "../../components/Layout/Header";
import Numbers from '../../components/Numbers';

const Home: React.FC = function () {

    return (
        <Content>
            <Header />
            <Description/>
            <Numbers />
        </Content>
    );
}

export default Home;