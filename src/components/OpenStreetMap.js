import React, { Component } from 'react'
import './../css/App.css'

import L             from 'leaflet'
import _             from 'lodash'
import Color         from 'color'
import qs            from 'qs'

 

class Control extends Component {
    constructor(props){
      super(props)      
      this.fetch        = this.fetch.bind(this);
    }
    fetch()  { this.props.parent.proxy({scope : "regions"});}
    render(){
      return (<button className="btn" onClick={this.fetch}>fetch</button>);
    }
  };

  
class OpenStreetMap extends Component {
    constructor(props){
      console.log('OpenStreetMap constructor')
        super(props)       
        let url_template  =  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
 
        let  map = L.map(this.props.id).setView(this.props.coordinates, this.props.zoom)
        this.centers = [];
        this.state   = {          
          map,
          url_template,
          current_zoom : this.props.zoom,
          max_zoom     : this.props.max_zoom,
          data         : {},
          regions      : [],
          departements : [],
          communes     : []
        }

        L.tileLayer(this.state.url_template,this.title_layer_parameters() ).addTo(this.state.map); 
        L.control.scale().addTo(this.state.map);

       /* this.state.map.on('layeradd ',     function() {})
        this.state.map.on('layerremove',   function() {})
        this.state.map.on('overlayadd',    function() {})
        this.state.map.on('overlayremove', function() {})    */    
        
        this.on_each_feature        = this.on_each_feature.bind(this);
        this.title_layer_parameters = this.title_layer_parameters.bind(this);
        this.remove_layer           = this.remove_layer.bind(this);
        this.style                  = this.style.bind(this);
       // this.clear                  = this.clear.bind(this);  
        this.center                 = this.center.bind(this);
        this.on_change              = this.on_change.bind(this);
        this.set_state              = this.set_state.bind(this);
        this.handle_response        = this.handle_response.bind(this);
        this.proxy                  = this.proxy.bind(this);
        this.ss                     = this.ss.bind(this);
      }       
    componentWillMount () {}      
    remove_layer(){ this.state.map.removeLayer();}
    style(feature){
        let color = Color('#7743CE').alpha(0.5).lighten(Math.random());
       return {
            fillColor  : color,
            weight     : 2,
            opacity    : 1,
            color      : 'black',
            dashArray  : '3',
            fillOpacity: 0.9
        }
      }
    on_each_feature (feature, layer) {       
            let bounds =  layer.getBounds();        
            let center =  bounds.getCenter();          
            this.centers.push(center);  
            layer.bindPopup(feature.properties.nom)   
      }
    title_layer_parameters(){
         return {
            maxZoom : this.state.max_zoom,
            attribution : 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
              '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
              'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id : 'mapbox.streets'
          };
      }
    center(polygons){          
           var p      =   L.polyline(polygons)
           let bounds =   p.getBounds();        
           let center =  bounds.getCenter();      
           return center
      }

    geoJSON_layer(){
        this.centers = []; 
        if(window.geoJson ) window.geoJson.clearLayers();                 
        let map     = this.state.map;      
        let options    = { onEachFeature : this.on_each_feature, style : this.style}             
        window.geoJson = L.geoJSON(this.state.data,options).addTo(map) 
        console.log(this.state.current_zoom)       
        map.setView(this.center(this.centers), this.state.current_zoom) 
        window.map     = map;    
    }    
    set_state(res) {  

      this.setState({
           data         : res.geojson      || this.state.data,
           regions      : res.regions      || this.state.regions,
           departements : res.departements || this.state.departements,
           communes     : res.communes     || this.state.communes,
           current_zoom : res.zoom         || this.state.current_zoom
          }) 
          /*
          actlib
              actlib              :  "Gymnastique Rythmique"
              actnivlib           :  "Entrainement"
              comlib              :  "Paris"
              depcode             :  75
              deplib              :  "Paris"
              equlargeurevolution :  8
              equlongueurevolution:  12
              equipementtypecode  :  "2105"
              equipementtypelib   :  "Salle de danse"
              equnom              :  "Salle De Danse"

              inscodepostal       :  75018
              inslibellevoie      :  "Rue Ronsard"
              insnovoie           :   "2"
              insnom              :  "Gymnase Ronsard"

              naturelibelle       :  "Intérieur"
              naturesollib        :  "Parquet"
           */
          if(res.equipements){
           /* _.forEach(res.equipements,(v,k)=>{
              console.log(v.fields.actlib)
            })*/
            let result = _.chain(res.equipements).map((v,k)=> {return _.get(v,'fields.actlib')}).value()
            console.log(result)
          }                     
    }

    


    handle_response(response) {
      var contentType = response.headers.get("content-type"); 
      if(contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(this.set_state);
      } else {
        console.log("contentType header doesn't match json");
      }
    } 

    proxy(request_object) { fetch(qs.stringify(request_object)).then(this.handle_response);} 
    on_change(id){ 
      return ()=>{ this.proxy( {scope: id, value :document.getElementById(id).value})
    }
  }
    //clear(){ this.state.map.eachLayer((layer)=>{ layer.remove()})}
   
 selectComponent (items,id){
   let option_mapper =  (v,i)=> <option key={i} value={v.code} >{v.name}</option>
    return  (<select  id={id} onChange = {this.on_change(id)}>{ items.map(option_mapper)} </select>) 
  }

  ss (items,id){
    let option_mapper =  (v,i)=> <option key={i} value={v.code} >{v.name}</option>
     return  (<select  id={id} onChange = {this.on_change(id)}>{ items.map(option_mapper)} </select>) 
   }

   render() {  
       if(this.state.data.type) this.geoJSON_layer() 
    return (
           <div>        
             {this.selectComponent(this.state.regions,"regions")}    
             {this.selectComponent(this.state.departements,"departements")}  
             {this.selectComponent(this.state.communes,"communes")}        
             <select id="equipements" onChange = {this.on_change("equipements")}>
                <option value="a_paris">paris</option>
                <option value="dans_le_val-d_oise">val-d'oise</option>
                <option value="dans_le_val-de-marne">val-de-marne</option>
                <option value="dans_les_hauts-de-seine">hauts-de-seine</option>
                <option value="dans_les_yvelines">yvelines</option>
                <option value="en_seine-et-marne">seine-et-marne</option>
                <option value="en_seine-saint-denis">seine-saint-denis</option>
             </select>  
             <Control parent = {this}/> 
           </div>
         )
   }
}

export default OpenStreetMap
