// const expect = require("chai").expect;
// const mongoose = require("mongoose");
// const sinon = require("sinon");

// const { Property } = require("../../models/propertyModel");
// const GetAllLocksController = require("../../controllers/locks/getAllLocks")

// let sandbox=null;

// describe("Get all locks", function(){
//   const req={};
//   const res = {};

//   beforeEach( function(done){
//     sandbox = sinon.createSandbox();
//   }
    
//   );

//   afterEach(function(done){
//     sandbox.restore();
//   }
    
//   );

//   it("should catch an errors", function(done){
//     sandbox.stub(Lock, "find").throws();
//     GetAllLocksController.getAllLocks(req, res).then(()=>{
//       console.log(res);
//       done()
//     })
//   })

// })
