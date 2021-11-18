import React, {Component} from "react";
import HomeHeader from "./HomeHeader";
import Footer from "./Footer";
import HomeBanner from "./HomePageItem/HomeBanner";
import FullProduct from "./HomePageItem/FullProduct";
import "./HomePage.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {Route} from "react-router-dom";
import {path} from "../../utils";
import Cart from "./Cart/Cart";
import News from "./HomePageItem/News";
import AddressStore from "./HomePageItem/AddressStore";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className="homePage">
                <HomeBanner />
                <FullProduct />
                <News />
                <AddressStore />
            </div>

        );
    }
}

export default HomePage;
