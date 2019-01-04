import React, {Component} from 'react';
import {Button, Col, Grid, Row} from "react-bootstrap";

class Config extends Component {

    constructor(props) {
        super(props);

        this.state = {minterCount: this.props.mintersAdded.length};

        this.handleInputChange = this.onInputChange.bind(this);
        this.handleButtonClick = this.onButtonClick.bind(this);
    }

    onInputChange(e) {
        this.props.handleChange(e);
    }

    onButtonClick() {
        let count = this.state.minterCount;
        const input = this.refs.newMinterAddress;

        if (input && input.value && input.value.length > 0) {
            this.setState({minterCount: ++count});
            this.props.handleAddMinter(input.value);
        } else {
            console.log('Minter address is required');
        }
        this.forceUpdate();
    }

    render() {

        return (
            <div className="App">
                <Grid className="App-input">
                    <Row>
                        <Col xs={8} className="header">App Settings</Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <a target={'_blank'} href={'https://ipfs.github.io/public-gateway-checker/'}>Update IPFS
                                Gateway</a>
                        </Col>
                        <Col xs={5}>
                            <input
                                type="text"
                                name="ipfsGateway"
                                style={{width: "350px"}}
                                defaultValue={this.props.ipfsGateway}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>Token Address</Col>
                        <Col xs={5}>
                            <input
                                type="text"
                                name="tokenAddress"
                                style={{width: "350px"}}
                                defaultValue={this.props.tokenAddress}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8} className="header">Add Minter (not working just yet)</Col>
                    </Row>
                    <Row>
                        <Col xs={3}>New Minter Address</Col>
                        <Col xs={3}>
                            <input
                                type="text"
                                ref="newMinterAddress"
                                style={{width: "200px"}}
                            />
                        </Col>
                        <Col xs={2}>
                            <Button type={'submit'} onClick={this.handleButtonClick}> Add </Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Config;