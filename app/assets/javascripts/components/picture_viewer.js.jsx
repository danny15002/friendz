var PictureViewer = React.createClass({
  rightArrow: function () {
    return (
      <div
        onClick={this.handleRight}
        style={{position: "absolute", top: "0", right: "0", background: "white"}}>
        <span className={"glyphicon glyphicon-chevron-right"}></span>
      </div>
    )
  },
  handleRight: function () {
    var idx = (this.state.currentPicIdx + 1) % this.state.pictures.length
    this.setState({currentPicIdx: idx})
  },
  leftArrow: function () {
    return (
      <div onClick={this.handleLeft} style={{float: "left", background: "white"}}>
        <span className={"glyphicon glyphicon-chevron-left"}></span>
      </div>
    )
  },
  handleLeft: function () {
    var idx = (this.state.currentPicIdx - 1 + this.state.pictures.length) % this.state.pictures.length
    this.setState({currentPicIdx: idx})
  },
  getInitialState: function () {
    return {currentPicIdx: 0, pictures: UserStore.getPictures(), inactive: true}
  },
  componentDidMount: function () {
    UserStore.addChangeListener(FriendzConstants.PICTURES_RECEIVED, this.getPictures);
    UserStore.addChangeListener(FriendzConstants.PICTURE_UPLOADED, this.uploadedPicture);
    MessageStore.addChangeListener(FriendzConstants.COMMENT_CREATED, this.updatePictures);
    MessageStore.removeChangeListener(FriendzConstants.COMMENT_LIKED, this.updatePictures);
    MessageStore.removeChangeListener(FriendzConstants.COMMENT_UNLIKED, this.updatePictures)
    ApiUtil.fetchPictures(this.props.params.userId);
  },
  componentWillUnmount: function () {
    UserStore.removeChangeListener(FriendzConstants.PICTURES_RECEIVED, this.getPictures);
    UserStore.removeChangeListener(FriendzConstants.PICTURE_UPLOADED, this.uploadedPicture);
    MessageStore.removeChangeListener(FriendzConstants.COMMENT_CREATED, this.updatePictures);
  },
  componentWillReceiveProps: function (nextProps) {
    ApiUtil.fetchPictures(nextProps.params.userId);
  },
  getPictures: function () {
    this.setState({pictures: UserStore.getPictures()})
  },
  uploadedPicture: function () {
    var length = this.state.pictures.length
    this.setState({pictures: UserStore.getPictures(), currentPicIdx: length})
  },
  updatePictures: function () {
    ApiUtil.fetchPictures();
  },
  upload: function(event) {
    cloudinary.openUploadWidget({ cloud_name: 'danny15002', upload_preset: 'dflg7sxq'},
      function(error, result) {
        // console.log(result);
        this.setState({picUrl: result[0].secure_url, inactive: false});
      }.bind(this));
  },
  submitForm: function () {
    var picture = {
      user_id: LoginStore.user().id,
      pic_url: this.state.picUrl
    };
    ApiUtil.uploadPicture(picture);
    this.setState({picUrl: "", inactive: true});
  },
  render: function () {
    var source;
    var picture;
    var comments = [];
    var id;
    var commentSection;
    if (this.state.pictures.length === 0) {
      source = "";
      id = "";
      commentSection = <div>No Pictures Yet, Upload some</div>;
    } else {
      picture = this.state.pictures[this.state.currentPicIdx]
      source = picture.pic_url
      comments = picture.comments;
      id = picture.id;
      commentSection = (
        <div>
          <div className="picture-comments">
            <MainCommentList messages={comments} />
          </div>
          <CommentForm id={id} commentableType={"Picture"} />
        </div>
      );
    }


    return (
      <div className={"pic-viewer"}>
        <div style={{position: "relative"}} className={"pic-container"}>
          {this.leftArrow()}
          <img className={"picture"}
            src={source}
            alt={"Picture"}/>
          {this.rightArrow()}
        </div>
        <div>
          <h5 style={{marginLeft: "15px", display: "inline-block", marginRight: "15px"}} > Select the image you want to upload, then click Upload!</h5>
          <button style={{width:"auto", marginRight: "15px"}} onClick={this.upload} id="upload_widget_opener">Select an Image</button>
          <button onClick={this.submitForm} disabled={this.state.inactive}>Upload</button>
        </div>
        {commentSection}
      </div>
    )
  }
})
