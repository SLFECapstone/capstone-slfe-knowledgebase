import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEnterprises } from '../../actions/enterpriseActions';
import propTypes from 'prop-types';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import markerImg from 'leaflet/dist/images/marker-icon.png';
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster.js";


class Map extends Component {

	constructor(props) {
    super(props);
    this.state = {
    	width: this.props.width || '750px',
    	height: this.props.height || '750px',
      map: null,
      tileLayer: null,
      icon: null,
      geojsonLayer: null,
      geojson: null,
      subwayLinesFilter: '*',
      markers: [],
			reload: false
    };
  }


  componentWillMount() {
  	this.props.getEnterprises();
  }
  componentDidMount() {

		document.title = "SLFE - Map";

		let config = {};
		config.params = {
		  center: [33.4144139,	-111.90945],
		  zoomControl: false,
		  zoom: 3,
		  maxZoom: 16,
		  minZoom: 3,
		  scrollwheel: false,
		  legends: true,
		  infoControl: false,
		  attributionControl: true
		};
		config.tileLayer = {
		  uri: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
		  labels: {
	      url: 'http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png'
			},
		  params: {
		    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		    maxZoom: 16,
		    minZoom: 3,
		    id: '',
		    accessToken: ''
			}
		};
  	if (!this.state.map) {
  		let map = L.map('map', config.params);//.fitBounds(maxBounds);

	    L.control.zoom({ position: "bottomleft"}).addTo(map);
	    L.control.scale({ position: "bottomleft"}).addTo(map);

	    // a TileLayer is used as the "basemap"
	    const tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);
			this.setState({ map: map, tileLayer: tileLayer });

			this.setState({ icon: L.icon({ iconUrl: markerImg }) });

			/* removed in SP19_SPRINT1 bug_fix on not directly editing state. (Safe? to delete)
			this.state.icon = L.icon({
			    iconUrl: markerImg
			});
			*/

  	}
  }
  render() {
  	const { enterprises } = this.props.enterpriseData;
  	if (enterprises.length) {
	  	var dataArray = enterprises.map((enterprise) =>
				[enterprise.Lattitude, enterprise.Longitude, enterprise.Name, enterprise._id]
			);
			var markers = L.markerClusterGroup({showCoverageOnHover: false});
			for (let i = 0; i < dataArray.length; i++) {
				let enterprise = dataArray[i];
				let marker = L.marker([enterprise[0], enterprise[1]], {icon: this.state.icon, title: enterprise[2], riseOnHover: true});
				let name = enterprise[2];
				let id = enterprise[3];
				marker.bindPopup('<p><a href="/solution/' + id + '">' + name + '</a></p>').openPopup();
				markers.addLayer(marker);
			}
			if(this.state.map !== null) { // fixing bug #100 in taiga where map does not load and crashes page.
				this.state.map.addLayer(markers)
				this.state.map.fitBounds([
			    [5.499550, -167.276413], //Southwest
			    [53.162102, -52.233040]  //Northeast
				]);
				this.state.map.setZoom(3);
			}
		}
    return (
	    <div id="map" style={{ marginTop: '20px', height: this.state.height, width: this.state.width }}>
      </div>
    );
  }
}

Map.propTypes = {
  getEnterprises: propTypes.func.isRequired,
  enterpriseData: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  enterpriseData: state.enterpriseData,
});

export default connect(
  mapStateToProps,
  {getEnterprises}
) (Map);
