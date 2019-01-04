import React, {Component} from 'react';
import {Col, Grid, Row} from "react-bootstrap";

class Wallet extends Component {

    render() {
        let imageLink, imageDisplay, metadataLink, txLink = 'Not set';

        if (this.props.ipfsImageUrl) {
            imageLink = <a target={'_blank'} href={this.props.ipfsImageUrl}>{this.props.ipfsImageHash}</a>;
            imageDisplay = <img src={this.props.ipfsImageUrl} alt="IPFS img" width="128" height="128" />;
        }
        if (this.props.ipfsMetadataUrl) {
            metadataLink = <a target={'_blank'} href={this.props.ipfsMetadataUrl}>
                {this.props.ipfsMetadataHash}
            </a>;
        }
        if (this.props.transactionHash) {
            let etherscanBase;
            switch(this.props.web3NetId) {
                case 1:
                    etherscanBase = 'https://etherscan.io/tx/';
                    break;
                case 3:
                    etherscanBase = 'https://ropsten.etherscan.io/tx/';
                    break;
                case 4:
                    etherscanBase = 'https://rinkeby.etherscan.io/tx/';
                    break;
                case 42:
                    etherscanBase = 'https://kovan.etherscan.io/tx/';
                    break;
                default:
                    etherscanBase = 'https://www.google.com/search?q=pebkac+';
                    break;
            }

            txLink = <a target={'_blank'} href={etherscanBase + this.props.transactionHash}>
                {this.props.transactionHash}
            </a>;
        }

        return (
            <div className="App">
                <Grid className="App-output">
                    <Row>
                        <Col xs={10} className="header">My Token Info</Col>
                    </Row>
                    <Row>
                        <Col xs={3}>IPFS Image Hash #</Col>
                        <Col xs={7}>{imageLink}</Col>
                    </Row>
                    <Row>
                        <Col xs={3}>Image File</Col>
                        <Col xs={7}>{imageDisplay}</Col>
                    </Row>
                    <Row>
                        <Col xs={3}>IPFS Metadata Hash #</Col>
                        <Col xs={7}>{metadataLink}</Col>
                    </Row>
                    <Row>
                        <Col xs={3}>Token Recipient Address</Col>
                        <Col xs={7}>{this.props.recipientAddress}&nbsp;</Col>
                    </Row>
                    <Row>
                        <Col xs={3}>Ethereum Token Address</Col>
                        <Col xs={7}>{this.props.tokenAddress}&nbsp;</Col>
                    </Row>
                    <Row>
                        <Col xs={3}>Tx Hash #</Col>
                        <Col xs={7}>{txLink}&nbsp;</Col>
                    </Row>
                    <Row>
                        <Col xs={3}>Block #</Col>
                        <Col xs={7}>{this.props.blockNumber}&nbsp;</Col>
                    </Row>
                    <Row>
                        <Col xs={3}>Gas Used</Col>
                        <Col xs={7}>{this.props.gasUsed}&nbsp;</Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Wallet;