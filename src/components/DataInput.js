// Data input form
import React, {Component} from 'react';
import {Grid, Row, Col, Button, Form} from 'react-bootstrap';

class DataInput extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.onSubmit.bind(this);
        this.handleFileUpload = this.onFileUpload.bind(this);
        this.handleClick = this.onClick.bind(this);
        this.handleInputChange = this.onInputChange.bind(this);
        this.updateMetadata = this.onUpdateMetadata.bind(this);
        this.doCanMint = this.canMint.bind(this);
        this.doImageSet = this.imageSet.bind(this);
        this.doReset = this.reset.bind(this);
    }

    onSubmit(e) {
        this.props.handleSubmit(e);
    }

    onFileUpload(e) {
        this.props.handleFileUpload(e);
    }

    onClick() {
        this.props.handleClick();
    }

    onInputChange(e) {
        this.props.handleInputChange(e);
    }

    onUpdateMetadata(e) {
        this.props.updateMetadata(e);
    }

    canMint() {
        return this.props.doCanMint();
    }

    imageSet() {
        return this.props.doImageSet();
    }

    reset() {
        this.props.doReset();
    }

    render() {

        let buttonLabel = ' Process Image ';

        if (this.doCanMint()) {
            buttonLabel = ' Mint Token ';
        } else if (this.doImageSet()) {
            buttonLabel = ' Process Metadata ';
        }

        return (
            <Grid className="App-input">
                <Form onSubmit={ (e) => this.onSubmit(e) }>
                    <Row>
                        <Col xs={8} className="header">Inputs</Col>
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
                        <Col xs={3}>Choose file to send to IPFS</Col>
                        <Col xs={5}>
                            <input
                                type="file"
                                style={{width: "350px"}}
                                onChange={this.handleFileUpload}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8} className="header">Item Metadata</Col>
                    </Row>
                    <Row>
                        <Col xs={8} className="sub-header">Elements</Col>
                    </Row>
                    <Row>
                        <Col xs={3}>Name</Col>
                        <Col xs={5}>
                            <input
                                type="text"
                                name="name"
                                style={{width: "350px"}}
                                defaultValue={this.props.metadataObject.name}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>Description</Col>
                        <Col xs={5}>
                            <input
                                type="text"
                                name="description"
                                style={{width: "350px"}}
                                defaultValue={this.props.metadataObject.description}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>Image URL</Col>
                        <Col xs={5}>
                            <input
                                type="text"
                                name="image"
                                style={{width: "350px"}}
                                defaultValue={this.props.metadataObject.image}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>External URL</Col>
                        <Col xs={5}>
                            <input
                                type="text"
                                name="external_url"
                                style={{width: "350px"}}
                                defaultValue={this.props.metadataObject.external_url}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8} className="sub-header">Attributes</Col>
                    </Row>
                    {this.props.metadataObject.attributes.map(attribute => (
                        <Row key={'attribute_' + attribute.trait_type}>
                            <Col xs={3}>{attribute.trait_type}</Col>
                            <Col xs={5}>
                                <input
                                    type="text"
                                    key={'attribute_' + attribute.trait_type}
                                    name={'attribute_' + attribute.trait_type}
                                    style={{width: "350px"}}
                                    defaultValue={attribute.value}
                                    onChange={this.handleInputChange}
                                />
                            </Col>
                        </Row>
                    ))}
                    <Row>
                        <Col xs={8}>
                            <Button onClick={this.doReset}> Clear </Button>
                            <Button type={'submit'} onClick={this.handleClick}>{buttonLabel}</Button>
                        </Col>
                    </Row>
                </Form>
            </Grid>
        );
    }
}

export default DataInput;