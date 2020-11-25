import React, { Component } from "react";
import "./Dashboard.css";
import axios from "../../axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { Button, Input } from "reactstrap";
import Spinner from "../../components/UI/Spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { Redirect, Link } from "react-router-dom";

class Dashboard extends Component {
  state = {
    data: [],
    loading: false,
    redirect: false,
    loaderMessage: "Loading .....",
    val: true,
    page: 1,
  };

  componentWillMount() {
    this.setState({ loading: true });
    axios
      .get(
        "articlesearch.json?q=Article&page=1&sort=oldest&api-key=3D2YH1lLbI2y40m1Oe6Nq1GTb6u0shc3"
      )
      .then((resp) => {
        console.log(resp.data.response.docs);
        this.setState({ data: resp.data.response.docs, loading: false });
      })
      .catch((err) => {});
  }
  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in .5 secs
    if (this.state.data.length >= 0) {
      this.setState({ page: this.state.page + 1 });
      setTimeout(this.getDataList(), 100);
    }
    if(this.state.page===100){
       this.setState({val:false})
    }
  };
  getDataList() {
   
    axios
      .get(
        `articlesearch.json?q=Article&page=${this.state.page} & &sort=oldest&api-key=3D2YH1lLbI2y40m1Oe6Nq1GTb6u0shc3`
      )
      .then((resp) => {
        if (resp !== undefined) {
          this.setState((prevState) => ({
            data: [...prevState.data, ...resp.data.response.docs],
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderData() {
    const Article = this.state.data;
    if (Article.length > 0) {
      return Article.map((user) => {
        const { abstract, section_name, web_url, snippet } = user;
        //Destructing //

        return (
          <div
            className="col-sm-4"
            style={{
              paddingLeft: "40px",
              paddingTop: "30px",
              maxHeight: "300px",
            }}
          >
            {" "}
            <div className="card" style={{ minHeight: "250px" }}>
              
              <p style={{ paddingTop: "20px", textAlign: "center" }}>
                {" "}
                Abstract: {abstract}
              </p>
              <p style={{ paddingTop: "10px", textAlign: "center" }}>
                {" "}
                Tagline : {section_name}
              </p>
            </div>
          </div>
        );
      });
    }
  }

  render() {
    let article = (
      <div>
        <div
          style={{
            backgroundColor: "#DCDCDC",
            minHeight: "1000px",
            marginLeft: "-15px",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              paddingTop: "30px",
            }}
          >
            <strong style={{ fontWeight: "bold", fontSize: "30px" }}>
              Article Application
            </strong>
          </h3>

          <div className="row col-sm-12"></div>
          <InfiniteScroll
            dataLength={this.state.data.length}
            next={this.fetchMoreData}
            hasMore={this.state.val}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Hey that's end at all</b>
              </p>
            }
          >
            {" "}
            <div className="col-sm-12 row">{this.renderData()}</div>
          </InfiniteScroll>
        </div>
      </div>
    );

    if (this.state.loading) {
      article = <Spinner />;
    }

    return article;
  }
}

export default withErrorHandler(Dashboard, axios);
