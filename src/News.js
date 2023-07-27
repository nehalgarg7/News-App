import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {

    constructor() {
        super();
        console.log("Hello i am constructor from News Component");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }


    async componentDidMount() {
        console.log("cdm");
        let url = "https://newsapi.org/v2/everything?q=bitcoin&apiKey=b97491f757414ae790f094839f54b747&page=1&pagesize=20";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })

    }

    handlePrevClick = async () => {
        console.log("Previous");

        let url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=b97491f757414ae790f094839f54b747&page=${(this.state.page + 1)}&pagesize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();


        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }

    handleNextClick = async () => {
        console.log("Next");

        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

        }
        else {
            let url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=b97491f757414ae790f094839f54b747&page=${(this.state.page + 1)}&pagesize=20`;
            let data = await fetch(url);
            let parsedData = await data.json();


            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
        }
    }



    render() {
        return (
            <div>
                <div className='container my-3'>
                    <h2>Top HeadLines</h2>

                    <div className="row">
                        {this.state.articles.map((element) => { return (<div className="col-md-4" key={element.url}><NewsItem title={element ? element.title.slice(0, 45) : ""} description={element ? element.description.slice(0, 88) : ""} url={element.urlToImage} newsUrl={element.url} /></div>); })}

                    </div>
                </div>

                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" class="btn btn-outline-dark btn-dark text-light" onClick={this.handlePrevClick}> &larr; Prev</button>
                    <button disabled= {this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} type="button" class="btn btn-outline-dark btn-dark text-light" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
