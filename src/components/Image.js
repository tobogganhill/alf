import React, {Component} from 'react';
import {Col, Grid, Row} from "react-bootstrap";

class Image extends Component {

    constructor(props) {
        super(props);

        this.handleInputChange = this.onInputChange.bind(this);
        this.handleFileUpload = this.onFileUpload.bind(this);
    }

    onInputChange(e) {
        this.props.handleChange(e);
    }

    onFileUpload(e) {
        this.props.handleFileUpload(e);
    }

    render() {

        return (
            <div className="App">
                <Grid className="App-input">
                    <Row>
                        <Col xs={8} className="header">Image Settings</Col>
                    </Row>
                    <Row>
                        <Col xs={3}>Use Existing IPFS Hash?</Col>
                        <Col xs={5}>
                            <input
                                type="text"
                                name="ipfsImageHash"
                                style={{width: "350px"}}
                                defaultValue={this.props.ipfsImageHash}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>Choose image to send to IPFS</Col>
                        <Col xs={5}>
                            <input
                                type="file"
                                name="imageBuffer"
                                style={{width: "350px"}}
                                onChange={this.handleFileUpload}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Image;