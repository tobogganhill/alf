import React, {Component} from 'react';
import {Col, Grid, Row} from "react-bootstrap";

class Mint extends Component {

    constructor(props) {
        super(props);

        this.handleInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e) {
        this.props.handleChange(e);
    }

    render() {

        return (
            <div className="App">
                <Grid className="App-input">
                    <Row>
                        <Col xs={8} className="header">Token Settings</Col>
                    </Row>
                    <Row>
                        <Col xs={3}>Set Token Recipient Address</Col>
                        <Col xs={5}>
                            <input
                                type="text"
                                name="recipientAddress"
                                style={{width: "350px"}}
                                defaultValue={this.props.recipientAddress}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>IPFS Metadata Hash</Col>
                        <Col xs={5}>
                            <input
                                type="text"
                                name="ipfsMetadataHash"
                                style={{width: "350px"}}
                                defaultValue={this.props.ipfsMetadataHash}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>Item Metadata</Col>
                        <Col xs={5}>
                            <textarea name={'metadataBuffer'}
                                      onChange={this.props.handleMetadataChange}
                                      key={Math.random()}
                                      defaultValue={JSON.stringify(this.props.metadataBuffer, null, 3)}
                                      style={{width: "350px"}}
                                      cols={50}
                                      rows={15}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Mint;