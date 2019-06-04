import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Topics from './topicsList';

class ArticlesList extends Component {
    state = {
        articlesImported: []
    };



    componentDidMount() {

        const url = `https://mynewsapp-matthew.herokuapp.com/api/articles`;
        axios.get(url).then(({ data: { articles } }) => {

            this.setState({ articlesImported: articles });
        });

    }



    render() {
        return (
            <div>
                <Header />
                <Topics topicsList={this.state.articlesImported} path="/topics" />
                <ul>
                    {this.state.articlesImported.map((article) => {
                        return <li key={article.article_id}>{article.title}</li>

                    })}
                </ul>
            </div>
        );
    }
}

export default ArticlesList;