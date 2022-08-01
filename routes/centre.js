const router = require("express").Router();
const Centre = require("../models/Centre");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndDeskOfficer,
  verifyTokenAndAdmin,
  verifyTokenAndAO,
  verifyToken,
} = require("../utils/verifyToken");

//Update Centre
router.put("/:id", verifyTokenAndDeskOfficer, async (req, res) => {
  try {
    const centre = await Centre.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(centre);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete Centre
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Centre.findByIdAndDelete(req.params.id);
    res.status(200).json("Centre Information has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get Centre
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const centre = await Centre.findById(req.params.id);
    res.status(200).json(centre);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get all Centres
router.get("/", verifyToken, async (req, res) => {
  // try {
  //   const centres = await Centre.find({
  //     ...req.query,
  //   });

  //   if (centres.length === 0) {
  //     return res
  //       .status(400)
  //       .json({ message: "Centre cannot be found or does not exist" });
  //   } else {
  //     return res.status(200).json(centres);
  //   }
  // } catch (error) {
  //   return res.status(500).json(error);
  // }
  const centres = await Centre.find({
    ...req.query,
  });

  if (centres.length !== 0) {
    return res.status(200).json(centres);
  } else {
    return res
      .status(400)
      .json({ message: "Centre cannot be found or does not exist" });
  }
});

//Create a centre
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    // Check if Centre Exists
    const centreNameExist = await Centre.findOne({ name: req.body.name });
    // const centreEmailExist = await Centre.findOne({ email: req.body.email });
    // const centreAccountNumberExist = await Centre.findOne({
    //   accountNumber: req.body.accountNumber,
    // });
    // const centreBVNExist = await Centre.findOne({ bvn: req.body.bvn });
    // const centrePhoneNumberExist = await Centre.findOne({
    //   phoneNumber: req.body.phoneNumber,
    // });

    if (centreNameExist) {
      return res.status(400).json({
        error: true,
        message: `Centre with name: ${req.body.name} already exists`,
      });
    }

    // if (centreEmailExist) {
    //   return res.status(400).json({
    //     error: true,
    //     message: `Centre with Email: ${req.body.email} already exists`,
    //   });
    // }

    // if (centreAccountNumberExist) {
    //   return res.status(400).json({
    //     error: true,
    //     message: `Centre with Account Number: ${req.body.accountNumber} already exists`,
    //   });
    // }

    // if (centreBVNExist) {
    //   return res.status(400).json({
    //     error: true,
    //     message: `Centre with BVN: ${req.body.bvn} already exists`,
    //   });
    // }

    // if (centrePhoneNumberExist) {
    //   return res.status(400).json({
    //     error: true,
    //     message: `Centre with Phone Number: ${req.body.phoneNumber} already exists`,
    //   });
    // }

    const newCentre = new Centre({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      contactPerson: req.body.contactPerson,
      address: req.body.address,
      tradeArea: req.body.tradeArea,
      tools: req.body.tools,
      equipment: req.body.equipment,
      numberOfInstructors: req.body.numberOfInstructors,
      state: req.body.state,
      bank: req.body.bank,
      accountNumber: req.body.accountNumber,
      bvn: req.body.bvn,
      assessedByTeamLeader: req.body.assessedByTeamLeader,
      assessedByOfficer1: req.body.assessedByOfficer1,
      assessedByOfficer2: req.body.assessedByOfficer2,
      assessedByAOLeader: req.body.assessedByAOLeader,
      assessedByAOOfficer: req.body.assessedByAOOfficer,
      yearAssessed: req.body.yearAssessed,
      yearReAssessed: req.body.yearReAssessed,
      operationalStatus: req.body.operationalStatus,
    });

    const centre = await newCentre.save();
    console.log(centre);

    res.status(200).json(centre);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
