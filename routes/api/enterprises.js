const express = require('express');
const router = express.Router();

//Enterprise Model
const Enterprise = require('../../models/enterprise');

// @route  GET api/enterprises
// @desc   Get all enterprises
// @access Public
router.get('/', (req, res) => {
  Item.find({})
    .sort({id: 1})
    .then(enterprises => res.json(enterprises))
});

router.get('/domains', (req, res)=>{
  Item
    .distinct("Primary_Domain", 
              {"Primary_Domain": {$nin: ["", null]}
              }
            )
    .then(domains => res.json(domains))
});

router.get('/solutions', (req, res)=>{
  Item.distinct("Solution_Type", {"Solution_Type": {$nin: ["", null]}})
    .then(domains => res.json(domains))
});



router.post('/', (req, res) => {
  const newEnt = new Enterprise({
    id: req.body.id,
    Name: req.body.Name,
    Organization: req.body.Organization,
    Basic_Description_: req.body.Basic_Description_,
    Solution_Type: req.body.Solution_Type,
    Primary_Domain: req.body.Primary_Domain,
    Secondary_Domain: req.body.Secondary_Domain,
    Legal_entity: req.body.Legal_entity,
    Keyword_discriptors: req.body.Keyword_discriptors,
    Location: req.body.Location,
    Scope_of_Activities: req.body.Scope_of_Activities,
    Operational_Area: req.body.Operational_Area,
    Climate_Zone: req.body.Climate_Zone,
    City_type: req.body.City_type,
    Founded: req.body.Founded,
    Economic_network: req.body.Economic_network,
    Other_network: req.body.Other_network,
    Sources: req.body.Sources,
    "Product/Services": req.body['Product/Services'],
    Workforce: req.body.Workforce,
    Production_processes: req.body.Production_processes,
    Production_processes_discription: req.body.Production_processes_discription,
    External_supplies: req.body.External_supplies,
    Supporting_services: req.body.Supporting_services,
    "By-products": req.body['By-products'],
    Distributing: req.body.Distributing,
    "Re-cycling": req.body['Re-cycling'],
    Managing: req.body.Managing,
    Steering: req.body.Steering,
    Ownership: req.body.Ownership,
    Economics: req.body.Economics,
    History: req.body.History,
    Recognition: req.body.Recognition,
    Future_Outlook: req.body.Future_Outlook,
    Last_Updated: req.body.Last_Updated,
    Researcher: req.body.Researcher,
    Contact: req.body.Contact
  });

  newEnt.save().then(enterprise => res.json(enterprise));
});

module.exports = router;