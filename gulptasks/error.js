module.exports = function (plugins) {
    var error = {
        sassError: function(err) {
            var errStr =  'Zeile ' + err.lineNumber + ' in ' + err.fileName;
            plugins.nodeNotifier.notify({'title': err.message, 'message': errStr });
            console.log(err.message + ' | ' + errStr);
            this.emit('end');
        },

        jsError: function(err) {
            plugins.nodeNotifier.notify({'title': 'JSHint Error', 'message': err.message });
            console.log(err.message);
            this.emit('end');
        },

        svgError: function(err) {
            plugins.nodeNotifier.notify({'title': 'SVG Error', 'message': err.message });
            console.log(err);
            this.emit('end');
        },

        imgError: function(err) {
            plugins.nodeNotifier.notify({'title': 'Image Error', 'message': err.message });
            console.log(err);
            this.emit('end');
        }
    };

    return error;
};
