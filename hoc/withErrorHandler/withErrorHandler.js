
import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
            message:""
        }
        componentWillMount() {
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                console.log(error.message)
                this.setState({error})
                if(error.message==='Request failed with status code 429'){
                this.setState({message:" To many request " });
                }
                else{
                    this.setState({message:error.message})
                }
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modelClosed={this.errorConfirmedHandler}
                    >{this.state.error ? this.state.message : null}</Modal>
                    <WrappedComponent {...this.props}></WrappedComponent>
                </Aux>
            )
        }   
    }
}

export default withErrorHandler;
