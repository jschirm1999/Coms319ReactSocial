import React from "react";
import CreateUser from "./CreateUser";

export default class Profile extends React.Component {

    state = {
        loaded: false,
        posts: ""
    }

    change = (variable, value) => {
        this.setState({
            [variable]: value
        });
    };

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        if (!this.state.loaded) {
            // const data = {
            //     username: this.props.user.username,
            //     password: this.props.user.password,
            //     displayName: this.props.user.displayName,
            // }

            fetch('http://localhost:8080/posts/', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.props.user)
            })
                .then((response) => response.json()).catch((error) => {
                console.log(error)
            })
                .then((data) => {
                    this.change("posts", data);
                })
                .catch(() => {
                    this.change("error",true);
                });
            this.setState({
                loaded: true,
            });
        }
    }

    renderPosts() {
        if (this.state.loaded) { //TODO onClick take to the users profile
            if (typeof this.state.posts !== "string") {
                var posts = this.state.posts.map((post, i) => {
                    return (
                        <div className="card my-2" key={i}>
                            <div className="card-header">
                                {post.title}
                            </div>
                            <div className="card-body">
                                <p>{post.content}</p>
                                <a href="/#">{post.author.displayName}</a>
                            </div>
                        </div>
                    );
                });
                return posts;
            }
        }
    }

    renderError() {
        if (this.state.error) {
            return (
                <div id="login error">
                    <span className="error text-danger">Error loading posts! Please retry again later!</span>
                    <br/>
                </div>
            );
        }
    }

    //TODO Followers
    //TODO Following
    //TODO Friends, mutually following eachother
    render() {
        if (this.props.logged) {
            return (
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-header">{this.props.user.displayName}</div>
                                <div className="card-body">
                                    <p>Username: {this.props.user.username}</p>
                                    <p>Password: {this.props.user.password}</p>
                                    {/*<p>Password: {this.props.user.password}</p>*/}
                                    {/*<p>Password: {this.props.user.password}</p>*/}
                                    {/*<p>Password: {this.props.user.password}</p>*/}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            {this.renderError()}
                            {this.renderPosts()}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <CreateUser/>
            );
        }

    }

}