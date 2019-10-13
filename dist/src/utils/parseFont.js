export default function parseFont(string) {
    if (!string)
        return null;
    var name = string.split(':')[0];
    return name.replace('+', ' ');
}
