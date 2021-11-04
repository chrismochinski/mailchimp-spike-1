const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const client = require("@mailchimp/mailchimp_marketing");

const { default: axios } = require("axios");
client.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.DC,
});

//UPDATED
/**
 * @api {get} /subscribe Get full list of subscriptions
 * @apiName GetSubscribers
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
      console.log('response is:', response)
      res.send(response);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

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
router.post("/", (req, res) => {
  let emailSubmission = Object.keys(req.body)[0];
  console.log("router plan req.body:", emailSubmission);
  const mcData = {
    members: [
      {
        email_address: emailSubmission,
        status: "subscribe",
      },
    ],
  };
  const mcDataPost = JSON.stringify(mcData);
  const options = {
    url: `https://us5.api.mailchimp.com/3.0/lists/${process.env.TEST_LIST_ID}`,
    method: "POST",
    headers: {
      Authorization: `auth ${process.env.MAILCHIMP_API_KEY}`,
    },
    body: mcDataPost,
  };
});

// router.post("/", (req, res) => {
//   let emailSubmission = Object.keys(req.body)[0]
//     const
//     .then((result) => {
//       res.sendStatus(201);
//     })
//     .catch((error) => {
//       console.log("error in post router:", error);
//       res.sendStatus(500);
//     });
// });

module.exports = router;

//UPDATED whole page
