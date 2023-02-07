// eslint-disable-next-line
String.prototype.includesCaseInsensitive = function(substring) {
    return this.toLowerCase().indexOf(substring.toLowerCase()) !== -1;
};

export const formatUrlParams = (params = {} )=> {
    return Object.keys(params)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');
};