const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleWare/catchAsyncError");
const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");

require("dotenv").config();

const axios = require("axios");
const { generateConfig } = require("../utils/gsuiteHandler");
const { google } = require("googleapis");

const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
const SCOPES = [
  "https://www.googleapis.com/auth/admin.directory.user",
  "https://www.googleapis.com/auth/gmail.settings.sharing",
  "https://www.googleapis.com/auth/gmail.settings.basic",
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.labels",
  "https://www.googleapis.com/auth/cloud-platform",
];

const loadSavedCredentialsIfExist = async () => {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
};
const saveCredentials = async (client) => {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
};
const authorize = async () => {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
};

//Setting Signature
exports.setSignature = catchAsyncError(async (req, res, next) => {
  //   const { html } = req.body;
  let html = `<div>Hello Hello Hello I am Sigil Builder App</div>`;
  const updateSignature = catchAsyncError(async (auth) => {
    const gmail = google.gmail({ version: "v1", auth });
    gmail.users.settings.sendAs.update({
      userId: "me",
      auth: auth,
      sendAsEmail: "primary",
      fields: "signature",
      resource: {
        // signature: decodeURIComponent(html),
        signature: html,
      },
    });
    res.status(200).json({
      success: true,
      message: "Signature Updated Successfully!!",
    });
  });
  authorize()
    .then(updateSignature)
    .catch((error) => {
      res
        .status(500)
        .send(error?.message ? error?.message : "Internal Server Error");
    });
});

//GET ALL USERS UNDER A DOMAIN
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const getUsers = catchAsyncError(async (auth) => {
    const service = google.admin({ version: "directory_v1", auth });
    const response = await service.users.list({
      domain:'mysigil.in',
    });
    const users = response.data.users;
    if (!users || users.length === 0) {
      console.log('No users found.');
      return;
    }
    // console.log('Users:');
    // users.forEach((user) => {
    //   console.log(`${user.primaryEmail} (${user.name.fullName})`);
    // });
    res.status(200).json({
      users:users,
      success: true,
      message: "Users Fetched Successfully!!",
    });
  });
  authorize().then(getUsers).catch((error) => {res.status(500).send(error?.message ? error?.message : "Internal Server Error");
    });
});

//Logout Current Gmail Business account
exports.logoutGsuite = catchAsyncError(async (req, res, next) => {
  try {
  const content = await fs.readFile(TOKEN_PATH);
    if(content){
      await fs.unlink(TOKEN_PATH);
      res.status(200).json({
        success: true,
        message: "Logged Out successfully",
      });
    } 
  } catch (error) {
    res.status(200).json({
      success: true,
      message: "Already Logged Out",
    });
  }
});

// //Getting All Labels
// exports.getAllLabels = async (req, res, next) => {
//   try {
//     const getUsers = async (auth) => {
//       try {
//         // const gmail = await fetch('https://admin.googleapis.com/admin/directory/v1/users').then((res) => console.log(res)).catch((err) => console.log(err))
//         const gmail = google.gmail({ version: "v1", auth });
//         const data = gmail.users;
//         const labels = data;
//         if (!labels || labels?.length === 0) {
//           console.log("No labels found.");
//           return;
//         }
//         res.status(200).json({
//           labels,
//           success: true,
//           message: "Users Fetched Successfully",
//         });
//       } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//       }
//     };
//     authorize().then(getUsers).catch(console.error);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// };
// //Getting All Messages
// exports.getAllMessages = async (req, res, next) => {
//   try {
//     const getUsers = async (auth) => {
//       try {
//         const gmail = google.gmail({ version: "v1", auth });
//         const data = await gmail.users.threads.list({
//           userId: "me",
//         });
//         const threads = data.data.threads;
//         // if (!messages || messages.length === 0) {
//         //   console.log("No labels found.");
//         //   return;
//         // }
//         res.status(200).json({
//           threads,
//           success: true,
//           message: "Messages Fetched Successfully",
//         });
//       } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//       }
//     };
//     authorize().then(getUsers).catch(console.error);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// };

