# Coding Test for Web Dev 1

This repository contains the shell application for this portion of the UtiliSource coding test you have been asked to complete. This test is designed to represent a task common to the requirements of the web developer position, specifically,

1. Retrieve an array of data from an API.
2. Display it in a table.
3. Click on a table row to display a detail of the row.

The test is intentionally designed with a lot of latitude for personal choices. You are being given only broad requirements so that you can show your coding style and design aesthetic.

There is also an analysis section to the test at the bottom.

## Getting Started

Clone this repository to a local folder. The application was created using create-react-app. Run **npm install** per a typical React project initialization.

Open *App.js* and find the function *authHdr()* near the bottom. Replace *your_access_token_here* with the token you were sent in the coding test email. Do not add any spaces.

Scroll down to the function *apiBaseUrl()* and replace *api_base_url_goes_here* with the API url included in the email. Do not add a trailing slash "/".

Start the app with the usual **npm start** command.

Your browser should open to localhost:3000 and display a black screen with some welcoming text and two buttons.  Display dev tools so you can see console log output.

Click the button **Can Get Links**. In 5 to 10 seconds (up to a minute if the remote API hasn't been invoked for a couple hours), you should see a console output like this,

`Success. Retrieved 1 channel and 248 video links`

If you get an error, double check that you entered both your token and the API url in the functions described above.

Click the button **Can Get Link Detail**. You should quickly see the following console output,

`Success. Retrieved link detail for linkId=62e59bc354f7a3bac5c47b9e, title: Hiking gear: what to bring? | Salomon How-To`

If you received the two success messages in your console log, then you have confirmed you can reach the coding test API and are ready to continue.

If you did not receive the success messages, get in touch ASAP so that we can get you going. Resolving API access is not part of the coding test. The two functions, *apiGetChannelLinks()* and *apiGetLinkDetail()* are intended to give you access to the API and you should use them for data retrieval.

## Coding Test Requirements

The data the API returns contains a series of links to YouTube videos for the Salomon TV channel. (That is why the Channels array contains only one element.) The data is for purposes of the coding test and has nothing to do with actual UtiliSource data. Note that the links are being retrieved from a database and will not change.

Here are the requirements to implement for the test:

### React

Implement your solution using React. If you know TypeScript, you can incorporate it, but its use is not a requirement and there is no penalty for not using TypeScript.

Include any packages, snippets, libraries, etc. that you want. Meet the functional requirements first (tabular display, detail display, sort order, date conversions, hyperlinks to open new tabs, etc.). Refine your UI design depnding on your available time.

### Tabular Display of Data

Render the links data in a table. The table should have column headers. Include the following columns in this order (left to right): Published, Title, Source, SourceType, URL.

The data property *Publishedts* is a Unix Epoch UTC timestamp in **seconds**. Convert it to browser (user's) local time and display as a user-friendly date-time string.

Sort the data by Published timestamp, oldest at the top of the table, to newest at the bottom. Do not assume the API will return data pre-sorted.

Clicking on the URL should open the video in a separate browser tab (or window).

NOTE: The *ID* property is an internal identifier and can be relied on to be unique per link item.

### Detail Display

Implement a feature to click on a row to display a modal or popup containing a detail of the video link contained in that row.

Detail data should be loaded on-demand, meaning, when the row is clicked, a call is then made to the API to retrieve the detail for that row. (Details should not be fetched in advance.)

Display the following fields in the detail screen. The order and layout is your choice:

1. Title
2. SourceTimestamp (display in user-friendly date-time same as Publishedts)
3. Full Description
4. Thumbnail Image  --obtained via ThumbURL
5. Source
6. SourceChannelName  --support clicking this to open SourceChannelUrl in new tab

Support clicking a control or element in the detail to open the video in a new tab. Video url is contained in thh URL link property.

Some visibility to the rows of the table should remain so that clicking another row closes the current row's detail and opens a new detail.

Include a way to close an open detail and return to full table visibility with no details open.


### Deliverable

Return this code base with your changes. It should support **npm install** and **npm start** in order to view it.

## Request Throttling Limits

The API enforces a request throttling limit that prohibits additional requests after a limit value is reached. Throttling is done per-minute and resets at the beginning of the next minute. "Minutes" are wall-clock minutes, not elapsed minutes. Meaning, if you are in minute 12:01 and hit your request limit, the counter resets at 12:02. 

Requests are cumulative across all API calls. Calls to *apiGetChannelLinks()* and *apiGetLinkDetail()* both add to the current minute's request total.

### Determine Request Limit
It's common to have to call into a 3rd party API that is not under your control. Often these APIs are poorly documented and can demonstrate unexpected behavior. This section of the coding test simulates the steps you might take if you encounter throttling from an API and need to figure out what the throttling limit is.

You must do this analysis programmatically in code. You can use any approach you like (click a button to run code, enter a specific URL route, run a one-time utility program, run a script, etc.), as long as it is done automatically as opposed to having a user manually initiate each request. For one thing, what if the limit is 1,000 requests? A person will not be able to trigger that many requests.

The API indicates request limit reached by returning HTTP Status Code 429,

`429 Too Many Requests`

Your solution should include the value of the limit and the code you used to determine it.

HINT: The limit is less than 100 requests per minute. 
