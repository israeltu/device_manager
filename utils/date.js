const nowAsString = () => new Date().toLocaleString('en-US', { hour12: false }).replace(',', '');

module.exports = {
    nowAsString
}