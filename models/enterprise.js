const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Enterprise Schema
const entSchema = new Schema({
  id: Number,
  Name: String,
  Organization: String,
  Basic_Description_: String,
  Solution_Type: String,
  Primary_Domain: String,
  Secondary_Domain: String,
  Legal_entity: String,
  Keyword_discriptors: String,
  Location: String,
  Scope_of_Activities: String,
  Operational_Area: String,
  Climate_Zone: String,
  City_type: String,
  Founded: Number,
  Economic_network: String,
  Other_networks: String,
  Sources: String,
  "Product/Services": String,
  Workforce: String,
  Production_processes: String,
  Production_processes_discription: String,
  External_supplies: String,
  Supporting_services: String,
  "By-products": String,
  Distributing: String,
  "Re-cycling": String,
  Managing: String,
  Steering: String,
  Ownership: String,
  Economics: String,
  History: String,
  Recognition: String,
  Future_Outlook: String,
  Last_Updated: String,
  Researcher: String,
  Contact: String
},
{
  versionKey: false
});

module.exports = Item = mongoose.model('enterprise', entSchema);