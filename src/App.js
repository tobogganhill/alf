import React, {Component} from 'react';
import {Tabs, TabLink, TabContent} from 'react-tabs-redux';
import {Button, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import {Home, Config, Image, Mint, Wallet} from './Components';
import web3 from './util/web3';
import './assets/App.css';
import logo from './assets/logo.png'
import metadata from './assets/metadata-template.json';
import tokenContract from './assets/contract';
import ipfs from './util/ipfs';
import Grid from 'react-bootstrap/es/Grid';

class App extends Component {

    static exists(s) {
        return s && s.trim().length > 0;
    }

    static clear() {
        window.location.reload();
    }

    constructor(props) {
        super(props);

        this.state = {
            web3NetId: '',
            selectedTab: 'Home',
            tabs: [
                {linkTo: 'Home', label: 'Home', component: Home},
                {linkTo: 'Config', label: 'Configure', component: Config},
                {linkTo: 'Image', label: 'Set Image', component: Image},
                {linkTo: 'Mint', label: 'Mint Token', component: Mint},
                {linkTo: 'Wallet', label: 'My Token', component: Wallet}
            ],
            tokenAddress: '',
            tokenAbi: JSON.stringify(tokenContract.abi),
            ipfsGateway: 'https://ipfs.infura.io/ipfs/',
            imageBuffer: '',
            ipfsImageHash: '',
            ipfsImageUrl: '',
            metadataBuffer: metadata,
            ipfsMetadataHash: '',
            ipfsMetadataUrl: '',
            recipientAddress: '',
            blockNumber: '',
            transactionHash: '',
            gasUsed: '',
            mintersAdded: []
        };
    }

    checkNetwork = async () => {
        await web3.eth.net.getId((err, netId) => {
            console.log(err, netId);
            if (netId && this.state.web3NetId !== netId) {
                if (tokenContract.networks[netId]) {
                    let newAddress = tokenContract.networks[netId].address;
                    console.log('Using contract at address \'' + newAddress
                        + '\' on network ' + netId);
                    this.setState({
                        web3NetId: netId,
                        tokenAddress: newAddress
                    })
                } else {
                    console.log('No contract deployed on network ' + netId);
                    this.setState({
                        web3NetId: netId,
                        tokenAddress: 'UNDEFINED'
                    })
                }
            }
        });
    };

    checkProgress() {
        if (!App.exists(this.state.imageBuffer.toString()) && !App.exists(this.state.ipfsImageUrl)) {
            return {index: 0, msg: 'Choose Image'};
        } else if (!App.exists(this.state.ipfsImageUrl)) {
            return {index: 1, msg: 'Save Image'};
        } else if (!App.exists(this.state.ipfsMetadataUrl)) {
            return {index: 2, msg: 'Save Metadata'};
        } else if (!App.exists(this.state.transactionHash)) {
            return {index: 3, msg: 'Mint Token'};
        } else {
            return {index: 4, msg: 'Roll Again'};
        }
    }

    componentDidMount() {
        this.checkNetwork();
    }

    captureFile = (e) => {
        let target = e.target.name;
        e.stopPropagation();
        e.preventDefault();
        const file = e.target.files[0];
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => this.convertToBuffer(reader, target)
    };

    convertToBuffer = async (reader, targetName) => {
        // file is converted to a imageBuffer to prepare for uploading to IPFS
        const myBuffer = await Buffer.from(reader.result);
        // set this imageBuffer -using es6 syntax
        this.setState({[targetName]: myBuffer});
    };

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        console.log(name + ' = ' + value);

        let myMetadata = JSON.parse(JSON.stringify(this.state.metadataBuffer));
        let ipfsImgUrl, ipfsMetaUrl, ipfsImgHash, ipfsMetaHash = '';

        if (name === 'ipfsImageHash') {

            if (App.exists(value)) {
                ipfsImgUrl = this.state.ipfsGateway + value;
                ipfsImgHash = value;
                myMetadata.image = ipfsImgUrl;
            }

            this.setState({
                ipfsImageUrl: ipfsImgUrl,
                ipfsImageHash: ipfsImgHash,
                metadataBuffer: myMetadata,
                selectedTab: 'Mint'
            });
        } else if (name === 'ipfsMetadataHash') {

            if (App.exists(value)) {
                ipfsMetaUrl = this.state.ipfsGateway + value;
                ipfsMetaHash = value;

                axios.get(ipfsMetaUrl)
                    .then(res => {
                        console.log('response: ' + JSON.stringify(res.data));

                        this.setState({
                            ipfsImageUrl: res.data.image,
                            ipfsImageHash: res.data.image.substr(res.data.image.lastIndexOf('/') + 1),
                            ipfsMetadataUrl: ipfsMetaUrl,
                            ipfsMetadataHash: ipfsMetaHash,
                            metadataBuffer: res.data,
                            selectedTab: 'Wallet'
                        });
                    });
            }
        } else {
            this.setState({
                [name]: value
            });
        }
        return true;
    }

    handleMetadataChange(e) {
        console.log('metadata: ' + e.target.value);

        let myMeta = JSON.parse(e.target.value);
        let myState = {
            ipfsImageUrl: myMeta.image,
            ipfsImageHash: myMeta.image.substr(myMeta.image.lastIndexOf('/') + 1),
            metadataBuffer: myMeta
        };

        this.setState(myState);
    }

    handleAbiChange(e) {
        this.setState({
            tokenAbi: JSON.parse(e.target.value)
        });
    }

    handleClick = async (e) => {
        e.preventDefault();

        let status = this.checkProgress();
        console.log('status = ' + status.index);
        switch (status.index) {
            case 0:
                this.setState({
                    selectedTab: 'Image'
                });
                break;
            case 1:
                this.addIpfs(true);
                break;
            case 2:
                this.addIpfs(false);
                break;
            case 3:
                this.mintToken();
                this.setState({
                    selectedTab: 'Wallet'
                });
                break;
            default:
                App.clear();
        }
    };

    addIpfs = async (isImage) => {
        // save document to IPFS,return its hash#, and set hash# to state
        // https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add
        // setState by setting ipfsImageHash to ipfsImageHash[0].hash
        if (Boolean(isImage)) {
            console.log('Adding image of size ' + this.state.imageBuffer.length);
            await ipfs.add(this.state.imageBuffer, (err, ipfsHash) => {
                console.log(err, ipfsHash);

                let myMetadata = JSON.parse(JSON.stringify(this.state.metadataBuffer));
                myMetadata.image = this.state.ipfsGateway + ipfsHash[0].hash;

                this.setState({
                    ipfsImageHash: ipfsHash[0].hash,
                    ipfsImageUrl: myMetadata.image,
                    metadataBuffer: myMetadata,
                    selectedTab: 'Mint'
                });
            })
        } else {
            console.log('Adding metadata:' + JSON.stringify(this.state.metadataBuffer));
            await ipfs.add(Buffer.from(JSON.stringify(this.state.metadataBuffer)), (err, ipfsHash) => {
                console.log(err, ipfsHash);

                this.setState({
                    ipfsMetadataHash: ipfsHash[0].hash,
                    ipfsMetadataUrl: this.state.ipfsGateway + ipfsHash[0].hash,
                    selectedTab: 'Mint'
                });
            })
        }
    };

    addMinter = async (minterAddress) => {

        let myMinters = this.state.mintersAdded;
        if (!App.exists(minterAddress)) {
            console.log('Minter address is required!');
        }

        // bring in user's metamask account address
        const accounts = await web3.eth.getAccounts();
        const myToken = new web3.eth.Contract(
            JSON.parse(this.state.tokenAbi),
            this.state.tokenAddress
        );

        console.log('Adding minter address ' + minterAddress + ' as minter for token address ' + myToken.options.address);

        // see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send
        await myToken.methods.addMinter(minterAddress).send({
            from: accounts[0]
        }, (error, transactionHash) => {
            console.log('txHash = ' + transactionHash + '; Error = ' + error);
            myMinters.push({address: minterAddress});
        });
    };

    mintToken = async () => {

        if (!App.exists(this.state.tokenAbi) ||
            !App.exists(this.state.tokenAddress) ||
            !App.exists(this.state.recipientAddress) ||
            !App.exists(this.state.ipfsImageUrl) ||
            !App.exists(this.state.ipfsMetadataUrl)) {
            console.log('Required input fields are missing!');
            return false;
        }

        try {
            this.setState({
                blockNumber: 'waiting..',
                gasUsed: 'waiting...'
            });

            // bring in user's metamask account address
            const accounts = await web3.eth.getAccounts();
            const myToken = new web3.eth.Contract(
                JSON.parse(this.state.tokenAbi),
                this.state.tokenAddress
            );

            console.log('Sending from Metamask account: ' + accounts[0] + ' to token address ' + myToken.options.address);

            // see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send
            await myToken.methods.mint(this.state.recipientAddress, this.state.ipfsMetadataUrl).send({
                from: accounts[0]
            }, (error, transactionHash) => {
                console.log(transactionHash);
                this.setState({transactionHash});
            });

            // get Transaction Receipt in console on click
            // See: https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt
            await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt) => {
                if (txReceipt) {
                    this.setState({txReceipt});
                }
            });

            await this.setState({
                blockNumber: this.state.txReceipt.blockNumber,
                gasUsed: this.state.txReceipt.gasUsed
            });
        } catch (e) {
            console.log(e);
        }
    };

    renderTabs() {

        let length = this.state.tabs.length;

        // add links
        let tabs = this.state.tabs.map((tab, index) => {
            return (
                <TabLink to={tab.linkTo} key={index}>{tab.label}</TabLink>
            );
        });

        // now add content
        this.state.tabs.map((tab, index) => {
            return (
                tabs.push(
                    <TabContent for={tab.linkTo} key={length + index}>
                        {
                            React.createElement(tab.component, {
                                ...this.state,
                                handleChange: this.handleInputChange.bind(this),
                                handleMetadataChange: this.handleMetadataChange.bind(this),
                                handleAbiChange: this.handleAbiChange.bind(this),
                                handleFileUpload: this.captureFile.bind(this),
                                handleAddMinter: this.addMinter.bind(this)
                            })
                        }
                    </TabContent>
                )
            )
        });

        return tabs;
    };

    render() {

        return (
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} align='left' className='App-logo' alt='logo'/>
                    <h1> Mint your Artists Liberation Front (ALF) Rare Digital Art Token</h1>
                </header>
                <Grid className='App-input'>
                    <Row>
                        <Col xs={8}>
                            <Tabs selectedTab={this.state.selectedTab} renderActiveTabContentOnly={true}>
                                {this.renderTabs()}
                            </Tabs>
                        </Col>
                        <Col xs={4}>
                            <Button onClick={App.clear.bind(this)}> Clear </Button>
                            <Button type={'submit'}
                                    onClick={this.handleClick.bind(this)}>{this.checkProgress().msg}</Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;