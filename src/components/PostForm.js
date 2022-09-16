import React, { Component } from "react";
import axios from "axios";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      title: "",
      body: "",
      posts: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        console.log("****** ", res.data);
        this.setState({ posts: res.data });
      })
      .catch((error) => console.log("*** error:", error));
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log("*** state", this.state);
    axios
      .post("https://jsonplaceholder.typicode.com/posts", this.state)
      .then((res) => {
        console.log("**** res", res);
      })
      .catch((error) => console.log("*** error:", error));
  };

  getInsertedPost = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        console.log("****** ", res.data);
        this.setState({ posts: res.data });
      })
      .catch((error) => console.log("*** error:", error));
  };
  render() {
    const { userId, title, body, posts } = this.state;
    console.log("*** ", this.state);
    return (
      <>
        <form onSubmit={this.submitHandler}>
          <div>
            Input fields for new post
            <div>
              <input
                type="text"
                name="userId"
                value={userId}
                onChange={this.changeHandler}
              />
            </div>
            <div>
              <input
                type="text"
                name="title"
                value={title}
                onChange={this.changeHandler}
              />
            </div>
            <div>
              <input
                type="text"
                name="body"
                value={body}
                onChange={this.changeHandler}
              />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
        <div>
          List of posts
          <div>
            {posts.map((post) => (
              <div id={post.id}>
                {post.id}: {post.title}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default PostForm;
