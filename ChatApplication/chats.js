const messages = [];

const addMessage = ({ username, timestamp, text }) => {
    messages.push({ username, timestamp, text });
    return messages;
}

module.exports = {
    messages,
    addMessage,
};