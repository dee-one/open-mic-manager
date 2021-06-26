export default () => (
    unescape(document.cookie.split('=')[1])
)