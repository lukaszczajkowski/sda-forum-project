
import React from "react";
import "./chat.js";
 
import "./chat.css";
function ChatPage() {
    return (
        <div>
            {/*postscribe('#mydiv', '<script language="javascript" src="/webjars/jquery/jquery.min.js"></script>')
            postscribe('#mydiv', '<script language="javascript" src='/webjars/sockjs-client/sockjs.min.js'></script>')
            postscribe('#mydiv', '<script language="javascript" src='/webjars/stomp-websocket/stomp.min.js'></script>')
    postscribe('#mydiv', '<script language="javascript" src="./chat.js"></script>')*/}
        <noscript><h2> Seems your browser doesn't support Javascript! Websocket relies on Javascript being
          enabled. Please enable Javascript and reload this page!</h2></noscript>
        <div id="main-content" className="container">
          <div className="row">
            <div className="col-md-6">
              <form className="form-inline">
                <div className="form-group">
                  <label htmlFor="connect">WebSocket connection:</label>
                  <button id="connect" className="btn btn-default" type="submit">Connect</button>
                  <button id="disconnect" className="btn btn-default" type="submit" disabled="disabled">Disconnect
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <form className="form-inline">
                <div className="form-group">
                  <label htmlFor="name">What is your name?</label>
                  <input type="text" id="name" className="form-control" placeholder="Your name here..." />
                </div>
                <button id="send" className="btn btn-default" type="submit">Send</button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <table id="conversation" className="table table-striped">
                <thead>
                  <tr>
                    <th>Greetings</th>
                  </tr>
                </thead>
                <tbody id="greetings">
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div>
    );
}

export default ChatPage;