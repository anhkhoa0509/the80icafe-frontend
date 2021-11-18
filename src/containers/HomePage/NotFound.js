import React, {Component} from "react";
import "./NotFound.scss"
import  {Link} from "react-router-dom"
import {path} from "../../utils"

class NotFound extends Component {

    render() {
        return (
            <>
            <section className="page_404">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 ">
                            <div className="col-sm-10 col-sm-offset-1  text-center">
                                <div className="four_zero_four_bg">
                                    <h1 className="text-center ">404</h1>


                                </div>

                                <div className="contant_box_404">
                                    <h3 className="h2">
                                        Bạn đã tìm được tiền trong ví của thằng viết cái web này
                                    </h3>

                                    <p>(vì nó không hề tồn tại)!</p>

                                    <Link to = {path.HOMEPAGE} className="link_404">Quay lại</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </>
        );
    }
}

export default NotFound;
