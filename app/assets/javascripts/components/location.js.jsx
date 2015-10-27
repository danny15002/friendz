var Locations = React.createClass ({
  componentDidMount: function () {
    var map = React.findDOMNode(this.refs.map);
    var mapOptions = {
      center: {lat: 37.7758, lng: -122.435},
      zoom: 12
    };
    this.map = new google.maps.Map(map, mapOptions);
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log(pos.coords);
    });
    // google.maps.event.addListener(this.map, 'click', function (e) {
    //             var coords = {lat: e.latLng.lat(), lng: e.latLng.lng()};
    //             this.showNewBenchForm(coords);
    //         }.bind(this));
    // this.props.marked = [];
    // this.props.markers = {};
    // this.props.nowInView = [];

    // BenchStore.addChangeListener(this.setMarkers);

    // this.map.addListener('idle', function() {
    //   var ne = this.map.getBounds().getNorthEast();
    //   var sw = this.map.getBounds().getSouthWest();
    //   var bounds = {northEast: {lat: ne.J, lng: ne.M},
    //                 southWest: {lat: sw.J, lng: sw.M},
    //                 limits: BenchStore.limits()};
    //   ApiActions.storeLatLng({northEast: {lat: ne.J, lng: ne.M},
    //                           southWest: {lat: sw.J, lng: sw.M}});
    //   ApiUtil.fetchBenches(bounds);
    //
    // }.bind(this));
  },

  mixins: [ReactRouter.History],

  // showNewBenchForm: function (coords) {
  //   this.history.pushState(null, "benches/new", coords)
  // },
  render: function () {
    return <div  className={"map"} ref={"map"}></div>
  }
});
