import React, { Component } from "react";
import axios from "axios";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  render() {
    const { posts } = this.state;
    console.log("*** post return", posts);
    return (
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
    );
  }
}

export default PostList;
