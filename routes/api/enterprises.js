const express = require('express');
const router = express.Router();

//Enterprise Model
const Enterprise = require('../../models/enterprise');

// @route  GET api/enterprises
// @desc   Get all enterprises
// @access Public
router.get('/', (req, res) => {
  Enterprise.find({})
    .sort({ID: 1})
    .then(enterprises => res.json(enterprises))
});

router.get('/domains', (req, res)=>{
  Enterprise
    .distinct("Primary Domain",
              {"Primary Domain": {$nin: ["", null]}
              }
            )
    .then(domains => res.json(domains))
});

router.get('/solutions', (req, res)=>{
  Enterprise.distinct("Solution Type", {"Solution Type": {$nin: ["", null]}})
    .then(solutions => res.json(solutions))
});

router.get('/latlong', (req, res)=>{
  Enterprise.find({},{lat:1,long:1})
  .then(result => res.json(result))
})

router.get('/i/:id/', (req, res)=>{
  Enterprise.findById(req.params.id, function(err, enterprise){
    if(err){
      res.send("error occured");
      next();
    }
    res.json(enterprise);
  })
});

router.get('/f/:field/:n', (req, res)=>{
  let name = req.params.field;
  let value = {$nin: ["", null]};
  let query = {};
  query[name] = value;
  if(req.params.n == 0){
    Enterprise.distinct(req.params.field, query)
    .then(solutions => res.json(solutions))
  }
  else if (req.params.n == 1 ){
    let q = JSON.parse('{"'+req.params.field+'": 1, "_id":0}')
    Enterprise.find({}, q)
    .then(solutions => res.json(solutions))
  }
});

router.get('/q/:field/:value', (req, res)=>{
  var query = {};
  query[req.params.field] = req.params.value;

  Enterprise.find(query)
    .then(result => res.json(result))
})

router.get('/update_aws_link', (req, res) => {
  // Enterprise.find({"mainImage": { $regex: ".*aws.*"}}, { "mainImage": 1 }).
  Enterprise.find().
  then(function (result) {
    final = [];

    for (let i = 0; i < result.length; i++) {
      // result[i].fixedImage = "";
      if (result[i].mainImage.includes("aws")) {
        result[i].mainImage = result[i].mainImage.replace("https://s3-us-west-1.amazonaws.com/slfe-image-storage", "https://s3-us-west-1.amazonaws.com/slfe-knowledgebase")

        final.push(result[i])
      }

      if (result[i].otherImages.length > 0) {
        for (let j = 0; j < result[i].otherImages.length; j++) {
          if (result[i].otherImages[j].img.includes("aws")) {
            result[i].otherImages[j].img = result[i].otherImages[j].img.replace("https://s3-us-west-1.amazonaws.com/slfe-image-storage", "https://s3-us-west-1.amazonaws.com/slfe-knowledgebase")

            final.push(result[i]);
            break;
          }
        }
      }

      result[i].save();
    }
    res.json(final);
  })
});

router.post('/set_is_featured/:id', (req, res) => {
  Enterprise.findById(req.params.id, function(err, enterprise){
    if(err){
      res.send("error occured");
      next();
    }
    enterprise.isFeatured = req.body.isFeatured

    enterprise.save().then(enterprise => res.json(enterprise));;
  })
});

router.post('/u/:id', (req, res) => {
  Enterprise.findById(req.params.id, function(err, enterprise){
    if(err){
      res.send("error occured");
      next();
    }
    enterprise.Name = req.body.Name;
    enterprise["Responsible Organization"] = req.body.ResponsibleOrganization;
    enterprise["Short Description"] = req.body.ShortDescription;
    enterprise["General Description"] = req.body.GeneralDescription;
    enterprise["Solution Type"] = req.body.SolutionType;
    enterprise["Primary Domain"] = req.body.PrimaryDomain;
    enterprise["Secondary Domain"] = req.body.SecondayDomain;
    enterprise["Organizational Entity Type"] = req.body.OrganizationalEntityType;
    enterprise["Keyword Descriptors"] = req.body.KeywordDescriptors;
    enterprise.Location = req.body.Location;
    enterprise.Country = req.body.Country;
    enterprise.State = req.body.State;
    enterprise.City = req.body.City;
    enterprise["Scope of Activities"] = req.body.ScopeOfActivities;
    enterprise["Operational Area"] = req.body.OperationalArea;
    enterprise["Climate Zone"] = req.body.ClimateZone;
    enterprise["City Type"] = req.body.CityType;
    enterprise["Date Founded"] = req.body.DateFounded;
    enterprise["Economic Networks"] = req.body.EconomicNetworks;
    enterprise["Associations"] = req.body.Associations;
    enterprise.References = req.body.References;
    enterprise["Annual Revenue"] = req.body.AnnualRevenue;
    enterprise["Number of Workers"] = req.body.NumberOfWorkers;
    enterprise["Product Description"] = req.body.ProductDescription;
    enterprise["Customers Description"] = req.body.CustomersDescription;
    enterprise["Workforce Description"] = req.body.WorkforceDescription;
    enterprise["Production Description"] = req.body.ProductionDescription;
    enterprise["Sourcing Description"] = req.body.SourcingDescription;
    enterprise["Supporting Services Description"] = req.body.SupportingServicesDescription;
    enterprise["Other Outputs Description"] = req.body.OtherOutputsDescription;
    enterprise["Distributing Description"] = req.body.DistributingDescription;
    enterprise["Re-cycling Description"] = req.body.RecyclingDescription;
    enterprise["Managing Description"] = req.body.ManagingDescription;
    enterprise["Decision Making Description"] = req.body.DecisionMakingDescription;
    enterprise["Steering Description"] = req.body.SteeringDescription;
    enterprise["Ownership Description"] = req.body.OwnershipDescription;
    enterprise["Business Model Description"] = req.body.BusinessModelDescription;
    enterprise.History = req.body.History;
    enterprise.Recognition = req.body.Recognition;
    enterprise["Future Outlook"] = req.body.FutureOutlook;
    enterprise.Researcher = req.body.Researcher;
    enterprise["Last Updated"] = req.body.LastUpdated;
    enterprise.otherImages = req.body.otherImages;

    enterprise.save().then(enterprise => res.json(enterprise));;
  })
})

router.post('/', (req, res) => {
  const newEnt = new Enterprise({
    Name: req.body.Name,
    "Responsible Organization": req.body.ResponsibleOrganization,
    "Short Description": req.body.ShortDescription,
    "General Description": req.body.GeneralDescription,
    "Solution Type": req.body.SolutionType,
    "Primary Domain": req.body.PrimaryDomain,
    "Seconday Domain": req.body.SecondayDomain,
    "Organizational Entity Type": req.body.OrganizationalEntityType,
    "Keyword Descriptors": req.body.KeywordDescriptors,
    Location: req.body.Location,
    Country: req.body.Country,
    State: req.body.State,
    City: req.body.City,
    "Scope of Activities": req.body.ScopeOfActivities,
    "Operational Area": req.body.OperationalArea,
    "Climate Zone": req.body.ClimateZone,
    "City Type": req.body.CityType,
    "Date Founded": req.body.DateFounded,
    "Economic Networks": req.body.EconomicNetworks,
    "Associations": req.body.Associations,
    //"Number of Employees": req.body.NumberOfEmployees,
    References: req.body.References,
    "Annual Revenue": req.body.AnnualRevenue,
    "Number of Workers": req.body.NumberOfWorkers,
    "Product Description": req.body.ProductDescription,
    "Customers Description": req.body.CustomersDescription,
    "Workforce Description": req.body.WorkforceDescription,
    "Production Description": req.body.ProductionDescription,
    "Sourcing Description": req.body.SourcingDescription,
    "Supporting Services Description": req.body.SupportingServicesDescription,
    "Other Outputs Description": req.body.OtherOutputsDescription,
    "Distributing Description": req.body.DistributingDescription,
    "Re-cycling Description": req.body.RecyclingDescription,
    "Managing Description": req.body.ManagingDescription,
    "Decision Making Description": req.body.DecisionMakingDescription,
    "Steering Description": req.body.SteeringDescription,
    "Ownership Description": req.body.OwnershipDescription,
    "Business Model Description": req.body.BusinessModelDescription,
    History: req.body.History,
    Recognition: req.body.Recognition,
    "Future Outlook": req.body.FutureOutlook,
    Researcher: req.body.Researcher,
    "Last Updated": req.body.LastUpdated,
    Lattitude: "",
    Longitude: "",
    mainImage: "",
    otherImages: req.body.otherImages,
    isFeatured: false
  })

  newEnt.save().then(enterprise => res.json(enterprise));
})

module.exports = router;
