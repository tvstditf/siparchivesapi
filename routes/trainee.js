const router = require("express").Router();
const Trainee = require("../models/Trainee");
const {
  verifyTokenAndDeskOfficer,
  verifyTokenAndAdmin,
  verifyTokenAndAO,
} = require("../utils/verifyToken");

//Update Trainee
router.put("/:id", verifyTokenAndDeskOfficer, async (req, res) => {
  try {
    const trainee = await Trainee.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(trainee);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete Trainee
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Trainee.findByIdAndDelete(req.params.id);
    res.status(200).json("Centre Information has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get Trainee
router.get("/find/:id", verifyTokenAndAO, async (req, res) => {
  try {
    const trainee = await Trainee.findById(req.params.id);
    res.status(200).json(trainee);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get all Trainees
router.get("/", async (req, res) => {
  try {
    const trainees = await Trainee.find({
      ...req.query,
    });

    if (trainees.length === 0) {
      return res
        .status(400)
        .json({ message: "Trainee cannot be found or does not exist" });
    }
    res.status(200).json(trainees);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Create a Trainee
router.post("/", verifyTokenAndAO, async (req, res) => {
  try {
    //Check if trainee exists
    // const TraineeEmailExist = await Trainee.findOne({ email: req.body.email });
    // const TraineeAccountNumberExist = await Trainee.findOne({
    //   accountNumber: req.body.accountNumber,
    // });
    // const TraineeBVNExist = await Trainee.findOne({ bvn: req.body.bvn });
    // const TraineePhoneNumberExist = await Trainee.findOne({
    //   phoneNumber: req.body.phoneNumber,
    // });

    // if (TraineeEmailExist) {
    //   return res.status(400).json({
    //     error: true,
    //     message: `Trainee with Email: ${req.body.email} already exists`,
    //   });
    // }

    // if (TraineeAccountNumberExist) {
    //   return res.status(400).json({
    //     error: true,
    //     message: `Trainee with Account Number: ${req.body.accountNumber} already exists`,
    //   });
    // }

    // if (TraineeBVNExist) {
    //   return res.status(400).json({
    //     error: true,
    //     message: `Trainee with BVN: ${req.body.bvn} already exists`,
    //   });
    // }

    // if (TraineePhoneNumberExist) {
    //   return res.status(400).json({
    //     error: true,
    //     message: `Trainee with Phone Number: ${req.body.phoneNumber} already exists`,
    //   });
    // }

    const newTrainee = new Trainee({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      profilePicture: req.body.profilePicture,
      dob: req.body.dob,
      gender: req.body.gender,
      disability: req.body.disability,
      address: req.body.address,
      accountNumber: req.body.accountNumber,
      sip: req.body.sip,
      tradeArea: req.body.tradeArea,
      state: req.body.state,
      centreId: req.body.centreId,
      year: req.body.year,
      bank: req.body.bank,
      bvn: req.body.bvn,
      nationality: req.body.nationality,
      town: req.body.town,
      localGovernmentArea: req.body.localGovernmentArea,
      educationalBackground: req.body.educationalBackground,
      nextOfkin: req.body.nextOfkin,
      maritalStatus: req.body.maritalStatus,
      guarantor: req.body.guarantor,
    });

    const trainee = await newTrainee.save();

    console.log(trainee);

    res.status(200).json(trainee);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
