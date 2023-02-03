String.prototype.includesCaseInsensitive = function(substring) {
    return this.toLowerCase().indexOf(substring.toLowerCase()) !== -1;
};
