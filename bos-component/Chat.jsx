const contract =
  'ece61a112fbb05b5ff96fd4d63cb259c4bae966477829666d46ddc4e5121d801';

State.init({
  message: ''  
});  

const messages = Near.view(contract, 'get_messages', { limit: 3 });

const Message = styled.div`
  display: flex;
  gap: 1.2em;
`;

const SendControls = styled.div`
  display: flex;
  gap: 1em;
  margin: 0.5em;
`;

const sendMessage = () => {
  if (state.message.length != 0) {
    Near.call(contract, 'send', { 
      text: state.message,
    });
  }  
};

return (
  <>
    {messages.reverse().map((message) => (
      <Message>
        <Widget
          src="calebjacob.near/widget/AccountProfile"
          props={{
            accountId: message.author,
          }}
        />
        <Widget
          src="andyh.near/widget/TimeAgo"
          props={{
            blockHeight: message.block_height,
          }}
        />
        <p>{message.text}</p>
      </Message>
    ))}
    <SendControls>
        <input
          type="text"
          onInput={(e) => State.update({ message: e.target.value})}
          value={state.message}
        />
        <button onClick={() => { sendMessage(); }}>Send</button>
    </SendControls>
  </>
);