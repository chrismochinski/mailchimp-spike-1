const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const client = require("@mailchimp/mailchimp_marketing");
const { default: axios } = require("axios");

client.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.DC,
});


//GET
/** //important put this in a DIFFERENT GROUP/ROUTE
 * @api {get} /subscribe Get ADMIN info - data and stats SOME
 * @apiName GetAdmin
 * @apiGroup Subscribe
 * @apiDescription Get detailed list of subscribers and everything about them that they've provided
 *
 * @api this is TAKING A WHILE to come back (several seconds)
 *
 * @api let's fix this documentation later, huh?
 *
 */
router.get("/", async (req, res) => {
  const response = await client.lists
    .getList(process.env.TEST_LIST_ID)
    .then((response) => {
      console.log("response is:", response);
      res.send(response);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

/** 
 * @api {get} /subscribe Get LIST info 
 * @apiName GetList
 * @apiGroup Subscribe
 * https://mailchimp.com/developer/marketing/api/lists/get-lists-info/
 */
router.get('/all-lists', async (req, res) => {
  const response = await client.lists.getListMembersInfo(process.env.TEST_LIST_ID)
  .then((response) => {
    console.log("response from GET LIST MEMBERS INFO:", response);
    res.send(response);
  })
  .catch((error) => {
    res.sendStatus(500);
  });
}) 


//POST
/**
 * @api {post} /subscribe Send new subscriber email to mailing list
 * @apiName PostSubscriber
 * @apiGroup Subscribe
 * @apiDescription Sends the new subscriber email and status to MailChimp
 *
 * @apiBody {string} email - required
 * @apiBody {string} status - subscribe or unsubscribe
 * third option is 'pending' (must have quotes) - this will
 * triggler double-opt-in and send a confirmation email.
 * Once they respond to that, it will switch them to "subscribe"
 * -------------------------------
 * REF: (internal only) - https://www.youtube.com/watch?v=JLKzr83xZGo&t=25s
 * FFW to appx 24:00
 *
 * apikey as a param is CASE SENSITIVE ...must be listed as that: apikey
 * dc=us5 (this is the "data center" for your account)
 *
 * @apiKey access: {process.env.apikey}
 *
 * Mo's 'Audience ID' = 7dcef6c713
 *
 */
router.post("/", async (req, res) => {
  console.log('At router, info is showing up as:', req.body )
  const listId = process.env.TEST_LIST_ID; 
  const subscribingUser = req.body; 
  console.log("we are using these:", listId, subscribingUser);

  const response = await client.lists.addListMember(listId, {
    email_address: subscribingUser.email,
    status: "subscribed",
    merge_fields: {
      FNAME: subscribingUser.firstName,
      LNAME: subscribingUser.lastName,
      ADDRESS: subscribingUser.address,

    //   PHONE: subscribingUser.phone,
    //   BIRTHDAY: subscribingUser.birthday,

    },
  }).then((response) => {
    console.log('response from POST is:', response);
    res.send(response);
  })
  .catch((error) => {
    res.sendStatus(500);
    console.log('error in POST on router page:', error)
  });
});


module.exports = router;

//UPDATED whole page
