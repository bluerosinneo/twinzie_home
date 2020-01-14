import React, { Component } from 'react';
import KwitterService from '../../kwitterService';
import Message from '../message/Message';


// render stuff
// import JeopardyService from "../../jeopardyService";
// import JeapDisplay from "../jeapDisplay/JeapDisplay";

class Kwitter extends Component {

    constructor(props) {
        super(props);

        this.client = new KwitterService();

        this.state = {
            messages: 1,

            loggedIn: false,
            loginError: "",
            formLogin: {
                username: "",
                password: "",
            },

            messageError: "",
            formMessage: {
                text: "",
            }

        }
    }

    getMessages() {
        return this.client.getMessages().then(result => {
            console.log(result.data.messages);
            this.setState({
                messages: result.data.messages,
            })
        })
    }

    componentDidMount() {
        this.getMessages();
    }

    handleChangeLogin = (event) => {
        let formLogin = this.state.formLogin;
        formLogin[event.target.name] = event.target.value;
        this.setState({ formLogin });
    }

    handleChangeMessage = (event) => {
        let formMessage = this.state.formMessage;
        formMessage[event.target.name] = event.target.value;
        this.setState({ formMessage });
    }

    submitLogin = (event) => {
        event.preventDefault();
        console.log(this.state.formLogin.username);
        console.log(this.state.formLogin.password);
        this.client.postLogin(this.state.formLogin.username, this.state.formLogin.password)
            .then(
                (response) => {
                    console.log("Login Success");

                    this.client.updatetoken(response.data.token)

                    this.setState({
                        loggedIn: true,
                        loginError: "",
                        formLogin: {
                            username: "",
                            password: "",
                        },
                    })
                },
                (error) => {
                    console.log(error)

                    this.setState({
                        loggedIn: false,
                        loginError: "Login Error, Plase try again",
                    })
                }


            )

        // .then(result => {
        //     console.log("submitLogin Results");
        //     console.log(result);
        // })
        // .catch( err => { console.log(err); })
    }

    submitMessage = (event) => {
        event.preventDefault();

        console.log(this.state.formMessage.text);

        this.client.postMessage(this.state.formMessage.text)
            .then((response) => {
                console.log(response)

                this.getMessages();

                this.setState({
                    messageError: "",
                    formMessage: {
                        text: "",
                    }
                });
            }).catch((error) => {
                console.log(error)
            });

    }

    render() {
        if (this.state.loggedIn === false) {
            return (
                <div>

                    <form onSubmit={this.submitLogin}>

                        <div>
                            <label>Username:</label>
                            <input
                                onChange={this.handleChangeLogin}
                                type="text"
                                name="username"
                                value={this.state.formLogin.username}
                            />
                        </div>

                        <div>
                            <label>Password:</label>
                            <input
                                onChange={this.handleChangeLogin}
                                type="text"
                                name="password"
                                value={this.state.formLogin.password}
                            />
                        </div>



                        <button>Login</button>
                        <div>
                            {this.state.loginError}
                        </div>
                    </form>

                </div>
            );
        }

        if (this.state.messages !== 1) {
            let messageList = [];
            for (let i = 0; i < this.state.messages.length; i++) {
                messageList.push(
                    <Message
                        key={this.state.messages[i].id}
                        text={this.state.messages[i].text}
                        username={this.state.messages[i].username}
                        createdAt={this.state.messages[i].createdAt}
                    />
                );
            }
            return (

                <div>
                    <div>
                        <form onSubmit={this.submitMessage}>

                            <div>
                                <label>Message:</label>
                                <input
                                    onChange={this.handleChangeMessage}
                                    type="text"
                                    name="text"
                                    value={this.state.formMessage.text}
                                />
                            </div>
                            <button>Login</button>
                            <div>
                                {this.state.messageError}
                            </div>
                        </form>
                    </div>
                    <div>
                        {messageList}
                    </div>
                </div>
            );
        }


        return (
            <div>LOADING</div>
        )

    }
}

export default Kwitter;