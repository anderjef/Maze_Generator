module.exports = {
    "env": {
        "browser": true,
        "es2024": true
    },
    "extends": [
        "eslint:recommended",
        "@fal-works/p5js",
        "@fal-works/p5js/sound"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "script"
    },
    "rules": {
    }
}
