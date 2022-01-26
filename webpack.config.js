module.exports = {
    target: "webworker",
    entry: "./src/index.js",
    mode: "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'string-replace-loader',
                options: {
                    multiple: [
                        { search: 'request.mode = "cors";', replace: '/* request.mode = "cors"; */' },
                        { search: 'request.cache = "no-cache";', replace: '/* request.cache = "no-cache"; */' },
                        { search: 'request.credentials = "same-origin";', replace: '/* request.credentials = "same-origin"; */' },
                        { search: 'request.referrer = "client";', replace: '/* request.referrer = "client"; */' }
                    ]
                }
            }
        ],
    }
};