import http     from 'http'
import fs       from 'fs'
import { join } from 'path'
import url      from 'url'
import _        from 'lodash'
import qs       from 'qs'
import remove_accents from 'remove-accents'

let port =  3001;
const dirs_name = (source)=>{
    const isDirectory    = source => fs.lstatSync(source).isDirectory()
    const getDirectories = source =>
    fs.readdirSync(source).map(name => join(source, name)).filter(isDirectory)     
    let dirs      =  getDirectories(source).map(value=>{
     return value.substring(source.length - 1 ,value.length)    
    }) 
    return dirs
}

let iteratee_0 = (v,k)=>{         
  return  _.find(departements_cache,(element)=>{return element.code === v.properties.code}) 
}
let iteratee_1 = (v,k)=>{ return {name : v.properties.nom, code : v.properties.code }}
let departements_name = dirs_name(`./france-geojson/departements`)
let departements_cache =  departements_name.map((v,k)=>{
    let result = {code:'',name:''};
    [result.code,result.name] = [v.substring(0,v.indexOf('-')),v.substring(v.indexOf('-') + 1,v.length)]
   return result
}); 


const resolve_request = (query_obj)=>{  
    
    if(query_obj.scope === 'regions') {
        let prefix = `./france-geojson/${query_obj.scope}/${query_obj.value}`
        return `${prefix}/departements-${query_obj.value}.geojson`; 
    }     
    if(query_obj.scope === 'departements') {
        let result = _.find(departements_cache,(d)=>{return d.code == query_obj.value})     
        let prefix = `./france-geojson/${query_obj.scope}/${result.code}-${result.name}`      
        return `${prefix}/communes-${result.code}-${result.name}.geojson`; 
    }
    if(query_obj.scope === 'communes'){    
        let result = _.find(departements_cache,(d)=>{return d.code == query_obj.value.substring(0,2)})
        let prefix = `./france-geojson/departements/${result.code}-${result.name}`       
         return `${prefix}/communes-${result.code}-${result.name}.geojson`;  
    }   
    if(query_obj.scope === 'equipements'){
        return `./data/recensement_des_equipements_sportifs_${query_obj.value}.json`
    }   
    return "" 
}



let server = http.createServer((req,res)=>{
    let req_url   =  req.url.substring(1,req.url.length)
    let query_obj =  qs.parse(req_url) 
    console.log(query_obj)   
    let queryData =  url.parse(req.url, true).query;
    res.setHeader('Content-Type', 'application/json');
    let path = `./france-geojson/${query_obj.scope}` 
    let response = {}  
    let file_path = resolve_request(query_obj)
    if(!query_obj.value && query_obj.scope === 'regions')  _.set(response,'regions',dirs_name(path).map((v,k)=>{return {name : v,code:v}})) 
   
   // if(query_obj.value  && query_obj.scope != 'communes')  _.set(response,'geojson',JSON.parse(fs.readFileSync(file_path, 'utf8')))  
    
    if(query_obj.value  && query_obj.scope === 'regions' ){
        _.set(response,'geojson',JSON.parse(fs.readFileSync(file_path, 'utf8')))  
        _.set(response,'regions',dirs_name(path).map((v,k)=>{return {name : v,code:v}})) 
        let features  = response['geojson'].features
        let d = _.map(features,iteratee_0)        
        _.set(response,'departements', _.sortBy(d,x=>x.name)) 
        _.set(response,'zoom', 8)         
    } 

    if(query_obj.value && query_obj.scope === 'departements' ){ 
        _.set(response,'geojson',JSON.parse(fs.readFileSync(file_path, 'utf8'))) 
        let features  = response['geojson'].features     
        let d = _.map(features,iteratee_1) 
        _.set(response,'communes',_.sortBy(d,x=>x.name))        
        _.set(response,'zoom', 9)
    }

    if(query_obj.value && query_obj.scope === 'communes' ){ 
        _.set(response,'geojson',JSON.parse(fs.readFileSync(file_path, 'utf8')))  
       let content_file =  fs.readFileSync(file_path, 'utf8')       
       let json =  JSON.parse(content_file)
       let city = _.find(json.features,(element)=>element.properties.code === query_obj.value)       
       _.set(response,'geojson',city)
       _.set(response,'zoom', 12)
    }  
    
    if(query_obj.scope === 'equipements') {
        _.set(response,'equipements',JSON.parse(fs.readFileSync(file_path, 'utf8')))        
    }

    res.write(JSON.stringify(response))
    res.end()
});





const server_events = ['checkContinue','checkExpectation','clientError','close','connect','connection','request','upgrade'];
_.forEach(server_events,(event)=>{
    server.on(event,()=>{
         //console.log(` ${event} on server`)
      })
})

server.listen(port,()=>{ console.log(`server listening on port : ${port}`)})