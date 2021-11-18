import React, {Component} from "react";
import {connect} from "react-redux";

class LikeAndShare extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.initFacebookSDK()
    }

    initFacebookSDK = () => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
        let locale = 'vi_VN'
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: 312981703926847,
                cookie: true,  // enable cookies to allow the server to access
                // the session
                xfbml: true,  // parse social plugins on this page
                version: 'v2.5' // use version 2.1
            });
        };
        // Load the SDK asynchronously
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = `//connect.facebook.net/${locale}/sdk.js`;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    render() {
        console.log('link',this.props.link)
        return (
            <>
                <div className="fb-comments"
                     data-href="https://developers.facebook.com/docs/plugins/comments#configurator"
                     data-width="100%"
                     data-numposts="10"
                >
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeAndShare);


