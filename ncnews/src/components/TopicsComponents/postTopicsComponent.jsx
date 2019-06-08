import React, { Component } from 'react';
import { postNewTopic, getTopics } from '../../api';
import Error from '../Error'





class PostTopicsComponent extends Component {

    state = {
        topics: [],
        button: false,
        slug: "hello",
        description: "mate",
        button: false,
        err: null
      };

      componentDidMount() {
        console.log(this.props.importedTopics);
        console.log(this.props.importedTopics);
        console.log(this.props.importedTopics);
        console.log(this.props.importedTopics);
        console.log(this.props.importedTopics);
        
            this.setState({ topics: this.props.importedTopics })
    
        }

      componentDidUpdate(prevProps, prevState) {
        if (prevState.topics.length !== this.state.topics.length) {
          getTopics().then((topics) => {
              console.log(topics, "hello");
            this.setState({ topics  });
          });
        }
      }
      

    render() {
      console.log(this.props, "ahhhhhhhhhhhhhh1");
      const { err } = this.state;
        if (err) {
          console.log(err, "ahhhhhhhhhhhhhhhhhh")
            return <Error err={err} />;
          }
      
        return (
            <div>
                  {this.props.currentUserLogin !== null && (
          <button onClick={() => this.showTopicForm(this.state.button)}>
            Add Topic
          </button>
        )}
        <form className="form-body" onSubmit={this.handleSubmit}>
         <label>
                <div >
                  <input
                    required={true}
                    type="text"
                    name="slug"
                    placeholder="name"
                    onChange={this.updateStateInput}
                  />
                </div>
              </label>
              <br />
              <label>
                <div >
                  <input
                    required={true}
                    type="text"
                    name="description"
                    placeholder="desc"
                    onChange={this.updateStateInput}
                  />
                </div>
              </label>
              <button>Add Topic</button>
              </form>
        </div>
           
  
        )}

        
    
    showTopicForm(bool) {
        let newBool = bool;
        if (bool === true) newBool = false;
        if (bool === false) newBool = true; 
        this.setState({ button: newBool });
      }

      updateStateInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      }


      handleSubmit = (event) => {
        event.preventDefault();
        const { slug, description } = this.state;
        const newTopic = { slug, description };
        postNewTopic(newTopic)
          .then(newTopic => {
            console.log(newTopic);
            this.setState({
                topics: [...this.state.topics, newTopic]
              })
          
          })
          .catch(({ response }) => {
            const errorstatus = response.status;
            const errormessage = response.data.msg;
            const err = { errorstatus, errormessage };
            this.setState({ err });
          });
      };
}

export default PostTopicsComponent;