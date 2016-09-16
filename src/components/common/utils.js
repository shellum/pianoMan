var Utils = {
  getSuffix: function(note) {
    var suffix = Math.floor(Math.random() * 100 % 2);
    if (suffix == 1 && (note=='a' || note=='b'))
    {
      suffix = 0;
    }
    return suffix;
  }
}

module.exports = Utils;
