import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '284401762274-9japsbb9v3n35hgqupkrg8j9fnhpbvub.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAkHZSjjDzvwI5QZdyDJt0Lkkf4Ij_dZ9o';
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';
const MAX_EMAILS = 10;

function Gmail({ onEmailsReceived, onError }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
        scope: SCOPES,
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        setIsSignedIn(authInstance.isSignedIn.get());
        authInstance.isSignedIn.listen(setIsSignedIn);
      }).catch(error => {
        if (onError) onError(error);
      });
    };

    gapi.load('client:auth2', initClient);
  }, [onError]);

  const handleSignIn = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut();
    setEmails([]);
    if (onEmailsReceived) onEmailsReceived([]);
  };

  const fetchEmails = async () => {
    if (isSignedIn) {
      try {
        const response = await gapi.client.gmail.users.messages.list({
          userId: 'me',
          maxResults: MAX_EMAILS,
        });

        const messages = await Promise.all(
          response.result.messages.map(async (msg) => {
            const msgDetails = await gapi.client.gmail.users.messages.get({
              userId: 'me',
              id: msg.id,
            });

            const headers = msgDetails.result.payload.headers;
            const senderInfo = headers.find(header => header.name === 'From');
            const subject = headers.find(header => header.name === 'Subject');
            const date = headers.find(header => header.name === 'Date');

            return {
              id: msg.id,
              snippet: msgDetails.result.snippet,
              sender: senderInfo ? senderInfo.value : 'Unknown',
              subject: subject ? subject.value : 'No subject',
              date: date ? date.value : 'Unknown date',
            };
          })
        );

        setEmails(messages);
        if (onEmailsReceived) onEmailsReceived(messages);
      } catch (error) {
        if (onError) onError(error);
      }
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="font-semibold mb-4">Email Management</h2>
      {isSignedIn ? (
        <div className="space-y-4">
          <div className="flex gap-4">
            <button 
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Sign Out
            </button>
            <button 
              onClick={fetchEmails}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Fetch Emails
            </button>
          </div>
          <div className="space-y-4">
            {emails.map((email, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <p><strong>Sender:</strong> {email.sender}</p>
                <p><strong>Subject:</strong> {email.subject}</p>
                <p><strong>Date:</strong> {email.date}</p>
                <p><strong>Preview:</strong> {email.snippet}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <button 
          onClick={handleSignIn}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign In with Google
        </button>
      )}
    </div>
  );
}

export default Gmail;