"use strict";

var _app = require("firebase/app");

var _analytics = require("firebase/analytics");

// Import the functions you need from the SDKs you need
var firebaseConfig = {
  apiKey: "AIzaSyDNIgPAI1WIzp082kJ_YXq7pF4qXX4Ytf4",
  authDomain: "gopalashringar.firebaseapp.com",
  projectId: "gopalashringar",
  storageBucket: "gopalashringar.appspot.com",
  messagingSenderId: "421307171962",
  appId: "1:421307171962:web:7e83d1d0419c0cf3fd27c3",
  measurementId: "G-L9R5L4XSQN"
};
var app = (0, _app.initializeApp)(firebaseConfig);
var analytics = (0, _analytics.getAnalytics)(app);