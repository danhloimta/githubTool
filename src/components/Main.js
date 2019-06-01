import React, { Component } from 'react';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            link: null,
            items: [],
            isLoaded: true,
            username: null,
        }
    };
    
    getDataFromApi() {
        if (this.state.link) {
            fetch(this.state.link)
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        isLoaded: true,
                        items: data,
                    })
                });
        }
    }

    handleData = (event) => {
        event.preventDefault();
        this.setState({
            isLoaded: false,
        });
        this.getDataFromApi();
        this.showData();
    };

    getDataInput = (event) => {
        var username =  event.target.value;
        this.setState({
            link: 'https://api.github.com/users/' + username + '/repos',
        })
    };

    showData = () => {
        var { isLoaded, items } = this.state;

        if (!isLoaded) {
            return (
                <div className="text-center">
                    <img src="http://themanchesterorchestra.com/wp-content/themes/aqura/assets/img/loader.gif" />
                </div>
            )
        } else {
            if (items.length == 0) {
                return <div>No Repository</div>
            } else if (items.message) {
                return <div>Username not found</div>
            } else {
                return (
                    <div className="list-group">
                        { items.map(item => (
                            <a href="#" className="list-group-item list-group-item-action">
                                { item.name }
                            </a>
                        ))}
                    </div>
                )
            }
        }
    }

    render() {
        return (
            <div>
                <div className="aaa">
                    <div className="mt-4">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="text-center">Username Github</label>
                            <form onSubmit = { this.handleData }>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" id="username" name="username" placeholder="Enter username github" onChange = { this.getDataInput } required/>
                                    </div>
                                    <div className="col-md-3">
                                        <button className="btn btn-info" onClick = { (event) => this.getUser } type="submit">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                { this.showData() }
            </div>
        )
    }
}

export default Main;

